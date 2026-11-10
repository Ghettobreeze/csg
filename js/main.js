// CSG game flow: menu -> chat feed turns -> day summary -> results.
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const GS = window.GameState;
  const sleep = s => new Promise(r => setTimeout(r, s * 1000));
  const NOTICE_ENDS = { clout_high: "Account notice", admin: "Group deleted", leak: "Content notice" };
  const END_ICONS = { win: "🏆", drama_high: "💥", drama_low: "🪦", clout_high: "🚫", clout_low: "🦗",
    sanity_low: "📵", sanity_high: "😶", members_low: "👻", members_high: "🧟", leak: "📸", admin: "🗑️" };
  let currentDecision = null;
  let runToken = 0; // invalidates async chains from a previous run

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id));
  }

  function refresh(animate) {
    UI.updateHud(GS.meters, animate);
    UI.updateHeader(GS.day, GS.time_of_day, GS.member_count());
    UI.updateBanners(GS.war_turns, GS.combo_window);
    UI.updateKimmy(GS.kimmy_face());
    UI.setVignette(GS.hidden.admin_strikes === GS.tuning.admin_strikes_to_delete - 1);
  }

  function showMenu() {
    $("menu-best").textContent = "Best: Day " + GS.best_day;
    $("howto").hidden = true;
    showScreen("screen-menu");
  }

  // ---------- posting ----------
  async function post(speaker, text, opts) {
    const token = runToken;
    opts = opts || {};
    UI.showTyping(speaker);
    await sleep(GS.tuning.typing_indicator_seconds);
    if (token !== runToken) return;
    UI.hideTyping();
    UI.addBubble({ speaker, text, badge: opts.badge, kind: opts.kind, media: opts.media });
    await sleep(GS.tuning.message_reveal_seconds);
    await playEvents(GS.note_post(speaker, { stats: opts.stats, quiet: opts.quiet }));
  }

  async function playEvents(events) {
    for (const e of events || []) {
      if (e.type === "post") await post(e.speaker, e.text, { badge: e.badge, kind: e.kind || "ambient", quiet: e.quiet });
      else if (e.type === "system") { UI.addSystem(e.text); await sleep(0.45); }
      else if (e.type === "shake") UI.shake(e.strength);
      else if (e.type === "react") UI.reactions(e.count);
      refresh(true);
    }
  }

  async function checkEnd() {
    const r = GS.check_lose_conditions();
    if (r) { await endRun(r); return true; }
    return false;
  }

  // ---------- turns ----------
  async function startRun() {
    runToken += 1;
    GS.reset_run();
    UI.clearFeed();
    UI.hideSummary();
    showScreen("screen-feed");
    refresh(false);
    await playTurn();
  }

  async function playTurn() {
    const token = runToken;
    const pending = GS.pending_events; GS.pending_events = [];
    await playEvents(pending);
    if (token !== runToken || await checkEnd()) return;

    for (const a of GS.pick_ambient()) {
      await post(a.speaker, a.text, { kind: "ambient", stats: a.stats });
      GS.apply_ambient(a); refresh(true);
      if (token !== runToken) return;
    }
    if (await checkEnd()) return;

    const d = GS.next_decision();
    currentDecision = d;
    const media = d.type === "video" ? "video" : d.type === "image" ? "image" : null;
    await post(d.speaker, d.text, { badge: d.badge, kind: d.sig ? "signature decision" : "decision", media,
      stats: (d.tags || []).includes("stats") });
    await playEvents(GS.on_decision_posted(d));
    if (token !== runToken || await checkEnd()) return;
    refresh(true);

    if (GS.is_muted()) {
      UI.showMuted(GS.muted_turns);
      await sleep(1.4);
      if (token !== runToken) return;
      UI.hideReplyBar();
      await playEvents(GS.auto_resolve(d));
      await afterChoice(token);
      return;
    }
    UI.showReplyBar(d, GS.get_bonus_actions(), onChoice, onBonus);
  }

  async function onBonus(action) {
    const token = runToken;
    UI.hideReplyBar();
    UI.addPlayerAction(action.label);
    GS.note_post("you");
    await sleep(0.3);
    await playEvents(GS.bonus_action(action.id));
    if (token !== runToken || await checkEnd()) return;
    UI.showReplyBar(currentDecision, GS.get_bonus_actions(), onChoice, onBonus);
  }

  async function onChoice(choice) {
    const token = runToken;
    UI.hideReplyBar();
    if (choice.act) UI.addPlayerAction(choice.label);
    else { UI.addPlayerBubble(choice.label, choice.spicy); GS.note_post("you"); }
    await sleep(0.25);
    await playEvents(GS.apply_choice(currentDecision, choice));
    refresh(true);
    if (token !== runToken || await checkEnd()) return;
    await afterChoice(token);
  }

  async function afterChoice(token) {
    const res = GS.advance_decision();
    await playEvents(res.events);
    refresh(true);
    if (token !== runToken || await checkEnd()) return;

    if (res.day_complete) {
      await sleep(0.5);
      UI.showSummary(GS.day, GS.day_deltas(), GS.meters, GS.flavor_line());
    } else {
      await playTurn();
    }
  }

  async function onContinue() {
    UI.hideSummary();
    if (GS.day >= GS.tuning.total_days) { await endRun("win"); return; }
    GS.roll_day();
    refresh(true);
    UI.addSystem("— Day " + GS.day + " —");
    if (await checkEnd()) return;
    await playTurn();
  }

  // ---------- results ----------
  async function endRun(reason) {
    if ($("screen-results").classList.contains("active")) return;
    const token = runToken;
    GS.end_run(reason);
    UI.hideReplyBar();
    if (reason !== "win") { UI.shake(3); await sleep(1.2); }
    if (token !== runToken) return;
    const st = GS.end_states[reason] || { title: reason, text: "" };
    const card = $("results-card");
    card.className = "results-card" + (reason === "win" ? " win" : "") + (NOTICE_ENDS[reason] ? " notice" : "");
    $("results-head").textContent = "⚠️ " + (NOTICE_ENDS[reason] || "Group notice");
    $("results-icon").textContent = END_ICONS[reason] || "💀";
    $("results-title").textContent = st.title;
    $("results-text").textContent = st.text;
    $("results-day").textContent = reason === "win" ? "All " + GS.tuning.total_days + " days survived" : "You made it to Day " + GS.day;
    $("results-best").textContent = "Best: Day " + GS.best_day;
    showScreen("screen-results");
  }

  function boot() {
    try { GS.load_data(); } catch (e) {
      document.body.textContent = "CSG failed to load its data files: " + e.message; return;
    }
    UI.init();
    $("btn-start").onclick = startRun;
    $("btn-howto").onclick = () => { $("howto").hidden = !$("howto").hidden; };
    $("btn-continue").onclick = onContinue;
    $("btn-retry").onclick = () => { runToken += 1; GS.reset_run(); showMenu(); };
    showMenu();
  }
  boot();
})();
