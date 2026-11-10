// Deterministic checks for v2 signature moves, systems and every end state.
// Run from the CSG folder:  node tools/acceptance.js
const path = require("path");
const base = path.join(__dirname, "..");
for (const f of ["data/tuning.js", "data/characters.js", "data/messages.js", "data/end_states.js"]) require(path.join(base, f));
const G = require(path.join(base, "js/game_state.js"));
G.load_data();
let pass = 0, fail = 0;
function check(name, cond) { if (cond) pass++; else fail++; console.log((cond ? "PASS " : "FAIL ") + name); }
const sig = k => G.make_sig(k);
const pickChoice = (d, label) => d.choices.find(c => c.label.startsWith(label));
const choose = (d, label) => G.apply_choice(d, pickChoice(d, label));
const hasBadge = (ev, b) => ev.some(e => e.badge && e.badge.includes(b));
const card = id => G.decisions.find(d => d.id === id);
const spicy = { label: "x", spicy: true, effects: {} };

check("Roster has 25 characters", G.roster.length === 25);
check("Crypto Craig and Prof are cut", !G.characters.cryptocraig && !G.characters.prof);
check("Every choice is 2-3 options with a real label", G.decisions.every(d => d.choices.length >= 2 && d.choices.length <= 3 && d.choices.every(c => c.label && c.label.length < 240)));

// Kimmy: warning, mute, auto-resolve, unmute, love side vouch, hate side report
G.reset_run(); G.kimmy_love = 5; let ev = choose(card("cat_marcus"), "Marcus, it's for the culture");
check("Kimmy warns first when she likes you", hasBadge(ev, "FAMILY GROUP") && !G.is_muted());
ev = choose(card("cat_mike"), "she's got a point");
check("Second offense: Kimmy mutes you for a day", hasBadge(ev, "MUTED") && G.muted_turns === G.tuning.mute_turns);
ev = G.auto_resolve(card("kimmy_fenced"));
check("While muted, the group answers for you", ev[0].text.includes("muted"));
let unmuted = false; for (let i = 0; i < G.tuning.mute_turns; i++) unmuted = hasBadge(G.advance_decision().events, "UNMUTED") || unmuted;
check("Kimmy unmutes you after a day", !G.is_muted() && unmuted);
G.reset_run(); G.kimmy_love = 8; G.rng = () => 0;
ev = G.apply_choice({ id: "r1", tags: [] }, spicy);
check("Love side: Kimmy talks Big Bro out of a strike", hasBadge(ev, "KIMMY VOUCHED") && G.hidden.admin_strikes === 0);
G.reset_run(); G.kimmy_love = -9; G.rng = () => 0.99;
ev = choose(card("cat_marcus"), "Marcus, it's for the culture");
check("Hate side: mute comes with a report to Big Bro", hasBadge(ev, "MUTED") && hasBadge(ev, "STRIKE"));
G.rng = Math.random;

// Pander Princess: co-signs, men reply, meaner after exposure, beef with Mike
G.reset_run(); const take = sig("princess_take"); ev = G.on_decision_posted(take);
check("Princess post: Pookie + McMan co-sign and a man replies", ev.filter(e => e.type === "post").length === 3 && ev.some(e => e.speaker === "pookie") && ev.some(e => e.speaker === "mcman"));
check("Co-signs don't arm the combo", ev.every(e => e.quiet || !["pookie", "mcman"].includes(e.speaker)));
choose(sig("princess_take"), "post his spot"); let before = G.meters.drama; choose(sig("princess_take"), "PREACH");
check("Exposed Princess comes back meaner", G.meters.drama - before > Math.round(20 * G.tuning.choice_effect_scale));
G.reset_run(); choose(card("princess_mike"), "tag Big Mike");
check("Tagging Mike starts a video beef", G.sig_queue[0] && G.sig_queue[0].sig === "bigmike_beef");

// McMan Hater + Pookie Patrol combo, peace gif
G.reset_run(); G.turn = 5; G.note_post("pookie"); G.turn = 6; ev = G.note_post("mcman");
check("McMan + Pookie back to back arms the combo", G.combo_window === 2 && hasBadge(ev, "COMBO"));
const d0 = G.meters.drama; G.advance_decision(); ev = G.advance_decision().events;
check("Undefused combo hits Drama +40", hasBadge(ev, "COMBO HIT") && G.meters.drama >= d0 + 40 - 2 * G.tuning.drama_cooldown_per_turn - 2);
G.reset_run(); G.turn = 5; G.note_post("pookie"); G.note_post("mcman");
check("Peace gif offered and defuses", G.get_bonus_actions().some(a => a.id === "peace_gif") && (G.bonus_action("peace_gif"), G.combo_window === 0));

// Stats war
G.reset_run(); G.turn = 3; G.note_post("mcman", { stats: true }); G.turn = 5; ev = G.note_post("section8", { stats: true });
check("McMan + Saint junk stats close together start a stats war", G.sig_queue[0] && G.sig_queue[0].sig === "stats_war");

// Saint: Council anger, one-man dogpile, Auntie Pat calms
G.reset_run(); for (let i = 0; i < 5; i++) G.apply_choice(Object.assign({}, card("saint_highvalue"), { id: "c" + i }), card("saint_highvalue").choices[1]);
check("Saint cards raise Council anger", G.hidden.council_anger >= 5);
ev = choose(sig("tiffany_dogpile"), "defend her");
check("Defending someone triggers the one-man Council dogpile", hasBadge(ev, "COUNCIL DOGPILE") && ev.filter(e => e.speaker === "section8").length >= 4);
G.reset_run(); G.hidden.council_anger = 4;
check("Auntie Pat offered and calms the Saint", G.get_bonus_actions().some(a => a.id === "auntie") && (G.bonus_action("auntie"), G.hidden.council_anger === 0));

// Coach vs the three
G.reset_run(); ev = choose(card("debra_strategy"), "leave it on read");
check("Political card starts a 3-turn war", G.war_turns === 3 && hasBadge(ev, "FACTION WAR"));
check("War queues Coach's 'makes a point' card", G.sig_queue[0] && G.sig_queue[0].sig === "coach_logic");
const cl = sig("coach_logic");
check("Backing Coach: Kimmy up, Clout down", (() => { const k = G.kimmy_love, c = G.meters.clout; choose(cl, "Coach is right"); return G.kimmy_love > k && G.meters.clout < c; })());
G.advance_decision(); G.advance_decision(); ev = G.advance_decision().events;
check("War ends after 3 turns", G.war_turns === 0 && ev.some(e => e.text && e.text.includes("burned out")));
check("No real politician names in content", !/trump|biden|obama|harris|desantis/i.test(JSON.stringify(G.content)));

// Furious 4
G.reset_run(); ev = choose(card("f4_requirements"), "what do YOU bring");
check("Asking what she brings: ALL CAPS mode for 3 turns", hasBadge(ev, "ALL CAPS") && G.fury_turns === 3);
ev = G.advance_decision().events;
check("Caps mode posts with backup", hasBadge(ev, "ALL CAPS") && ev.filter(e => e.type === "post").length >= 2);

// Big Mike
G.reset_run(); ev = G.on_decision_posted(sig("bigmike_video"));
check("Mike videos get shirt begs", ev.some(e => e.type === "post" && G.content.shirt_begs.some(b => b[1] === e.text)));
G.reset_run(); G.hidden.bigmike_escalation = 2; G.day = 19; G.roll_day();
check("Ignored Mike goes live by day 20", G.flags.livestream && G.sig_queue[0].sig === "bigmike_live");
G.reset_run(); G.day = G.flags.shirt_day - 1; ev = G.roll_day();
check("Once per run, Mike wears a shirt", hasBadge(ev, "SHIRT ON"));

// Big Bro, Shady, Lurker, Marcus, Brittany, Boss Babe, Dave
G.reset_run(); G.day = G.flags.bigbro_days[0] - 1; ev = G.roll_day();
check("Big Bro rare drop (rap or joke)", hasBadge(ev, "BIG BRO"));
G.reset_run(); G.rng = () => 0; G.kimmy_love = 0; ev = [];
for (let i = 0; i < 3; i++) ev = ev.concat(G.apply_choice({ id: "s" + i, tags: [] }, spicy));
check("Strikes announced as raps; 3 = deleted", hasBadge(ev, "STRIKE 2/3") && G.check_lose_conditions() === "admin");
G.rng = Math.random;
G.reset_run(); G.rng = () => 0.99; G.flags.last_spicy_reply = "Coach got EXPELLED"; G.hidden.leak = 89;
ev = G.apply_choice({ id: "x", tags: [] }, { label: "screenshot it", act: true, spicy: true, effects: {} });
check("Shady's other group quotes your reply at high leak", ev.some(e => e.type === "system" && e.text.includes("Coach got EXPELLED")));
G.reset_run(); for (let i = 0; i < 9; i++) G.apply_choice({ id: "l" + i, tags: [] }, spicy);
check("Leak 100 ends the run", G.check_lose_conditions() === "leak");
G.rng = Math.random;
G.reset_run(); for (let i = 0; i < 40; i++) G.note_post("kimmy");
check("Lurker speaks once after 40 messages", hasBadge(G.advance_decision().events, "LURKER") && !hasBadge(G.advance_decision().events, "LURKER"));
G.reset_run(); choose(sig("marcus_leaving"), "bye Marcus");
check("Calling Marcus's bluff: he leaves with 3", G.flags.marcus_left && G.member_count() === 21);
G.reset_run(); G.day = G.flags.brittany_day - 1; G.roll_day();
check("Brittany detonates her target", G.sig_queue.some(s => s.sig === "brittany_bomb" && s.text.includes(G.target_name())));
G.reset_run(); G.hidden.bossbabe_recruit_progress = 9; G.day = 11; ev = G.roll_day();
check("Unchecked Boss Babe recruits Tiffany on day 12", hasBadge(ev, "TIFFANY RECRUITED"));
G.reset_run(); G.time_of_day = "night"; G.note_post("drunktdave"); ev = G.roll_day();
check("Drunk Dave's 9am apology", hasBadge(ev, "9AM APOLOGY"));

// End states and day structure
const reasons = new Set(["win"]);
for (const [m, v, r] of [["drama", 100, "drama_high"], ["drama", 0, "drama_low"], ["clout", 100, "clout_high"], ["clout", 0, "clout_low"],
  ["sanity", 0, "sanity_low"], ["sanity", 100, "sanity_high"], ["members", 0, "members_low"], ["members", 100, "members_high"]]) {
  G.reset_run(); G.meters[m] = v; if (G.check_lose_conditions() === r) reasons.add(r);
}
G.reset_run(); G.hidden.leak = 100; if (G.check_lose_conditions() === "leak") reasons.add("leak");
G.reset_run(); G.hidden.admin_strikes = 3; if (G.check_lose_conditions() === "admin") reasons.add("admin");
check("All 11 end states reachable with text", reasons.size === 11 && [...reasons].every(r => G.end_states[r]));
G.reset_run(); let n = 1; while (!G.advance_decision().day_complete) n++;
check("Exactly " + G.tuning.decisions_per_day + " decisions per day", n === G.tuning.decisions_per_day);

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
