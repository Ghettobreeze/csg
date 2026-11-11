# CSG balance report

Run it yourself: `node tools/balance.js 2000` (add `--all-unlocked` for a veteran's profile, `--set key=value` to try a tuning change without editing files).

## Player models
| Bot | Replies | Power-ups |
|---|---|---|
| random | taps anything | never |
| no_powerups | best reply 70% of the time, 2nd best otherwise | never |
| **casual** (the 30% target) | same as no_powerups | the right one, once a meter hits the red |
| sloppy | same | like casual, but the wrong one 30% of the time |
| eager | same | fires them as soon as a meter drifts past 35/65 |
| strategic | best reply every time | the right one at the right time |

## What was wrong (Nov 11)
- **Too many power-ups.** 2 at the start plus a pick **every night** meant 18–28 per run, but players only used 2–7. Another 12–23 were thrown away because the hand (max 3) was full. You could never run out, so using one cost nothing.
- **Spamming was the best strategy.** The eager bot won 38.8% vs casual 29.7%.
- **Unlocking more power-ups made the game harder.** The nightly pick came from a bigger pool, so the one you needed showed up less often. Stir the Pot (+25 Drama, scaling to +37) was the only Clout fix and killed people through high Drama. Perfect play fell from 78% to 54%.

## Changes
| Setting | Before | After |
|---|---|---|
| Power-up pick | every night | every 3rd night (`powerup_offer_every: 3`) |
| Pick choices | 2 random | 1 targets your worst meter (skipping anything that would push another meter into the red), 1 random |
| Stir the Pot | Drama +25, Clout +10 | Drama +15, Clout +15 |
| `drama_cooldown` | 7 | 6 |
| `effect_scale_day30` | 1.55 | 1.5 |

Power-up effects now live in `data/content_core.js` (`fx`) instead of being hard-coded.

## Results (2000 runs per bot)
| Bot | Win, starters | Win, all unlocked | Earned/run | Used/run | Lost to full hand |
|---|---|---|---|---|---|
| random | 0% | 0% | 3.2 | 0 | 0.8 |
| no_powerups | 8.2% | 8.3% | 7.5 | 0 | 5.1 |
| **casual** | **31.6%** | **30.4%** | 8.9 | 2.4–3.5 | 3.7–4.6 |
| sloppy | 24.4% | 19.9% | 8.4 | 4.4 | 2.8 |
| eager | 36.4% | 26.7% | 9.6 | 6.4–7.8 | 0.6–2.0 |
| strategic | 80.4% | 81.7% | 10.5 | 2.5–4.6 | 4.1–5.8 |

Power-ups still decide the game: casual players win about 4x as often as players who ignore them. Supply dropped from ~22 to ~9 per run, so spammers now run dry; with everything unlocked, the eager bot does worse than casual. Meters move ~5.5 points per moment, about the same as before.
