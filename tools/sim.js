// Content audit + balance simulator.  node tools/sim.js [runs] [--all-unlocked]
const path = require("path");
const base = path.join(__dirname, "..");
const files = ["data/tuning.js", "data/characters.js", "data/content_core.js", "data/threads_gender.js",
  "data/threads_politics.js", "data/threads_crew.js", "data/threads_more.js", "data/end_states.js"];
const fs = require("fs");
for (const f of files) if (fs.existsSync(path.join(base, f))) require(path.join(base, f));
const GS = require(path.join(base, "js/game_state.js"));
GS.load_data();
const D = globalThis.CSG_DATA;
const N = parseInt(process.argv[2] || "1000", 10);
const ALL = process.argv.includes("--all-unlocked");

// ---------- audit ----------
const errors = [], warn = [];
const ids = new Set(D.characters.characters.map(c => c.id));
const okEff = new Set(["drama", "clout", "sanity", "members", "leak", "saint_heat", "kimmy", "mike_esc", "boss", "defend", "reveal_secret", "princess_meaner", "marcus_call", "fury", "watch_live"]);
const flagsSet = new Set(), flagsReq = new Set(), seen = new Set();
let beats = 0, choices = 0, reacts = 0;
function checkChoices(where, list, thread) {
  if (!list || list.length < 2 || list.length > 4) errors.push(where + ": needs 2-4 choices");
  for (const c of list || []) {
    choices++;
    if (!c.label) errors.push(where + ": choice without label");
    for (const [k, v] of Object.entries(c.effects || {})) { if (!okEff.has(k)) errors.push(where + ": bad effect " + k); if (Math.abs(v) > 40) errors.push(where + ": effect too big " + k); }
    for (const r of c.react || []) { reacts++; if (!ids.has(r.speaker)) errors.push(where + ": bad react speaker " + r.speaker); }
    if (c.set) flagsSet.add(c.set);
    if (c.next && (!thread || !thread.beats || !thread.beats[c.next])) errors.push(where + ": missing beat " + c.next);
    for (const k of ["ally", "dunk"]) if (c[k] && !ids.has(c[k])) errors.push(where + ": bad " + k + " " + c[k]);
  }
}
for (const t of D.threads) {
  if (seen.has(t.id)) errors.push("duplicate thread " + t.id); seen.add(t.id);
  if (!ids.has(t.speaker)) errors.push(t.id + ": bad speaker " + t.speaker);
  if (!t.text || t.text.length > 260) errors.push(t.id + ": text missing or too long");
  for (const l of t.lead || []) if (!ids.has(l.speaker)) errors.push(t.id + ": bad lead speaker");
  checkChoices(t.id, t.choices, t);
  for (const [b, beat] of Object.entries(t.beats || {})) { beats++; if (beat.speaker && !ids.has(beat.speaker)) errors.push(t.id + "/" + b + ": bad speaker"); for (const l of beat.lead || []) if (!ids.has(l.speaker)) errors.push(t.id + "/" + b + ": bad lead"); checkChoices(t.id + "/" + b, beat.choices, t); }
  for (const f of t.requires || []) flagsReq.add(f);
}
for (const [k, s] of Object.entries(D.core.signatures)) { if (!ids.has(s.speaker)) errors.push("sig " + k + ": bad speaker"); checkChoices("sig:" + k, s.choices, null); }
for (const a of D.core.ambient) if (!ids.has(a.speaker)) errors.push("ambient bad speaker " + a.speaker);
for (const f of flagsReq) if (!flagsSet.has(f)) errors.push("flag required but never set: " + f);
const realNames = /\b(trump|biden|obama|harris|maga)\b/i;
const all = JSON.stringify(D.threads) + JSON.stringify(D.core);
if (realNames.test(all)) errors.push("real political name found");
if (/\b(n[i1]gg|f[a@]gg|retard|tr[a@]nny|kike|chink)/i.test(all)) errors.push("slur pattern found");
const bySpeaker = {}; for (const t of D.threads) bySpeaker[t.speaker] = (bySpeaker[t.speaker] || 0) + 1;
console.log("=== AUDIT ===");
console.log("threads", D.threads.length, "| follow-up beats", beats, "| choices", choices, "| reaction lines", reacts, "| signature events", Object.keys(D.core.signatures).length, "| ambient", D.core.ambient.length);
console.log("threads by speaker", JSON.stringify(bySpeaker));
console.log("callback flags", [...flagsReq].join(", "));
console.log("errors:", errors.length ? errors : "none");

// ---------- bots ----------
const METERS = ["drama", "clout", "sanity", "members"];
function risk(c) {
  const s = GS.s, k = GS.scale(), T = GS.T;
  let r = 0;
  const eff = Object.assign({}, c.effects);
  if (eff.sanity === undefined) eff.sanity = c.act ? T.default_act_sanity : T.default_say_sanity;
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
function usePowerups(edge) {
  let used = 0;
  for (const need of needs(edge)) for (const id of FIX[need]) if (GS.s.powerups.includes(id)) { GS.use_powerup(id); used++; break; }
  return used;
}
const bots = {
  random: { pu: 0, pick: d => Math.floor(Math.random() * d.choices.length) },
  casual: { pu: 20, sloppy: 0.3, pick: d => minRisk(d) },
  strategic: { pu: 25, sloppy: 0, pick: d => minRisk(d) },
  no_powerups: { pu: 0, sloppy: 0.3, pick: d => minRisk(d) }
};
function secondBest(d) { const r = d.choices.map((c, i) => [risk(c), i]).sort((a, b) => a[0] - b[0]); return (r[1] || r[0])[1]; }
function minRisk(d) { let b = 0, bs = Infinity; d.choices.forEach((c, i) => { const r = risk(c); if (r < bs) { bs = r; b = i; } }); return b; }

function run(botName) {
  const bot = bots[botName];
  GS.profile = { best_free: 0, best_daily: 0, daily: { date: "", best: 0 }, unlocked: ALL ? Object.keys(D.core.powerups) : D.tuning.powerup_starters.slice(), achievements: [], runs: 1, tutorial_done: true };
  GS.new_run("free", "Bot", (Math.random() * 4294967296) >>> 0);
  const s = GS.s;
  for (let guard = 0; guard < 400; guard++) {
    GS.start_moment();
    let r = GS.check_end(); if (r) return { r, s };
    if (bot.pu) usePowerups(bot.pu);
    if (GS.s.current) {
      if (s.muted > 0) GS.muted_resolve();
      else {
        const sloppy = bot.sloppy && Math.random() < bot.sloppy;
        GS.choose(sloppy ? secondBest(GS.s.current) : bot.pick(GS.s.current));
      }
    }
    r = GS.check_end(); if (r) return { r, s };
    const res = GS.end_moment();
    r = GS.check_end(); if (r) return { r, s };
    if (res.day_complete) {
      if (s.day >= D.tuning.total_days) return { r: "win", s };
      if (bot.pu) { const offer = GS.day_offer(); const want = needs(35).flatMap(n => FIX[n]); GS.take_powerup(offer.find(o => want.includes(o)) || offer[0]); }
      GS.roll_day();
      r = GS.check_end(); if (r) return { r, s };
    }
  }
  return { r: "stuck", s };
}
console.log("\n=== SIMULATION (" + N + " runs each" + (ALL ? ", all power-ups unlocked" : ", starter power-ups") + ") ===");
for (const b of Object.keys(bots)) {
  const ends = {}, days = []; let wins = 0, reruns = 0; const c = { mutes: 0, wars: 0, combos: 0, stats_wars: 0, grudges_hit: 0, delayed_hits: 0, pu_used: 0, beefs: 0, favors: 0 };
  for (let i = 0; i < N; i++) {
    const o = run(b); ends[o.r] = (ends[o.r] || 0) + 1; days.push(o.r === "win" ? 31 : o.s.day); if (o.r === "win") wins++;
    reruns += o.s.counters.reruns || 0; for (const k in c) c[k] += o.s.counters[k] || 0;
  }
  days.sort((a, b) => a - b);
  const avg = Object.fromEntries(Object.entries(c).map(([k, v]) => [k, +(v / N).toFixed(2)]));
  console.log("\n[" + b + "] WIN " + (100 * wins / N).toFixed(1) + "% | median end day " + days[Math.floor(N / 2)] + " | reruns " + reruns);
  console.log("  ends:", JSON.stringify(ends));
  console.log("  per run:", JSON.stringify(avg));
}
