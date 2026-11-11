// CSG game flow: menu → moments → day summary (+ power-up pick) → results.
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const GS = window.GameState;
  const sleep = s => new Promise(r => setTimeout(r, s * 1000));
  const NOTICE = { clout_high: "Account notice", admin: "Group deleted", leak: "Content notice" };
  const ICONS = { win: "🏆", drama_high: "💥", drama_low: "🪦", clout_high: "🚫", clout_low: "🦗", sanity_low: "📵", sanity_high: "😶", members_low: "👻", members_high: "🧟", leak: "📸", admin: "🗑️" };
  let token = 0, playing = false, tipped = {};

  const show = id => document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id));
  function refresh(anim) { const s = GS.s; UI.hud(s.meters, anim); UI.header(s); UI.banners(s); UI.trayRender(s, onUse, false); }
  function setMuted(v) {
    GS.profile.muted = v; GS.save_profile(); Sound.muted = v;
    $("btn-sound").textContent = $("btn-sound-menu").textContent = v ? "🔇" : "🔊";
  }

  // ---------- menu ----------
  function menu() {
    const p = GS.profile, today = GS.today_key();
    $("menu-best").textContent = "Free Play best: Day " + p.best_free + " • Daily best: Day " + p.best_daily;
    $("daily-sub").textContent = p.daily.date === today && p.daily.done ? "Today: made it to Day " + p.daily.best + ". Try again?" : "Same chat for everyone today";
    $("ach-count").textContent = p.achievements.length + "/" + GS.C.achievements.length;
    $("name-input").value = p.name || "";
    const save = GS.has_save();
    const cont = $("btn-continue-run");
    cont.hidden = !save;
    if (save) cont.innerHTML = "↩️ Continue<small>" + (save.mode === "daily" ? "Daily Run" : "Free Play") + " • Day " + save.day + "</small>";
    $("howto").hidden = true;
    show("screen-menu");
  }
  async function start(mode) {
    Sound.unlock();
    const name = $("name-input").value.trim();
    GS.profile.name = name; GS.save_profile();
    GS.new_run(mode, name);
    await enterFeed();
  }
  async function resume() { Sound.unlock(); if (!GS.load_save()) return menu(); await enterFeed(); }
  async function enterFeed() {
    token += 1; tipped = {};
    UI.clear(); UI.hideSummary(); show("screen-feed"); refresh(false);
    if (GS.s.moment >= GS.T.moments_per_day && !GS.s.current) return dayComplete();
    await loop();
  }

  // ---------- event playback ----------
  async function play(events) {
    const my = token;
    playing = true;
    for (const e of events || []) {
      if (my !== token) return;
      if (e.type === "post") {
        UI.typing(e.speaker); await sleep(GS.T.typing_seconds); if (my !== token) return;
        UI.untype(); UI.bubble(e); Sound.play("pop"); await sleep(GS.T.reveal_seconds);
      } else if (e.type === "you") { UI.you(e); Sound.play("send"); await sleep(0.2); }
      else if (e.type === "system") { UI.system(e.text); await sleep(0.4); }
      else if (e.type === "shake") UI.shake(e.strength);
      else if (e.type === "react") UI.reactions(e.count);
      else if (e.type === "sound") Sound.play(e.name);
      else if (e.type === "buzz") Sound.buzz();
      else if (e.type === "powerup") UI.toast("⚡ " + GS.C.powerups[e.id].name + " added");
      refresh(true);
    }
    playing = false;
  }
  async function ended() { const r = GS.check_end(); if (r) { await finish(r); return true; } return false; }

  // ---------- the loop ----------
  async function loop() {
    const my = token;
    const r = GS.start_moment();
    await play(r.events);
    if (my !== token || await ended()) return;
    if (!GS.profile.tutorial_done && !tipped.reply) { tipped.reply = true; UI.tip("<b>Reply before the bar runs out.</b> Every reply moves the 4 meters up top. Keep them out of the red, at <b>both</b> ends."); }
    if (!GS.profile.tutorial_done && !tipped.pu && GS.s.powerups.length) { tipped.pu = true; setTimeout(() => UI.tip("<b>⚡ Power-ups</b> fix a meter instantly. Tap one when something turns red. You can't win without them."), 6800); }
    showDecision();
  }
  function showDecision() {
    const s = GS.s, d = s.current;
    if (!d) return afterChoice();
    if (s.muted > 0) {
      UI.mutedBar(s.muted, async () => { await play(GS.muted_resolve()); await afterChoice(); });
      return;
    }
    const secs = GS.profile.tutorial_done ? GS.T.reply_timer_seconds : GS.T.reply_timer_first_run_seconds;
    UI.replies(d, async i => { await play(GS.choose(i)); await afterChoice(); }, secs, async () => {
      await play(GS.choose(GS.auto_index(), { auto: true })); await afterChoice();
    });
  }
  async function onUse(id) {
    if (playing || !GS.s || GS.s.over) return;
    const wasMuted = GS.s.muted > 0, hadDecision = !!GS.s.current;
    UI.timerPaused = true;
    const res = GS.use_powerup(id);
    await play(res.events);
    UI.timerPaused = false;
    if (await ended()) return;
    if (res.consumed) { UI.hideReplies(); return afterChoice(); }
    if (wasMuted && GS.s.muted === 0 && hadDecision) { showDecision(); return; }
    if (UI.timerAdd) UI.timerAdd(3000);
  }
  async function afterChoice() {
    const my = token;
    UI.hideReplies();
    if (await ended()) return;
    const res = GS.end_moment();
    await play(res.events);
    if (my !== token || await ended()) return;
    if (res.day_complete) return dayComplete();
    loop();
  }
  async function dayComplete() {
    {
      if (GS.s.day >= GS.T.total_days) return finish("win");
      await sleep(0.4);
      const offer = GS.day_offer();
      const getPick = UI.summary(GS.s, GS.day_deltas(), GS.flavor_line(), offer);
      $("btn-next-day").onclick = async () => {
        $("btn-next-day").onclick = null;
        GS.take_powerup(getPick()); UI.hideSummary();
        await play(GS.roll_day());
        if (await ended()) return;
        refresh(true); loop();
      };
    }
  }

  // ---------- results ----------
  async function finish(reason) {
    if (GS.s.over) return;
    const my = token;
    UI.hideReplies(); UI.hideSummary();
    const sum = GS.finish_run(reason);
    Sound.play(reason === "win" ? "win" : "lose");
    if (reason !== "win") { UI.shake(3); Sound.buzz([200, 80, 200]); await sleep(1.1); }
    if (my !== token) return;
    const st = GS.D.end_states[reason] || { title: reason, text: "" };
    const card = $("results-card");
    card.className = "results-card" + (reason === "win" ? " win" : "") + (NOTICE[reason] ? " notice" : "");
    $("results-head").textContent = "⚠️ " + (NOTICE[reason] || "Group notice");
    $("results-icon").textContent = ICONS[reason] || "💀";
    $("results-title").textContent = st.title; $("results-text").textContent = st.text;
    $("results-day").textContent = reason === "win" ? "All " + GS.T.total_days + " days survived" : "You made it to Day " + sum.reached;
    const cause = $("results-cause");
    cause.hidden = !sum.cause; cause.innerHTML = "";
    if (sum.cause) {
      const a = document.createElement("div"); a.className = "avatar"; a.innerHTML = CSG_AVATARS.avatarSVG(sum.cause);
      cause.append("Killed by ", a, GS.ch(sum.cause).name);
    }
    const extra = $("results-extra"); extra.innerHTML = "";
    const line = (t, cls) => { const d = document.createElement("div"); d.textContent = t; if (cls) d.className = cls; extra.append(d); };
    if (sum.newBest) line("⭐ New best!", "new");
    for (const id of sum.unlocked) line("🔓 Power-up unlocked: " + GS.C.powerups[id].icon + " " + GS.C.powerups[id].name, "new");
    for (const id of sum.achievements) { const a = GS.C.achievements.find(x => x.id === id); line("🏆 " + a.icon + " " + a.name, "new"); }
    $("btn-share").onclick = () => share(sum.share);
    show("screen-results");
  }
  async function share(text) {
    try { if (navigator.share) { await navigator.share({ text }); return; } } catch (e) { /* cancelled or unsupported */ }
    try { await navigator.clipboard.writeText(text); UI.toast("Copied! Paste it in the group."); }
    catch (e) { window.prompt("Copy your result:", text); }
  }

  // ---------- boot ----------
  function boot() {
    try { GS.load_data(); } catch (e) { document.body.textContent = "CSG failed to load: " + e.message; return; }
    UI.init(); setMuted(!!GS.profile.muted);
    $("btn-daily").onclick = () => start("daily");
    $("btn-free").onclick = () => start("free");
    $("btn-continue-run").onclick = resume;
    $("btn-howto").onclick = () => { $("howto").hidden = !$("howto").hidden; };
    $("btn-ach").onclick = () => UI.achievements(GS.profile);
    $("btn-ach-close").onclick = () => { $("ach-overlay").hidden = true; };
    $("btn-sound").onclick = $("btn-sound-menu").onclick = () => setMuted(!GS.profile.muted);
    $("btn-retry").onclick = () => { token += 1; menu(); };
    document.addEventListener("visibilitychange", () => { if (document.hidden && GS.s && !GS.s.over) GS.save(); });
    if (location.protocol === "https:" && "serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
    menu();
  }
  boot();
})();
