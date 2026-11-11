// Threads: longer conversations and callbacks. Flags set here and in other files
// unlock "requires" threads later in the run, so the chat remembers what you did.
globalThis.CSG_DATA = globalThis.CSG_DATA || {};
CSG_DATA.threads = (CSG_DATA.threads || []).concat([
  {"id": "x_cookout_plan", "speaker": "auntiepat", "topic": "general", "min_day": 3,
   "text": "Cookout planning thread 🌺 Who's bringing what? Please no politics, no charts, and Mike please wear a shirt.",
   "choices": [
     {"label": "I'll bring the ice and the peace", "effects": {"drama": -8, "kimmy": 1}, "set": "cookout_ice", "next": "b"},
     {"label": "I'm bringing my opinions", "spicy": true, "effects": {"drama": 14, "clout": 10}, "react": [{"speaker": "auntiepat", "text": "Leave those in the car, baby 🌺"}]},
     {"label": "Who's NOT invited is the real question", "effects": {"drama": 10, "clout": 8}, "react": [{"speaker": "brittany", "text": "I have a list. 💣"}]}
   ],
   "beats": {"b": {"speaker": "coach", "text": "Grill's covered. Debra's on potato salad. Larry's bringing 'a dish' which means store-bought cookies.",
     "lead": [{"speaker": "bigmike", "text": "My $0.02, I'll bring the truck. For seating."}],
     "choices": [
       {"label": "Larry, don't bring the cookies with the grades on them", "effects": {"clout": 10, "sanity": 4}, "react": [{"speaker": "larry", "text": "The cookies are an A-. Stand by it. 📐"}]},
       {"label": "Mike's truck as seating is genius", "effects": {"sanity": 6, "drama": -4}, "ally": "bigmike"},
       {"label": "react 🍔", "act": true, "effects": {"drama": -2}}
     ]}}},

  {"id": "x_cookout_after", "speaker": "catfish", "topic": "drama", "min_day": 10, "requires": ["cookout_ice"],
   "text": "cookout recap: Coach grilled, Debra ate 3 ribs and said 'they're fine,' Mike wore a tank top (progress). {name} brought the ice like a hero 🧊",
   "choices": [
     {"label": "Debra said 'fine' with her mouth full, I saw it", "effects": {"clout": 10, "drama": 8}, "react": [{"speaker": "debra", "text": "They were ADEQUATE. 💙"}, {"speaker": "coach", "text": "I'll take adequate."}]},
     {"label": "Best cookout in years honestly", "effects": {"sanity": 10, "drama": -8, "members": 4}},
     {"label": "Mike in a tank top is a milestone", "effects": {"clout": 8, "sanity": 4}, "react": [{"speaker": "bigmike", "text": "My $0.02, it was 98 degrees. Don't get used to it."}]}
   ]},

  {"id": "x_princess_dms", "speaker": "princess", "topic": "gender", "min_day": 11, "requires": ["sided_princess"],
   "text": "Since some of y'all like to post DMs: here's MY DMs. Women thanking me. 👑 [3 screenshots, two from his mom]",
   "choices": [
     {"label": "Princess, the second one is your mom", "spicy": true, "effects": {"drama": 18, "clout": 14}, "dunk": "princess", "react": [{"speaker": "princess", "text": "My mother is a WOMAN. She counts. 👑"}]},
     {"label": "Leave the man and his mama alone", "effects": {"drama": -6, "clout": -4}, "ally": "princess"},
     {"label": "react 👑", "act": true, "effects": {"clout": 2}}
   ]},

  {"id": "x_mcman_bf", "speaker": "mcman", "topic": "gender", "tags": ["combo"], "min_day": 9,
   "text": "My man just surprised me with flowers 💐 See ladies? When you upgrade, you get FLOWERS. Black men could never.",
   "lead": [{"speaker": "pookie", "text": "FLOWERS?? he a KEEPER 😍"}],
   "choices": [
     {"label": "Auntie Pat gets flowers from Coach every Mother's Day", "effects": {"clout": 10, "drama": 10}, "react": [{"speaker": "auntiepat", "text": "He's a sweet boy 🌺"}, {"speaker": "coach", "text": "Every year."}], "next": "b"},
     {"label": "Congrats on the flowers, for real", "effects": {"drama": -6, "kimmy": 1}, "ally": "mcman"},
     {"label": "Grocery store flowers still have the sticker on 👀", "spicy": true, "effects": {"drama": 18, "clout": 12}, "dunk": "mcman", "react": [{"speaker": "mcman", "text": "THE STICKER IS PART OF THE AESTHETIC."}]}
   ],
   "beats": {"b": {"speaker": "mcman", "text": "Coach is an exception. One exception. The data still stands.",
     "choices": [
       {"label": "What data", "count": "stats_rebutted", "effects": {"clout": 10, "drama": 8}, "react": [{"speaker": "mcman", "text": "The data in my HEART."}]},
       {"label": "Fair, Coach is special", "effects": {"drama": -6}, "ally": "coach"},
       {"label": "react 💐", "act": true, "effects": {"clout": 2}}
     ]}}},

  {"id": "x_pookie_spell", "speaker": "pookie", "topic": "gender", "min_day": 14,
   "text": "pookie corected my speling in the group AGAIN. i spel how i want. its called FREEDUM",
   "choices": [
     {"label": "Freedum is my favorite word now", "effects": {"clout": 10, "sanity": 5}, "ally": "pookie"},
     {"label": "You spelled 'pookie' perfectly though. Every time.", "effects": {"clout": 12, "drama": 8}, "react": [{"speaker": "pookie", "text": "sum words are SACRED"}]},
     {"label": "Who corrected you, I'll handle it", "effects": {"drama": 10}, "react": [{"speaker": "larry", "text": "It was me. In red pen. 📐"}]}
   ]},

  {"id": "x_saint_date", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 16,
   "text": "Update: I went on a date. She asked what I do for fun. I said 'research.' She left before the appetizer. Modern women.",
   "choices": [
     {"label": "Saint, research isn't fun, it's homework", "effects": {"clout": 10, "drama": 8}, "dunk": "section8"},
     {"label": "Proud of you for going out at least", "effects": {"saint_heat": -2, "sanity": 4}, "ally": "section8", "react": [{"speaker": "section8", "text": "...Thank you. It was a growth experience."}]},
     {"label": "Did you show her a chart", "spicy": true, "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "section8", "text": "ONE chart."}]}
   ]},

  {"id": "x_f4_kevin_date", "speaker": "furious4", "topic": "gender", "min_day": 21,
   "text": "Fine. I went out with Kevin. He held the door, paid, and asked about my cat. I hate that I liked it. 😤",
   "choices": [
     {"label": "KEVIN WON 🏆", "effects": {"sanity": 8, "drama": -4}, "react": [{"speaker": "catfish", "text": "KEVIN KEVIN KEVIN 📣📣"}, {"speaker": "furious4", "text": "Don't. I'm still a 10."}]},
     {"label": "Is Kevin 6'4 now?", "effects": {"clout": 8, "drama": 6}, "react": [{"speaker": "furious4", "text": "He's 5'11. I'm... reconsidering the list."}]},
     {"label": "Give it a week, you'll find something wrong", "spicy": true, "effects": {"drama": 14, "clout": 10}, "dunk": "furious4"}
   ]},

  {"id": "x_tiffany_glowup", "speaker": "tiffany", "topic": "gender", "min_day": 20,
   "text": "I've decided I'm not co-signing ANYBODY anymore. Not the Saint, not Princess. I have my own opinions now 💅",
   "choices": [
     {"label": "Tiffany 2.0 🔥", "effects": {"sanity": 6, "clout": 6, "kimmy": 1}, "ally": "tiffany", "react": [{"speaker": "kimmy", "text": "Proud of you, Tiffany. 🏡"}]},
     {"label": "What's your first opinion", "effects": {"drama": 8}, "react": [{"speaker": "tiffany", "text": "I think... Coach makes good ribs. 😭 that's my own opinion"}]},
     {"label": "Give it till Friday", "spicy": true, "effects": {"drama": 12, "clout": 10}, "dunk": "tiffany"}
   ]},

  {"id": "x_dem_fight", "speaker": "debra", "topic": "politics", "tags": ["political"], "min_day": 16,
   "lead": [{"speaker": "bluewave", "text": "Debra, respectfully, your potato salad was dry. 🌊"}],
   "text": "Dave. We are on the SAME SIDE. This is how they win. 💙",
   "choices": [
     {"label": "The Democrats are fighting each other now 🍿", "effects": {"drama": 14, "clout": 10}, "react": [{"speaker": "coach", "text": "I'm staying out of this one. It was a little dry, though."}], "next": "b"},
     {"label": "Potato salad is nonpartisan", "effects": {"sanity": 6, "drama": -6}},
     {"label": "Debra, you said context matters. What's the context of the salad?", "spicy": true, "effects": {"drama": 18, "clout": 14}, "dunk": "debra"}
   ],
   "beats": {"b": {"speaker": "larry", "text": "As the neutral party: Debra's salad, B-. Dave's opinion, C. Coach's grill, A. I hate that last one. 📐",
     "choices": [
       {"label": "Larry gave Coach an A. Screenshot it.", "effects": {"clout": 12, "drama": 8}, "ally": "coach", "react": [{"speaker": "coach", "text": "Framing it."}]},
       {"label": "Larry's grading food now?", "effects": {"clout": 8}},
       {"label": "react 📐", "act": true, "effects": {"clout": 2}}
     ]}}},

  {"id": "x_coach_birthday", "speaker": "kimmy", "topic": "politics", "min_day": 18,
   "text": "It's Coach's birthday!! 🎂 Let's keep it nice today. That means you, Debra. And Larry. And Dave. 🏡",
   "choices": [
     {"label": "Happy birthday Coach 🏈", "effects": {"sanity": 6, "drama": -6, "kimmy": 1}, "ally": "coach", "react": [{"speaker": "coach", "text": "Thank y'all. Even Larry. Especially Larry."}]},
     {"label": "watch Debra say happy birthday through gritted teeth", "act": true, "effects": {"drama": 6}, "react": [{"speaker": "debra", "text": "Happy birthday Coach. 💙 (This does not mean I agree with you.)"}]},
     {"label": "Larry, grade the birthday", "effects": {"clout": 10, "drama": 6}, "react": [{"speaker": "larry", "text": "Coach's birthday: B+. Points off for being born in a swing state. 📐"}]}
   ]},

  {"id": "x_kimmy_listing_catfish", "speaker": "kimmy", "topic": "catfish", "min_day": 13,
   "text": "Just listed a 2bd condo 🏡 Before anyone asks: Catfish, no, the 'master suite' is not a 'vibe.' It's a bedroom.",
   "lead": [{"speaker": "catfish", "text": "a master suite is ALWAYS a vibe 😩"}],
   "choices": [
     {"label": "Kimmy fighting the Catfish preemptively 😂", "effects": {"clout": 10, "sanity": 4}},
     {"label": "report the Catfish to Kimmy", "act": true, "set": "reported_catfish", "effects": {"members": -4, "leak": -10, "kimmy": 2}, "dunk": "catfish"},
     {"label": "Catfish has a point, it's a vibe", "sexual": true, "effects": {"drama": 12, "clout": 8}, "ally": "catfish"}
   ]},

  {"id": "x_catfish_revenge", "speaker": "catfish", "topic": "catfish", "min_day": 17, "requires": ["reported_catfish"],
   "text": "somebody reported me to Kimmy 🐟 i'm not saying who. it was {name}. jokes are cancelled for you specifically",
   "choices": [
     {"label": "Catfish, I'm sorry, I need the jokes 🙏", "effects": {"sanity": -6, "drama": -4}, "ally": "catfish", "react": [{"speaker": "catfish", "text": "...fine. one joke. Marcus's goodbye posts have a sequel now. 📚"}]},
     {"label": "It was for the family", "effects": {"kimmy": 2, "clout": -4}, "react": [{"speaker": "kimmy", "text": "And the family THANKS you. 🏡"}]},
     {"label": "react 🐟", "act": true, "effects": {"drama": 2}}
   ]},

  {"id": "x_mike_dashcam", "speaker": "bigmike", "topic": "mike", "media": "video", "min_day": 8,
   "text": "My $0.02, 🎥 0:58 — dashcam: a deer looked at me for 40 seconds on I-40. I looked back. We understood each other.",
   "choices": [
     {"label": "Mike and the deer had a moment", "effects": {"sanity": 8, "drama": -5}, "ally": "bigmike"},
     {"label": "Was the deer also shirtless", "effects": {"clout": 10, "drama": 4}, "react": [{"speaker": "bigmike", "text": "My $0.02, deer don't wear shirts. Neither do I. Respect."}]},
     {"label": "watch all 58 seconds", "act": true, "effects": {"sanity": 4}, "react": [{"speaker": "princess", "text": "Seen ✓"}]}
   ]},

  {"id": "x_mike_vs_saint", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 12,
   "text": "Big Mike's videos are the reason women think men are unserious. A leader wears a SHIRT.",
   "lead": [{"speaker": "bigmike", "text": "My $0.02, 🎥 'Saint. You've been in that apartment since 2017. Come outside.'"}],
   "choices": [
     {"label": "Mike went for the apartment 💀", "spicy": true, "effects": {"drama": 18, "clout": 14}, "ally": "bigmike", "dunk": "section8"},
     {"label": "Saint has a point about the shirt though", "effects": {"drama": 8, "clout": -4}, "ally": "section8", "react": [{"speaker": "auntiepat", "text": "He DOES have a point about the shirt 🌺"}]},
     {"label": "tag Auntie Pat", "act": true, "effects": {"drama": -10, "saint_heat": -2}, "react": [{"speaker": "auntiepat", "text": "Both of you. Church. Sunday. Shirts ON. 🌺"}]}
   ]},

  {"id": "x_dave_apology_tour", "speaker": "drunktdave", "topic": "drama", "time": "night", "min_day": 18,
   "text": "i've been thinking. i owe everyone an apology. starting with brittany. no wait. starting with whoever brittany dated. who was it",
   "choices": [
     {"label": "Dave, do NOT open this", "effects": {"drama": -8, "sanity": 4}, "ally": "brittany"},
     {"label": "Go on... who was it?", "spicy": true, "effects": {"drama": 22, "clout": 10}, "react": [{"speaker": "brittany", "text": "Dave. I swear. 💣"}, {"speaker": "drunktdave", "text": "ok ok. it was the guy with the truck hoodie"}, {"speaker": "bigmike", "text": "My $0.02, LOTS of people have truck hoodies."}]},
     {"label": "@Dave", "hint": "tags the wrong Dave", "effects": {"drama": 8, "clout": 8}, "react": [{"speaker": "bluewave", "text": "It's 2am. Why is it ALWAYS me. 🌊"}]}
   ]},

  {"id": "x_marcus_real", "speaker": "marcus", "topic": "general", "min_day": 19,
   "text": "Serious question. If I actually left, would anybody notice?",
   "choices": [
     {"label": "Yes. We'd miss you, Marcus. For real.", "effects": {"sanity": 6, "members": 4, "kimmy": 1}, "ally": "marcus", "react": [{"speaker": "marcus", "text": "...ok. I'm staying. Not because of that. But I'm staying."}, {"speaker": "auntiepat", "text": "We love you Marcus 🌺"}]},
     {"label": "We'd notice the quiet on Sundays", "effects": {"clout": 8, "drama": 4}},
     {"label": "Try it and find out", "spicy": true, "effects": {"drama": 14, "clout": 10, "members": -6}, "dunk": "marcus"}
   ]},

  {"id": "x_bossbabe_kimmy", "speaker": "bossbabe", "topic": "money", "min_day": 6,
   "text": "Kimmy hun 💖 imagine: open houses with leggings for sale in the garage. Passive income! Say the word!",
   "choices": [
     {"label": "Kimmy, that's an MLM in a cul-de-sac", "hint": "protects Kimmy", "set": "warned_kimmy", "effects": {"boss": -3, "kimmy": 2, "clout": -4}, "react": [{"speaker": "kimmy", "text": "...I was not going to say yes. But thank you. 🏡"}]},
     {"label": "Leggings in a garage is a business plan honestly", "effects": {"boss": 2, "clout": 6}, "ally": "bossbabe"},
     {"label": "let Kimmy handle it", "act": true, "effects": {"boss": 1}}
   ]},

  {"id": "x_kimmy_thanks", "speaker": "kimmy", "topic": "kimmy", "min_day": 13, "requires": ["warned_kimmy"],
   "text": "Not that I needed it, but {name} looked out for me with Boss Babe. Noted. 🏡",
   "choices": [
     {"label": "Anytime, Kimmy", "effects": {"kimmy": 2, "sanity": 4}},
     {"label": "So does this mean you won't mute me", "effects": {"kimmy": 1, "clout": 4}, "react": [{"speaker": "kimmy", "text": "It means I'll THINK about it longer. 🏡"}]},
     {"label": "react 🏡", "act": true, "effects": {"kimmy": 1}}
   ]},

  {"id": "x_brittany_list", "speaker": "brittany", "topic": "drama", "min_day": 12,
   "text": "Made a list of everyone in this group who owes me something. It's longer than Princess's posts. 💣",
   "choices": [
     {"label": "Am I on it?", "effects": {"drama": 8, "sanity": -4}, "react": [{"speaker": "brittany", "text": "Not yet. 👀"}]},
     {"label": "Post the list", "spicy": true, "effects": {"drama": 20, "clout": 10}, "react": [{"speaker": "brittany", "text": "[posts a list. Item 1: 'the hoodie.' Item 2: 'you know what you did.']"}]},
     {"label": "Brittany, let it go, it's been 7 years", "effects": {"drama": -6}, "dunk": "brittany"}
   ]},

  {"id": "x_shady_other", "speaker": "catfish", "topic": "drama", "min_day": 15,
   "text": "i found Shady's other group 👀 it's called 'CSG Watchers.' 300 members. they have a FAN ACCOUNT for Big Mike",
   "choices": [
     {"label": "Join it undercover", "spicy": true, "effects": {"drama": 14, "clout": 12, "leak": 6}},
     {"label": "Shady, we need to talk", "effects": {"leak": -8, "drama": 6}, "react": [{"speaker": "shady", "text": "📸"}]},
     {"label": "Mike has a fan account?? 😂", "effects": {"clout": 8, "sanity": 5}, "react": [{"speaker": "bigmike", "text": "My $0.02, I'm aware. I follow it."}]}
   ]},

  {"id": "x_lurker_type", "speaker": "auntiepat", "topic": "general", "min_day": 22,
   "text": "Everyone hush!! 👁️ is typing!! 🌺",
   "lead": [{"speaker": "lurker", "text": "..."}],
   "choices": [
     {"label": "WAIT FOR IT", "effects": {"drama": 6, "sanity": 3}, "react": [{"speaker": "lurker", "text": "👍"}, {"speaker": "catfish", "text": "SIX YEARS FOR A THUMBS UP 😭"}]},
     {"label": "Don't scare him off", "effects": {"sanity": 5}, "react": [{"speaker": "lurker", "text": "👁️"}]},
     {"label": "react 👁️", "act": true, "effects": {"clout": 3}}
   ]},

  {"id": "x_newmember", "speaker": "bigbro", "topic": "general", "min_day": 9,
   "text": "Someone requested to join the group. Says they're 'a friend of Princess.' Approve? 🎤",
   "choices": [
     {"label": "Approve. More chaos.", "effects": {"members": 8, "drama": 10}, "react": [{"speaker": "princess", "text": "That's my cousin. He's 'not like other guys' either. 👑"}]},
     {"label": "Deny. We're full.", "effects": {"members": -4, "drama": -4}, "react": [{"speaker": "princess", "text": "Wow. Gatekeeping. 👑"}]},
     {"label": "Make him answer 3 questions first", "effects": {"clout": 8, "sanity": 3}, "react": [{"speaker": "bigbro", "text": "Question 1: which Dave. 🎤"}]}
   ]},

  {"id": "x_group_photo", "speaker": "kimmy", "topic": "general", "min_day": 24,
   "text": "Group photo from the cookout is up 🏡 Everyone looks great. Mike is in the back. Shirtless. In a group photo.",
   "choices": [
     {"label": "This is the best photo this group has ever taken", "effects": {"sanity": 8, "drama": -6, "members": 4}},
     {"label": "Princess is standing suspiciously close to Mike 👀", "spicy": true, "effects": {"drama": 18, "clout": 12}, "react": [{"speaker": "princess", "text": "I was BLOCKING the sun for the LADIES. 👑"}]},
     {"label": "Set it as the group photo", "effects": {"members": 6, "kimmy": 1}, "react": [{"speaker": "bigbro", "text": "Done. 🎤"}]}
   ]},

  {"id": "x_stats_dad", "speaker": "pookie", "topic": "gender", "tags": ["combo"], "min_day": 15, "stats": true,
   "text": "pookies dont raise there kids. thats a FACT. i seen it on a post wit 10k likes",
   "choices": [
     {"label": "Most Black dads live with their kids. CDC counted. 2.5M vs 1.7M.", "hint": "real numbers, the men back you", "count": "stats_rebutted", "effects": {"clout": 10, "drama": 10, "sanity": -4}, "dunk": "pookie",
      "react": [{"speaker": "coach", "text": "Same report: Black dads were the most involved on most measures. Look it up for real."}, {"speaker": "pookie", "text": "...10k likes tho"}]},
     {"label": "Likes aren't facts, Pookie", "effects": {"clout": 8, "drama": 8}, "react": [{"speaker": "drunktdave", "text": "my post about pizza got 10k likes. still not a fact"}]},
     {"label": "Facts 💯", "spicy": true, "hint": "the men turn on you", "effects": {"drama": 18, "clout": 6}, "ally": "pookie", "react": [{"speaker": "bigmike", "text": "My $0.02, I'm gonna need you to sit with that one."}]}
   ]},

  {"id": "x_saint_stats_women", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 19, "stats": true,
   "text": "Fact: 70% of divorces are filed by women. That's not opinion, it's a SPREADSHEET. That's why I stay single. Prevention.",
   "choices": [
     {"label": "Saint, you can't get divorced if nobody marries you", "spicy": true, "effects": {"drama": 18, "clout": 14}, "dunk": "section8", "react": [{"speaker": "pookie", "text": "OHHHHH 💀💀"}]},
     {"label": "Who filed doesn't tell you why, Saint", "count": "stats_rebutted", "effects": {"clout": 10, "drama": 8}, "dunk": "section8", "react": [{"speaker": "mcman", "text": "Finally somebody said it."}]},
     {"label": "tag McMan Hater", "act": true, "hint": "she has a chart for this", "effects": {"drama": 14}, "react": [{"speaker": "mcman", "text": "[posts a chart called 'Why Women Leave'. It's just a picture of the Saint.]", "stats": true}]}
   ]},

  {"id": "x_politics_truce", "speaker": "coach", "topic": "politics", "min_day": 23, "requires": ["backed_coach"],
   "text": "Proposal: one week, no politics in the group. Everybody in? Debra, Larry, Dave?",
   "choices": [
     {"label": "I'm in. Peace week.", "effects": {"drama": -12, "sanity": 8, "kimmy": 2}, "ally": "coach", "react": [{"speaker": "debra", "text": "Fine. One week. Starting... after this post. 💙"}, {"speaker": "larry", "text": "Agreed. Grading suspended. 📐"}]},
     {"label": "Nobody's lasting 24 hours", "effects": {"clout": 8, "drama": 6}, "react": [{"speaker": "bluewave", "text": "I'll last 12. Tops. 🌊"}]},
     {"label": "react 🕊️", "act": true, "effects": {"drama": -4}}
   ]},

  {"id": "x_furious_list_v2", "speaker": "furious4", "topic": "gender", "min_day": 25,
   "text": "Updated my requirements: 6'0+, kind, makes me laugh, likes my cat. ...Kevin made me rewrite it. Don't say anything.",
   "choices": [
     {"label": "Growth 🥹", "effects": {"sanity": 8, "drama": -6}, "ally": "furious4", "react": [{"speaker": "kimmy", "text": "I have a 2bd perfect for a couple and a cat. 🏡"}]},
     {"label": "Kevin is 5'11 though", "effects": {"clout": 10, "drama": 6}, "react": [{"speaker": "furious4", "text": "WITH BOOTS HE'S 6'0. LEAVE ME ALONE. 😤"}]},
     {"label": "So you WERE a 4 on the list", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"fury": 1, "drama": 14, "clout": 12}, "dunk": "furious4"}
   ]},

  {"id": "x_daily_roast", "speaker": "catfish", "topic": "general", "min_day": 26,
   "text": "it's day 26 of me being the only funny person here. somebody else tell a joke. I'm tired 😭",
   "choices": [
     {"label": "Larry's last grade was a joke", "effects": {"clout": 10, "sanity": 5}, "react": [{"speaker": "larry", "text": "That grade was ACCURATE. 📐"}]},
     {"label": "Marcus leaving is the longest running joke", "effects": {"clout": 10, "drama": 4}, "react": [{"speaker": "marcus", "text": "It's not a joke. It's a lifestyle."}]},
     {"label": "Big Mike's 2 cents is 7 minutes long", "effects": {"clout": 12, "sanity": 4}, "react": [{"speaker": "bigmike", "text": "My $0.02, quality takes time."}]}
   ]},

  {"id": "x_finale_bigbro", "speaker": "bigbro", "topic": "general", "min_day": 28,
   "text": "Almost a whole month and the group's still here. I'm shocked. Somebody did something right. 🎤",
   "choices": [
     {"label": "It was me. I'm the somebody.", "effects": {"clout": 12, "drama": 6}, "react": [{"speaker": "kimmy", "text": "It was ME. But fine. 🏡"}]},
     {"label": "It was Auntie Pat's prayers", "effects": {"sanity": 6, "drama": -4}, "react": [{"speaker": "auntiepat", "text": "It WAS the prayers 🌺🙏"}]},
     {"label": "Don't jinx it", "effects": {"drama": 4}, "react": [{"speaker": "brittany", "text": "Too late. 💣"}]}
   ]},

  {"id": "x_uncle_cookout", "speaker": "uncle", "topic": "general", "min_day": 14,
   "text": "Why does Coach ALWAYS bring the grill? Who benefits? Follow the charcoal.",
   "choices": [
     {"label": "We benefit. We eat.", "effects": {"sanity": 6, "clout": 6}},
     {"label": "Show me the charcoal chart", "effects": {"sanity": -12, "drama": 8}, "react": [{"speaker": "uncle", "text": "[posts a chart. It's a receipt from a hardware store.]"}]},
     {"label": "ignore him", "act": true, "effects": {"drama": 3}}
   ]},

  {"id": "x_bothsides_cookout", "speaker": "bothsides", "topic": "general", "min_day": 18,
   "text": "Potato salad with raisins and potato salad without raisins are both valid. I've had neither.",
   "choices": [
     {"label": "This is the most dangerous take in group history", "effects": {"drama": 12, "clout": 10}, "react": [{"speaker": "auntiepat", "text": "Raisins are NOT valid, baby 🌺"}]},
     {"label": "Fair enough", "hint": "Kimmy hates fence-sitting", "effects": {"drama": -6, "kimmy": -2}},
     {"label": "react 🥔", "act": true, "effects": {"clout": 2}}
   ]},

  {"id": "x_glitch3", "speaker": "glitch", "topic": "general", "media": "image", "min_day": 20,
   "text": "[reaction image: a dog sitting calmly in a room on fire, captioned 'CSG, day 20']",
   "choices": [
     {"label": "react 😂", "act": true, "effects": {"sanity": 10}},
     {"label": "Glitch, this is too real", "effects": {"sanity": 6, "drama": -4}},
     {"label": "set it as the group photo", "act": true, "effects": {"clout": 8, "members": 3}}
   ]},

  {"id": "x_newguy_back", "speaker": "auntiepat", "topic": "general", "min_day": 12,
   "text": "Whatever happened to the New Guy? 🌺 He was so sweet.",
   "choices": [
     {"label": "He saw one Saint post and muted the group", "effects": {"clout": 10, "drama": 4}, "react": [{"speaker": "section8", "text": "He was not ready for the information."}]},
     {"label": "He's lurking. Like 👁️ in training.", "effects": {"sanity": 5}, "react": [{"speaker": "lurker", "text": "👁️"}]},
     {"label": "Kimmy sold him a house, he's busy", "effects": {"kimmy": 1, "clout": 6}, "react": [{"speaker": "kimmy", "text": "3bd/2ba. Great schools. He's very happy. 🏡"}]}
   ]}
]);
