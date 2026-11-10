# CSG — Conversations, Shits & Giggles

A phone-first satirical group-chat survival game. Plain HTML/CSS/JS, no engine or build step.

## Play locally
Double-click `index.html`. It works straight from the folder; no server needed.

## Upload to itch.io
1. Upload `CSG_itch.zip` as the game file and tick **"This file will be played in the browser"**.
2. Kind of project: **HTML**. Viewport: 480 x 860, and tick **Mobile friendly** (orientation: portrait).
3. Optionally enable the fullscreen button.

## Edit content
- `data/messages.js` — decision cards, recurring signature cards, ambient chatter, secrets, day-summary lines.
- `data/tuning.js` — every balance number (days, decisions per day, leak, drift, combo size...).
- `data/characters.js`, `data/end_states.js` — roster and endings.

After editing, run the checks (needs Node):
```
node tools/acceptance.js   # rules check: signatures, wars, combos, all 11 endings
node tools/sim.js 2000     # content audit + simulated runs (win rates, death days)
```

## Files
- `js/game_state.js` — all rules and run state (no UI code).
- `js/ui.js` — chat bubbles, meters, reply bar, effects.
- `js/main.js` — screen flow: menu → feed → day summary → results.
