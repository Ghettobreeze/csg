// Balance report: power-up economy, meter movement and difficulty, by player type.
//   node tools/balance.js [runs] [--all-unlocked] [--seed N] [--set key=value ...]
// --set overrides a tuning value for this run only (e.g. --set powerup_offer_every=2).
const path = require("path"), fs = require("fs");
const base = path.join(__dirname, "..");
for (const f of ["data/tuning.js", "data/characters.js", "data/content_core.js", "data/threads_gender.js",
  "data/threads_politics.js", "data/threads_crew.js", "data/threads_more.js", "data/end_states.js"])
  if (fs.existsSync(path.join(base, f))) require(path.join(base, f));
const GS = require(path.join(base, "js/game_state.js"));
GS.load_data();
const D = globalThis.CSG_DATA;

const argv = process.argv.slice(2);
const N = parseInt(argv.find(a => /^\d+$/.test(a)) || "1000", 10);
const ALL = argv.includes("--all-unlocked");
const JSON_OUT = argv.includes("--json");
const ONLY = argv.includes("--bots") ? argv[argv.indexOf("--bots") + 1].split(",") : [];
for (let i = 0; i < argv.length; i++) if (argv[i] === "--set") {
  const [k, v] = argv[i + 1].split("="); GS.T[k] = JSON.parse(v);
}
let seed = argv.includes("--seed") ? parseInt(argv[argv.indexOf("--seed") + 1], 10) : 1;
const brand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

// ---------- instrumentation ----------
let tally;
const _grant = GS.grant_powerup.bind(GS), _take = GS.take_powerup.bind(GS);
GS.grant_powerup = function (text, id) {
  const full = this.s.powerups.length >= this.T.powerup_max;
  tally.offered.viral++; if (full) tally.wasted++; else tally.got.viral++;
  return _grant(text, id);
};
GS.take_powerup = function (id) {
  if (id) { tally.got.night++; if (this.s.powerups.length >= this.T.powerup_max) tally.wasted++; }
  return _take(id);
};

// ---------- bots ----------
const METERS = ["drama", "clout", "sanity", "members"];
function risk(c) {
  const s = GS.s, k = GS.scale(), T = GS.T;
  let r = 0;
  const eff = Object.assign({}, c.effects);
  if (eff.sanity === undefined) eff.sanity = c.act ? T.default_act_sanity : T.default_say_sanity;
  if ((eff.drama || 0) > 0) eff.sanity -= Math.round(eff.drama * (T.sanity_per_drama || 0));
  for (const m of METERS) {
    const v = s.meters[m] + (eff[m] || 0) * k;
    r += Math.pow(v - 50, 2) + (v <= 10 || v >= 90 ? 4000 : 0);
  }
  if (c.spicy) r += s.hidden.leak * 30 + (s.hidden.strikes >= 2 ? 3000 : 400);
  if (c.sexual) r += 2000;
  if ((eff.kimmy || 0) < 0 && s.hidden.kimmy <= -3) r += 1500;
  if (eff.defend && s.hidden.saint_heat >= 4) r += 1500;
  return r;
}
const FIX = { drama_high: ["peace_gif", "go_dark"], drama_low: ["stir_pot"], sanity_low: ["meme_drop", "call_auntie", "go_dark"],
  clout_high: ["humble_post", "go_dark"], clout_low: ["stir_pot"], members_low: ["invite_cousins"], leak: ["delete_pray"], strikes: ["summon_bigbro"], muted: ["kimmy_favor"] };
function needs(edge) {
  const s = GS.s, out = [];
  if (s.meters.drama >= 100 - edge) out.push("drama_high"); if (s.meters.drama <= edge) out.push("drama_low");
  if (s.meters.sanity <= edge) out.push("sanity_low"); if (s.meters.clout >= 100 - edge) out.push("clout_high");
  if (s.meters.clout <= edge) out.push("clout_low"); if (s.meters.members <= edge) out.push("members_low");
  if (s.hidden.leak >= 100 - edge * 1.2) out.push("leak"); if (s.hidden.strikes >= 2) out.push("strikes"); if (s.muted > 0) out.push("muted");
  return out;
}
function useFor(edge, wrongPick) {
  for (const need of needs(edge)) {
    const held = GS.s.powerups;
    if (!held.length) return;
    const fix = FIX[need].find(id => held.includes(id) && !GS.powerup_backfires(id));
    if (fix) GS.use_powerup(fix);
    else if (wrongPick && brand() < wrongPick) GS.use_powerup(held[Math.floor(brand() * held.length)]);
  }
}
function minRisk(d) { let b = 0, bs = Infinity; d.choices.forEach((c, i) => { const r = risk(c); if (r < bs) { bs = r; b = i; } }); return b; }
function secondBest(d) { const r = d.choices.map((c, i) => [risk(c), i]).sort((a, b) => a[0] - b[0]); return (r[1] || r[0])[1]; }

// Player models. sloppy = chance of a worse reply. pu = how close to the edge before reaching for a power-up.
const BOTS = {
  random:      { sloppy: 1, pu: 0, desc: "taps any reply, never uses power-ups" },
  no_powerups: { sloppy: 0.3, pu: 0, desc: "casual replies, ignores power-ups" },
  casual:      { sloppy: 0.3, pu: 20, desc: "casual replies, uses the right power-up once a meter is in the red" },
  sloppy:      { sloppy: 0.3, pu: 20, wrong: 0.3, desc: "like casual, but grabs the wrong power-up 30% of the time" },
  eager:       { sloppy: 0.3, pu: 35, desc: "casual replies, fires power-ups early and often" },
  strategic:   { sloppy: 0, pu: 25, desc: "best reply every time, right power-up at the right time" }
};
const pickReply = (bot, d) => bot.sloppy >= 1 ? Math.floor(brand() * d.choices.length) : (brand() < bot.sloppy ? secondBest(d) : minRisk(d));

function run(botName) {
  const bot = BOTS[botName];
  tally = { offered: { viral: 0 }, got: { start: 0, night: 0, viral: 0 }, wasted: 0, used: 0, usedByDay: [], moves: 0, moments: 0, red: 0, extreme: 0, meterSum: { drama: 0, clout: 0, sanity: 0, members: 0 } };
  GS.profile = { best_free: 0, best_daily: 0, daily: { date: "", best: 0 }, unlocked: ALL ? Object.keys(D.core.powerups) : D.tuning.powerup_starters.slice(), achievements: [], runs: 1, tutorial_done: true };
  GS.new_run("free", "Bot", (brand() * 4294967296) >>> 0);
  const s = GS.s;
  tally.got.start = s.powerups.length;
  const _use = GS.use_powerup.bind(GS);
  GS.use_powerup = id => { (tally.ids = tally.ids || {})[id] = (tally.ids[id] || 0) + 1; tally.last = { id, m: tally.moments }; tally.used++; tally.usedByDay[s.day] = (tally.usedByDay[s.day] || 0) + 1; return _use(id); };
  const done = r => { GS.use_powerup = _use; if (r !== "win" && tally.last && tally.moments - tally.last.m <= 2) tally.killer = tally.last.id + "->" + r; return { r, s, t: tally }; };
  for (let guard = 0; guard < 400; guard++) {
    const before = Object.assign({}, s.meters);
    GS.start_moment();
    let r = GS.check_end(); if (r) return done(r);
    if (bot.pu) useFor(bot.pu, bot.wrong);
    if (s.current) {
      if (s.muted > 0) GS.muted_resolve();
      else GS.choose(pickReply(bot, s.current));
    }
    r = GS.check_end(); if (r) return done(r);
    const res = GS.end_moment();
    tally.moments++;
    for (const m of METERS) {
      tally.moves += Math.abs(s.meters[m] - before[m]); tally.meterSum[m] += s.meters[m];
      if (s.meters[m] <= 20 || s.meters[m] >= 80) tally.red++;
      if (s.meters[m] <= 10 || s.meters[m] >= 90) tally.extreme++;
    }
    r = GS.check_end(); if (r) return done(r);
    if (res.day_complete) {
      if (s.day >= D.tuning.total_days) return done("win");
      const offer = GS.day_offer();
      if (offer && offer.length) {
        if (bot.pu) { const want = needs(35).flatMap(n => FIX[n]); GS.take_powerup(offer.find(o => want.includes(o)) || offer[0]); }
        else GS.take_powerup(offer[0]); // non-users still collect, they just never tap them
      }
      GS.roll_day();
      r = GS.check_end(); if (r) return done(r);
    }
  }
  return done("stuck");
}

// ---------- report ----------
const pct = (a, b) => (100 * a / Math.max(1, b)).toFixed(1) + "%";
const f1 = x => (+x).toFixed(1);
const out = {};
if (!JSON_OUT) console.log("=== BALANCE (" + N + " runs per player type, " + (ALL ? "all power-ups unlocked" : "starter power-ups") + ") ===");
for (const name of Object.keys(BOTS)) {
  if (ONLY.length && !ONLY.includes(name)) continue;
  const agg = { wins: 0, days: [], ends: {}, phase: { "1-10": 0, "11-20": 0, "21-30": 0 }, start: 0, night: 0, viral: 0, viralOffered: 0, wasted: 0, used: 0, heldEnd: 0, usedByPhase: [0, 0, 0], dayCount: [0, 0, 0], moves: 0, moments: 0, red: 0, extreme: 0, winUsed: 0, ids: {}, killers: {} };
  for (let i = 0; i < N; i++) {
    const o = run(name), t = o.t;
    const win = o.r === "win";
    if (win) { agg.wins++; agg.winUsed += t.used; }
    else { agg.ends[o.r] = (agg.ends[o.r] || 0) + 1; agg.phase[o.s.day <= 10 ? "1-10" : o.s.day <= 20 ? "11-20" : "21-30"]++; }
    agg.days.push(win ? 31 : o.s.day);
    agg.start += t.got.start; agg.night += t.got.night; agg.viral += t.got.viral; agg.viralOffered += t.offered.viral;
    agg.wasted += t.wasted; agg.used += t.used; agg.heldEnd += o.s.powerups.length;
    t.usedByDay.forEach((n, d) => { if (n) agg.usedByPhase[d <= 10 ? 0 : d <= 20 ? 1 : 2] += n; });
    for (let d = 1; d <= Math.min(o.s.day, 30); d++) agg.dayCount[d <= 10 ? 0 : d <= 20 ? 1 : 2]++;
    for (const [k, v] of Object.entries(t.ids || {})) agg.ids[k] = (agg.ids[k] || 0) + v; if (t.killer) agg.killers[t.killer] = (agg.killers[t.killer] || 0) + 1;
    agg.moves += t.moves; agg.moments += t.moments; agg.red += t.red; agg.extreme += t.extreme;
  }
  agg.days.sort((a, b) => a - b);
  const totalDays = agg.dayCount.reduce((a, b) => a + b, 0);
  const r = {
    win: +(100 * agg.wins / N).toFixed(1),
    median_end_day: agg.days[Math.floor(N / 2)],
    earned_per_run: +((agg.start + agg.night + agg.viral) / N).toFixed(1),
    earned: { start: +(agg.start / N).toFixed(1), nightly: +(agg.night / N).toFixed(1), viral: +(agg.viral / N).toFixed(1) },
    wasted_full_hand: +(agg.wasted / N).toFixed(1),
    used_per_run: +(agg.used / N).toFixed(1),
    used_per_10_days: +(10 * agg.used / Math.max(1, totalDays)).toFixed(1),
    used_in_wins: agg.wins ? +(agg.winUsed / agg.wins).toFixed(1) : 0,
    held_at_end: +(agg.heldEnd / N).toFixed(1),
    meter_move_per_moment: +(agg.moves / Math.max(1, agg.moments) / 4).toFixed(1),
    time_in_red: +(100 * agg.red / Math.max(1, agg.moments * 4)).toFixed(1),
    time_near_death: +(100 * agg.extreme / Math.max(1, agg.moments * 4)).toFixed(1),
    deaths_by_phase: agg.phase,
    ends: agg.ends,
    death_share: (() => { const g = {}, tot = N - agg.wins; for (const [k, v] of Object.entries(agg.ends)) { const m = k.split("_")[0]; const key = ["drama", "clout", "sanity", "members"].includes(m) ? m : "other"; g[key] = (g[key] || 0) + v; }
      for (const k in g) g[k] = Math.round(100 * g[k] / Math.max(1, tot)); return g; })(),
    uses_by_type: agg.ids,
    died_soon_after: agg.killers
  };
  out[name] = r;
  if (JSON_OUT) continue;
  console.log("\n[" + name + "] " + BOTS[name].desc);
  console.log("  WIN " + r.win + "%  | median end day " + r.median_end_day + " | deaths by phase " + JSON.stringify(r.deaths_by_phase));
  console.log("  power-ups: earned " + r.earned_per_run + "/run (start " + r.earned.start + ", nightly " + r.earned.nightly + ", viral " + r.earned.viral + ")"
    + " | used " + r.used_per_run + " (" + r.used_per_10_days + " per 10 days, " + r.used_in_wins + " in wins) | lost to full hand " + r.wasted_full_hand + " | held at end " + r.held_at_end);
  console.log("  meters: avg move " + r.meter_move_per_moment + "/moment | time in red " + r.time_in_red + "% | near death " + r.time_near_death + "%");
  console.log("  deaths: " + JSON.stringify(r.ends) + "\n  death share %: " + JSON.stringify(r.death_share));
  if (r.used_per_run) console.log("  uses: " + JSON.stringify(r.uses_by_type) + "\n  died within 2 moments of using: " + JSON.stringify(r.died_soon_after));
}
if (JSON_OUT) console.log(JSON.stringify(out));
