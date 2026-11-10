// CSG UI: builds chat bubbles, HUD, reply bar and effects. Knows nothing about rules.
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const METERS = [
    { id: "drama", label: "🔥 Drama" }, { id: "clout", label: "😎 Clout" },
    { id: "sanity", label: "🧠 Sanity" }, { id: "members", label: "👥 Crew", long: "👥 Members" }
  ];
  const TOD = { morning: "☀️ Morning", afternoon: "🌤️ Afternoon", night: "🌙 Night" };
  const MAX_FEED = 150;

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  // Lighten very dark character colors so names stay readable on the dark theme.
  function readable(hex) {
    const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    if (lum >= 0.4) return hex;
    const mix = c => Math.round(c + (255 - c) * 0.55);
    return "rgb(" + mix(r) + "," + mix(g) + "," + mix(b) + ")";
  }

  const UI = {
    meterEls: {}, prevMeters: null, lastBubble: null,

    init() {
      this.feed = $("feed"); this.scroll = $("feed-scroll"); this.reply = $("reply-bar");
      this.fx = $("fx-layer"); this.app = $("app");
      const hud = $("hud"); hud.innerHTML = "";
      for (const m of METERS) {
        const box = el("div", "meter");
        const top = el("div", "meter-top");
        top.append(el("span", "", m.label), el("span", "meter-val", "50"));
        const track = el("div", "meter-track"); const fill = el("div", "meter-fill");
        track.append(fill); box.append(top, track); hud.append(box);
        this.meterEls[m.id] = { box, val: top.lastChild, fill };
      }
      document.documentElement.style.setProperty("--reveal", GameState.tuning.message_reveal_seconds + "s");
    },

    clearFeed() { this.feed.innerHTML = ""; this.reply.innerHTML = ""; this.prevMeters = null; this.lastBubble = null; },

    trim() { while (this.feed.children.length > MAX_FEED) this.feed.firstChild.remove(); },
    scrollToBottom() { this.scroll.scrollTop = this.scroll.scrollHeight; },

    avatar(ch) {
      const a = el("div", "avatar", ch.emoji);
      a.style.background = ch.color;
      return a;
    },

    showTyping(speaker) {
      this.hideTyping();
      const ch = GameState.get_character(speaker);
      const row = el("div", "row typing");
      const msg = el("div", "msg"); const b = el("div", "bubble");
      b.style.setProperty("--tc", readable(ch.color));
      b.append(document.createTextNode(ch.name + " is typing"));
      const dots = el("span", "dots"); dots.innerHTML = "<span>.</span><span>.</span><span>.</span>";
      b.append(dots); msg.append(b); row.append(this.avatar(ch), msg);
      this.feed.append(row); this.typingRow = row; this.scrollToBottom();
    },
    hideTyping() { if (this.typingRow) { this.typingRow.remove(); this.typingRow = null; } },

    addBubble(o) {
      const ch = GameState.get_character(o.speaker);
      const row = el("div", "row" + (o.kind ? " " + o.kind : ""));
      const msg = el("div", "msg");
      const name = el("div", "msg-name", ch.name); name.style.color = readable(ch.color);
      msg.append(name);
      if (o.badge) {
        const badge = el("div", "badge", o.badge); badge.style.color = readable(ch.color);
        msg.append(badge);
        row.style.setProperty("--sig", ch.color);
      }
      const b = el("div", "bubble");
      if (o.media === "video" || o.media === "image") {
        const m = el("div", "media" + (o.media === "image" ? " image" : ""), o.media === "video" ? "▶️" : "🖼️");
        b.append(m);
      }
      b.append(document.createTextNode(o.text));
      msg.append(b); row.append(this.avatar(ch), msg);
      this.feed.append(row); this.trim(); this.scrollToBottom();
      this.lastBubble = row;
      return row;
    },

    addPlayerBubble(text, spicy) {
      const row = el("div", "row you");
      const msg = el("div", "msg");
      msg.append(el("div", "bubble" + (spicy ? " spicy" : ""), text));
      row.append(msg);
      this.feed.append(row); this.trim(); this.scrollToBottom();
      this.lastBubble = row; this.lastPlayerMsg = msg;
      return row;
    },

    addPlayerAction(text) {
      const d = el("div", "you-action", "you " + text);
      this.feed.append(d); this.trim(); this.scrollToBottom();
      this.lastBubble = d; this.lastPlayerMsg = null;
      return d;
    },

    hintFor(c) {
      if (c.hint) return c.hint;
      const e = c.effects || {};
      if (e.offense) return "Kimmy will NOT like this";
      if (e.defend) return "defends them";
      if ((e.kimmy || 0) > 0) return "Kimmy likes this";
      if ((e.kimmy || 0) < 0) return "Kimmy won't like this";
      return "";
    },

    choiceLabel(c) {
      const lbl = el("span", "lbl");
      lbl.append(el("span", c.act ? "act" : "say", c.label));
      const h = this.hintFor(c);
      if (h) lbl.append(el("span", "hint", h));
      return lbl;
    },

    updateKimmy(face) {
      const f = $("kimmy-face");
      if (f.textContent !== face) { f.textContent = face; f.classList.remove("bump"); void f.offsetWidth; f.classList.add("bump"); }
    },

    showMuted(turnsLeft) {
      this.reply.innerHTML = "";
      this.reply.append(el("div", "muted-bar", "🔇 Muted by Kimmy • " + turnsLeft + " turn" + (turnsLeft > 1 ? "s" : "") + " left • the group decides without you"));
      setTimeout(() => this.scrollToBottom(), 30);
    },

    addSystem(text) {
      const d = el("div", "system", text);
      this.feed.append(d); this.trim(); this.scrollToBottom();
      return d;
    },

    updateHeader(day, tod, members) {
      $("day-label").textContent = "Day " + day + " • " + (TOD[tod] || tod);
      $("member-count").textContent = members;
    },

    updateHud(meters, animate) {
      for (const m of METERS) {
        const v = meters[m.id], e = this.meterEls[m.id];
        e.val.textContent = v;
        e.fill.style.width = v + "%";
        e.box.classList.toggle("danger", v <= 20 || v >= 80);
        if (animate && this.prevMeters && this.prevMeters[m.id] !== v) {
          const d = v - this.prevMeters[m.id];
          e.box.classList.remove("flash"); void e.box.offsetWidth; e.box.classList.add("flash");
          const pop = el("span", "meter-delta " + (d > 0 ? "up" : "down"), (d > 0 ? "+" : "") + d);
          e.box.append(pop); setTimeout(() => pop.remove(), 950);
        }
      }
      this.prevMeters = Object.assign({}, meters);
    },

    updateBanners(warTurns, comboWindow) {
      const w = $("war-banner"), c = $("combo-banner");
      w.hidden = !(warTurns > 0);
      if (warTurns > 0) w.textContent = "⚠ FACTION WAR • Coach vs Prof • " + warTurns + " turn" + (warTurns > 1 ? "s" : "") + " left";
      c.hidden = !(comboWindow > 0);
      if (comboWindow > 0) c.textContent = "💥 COMBO • Drama +" + GameState.tuning.combo_drama + " in " + comboWindow + " turn" + (comboWindow > 1 ? "s" : "") + " • post peace gif";
    },

    setVignette(on) {
      $("vignette").classList.toggle("on", on);
      $("strike-banner").hidden = !on;
    },

    shake(strength) {
      const s = Math.max(1, Math.min(3, strength || 1));
      this.app.classList.remove("shake-1", "shake-2", "shake-3");
      void this.app.offsetWidth;
      this.app.classList.add("shake-" + s);
      setTimeout(() => this.app.classList.remove("shake-" + s), 650);
    },

    reactions(count) {
      const anchor = this.lastBubble;
      if (!anchor) return;
      const emojis = ["❤️", "😂", "😮", "🔥"];
      const appRect = this.app.getBoundingClientRect();
      const r = anchor.getBoundingClientRect();
      for (let i = 0; i < count; i++) {
        const p = el("span", "pop", emojis[Math.floor(Math.random() * emojis.length)]);
        p.style.left = (r.left - appRect.left + 20 + Math.random() * Math.max(40, r.width - 40)) + "px";
        p.style.top = (r.top - appRect.top + r.height * 0.4) + "px";
        p.style.animationDelay = (i * 0.09) + "s";
        this.fx.append(p);
        setTimeout(() => p.remove(), 1500 + i * 90);
      }
      if (anchor.classList.contains("you") && this.lastPlayerMsg && !this.lastPlayerMsg.querySelector(".reactions-chip")) {
        const pick = emojis.slice().sort(() => Math.random() - 0.5).slice(0, 2).join("");
        this.lastPlayerMsg.append(el("div", "reactions-chip", pick + " " + (count * 2 + Math.floor(Math.random() * 9))));
      }
    },

    showReplyBar(decision, bonus, onChoice, onBonus) {
      const bar = this.reply; bar.innerHTML = "";
      const ch = GameState.get_character(decision.speaker);
      bar.append(el("div", "reply-label", "Reply to " + ch.name));
      const lock = () => bar.querySelectorAll("button").forEach(b => b.disabled = true);
      for (const a of bonus) {
        const b = el("button", "choice bonus");
        b.append(this.choiceLabel({ label: a.label, act: true, hint: a.hint }));
        b.onclick = () => { lock(); onBonus(a); };
        bar.append(b);
      }
      for (const c of decision.choices) {
        const b = el("button", "choice" + (c.spicy ? " spicy" : ""));
        b.append(this.choiceLabel(c));
        if (c.spicy) b.append(el("span", "pepper", "🌶️"));
        b.onclick = () => { lock(); onChoice(c); };
        bar.append(b);
      }
      setTimeout(() => this.scrollToBottom(), 30);
    },
    hideReplyBar() { this.reply.innerHTML = ""; },

    showSummary(day, deltas, meters, flavor) {
      $("summary-day").textContent = "Day " + day + " complete";
      const rows = $("summary-rows"); rows.innerHTML = "";
      for (const m of METERS) {
        const d = deltas[m.id];
        const r = el("div", "srow");
        const cls = d > 0 ? "up" : d < 0 ? "down" : "flat";
        const arrow = d > 0 ? "▲ +" + d : d < 0 ? "▼ " + d : "– 0";
        r.append(el("span", "", (m.long || m.label) + "  " + meters[m.id]), el("span", "delta " + cls, arrow));
        rows.append(r);
      }
      $("summary-flavor").textContent = flavor;
      $("summary").hidden = false;
    },
    hideSummary() { $("summary").hidden = true; }
  };

  window.UI = UI;
})();
