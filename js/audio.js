// CSG sound + vibration. Tiny synthesized blips, no audio files.
(function () {
  "use strict";
  let ctx = null, muted = false;
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } }
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  function tone(freq, start, dur, type, gain, endFreq) {
    const c = ac(); if (!c) return;
    const t0 = c.currentTime + start, o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(freq, t0);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(gain || 0.08, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  }
  const SOUNDS = {
    pop: () => tone(620, 0, 0.07, "sine", 0.05, 900),
    send: () => tone(900, 0, 0.06, "sine", 0.06, 1300),
    ding: () => { tone(880, 0, 0.12, "triangle", 0.07); tone(1320, 0.09, 0.16, "triangle", 0.06); },
    alert: () => { tone(440, 0, 0.09, "square", 0.04); tone(440, 0.13, 0.09, "square", 0.04); },
    alarm: () => tone(260, 0, 0.25, "sawtooth", 0.05, 170),
    power: () => { tone(523, 0, 0.08, "triangle", 0.06); tone(659, 0.07, 0.08, "triangle", 0.06); tone(784, 0.14, 0.14, "triangle", 0.06); },
    tick: () => tone(1400, 0, 0.03, "square", 0.025),
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.22, "triangle", 0.07)),
    lose: () => [392, 330, 262, 196].forEach((f, i) => tone(f, i * 0.16, 0.26, "sawtooth", 0.04))
  };
  window.Sound = {
    unlock() { ac(); },
    set muted(v) { muted = !!v; }, get muted() { return muted; },
    play(name) { if (muted || !SOUNDS[name]) return; try { SOUNDS[name](); } catch (e) { /* audio blocked */ } },
    buzz(pattern) { if (muted) return; try { if (navigator.vibrate) navigator.vibrate(pattern || [60, 40, 60]); } catch (e) { /* unsupported */ } }
  };
})();
