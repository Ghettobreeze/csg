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

## Pass 2: even causes of death (Nov 11)
Casual players died of Drama 64%, Clout 18%, Members 11% and Sanity 7%. The content leans on Drama: of 529 reply choices, 376 move Drama (133 by 12+), but only 167 touch Sanity, and 125 of those raise it. Sanity only drained slowly, so players always fixed it in time.

The goal is Drama, Clout and Sanity at about a third of deaths each, with Members as a smaller share. I picked the settings with a random search and grid search over 8 values (`casual` bot, both profiles).

| Setting | Before | After |
|---|---|---|
| `sanity_per_drama` (new) | – | 0.25: a reply that raises Drama also costs that much × 0.25 Sanity ("arguing drains you") |
| `clout_fade` | 2 | 2.5 (fractional fades now alternate 2/3) |
| `combo_drama` | 20 | 14 |
| `war_drama` | 3 | 2 |
| `members_unhealthy_loss` | 2 | 1 |
| `effect_scale_day30` | 1.5 | 1.4 |

### Results (2000 runs, seed 2026)
| Bot | Win, starters | Deaths D / C / S / M | Win, all unlocked | Deaths D / C / S / M |
|---|---|---|---|---|
| no_powerups | 2.5% | 17 / 17 / 52 / 14 | 2.9% | 18 / 17 / 51 / 14 |
| **casual** | **29.2%** | **30 / 29 / 27 / 14** | **33.5%** | **30 / 25 / 34 / 11** |
| sloppy | 21.5% | 50 / 20 / 21 / 9 | 23.1% | 48 / 19 / 27 / 6 |
| eager | 31.3% | 33 / 27 / 39 / 1 | 27.4% | 32 / 20 / 43 / 5 |
| strategic | 87.2% | 23 / 39 / 13 / 25 | 90.8% | 24 / 35 / 21 / 20 |

Side effects: meters spend more time in the red (casual 3.6% → 5.9%), and ignoring power-ups is now nearly hopeless (2.5% wins). Power-up supply is unchanged (~9 per run).
