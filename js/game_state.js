// CSG GameState v3: every rule, no DOM. Runs in the browser and in Node (tools/).
// Methods return "events" for the UI to play in order:
//   {type:"post", speaker, text, badge?, kind?, media?}   chat bubble
//   {type:"you", text, act?, spicy?, auto?}             your reply (act = an action, no bubble)
//   {type:"system", text}  {type:"shake", strength}  {type:"react", count}
//   {type:"powerup", id}   {type:"sound", name}      {type:"buzz"}
(function (root) {
  "use strict";
  const METERS = ["drama", "clout", "sanity", "members"];
  const SAVE_KEY = "csg_save_v3", PROFILE_KEY = "csg_profile_v3";
  const mem = {};
  const Store = {
    get(k) { try { if (root.localStorage) return root.localStorage.getItem(k); } catch (e) { /* blocked */ } return mem[k] || null; },
    set(k, v) { mem[k] = v; try { if (root.localStorage) root.localStorage.setItem(k, v); } catch (e) { /* blocked */ } },
    del(k) { delete mem[k]; try { if (root.localStorage) root.localStorage.removeItem(k); } catch (e) { /* blocked */ } }
  };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const copy = o => JSON.parse(JSON.stringify(o));
  function hashStr(str) { let h = 2166136261 >>> 0; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function todayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }

  const GS = {
    D: null, T: null, C: null, chars: {}, roster: [], threads: [], threadById: {},
    s: null, profile: null,

    // ---------- data + profile ----------
    load_data() {
      const D = root.CSG_DATA;
      if (!D || !D.tuning || !D.characters || !D.core || !D.threads || !D.end_states) throw new Error("CSG data files failed to load");
      this.D = D; this.T = D.tuning; this.C = D.core;
      this.roster = D.characters.characters; this.chars = {};
      for (const c of this.roster) this.chars[c.id] = c;
      this.threads = D.threads; this.threadById = {};
      for (const t of this.threads) this.threadById[t.id] = t;
      this.load_profile();
    },
    load_profile() {
      let p = null;
      try { p = JSON.parse(Store.get(PROFILE_KEY) || "null"); } catch (e) { p = null; }
      this.profile = Object.assign({ best_free: 0, best_daily: 0, daily: { date: "", best: 0, done: false }, unlocked: [], achievements: [], runs: 0, name: "", tutorial_done: false, muted: false }, p || {});
      for (const id of this.T.powerup_starters) if (!this.profile.unlocked.includes(id)) this.profile.unlocked.push(id);
    },
    save_profile() { Store.set(PROFILE_KEY, JSON.stringify(this.profile)); },
    has_save() { try { const v = JSON.parse(Store.get(SAVE_KEY) || "null"); return v && !v.over ? v : null; } catch (e) { return null; } },
    save() { if (this.s && !this.s.over) Store.set(SAVE_KEY, JSON.stringify(this.s)); },
    load_save() { const v = this.has_save(); if (v) { this.s = v; return true; } return false; },
    clear_save() { Store.del(SAVE_KEY); },

    // ---------- rng (seeded, serializable) ----------
    rand() {
      let t = (this.s.rng = (this.s.rng + 0x6D2B79F5) | 0);
      t = Math.imul(t ^ (t >>> 15), 1 | t);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    ri(a, b) { return a + Math.floor(this.rand() * (b - a + 1)); },
    pick(arr) { return arr[Math.floor(this.rand() * arr.length)]; },

    // ---------- run setup ----------
    new_run(mode, name, seedOverride) {
      const T = this.T;
      const seed = seedOverride !== undefined ? seedOverride : mode === "daily" ? hashStr("csg-" + todayKey()) : (Math.random() * 4294967296) >>> 0;
      this.s = { mode, name: (name || "").trim().slice(0, 18) || "You", rng: seed | 0, date: todayKey(),
        day: 1, moment: 0, tod: "morning", turn: 0, over: false, reason: "",
        meters: { drama: T.meter_start, clout: T.meter_start, sanity: T.meter_start, members: T.meter_start },
        hidden: { leak: 0, strikes: 0, saint_heat: 0, kimmy: 0, mike_esc: 0, boss: 0 },
        grudges: {}, favors_used: {}, flags: {}, counters: {}, seen: [], queue: [], sig_today: 0,
        war: 0, combo: 0, fury: 0, muted: 0, delayed: [], powerups: [], cause: {},
        message_count: 0, pending: [], day_start: {}, current: null, topic: "", departed: [],
        last_post_turn: {}, last_stats_turn: {}, stats_cd: 0, combo_cd: 0, auntie_ready: 1,
        princess_meaner: 0, leak_level: 0, last_spicy: "", dave_night: false, night_note: 0, catfish_last: 0,
        lurker_spoke: false, boss_resolved: false, livestream: false, sig_n: 0, quiet_until: {} };
      const s = this.s;
      const targets = this.roster.filter(c => !c.bench && !["brittany", "lurker", "shady", "bigbro"].includes(c.id)).map(c => c.id);
      s.brittany_target = this.pick(targets); s.brittany_day = this.ri(8, 20);
      s.shirt_day = this.ri(14, 26); s.violence_day = this.ri(9, 24);
      const bb = new Set(); while (bb.size < 3) bb.add(this.ri(4, 28)); s.bigbro_days = [...bb];
      s.stat_days = [this.ri(3, 6), this.ri(10, 13), this.ri(17, 20), this.ri(24, 27)];
      s.secrets = copy(this.C.secrets);
      const starters = this.profile.unlocked.filter(id => T.powerup_starters.includes(id));
      for (let i = 0; i < T.powerup_starting; i++) s.powerups.push(this.pick(starters));
      s.day_start = Object.assign({}, s.meters);
      s.pending = [{ type: "system", text: (mode === "daily" ? "📅 Daily Run " + s.date + ". Everyone gets this exact chat today. " : "") + "You joined CSG • Day 1. Survive 30 days." }];
      if (!this.profile.tutorial_done) s.pending.push({ type: "system", text: "👋 Keep all four meters away from 0 AND 100. Too much of anything kills the group. Power-ups (above your replies) are how you survive." });
      s.pending.push(...this.day_start_events());
      return s;
    },

    // ---------- helpers ----------
    ch(id) {
      if (id === "you") return { id: "you", name: this.s ? this.s.name : "You", color: "#1877f2" };
      return this.chars[id] || { id, name: id, color: "#888" };
    },
    active(id) {
      const s = this.s;
      if (s.departed.includes(id)) return false;
      if (s.quiet_until[id] && s.day < s.quiet_until[id]) return false;
      return !!this.chars[id];
    },
    member_count() { return Math.max(1, this.roster.length - this.s.departed.length - (this.s.flags.marcus_took ? 3 : 0)); },
    scale() { const T = this.T; return T.effect_scale_day1 + (T.effect_scale_day30 - T.effect_scale_day1) * (this.s.day - 1) / (T.total_days - 1); },
    sub(text) {
      const s = this.s;
      return String(text).replace(/\{target\}/g, this.ch(s.brittany_target).name).replace(/\{name\}/g, s.name).replace(/\{day\}/g, s.day);
    },
    count(k, n) { this.s.counters[k] = (this.s.counters[k] || 0) + (n || 1); },
    meter(m, delta, speaker) {
      const s = this.s, T = this.T;
      if (!delta) return;
      const before = s.meters[m];
      s.meters[m] = clamp(Math.round(before + delta), T.meter_min, T.meter_max);
      if (speaker && speaker !== "you") s.cause[m + (delta > 0 ? "_up" : "_down")] = speaker;
    },
    hid(h, delta) {
      const s = this.s;
      if (h === "kimmy") s.hidden.kimmy = clamp(s.hidden.kimmy + delta, -10, 10);
      else s.hidden[h] = Math.max(0, s.hidden[h] + delta);
    },
    kimmy_face() { const k = this.s.hidden.kimmy; return k <= -5 ? "😤" : k <= -2 ? "😒" : k >= 5 ? "😊" : k >= 2 ? "🙂" : "😐"; },

    // Every chat message goes through post() so combo/stat tracking always sees it.
    post(ev, speaker, text, opts) {
      opts = opts || {};
      ev.push(Object.assign({ type: "post", speaker, text: this.sub(text), kind: opts.kind || "ambient" }, opts.badge ? { badge: opts.badge } : {}, opts.media ? { media: opts.media } : {}));
      this.note_post(ev, speaker, opts);
    },
    note_post(ev, speaker, opts) {
      const s = this.s, T = this.T;
      s.message_count += 1;
      if (speaker === "drunktdave" && s.tod === "night") s.dave_night = true;
      if (speaker === "mcman" || speaker === "pookie") {
        const other = speaker === "mcman" ? "pookie" : "mcman";
        const last = s.last_post_turn[other];
        if (last !== undefined && s.turn - last <= 2 && s.combo === 0 && s.turn >= s.combo_cd && this.active("mcman") && this.active("pookie")) {
          s.combo = T.combo_window; this.count("combos");
          ev.push({ type: "post", speaker, kind: "signature", badge: "💥 CROSS-POST COMBO", text: "McMan Hater and Pookie Patrol are cross-posting. Drama +" + T.combo_drama + " in " + T.combo_window + " turns unless somebody drops a Peace Gif." });
          ev.push({ type: "shake", strength: 1 }, { type: "sound", name: "alert" });
        }
        s.last_post_turn[speaker] = s.turn;
      }
      if (opts && opts.stats && ["mcman", "pookie", "section8"].includes(speaker)) {
        const side = speaker === "section8" ? "saint" : "haters", other = side === "saint" ? "haters" : "saint";
        const last = s.last_stats_turn[other];
        s.last_stats_turn[side] = s.turn;
        if (last !== undefined && s.turn - last <= 3 && s.turn >= s.stats_cd && this.active("section8") && this.active("mcman")) {
          s.stats_cd = s.turn + 10; this.count("stats_wars");
          this.queue_sig("stats_war", true);
          ev.push({ type: "system", text: "📊 Uh oh. The Saint and McMan Hater are both posting charts." });
        }
      }
    },

    // ---------- decisions ----------
    thread_ok(t) {
      const s = this.s;
      if (s.seen.includes(t.id)) return false;
      if (s.day < (t.min_day || 1) || (t.max_day && s.day > t.max_day)) return false;
      if (!this.active(t.speaker)) return false;
      if (t.time && t.time !== s.tod) return false;
      if ((t.tags || []).includes("political") && !this.active("coach")) return false;
      if (t.requires && !t.requires.every(f => s.flags[f])) return false;
      if (t.unless && t.unless.some(f => s.flags[f])) return false;
      return true;
    },
    instance(t, beatId) {
      const b = beatId ? t.beats[beatId] : t;
      return { key: "t:" + t.id + ":" + (beatId || "root"), kind: "thread", thread: t.id, beat: beatId || null,
        speaker: b.speaker || t.speaker, badge: b.badge || t.badge || null, media: b.media || t.media || null,
        tags: beatId ? (b.tags || []) : (t.tags || []), topic: t.topic || "", priority: !!beatId,
        lead: (b.lead || []).map(l => ({ speaker: l.speaker, text: this.sub(l.text), stats: !!l.stats })),
        stats: !!b.stats, text: this.sub(b.text), choices: copy(b.choices).map(c => Object.assign(c, { label: this.sub(c.label), hint: c.hint ? this.sub(c.hint) : c.hint })) };
    },
    make_sig(key, priority) {
      const tpl = this.C.signatures[key];
      this.s.sig_n += 1;
      return { key: "s:" + key + ":" + this.s.sig_n, kind: "sig", sig: key, speaker: tpl.speaker, badge: tpl.badge || null,
        media: tpl.media || null, tags: tpl.tags || [], topic: tpl.topic || "", priority: !!priority, stats: !!tpl.stats,
        lead: [], text: this.sub(this.pick(tpl.variants)),
        choices: copy(tpl.choices).map(c => Object.assign(c, { label: this.sub(c.label), hint: c.hint ? this.sub(c.hint) : c.hint })) };
    },
    queue_sig(key, priority) {
      const s = this.s;
      if (s.queue.some(q => q.sig === key)) return;
      const inst = this.make_sig(key, priority);
      if (priority) s.queue.unshift(inst); else s.queue.push(inst);
    },
    next_decision() {
      const s = this.s, T = this.T;
      s.queue = s.queue.filter(q => this.active(q.speaker));
      const pri = s.queue.findIndex(q => q.priority);
      if (pri >= 0) { const d = s.queue.splice(pri, 1)[0]; if (d.kind === "sig") s.sig_today += 1; return d; }
      if (s.queue.length && s.sig_today < T.max_signatures_per_day) { s.sig_today += 1; return s.queue.shift(); }
      let pool = this.threads.filter(t => this.thread_ok(t));
      if (pool.length) {
        const callbacks = pool.filter(t => t.requires);
        const night = pool.filter(t => t.time === "night");
        let t;
        if (callbacks.length && this.rand() < 0.5) t = this.pick(callbacks);
        else if (night.length && this.rand() < 0.5) t = this.pick(night);
        else {
          const same = pool.filter(x => x.topic && x.topic === s.topic);
          t = same.length && this.rand() < 0.35 ? this.pick(same) : this.pick(pool);
        }
        return this.instance(t);
      }
      if (s.queue.length) { s.sig_today += 1; return s.queue.shift(); }
      this.count("reruns");
      const any = this.threads.filter(t => this.active(t.speaker) && !t.time && !t.requires);
      return this.instance(this.pick(any));
    },

    // Start a reply moment: chatter, then the decision. Saves so a closed tab can resume here.
    start_moment() {
      const s = this.s, ev = [];
      if (s.current) {
        ev.push({ type: "system", text: "↩️ Picked up where you left off. Day " + s.day + "." });
        this.push_decision_posts(ev, s.current, true);
        return { events: ev, decision: s.current };
      }
      ev.push(...s.pending); s.pending = [];
      for (const a of this.pick_ambient()) {
        this.post(ev, a.speaker, a.text, { stats: !!a.stats });
        if (a.effects) for (const m of METERS) if (a.effects[m]) this.meter(m, a.effects[m]);
      }
      const d = this.next_decision();
      s.current = d;
      if (d.topic) s.topic = d.topic;
      this.push_decision_posts(ev, d, false);
      this.save();
      return { events: ev, decision: d };
    },
    push_decision_posts(ev, d, resumed) {
      if (!resumed) for (const l of d.lead) this.post(ev, l.speaker, l.text, { stats: l.stats });
      if (resumed) ev.push({ type: "post", speaker: d.speaker, text: d.text, kind: "decision", badge: d.badge, media: d.media });
      else this.post(ev, d.speaker, d.text, { kind: d.kind === "sig" ? "signature decision" : "decision", badge: d.badge, media: d.media, stats: d.stats });
      if (d.badge) ev.push({ type: "sound", name: "ding" });
    },

    pick_ambient() {
      const s = this.s, T = this.T;
      const n = this.ri(T.ambient_per_moment[0], T.ambient_per_moment[1]);
      const pool = this.C.ambient.filter(a => this.active(a.speaker) && (!a.time || a.time === s.tod));
      const out = [];
      for (let i = 0; i < n && pool.length; i++) {
        const same = pool.filter(a => a.topic && a.topic === s.topic);
        const src = same.length && this.rand() < 0.6 ? same : pool.filter(a => !a.topic || this.rand() < 0.3);
        const a = this.pick(src.length ? src : pool);
        pool.splice(pool.indexOf(a), 1);
        out.push(a);
      }
      return out;
    },

    // ---------- choices ----------
    choose(index, opts) {
      const s = this.s, d = s.current;
      if (!d) return [];
      const c = d.choices[index];
      const ev = [];
      if (opts && opts.auto) { this.count("timeouts"); ev.push({ type: "system", text: "⏱️ Too slow. Your thumbs typed this on their own:" }); }
      ev.push({ type: "you", text: c.label, act: !!c.act, spicy: !!c.spicy, auto: !!(opts && opts.auto) });
      ev.push(...this.apply_choice(d, c));
      s.current = null;
      return ev;
    },
    // The worst reply for you right now, for when the timer runs out.
    auto_index() {
      const s = this.s, d = s.current;
      let best = 0, bs = -1;
      d.choices.forEach((c, i) => {
        if (c.sexual) return;
        let risk = 0;
        for (const m of METERS) {
          const v = s.meters[m] + (c.effects[m] || 0) * this.scale();
          risk += Math.abs(v - 50);
        }
        if (c.spicy) risk += 25;
        if (risk > bs) { bs = risk; best = i; }
      });
      return best;
    },

    apply_choice(d, c) {
      const s = this.s, T = this.T, C = this.C, ev = [];
      const eff = Object.assign({}, c.effects);
      if (eff.sanity === undefined) eff.sanity = c.act ? T.default_act_sanity : T.default_say_sanity;
      if (c.spicy && eff.members === undefined) eff.members = T.default_spicy_members;
      // Getting into it costs you mentally: a reply that stirs up drama drains your sanity too.
      if ((eff.drama || 0) > 0) eff.sanity -= Math.round(eff.drama * (T.sanity_per_drama || 0));
      if (d.sig === "princess_take" && s.princess_meaner > 0) {
        for (const m of ["drama", "clout"]) if (eff[m]) eff[m] = Math.round(eff[m] * (1 + 0.5 * s.princess_meaner));
        s.princess_meaner = 0;
        ev.push({ type: "system", text: "Pander Princess is back from getting exposed. He's meaner now." });
      }
      if (s.tod === "night" && c.spicy && (eff.drama || 0) > 0) {
        eff.drama = Math.round(eff.drama * T.night_spicy_drama_mult);
        if (s.night_note !== s.day) { s.night_note = s.day; ev.push({ type: "system", text: "🌙 It's 2am. Spicy replies hit harder. Drunk Dave is awake." }); }
      }
      const k = this.scale();
      for (const m of METERS) if (eff[m]) this.meter(m, eff[m] * k, d.speaker);
      for (const h of ["leak", "saint_heat", "kimmy", "mike_esc", "boss"]) if (eff[h]) this.hid(h, eff[h]);
      if ((d.tags || []).includes("saint")) this.hid("saint_heat", 1);
      if (c.set) s.flags[c.set] = true;
      if (c.count) this.count(c.count);
      const dunk = c.dunk || (c.spicy && d.speaker !== "shady" ? d.speaker : null);
      if (dunk) s.grudges[dunk] = (s.grudges[dunk] || 0) - 1;
      if (c.ally) s.grudges[c.ally] = (s.grudges[c.ally] || 0) + 1;

      if (eff.princess_meaner) { s.princess_meaner += 1; this.count("princess_exposed"); ev.push({ type: "system", text: "You posted Princess's DMs. He saw it. He'll be back meaner." }); }
      if (eff.reveal_secret) ev.push(...this.reveal_secret());
      if (eff.marcus_call && !s.flags.marcus_took) ev.push(...this.marcus_leaves());
      if (eff.fury) ev.push(...this.start_fury());
      if (eff.watch_live) this.count("live_watched");
      if (c.sexual) {
        this.hid("kimmy", -3);
        this.post(ev, "kimmy", "Deleted. This is a FAMILY group. I will not be repeating myself. 🏡", { kind: "signature", badge: "🧹 MESSAGE DELETED" });
      }
      if (c.spicy) {
        this.count("spicy"); s.last_spicy = c.label;
        this.hid("leak", T.leak_per_spicy); this.hid("kimmy", -1);
        ev.push({ type: "shake", strength: 1 });
        let chance = s.meters.drama > 70 ? T.report_chance_hot : T.report_chance;
        const kimmyReport = s.hidden.kimmy <= T.kimmy_report_at;
        if (kimmyReport) chance *= 2;
        if (this.rand() < chance) ev.push(...this.add_strike(kimmyReport ? "Kimmy reported you to Big Bro." : "Somebody reported your reply."));
        if (this.rand() < T.powerup_spicy_chance) ev.push(...this.grant_powerup("🎁 That reply went viral in the group. You earned a power-up:"));
        if (this.rand() < T.delayed_chance) s.delayed.push({ day: s.day + this.ri(2, 5), kind: this.pick(["shady", "brittany", "resurfaced"]), quote: c.label });
      }
      if (c.spicy || (eff.clout || 0) >= 10) ev.push({ type: "react", count: c.spicy ? 6 : 3 });
      for (const r of c.react || []) if (this.active(r.speaker)) this.post(ev, r.speaker, r.text, { stats: !!r.stats });

      if (c.next && d.kind === "thread") {
        const t = this.threadById[d.thread];
        if (t && t.beats && t.beats[c.next]) s.queue.unshift(this.instance(t, c.next));
      }
      if (d.sig === "princess_take") {
        const h = C.princess_reactions.haters.filter(p => this.active(p.speaker)), m = C.princess_reactions.men.filter(p => this.active(p.speaker));
        if (h.length) { const p = this.pick(h); this.post(ev, p.speaker, p.text); }
        if (m.length) { const p = this.pick(m); this.post(ev, p.speaker, p.text); }
        if (this.active("bigmike") && this.rand() < 0.55) { this.queue_sig("mike_beef", true); this.count("beefs"); }
      }
      if (["bigmike_video", "bigmike_live", "mike_beef"].includes(d.sig)) {
        const beg = C.shirt_beg.filter(p => this.active(p.speaker));
        for (let i = 0; i < 1 + (this.rand() < 0.5 ? 1 : 0) && beg.length; i++) { const p = beg.splice(Math.floor(this.rand() * beg.length), 1)[0]; this.post(ev, p.speaker, p.text); }
      }
      if ((d.tags || []).includes("political") && s.war === 0 && this.active("coach")) {
        s.war = T.war_turns; this.count("wars");
        ev.push({ type: "system", text: "⚠️ Coach vs Debra, Larry and Blue Wave Dave. Survive " + T.war_turns + " turns." }, { type: "sound", name: "alert" });
        this.queue_sig("coach_logic", true);
      }
      if (eff.defend && s.hidden.saint_heat >= T.saint_heat_dogpile) ev.push(...this.saint_dogpile());
      ev.push(...this.leak_glimpses());
      ev.push(...this.kimmy_check());
      if (d.kind === "thread" && !s.seen.includes(d.thread)) s.seen.push(d.thread);
      return ev;
    },

    add_strike(reason) {
      const s = this.s, T = this.T;
      s.hidden.strikes += 1;
      const n = s.hidden.strikes;
      return [{ type: "system", text: "🚨 " + reason },
        { type: "post", speaker: "bigbro", kind: "signature", badge: "🎤 STRIKE " + n + "/" + T.strikes_to_delete, text: this.C.strike_raps[Math.min(n, 3) - 1] },
        { type: "shake", strength: 2 }, { type: "buzz" }, { type: "sound", name: "alarm" }];
    },
    reveal_secret() {
      const s = this.s;
      if (!s.secrets.length) return [{ type: "system", text: "🤫 Nothing new. Just loyalty talk. And no shirt." }];
      const sec = s.secrets.splice(Math.floor(this.rand() * s.secrets.length), 1)[0];
      this.meter("drama", 5, "bigmike");
      return [{ type: "system", text: "🤫 " + sec }];
    },
    marcus_leaves() {
      const s = this.s;
      s.flags.marcus_took = true; s.departed.push("marcus");
      this.meter("members", -12, "marcus");
      const ev = [];
      this.post(ev, "marcus", "Fine. Bet. I'm out. And I'm taking people with me.", { kind: "signature", badge: "🚪 ACTUALLY LEAVING" });
      ev.push({ type: "system", text: "Marcus left the group. 3 others left with him." }, { type: "shake", strength: 2 });
      return ev;
    },
    saint_dogpile() {
      const s = this.s, ev = [];
      this.meter("clout", -18 * this.scale(), "section8"); this.meter("sanity", -14 * this.scale(), "section8");
      s.hidden.saint_heat = 0; this.count("dogpiles");
      this.post(ev, "section8", "Oh you're DEFENDING people now? Let me explain something to you.", { kind: "signature", badge: "😤 THE SAINT IS HEATED" });
      this.post(ev, "section8", "First of all. The data on modern women is clear. (I will not be sharing the data.)");
      this.post(ev, "section8", "Second of all. I've been single by choice since 2017 and I have NEVER been happier.");
      ev.push({ type: "system", text: "[+11 more messages from The Section 8 Saint]" }, { type: "shake", strength: 2 });
      return ev;
    },
    start_fury() {
      const s = this.s, ev = [];
      s.fury = this.T.fury_turns; this.count("furies");
      this.post(ev, "furious4", this.pick(this.C.fury_lines), { kind: "signature", badge: "😤 ALL CAPS MODE" });
      if (this.active("mcman")) this.post(ev, "mcman", "the AUDACITY. she's a 10 and so am I.");
      if (this.active("pookie")) this.post(ev, "pookie", "WHO ASKED U pookie 😤😤");
      ev.push({ type: "shake", strength: 2 });
      return ev;
    },
    leak_glimpses() {
      const s = this.s, ev = [];
      const L = s.hidden.leak, level = L >= 90 ? 4 : L >= 70 ? 3 : L >= 50 ? 2 : L >= 30 ? 1 : 0;
      if (level > s.leak_level) ev.push({ type: "system", text: this.C.shady_glimpses[level - 1].replace("{quote}", s.last_spicy || "lol") });
      if (level >= 3 && level > s.leak_level) ev.push({ type: "buzz" });
      s.leak_level = level;
      return ev;
    },
    kimmy_check() {
      const s = this.s, T = this.T, ev = [];
      if (!this.active("kimmy")) return ev;
      if (s.hidden.kimmy <= T.kimmy_mute_at && s.muted === 0) {
        s.muted = T.mute_moments; s.hidden.kimmy = -2; this.count("mutes");
        this.post(ev, "kimmy", "Muted you for 1 day. Think about what you did. I still have a listing for you when you're done. 🏡", { kind: "signature", badge: "🔇 YOU'RE MUTED" });
        ev.push({ type: "shake", strength: 2 }, { type: "buzz" });
      } else if (s.hidden.kimmy >= T.kimmy_vouch_at && s.hidden.strikes > 0) {
        s.hidden.strikes -= 1; s.hidden.kimmy -= 4; this.count("vouches");
        this.post(ev, "kimmy", "Talked Big Bro out of a strike for you. You're a menace, but you're OUR menace. 🏡", { kind: "signature", badge: "💖 KIMMY VOUCHED" });
      }
      return ev;
    },

    // ---------- power-ups ----------
    unlocked_list() { return this.profile.unlocked.filter(id => this.C.powerups[id]); },
    grant_powerup(text, id) {
      const s = this.s;
      id = id || this.pick(this.unlocked_list());
      if (s.powerups.length >= this.T.powerup_max) return [{ type: "system", text: text.replace("You earned a power-up:", "You'd have earned a power-up, but your hands are full.") }];
      s.powerups.push(id);
      return [{ type: "system", text: text + " " + this.C.powerups[id].icon + " " + this.C.powerups[id].name }, { type: "powerup", id }, { type: "sound", name: "power" }];
    },
    // Would this power-up push some other meter into the red right now?
    powerup_backfires(id) {
      const fx = (this.C.powerups[id] || {}).fx || {}, k = this.scale(), T = this.T;
      return Object.entries(fx).some(([m, v]) => { const now = this.s.meters[m], after = now + v * k;
        return (v > 0 && after >= T.danger_high && after > now) || (v < 0 && after <= T.danger_low && after < now); });
    },
    needed_powerup(list) {
      const s = this.s, m = s.meters, want = [];
      if (s.hidden.strikes >= 2) want.push([90, "summon_bigbro"]);
      if (s.hidden.leak >= 60) want.push([s.hidden.leak, "delete_pray"]);
      want.push([m.drama, "peace_gif"], [100 - m.drama, "stir_pot"], [100 - m.sanity, "meme_drop"], [100 - m.sanity, "call_auntie"],
        [m.clout, "humble_post"], [100 - m.clout, "stir_pot"], [100 - m.members, "invite_cousins"]);
      want.sort((x, y) => y[0] - x[0]);
      const hit = want.find(([, id]) => list.includes(id) && !this.powerup_backfires(id));
      return hit ? hit[1] : null;
    },
    offer_due(day) { const n = this.T.powerup_offer_every || 1; return day % n === 0; },
    next_offer_day() { let d = this.s.day + 1; while (!this.offer_due(d)) d++; return d; },
    day_offer() {
      if (!this.offer_due(this.s.day)) return [];
      const list = this.unlocked_list().slice();
      // First choice answers whatever is closest to killing you; the second is a wildcard.
      const fix = this.needed_powerup(list);
      const a = fix ? list.splice(list.indexOf(fix), 1)[0] : list.splice(Math.floor(this.rand() * list.length), 1)[0];
      const b = list.length ? list[Math.floor(this.rand() * list.length)] : null;
      return b ? [a, b] : [a];
    },
    take_powerup(id) {
      const s = this.s;
      if (!id) return;
      if (s.powerups.length >= this.T.powerup_max) s.powerups.shift();
      s.powerups.push(id);
      this.save();
    },
    use_powerup(id) {
      const s = this.s, k = s.powerups.indexOf(id), ev = [];
      if (k < 0) return { events: [], consumed: false };
      s.powerups.splice(k, 1); this.count("pu_used");
      const P = this.C.powerups[id];
      ev.push({ type: "you", text: P.icon + " " + P.say, act: false, powerup: true }, { type: "sound", name: "power" });
      let consumed = false;
      const pk = this.scale();
      for (const [m, v] of Object.entries(P.fx || {})) this.meter(m, v * pk);
      switch (id) {
        case "peace_gif":
          if (s.combo > 0) { s.combo = 0; s.combo_cd = s.turn + 6; this.count("combos_defused"); ev.push({ type: "system", text: "🕊️ Combo defused." }); }
          if (s.war > 0) { s.war = 0; ev.push({ type: "system", text: "🕊️ Even Coach and Debra stopped to look at the gif. War over." }); }
          if (this.active("pookie")) this.post(ev, "pookie", "wat is dis gif 😭");
          break;
        case "stir_pot": this.post(ev, "catfish", "OH it's about to be a LONG night 🍿"); break;
        case "meme_drop": this.post(ev, "catfish", "LMAOOO who made this 💀💀"); break;
        case "invite_cousins": ev.push({ type: "system", text: "📣 6 of your cousins joined the group. One already has an opinion." }); break;
        case "humble_post": this.post(ev, "auntiepat", "Look at you being humble 🌺 proud of you baby"); break;
        case "summon_bigbro":
          if (s.hidden.strikes > 0) s.hidden.strikes -= 1;
          if (s.war > 0) s.war = 0;
          this.post(ev, "bigbro", "Y'all heard me. Everybody chill. Strike erased, war over. 🎤", { kind: "signature", badge: "🎤 BIG BRO" });
          break;
        case "call_auntie":
          s.hidden.saint_heat = 0; this.count("auntie_calls");
          this.post(ev, "auntiepat", "Saint. Baby. ENOUGH. Your mother is in this group. 🌺🌺🌺", { kind: "signature", badge: "🌺 AUNTIE PAT" });
          if (this.active("section8")) this.post(ev, "section8", "...yes ma'am.");
          break;
        case "delete_pray": this.hid("leak", -30); s.leak_level = 0; ev.push({ type: "system", text: "🙏 Deleted. Shady's screenshot came out blurry. Probably." }); break;
        case "kimmy_favor":
          s.muted = 0; this.hid("kimmy", 5);
          this.post(ev, "kimmy", "Fine. Unmuted. You owe me a referral. 🏡", { kind: "signature", badge: "🏡 KIMMY'S FAVOR" });
          break;
        case "go_dark":
          for (const m of METERS) this.s.meters[m] = Math.round(s.meters[m] + (50 - s.meters[m]) * 0.3);
          this.meter("clout", -10);
          if (s.current && s.current.kind === "thread" && !s.seen.includes(s.current.thread)) s.seen.push(s.current.thread);
          s.current = null; consumed = true;
          ev.push({ type: "system", text: "👻 You went dark. The chat moved on without you, and honestly? It was peaceful." });
          break;
      }
      ev.push(...this.kimmy_check());
      return { events: ev, consumed };
    },

    // ---------- muted turns ----------
    muted_resolve() {
      const s = this.s, d = s.current;
      const c = this.pick(d.choices.filter(x => !x.sexual));
      const k = this.scale() * 0.5;
      for (const m of METERS) if (c.effects[m]) this.meter(m, c.effects[m] * k, d.speaker);
      this.meter("sanity", 4);
      if (d.kind === "thread" && !s.seen.includes(d.thread)) s.seen.push(d.thread);
      s.current = null;
      return [{ type: "system", text: "🔇 You're muted. The chat moved on without you." }];
    },

    // ---------- end of a moment ----------
    end_moment() {
      const s = this.s, T = this.T, C = this.C, ev = [];
      s.turn += 1; s.moment += 1;
      const m = s.meters;
      this.meter("drama", -T.drama_cooldown);
      // Fractional fade (e.g. 2.5) alternates between 2 and 3 so the average is exact.
      this.meter("clout", -(Math.floor(s.turn * T.clout_fade) - Math.floor((s.turn - 1) * T.clout_fade)));
      const [lo, hi] = T.members_healthy_band;
      this.meter("members", m.drama >= lo && m.drama <= hi ? T.members_healthy_gain : -T.members_unhealthy_loss, m.drama > hi ? "princess" : null);
      let stress = 0;
      if (m.drama > T.stress_drama_start) stress += (m.drama - T.stress_drama_start) * T.stress_per_drama_point;
      if (s.war > 0) stress += T.stress_war;
      if (s.combo > 0) stress += T.stress_combo;
      if (s.fury > 0) stress += T.stress_fury;
      if (stress) this.meter("sanity", -stress, s.war > 0 ? "debra" : "mcman");
      if (s.muted > 0) { s.muted -= 1; if (s.muted === 0) ev.push({ type: "system", text: "🔊 Kimmy unmuted you. Behave. 🏡" }); }
      if (s.war > 0) {
        s.war -= 1;
        const dem = C.war_lines.dems.filter(l => this.active(l.speaker));
        if (dem.length) { const l = this.pick(dem); this.post(ev, l.speaker, l.text, { kind: "signature", badge: "⚠️ FACTION WAR" }); }
        this.post(ev, "coach", this.pick(C.war_lines.coach), { kind: "signature", badge: "⚠️ FACTION WAR" });
        this.meter("drama", T.war_drama, "debra");
        if (s.war === 0) ev.push({ type: "system", text: "The flame war burned out. Coach lost. Coach was right." });
      }
      if (s.combo > 0) {
        s.combo -= 1;
        if (s.combo === 0) {
          this.meter("drama", T.combo_drama * this.scale(), "mcman"); s.combo_cd = s.turn + 6;
          this.post(ev, "mcman", "Pookie and I said what we said. The whole group is arguing now.", { kind: "signature", badge: "💥 COMBO HIT" });
          this.post(ev, "pookie", "WE SAID WAT WE SAID 💯💯");
          ev.push({ type: "shake", strength: 3 }, { type: "buzz" });
        }
      }
      if (s.fury > 0) {
        s.fury -= 1; this.meter("drama", T.fury_drama, "furious4");
        this.post(ev, "furious4", this.pick(C.fury_lines), { kind: "signature", badge: "😤 ALL CAPS MODE" });
        if (s.fury === 0) ev.push({ type: "system", text: "The Furious 4 has calmed down. She is still a 10, per her." });
      }
      if (!s.lurker_spoke && s.message_count >= T.lurker_messages) {
        s.lurker_spoke = true;
        this.post(ev, "lurker", C.lurker_line, { kind: "signature", badge: "👁️ THE LURKER SPEAKS" });
        for (const k of METERS) s.meters[k] = Math.round(s.meters[k] + (50 - s.meters[k]) * 0.25);
        ev.push({ type: "system", text: "The chat goes silent. Every meter drifts toward the middle." }, { type: "shake", strength: 2 });
      }
      if (s.day >= 3 && s.day - s.catfish_last >= 3 && this.rand() < 0.12 && this.active("catfish")) { s.catfish_last = s.day; this.queue_sig("catfish_dm", false); }
      ev.push(...this.grudge_events());
      ev.push(...this.kimmy_check());
      ev.push(...this.danger_alerts());
      const done = s.moment >= T.moments_per_day;
      if (!done) s.tod = s.moment === 0 ? "morning" : s.moment === T.moments_per_day - 1 ? "night" : "afternoon";
      this.save();
      return { events: ev, day_complete: done };
    },
    grudge_events() {
      const s = this.s, T = this.T, C = this.C, ev = [];
      if (this.rand() > T.grudge_chance) return ev;
      const bad = Object.keys(s.grudges).filter(id => s.grudges[id] <= T.grudge_trigger && this.active(id));
      const good = Object.keys(s.grudges).filter(id => s.grudges[id] >= T.favor_trigger && this.active(id) && !s.favors_used[id]);
      if (bad.length) {
        const id = this.pick(bad);
        s.grudges[id] += 1; this.count("grudges_hit");
        const lines = C.grudge_lines[id] || C.grudge_lines.generic;
        this.post(ev, id, this.pick(lines), { kind: "signature", badge: "😒 HOLDS A GRUDGE" });
        this.meter("drama", 6, id); this.meter("clout", -8 * this.scale(), id);
      } else if (good.length) {
        const id = this.pick(good);
        s.favors_used[id] = true; this.count("favors");
        const lines = C.favor_lines[id] || C.favor_lines.generic;
        this.post(ev, id, this.pick(lines), { kind: "signature", badge: "🤝 HAS YOUR BACK" });
        let worst = "drama", wd = -1;
        for (const k of METERS) { const dd = Math.abs(s.meters[k] - 50); if (dd > wd) { wd = dd; worst = k; } }
        s.meters[worst] = Math.round(s.meters[worst] + (50 - s.meters[worst]) * 0.4);
      }
      return ev;
    },
    danger_alerts() {
      const s = this.s, T = this.T;
      s.alerted = s.alerted || {};
      let hit = false;
      for (const m of METERS) {
        const v = s.meters[m], red = v <= T.danger_low - 5 || v >= T.danger_high + 5;
        if (red && !s.alerted[m]) { s.alerted[m] = true; hit = true; }
        if (!red) s.alerted[m] = false;
      }
      return hit ? [{ type: "buzz" }, { type: "sound", name: "alarm" }] : [];
    },

    // ---------- day flow ----------
    roll_day() {
      const s = this.s, T = this.T;
      s.day += 1; s.moment = 0; s.tod = "morning"; s.sig_today = 0;
      this.hid("leak", -T.leak_decay_per_day);
      const L = s.hidden.leak; s.leak_level = Math.min(s.leak_level, L >= 90 ? 4 : L >= 70 ? 3 : L >= 50 ? 2 : L >= 30 ? 1 : 0);
      for (const m of METERS) s.meters[m] = Math.round(s.meters[m] + (50 - s.meters[m]) * T.overnight_reversion);
      if (!s.boss_resolved && s.day <= T.bossbabe_day) this.hid("boss", 1);
      s.day_start = Object.assign({}, s.meters);
      s.pending = this.day_start_events();
      this.save();
      return s.pending;
    },
    day_deltas() { const o = {}; for (const m of METERS) o[m] = this.s.meters[m] - this.s.day_start[m]; return o; },
    day_start_events() {
      const s = this.s, T = this.T, C = this.C, d = s.day, ev = [];
      if (d > 1) ev.push({ type: "system", text: "— Day " + d + " —" });
      if (s.dave_night) {
        s.dave_night = false; this.meter("sanity", 5);
        this.post(ev, "drunktdave", "morning everyone. sorry about whatever i said last night. i'm a different dave before noon.", { kind: "signature", badge: "🍺 9AM APOLOGY" });
      }
      for (const x of s.delayed.filter(x => x.day === d)) {
        const D = C.delayed[x.kind];
        ev.push({ type: "system", text: D.text.replace("{quote}", x.quote) }, { type: "shake", strength: 2 }, { type: "buzz" });
        for (const m of Object.keys(D.effects)) {
          if (m === "leak") this.hid("leak", D.effects.leak); else this.meter(m, D.effects[m] * this.scale(), D.speaker);
        }
        if (D.speaker && this.active(D.speaker) && D.line) this.post(ev, D.speaker, D.line.replace("{quote}", x.quote));
        this.count("delayed_hits");
      }
      s.delayed = s.delayed.filter(x => x.day !== d);
      if (this.active("kimmy") && d % 4 === 0) this.queue_sig("kimmy_listing");
      if (d % 3 === 0) this.queue_sig("princess_take");
      if (d % 5 === 0) this.queue_sig("saint_sermon");
      if (d % 5 === 2) this.queue_sig("auntie_misinfo");
      if (d % 5 === 4) this.queue_sig("tiffany_dogpile");
      if (d % 7 === 0 && this.active("marcus")) this.queue_sig("marcus_leaving");
      if ([3, 7, 11].includes(d) && !s.boss_resolved) this.queue_sig("bossbabe_pitch");
      if (s.stat_days.includes(d) && this.active("mcman")) this.queue_sig("hater_stat", true);
      if (d === s.violence_day && this.active("mcman")) this.queue_sig("violence_shutdown", true);
      if (d === 20 && !s.livestream && s.hidden.mike_esc >= 2) {
        s.livestream = true; this.meter("drama", 10, "bigmike");
        ev.push({ type: "system", text: "🔴 Big Mike started a livestream. Nobody asked. Still no shirt." });
        this.queue_sig("bigmike_live", true);
      } else if (d % 4 === 2) this.queue_sig(s.livestream ? "bigmike_live" : "bigmike_video");
      if (d === s.shirt_day && this.active("bigmike")) {
        s.flags.saw_shirt = true; this.meter("drama", 15, "bigmike");
        this.post(ev, "bigmike", "My $0.04, 🎥 7:03 — today I'm wearing a shirt. We'll talk about it later.", { kind: "signature", badge: "🎥 VIDEO MESSAGE" });
        for (const p of [["kimmy", "MIKE ARE YOU OK??"], ["catfish", "blink twice if you need help 😭"], ["auntiepat", "Lord, what happened?? 🌺"], ["coach", "Mike, call me."]]) if (this.active(p[0])) this.post(ev, p[0], p[1]);
        this.post(ev, "bigmike", "My $0.02, the AC broke in the truck. Back to normal tomorrow.");
        ev.push({ type: "shake", strength: 2 });
      }
      if (d === T.bossbabe_day && !s.boss_resolved) {
        s.boss_resolved = true;
        if (s.hidden.boss >= T.bossbabe_threshold && this.active("kimmy")) {
          this.meter("members", -30 * this.scale(), "bossbabe");
          this.post(ev, "bossbabe", "Welcome KIMMY to the team!! 💖 Every listing now comes with leggings. This group is a funnel now.", { kind: "signature", badge: "💼 KIMMY RECRUITED" });
          this.post(ev, "kimmy", "Hey hun!! 💖 Quick question, have you heard of financial freedom? 🏡");
          ev.push({ type: "shake", strength: 2 });
        } else this.post(ev, "bossbabe", "Kimmy said no 🙄 Her loss. Tiffany, hun, are you free tonight?", { kind: "signature", badge: "💼 PITCH FAILED" });
      }
      if (d === s.brittany_day && this.active("brittany")) { this.queue_sig("brittany_bomb", true); ev.push({ type: "shake", strength: 3 }); }
      if (s.bigbro_days.includes(d)) {
        this.meter("sanity", 5);
        ev.push({ type: "system", text: "🎤 Big Bro is typing... (the whole chat froze)" });
        this.post(ev, "bigbro", C.bigbro_events[s.bigbro_days.indexOf(d) % C.bigbro_events.length], { kind: "signature", badge: "🎤 BIG BRO" });
      }
      return ev;
    },

    // ---------- endings ----------
    check_end() {
      const s = this.s, T = this.T, m = s.meters;
      let r = "";
      if (s.hidden.strikes >= T.strikes_to_delete) r = "admin";
      else if (s.hidden.leak >= T.leak_max) r = "leak";
      else if (m.drama >= T.meter_max) r = "drama_high";
      else if (m.drama <= T.meter_min) r = "drama_low";
      else if (m.clout >= T.meter_max) r = "clout_high";
      else if (m.clout <= T.meter_min) r = "clout_low";
      else if (m.sanity <= T.meter_min) r = "sanity_low";
      else if (m.sanity >= T.meter_max) r = "sanity_high";
      else if (m.members <= T.meter_min) r = "members_low";
      else if (m.members >= T.meter_max) r = "members_high";
      return r;
    },
    cause_of(reason) {
      const s = this.s;
      if (reason === "admin") return "bigbro";
      if (reason === "leak") return "shady";
      const map = { drama_high: "drama_up", drama_low: "drama_down", clout_high: "clout_up", clout_low: "clout_down", sanity_low: "sanity_down", sanity_high: "sanity_up", members_low: "members_down", members_high: "members_up" };
      return s.cause[map[reason]] || null;
    },
    finish_run(reason) {
      const s = this.s, p = this.profile, T = this.T;
      s.over = true; s.reason = reason;
      const reached = reason === "win" ? T.total_days : s.day;
      const cause = reason === "win" ? null : this.cause_of(reason);
      const newBest = s.mode === "daily" ? reached > p.best_daily : reached > p.best_free;
      if (s.mode === "daily") {
        p.best_daily = Math.max(p.best_daily, reached);
        if (p.daily.date !== s.date) p.daily = { date: s.date, best: 0, done: false };
        p.daily.best = Math.max(p.daily.best, reached); p.daily.done = true;
      } else p.best_free = Math.max(p.best_free, reached);
      const best = Math.max(p.best_free, p.best_daily);
      const unlockedNow = [];
      for (const [id, need] of Object.entries(T.powerup_unlocks)) if (best >= need && !p.unlocked.includes(id)) { p.unlocked.push(id); unlockedNow.push(id); }
      const ach = this.check_achievements(reason, reached);
      p.runs += 1; p.tutorial_done = true;
      if (s.name && s.name !== "You") p.name = s.name;
      this.save_profile(); this.clear_save();
      return { reason, reached, cause, newBest, unlocked: unlockedNow, achievements: ach, share: this.share_text(reason, reached, cause) };
    },
    check_achievements(reason, reached) {
      const s = this.s, c = s.counters, p = this.profile, got = [];
      const n = k => c[k] || 0;
      const tests = {
        first_run: true, day10: reached >= 10, day20: reached >= 20, win: reason === "win",
        win_daily: reason === "win" && s.mode === "daily", muted3: n("mutes") >= 3, clean_win: reason === "win" && n("mutes") === 0,
        coach_right: n("coach_right") >= 3, mob: n("coach_mob") >= 3, shirt: !!s.flags.saw_shirt, live: n("live_watched") >= 1,
        peace: n("combos_defused") >= 3, facts: n("stats_rebutted") >= 3, auntie: n("auntie_calls") >= 3, pu10: n("pu_used") >= 10,
        no_pu: reached >= 15 && n("pu_used") === 0, spicy20: n("spicy") >= 20, calm_saint: reached >= 20 && n("dogpiles") === 0,
        leaked: reason === "leak", deleted: reason === "admin", checked_out: reason === "sanity_high", rage_quit: reason === "sanity_low",
        normies: reason === "members_high", exposed: n("princess_exposed") >= 1, grudges: n("grudges_hit") >= 3, slow: n("timeouts") >= 5
      };
      for (const a of this.C.achievements) if (tests[a.id] && !p.achievements.includes(a.id)) { p.achievements.push(a.id); got.push(a.id); }
      return got;
    },
    share_text(reason, reached, cause) {
      const s = this.s, c = s.counters;
      const mode = s.mode === "daily" ? "Daily Run " + s.date : "CSG";
      const url = (root.location && /^https?:/.test(root.location.protocol)) ? root.location.origin + root.location.pathname : "https://ghettobreeze.github.io/csg/";
      const head = reason === "win" ? "🏆 " + mode + ": survived all 30 days." : "💀 " + mode + ": made it to Day " + reached + ". " + (cause ? "Killed by " + this.ch(cause).name + "." : (this.D.end_states[reason] || {}).title + ".");
      const bits = [];
      if (c.mutes) bits.push("🔇 Muted " + c.mutes + "x");
      bits.push("🌶️ " + (c.spicy || 0) + " spicy replies");
      if (c.pu_used) bits.push("⚡ " + c.pu_used + " power-ups");
      return head + "\n" + bits.join(" · ") + "\nThink you can survive the group chat? " + url;
    },

    flavor_line() {
      const s = this.s, m = s.meters;
      const ok = { always: true, kimmy_love: s.hidden.kimmy >= 4, kimmy_hate: s.hidden.kimmy <= -3,
        drama_high: m.drama > 75, drama_low: m.drama < 25, sanity_low: m.sanity < 25, clout_high: m.clout > 75,
        clout_low: m.clout < 25, members_low: m.members < 25, leak_high: s.hidden.leak >= 70, strikes: s.hidden.strikes >= 2 };
      const lines = this.C.flavor.filter(l => ok[l.if]);
      const urgent = lines.filter(l => l.if !== "always");
      return this.sub((urgent.length ? this.pick(urgent) : this.pick(lines)).text);
    },
    today_key: todayKey
  };

  root.GameState = GS;
  if (typeof module !== "undefined") module.exports = GS;
})(globalThis);
