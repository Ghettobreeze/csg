// CSG core content: recurring signature events, chatter, systems text.
// Choice fields: label (what you type) | act (an action, no bubble) | hint | spicy | sexual |
// effects {drama, clout, sanity, members, leak, saint_heat, kimmy, mike_esc, boss, defend,
// reveal_secret, princess_meaner, marcus_call, fury, watch_live} | react [{speaker,text}] |
// set (flag) | count (stat) | ally / dunk (character id for grudges).
globalThis.CSG_DATA = globalThis.CSG_DATA || {};
CSG_DATA.threads = CSG_DATA.threads || [];
CSG_DATA.core = {
  "powerups": {
    "peace_gif":      {"icon": "🕊️", "name": "Peace Gif",        "desc": "Drama -25. Stops combos and wars.", "fx": {"drama": -25}, "say": "[posts the peace gif]"},
    "meme_drop":      {"icon": "😂", "name": "Meme Drop",        "desc": "Sanity +20, Drama -10.", "fx": {"sanity": 20, "drama": -10}, "say": "[drops a meme so good everybody forgets the argument]"},
    "invite_cousins": {"icon": "📣", "name": "Invite the Cousins","desc": "Members +20.", "fx": {"members": 20}, "say": "[adds 6 cousins to the group]"},
    "delete_pray":    {"icon": "🙏", "name": "Delete & Pray",    "desc": "Leak -30.", "say": "[deletes everything spicy and prays]"},
    "stir_pot":       {"icon": "🔥", "name": "Stir the Pot",     "desc": "Drama +15, Clout +15. Saves a dying group.", "fx": {"drama": 15, "clout": 15}, "say": "So... who's gonna tell Marcus what Brittany said about him?"},
    "humble_post":    {"icon": "🫥", "name": "Humble Post",      "desc": "Clout -20. For when you're too popular.", "fx": {"clout": -20}, "say": "Honestly y'all are funnier than me. I'm just here to learn. 🙏"},
    "call_auntie":    {"icon": "🌺", "name": "Call Auntie Pat",  "desc": "Calms the Saint, Sanity +10.", "fx": {"sanity": 10}, "say": "@Auntie Pat please come get your nephew"},
    "summon_bigbro":  {"icon": "🎤", "name": "Summon Big Bro",   "desc": "Erases a strike, ends a war.", "say": "@Big Bro we need you"},
    "kimmy_favor":    {"icon": "🏡", "name": "Kimmy's Favor",    "desc": "Unmutes you, Kimmy loves you more.", "say": "Kimmy, I'll refer my cousin to you if you unmute me 🙏"},
    "go_dark":        {"icon": "👻", "name": "Go Dark",          "desc": "Skip this one. Meters drift toward the middle. Clout drops.", "say": "[puts the phone face down]"}
  },

  "achievements": [
    {"id": "first_run", "icon": "👋", "name": "Joined the Chat", "desc": "Finish your first run."},
    {"id": "day10", "icon": "🔟", "name": "Double Digits", "desc": "Reach Day 10."},
    {"id": "day20", "icon": "🧱", "name": "Built Different", "desc": "Reach Day 20."},
    {"id": "win", "icon": "🏆", "name": "Survived the Group Chat", "desc": "Survive all 30 days."},
    {"id": "win_daily", "icon": "📅", "name": "Daily Champion", "desc": "Win a Daily Run."},
    {"id": "clean_win", "icon": "😇", "name": "Never Muted", "desc": "Win without Kimmy muting you once."},
    {"id": "muted3", "icon": "🔇", "name": "Frequent Flyer", "desc": "Get muted by Kimmy 3 times in one run."},
    {"id": "coach_right", "icon": "🏈", "name": "Coach Was Right", "desc": "Back Coach's point 3 times in one run."},
    {"id": "mob", "icon": "🐑", "name": "Part of the Mob", "desc": "Pile on Coach 3 times in one run."},
    {"id": "shirt", "icon": "👕", "name": "He Wore a Shirt", "desc": "Be there the day Big Mike wore a shirt."},
    {"id": "live", "icon": "🔴", "name": "Live Viewer", "desc": "Watch Big Mike's livestream."},
    {"id": "peace", "icon": "🕊️", "name": "Peacekeeper", "desc": "Defuse 3 McMan + Pookie combos in one run."},
    {"id": "facts", "icon": "📚", "name": "Fact Checker", "desc": "Shut down 3 junk stats with real numbers in one run."},
    {"id": "auntie", "icon": "🌺", "name": "Auntie's Favorite", "desc": "Call Auntie Pat 3 times in one run."},
    {"id": "pu10", "icon": "⚡", "name": "Power User", "desc": "Use 10 power-ups in one run."},
    {"id": "no_pu", "icon": "🧘", "name": "Raw Dog the Chat", "desc": "Reach Day 15 without using a power-up."},
    {"id": "spicy20", "icon": "🌶️", "name": "Menace", "desc": "Send 20 spicy replies in one run."},
    {"id": "calm_saint", "icon": "⛪", "name": "Saint Whisperer", "desc": "Reach Day 20 without the Saint going off on you."},
    {"id": "exposed", "icon": "👑", "name": "Receipts", "desc": "Post Pander Princess's DMs."},
    {"id": "grudges", "icon": "😒", "name": "Enemies List", "desc": "Get hit by 3 grudges in one run."},
    {"id": "slow", "icon": "⏱️", "name": "Thumbs Too Slow", "desc": "Let the timer answer for you 5 times in one run."},
    {"id": "leaked", "icon": "📸", "name": "Meme Status", "desc": "Get leaked by Shady."},
    {"id": "deleted", "icon": "🗑️", "name": "Group Killer", "desc": "Get the group deleted by Big Bro."},
    {"id": "checked_out", "icon": "😶", "name": "Unbothered", "desc": "Hit 100 Sanity and stop caring."},
    {"id": "rage_quit", "icon": "📵", "name": "Rage Quit", "desc": "Hit 0 Sanity."},
    {"id": "normies", "icon": "🧟", "name": "Too Popular", "desc": "Let the normies invade."}
  ],

  "signatures": {
    "kimmy_listing": {"speaker": "kimmy", "badge": "🏡 JUST LISTED", "topic": "kimmy",
      "variants": ["JUST LISTED 🏡 4bd/3ba, quiet street, NO drama allowed in the HOA bylaws. Unlike some places. DM me!", "Open house Sunday! Snacks provided. No politics, no Catfish. 🏡 — Kimmy K. | Your Home, Your Future™", "Price drop!! 🏡 Motivated seller. Motivated like I am to get this group back to normal."],
      "choices": [
        {"label": "What's the HOA like?", "hint": "she writes a novel", "effects": {"sanity": -10, "kimmy": 3}, "react": [{"speaker": "kimmy", "text": "SO glad you asked 🏡 [11 paragraphs about gutter rules]"}]},
        {"label": "Is this a pyramid scheme?", "hint": "she's offended", "effects": {"clout": 10, "drama": 5, "kimmy": -2}, "react": [{"speaker": "kimmy", "text": "It's a HOUSE. With a ROOF. 🙄"}]},
        {"label": "like it", "act": true, "effects": {"kimmy": 1, "clout": -5}}
      ]},
    "princess_take": {"speaker": "princess", "badge": "👑 PANDER POST", "topic": "gender", "tags": ["saint"],
      "variants": ["Black men need to do better. Not me though. I'm different. Ladies, you know I'm right. 👑", "As a Black man, I'll say what the others won't: we're the problem. Every woman who liked this, I see you 👑", "Sisters, y'all deserve better than these brothas. I'm just saying what needs to be said. 👑", "A REAL man admits his brothers are trash. I'm the real man. 👑"],
      "choices": [
        {"label": "PREACH 👑 somebody had to say it", "spicy": true, "hint": "the haters love it, the men don't", "effects": {"drama": 18, "clout": 12}, "ally": "princess", "set": "sided_princess"},
        {"label": "post his DMs to the group", "act": true, "hint": "he'll come back meaner", "effects": {"drama": 10, "clout": 6, "princess_meaner": 1}, "dunk": "princess"},
        {"label": "Bro. You're a Black man. You're in this too.", "hint": "the men cheer", "effects": {"drama": 12, "clout": 8, "sanity": -5}, "dunk": "princess"},
        {"label": "leave it on read", "act": true, "effects": {"drama": -6, "clout": -4}}
      ]},
    "mike_beef": {"speaker": "bigmike", "badge": "🎥 RESPONDING TO PANDER PRINCESS", "media": "video", "topic": "gender",
      "variants": ["My $0.02, 🎥 7:22 — no shirt, calm, parked at a Love's: 'Princess. Brother. Let's talk about loyalty.'", "My $0.02, 🎥 6:51 — no shirt, sunflower seeds: 'I read your paragraph, Princess. I'm gonna respond the way I respond.'"],
      "choices": [
        {"label": "watch all 7 minutes", "act": true, "hint": "Sanity cost, maybe a secret", "effects": {"sanity": -14, "reveal_secret": 1}},
        {"label": "Mike's right. Princess, sit down.", "hint": "the men cheer, the haters come for you", "effects": {"clout": 10, "drama": 10, "sanity": -4}, "ally": "bigmike", "dunk": "princess", "react": [{"speaker": "pookie", "text": "nobody ask u 😤"}]},
        {"label": "Princess has a point tbh", "hint": "the haters love you, the guys don't", "effects": {"clout": -6, "drama": 10}, "ally": "princess", "dunk": "bigmike", "react": [{"speaker": "coach", "text": "Respectfully, he does not."}]},
        {"label": "Y'all are the same person", "spicy": true, "effects": {"drama": 18, "clout": 12}}
      ]},
    "saint_sermon": {"speaker": "section8", "badge": "⛪ SUNDAY SERMON", "topic": "gender", "tags": ["saint"],
      "variants": ["Modern women want a man with a house, a car AND manners. Meanwhile I have manners. Two out of three is a lot.", "Brothers, stop chasing. Let them come to you. That's how I've been single since 2017. Strategy.", "A woman on government assistance asked me for a date once. I said no. I'm also on government assistance. That's called standards."],
      "choices": [
        {"label": "Amen, brother", "spicy": true, "hint": "backs the Saint", "effects": {"clout": 8, "sanity": -12, "kimmy": -1}, "ally": "section8"},
        {"label": "Saint, have you tried going outside?", "effects": {"drama": 12, "clout": 8}, "dunk": "section8", "react": [{"speaker": "section8", "text": "Outside is where the problems are."}]},
        {"label": "leave it on read", "act": true, "effects": {"drama": -6, "clout": -4}}
      ]},
    "stats_war": {"speaker": "section8", "badge": "📊 STATS WAR", "topic": "gender", "tags": ["saint"],
      "variants": ["[The Saint and McMan Hater are posting charts at each other. Neither chart has a source. One is upside down.]", "[McMan Hater posted a pie chart. The Saint replied with a bigger pie chart. Pookie Patrol replied 'FACTS' to both.]"],
      "choices": [
        {"label": "Fan it 📊🔥", "spicy": true, "effects": {"drama": 22, "clout": 12}},
        {"label": "fact-check both charts", "act": true, "hint": "both of them turn on you", "count": "stats_rebutted", "effects": {"sanity": 6, "clout": -8, "saint_heat": 1}, "dunk": "mcman", "react": [{"speaker": "mcman", "text": "nobody asked for your 'sources'"}, {"speaker": "section8", "text": "Facts are a feminist invention."}]},
        {"label": "Both of these are from TikTok", "hint": "the group laughs", "effects": {"clout": 12, "drama": 5, "sanity": 4}, "react": [{"speaker": "catfish", "text": "LMAOOO 💀"}]}
      ]},
    "hater_stat": {"speaker": "mcman", "badge": "📊 'STATS'", "topic": "gender", "stats": true,
      "variants": ["90% of Black men don't raise their kids. Look it up. 📊 My man raises his. That's why he's my man.", "Fact: most Black men leave. That's not opinion that's DATA. 📊 (I saw it on a slideshow)", "Studies show Black men don't show up for their kids. I'm not saying ALL. I'm saying 90%."],
      "choices": [
        {"label": "CDC says more Black dads live with their kids than apart: 2.5 million vs 1.7 million.", "hint": "real numbers, the men back you", "count": "stats_rebutted", "effects": {"clout": 10, "drama": 12, "sanity": -6}, "dunk": "mcman", "ally": "coach",
         "react": [{"speaker": "bigmike", "text": "My $0.02, I drove 600 miles last weekend for my daughter's recital. Look THAT up."}, {"speaker": "coach", "text": "And the same CDC report found Black dads were the MOST involved on most daily measures. Read the whole thing."}, {"speaker": "mcman", "text": "...anyway"}]},
        {"label": "'Unmarried' isn't 'absent.' That's not what that number means.", "hint": "the men back you", "count": "stats_rebutted", "effects": {"clout": 8, "drama": 10, "sanity": -4}, "dunk": "mcman",
         "react": [{"speaker": "drunktdave", "text": "i'm not even drunk and i know that's wrong"}, {"speaker": "pookie", "text": "its SINCE tho"}]},
        {"label": "Facts 💯", "spicy": true, "hint": "the men turn on you", "effects": {"drama": 20, "clout": 8}, "ally": "mcman",
         "react": [{"speaker": "princess", "text": "SAID WHAT I'VE BEEN SAYING 👑"}, {"speaker": "bigmike", "text": "My $0.02, you're blocked from my next video."}]},
        {"label": "leave it on read", "act": true, "effects": {"drama": 6}, "react": [{"speaker": "marcus", "text": "This is why I'm leaving. (Not leaving.)"}]}
      ]},
    "violence_shutdown": {"speaker": "mcman", "badge": "🚫 NOT IN HERE", "topic": "gender",
      "variants": ["Let's talk about how dangerous these m—"],
      "choices": [
        {"label": "Nah. Not that. Not in here.", "hint": "the group backs you", "effects": {"clout": 12, "drama": -8, "kimmy": 3}, "dunk": "mcman",
         "react": [{"speaker": "auntiepat", "text": "THANK you baby. 🌺"}, {"speaker": "bigmike", "text": "My $0.02, some things ain't for scoring points."}, {"speaker": "kimmy", "text": "Message deleted. Take that somewhere it belongs. 🏡"}]},
        {"label": "say nothing and let the group handle it", "act": true, "effects": {"drama": 6},
         "react": [{"speaker": "auntiepat", "text": "NOPE. Not that. Not in here. 🌺"}, {"speaker": "kimmy", "text": "Deleted. 🏡"}]},
        {"label": "Let her finish", "hint": "the whole group turns on you", "effects": {"drama": 18, "clout": -15, "members": -6, "kimmy": -4},
         "react": [{"speaker": "coach", "text": "Absolutely not, and you know better."}, {"speaker": "kimmy", "text": "Deleted. And I'm watching you now. 🏡"}]}
      ]},
    "coach_logic": {"speaker": "coach", "badge": "🧠 COACH MAKES A POINT", "topic": "politics",
      "variants": ["I'll keep it calm. Debra, you said the opposite in March. Larry, 3 out of 4 is 75. Dave, it didn't come. I love y'all.", "All I'm asking for is a source. Not a feeling, not a meme. A source. Then I'll listen. Promise.", "We can disagree and still go to the same cookout. That's all I've ever wanted from this group."],
      "choices": [
        {"label": "Coach is right and y'all know it. Breathe.", "hint": "honest, but the mob turns on you", "count": "coach_right", "effects": {"sanity": 10, "clout": -14, "kimmy": 2}, "ally": "coach", "set": "backed_coach",
         "react": [{"speaker": "debra", "text": "Wow. Didn't know you were like that. 💙"}, {"speaker": "kimmy", "text": "Finally, an adult. 🏡"}]},
        {"label": "Coach wrote all that and still lost 😂", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 14, "drama": 10, "kimmy": -2}, "dunk": "coach", "set": "mobbed_coach",
         "react": [{"speaker": "larry", "text": "A+ reply. 📐"}, {"speaker": "coach", "text": "That's fair. Still love you."}]},
        {"label": "Can we not do this today", "hint": "nobody listens", "effects": {"sanity": -5, "drama": -4}}
      ]},
    "auntie_misinfo": {"speaker": "auntiepat", "badge": "🌺 FORWARDED MANY TIMES", "topic": "general",
      "variants": ["URGENT!! The app will start charging $9.99 tomorrow unless you copy and paste this message 🌺🌺", "Did you know microwaving a banana makes it a vegetable again? Doctors HATE this 🍌", "If you leave a group chat the phone deletes your photos!! That's why I never leave 🌺"],
      "choices": [
        {"label": "Auntie Pat... no 🥲", "effects": {"sanity": -8, "drama": 5, "clout": 5}},
        {"label": "Thank you Auntie Pat 🌺", "effects": {"sanity": 5, "clout": -5, "kimmy": 1}, "ally": "auntiepat"},
        {"label": "share it ironically", "act": true, "spicy": true, "effects": {"drama": 10, "clout": 10}}
      ]},
    "bigmike_video": {"speaker": "bigmike", "badge": "🎥 VIDEO MESSAGE", "media": "video", "topic": "mike",
      "variants": ["My $0.02, 🎥 7:02 — cab of the Peterbilt, no shirt, 'a word on discipline'", "My $0.02, 🎥 6:48 — weigh station, no shirt, 'why I don't do drama'", "My $0.02, 🎥 7:31 — no shirt, gas station burrito, 'loyalty part 2'", "My $0.02, 🎥 7:14 — 'Like I was saying.' No shirt."],
      "choices": [
        {"label": "watch all 7 minutes", "act": true, "hint": "Sanity cost, maybe a secret", "effects": {"sanity": -14, "reveal_secret": 1}},
        {"label": "leave it on read", "act": true, "hint": "he escalates", "effects": {"mike_esc": 1}},
        {"label": "Mike, that was a $40 opinion", "effects": {"clout": 10, "drama": 4, "mike_esc": 1}, "react": [{"speaker": "bigmike", "text": "My $0.02, inflation."}]},
        {"label": "Mike PLEASE put on a shirt", "hint": "never works", "effects": {"sanity": -2, "mike_esc": 1}}
      ]},
    "bigmike_live": {"speaker": "bigmike", "badge": "🔴 LIVESTREAM", "media": "video", "topic": "mike",
      "variants": ["My $0.02, 🔴 LIVE from the cab. 3 viewers. One is Princess.", "My $0.02, 🔴 LIVE — answering 'relationship questions' from a rest stop. Still no shirt."],
      "choices": [
        {"label": "watch the stream", "act": true, "hint": "Sanity cost, maybe a secret", "effects": {"sanity": -18, "reveal_secret": 1, "watch_live": 1}},
        {"label": "🔥🔥🔥 LIVE KING", "spicy": true, "effects": {"clout": 10, "leak": 10, "drama": 10}, "ally": "bigmike"},
        {"label": "mute it", "act": true, "effects": {"drama": 8}}
      ]},
    "tiffany_dogpile": {"speaker": "tiffany", "badge": "🐶 DOGPILE", "topic": "gender",
      "variants": ["[47 replies under Tiffany's post. All of them are 💀.]", "I just said the Saint 'has some valid points' and now my phone is hot 😭", "why is everyone quote-posting me 😭 I said ONE thing"],
      "choices": [
        {"label": "Y'all leave Tiffany alone", "hint": "defending Tiffany", "effects": {"defend": 1, "clout": -10, "kimmy": 1}, "ally": "tiffany", "set": "defended_tiffany"},
        {"label": "say nothing", "act": true, "effects": {"sanity": -12, "kimmy": -1}},
        {"label": "Tiffany you walked into this one 💀", "spicy": true, "effects": {"clout": 10, "drama": 14, "kimmy": -2}}
      ]},
    "marcus_leaving": {"speaker": "marcus", "badge": "🚪 LEAVING (AGAIN)", "topic": "general",
      "variants": ["It's Sunday. You know what that means. I'm leaving this group. Effective immediately.", "This is goodbye. For real. I've muted the chat. (I'm still reading it.)", "Not being dramatic but this is my final message. Love to all except three of you."],
      "choices": [
        {"label": "Bye Marcus 👋 for real this time?", "spicy": true, "hint": "calls his bluff", "effects": {"clout": 8, "marcus_call": 1}},
        {"label": "Marcus, the group needs you, man", "effects": {"clout": -5, "sanity": 4}, "ally": "marcus"},
        {"label": "leave it on read", "act": true, "hint": "he'll post again next week", "effects": {}}
      ]},
    "bossbabe_pitch": {"speaker": "bossbabe", "badge": "💼 DM PITCH", "topic": "money",
      "variants": ["Kimmy hun 💖 just checking in!! The team is SO excited. Imagine your listings, but with leggings.", "Kimmy has SO much potential!! A realtor with a downline?? Somebody tell her 💅", "Just sent Kimmy a starter kit link. It's only $299, which is basically free."],
      "choices": [
        {"label": "Kimmy don't do it. It's a pyramid with a ring light.", "hint": "protects Kimmy", "effects": {"boss": -4, "clout": -5, "kimmy": 2}},
        {"label": "No, hun", "effects": {"clout": 5, "drama": 5, "boss": -1}},
        {"label": "let it happen", "act": true, "effects": {"boss": 2}}
      ]},
    "catfish_dm": {"speaker": "catfish", "badge": "🍆 REQUEST", "topic": "catfish",
      "variants": ["random question for the men in here 👀 who's sending the 🍆 pic first. for science", "Coach you've been so calm lately. calm men send 🍆 pics. it's known", "it's quiet. somebody send a 🍆 pic to liven it up. i'll wait 😇"],
      "choices": [
        {"label": "Catfish, you're wild 😂", "hint": "Kimmy is watching", "effects": {"sanity": 5, "drama": -5, "kimmy": -1}},
        {"label": "report it to Kimmy", "act": true, "hint": "lose the fun, lower the leak", "effects": {"members": -8, "leak": -20, "kimmy": 2}, "dunk": "catfish"},
        {"label": "Marcus, she's talking to you", "spicy": true, "sexual": true, "effects": {"drama": 22, "leak": 15}}
      ]},
    "brittany_bomb": {"speaker": "brittany", "badge": "💣 DETONATION", "topic": "drama",
      "variants": ["Since {target} wants to act brand new: I have screenshots from 2019. Posting them now. 💣", "{target}, you know what you did at the cookout. Everybody's about to know too. 💣"],
      "choices": [
        {"label": "Leave {target} alone, Brittany", "hint": "defending {target}", "effects": {"defend": 1, "clout": -10, "drama": -5}, "dunk": "brittany"},
        {"label": "grab popcorn 🍿", "act": true, "effects": {"drama": 22}},
        {"label": "Post the receipts 👀", "spicy": true, "effects": {"drama": 28, "clout": 14}, "ally": "brittany"}
      ]}
  },

  "ambient": [
    {"speaker": "auntiepat", "text": "GOOD MORNING FAMILY 🌺🌺🌺 share this if you love Jesus", "time": "morning"},
    {"speaker": "auntiepat", "text": "Blessed Tuesday!! (It is Thursday) 🌺", "time": "morning"},
    {"speaker": "coach", "text": "Good morning, everybody. Even you, Larry. 🏈", "time": "morning"},
    {"speaker": "kimmy", "text": "Morning! Anyone looking to downsize? Asking for a client. 🏡", "time": "morning"},
    {"speaker": "drunktdave", "text": "who's awake. i have news. it's not good news", "time": "night"},
    {"speaker": "drunktdave", "text": "do u ever think about how we're all just in a group", "time": "night"},
    {"speaker": "drunktdave", "text": "wrong dave 🍺", "time": "night"},
    {"speaker": "lurker", "text": "👁️"},
    {"speaker": "glitch", "text": "[reaction image]"},
    {"speaker": "shady", "text": "📸"},
    {"speaker": "marcus", "text": "I'm leaving this group. For real this time."},
    {"speaker": "marcus", "text": "Writing my goodbye post. Drafting. Stand by."},
    {"speaker": "bigmike", "text": "My $0.02, just passed through Tulsa. Thinking about all of y'all. 🚛"},
    {"speaker": "bigmike", "text": "My $0.02, like I was saying."},
    {"speaker": "bossbabe", "text": "Who wants to be their OWN boss?? 💖 (DM me, I'll be your boss)", "topic": "money"},
    {"speaker": "brittany", "text": "anyway. some of y'all know exactly who you are.", "topic": "drama"},
    {"speaker": "brittany", "text": "{target} is typing and deleting. I see you. 👀", "topic": "drama"},
    {"speaker": "uncle", "text": "Ever notice the group always fights on Tuesdays? Think about it."},
    {"speaker": "bothsides", "text": "Both sides of this argument are wrong. I haven't read it."},
    {"speaker": "catfish", "text": "the vibes in here are so bad i'm about to start charging admission 😭", "effects": {"drama": -3, "sanity": 2}},
    {"speaker": "catfish", "text": "if y'all keep arguing i'm renaming the group 'Arguments, Sh*ts & Giggles'", "effects": {"drama": -3, "sanity": 2}},
    {"speaker": "catfish", "text": "group therapy in my DMs, $5 a head, Marcus gets a discount", "effects": {"drama": -3, "sanity": 2}},
    {"speaker": "tiffany", "text": "not me agreeing with both sides again 😭", "topic": "gender"},
    {"speaker": "princess", "text": "ladies, I'm not like these other brothas. I'm saying it publicly for a reason 👑", "topic": "gender"},
    {"speaker": "princess", "text": "some of these brothas aren't ready for this conversation and it shows 👑", "topic": "gender"},
    {"speaker": "mcman", "text": "my man made me breakfast. anyway, Black men need to do better.", "topic": "gender"},
    {"speaker": "mcman", "text": "leg day. don't talk to me. 🍑💪"},
    {"speaker": "mcman", "text": "[shares another chart with no source] numbers don't lie 📊", "topic": "gender", "stats": true},
    {"speaker": "pookie", "text": "pookie realy thout he did sumthin 💀", "topic": "gender"},
    {"speaker": "pookie", "text": "McMan stay rite. evry time.", "topic": "gender"},
    {"speaker": "pookie", "text": "not pookie tryna explain hisself agen 😭", "topic": "gender"},
    {"speaker": "section8", "text": "[posts a stat about modern women. Source: a guy on a podcast] 📊", "topic": "gender", "stats": true},
    {"speaker": "section8", "text": "I'm not bitter. I'm informed. There's a difference.", "topic": "gender"},
    {"speaker": "furious4", "text": "matched with a 5'10 man. he lied about being 5'11. blocked. 😤", "topic": "gender"},
    {"speaker": "furious4", "text": "as a 10, the audacity of these men is exhausting", "topic": "gender"},
    {"speaker": "bigmike", "text": "My $0.02, y'all argue more than my ex and her lawyer.", "topic": "gender"},
    {"speaker": "debra", "text": "Reminder that I'm always right and I don't need to explain why 💙", "topic": "politics"},
    {"speaker": "larry", "text": "Grading papers. Also grading this chat. Mostly F's. 📐", "topic": "politics"},
    {"speaker": "bluewave", "text": "🌊🌊🌊 just a feeling 🌊🌊🌊", "topic": "politics"},
    {"speaker": "bluewave", "text": "@Dave are you coming to the rally?", "topic": "politics"},
    {"speaker": "coach", "text": "Y'all, I'm bringing the grill to the cookout regardless. Love you.", "topic": "politics"},
    {"speaker": "kimmy", "text": "Reminder: this is a FAMILY group 🏡", "topic": "catfish"},
    {"speaker": "catfish", "text": "Kimmy deleted my last message so I'll just say it with my eyes 👀", "topic": "catfish"},
    {"speaker": "bigmike", "text": "My $0.02, I'm not putting on a shirt. Stop asking.", "topic": "mike"},
    {"speaker": "pookie", "text": "PUT A SHURT ON MIKE", "topic": "mike"},
    {"speaker": "kimmy", "text": "Saw a listing with a 'bonus room.' It's a closet. I'm still selling it. 🏡", "topic": "kimmy"},
    {"speaker": "auntiepat", "text": "Who is Brittany talking about?? Somebody text me 🌺", "topic": "drama"},
    {"speaker": "drunktdave", "text": "i'm sober and i STILL want to know what happened at the cookout", "topic": "drama"}
  ],

  "princess_reactions": {
    "haters": [{"speaker": "pookie", "text": "PRINCES SAID WAT HE SAID 👑👑 pookie could never"}, {"speaker": "mcman", "text": "the ONLY man in here who gets it. 👑"}, {"speaker": "furious4", "text": "Princess, you're a 10 for this."}],
    "men": [{"speaker": "bigmike", "text": "My $0.02, [🎥 0:41 — no shirt, shaking his head slowly]"}, {"speaker": "coach", "text": "Princess, respectfully, you're describing yourself."}, {"speaker": "drunktdave", "text": "princess who hurt u"}, {"speaker": "marcus", "text": "This is why I'm leaving. (Not leaving.)"}, {"speaker": "section8", "text": "Princess, you're the reason women think they can talk to us like that."}]
  },
  "shirt_beg": [
    {"speaker": "kimmy", "text": "Mike please 🥺 a shirt. any shirt. this is a FAMILY group"},
    {"speaker": "auntiepat", "text": "BABY PUT ON A SHIRT 🌺 your mother raised you better"},
    {"speaker": "mcman", "text": "this is why I left y'all alone. my man wears shirts."},
    {"speaker": "pookie", "text": "PUT A SHURT ON PLEESE"},
    {"speaker": "furious4", "text": "as a 10, I'm begging you. a shirt."},
    {"speaker": "catfish", "text": "nobody listen to them Mike 😩"},
    {"speaker": "coach", "text": "That was at least $14 worth, Mike."},
    {"speaker": "pookie", "text": "dat was NOT 2 sents"}
  ],
  "war_lines": {
    "dems": [
      {"speaker": "debra", "text": "COACH. Context. CONTEXT. 💙"},
      {"speaker": "debra", "text": "I'm not reading your source, Coach. I don't have to."},
      {"speaker": "larry", "text": "Coach's argument: F. Coach's spelling: C-. See me after class. 📐"},
      {"speaker": "larry", "text": "If Coach has 0 good points and gains 2, how many does he have? Still zero. Math."},
      {"speaker": "bluewave", "text": "THIS IS WHY THE WAVE DIDN'T COME, COACH 🌊😤"},
      {"speaker": "bluewave", "text": "Coach did this. All of this. Personally."}
    ],
    "coach": ["Respectfully, can I get a source? Just one.", "I hear you. I just think we can disagree and still be friends.", "Larry, I double-checked your math. It's 75.", "Debra, I'm not mad. You just said the opposite last week.", "Y'all, I'm bringing the grill to the cookout regardless. Love you."]
  },
  "fury_lines": ["EXCUSE ME?? WHAT AM I BRINGING?? I'M BRINGING ME. I'M A 10.", "I BRING PEACE. I BRING VIBES. I BRING A CAT. WHAT DO YOU BRING???", "THIS IS WHY THE DATING POOL IS A PUDDLE. MEN LIKE YOU. IN THE PUDDLE."],
  "bigbro_events": [
    "Somebody in here is the reason I don't post. I won't say who. It's everybody.",
    "Mike on the road, Coach in the thread / Kimmy got a listing, Debra seeing red / Princess on a speech, Saint on a stat / and I'm the admin, y'all — I'm tired of that. 🎤",
    "Pookie on the keys, spelling like it's art / McMan at the gym, Furious from the start / Marcus at the door but he never left / Big Bro on the mic, now I'm out of breath. 🎤",
    "I log in once a year and Larry is still grading. Respect."
  ],
  "strike_raps": [
    "Strike one, son, that's a warning shot / Big Bro watching, and I see a lot. 🎤",
    "Strike two, what you gon' do / one more slip and this group is through. 🎤",
    "Strike three, that's it, I warned y'all twice / delete button pressed. Wasn't nice. 🎤"
  ],
  "shady_glimpses": [
    "📸 Shady's other group: 'CSG IS AT IT AGAIN 😭' — 47 replies",
    "📸 Shady's other group: 'y'all seeing this??' — 112 replies",
    "📸 Shady's other group: 'who is this and why are they like this 💀' — quoting you: '{quote}'",
    "📸 Shady's other group pinned your reply: '{quote}' — 400 reactions"
  ],
  "delayed": {
    "shady": {"speaker": "shady", "text": "📸 Remember when you said '{quote}'? Shady saved it. It's making the rounds.", "effects": {"leak": 15, "clout": -6}},
    "brittany": {"speaker": "brittany", "text": "💣 Brittany remembered something.", "line": "Since we're being honest... somebody in here said '{quote}' and thought we'd forget. 👀", "effects": {"drama": 14, "sanity": -6}},
    "resurfaced": {"speaker": "auntiepat", "text": "🕰️ Your old reply resurfaced.", "line": "Baby, who taught you to talk like '{quote}'? 🌺 I'm praying for you.", "effects": {"clout": -12, "drama": 6}}
  },
  "grudge_lines": {
    "generic": ["Still thinking about what you said the other day. 🙂", "Oh, YOU have something to say? After last time?", "Not you acting like we're cool. 😐"],
    "princess": ["Funny how the people who post my DMs never post their own. 👑", "Ladies, notice who's always coming at me. Interesting. 👑"],
    "mcman": ["You again? My man said you seem insecure. He's never wrong.", "Somebody needs to check this one. (Pookie, check them.)"],
    "pookie": ["i REMEMBER wat u said. pookie behavior.", "dont think i forgot 😤 i nevr forget (except spelling)"],
    "section8": ["I have prepared a statement about you. It's 9 paragraphs. Posting now.", "You're the reason modern discourse is broken."],
    "coach": ["Still love you. Still remember. Both can be true."],
    "kimmy": ["I'm not mad. I just removed you from my holiday card list. 🏡"],
    "bigmike": ["My $0.02, 🎥 3:40 — 'some people talk a lot for somebody who never drove 600 miles.'"],
    "furious4": ["AS A 10, I DON'T FORGET DISRESPECT. 😤"],
    "brittany": ["I have screenshots of you too, btw. 💣"],
    "debra": ["Interesting how you only speak up when it's against us. 💙 Context."],
    "larry": ["Your reply from last week: F. Still grading it. 📐"],
    "catfish": ["you reported me so now you're getting NO jokes. only silence. 🐟"]
  },
  "favor_lines": {
    "generic": ["Hey, they're cool, y'all. Leave them alone. 🤝"],
    "coach": ["Everybody take a breath. This one's alright. They backed me when it counted."],
    "kimmy": ["This one's on my good list. Be nice to them. 🏡"],
    "bigmike": ["My $0.02, this one's solid. Leave 'em alone."],
    "auntiepat": ["Y'all be nice to my baby 🌺"],
    "tiffany": ["They stood up for me when nobody did 🥺 be nice"],
    "princess": ["This one gets it. 👑 Ladies, take notes."],
    "mcman": ["Fine. This one's alright. Don't tell my man I said that."],
    "catfish": ["ok this one's my favorite. y'all are on thin ice but they're good 🫶"]
  },
  "secrets": [
    "Big Mike's video revealed: Coach and Larry carpool to the cookout every year.",
    "Big Mike's video revealed: Pander Princess's last 'accountability' post got 3 likes. All three were his mom.",
    "Big Mike's video revealed: Marcus has written 41 goodbye posts. He saves them in his Notes app.",
    "Big Mike's video revealed: McMan Hater's boyfriend has a Facebook. It's private. He has 2 friends.",
    "Big Mike's video revealed: Shady is in 14 groups. This one is his favorite.",
    "Big Mike's video revealed: Pookie Patrol spells everything right in her work emails.",
    "Big Mike's video revealed: Kimmy sold the Saint his apartment. He haggled for 3 weeks.",
    "Big Mike's video revealed: Blue Wave Dave and Drunk Dave are cousins. Neither will admit it.",
    "Big Mike's video revealed: the Furious 4 has turned down 3 men named Kevin. Same Kevin."
  ],
  "lurker_line": "six years. same three arguments. same nine people. and it's always the one replying to everybody who starts it.",
  "flavor": [
    {"if": "kimmy_love", "text": "Day {day} complete. Kimmy sent you a listing. That's love, for her."},
    {"if": "kimmy_hate", "text": "Day {day} complete. Kimmy's typing your name with a period after it."},
    {"if": "drama_high", "text": "Day {day} complete. The chat is on fire. Somebody's cousin got involved."},
    {"if": "drama_low", "text": "Day {day} complete. It's quiet. Too quiet. Auntie Pat posted a flower to nobody."},
    {"if": "sanity_low", "text": "Day {day} complete. Your screen time report just called you by name."},
    {"if": "clout_high", "text": "Day {day} complete. Everyone is quoting you. Shady is taking notes."},
    {"if": "clout_low", "text": "Day {day} complete. Your last reply got one reaction. It was 👁️."},
    {"if": "members_low", "text": "Day {day} complete. The member list is getting short. Marcus is thrilled."},
    {"if": "leak_high", "text": "Day {day} complete. Shady's camera roll is 90% this group."},
    {"if": "strikes", "text": "Day {day} complete. Big Bro is typing. Big Bro is not typing. Big Bro is typing."},
    {"if": "always", "text": "Day {day} complete. Marcus still hasn't left."},
    {"if": "always", "text": "Day {day} complete. Big Mike is somewhere in Ohio, shirtless, at peace."},
    {"if": "always", "text": "Day {day} complete. Coach made a good point. Nobody noticed."},
    {"if": "always", "text": "Day {day} complete. Someone tagged the wrong Dave."}
  ]
};
