// Content audit + balance simulator. Run from the CSG folder:  node tools/sim.js [runs]
const path = require("path");
const base = path.join(__dirname, "..");
for (const f of ["data/tuning.js", "data/characters.js", "data/messages.js", "data/end_states.js"]) require(path.join(base, f));
const GS = require(path.join(base, "js/game_state.js"));
GS.load_data();

// ---------- content audit ----------
const D = globalThis.CSG_DATA, errors = [];
const decs = D.messages.decisions, sigs = D.messages.signature_decisions;
const chars = D.characters.characters, ids = new Set(chars.map(c => c.id));
const core = chars.filter(c => !c.bench).map(c => c.id);
const okKeys = new Set(["drama", "clout", "sanity", "members", "leak", "admin_strikes", "council_anger",
  "bigmike_escalation", "bossbabe_recruit_progress", "reveal_secret", "defend", "kimmy", "offense",
  "princess_meaner", "marcus_call", "fury", "beef"]);
const seenIds = new Set();
const featureCount = {}; core.forEach(c => featureCount[c] = 0);
const arcs = { princess: 0, mcman_pookie: 0, saint: 0, political: 0 };
function checkCard(card, where) {
  if (!ids.has(card.speaker)) errors.push(where + ": unknown speaker " + card.speaker);
  for (const s of [card.text].concat(card.variants || [])) if (s && s.length >= 240) errors.push(where + ": text >= 240 chars");
  if (card.choices.length < 2 || card.choices.length > 3) errors.push(where + ": needs 2-3 choices");
  for (const ch of card.choices) {
    if (ch.label.length >= 240) errors.push(where + ": label too long");
    for (const [k, v] of Object.entries(ch.effects)) {
      if (!okKeys.has(k)) errors.push(where + ": bad effect key " + k);
      if (v < -40 || v > 40) errors.push(where + ": effect out of range " + k + "=" + v);
    }
  }
}
for (const d of decs) {
  if (seenIds.has(d.id)) errors.push("duplicate id " + d.id); seenIds.add(d.id);
  checkCard(d, d.id);
  for (const c of new Set([d.speaker].concat(d.features || []))) if (featureCount[c] !== undefined) featureCount[c]++;
  if (d.speaker === "princess" || (d.features || []).includes("princess")) arcs.princess++;
  if (["mcman", "pookie"].includes(d.speaker)) arcs.mcman_pookie++;
  if ((d.tags || []).includes("council") || d.speaker === "section8") arcs.saint++;
  if ((d.tags || []).includes("political")) arcs.political++;
  for (const c of d.features || []) if (!ids.has(c)) errors.push(d.id + ": unknown feature " + c);
}
for (const [k, s] of Object.entries(sigs)) checkCard(s, "sig:" + k);
const banned = /\b(n[i1]gg|f[a@]gg|retard|tr[a@]nny|kike|spic\b|chink)/i;
const allText = JSON.stringify(D.messages) + JSON.stringify(D.characters);
if (banned.test(allText)) errors.push("slur-pattern match found in content");
console.log("=== CONTENT AUDIT ===");
console.log("decision cards:", decs.length, "| signature templates:", Object.keys(sigs).length, "| ambient:", D.messages.ambient.length);
console.log("arc cards:", arcs);
console.log("core characters under 3 cards:", Object.entries(featureCount).filter(([, n]) => n < 3));
console.log("errors:", errors.length ? errors : "none");

// ---------- simulation ----------
function score(effects) {
  let s = 0;
  for (const m of ["drama", "clout", "sanity", "members"]) {
    const v = Math.max(0, Math.min(100, GS.meters[m] + (effects[m] || 0)));
    s += Math.pow(v - 50, 2) + (v <= 8 || v >= 92 ? 5000 : 0);
  }
  return s;
}
const strategies = {
  random: d => GS.pick(d.choices),
  smart: d => {
    let best = null, bs = Infinity;
    for (const c of d.choices) {
      let s = score(c.effects);
      if (c.spicy) s += GS.hidden.leak * 25 + (GS.hidden.admin_strikes >= 2 ? 3000 : 0);
      if (c.effects.offense) s += 3000;
      if ((c.effects.kimmy || 0) < 0 && GS.kimmy_love <= -3) s += 2500;
      if (c.effects.defend && GS.hidden.council_anger >= 4) s += 2000;
      if (s < bs) { bs = s; best = c; }
    }
    return best;
  },
  spicy: d => d.choices.find(c => c.spicy) || GS.pick(d.choices)
};

function runOnce(strat) {
  GS.reset_run();
  const tally = { combos: 0, wars: 0, sigsSeen: new Set(), speakers: new Set() };
  const notePost = (s, o) => { tally.speakers.add(s); for (const e of GS.note_post(s, o)) if (e.type === "post") tally.speakers.add(e.speaker); };
  for (const e of GS.pending_events) if (e.type === "post") notePost(e.speaker);
  while (true) {
    for (const a of GS.pick_ambient()) { notePost(a.speaker, { stats: a.stats }); GS.apply_ambient(a); }
    const d = GS.next_decision();
    if (d.sig) tally.sigsSeen.add(d.sig);
    notePost(d.speaker, { stats: (d.tags || []).includes("stats") });
    for (const e of GS.on_decision_posted(d)) if (e.type === "post") notePost(e.speaker);
    let evs;
    if (GS.is_muted()) evs = GS.auto_resolve(d);
    else {
      if (strat === "smart") for (const b of GS.get_bonus_actions()) GS.bonus_action(b.id);
      evs = GS.apply_choice(d, strategies[strat](d));
    }
    for (const e of evs) if (e.type === "post") notePost(e.speaker);
    let r = GS.check_lose_conditions();
    if (r) { GS.end_run(r); return { r, day: GS.day, tally }; }
    const res = GS.advance_decision();
    for (const e of res.events) if (e.type === "post") notePost(e.speaker);
    r = GS.check_lose_conditions();
    if (r) { GS.end_run(r); return { r, day: GS.day, tally }; }
    if (res.day_complete) {
      if (GS.day >= GS.tuning.total_days) { GS.end_run("win"); return { r: "win", day: GS.day, tally }; }
      for (const e of GS.roll_day()) if (e.type === "post") notePost(e.speaker);
      r = GS.check_lose_conditions();
      if (r) { GS.end_run(r); return { r, day: GS.day, tally }; }
    }
  }
}

const N = parseInt(process.argv[2] || "2000", 10);
console.log("\n=== SIMULATION (" + N + " runs each) ===");
for (const strat of Object.keys(strategies)) {
  const ends = {}, days = []; let reruns = 0, wins = 0; const sigAll = new Set(), spk = new Set();
  let combos = 0, wars = 0, dogpiles = 0, lurker = 0, mutes = 0, statsWars = 0, beefs = 0, furies = 0;
  for (let i = 0; i < N; i++) {
    const o = runOnce(strat);
    ends[o.r] = (ends[o.r] || 0) + 1; days.push(o.day); if (o.r === "win") wins++;
    reruns += GS.stats.reruns; o.tally.sigsSeen.forEach(s => sigAll.add(s)); o.tally.speakers.forEach(s => spk.add(s));
    combos += GS.flags.combos; wars += GS.flags.wars; dogpiles += GS.flags.dogpiles;
    if (GS.flags.lurker_spoke) lurker++; mutes += GS.flags.mutes; statsWars += GS.flags.stats_wars; beefs += GS.flags.beefs; furies += GS.flags.furies;
  }
  days.sort((a, b) => a - b);
  console.log("\n[" + strat + "] win " + (100 * wins / N).toFixed(1) + "% | median death day " + days[Math.floor(N / 2)] +
    " | repeated cards " + reruns + " | avg combos " + (combos / N).toFixed(2) + " wars " + (wars / N).toFixed(2) +
    " dogpiles " + (dogpiles / N).toFixed(2) + " mutes " + (mutes / N).toFixed(2) + " statsWars " + (statsWars / N).toFixed(2) +
    " beefs " + (beefs / N).toFixed(2) + " furies " + (furies / N).toFixed(2) + " | lurker spoke " + (100 * lurker / N).toFixed(0) + "%");
  console.log("  end states:", ends);
  console.log("  signatures seen:", [...sigAll].sort().join(", "));
  console.log("  characters never seen:", [...ids].filter(i => !spk.has(i)));
}
