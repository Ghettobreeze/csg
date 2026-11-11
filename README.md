# CSG — Conversations, Shits & Giggles

A phone-first satirical group-chat survival game. Plain HTML/CSS/JS, no engine, no build step.
Live: https://ghettobreeze.github.io/csg/

## How it plays
- Survive 30 days, 4 reply moments a day. Keep Drama, Clout, Sanity and Members away from 0 **and** 100.
- 16-second reply timer (24s on your first run). Too slow and the group picks the worst reply for you.
- Effects ramp up from x1.0 on day 1 to x1.55 on day 30. Arguing drains Sanity, checking out restores it.
- Power-ups (max 3): earn one per day (pick 1 of 2), plus a chance on spicy replies. 4 starters; 6 more unlock at best days 5/10/15/20/25/30.
- Daily Run (same seed for everyone that day) and Free Play, each with its own best. Save/resume, share results, 26 achievements.

## Edit content
- `data/threads_*.js`: conversation threads. Each has an opening post, 2-4 replies (`label` = what you type, `act` = an action), optional `react` lines, `next` follow-up beats, `set` flags and `requires` callbacks.
- `data/content_core.js`: recurring events, background chatter, power-ups, achievements, grudge/favor lines.
- `data/tuning.js`: every balance number.
- `data/characters.js`, `js/avatars.js` (portraits), `data/end_states.js`.

Then check it (needs Node):
```
node tools/acceptance.js     # 40 rule checks
node tools/sim.js 1000       # content audit + simulated players (target: casual ~30% wins)
```
After changing game files, bump `VERSION` in `sw.js` so installed copies update.

## itch.io
Upload `CSG_itch.zip` as an HTML game played in the browser, viewport 480 x 860, mobile friendly, portrait.
