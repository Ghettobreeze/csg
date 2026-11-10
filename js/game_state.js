// CSG GameState (v2): all rules and run state. No DOM code here, so the same file
// runs in the browser and in the Node tools (tools/sim.js, tools/acceptance.js).
// Most methods return "events" for the UI to play in order:
//   {type:"post", speaker, text, badge?, kind?}   a chat bubble
//   {type:"system", text}                          a centered grey notice
//   {type:"shake", strength}  {type:"react", count}
(function (root) {
  "use strict";
  const METERS = ["drama", "clout", "sanity", "members"];
  const HIDDEN = ["leak", "admin_strikes", "council_anger", "bigmike_escalation", "bossbabe_recruit_progress"];
  const SAVE_KEY = "csg_best_day";
  const memoryStore = {};

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }

  const GameState = {
    tuning: null, characters: {}, roster: [], decisions: [], sig_templates: {},
    ambient: [], end_states: {}, content: null,
    day: 1, decision_index: 0, meters: {}, hidden: {}, kimmy_love: 0, seen_message_ids: [],
    active_characters: [], best_day: 0, run_over: false, end_reason: "", time_of_day: "morning",
    turn: 0, message_count: 0, sig_queue: [], sig_today: 0, flags: {}, war_turns: 0,
    combo_window: 0, muted_turns: 0, fury_turns: 0, day_start_meters: {}, pending_events: [],
    current_decision: null, stats: { reruns: 0 },
    rng: Math.random,

    // ---------- data ----------
    load_data() {
      const D = root.CSG_DATA;
      if (!D || !D.tuning || !D.characters || !D.messages || !D.end_states) throw new Error("CSG data files failed to load");
      this.tuning = D.tuning;
      this.roster = D.characters.characters;
      this.characters = {};
      for (const c of this.roster) this.characters[c.id] = c;
      this.content = D.messages;
      this.decisions = D.messages.decisions;
      this.sig_templates = D.messages.signature_decisions;
      this.ambient = D.messages.ambient;
      this.end_states = D.end_states;
      this.best_day = this.load_best_day();
    },

    rand_int(a, b) { return a + Math.floor(this.rng() * (b - a + 1)); },
    pick(arr) { return arr[Math.floor(this.rng() * arr.length)]; },

    reset_run() {
      const t = this.tuning;
      this.day = 1; this.decision_index = 0; this.turn = 0; this.message_count = 0;
      this.meters = {}; for (const m of METERS) this.meters[m] = t.meter_start;
      this.hidden = {}; for (const h of HIDDEN) this.hidden[h] = 0;
      this.kimmy_love = 0;
      this.seen_message_ids = [];
      this.active_characters = this.roster.map(c => c.id);
      this.run_over = false; this.end_reason = ""; this.time_of_day = "morning";
      this.sig_queue = []; this.sig_today = 0; this.war_turns = 0; this.combo_window = 0;
      this.muted_turns = 0; this.fury_turns = 0;
      this.current_decision = null; this.stats = { reruns: 0 };
      const targets = this.roster.filter(c => !c.bench &&
        !["brittany", "lurker", "shady", "bigbro", "kimmy"].includes(c.id)).map(c => c.id);
      const bbA = this.rand_int(5, 12), bbB = this.rand_int(16, 26);
      this.flags = {
        princess_meaner: 0, marcus_left: false, departed: 0, lurker_spoke: false,
        brittany_target: this.pick(targets), brittany_day: this.rand_int(8, 20),
        livestream: false, bossbabe_resolved: false, auntie_ready_day: 1,
        combo_cooldown_until: 0, last_post_turn: {}, last_stats_turn: {}, stats_cooldown_until: 0,
        glimpse: {}, last_spicy_reply: "", dave_night_post: false, catfish_last_day: 0,
        night_note_day: 0, shirt_day: this.rand_int(18, 27), shirt_done: false,
        bigbro_days: [bbA, bbB], beef_queued_day: 0, vouch_day: 0,
        secrets_left: deepCopy(this.content.secrets), sig_counter: 0,
        combos: 0, wars: 0, dogpiles: 0, mutes: 0, stats_wars: 0, beefs: 0, furies: 0, vouches: 0
      };
      this.day_start_meters = Object.assign({}, this.meters);
      this.pending_events = [{ type: "system", text: "You joined CSG • Day 1. Survive 30 days." }]
        .concat(this.fire_signature_moves("day_start"));
    },

    get_character(id) {
      if (id === "you") return { id: "you", name: "You", emoji: "😈", color: "#1877f2" };
      return this.characters[id] || { id, name: id, emoji: "❔", color: "#888" };
    },
    is_active(id) { return this.active_characters.includes(id); },
    member_count() { return Math.max(1, this.roster.length - this.flags.departed); },
    target_name() { return this.get_character(this.flags.brittany_target).name; },
    is_muted() { return this.muted_turns > 0; },

    // ---------- decisions ----------
    get_decision_pool() {
      return this.decisions.filter(d =>
        !this.seen_message_ids.includes(d.id) &&
        this.day >= (d.min_day || 1) &&
        (d.max_day === undefined || this.day <= d.max_day) &&
        this.is_active(d.speaker) &&
        (!(d.tags || []).includes("night") || this.time_of_day === "night") &&
        (!(d.tags || []).includes("morning") || this.time_of_day === "morning"));
    },

    make_sig(key, priority) {
      const tpl = this.sig_templates[key];
      const sub = s => s.replace(/\{target\}/g, this.target_name());
      this.flags.sig_counter += 1;
      const inst = {
        id: "sig_" + key + "_" + this.flags.sig_counter, sig: key, speaker: tpl.speaker,
        badge: tpl.badge, type: tpl.type, tags: tpl.tags || [], priority: !!priority,
        text: sub(this.pick(tpl.variants)), choices: deepCopy(tpl.choices)
      };
      for (const c of inst.choices) c.label = sub(c.label);
      return inst;
    },

    queue_sig(key, priority) {
      if (priority && this.sig_queue.some(s => s.sig === key && s.priority)) return;
      const inst = this.make_sig(key, priority);
      if (priority) this.sig_queue.unshift(inst); else this.sig_queue.push(inst);
    },

    next_decision() {
      const cap = this.tuning.max_signature_decisions_per_day;
      let d = null;
      this.sig_queue = this.sig_queue.filter(s => this.is_active(s.speaker));
      if (this.sig_queue.length && (this.sig_queue[0].priority || this.sig_today < cap)) {
        d = this.sig_queue.shift(); this.sig_today += 1;
      } else {
        const pool = this.get_decision_pool();
        const night = pool.filter(p => (p.tags || []).includes("night"));
        if (night.length && this.rng() < 0.6) d = this.pick(night);
        else if (pool.length) d = this.pick(pool);
        else if (this.sig_queue.length) { d = this.sig_queue.shift(); this.sig_today += 1; }
        else {
          const any = this.decisions.filter(x => this.is_active(x.speaker) && !(x.tags || []).includes("night"));
          d = this.pick(any); this.stats.reruns += 1;
        }
      }
      this.current_decision = d;
      return d;
    },

    change_meter(m, delta) {
      const t = this.tuning;
      this.meters[m] = clamp(Math.round(this.meters[m] + delta), t.meter_min, t.meter_max);
    },
    change_hidden(h, delta) { this.hidden[h] = Math.max(0, this.hidden[h] + delta); },
    change_love(delta) { this.kimmy_love = clamp(this.kimmy_love + delta, -10, 10); },

    // Called when the UI posts a decision card, so co-signs and replies can follow it.
    on_decision_posted(d) {
      const ev = [];
      const C = this.content;
      if (d.speaker === "princess" && (d.tags || []).includes("princess")) {
        if (this.is_active("pookie")) ev.push({ type: "post", speaker: "pookie", quiet: true, text: this.pick(C.princess_cosigns.pookie) });
        if (this.is_active("mcman")) ev.push({ type: "post", speaker: "mcman", quiet: true, text: this.pick(C.princess_cosigns.mcman) });
        const men = C.princess_cosigns.men.filter(m => this.is_active(m[0]));
        const m = this.pick(men);
        if (m) ev.push({ type: "post", speaker: m[0], text: m[1] });
        if (d.sig === "princess_take" && this.rng() < 0.45) this.queue_beef();
      }
      if (d.speaker === "bigmike" && d.type === "video") {
        const begs = C.shirt_begs.filter(b => this.is_active(b[0]));
        const n = this.rand_int(1, 2);
        for (let i = 0; i < n && begs.length; i++) {
          const b = begs.splice(Math.floor(this.rng() * begs.length), 1)[0];
          ev.push({ type: "post", speaker: b[0], text: b[1] });
        }
      }
      return ev;
    },

    queue_beef() {
      if (this.flags.beef_queued_day === this.day) return;
      this.flags.beef_queued_day = this.day; this.flags.beefs += 1;
      this.queue_sig("bigmike_beef", true);
    },

    // ---------- choices ----------
    apply_choice(decision, choice) {
      const t = this.tuning;
      const ev = [];
      const eff = Object.assign({}, choice.effects);
      const tags = decision.tags || [];

      if (decision.sig === "princess_take" && this.flags.princess_meaner > 0) {
        const k = 1 + 0.5 * this.flags.princess_meaner;
        for (const m of METERS) if (eff[m]) eff[m] = Math.round(eff[m] * k);
        this.flags.princess_meaner = 0;
        ev.push({ type: "system", text: "Pander Princess is back from getting exposed. He's meaner now." });
      }
      if (this.time_of_day === "night" && choice.spicy && (eff.drama || 0) > 0) {
        eff.drama = Math.round(eff.drama * t.night_spicy_drama_multiplier);
        if (this.flags.night_note_day !== this.day) {
          this.flags.night_note_day = this.day;
          ev.push({ type: "system", text: "🌙 It's 2am. Spicy replies hit harder. Dave is awake." });
        }
      }

      for (const m of METERS) if (eff[m]) this.change_meter(m, eff[m] * t.choice_effect_scale);
      for (const h of HIDDEN) if (eff[h]) this.change_hidden(h, eff[h]);
      if (tags.includes("council")) this.change_hidden("council_anger", 1);
      if (eff.kimmy) this.change_love(eff.kimmy);
      if (choice.spicy) {
        this.change_hidden("leak", t.leak_per_spicy_choice);
        if (!choice.act) this.flags.last_spicy_reply = choice.label;
      }

      if (eff.princess_meaner) {
        this.flags.princess_meaner += 1;
        ev.push({ type: "system", text: "Princess saw it. He'll be back meaner." });
      }
      if (eff.reveal_secret) ev.push(...this.reveal_secret());
      if (eff.marcus_call && !this.flags.marcus_left) ev.push(...this.marcus_leaves());
      if (eff.beef) this.queue_beef();
      if (eff.fury) ev.push(...this.start_fury());

      if (choice.spicy) {
        ev.push({ type: "shake", strength: 1 });
        let chance = this.meters.drama > 70 ? t.report_chance_spicy_high_drama : t.report_chance_spicy;
        if (this.kimmy_love <= t.kimmy_hate_level) chance *= 2;
        if (this.rng() < chance) ev.push(...this.add_strike("Somebody reported your post."));
      }
      if (choice.spicy || (eff.clout || 0) >= 10) ev.push({ type: "react", count: choice.spicy ? 6 : 3 });

      if (eff.defend && this.hidden.council_anger >= t.council_anger_dogpile) ev.push(...this.council_dogpile());

      if (tags.includes("political") && this.war_turns === 0) {
        this.war_turns = t.war_turns; this.flags.wars += 1;
        const mob = this.pick(this.content.war_lines.mob);
        ev.push({ type: "post", speaker: mob[0], badge: "⚠ FACTION WAR", kind: "signature", text: mob[1] });
        ev.push({ type: "system", text: "⚠ Coach vs Debra, Larry and Blue Wave Dave. Survive " + t.war_turns + " turns." });
        this.queue_sig("coach_logic", true);
      }

      if (eff.offense) ev.push(...this.kimmy_offense());
      else if (this.kimmy_love <= t.kimmy_mute_level && !this.is_muted()) ev.push(...this.kimmy_mute("You've been on my nerves all week."));

      ev.push(...this.shady_glimpses());

      if (!this.seen_message_ids.includes(decision.id)) this.seen_message_ids.push(decision.id);
      return ev;
    },

    // While muted, the group answers for you: a random non-spicy reply is applied.
    auto_resolve(decision) {
      const calm = decision.choices.filter(c => !c.spicy && !(c.effects || {}).offense);
      const c = this.pick(calm.length ? calm : decision.choices);
      const eff = Object.assign({}, c.effects);
      for (const m of METERS) if (eff[m]) this.change_meter(m, eff[m] * this.tuning.choice_effect_scale);
      for (const h of HIDDEN) if (eff[h] && h !== "admin_strikes") this.change_hidden(h, eff[h]);
      if (!this.seen_message_ids.includes(decision.id)) this.seen_message_ids.push(decision.id);
      if ((decision.tags || []).includes("political") && this.war_turns === 0) { this.war_turns = this.tuning.war_turns; this.flags.wars += 1; }
      return [{ type: "system", text: "🔇 You're muted. The group answered for you: \"" + c.label + "\"" }];
    },

    add_strike(reason) {
      const t = this.tuning, ev = [];
      if (this.kimmy_love >= t.kimmy_love_level && this.flags.vouch_day !== this.day) {
        this.flags.vouch_day = this.day; this.flags.vouches += 1; this.change_love(-3);
        return [{ type: "post", speaker: "kimmy", badge: "🏡 KIMMY VOUCHED", kind: "signature",
          text: "Big Bro, I've got this one. They're a menace, but they're OUR menace. 🙂" },
          { type: "system", text: reason + " Kimmy talked Big Bro out of a strike." }];
      }
      this.hidden.admin_strikes += 1;
      const raps = this.content.big_bro.strike_raps;
      ev.push({ type: "system", text: reason });
      ev.push({ type: "post", speaker: "bigbro", badge: "🛡️ STRIKE " + this.hidden.admin_strikes + "/" + t.admin_strikes_to_delete,
        kind: "signature", text: raps[Math.min(raps.length, this.hidden.admin_strikes) - 1] });
      return ev;
    },

    kimmy_offense() {
      const t = this.tuning;
      if (this.kimmy_love >= t.kimmy_warning_love && !this.is_muted()) {
        this.change_love(-3);
        return [{ type: "post", speaker: "kimmy", badge: "⚠ FAMILY GROUP", kind: "signature",
          text: "That's your ONE warning. This is a family group. 🙂" }];
      }
      return this.kimmy_mute("This is a FAMILY group.");
    },

    kimmy_mute(why) {
      const t = this.tuning, ev = [];
      const reports = this.kimmy_love <= t.kimmy_hate_level;
      this.muted_turns = t.mute_turns; this.flags.mutes += 1;
      this.kimmy_love = Math.max(this.kimmy_love, -3);
      ev.push({ type: "post", speaker: "kimmy", badge: "🔇 MUTED", kind: "signature",
        text: why + " You're muted for 1 day. Think about what you did. 🙂 — Kimmy K." });
      if (reports) ev.push(...this.add_strike("Kimmy reported you to Big Bro."));
      ev.push({ type: "shake", strength: 2 });
      return ev;
    },

    start_fury() {
      if (!this.is_active("furious4")) return [];
      this.fury_turns = this.tuning.fury_turns; this.flags.furies += 1;
      return [{ type: "post", speaker: "furious4", badge: "😤 ALL CAPS MODE", kind: "signature", text: this.pick(this.content.furious_caps) },
        { type: "shake", strength: 2 }];
    },

    reveal_secret() {
      const left = this.flags.secrets_left;
      if (!left.length) return [{ type: "system", text: "🤫 Nothing new in the video. Just loyalty talk." }];
      const s = left.splice(Math.floor(this.rng() * left.length), 1)[0];
      this.change_meter("drama", 5);
      return [{ type: "system", text: "🤫 " + s }];
    },

    marcus_leaves() {
      this.flags.marcus_left = true;
      this.active_characters = this.active_characters.filter(i => i !== "marcus");
      this.flags.departed += 4;
      this.change_meter("members", -12);
      return [
        { type: "post", speaker: "marcus", badge: "🚪 ACTUALLY LEAVING", kind: "signature", text: "Fine. Bet. I'm out. And I'm taking people with me." },
        { type: "system", text: "Marcus left the group. 3 others left with him." },
        { type: "shake", strength: 2 }
      ];
    },

    council_dogpile() {
      this.change_meter("clout", -20); this.change_meter("sanity", -15);
      this.hidden.council_anger = 0; this.flags.dogpiles += 1;
      const lines = ["You defended someone? In THIS economy?", "The Council has convened. Emergency session.", "The vote was unanimous. 1–0.", "This message is also from the Council."];
      const ev = lines.map((l, i) => ({ type: "post", speaker: "section8", badge: i === 0 ? "🐺 COUNCIL DOGPILE" : undefined,
        kind: "signature", text: l + " — The Council" }));
      ev.push({ type: "system", text: "(10 more messages from the Council.) Clout -20, Sanity -15." });
      ev.push({ type: "shake", strength: 2 });
      return ev;
    },

    shady_glimpses() {
      const ev = [], G = this.content.shady_glimpses, f = this.flags;
      const levels = [[40, "low"], [70, "mid"], [90, "high"]];
      for (const [th, key] of levels) {
        if (this.hidden.leak >= th && !f.glimpse[th]) {
          f.glimpse[th] = true;
          const reply = f.last_spicy_reply || "lol";
          ev.push({ type: "post", speaker: "shady", badge: "📸 LEAK RISK", kind: "signature", text: "📸" });
          ev.push({ type: "system", text: this.pick(G[key]).replace("{reply}", reply) });
        }
        if (this.hidden.leak < th - 15) f.glimpse[th] = false;
      }
      return ev;
    },

    get_bonus_actions() {
      if (this.is_muted()) return [];
      const out = [];
      if (this.combo_window > 0) out.push({ id: "peace_gif", label: "post the peace gif 🕊️", hint: "defuses the combo" });
      if (this.hidden.council_anger >= 3 && this.day >= this.flags.auntie_ready_day && this.is_active("auntiepat"))
        out.push({ id: "auntie", label: "tag Auntie Pat to calm the Saint 🌺", hint: "resets Council anger, costs Sanity" });
      return out;
    },

    bonus_action(id) {
      if (id === "peace_gif" && this.combo_window > 0) {
        this.combo_window = 0; this.flags.combo_cooldown_until = this.turn + 18;
        this.change_meter("drama", -5); this.change_meter("clout", -5);
        return [{ type: "system", text: "🕊️ Combo defused. McMan Hater and Pookie Patrol are too confused to keep going." },
          { type: "react", count: 3 }];
      }
      if (id === "auntie") {
        this.hidden.council_anger = 0; this.flags.auntie_ready_day = this.day + 3;
        this.change_meter("sanity", -10);
        return [{ type: "post", speaker: "auntiepat", badge: "🌺 COUNCIL CALMED", kind: "signature",
          text: "Baby. ENOUGH. Your mother is in this group. 🌺🌺🌺 (14 flower images attached)" },
          { type: "post", speaker: "section8", text: "...yes ma'am. The Council is adjourned." }];
      }
      return [];
    },

    // Call for every message that appears in the feed. opts.stats marks a junk-stats post.
    note_post(speaker, opts) {
      opts = opts || {};
      this.message_count += 1;
      const ev = [], f = this.flags, t = this.tuning;
      if (opts.quiet) return ev;
      if (speaker === "drunktdave" && this.time_of_day === "night") f.dave_night_post = true;
      if (speaker === "pookie" || speaker === "mcman") {
        const other = speaker === "pookie" ? "mcman" : "pookie";
        const last = f.last_post_turn[other];
        if (last !== undefined && this.turn - last <= 1 && this.combo_window === 0 && this.turn >= f.combo_cooldown_until) {
          this.combo_window = t.combo_window_turns; f.combos += 1;
          ev.push({ type: "post", speaker: speaker, badge: "💥 CROSS-POST COMBO", kind: "signature",
            text: speaker === "pookie" ? "MCMAN SAID IT FIRST AND IM SAYIN IT AGAIN 💥" : "Pookie Patrol said it with typos but she said it. 💥" });
          ev.push({ type: "system", text: "McMan Hater and Pookie Patrol are cross-posting. Drama +" + t.combo_drama + " in " + this.combo_window + " turns unless someone posts the peace gif." });
          ev.push({ type: "shake", strength: 1 });
        }
        f.last_post_turn[speaker] = this.turn;
      }
      if (opts.stats && (speaker === "mcman" || speaker === "section8")) {
        const other = speaker === "mcman" ? "section8" : "mcman";
        const last = f.last_stats_turn[other];
        if (last !== undefined && this.turn - last <= 3 && this.turn >= f.stats_cooldown_until) {
          f.stats_cooldown_until = this.turn + 8; f.stats_wars += 1;
          this.queue_sig("stats_war", true);
          ev.push({ type: "system", text: "📊 Two charts, zero sources. A stats war is starting." });
        }
        f.last_stats_turn[speaker] = this.turn;
      }
      return ev;
    },

    pick_ambient() {
      const [lo, hi] = this.tuning.ambient_messages_per_decision;
      const n = this.rand_int(lo, hi);
      const pool = this.ambient.filter(a => this.is_active(a.speaker) && (!a.time || a.time === this.time_of_day));
      const out = [];
      for (let i = 0; i < n && pool.length; i++) {
        const a = pool.splice(Math.floor(this.rng() * pool.length), 1)[0];
        out.push({ speaker: a.speaker, text: a.text.replace(/\{target\}/g, this.target_name()), stats: !!a.stats, effects: a.effects });
      }
      return out;
    },

    // Ambient lines can carry small effects (the Catfish's jokes cool the chat).
    apply_ambient(a) {
      if (!a.effects) return;
      for (const m of METERS) if (a.effects[m]) this.change_meter(m, a.effects[m]);
    },

    // ---------- end conditions ----------
    check_lose_conditions() {
      const t = this.tuning, m = this.meters;
      let r = "";
      if (this.hidden.admin_strikes >= t.admin_strikes_to_delete) r = "admin";
      else if (this.hidden.leak >= t.leak_threshold) r = "leak";
      else if (m.drama >= t.meter_max) r = "drama_high";
      else if (m.drama <= t.meter_min) r = "drama_low";
      else if (m.clout >= t.meter_max) r = "clout_high";
      else if (m.clout <= t.meter_min) r = "clout_low";
      else if (m.sanity <= t.meter_min) r = "sanity_low";
      else if (m.sanity >= t.meter_max) r = "sanity_high";
      else if (m.members <= t.meter_min) r = "members_low";
      else if (m.members >= t.meter_max) r = "members_high";
      if (r) { this.run_over = true; this.end_reason = r; }
      return r;
    },

    end_run(reason) {
      this.run_over = true; this.end_reason = reason;
      this.save_best_day();
    },

    // ---------- turn and day flow ----------
    advance_decision() {
      const t = this.tuning, ev = [], C = this.content;
      this.turn += 1;
      this.decision_index += 1;

      this.change_meter("members", Math.round((this.meters.drama - 50) * t.members_per_drama_point));
      this.change_meter("drama", -t.drama_cooldown_per_turn);
      this.change_meter("clout", -t.clout_fade_per_turn);

      if (this.war_turns > 0) {
        this.war_turns -= 1;
        const mob = this.pick(C.war_lines.mob);
        ev.push({ type: "post", speaker: mob[0], badge: "⚠ FACTION WAR", kind: "signature", text: mob[1] });
        ev.push({ type: "post", speaker: "coach", badge: "⚠ FACTION WAR", kind: "signature", text: this.pick(C.war_lines.coach) });
        this.change_meter("drama", t.war_drama_per_turn); this.change_meter("sanity", t.war_sanity_per_turn);
        if (this.war_turns === 0) ev.push({ type: "system", text: "The flame war burned out. Coach lost. Coach was right. Both can be true." });
      }
      if (this.fury_turns > 0) {
        this.fury_turns -= 1;
        ev.push({ type: "post", speaker: "furious4", badge: "😤 ALL CAPS MODE", kind: "signature", text: this.pick(C.furious_caps) });
        const b = this.pick(C.furious_backup.filter(x => this.is_active(x[0])));
        if (b) ev.push({ type: "post", speaker: b[0], quiet: true, text: b[1] });
        this.change_meter("drama", t.fury_drama_per_turn);
        if (this.fury_turns === 0) ev.push({ type: "system", text: "The Furious 4 turned caps lock off. For now." });
      }
      if (this.combo_window > 0) {
        this.combo_window -= 1;
        if (this.combo_window === 0) {
          this.change_meter("drama", t.combo_drama);
          this.flags.combo_cooldown_until = this.turn + 18;
          ev.push({ type: "post", speaker: "mcman", badge: "💥 COMBO HIT", kind: "signature",
            text: "Pookie and I said what we said. The whole group is arguing now." });
          ev.push({ type: "shake", strength: 3 });
        }
      }
      if (this.muted_turns > 0) {
        this.muted_turns -= 1;
        if (this.muted_turns === 0) {
          this.kimmy_love = Math.max(this.kimmy_love, -2);
          ev.push({ type: "post", speaker: "kimmy", badge: "🔊 UNMUTED", kind: "signature", text: "You're unmuted. Behave. 🙂" });
        }
      }
      ev.push(...this.fire_signature_moves("turn"));

      const dayComplete = this.decision_index >= t.decisions_per_day;
      if (!dayComplete) this.time_of_day = this.tod_for(this.decision_index);
      return { events: ev, day_complete: dayComplete };
    },

    tod_for(i) {
      const dpd = this.tuning.decisions_per_day;
      if (i === 0) return "morning";
      if (i === dpd - 1) return "night";
      return "afternoon";
    },

    roll_day() {
      const t = this.tuning, f = this.flags;
      this.day += 1; this.decision_index = 0; this.time_of_day = "morning"; this.sig_today = 0;
      this.change_hidden("leak", -t.leak_decay_per_day);
      for (const m of METERS) {
        const v = this.meters[m];
        this.meters[m] = Math.round(v + (t.meter_start - v) * t.overnight_reversion);
      }
      if (!f.bossbabe_resolved && this.day <= t.bossbabe_recruit_day) this.change_hidden("bossbabe_recruit_progress", 1);
      this.day_start_meters = Object.assign({}, this.meters);
      this.pending_events = this.fire_signature_moves("day_start");
      return this.pending_events;
    },

    day_deltas() {
      const out = {};
      for (const m of METERS) out[m] = this.meters[m] - this.day_start_meters[m];
      return out;
    },

    fire_signature_moves(phase) {
      const t = this.tuning, f = this.flags, ev = [], d = this.day, C = this.content;
      if (phase === "turn") {
        if (!f.lurker_spoke && this.message_count >= t.lurker_message_count) {
          f.lurker_spoke = true;
          ev.push({ type: "post", speaker: "lurker", badge: "👁️ THE LURKER SPEAKS", kind: "signature", text: C.lurker_line });
          for (const m of METERS) this.meters[m] = Math.round(this.meters[m] + (50 - this.meters[m]) * 0.3);
          ev.push({ type: "system", text: "The chat goes silent. Every meter drifts back toward the middle." });
          ev.push({ type: "shake", strength: 2 });
        }
        if (d >= 3 && d - f.catfish_last_day >= 3 && this.rng() < 0.12 && this.is_active("catfish")) {
          f.catfish_last_day = d; this.queue_sig("catfish_dm", false);
        }
        return ev;
      }

      // phase === "day_start"
      if (f.dave_night_post) {
        f.dave_night_post = false;
        this.change_meter("sanity", 5);
        ev.push({ type: "post", speaker: "drunktdave", badge: "🍺 9AM APOLOGY", kind: "signature",
          text: "morning everyone. i'm sorry about whatever i said last night. (the drunk dave. not the wave one.)" });
      }
      if (d % 4 === 0) this.queue_sig("kimmy_listing");
      if (d % 3 === 0) this.queue_sig("princess_take");
      if (d % 5 === 0) this.queue_sig("section8_sermon");
      if (d % 5 === 2) this.queue_sig("auntie_misinfo");
      if (d % 5 === 4) this.queue_sig("tiffany_dogpile");
      if (d % 7 === 0 && this.is_active("marcus")) this.queue_sig("marcus_leaving");
      if ([3, 7, 11].includes(d) && !f.bossbabe_resolved) this.queue_sig("bossbabe_pitch");

      // Big Mike: videos, a livestream by day 20 if ignored, and one shirt per run.
      if (d === 20 && !f.livestream && this.hidden.bigmike_escalation >= 2) {
        f.livestream = true;
        ev.push({ type: "system", text: "🔴 Big Mike started a livestream. Nobody asked. He's not stopping." });
        this.change_meter("drama", 10);
        this.queue_sig("bigmike_live", true);
      } else if (d % 4 === 2) {
        this.queue_sig(f.livestream ? "bigmike_live" : "bigmike_video");
      }
      if (d === f.shirt_day && !f.shirt_done) {
        f.shirt_done = true;
        this.change_meter("drama", 15);
        ev.push({ type: "post", speaker: "bigmike", badge: "👕 SHIRT ON??", kind: "signature", text: "🎥 6:31, cab of the Peterbilt. He is wearing. A shirt." });
        ev.push({ type: "post", speaker: "kimmy", text: "MIKE ARE YOU OK??" });
        ev.push({ type: "post", speaker: "auntiepat", text: "blink twice baby 🌺" });
        ev.push({ type: "post", speaker: "princess", text: "...good for him I guess" });
        ev.push({ type: "post", speaker: "bigmike", text: "AC broke. Don't get used to it." });
        ev.push({ type: "shake", strength: 2 });
      }

      // Boss Babe recruits Tiffany by day 12 unless warned off.
      if (d === t.bossbabe_recruit_day && !f.bossbabe_resolved) {
        f.bossbabe_resolved = true;
        if (this.hidden.bossbabe_recruit_progress >= t.bossbabe_recruit_threshold && this.is_active("tiffany")) {
          this.change_meter("members", -30);
          ev.push({ type: "post", speaker: "bossbabe", badge: "💼 TIFFANY RECRUITED", kind: "signature",
            text: "Welcome TIFFANY to the team!! 💖 This group is now a recruiting funnel. DM me for the link." });
          ev.push({ type: "post", speaker: "tiffany", text: "hey hun!! 💖 quick question, have you heard of financial freedom?" });
          ev.push({ type: "shake", strength: 2 });
        } else {
          ev.push({ type: "post", speaker: "bossbabe", badge: "💼 PITCH FAILED", kind: "signature",
            text: "Tiffany said no 🙄 Her loss. Kimmy, hun, are you free tonight?" });
          ev.push({ type: "post", speaker: "kimmy", text: "I sell HOUSES, Brenda. 🙂" });
        }
      }

      if (d === f.brittany_day && this.is_active("brittany")) {
        this.queue_sig("brittany_bomb", true);
        ev.push({ type: "shake", strength: 3 });
      }

      // Big Bro: rare drops (a joke or a rap), plus a chance of forgiveness.
      if (f.bigbro_days.includes(d)) {
        ev.push({ type: "system", text: "Big Bro is typing... (the whole chat goes quiet)" });
        ev.push({ type: "post", speaker: "bigbro", badge: "🎤 BIG BRO", kind: "signature", text: this.pick(C.big_bro.drops) });
        ev.push({ type: "react", count: 8 });
      }
      if ((d === 11 || d === 21) && this.hidden.admin_strikes > 0 && this.rng() < 0.5) {
        this.hidden.admin_strikes -= 1;
        ev.push({ type: "post", speaker: "bigbro", badge: "🛡️ ADMIN", kind: "signature",
          text: "Feeling generous, so I'm taking back a strike / don't make me regret it, keep the group tight 🎤" });
      }
      return ev;
    },

    kimmy_face() {
      const l = this.kimmy_love;
      if (this.is_muted()) return "🔇";
      if (l >= 6) return "😊"; if (l >= 2) return "🙂"; if (l > -2) return "😐"; if (l > -6) return "😒"; return "😤";
    },

    flavor_line() {
      const m = this.meters, t = this.tuning;
      const ok = { always: true, kimmy_love: this.kimmy_love >= t.kimmy_love_level, kimmy_hate: this.kimmy_love <= t.kimmy_hate_level,
        drama_high: m.drama > 75, drama_low: m.drama < 25, sanity_low: m.sanity < 25,
        clout_high: m.clout > 75, clout_low: m.clout < 25, members_low: m.members < 25,
        leak_high: this.hidden.leak >= 70, strikes: this.hidden.admin_strikes >= 2 };
      const lines = this.content.flavor.filter(l => ok[l.if]);
      const urgent = lines.filter(l => l.if !== "always");
      const chosen = urgent.length ? this.pick(urgent) : this.pick(lines);
      return chosen.text.replace("{day}", this.day);
    },

    // ---------- persistence ----------
    storage_get() {
      try { if (root.localStorage) return root.localStorage.getItem(SAVE_KEY); } catch (e) { /* blocked */ }
      return memoryStore[SAVE_KEY] || null;
    },
    storage_set(v) {
      memoryStore[SAVE_KEY] = v;
      try { if (root.localStorage) root.localStorage.setItem(SAVE_KEY, v); } catch (e) { /* blocked */ }
    },
    load_best_day() { const v = parseInt(this.storage_get(), 10); return isNaN(v) ? 0 : v; },
    save_best_day() {
      const reached = this.end_reason === "win" ? this.tuning.total_days : this.day;
      if (reached > this.best_day) { this.best_day = reached; this.storage_set(String(reached)); }
    }
  };

  root.GameState = GameState;
  if (typeof module !== "undefined") module.exports = GameState;
})(globalThis);
