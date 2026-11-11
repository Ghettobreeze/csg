// CSG profile pictures: original flat cartoon portraits drawn as inline SVG.
// avatarSVG(id) returns an <svg> string; unknown ids return "".
(function (root) {
  "use strict";
  const SK = { s1: "#c58c5f", s2: "#b07a52", s3: "#a06a45", s4: "#8d5a3b", s5: "#7d4a2e", s6: "#6b3f26", s7: "#5c3824", s8: "#4a2c1d", s9: "#3b2219" };
  const HAIR = { honey: "#b8864b", black: "#1b1b1f", brown: "#4b2e1e", blond: "#d8b25a", gray: "#a8a8ad", red: "#a4432a", white: "#e8e6e1" };

  // Each spec: bg, skin, hair {style,color}, shirt, brows, mouth, facial, acc[]
  const SPECS = {
    kimmy:     { bg: "#f7b6c2", skin: SK.s2, hair: { style: "bob", color: HAIR.honey }, shirt: "#1f3b5c", brows: "raised", mouth: "smile", acc: ["blazer", "badge"] },
    princess:  { bg: "#c084fc", skin: SK.s6, hair: { style: "fade", color: HAIR.black }, shirt: "#6d28d9", brows: "raised", mouth: "smirk", facial: "goatee", acc: ["crown"] },
    mcman:     { bg: "#9ca3af", skin: SK.s8, hair: { style: "ponytail", color: HAIR.black }, shirt: "#111827", brows: "flat", mouth: "flat", acc: ["headband", "hoops"] },
    pookie:    { bg: "#fca5a5", skin: SK.s4, hair: { style: "puff", color: HAIR.black }, shirt: "#dc2626", brows: "angry", mouth: "open", acc: ["shades", "lashes"] },
    section8:  { bg: "#d1d5db", skin: SK.s7, hair: { style: "receding", color: HAIR.brown }, shirt: "#111111", brows: "angry", mouth: "frown", facial: "mustache", acc: ["collar"] },
    auntiepat: { bg: "#fde68a", skin: SK.s6, hair: { style: "curls", color: HAIR.gray }, shirt: "#be185d", brows: "raised", mouth: "smile", acc: ["flower", "pearls", "glasses"] },
    bigbro:    { bg: "#fca5a5", skin: SK.s5, hair: { style: "buzz", color: HAIR.black }, shirt: "#111827", brows: "flat", mouth: "smirk", facial: "beard", acc: ["headphones", "chain"] },
    shady:     { bg: "#374151", skin: SK.s3, hair: { style: "none", color: HAIR.black }, shirt: "#1f2937", brows: "flat", mouth: "flat", acc: ["hood", "phone"] },
    drunktdave:{ bg: "#fdba74", skin: SK.s2, hair: { style: "messy", color: HAIR.black }, shirt: "#15803d", brows: "raised", mouth: "open", facial: "stubble", acc: ["blush", "beer"] },
    lurker:    { bg: "#111827", skin: "#000000", hair: { style: "none", color: HAIR.black }, shirt: "#0b0f19", brows: "none", mouth: "none", acc: ["lurk"] },
    bigmike:   { bg: "#67e8f9", skin: SK.s7, hair: { style: "none", color: HAIR.brown }, shirt: "SKIN", brows: "flat", mouth: "smile", facial: "beard", acc: ["truckercap", "chesthair"] },
    tiffany:   { bg: "#f9a8d4", skin: SK.s1, hair: { style: "long", color: HAIR.honey }, shirt: "#f472b6", brows: "raised", mouth: "smile", acc: ["lashes", "hoops"] },
    bossbabe:  { bg: "#d8b4fe", skin: SK.s3, hair: { style: "braids", color: HAIR.black }, shirt: "#7e22ce", brows: "raised", mouth: "smile", acc: ["headset", "lashes"] },
    marcus:    { bg: "#d6d3d1", skin: SK.s9, hair: { style: "locs", color: HAIR.black }, shirt: "#57534e", brows: "flat", mouth: "frown", facial: "stubble", acc: ["scarf"] },
    coach:     { bg: "#fca5a5", skin: SK.s5, hair: { style: "none", color: HAIR.gray }, shirt: "#b91c1c", brows: "flat", mouth: "smile", facial: "mustache", acc: ["cap", "whistle"] },
    debra:     { bg: "#bfdbfe", skin: SK.s4, hair: { style: "bob", color: HAIR.black }, shirt: "#1d4ed8", brows: "raised", mouth: "flat", acc: ["blazer", "pin", "glasses"] },
    larry:     { bg: "#bfdbfe", skin: SK.s6, hair: { style: "receding", color: HAIR.gray }, shirt: "#60a5fa", brows: "raised", mouth: "smirk", acc: ["glasses", "tie", "redpen"] },
    bluewave:  { bg: "#7dd3fc", skin: SK.s3, hair: { style: "short", color: HAIR.black }, shirt: "#0284c7", brows: "raised", mouth: "open", facial: "stubble", acc: ["wavecap"] },
    furious4:  { bg: "#fdba74", skin: SK.s8, hair: { style: "bun", color: HAIR.black }, shirt: "#ea580c", brows: "angry", mouth: "frown", acc: ["lashes", "hoops"] },
    brittany:  { bg: "#f9a8d4", skin: SK.s4, hair: { style: "braids", color: HAIR.brown }, shirt: "#be185d", brows: "flat", mouth: "smirk", acc: ["heartearring"] },
    catfish:   { fish: true, bg: "#fecdd3" },
    glitch:    { bg: "#94a3b8", skin: SK.s5, hair: { style: "short", color: HAIR.black }, shirt: "#475569", brows: "flat", mouth: "flat", acc: ["pixels"] },
    uncle:     { bg: "#bef264", skin: SK.s7, hair: { style: "none", color: HAIR.gray }, shirt: "#3f6212", brows: "raised", mouth: "open", facial: "beard", acc: ["foilhat"] },
    bothsides: { bg: "#e5e5e5", skin: SK.s4, hair: { style: "short", color: HAIR.black }, shirt: "SPLIT", brows: "flat", mouth: "flat", acc: [] },
    newguy:    { bg: "#a5f3fc", skin: SK.s2, hair: { style: "short", color: HAIR.black }, shirt: "#0891b2", brows: "raised", mouth: "smile", acc: ["nametag"] },
    you:       { bg: "#93c5fd", skin: SK.s6, hair: { style: "short", color: HAIR.black }, shirt: "#1877f2", brows: "raised", mouth: "smirk", acc: [] }
  };

  function hairBack(h) {
    const c = h.color;
    switch (h.style) {
      case "long": return `<path d="M16 26 C16 10 48 10 48 26 L50 54 L14 54 Z" fill="${c}"/>`;
      case "bob": return `<path d="M17 27 C17 11 47 11 47 27 L47 42 L17 42 Z" fill="${c}"/>`;
      case "puff": return `<circle cx="32" cy="20" r="16" fill="${c}"/>`;
      case "curls": return `<circle cx="20" cy="22" r="7" fill="${c}"/><circle cx="44" cy="22" r="7" fill="${c}"/><circle cx="32" cy="15" r="9" fill="${c}"/>`;
      case "ponytail": return `<path d="M44 18 C56 22 54 40 48 44 C50 34 48 26 42 22 Z" fill="${c}"/>`;
      case "bun": return `<circle cx="32" cy="10" r="6" fill="${c}"/>`;
      case "locs": return [16,21,26,38,43,48].map(x => `<rect x="${x-2}" y="16" width="4.5" height="${x<30||x>40?36:22}" rx="2.2" fill="${c}"/>`).join("") + `<circle cx="32" cy="17" r="13" fill="${c}"/>`;
      case "braids": return `<path d="M16 26 C16 10 48 10 48 26 L50 58 L14 58 Z" fill="${c}"/>` + [18,23,41,46].map(x => `<path d="M${x} 30 L${x} 58" stroke="#00000055" stroke-width="1" stroke-dasharray="2 2"/>`).join("");
      default: return "";
    }
  }
  function hairFront(h) {
    const c = h.color;
    switch (h.style) {
      case "short": return `<path d="M19 27 C18 12 46 12 45 27 C42 19 24 19 19 27 Z" fill="${c}"/>`;
      case "fade": return `<path d="M20 24 C21 14 43 14 44 24 C40 19 24 19 20 24 Z" fill="${c}"/>`;
      case "buzz": return `<path d="M20 24 C21 15 43 15 44 24 C40 20 24 20 20 24 Z" fill="${c}" opacity="0.85"/>`;
      case "receding": return `<path d="M19 28 C18 20 21 17 24 16 C22 20 21 24 21 30 Z M45 28 C46 20 43 17 40 16 C42 20 43 24 43 30 Z" fill="${c}"/>`;
      case "messy": return `<path d="M18 27 L20 15 L25 19 L28 12 L32 18 L36 11 L39 18 L44 14 L46 27 C42 20 24 20 18 27 Z" fill="${c}"/>`;
      case "long": case "bob": return `<path d="M19 26 C20 14 44 14 45 26 C40 17 30 22 19 26 Z" fill="${h.color}"/>`;
      case "puff": return `<path d="M20 24 C22 15 42 15 44 24 C38 19 26 19 20 24 Z" fill="${c}"/>`;
      case "ponytail": case "bun": return `<path d="M19 25 C20 13 44 13 45 25 C40 18 24 18 19 25 Z" fill="${c}"/>`;
      case "curls": return `<path d="M20 22 C24 14 40 14 44 22 C38 18 26 18 20 22 Z" fill="${c}"/>`;
      case "locs": return `<path d="M19 25 C20 13 44 13 45 25 C40 18 24 18 19 25 Z" fill="${c}"/>`;
      case "braids": return `<path d="M19 25 C20 13 44 13 45 25 C42 19 36 17 32 21 C28 17 22 19 19 25 Z" fill="${c}"/>`;
      default: return "";
    }
  }
  function brows(s) {
    const st = `stroke="#121214" stroke-width="2" stroke-linecap="round"`;
    if (s === "angry") return `<path d="M24 24 L30 26.5 M40 24 L34 26.5" ${st}/>`;
    if (s === "raised") return `<path d="M24 24.5 Q27 22.5 30 24.5 M34 24.5 Q37 22.5 40 24.5" fill="none" ${st}/>`;
    if (s === "flat") return `<path d="M24 25 L30 25 M34 25 L40 25" ${st}/>`;
    return "";
  }
  function mouth(s) {
    const st = `stroke="#d07a7f" stroke-width="2" stroke-linecap="round" fill="none"`;
    if (s === "smile") return `<path d="M27 37 Q32 41 37 37" ${st}/>`;
    if (s === "smirk") return `<path d="M27 38 Q33 39 37 35.5" ${st}/>`;
    if (s === "flat") return `<path d="M28 38 L36 38" ${st}/>`;
    if (s === "frown") return `<path d="M27 39.5 Q32 35.5 37 39.5" ${st}/>`;
    if (s === "open") return `<ellipse cx="32" cy="38" rx="3.4" ry="2.6" fill="#7a2d32" stroke="#d07a7f" stroke-width="1.2"/>`;
    return "";
  }
  function facial(f, c) {
    if (f === "beard") return `<path d="M19 31 C20 46 26 49 32 49 C38 49 44 46 45 31 C42 40 38 42 32 42 C26 42 22 40 19 31 Z" fill="${c}"/>`;
    if (f === "goatee") return `<path d="M29 41 C30 46 34 46 35 41 Z" fill="${c}"/>`;
    if (f === "mustache") return `<path d="M26 35.5 C29 33 31 34 32 35 C33 34 35 33 38 35.5 C35 36.5 33 36 32 36 C31 36 29 36.5 26 35.5 Z" fill="${c}"/>`;
    if (f === "stubble") return `<path d="M21 34 C22 44 27 47 32 47 C37 47 42 44 43 34" fill="none" stroke="${c}" stroke-width="3" opacity="0.35"/>`;
    return "";
  }
  function accessory(a, s) {
    switch (a) {
      case "crown": return `<path d="M22 14 L25 6 L29 12 L32 4 L35 12 L39 6 L42 14 Z" fill="#facc15" stroke="#a16207" stroke-width="0.8"/>`;
      case "headband": return `<rect x="18" y="19" width="28" height="4" rx="2" fill="#ec4899"/>`;
      case "hoops": return `<circle cx="18" cy="37" r="2.6" fill="none" stroke="#facc15" stroke-width="1.3"/><circle cx="46" cy="37" r="2.6" fill="none" stroke="#facc15" stroke-width="1.3"/>`;
      case "shades": return `<rect x="22" y="27" width="9" height="5" rx="2" fill="#111"/><rect x="33" y="27" width="9" height="5" rx="2" fill="#111"/><path d="M31 29 L33 29" stroke="#111" stroke-width="1.5"/>`;
      case "lashes": return `<path d="M24.5 28.5 L25.5 27 M27 28 L27 26.5 M37 28 L37 26.5 M39.5 28.5 L38.5 27" stroke="#111" stroke-width="0.9"/>`;
      case "collar": return `<rect x="29" y="44" width="6" height="4" fill="#ffffff"/>`;
      case "flower": return `<circle cx="44" cy="17" r="4.5" fill="#f472b6"/><circle cx="44" cy="17" r="1.8" fill="#fde047"/>`;
      case "pearls": return `<path d="M24 47 Q32 52 40 47" fill="none" stroke="#f8fafc" stroke-width="2.4" stroke-dasharray="0.1 3" stroke-linecap="round"/>`;
      case "glasses": return `<circle cx="27" cy="30" r="4" fill="none" stroke="#111" stroke-width="1.2"/><circle cx="37" cy="30" r="4" fill="none" stroke="#111" stroke-width="1.2"/><path d="M31 30 L33 30" stroke="#111" stroke-width="1.2"/>`;
      case "headphones": return `<path d="M17 30 C17 10 47 10 47 30" fill="none" stroke="#111" stroke-width="3"/><rect x="14" y="27" width="6" height="9" rx="2" fill="#ef4444"/><rect x="44" y="27" width="6" height="9" rx="2" fill="#ef4444"/>`;
      case "chain": return `<path d="M24 46 Q32 54 40 46" fill="none" stroke="#facc15" stroke-width="2"/>`;
      case "hood": return `<path d="M12 64 C12 30 18 8 32 8 C46 8 52 30 52 64 Z M20 30 C20 18 44 18 44 30 L44 44 C40 48 24 48 20 44 Z" fill="#1f2937" fill-rule="evenodd"/>`;
      case "phone": return `<rect x="23" y="24" width="18" height="14" rx="2.5" fill="#0f172a" stroke="#64748b" stroke-width="1"/><circle cx="36.5" cy="28" r="2.3" fill="#64748b"/>`;
      case "blush": return `<circle cx="24" cy="35" r="2.5" fill="#ef4444" opacity="0.45"/><circle cx="40" cy="35" r="2.5" fill="#ef4444" opacity="0.45"/>`;
      case "beer": return `<rect x="46" y="44" width="9" height="12" rx="1.5" fill="#f59e0b"/><rect x="46" y="42" width="9" height="3" fill="#fff"/><path d="M55 47 C59 47 59 53 55 53" fill="none" stroke="#f59e0b" stroke-width="1.5"/>`;
      case "lurk": return `<path d="M10 64 C10 28 18 10 32 10 C46 10 54 28 54 64 Z" fill="#0b0f19"/><ellipse cx="26" cy="31" rx="3" ry="2" fill="#f8fafc"/><ellipse cx="38" cy="31" rx="3" ry="2" fill="#f8fafc"/><circle cx="26" cy="31" r="1" fill="#111"/><circle cx="38" cy="31" r="1" fill="#111"/>`;
      case "truckercap": return `<path d="M18 22 C18 9 46 9 46 22 Z" fill="#f8fafc"/><path d="M18 22 C18 14 30 11 32 11 L32 22 Z" fill="#0891b2"/><path d="M16 22 L50 22 L52 25 L16 24 Z" fill="#0e7490"/>`;
      case "chesthair": return `<path d="M27 52 Q29 50 31 52 M33 52 Q35 50 37 52 M30 56 Q32 54 34 56" fill="none" stroke="#5b3a29" stroke-width="1"/><path d="M24 50 Q28 48 30 50 M34 50 Q36 48 40 50" fill="none" stroke="#7a4d33" stroke-width="1"/>`;
      case "headset": return `<path d="M18 28 C18 12 46 12 46 28" fill="none" stroke="#111" stroke-width="1.6"/><rect x="15" y="26" width="5" height="7" rx="2" fill="#111"/><path d="M18 33 Q20 40 27 39" fill="none" stroke="#111" stroke-width="1.3"/><circle cx="27.5" cy="39" r="1.3" fill="#111"/>`;
      case "scarf": return `<path d="M22 44 L42 44 L44 49 L20 49 Z" fill="#b45309"/><rect x="36" y="48" width="5" height="10" fill="#b45309"/>`;
      case "cap": return `<path d="M18 22 C18 9 46 9 46 22 Z" fill="#b91c1c"/><path d="M15 22 L48 22 L46 25 L15 24 Z" fill="#7f1d1d"/>`;
      case "whistle": return `<path d="M27 44 L32 50 L37 44" fill="none" stroke="#e5e7eb" stroke-width="1"/><rect x="29.5" y="49" width="6" height="3.5" rx="1.2" fill="#d4d4d8"/>`;
      case "blazer": return `<path d="M8 64 C10 50 18 45 26 44 L32 56 L38 44 C46 45 54 50 56 64 Z" fill="${s.shirt}"/><path d="M26 44 L32 56 L38 44" fill="none" stroke="#ffffff" stroke-width="1.5"/>`;
      case "badge": return `<rect x="40" y="52" width="9" height="5" rx="1" fill="#ffffff"/><path d="M42 54.5 L47 54.5" stroke="#1f3b5c" stroke-width="0.8"/>`;
      case "pin": return `<circle cx="44" cy="53" r="2.4" fill="#93c5fd" stroke="#ffffff" stroke-width="0.8"/>`;
      case "tie": return `<path d="M30.5 45 L33.5 45 L34.5 57 L32 60 L29.5 57 Z" fill="#1e3a8a"/>`;
      case "redpen": return `<rect x="46" y="46" width="3" height="13" rx="1" fill="#dc2626" transform="rotate(20 47 52)"/>`;
      case "wavecap": return `<path d="M18 22 C18 9 46 9 46 22 Z" fill="#0284c7"/><path d="M23 17 Q26 13 29 17 Q32 21 35 17 Q38 13 41 17" fill="none" stroke="#ffffff" stroke-width="1.4"/><path d="M15 22 L48 22 L46 25 L15 24 Z" fill="#075985"/>`;
      case "heartearring": return `<path d="M46 36 C44 34 42.5 36.5 46 39.5 C49.5 36.5 48 34 46 36 Z" fill="#ec4899"/>`;
      case "pixels": return `<rect x="21" y="26" width="6" height="6" fill="#22d3ee" opacity="0.8"/><rect x="35" y="22" width="5" height="5" fill="#f472b6" opacity="0.8"/><rect x="29" y="35" width="7" height="4" fill="#a3e635" opacity="0.8"/><rect x="40" y="33" width="4" height="4" fill="#facc15" opacity="0.8"/>`;
      case "foilhat": return `<path d="M20 20 L32 2 L44 20 Z" fill="#d4d4d8" stroke="#71717a" stroke-width="0.8"/><path d="M25 14 L39 14 M28 9 L36 9" stroke="#a1a1aa" stroke-width="0.8"/>`;
      case "nametag": return `<rect x="36" y="50" width="13" height="8" rx="1" fill="#ffffff"/><rect x="36" y="50" width="13" height="2.6" fill="#ef4444"/>`;
      default: return "";
    }
  }

  function catfishSVG(bg) {
    return `<circle cx="32" cy="32" r="32" fill="${bg}"/>` +
      `<path d="M4 46 C10 30 22 24 34 24 C48 24 58 32 60 42 C58 52 46 58 32 58 C20 58 10 54 4 46 Z" fill="#78716c"/>` +
      `<path d="M4 46 C10 42 18 42 24 46 C18 50 10 50 4 46 Z" fill="#a8a29e"/>` +
      `<path d="M30 25 L36 14 L42 25 Z" fill="#57534e"/>` +
      `<circle cx="46" cy="36" r="4.5" fill="#ffffff"/><circle cx="47" cy="36" r="2.2" fill="#111"/>` +
      `<path d="M44 31 L48 30.5 M43.5 32 L44 29.8 M47 31.5 L48.5 29.5" stroke="#111" stroke-width="0.9"/>` +
      `<path d="M54 44 C57 43 60 44 60 46 C60 48 57 49 54 48 Z" fill="#ec4899"/>` +
      `<path d="M55 42 C52 48 48 54 44 60 M57 43 C56 50 55 56 52 62 M54 47 C48 50 44 52 38 54" fill="none" stroke="#44403c" stroke-width="1.3" stroke-linecap="round"/>` +
      `<circle cx="30" cy="40" r="1.2" fill="#a8a29e"/><circle cx="25" cy="44" r="1" fill="#a8a29e"/><circle cx="34" cy="46" r="1.3" fill="#a8a29e"/>`;
  }

  function avatarSVG(id) {
    const s = SPECS[id];
    if (!s) return "";
    let g;
    if (s.fish) g = catfishSVG(s.bg);
    else {
      const shirt = s.shirt === "SKIN" ? s.skin : s.shirt;
      const body = s.shirt === "SPLIT"
        ? `<path d="M8 64 C10 48 20 44 32 44 L32 64 Z" fill="#dc2626"/><path d="M32 44 C44 44 54 48 56 64 L32 64 Z" fill="#2563eb"/>`
        : `<path d="M8 64 C10 48 20 44 32 44 C44 44 54 48 56 64 Z" fill="${shirt}"/>`;
      const eyes = (s.acc || []).includes("lurk") ? "" :
        `<ellipse cx="27" cy="30" rx="2.9" ry="2.3" fill="#ffffff"/><ellipse cx="37" cy="30" rx="2.9" ry="2.3" fill="#ffffff"/><circle cx="27.4" cy="30.2" r="1.5" fill="#1b1b1f"/><circle cx="37.4" cy="30.2" r="1.5" fill="#1b1b1f"/>`;
      const acc = s.acc || [];
      const under = acc.filter(a => ["hood", "lurk", "blazer"].includes(a));
      const over = acc.filter(a => !under.includes(a));
      g = `<circle cx="32" cy="32" r="32" fill="${s.bg}"/>` +
        hairBack(s.hair) + body +
        under.filter(a => a === "blazer").map(a => accessory(a, s)).join("") +
        `<rect x="27" y="38" width="10" height="8" fill="${s.skin}"/>` +
        `<circle cx="19" cy="31" r="3" fill="${s.skin}"/><circle cx="45" cy="31" r="3" fill="${s.skin}"/>` +
        `<ellipse cx="32" cy="29" rx="13" ry="15" fill="${s.skin}"/>` +
        facial(s.facial, s.hair.color) + hairFront(s.hair) + brows(s.brows) + eyes + mouth(s.mouth) +
        under.filter(a => a !== "blazer").map(a => accessory(a, s)).join("") +
        over.map(a => accessory(a, s)).join("");
    }
    return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="ac-${id}"><circle cx="32" cy="32" r="32"/></clipPath></defs><g clip-path="url(#ac-${id})">${g}</g></svg>`;
  }

  // Game logo: the group mid-conversation. Pleasant faces and angry faces, a heart
  // bubble and a cussing bubble.
  function face(id, x, y, size) {
    return avatarSVG(id).replace("<svg ", `<svg x="${x}" y="${y}" width="${size}" height="${size}" `);
  }
  function logoSVG() {
    const ring = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#2a1840" stroke-width="5"/>`;
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CSG"><defs><clipPath id="logo-clip"><circle cx="100" cy="100" r="100"/></clipPath></defs>` +
      `<g clip-path="url(#logo-clip)"><rect width="200" height="200" fill="#2a1840"/>` +
      face("auntiepat", 6, 52, 66) + ring(39, 85, 33) +
      face("furious4", 67, 30, 66) + ring(100, 63, 33) +
      face("bigmike", 128, 52, 66) + ring(161, 85, 33) +
      face("kimmy", 34, 112, 66) + ring(67, 145, 33) +
      face("section8", 100, 112, 66) + ring(133, 145, 33) +
      `</g>` +
      `<path d="M14 18 h40 a8 8 0 0 1 8 8 v16 a8 8 0 0 1 -8 8 h-26 l-10 9 v-9 h-4 a8 8 0 0 1 -8 -8 v-16 a8 8 0 0 1 8 -8 z" fill="#ffffff"/>` +
      `<path d="M34 41 C27 36 25 31 28.5 28.5 C31 26.8 33.5 28 34 30 C34.5 28 37 26.8 39.5 28.5 C43 31 41 36 34 41 Z" fill="#ec4899"/>` +
      `<path d="M146 10 h44 a8 8 0 0 1 8 8 v16 a8 8 0 0 1 -8 8 h-4 v9 l-10 -9 h-30 a8 8 0 0 1 -8 -8 v-16 a8 8 0 0 1 8 -8 z" fill="#ef4444"/>` +
      `<text x="168" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#ffffff">#@!</text>` +
      `</svg>`;
  }

  root.CSG_AVATARS = { specs: SPECS, avatarSVG, logoSVG };
})(globalThis);
