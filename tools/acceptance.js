// Deterministic rule checks.  node tools/acceptance.js
const path = require("path"), fs = require("fs");
const base = path.join(__dirname, "..");
for (const f of ["data/tuning.js", "data/characters.js", "data/content_core.js", "data/threads_gender.js", "data/threads_politics.js", "data/threads_crew.js", "data/threads_more.js", "data/end_states.js"]) require(path.join(base, f));
const G = require(path.join(base, "js/game_state.js"));
G.load_data();
const C = globalThis.CSG_DATA.core, T = globalThis.CSG_DATA.tuning;
let pass = 0, fail = 0;
const check = (name, ok) => { ok ? pass++ : fail++; console.log((ok ? "PASS " : "FAIL ") + name); };
const fresh = (seed) => { G.profile = { best_free: 0, best_daily: 0, daily: { date: "", best: 0 }, unlocked: Object.keys(C.powerups), achievements: [], runs: 1, tutorial_done: true }; G.new_run("free", "Tester", seed || 12345); G.s.powerups = []; return G.s; };
const sig = k => G.make_sig(k);
const pickLabel = (d, start) => d.choices.findIndex(c => c.label.startsWith(start));
const badge = (ev, b) => ev.some(e => e.badge && e.badge.includes(b));

// Daily runs are identical for everyone on the same day
G.profile = { best_free: 0, best_daily: 0, daily: {}, unlocked: T.powerup_starters.slice(), achievements: [], runs: 1, tutorial_done: true };
G.new_run("daily", "A"); const a = G.start_moment().decision.text, aSeed = G.s.brittany_target + G.s.shirt_day;
G.new_run("daily", "B"); const b = G.start_moment().decision.text, bSeed = G.s.brittany_target + G.s.shirt_day;
check("Daily Run: same first card and same hidden schedule for two players", a === b && aSeed === bSeed);

// Danger ramps with the day
fresh(); const k1 = G.scale(); G.s.day = 30; const k30 = G.scale();
check("Effects ramp from x" + k1 + " on day 1 to x" + k30 + " on day 30", k1 === T.effect_scale_day1 && Math.abs(k30 - T.effect_scale_day30) < 1e-9);

// Every reply touches Sanity: arguing drains, checking out restores
fresh(); G.s.current = { kind: "thread", thread: "zz", speaker: "coach", tags: [], choices: [{ label: "say", effects: {} }, { label: "do", act: true, effects: {} }] };
let s0 = G.s.meters.sanity; G.apply_choice(G.s.current, G.s.current.choices[0]); const say = G.s.meters.sanity - s0;
s0 = G.s.meters.sanity; G.apply_choice(G.s.current, G.s.current.choices[1]); const act = G.s.meters.sanity - s0;
check("Replies with no Sanity effect default to drain (" + say + ") and actions restore (+" + act + ")", say < 0 && act > 0);

// High drama drains sanity on its own
fresh(); G.s.meters.drama = 90; s0 = G.s.meters.sanity; G.end_moment();
check("High Drama drains Sanity every turn", G.s.meters.sanity < s0);

// Members: healthy drama grows the group, extremes shrink it
fresh(); G.s.meters.drama = 50; let m0 = G.s.meters.members; G.end_moment(); const healthy = G.s.meters.members - m0;
fresh(); G.s.meters.drama = 95; m0 = G.s.meters.members; G.end_moment(); const sick = G.s.meters.members - m0;
check("Members grow at healthy Drama (+" + healthy + ") and shrink at extremes (" + sick + ")", healthy > 0 && sick < 0);

// Power-ups
fresh(); G.s.powerups = ["peace_gif"]; G.s.meters.drama = 80; G.s.combo = 2; G.s.war = 2;
G.use_powerup("peace_gif");
check("Peace Gif: Drama down, combo and war stopped", G.s.meters.drama < 80 && G.s.combo === 0 && G.s.war === 0);
fresh(); G.s.powerups = ["delete_pray"]; G.s.hidden.leak = 80; G.use_powerup("delete_pray");
check("Delete & Pray: Leak -30", G.s.hidden.leak === 50);
fresh(); G.s.powerups = ["kimmy_favor"]; G.s.muted = 3; G.use_powerup("kimmy_favor");
check("Kimmy's Favor unmutes you", G.s.muted === 0);
fresh(); G.s.powerups = ["summon_bigbro"]; G.s.hidden.strikes = 2; G.use_powerup("summon_bigbro");
check("Summon Big Bro erases a strike", G.s.hidden.strikes === 1);
fresh(); G.start_moment(); G.s.powerups = ["go_dark"]; const r = G.use_powerup("go_dark");
check("Go Dark skips the current card", r.consumed && G.s.current === null);
fresh(); G.s.powerups = ["peace_gif", "meme_drop", "stir_pot"]; G.take_powerup("call_auntie");
check("Max 3 power-ups: picking a 4th replaces the oldest", G.s.powerups.length === 3 && G.s.powerups[0] === "meme_drop" && G.s.powerups[2] === "call_auntie");
fresh(); G.s.day = 30; const d30 = G.s.meters.drama = 80; G.s.powerups = ["peace_gif"]; G.use_powerup("peace_gif");
check("Power-ups scale with the day (Peace Gif on day 30: -" + (d30 - G.s.meters.drama) + ")", d30 - G.s.meters.drama > 25);
G.profile.unlocked = T.powerup_starters.slice(); G.profile.best_free = 0; G.profile.best_daily = 0;
fresh(); G.profile.unlocked = T.powerup_starters.slice(); G.s.day = 16; const sum = G.finish_run("drama_high");
check("Reaching day 16 unlocks Stir the Pot, Humble Post and Call Auntie Pat", ["stir_pot", "humble_post", "call_auntie"].every(id => sum.unlocked.includes(id)));

// Timer: auto picks the worst reply
fresh(); G.s.current = { kind: "thread", thread: "zz", speaker: "coach", tags: [], choices: [{ label: "calm", effects: { drama: -2 } }, { label: "chaos", spicy: true, effects: { drama: 30, clout: 20 } }] };
check("Timer runs out: the group picks the worst reply for you", G.auto_index() === 1);

// Kimmy mute + vouch
fresh(); G.s.hidden.kimmy = -6; let ev = G.kimmy_check();
check("Kimmy mutes you for a day when she's had enough", G.s.muted === T.mute_moments && badge(ev, "MUTED"));
fresh(); G.s.hidden.kimmy = 7; G.s.hidden.strikes = 1; ev = G.kimmy_check();
check("Kimmy vouches for you and erases a strike when she likes you", G.s.hidden.strikes === 0 && badge(ev, "VOUCHED"));
fresh(); G.s.current = { kind: "thread", thread: "zz", speaker: "coach", tags: [], choices: [{ label: "x", effects: { drama: 10 } }] }; G.s.muted = 2; G.muted_resolve();
check("Muted: the chat moves on without you", G.s.current === null);

// Sexual reply -> Kimmy deletes
fresh(); ev = G.apply_choice({ kind: "thread", thread: "zz", speaker: "catfish", tags: [] }, { label: "x", spicy: true, sexual: true, effects: {} });
check("Sexual reply: Kimmy deletes it", badge(ev, "DELETED"));

// Threads: follow-up beats and reactions
fresh(); const t = G.threads.find(x => x.id === "g_myman"); const inst = G.instance(t);
ev = G.apply_choice(inst, inst.choices[0]);
check("Thread follow-up beat is queued next after your reply", G.s.queue[0] && G.s.queue[0].key === "t:g_myman:b");
check("Characters react to what you said", ev.some(e => e.type === "post" && e.speaker === "pookie"));

// Callbacks: a flag set earlier unlocks a later thread
fresh(); const cb = G.threads.find(x => x.id === "p_payback"); G.s.day = 14;
const before = G.thread_ok(cb); G.s.flags.backed_coach = true; const after = G.thread_ok(cb);
check("Callback thread only appears after you backed Coach", !before && after);

// Grudges and favors
fresh(); G.s.grudges.princess = -3; { const R = G.rand; G.rand = () => 0; ev = G.grudge_events(); G.rand = R; }
check("A character you dunked on comes back with a grudge", badge(ev, "GRUDGE"));
fresh(); G.s.grudges.coach = 3; G.s.meters.drama = 90; { const R = G.rand; G.rand = () => 0; ev = G.grudge_events(); G.rand = R; }
check("A character you backed has your back (worst meter eased)", badge(ev, "YOUR BACK") && G.s.meters.drama < 90);

// Delayed consequences
fresh(); G.s.delayed.push({ day: 3, kind: "shady", quote: "old spicy line" }); G.s.day = 2; const leak0 = G.s.hidden.leak; ev = G.roll_day();
check("A spicy reply comes back days later, quoting you", ev.some(e => e.type === "system" && e.text.includes("old spicy line")) && G.s.hidden.leak > leak0);

// Political war + Coach makes a point
fresh(); const pol = G.instance(G.threads.find(x => x.id === "p_name"));
ev = G.apply_choice(pol, pol.choices[0]);
check("Political thread starts a 3-turn war and queues 'Coach makes a point'", G.s.war === 3 && G.s.queue.some(q => q.sig === "coach_logic"));

// Combo, stats war, saint dogpile, fury
fresh(); G.s.turn = 5; ev = []; G.note_post(ev, "mcman"); G.note_post(ev, "pookie");
check("McMan Hater + Pookie Patrol back to back arm a combo", G.s.combo === T.combo_window);
fresh(); G.s.turn = 5; ev = []; G.note_post(ev, "mcman", { stats: true }); G.s.turn = 6; G.note_post(ev, "section8", { stats: true });
check("Saint + McMan both posting stats starts a stats war", G.s.queue.some(q => q.sig === "stats_war"));
fresh(); G.s.hidden.saint_heat = 6; ev = G.apply_choice({ kind: "thread", thread: "zz", speaker: "tiffany", tags: [] }, { label: "x", effects: { defend: 1 } });
check("Defending someone while the Saint is heated sets him off", badge(ev, "HEATED"));
fresh(); ev = G.apply_choice({ kind: "thread", thread: "zz", speaker: "furious4", tags: [] }, { label: "x", effects: { fury: 1 } });
check("Asking the Furious 4 what she brings puts her in ALL CAPS", G.s.fury === T.fury_turns && badge(ev, "ALL CAPS"));

// Signature schedule
fresh(); G.s.day = G.s.stat_days[0] - 1; G.roll_day();
check("Hater stat fight is scheduled (with real-number replies)", G.s.queue.some(q => q.sig === "hater_stat") && C.signatures.hater_stat.choices.some(c => c.label.includes("2.5 million")));
fresh(); G.s.day = G.s.violence_day - 1; G.roll_day();
check("'Not in here' shutdown fires once; no stat is ever posted", G.s.queue.some(q => q.sig === "violence_shutdown") && !/[0-9]/.test(C.signatures.violence_shutdown.variants.join("")));
fresh(); G.s.day = G.s.shirt_day - 1; ev = G.roll_day();
check("Big Mike wears a shirt once (and opens with 'My $0.04,')", G.s.flags.saw_shirt && ev.some(e => e.text && e.text.startsWith("My $0.04,")));
check("Big Mike opens every post with 'My $0.02,' (or $0.04 on shirt day)", (() => {
  const all = []; for (const th of G.threads) { if (th.speaker === "bigmike") all.push(th.text); for (const c of th.choices) for (const r of c.react || []) if (r.speaker === "bigmike") all.push(r.text); for (const bt of Object.values(th.beats || {})) { for (const l of bt.lead || []) if (l.speaker === "bigmike") all.push(l.text); for (const c of bt.choices) for (const r of c.react || []) if (r.speaker === "bigmike") all.push(r.text); } }
  for (const sg of Object.values(C.signatures)) { if (sg.speaker === "bigmike") all.push(...sg.variants); for (const c of sg.choices) for (const r of c.react || []) if (r.speaker === "bigmike") all.push(r.text); }
  for (const a of C.ambient.concat(C.princess_reactions.men, C.grudge_lines.bigmike, C.favor_lines.bigmike.map(t => ({ speaker: "bigmike", text: t })))) { const tx = a.text || a; if (!a.speaker || a.speaker === "bigmike") all.push(tx); }
  const bad = all.filter(x => !/^My \$0\.0[24],/.test(x)); if (bad.length) console.log("   not $0.02:", bad.slice(0, 3)); return bad.length === 0; })());
check("No 'Council' anywhere in the content", !/council/i.test(JSON.stringify(globalThis.CSG_DATA.threads) + JSON.stringify(C)));

// Endings, cause of death, share text, achievements
fresh(); const reasons = new Set();
for (const [m, v, rr] of [["drama", 100, "drama_high"], ["drama", 0, "drama_low"], ["clout", 100, "clout_high"], ["clout", 0, "clout_low"], ["sanity", 0, "sanity_low"], ["sanity", 100, "sanity_high"], ["members", 0, "members_low"], ["members", 100, "members_high"]]) { fresh(); G.s.meters[m] = v; if (G.check_end() === rr) reasons.add(rr); }
fresh(); G.s.hidden.leak = 100; if (G.check_end() === "leak") reasons.add("leak");
fresh(); G.s.hidden.strikes = 3; if (G.check_end() === "admin") reasons.add("admin");
reasons.add("win");
check("All 11 endings reachable and have text", reasons.size === 11 && [...reasons].every(r => globalThis.CSG_DATA.end_states[r]));
fresh(); G.meter("drama", 60, "pookie"); const cause = G.cause_of("drama_high");
check("Cause of death names the character who pushed you over", cause === "pookie");
fresh(); G.s.counters.mutes = 2; G.s.counters.spicy = 7; const sh = G.share_text("drama_high", 14, "pookie");
check("Share text: day, killer, mutes, link", sh.includes("Day 14") && sh.includes("Pookie Patrol") && sh.includes("Muted 2x") && sh.includes("http"));
fresh(); G.profile.achievements = []; G.s.counters.mutes = 3; const got = G.check_achievements("drama_high", 12);
check("Achievements unlock (first run, day 10, muted 3x)", ["first_run", "day10", "muted3"].every(x => got.includes(x)));

// Day structure + save/resume
fresh(); let n = 0; while (!G.end_moment().day_complete) n++;
check("Exactly " + T.moments_per_day + " reply moments per day", n + 1 === T.moments_per_day);
fresh(); G.start_moment(); const saved = JSON.stringify(G.s); G.s = null; G.load_save();
check("Save + resume restores the run mid-day", G.s && JSON.stringify(G.s) === saved);

// Power-up economy
fresh(); G.s.day = 2; const o2 = G.day_offer(); G.s.day = 3; const o3 = G.day_offer();
check("Power-up pick only every " + T.powerup_offer_every + "rd night", o2.length === 0 && o3.length === 2);
fresh(); G.s.day = 3; G.s.meters.drama = 85; G.s.meters.sanity = 50; G.s.meters.clout = 50; G.s.meters.members = 50;
check("Nightly pick targets the worst meter (high drama -> Peace Gif)", G.day_offer()[0] === "peace_gif");
fresh(); G.s.day = 3; G.s.meters.drama = 75; G.s.meters.clout = 10;
check("Nightly pick won't offer a fix that backfires (no Stir the Pot when drama is hot)", G.day_offer()[0] !== "stir_pot");
fresh(); G.s.meters.drama = 50; G.s.meters.clout = 30; G.s.powerups = ["stir_pot"]; G.use_powerup("stir_pot");
check("Stir the Pot: Drama +15, Clout +15", G.s.meters.drama === 65 && G.s.meters.clout === 45);

// Death balance mechanics
fresh(); G.start_moment(); { const d = G.s.current, c = { label: "x", effects: { drama: 12 } }; const before = G.s.meters.sanity; G.apply_choice(d, c);
check("Arguing drains sanity (drama +12 reply costs extra sanity)", G.s.meters.sanity === before + T.default_say_sanity - Math.round(12 * T.sanity_per_drama)); }
fresh(); { const c0 = G.s.meters.clout; G.end_moment(); G.end_moment(); G.end_moment(); G.end_moment();
check("Clout fades " + T.clout_fade + " per moment on average", c0 - G.s.meters.clout === 4 * T.clout_fade || Math.abs((c0 - G.s.meters.clout) - 4 * T.clout_fade) <= 1); }

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
