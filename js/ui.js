// CSG UI: bubbles, meters, reply bar, power-up tray, overlays, effects. No game rules here.
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const METERS = [{ id: "drama", label: "🔥 Drama", long: "🔥 Drama" }, { id: "clout", label: "😎 Clout", long: "😎 Clout" },
    { id: "sanity", label: "🧠 Sanity", long: "🧠 Sanity" }, { id: "members", label: "👥 Crew", long: "👥 Members" }];
  const TOD = { morning: "☀️ Morning", afternoon: "🌤️ Afternoon", night: "🌙 Night" };
  const MAX_FEED = 160;
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function readable(hex) {
    const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    if ((0.299 * r + 0.587 * g + 0.114 * b) / 255 >= 0.4) return hex;
    const mix = c => Math.round(c + (255 - c) * 0.55); return "rgb(" + mix(r) + "," + mix(g) + "," + mix(b) + ")";
  }
  function avatar(id) {
    const a = el("div", "avatar");
    a.innerHTML = CSG_AVATARS.avatarSVG(id) || "";
    return a;
  }

  const UI = {
    meterEls: {}, prev: null, lastRow: null, timerRaf: 0,
    init() {
      this.feed = $("feed"); this.scroll = $("feed-scroll"); this.reply = $("reply-bar"); this.tray = $("tray");
      this.fx = $("fx-layer"); this.app = $("app");
      const logo = CSG_AVATARS.logoSVG();
      $("menu-logo").innerHTML = logo; $("group-avatar").innerHTML = logo;
      const hud = $("hud"); hud.innerHTML = "";
      for (const m of METERS) {
        const box = el("div", "meter"), top = el("div", "meter-top");
        top.append(el("span", "", m.label), el("span", "meter-val", "50"));
        const track = el("div", "meter-track"), fill = el("div", "meter-fill");
        track.append(fill); box.append(top, track); hud.append(box);
        this.meterEls[m.id] = { box, val: top.lastChild, fill };
      }
      document.documentElement.style.setProperty("--reveal", GameState.T.reveal_seconds + "s");
    },
    clear() { this.feed.innerHTML = ""; this.reply.innerHTML = ""; this.tray.innerHTML = ""; this.prev = null; this.lastRow = null; },
    trim() { while (this.feed.children.length > MAX_FEED) this.feed.firstChild.remove(); },
    bottom() { this.scroll.scrollTop = this.scroll.scrollHeight; },

    typing(speaker) {
      this.untype();
      const ch = GameState.ch(speaker);
      const row = el("div", "row typing"), msg = el("div", "msg"), b = el("div", "bubble");
      b.style.setProperty("--tc", readable(ch.color));
      b.append(document.createTextNode(ch.name + " is typing"));
      const d = el("span", "dots"); d.innerHTML = "<span>.</span><span>.</span><span>.</span>"; b.append(d);
      msg.append(b); row.append(avatar(speaker), msg); this.feed.append(row); this.typingRow = row; this.bottom();
    },
    untype() { if (this.typingRow) { this.typingRow.remove(); this.typingRow = null; } },
    bubble(e) {
      const ch = GameState.ch(e.speaker);
      const row = el("div", "row " + (e.kind || "")), msg = el("div", "msg");
      const nm = el("div", "msg-name", ch.name); nm.style.color = readable(ch.color); msg.append(nm);
      if (e.badge) { const b = el("div", "badge", e.badge); b.style.color = readable(ch.color); msg.append(b); row.style.setProperty("--sig", ch.color); }
      const b = el("div", "bubble");
      if (e.media === "video" || e.media === "image") b.append(el("div", "media" + (e.media === "image" ? " image" : ""), e.media === "video" ? "▶️" : "🖼️"));
      b.append(document.createTextNode(e.text)); msg.append(b);
      row.append(avatar(e.speaker), msg); this.feed.append(row); this.trim(); this.bottom(); this.lastRow = row;
    },
    you(e) {
      if (e.act) { const a = el("div", "act-line", "you: " + e.text.replace(/^./, c => c.toLowerCase())); this.feed.append(a); this.trim(); this.bottom(); this.lastRow = a; return; }
      const row = el("div", "row you"), msg = el("div", "msg");
      if (e.auto) msg.append(el("div", "you-tag", "⏱️ auto-sent"));
      msg.append(el("div", "bubble" + (e.spicy ? " spicy" : "") + (e.powerup ? " power" : ""), e.text));
      row.append(msg); this.feed.append(row); this.trim(); this.bottom(); this.lastRow = row; this.lastYou = msg;
    },
    system(text) { const d = el("div", "system", text); this.feed.append(d); this.trim(); this.bottom(); },

    header(s) {
      $("day-label").textContent = "Day " + s.day + " of " + GameState.T.total_days + " • " + (TOD[s.tod] || s.tod);
      $("member-count").textContent = GameState.member_count();
      $("kimmy-face").innerHTML = GameState.kimmy_face() + "<small>Kimmy</small>";
    },
    hud(meters, animate) {
      const T = GameState.T;
      for (const m of METERS) {
        const v = meters[m.id], e = this.meterEls[m.id];
        e.val.textContent = v; e.fill.style.width = v + "%";
        e.box.classList.toggle("danger", v <= T.danger_low || v >= T.danger_high);
        if (animate && this.prev && this.prev[m.id] !== v) {
          const d = v - this.prev[m.id];
          e.box.classList.remove("flash"); void e.box.offsetWidth; e.box.classList.add("flash");
          const pop = el("span", "meter-delta " + (d > 0 ? "up" : "down"), (d > 0 ? "+" : "") + d);
          e.box.append(pop); setTimeout(() => pop.remove(), 950);
        }
      }
      this.prev = Object.assign({}, meters);
    },
    banners(s) {
      const T = GameState.T;
      const set = (id, on, text) => { const b = $(id); b.hidden = !on; if (on && text) b.textContent = text; };
      set("war-banner", s.war > 0, "⚠️ FACTION WAR • Coach vs everybody • " + s.war + " turn" + (s.war > 1 ? "s" : "") + " left");
      set("combo-banner", s.combo > 0, "💥 COMBO • Drama +" + T.combo_drama + " in " + s.combo + " • use a Peace Gif");
      set("fury-banner", s.fury > 0, "😤 THE FURIOUS 4 IS IN ALL CAPS • " + s.fury + " turn" + (s.fury > 1 ? "s" : ""));
      set("strike-banner", s.hidden.strikes === T.strikes_to_delete - 1);
      set("mute-banner", s.muted > 0, "🔇 Muted by Kimmy • " + s.muted + " turn" + (s.muted > 1 ? "s" : "") + " left");
      $("vignette").classList.toggle("on", s.hidden.strikes === T.strikes_to_delete - 1);
    },
    trayRender(s, onUse, highlight) {
      this.tray.innerHTML = "";
      if (!s.powerups.length) return;
      this.tray.append(el("span", "pu-label", "⚡"));
      s.powerups.forEach((id, i) => {
        const P = GameState.C.powerups[id];
        const b = el("button", "pu" + (highlight ? " glow" : ""));
        b.title = P.desc; b.textContent = P.icon + " " + P.name;
        b.onclick = () => onUse(id, i);
        this.tray.append(b);
      });
    },
    shake(n) { const s = Math.max(1, Math.min(3, n || 1)); this.app.classList.remove("shake-1", "shake-2", "shake-3"); void this.app.offsetWidth; this.app.classList.add("shake-" + s); setTimeout(() => this.app.classList.remove("shake-" + s), 650); },
    reactions(count) {
      const anchor = this.lastRow; if (!anchor) return;
      const emojis = ["❤️", "😂", "😮", "🔥", "💀"], ar = this.app.getBoundingClientRect(), r = anchor.getBoundingClientRect();
      for (let i = 0; i < count; i++) {
        const p = el("span", "pop", emojis[Math.floor(Math.random() * emojis.length)]);
        p.style.left = (r.left - ar.left + 20 + Math.random() * Math.max(40, r.width - 40)) + "px";
        p.style.top = (r.top - ar.top + r.height * 0.4) + "px"; p.style.animationDelay = (i * 0.09) + "s";
        this.fx.append(p); setTimeout(() => p.remove(), 1500 + i * 90);
      }
      if (this.lastYou && anchor.classList.contains("you") && !this.lastYou.querySelector(".reactions-chip")) {
        this.lastYou.append(el("div", "reactions-chip", emojis.slice().sort(() => Math.random() - 0.5).slice(0, 2).join("") + " " + (count * 3 + Math.floor(Math.random() * 12))));
      }
    },

    // Reply bar with a countdown. onTimeout fires once if the bar is still up when time runs out.
    replies(d, onPick, seconds, onTimeout) {
      const bar = this.reply; bar.innerHTML = "";
      const head = el("div", "reply-head"), timer = el("div", "timer"), fill = el("div", "timer-fill");
      timer.append(fill); head.append(el("span", "", "Reply to " + GameState.ch(d.speaker).name), timer); bar.append(head);
      const lock = () => { this.stopTimer(); bar.querySelectorAll("button").forEach(b => b.disabled = true); };
      d.choices.forEach((c, i) => {
        const b = el("button", "choice" + (c.spicy ? " spicy" : "") + (c.act ? " act" : ""));
        const lbl = el("span", "lbl"); lbl.append(el("span", "main", c.label));
        const hints = []; if (c.hint) hints.push(c.hint); if (c.spicy) hints.push("🌶️ spicy");
        if (hints.length) lbl.append(el("span", "hint", hints.join(" · ")));
        b.append(lbl); b.onclick = () => { lock(); onPick(i); }; bar.append(b);
      });
      this.startTimer(fill, timer, seconds, () => { lock(); onTimeout(); });
      setTimeout(() => this.bottom(), 30);
    },
    startTimer(fill, timer, seconds, done) {
      this.stopTimer();
      let left = seconds * 1000, last = performance.now(), ticked = 0;
      const step = now => {
        const dt = now - last; last = now;
        if (!document.hidden && !this.timerPaused) left -= dt;
        fill.style.transform = "scaleX(" + Math.max(0, left / (seconds * 1000)) + ")";
        timer.classList.toggle("low", left < 3000);
        if (left < 3000 && Math.ceil(left / 1000) !== ticked) { ticked = Math.ceil(left / 1000); Sound.play("tick"); }
        if (left <= 0) { this.timerRaf = 0; done(); return; }
        this.timerRaf = requestAnimationFrame(step);
      };
      this.timerAdd = ms => { left = Math.min(seconds * 1000, left + ms); };
      this.timerRaf = requestAnimationFrame(step);
    },
    stopTimer() { if (this.timerRaf) cancelAnimationFrame(this.timerRaf); this.timerRaf = 0; },
    mutedBar(turns, onWait) {
      this.reply.innerHTML = "";
      this.reply.append(el("div", "muted-note", "🔇 Kimmy muted you. " + turns + " turn" + (turns > 1 ? "s" : "") + " left. Use 🏡 Kimmy's Favor to get unmuted."));
      const b = el("button", "choice act"); b.append(el("span", "lbl", "sit quietly and let the chat go on")); b.onclick = () => { b.disabled = true; onWait(); };
      this.reply.append(b); this.bottom();
    },
    hideReplies() { this.stopTimer(); this.reply.innerHTML = ""; },

    tip(html, ms) {
      const old = this.app.querySelector(".tip"); if (old) old.remove();
      const t = el("div", "tip"); t.innerHTML = html; this.app.append(t);
      t.onclick = () => t.remove(); setTimeout(() => t.remove(), ms || 6500);
    },
    toast(text) { const t = el("div", "toast", text); this.app.append(t); setTimeout(() => t.remove(), 2200); },

    summary(s, deltas, flavor, offer, onPick) {
      $("summary-day").textContent = "Day " + s.day + " complete";
      const rows = $("summary-rows"); rows.innerHTML = "";
      for (const m of METERS) {
        const d = deltas[m.id], r = el("div", "srow");
        r.append(el("span", "", m.long + "  " + s.meters[m.id]), el("span", "delta " + (d > 0 ? "up" : d < 0 ? "down" : "flat"), d > 0 ? "▲ +" + d : d < 0 ? "▼ " + d : "– 0"));
        rows.append(r);
      }
      $("summary-flavor").textContent = flavor;
      const wrap = $("offer-wrap"), box = $("offers"); box.innerHTML = "";
      wrap.hidden = !offer || !offer.length;
      let picked = offer && offer[0];
      (offer || []).forEach((id, i) => {
        const P = GameState.C.powerups[id], o = el("div", "offer" + (i === 0 ? " picked" : ""));
        o.append(el("div", "ic", P.icon), el("div", "nm", P.name), el("div", "ds", P.desc));
        o.onclick = () => { box.querySelectorAll(".offer").forEach(x => x.classList.remove("picked")); o.classList.add("picked"); picked = id; };
        box.append(o);
      });
      if (offer && offer.length) {
        const full = s.powerups.length >= GameState.T.powerup_max;
        $("offer-wrap").querySelector(".offer-title").textContent = full ? "⚡ Pick a power-up (replaces your oldest)" : "⚡ Pick a power-up";
      }
      const tip = this.app.querySelector(".tip"); if (tip) tip.remove();
      $("summary").hidden = false;
      return () => picked;
    },
    hideSummary() { $("summary").hidden = true; },

    achievements(profile) {
      const list = $("ach-list"); list.innerHTML = "";
      for (const a of GameState.C.achievements) {
        const got = profile.achievements.includes(a.id), r = el("div", "ach" + (got ? "" : " locked"));
        const t = el("div"); t.append(el("div", "nm", a.name), el("div", "ds", a.desc));
        r.append(el("div", "ic", a.icon), t); list.append(r);
      }
      $("ach-overlay").hidden = false;
    }
  };
  window.UI = UI;
})();
