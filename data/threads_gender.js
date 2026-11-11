// Threads: the gender war. Pander Princess + McMan Hater + Pookie Patrol vs the men,
// the Section 8 Saint, the Furious 4, Tiffany. Tag "saint" raises the Saint's heat.
globalThis.CSG_DATA = globalThis.CSG_DATA || {};
CSG_DATA.threads = (CSG_DATA.threads || []).concat([
  {"id": "g_liability", "speaker": "princess", "topic": "gender", "tags": ["saint"], "min_day": 1,
   "text": "Ladies, if a brotha isn't constantly proving himself, he's a liability. I said what I said. 👑",
   "choices": [
     {"label": "Proving himself to WHO, Princess? You?", "spicy": true, "hint": "the men cheer", "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "bigmike", "text": "My $0.02, 😂 they asked the right question."}], "next": "b"},
     {"label": "Bro, you're a brotha too. You know that, right?", "effects": {"drama": 12, "clout": 8}, "react": [{"speaker": "princess", "text": "And I hold MYSELF accountable. Daily. 👑"}]},
     {"label": "leave it on read", "act": true, "effects": {"drama": -5, "clout": -3}, "react": [{"speaker": "pookie", "text": "PRINCES SPOKE FACTS and pookie in here quiet 💀"}]}
   ],
   "beats": {"b": {"speaker": "princess", "text": "To the WOMEN of this group, who deserve better than the energy you just brought. 👑",
     "choices": [
       {"label": "Name one woman in here who asked you to defend her", "spicy": true, "effects": {"drama": 14, "clout": 12}, "react": [{"speaker": "furious4", "text": "I asked. He's a 10 for this."}, {"speaker": "catfish", "text": "nobody asked but i'm enjoying it 🍿"}]},
       {"label": "My bad, Princess. Carry on.", "effects": {"drama": -8, "clout": -6}, "ally": "princess"},
       {"label": "react 😂", "act": true, "effects": {"clout": 4}}
     ]}}},

  {"id": "g_goodmorning", "speaker": "princess", "topic": "gender", "tags": ["saint"], "min_day": 2,
   "text": "A real man texts 'good morning queen.' These other brothas text 'wyd' at midnight. Be better. 👑",
   "choices": [
     {"label": "Who are YOU texting good morning, Princess? 👀", "spicy": true, "hint": "the group side-eye begins", "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "catfish", "text": "the way he went quiet 👀"}, {"speaker": "princess", "text": "That's... private. 👑"}]},
     {"label": "Good morning to everybody except whoever made this a topic", "effects": {"clout": 10, "sanity": 4}},
     {"label": "Good morning queen 👑 (to Auntie Pat)", "effects": {"drama": -6, "sanity": 6}, "react": [{"speaker": "auntiepat", "text": "Good morning baby!! 🌺🌺"}]}
   ]},

  {"id": "g_seenby", "speaker": "catfish", "topic": "gender", "min_day": 4,
   "text": "not Princess being first on the 'Seen by' list for EVERY Big Mike video 👀 every single one",
   "choices": [
     {"label": "He said he's just checking the facts 💀", "spicy": true, "hint": "Princess will be furious", "effects": {"drama": 18, "clout": 12}, "dunk": "princess", "react": [{"speaker": "princess", "text": "I watch to CRITIQUE. For the ladies. 👑"}, {"speaker": "bigmike", "text": "My $0.02, I appreciate the support, Princess."}]},
     {"label": "Leave the man alone, he likes trucks", "effects": {"drama": -6, "clout": 4, "kimmy": 1}, "ally": "princess"},
     {"label": "screenshot the Seen by list", "act": true, "spicy": true, "effects": {"drama": 16, "clout": 8}}
   ]},

  {"id": "g_essay", "speaker": "princess", "topic": "gender", "tags": ["saint"], "min_day": 7,
   "text": "The Saint just DM'd me a 900-word essay titled 'Traitor.' Should I post it? Ladies, I'm doing this for y'all. 👑",
   "choices": [
     {"label": "POST IT. Right now.", "spicy": true, "effects": {"drama": 22, "clout": 12}, "react": [{"speaker": "section8", "text": "That was a PRIVATE theological document."}], "next": "b"},
     {"label": "Y'all two should start a podcast", "effects": {"clout": 10, "drama": 8}, "react": [{"speaker": "section8", "text": "I'd host. He'd be the cautionary tale."}]},
     {"label": "Delete it and be the bigger man", "hint": "the Saint cools off", "effects": {"drama": -12, "saint_heat": -1, "clout": -5}, "ally": "section8"}
   ],
   "beats": {"b": {"speaker": "section8", "text": "Fine. Everyone read it. Paragraph 6 is about YOU, by the way.", "lead": [{"speaker": "princess", "text": "[posts 900 words. The title is in all caps.]"}],
     "choices": [
       {"label": "Paragraph 6 is actually kind of fire", "spicy": true, "effects": {"drama": 14, "clout": 10}, "ally": "section8"},
       {"label": "read all 900 words", "act": true, "effects": {"sanity": -15}},
       {"label": "Saint, this is a cry for help", "effects": {"clout": 8, "drama": 6}, "dunk": "section8"}
     ]}}},

  {"id": "g_vs_mike", "speaker": "princess", "topic": "gender", "tags": ["saint"], "min_day": 9,
   "text": "Big Mike filming shirtless in a truck is EXACTLY what's wrong with brothas today. The ladies deserve better. 👑",
   "choices": [
     {"label": "You watched the whole thing though 👀", "spicy": true, "hint": "the side-eye intensifies", "effects": {"drama": 18, "clout": 12}, "dunk": "princess"},
     {"label": "Mike's out here working. What are you doing?", "effects": {"clout": 10, "drama": 8}, "ally": "bigmike", "react": [{"speaker": "bigmike", "text": "My $0.02, thank you. 🚛"}]},
     {"label": "tag Big Mike", "act": true, "hint": "starts a video beef", "effects": {"drama": 12, "mike_esc": 1}, "react": [{"speaker": "bigmike", "text": "My $0.02, 🎥 'Recording my response. Princess. Brother.'"}]}
   ]},

  {"id": "g_princess_poll", "speaker": "princess", "topic": "gender", "tags": ["saint"], "min_day": 5,
   "text": "Poll for the ladies: brothas who split the bill are (a) cheap (b) broke (c) not me. I always pay 💳",
   "choices": [
     {"label": "Your card got declined at the cookout, Princess", "spicy": true, "effects": {"drama": 18, "clout": 14}, "dunk": "princess", "react": [{"speaker": "drunktdave", "text": "I WAS THERE 😂"}]},
     {"label": "Vote (d): this poll", "effects": {"clout": 10, "drama": 5}},
     {"label": "Splitting the bill is fine, it's 2026", "effects": {"drama": 8, "sanity": 3}, "react": [{"speaker": "furious4", "text": "Not for a 10 it isn't."}]}
   ]},

  {"id": "g_princess_ally", "speaker": "princess", "topic": "gender", "min_day": 12, "requires": ["sided_princess"],
   "text": "Shoutout to {name} for standing with the ladies last week. One of the good ones. 👑",
   "choices": [
     {"label": "I was being sarcastic, Princess", "spicy": true, "effects": {"drama": 16, "clout": 12}, "dunk": "princess", "react": [{"speaker": "princess", "text": "...the screenshot says otherwise. 👑"}]},
     {"label": "Appreciate it, king 👑", "effects": {"clout": -8, "drama": 6}, "react": [{"speaker": "bigmike", "text": "My $0.02, {name}, I'm disappointed."}]},
     {"label": "react 🙃", "act": true, "effects": {"clout": 2}}
   ]},

  {"id": "g_princess_cookout", "speaker": "princess", "topic": "gender", "min_day": 15,
   "text": "Reminder: brothas, if you're coming to the cookout, bring a dish AND an apology. 👑",
   "choices": [
     {"label": "What's YOUR dish, Princess?", "effects": {"drama": 10, "clout": 8}, "react": [{"speaker": "princess", "text": "My presence. 👑"}, {"speaker": "auntiepat", "text": "Bring potato salad baby 🌺"}]},
     {"label": "Apology for what though", "spicy": true, "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "princess", "text": "You KNOW what for."}]},
     {"label": "I'll bring the ice", "effects": {"drama": -8, "sanity": 4}}
   ]},

  {"id": "g_myman", "speaker": "mcman", "topic": "gender", "tags": ["combo"], "min_day": 1,
   "text": "My man would NEVER. That's all I'm saying. Some of y'all ladies need to upgrade.",
   "choices": [
     {"label": "Has anyone here actually met this man?", "spicy": true, "hint": "nobody has", "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "pookie", "text": "i met him!! (on facetime) (it was dark)"}], "next": "b"},
     {"label": "Tell him we said hi 👋", "effects": {"clout": 5, "sanity": 4}, "react": [{"speaker": "mcman", "text": "He doesn't do group chats. He's busy being better."}]},
     {"label": "leave it on read", "act": true, "effects": {"drama": -5}}
   ],
   "beats": {"b": {"speaker": "mcman", "text": "He's REAL. He's just private. Unlike some of y'all.",
     "choices": [
       {"label": "Post a pic then", "spicy": true, "effects": {"drama": 16, "clout": 10}, "react": [{"speaker": "mcman", "text": "[posts a photo of a hand holding a coffee]"}, {"speaker": "catfish", "text": "that's a stock photo sis 💀"}]},
       {"label": "Private is healthy honestly", "effects": {"drama": -8, "sanity": 4}, "ally": "mcman"},
       {"label": "react 👀", "act": true, "effects": {"clout": 3}}
     ]}}},

  {"id": "g_chart", "speaker": "mcman", "topic": "gender", "tags": ["combo"], "min_day": 2,
   "text": "[shares a chart titled 'Black Men As Partners' with no labels, no source, and one red arrow] Read it and weep.", "stats": true,
   "choices": [
     {"label": "This chart doesn't have an X axis", "hint": "fact-check", "count": "stats_rebutted", "effects": {"sanity": 4, "clout": 8, "drama": 10}, "dunk": "mcman", "react": [{"speaker": "mcman", "text": "The X axis is implied."}]},
     {"label": "Source: trust me bro 📉", "spicy": true, "effects": {"clout": 14, "drama": 14}, "dunk": "mcman"},
     {"label": "tag the Saint", "act": true, "hint": "he has a chart too", "effects": {"drama": 12, "saint_heat": 1}, "react": [{"speaker": "section8", "text": "[posts a counter-chart. It's the same chart, flipped.]", "stats": true}]}
   ]},

  {"id": "g_legday", "speaker": "mcman", "topic": "gender", "min_day": 3,
   "text": "...and THAT'S why I'll never date another one of them. Anyway. Leg day. 🍑💪 [gym mirror pic]",
   "choices": [
     {"label": "The pivot from rant to leg day was seamless", "effects": {"clout": 10, "sanity": 4}, "react": [{"speaker": "catfish", "text": "rant to squat rack in 0.2 seconds 😭"}]},
     {"label": "Proud of the leg day, not the rant", "effects": {"drama": 5, "kimmy": 1}},
     {"label": "react 💪", "act": true, "effects": {"sanity": 4, "clout": -4}, "ally": "mcman"}
   ]},

  {"id": "g_emotional", "speaker": "mcman", "topic": "gender", "tags": ["combo"], "min_day": 6,
   "text": "Black men are emotionally unavailable. My man cried at a dog food commercial. That's growth. 🤍",
   "choices": [
     {"label": "So crying is good when HE does it?", "spicy": true, "effects": {"drama": 18, "clout": 12}, "dunk": "mcman", "react": [{"speaker": "mcman", "text": "Context."}, {"speaker": "debra", "text": "Context matters 💙"}]},
     {"label": "Which commercial, I need to see this", "effects": {"sanity": 5, "drama": -5}},
     {"label": "watch Pookie co-sign it", "act": true, "effects": {"drama": 10}, "react": [{"speaker": "pookie", "text": "EMOSHUNALLY UNAVALABLE 💯 every pookie in here"}]}
   ]},

  {"id": "g_tiktok", "speaker": "mcman", "topic": "gender", "tags": ["combo"], "min_day": 10, "stats": true,
   "text": "I saw a study on TikTok. The study was a girl in her car. She was RIGHT though.",
   "choices": [
     {"label": "Peer reviewed by the car", "spicy": true, "effects": {"clout": 14, "drama": 12}, "dunk": "mcman"},
     {"label": "That's not a study, that's a vibe", "count": "stats_rebutted", "effects": {"clout": 10, "drama": 5, "sanity": 4}},
     {"label": "Send the link?", "hint": "she won't", "effects": {"drama": 5, "sanity": -4}, "react": [{"speaker": "mcman", "text": "I don't have to prove anything to you."}]}
   ]},

  {"id": "g_cheating", "speaker": "mcman", "topic": "gender", "tags": ["combo"], "min_day": 8,
   "text": "Every Black man I've dated cheated. Every. Single. One. That's a pattern. (It's 2 men.)",
   "choices": [
     {"label": "Two is not a pattern, that's a pair", "spicy": true, "effects": {"drama": 16, "clout": 14}, "dunk": "mcman", "react": [{"speaker": "larry", "text": "Statistically insignificant. Rare agreement with whoever said that. 📐"}]},
     {"label": "That's rough though, for real", "effects": {"drama": -8, "sanity": -3, "kimmy": 1}, "ally": "mcman", "react": [{"speaker": "mcman", "text": "...thank you. Anyway, leg day."}]},
     {"label": "Your man's been on his phone a lot though 👀", "spicy": true, "hint": "messy", "effects": {"drama": 22, "clout": 10, "members": -4}, "react": [{"speaker": "mcman", "text": "EXCUSE ME??"}, {"speaker": "pookie", "text": "OH NO U DIDNT"}]}
   ]},

  {"id": "g_commit", "speaker": "mcman", "topic": "gender", "tags": ["combo"], "min_day": 13,
   "text": "Black men can't commit. To anything. Not a woman, not a gym schedule, not a group chat.",
   "choices": [
     {"label": "Marcus has been committed to leaving for 6 years", "effects": {"clout": 12, "drama": 6}, "react": [{"speaker": "marcus", "text": "Leave me out of this. (I'm leaving anyway.)"}]},
     {"label": "Coach has been at every cookout since 2014", "effects": {"clout": 8, "drama": 8}, "ally": "coach", "react": [{"speaker": "coach", "text": "15 straight years. Bringing the grill again."}]},
     {"label": "Facts 💯", "spicy": true, "hint": "the men come for you", "effects": {"drama": 18, "clout": 6}, "ally": "mcman", "react": [{"speaker": "bigmike", "text": "My $0.02, I've driven the same route for 11 years. Commitment."}]}
   ]},

  {"id": "g_upgrade", "speaker": "mcman", "topic": "gender", "min_day": 16,
   "text": "Ladies, I upgraded and never looked back. Some of y'all are still downloading updates from 2014.",
   "choices": [
     {"label": "Why do you post about the old version every day then", "spicy": true, "effects": {"drama": 18, "clout": 14}, "dunk": "mcman", "react": [{"speaker": "mcman", "text": "For EDUCATIONAL purposes."}]},
     {"label": "Proud of you for moving on, for real", "effects": {"drama": -8, "kimmy": 1}, "ally": "mcman"},
     {"label": "react 📱", "act": true, "effects": {"clout": 3}}
   ]},

  {"id": "g_pk_cosign", "speaker": "pookie", "topic": "gender", "tags": ["combo"], "min_day": 1,
   "text": "McMan said it nicer then i wouldve. pookie is TRASH and dats on period 💯",
   "choices": [
     {"label": "*than", "hint": "correcting her grammar", "effects": {"clout": 12, "drama": 12, "kimmy": -1}, "dunk": "pookie", "react": [{"speaker": "pookie", "text": "nobody ask u 4 a speling test pookie"}, {"speaker": "mcman", "text": "Correcting a woman's grammar. Typical."}]},
     {"label": "Pookie didn't even say anything today", "effects": {"clout": 10, "drama": 5}},
     {"label": "leave it on read", "act": true, "effects": {"drama": -4}}
   ]},

  {"id": "g_pk_paragraph", "speaker": "pookie", "topic": "gender", "tags": ["combo"], "min_day": 3,
   "text": "not pookie in the coments typin a hole paragrah 😭 nobody reding allat",
   "choices": [
     {"label": "You wrote 'allat' with 4 typos in 3 words", "spicy": true, "effects": {"clout": 14, "drama": 14}, "dunk": "pookie"},
     {"label": "His paragraph was actually good though", "hint": "defending the men", "effects": {"defend": 1, "clout": -5, "drama": 10}, "ally": "coach"},
     {"label": "react 😭", "act": true, "effects": {"sanity": 4}}
   ]},

  {"id": "g_pk_princess", "speaker": "pookie", "topic": "gender", "tags": ["combo"], "min_day": 5,
   "text": "PRINCES is the onlee good man in this hole group. evry other pookie take notes 📝",
   "choices": [
     {"label": "Princess isn't even trying to date you though", "spicy": true, "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "princess", "text": "I respect ALL women. From a distance. 👑"}]},
     {"label": "Spelled 'pookie' perfectly. Everything else, no.", "effects": {"clout": 12, "drama": 8, "kimmy": -1}, "dunk": "pookie"},
     {"label": "watch Princess say thank you queen", "act": true, "effects": {"drama": 5}, "react": [{"speaker": "princess", "text": "Thank you queen 👑"}]}
   ]},

  {"id": "g_pk_stats", "speaker": "pookie", "topic": "gender", "tags": ["combo"], "min_day": 8, "stats": true,
   "text": "McMan postid the stats an they dont lie!! 99% of pookies is trash. its SINCE",
   "choices": [
     {"label": "It's 'science,' and also no", "count": "stats_rebutted", "effects": {"clout": 10, "drama": 8}, "dunk": "pookie"},
     {"label": "Which 1% are we talking about", "spicy": true, "effects": {"drama": 16, "clout": 10}, "react": [{"speaker": "pookie", "text": "PRINCES. an maybe coach on a good day"}, {"speaker": "coach", "text": "I'll take it."}]},
     {"label": "Pookie, I love the confidence", "effects": {"sanity": 5, "drama": -5}, "ally": "pookie"}
   ]},

  {"id": "g_pk_dm", "speaker": "pookie", "topic": "gender", "min_day": 11,
   "text": "a pookie slid in my dms sayin 'hey beautiful' 🙄 the AUDASITY. blocked an reported",
   "choices": [
     {"label": "The crime: complimenting you", "spicy": true, "effects": {"drama": 16, "clout": 12}, "dunk": "pookie", "react": [{"speaker": "pookie", "text": "he had a LOOK in his profile pic"}]},
     {"label": "What did his profile pic look like", "effects": {"drama": 8, "sanity": 3}, "react": [{"speaker": "pookie", "text": "he was smilin. SUSPISHUS"}]},
     {"label": "Proud of you for protecting your peace", "effects": {"drama": -6}, "ally": "pookie"}
   ]},

  {"id": "g_pk_word", "speaker": "pookie", "topic": "gender", "min_day": 18,
   "text": "learnd a new word today: 'misogynoir.' i dont know wat it means but im using it on pookie",
   "choices": [
     {"label": "Pookie, look it up first, I'm begging", "effects": {"clout": 10, "drama": 6}, "react": [{"speaker": "pookie", "text": "i dont need 2 look it up i FEEL it"}]},
     {"label": "Use it on Princess, he'd love that", "spicy": true, "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "princess", "text": "I've been called worse. By myself. 👑"}]},
     {"label": "react 📚", "act": true, "effects": {"clout": 3}}
   ]},

  {"id": "g_s8_highvalue", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 1,
   "text": "A high-value woman cooks, cleans, and never raises her voice. I'm single by choice, btw.",
   "choices": [
     {"label": "Whose choice though", "spicy": true, "effects": {"drama": 16, "clout": 12}, "dunk": "section8", "react": [{"speaker": "section8", "text": "MINE. Primarily."}]},
     {"label": "What do YOU bring, Saint?", "effects": {"clout": 10, "drama": 10}, "dunk": "section8", "next": "b"},
     {"label": "Amen, brother", "spicy": true, "hint": "backs the Saint", "effects": {"clout": 8, "sanity": -8, "kimmy": -1}, "ally": "section8"}
   ],
   "beats": {"b": {"speaker": "section8", "text": "I bring STRUCTURE. Leadership. A five-year plan. (The plan is to find someone.)",
     "choices": [
       {"label": "Year 6 of the five-year plan, how's it going", "spicy": true, "effects": {"drama": 14, "clout": 12}, "react": [{"speaker": "catfish", "text": "HE'S IN EXTRA TIME 😭"}]},
       {"label": "That's honestly a solid plan", "effects": {"drama": -6, "saint_heat": -1}, "ally": "section8"},
       {"label": "tag the Furious 4", "act": true, "hint": "a terrible idea", "effects": {"drama": 16}, "react": [{"speaker": "furious4", "text": "Absolutely not. He's a 3 with a plan."}]}
     ]}}},

  {"id": "g_s8_assist", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 4,
   "text": "I don't judge women on assistance. I just post about it for 3 days. Also can someone Venmo me for gas.",
   "choices": [
     {"label": "You did the thing in the same sentence", "spicy": true, "effects": {"clout": 14, "drama": 12}, "dunk": "section8"},
     {"label": "tag Auntie Pat", "act": true, "hint": "she'll handle him", "effects": {"drama": -10, "saint_heat": -2}, "react": [{"speaker": "auntiepat", "text": "Baby. I'm sending you $20 and a Bible verse. Read both. 🌺"}]},
     {"label": "send him $5 for gas", "act": true, "effects": {"sanity": 4, "clout": -4}, "ally": "section8", "react": [{"speaker": "section8", "text": "This is a loan. Between men of principle."}]}
   ]},

  {"id": "g_s8_chart", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 3, "stats": true,
   "text": "[posts a chart about women and dating. Source: 'a podcast.' Every bar is the same height.] Facts don't care.",
   "choices": [
     {"label": "Saint, every bar on this chart is the same", "count": "stats_rebutted", "effects": {"clout": 10, "drama": 8, "sanity": 3}, "dunk": "section8"},
     {"label": "tag McMan Hater", "act": true, "hint": "she has a chart too", "spicy": true, "effects": {"drama": 18, "clout": 8}, "react": [{"speaker": "mcman", "text": "[posts her own chart at him]", "stats": true}]},
     {"label": "Nice graph bro 👍", "effects": {"clout": -5, "sanity": 4}, "ally": "section8"}
   ]},

  {"id": "g_s8_women", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 7, "stats": true,
   "text": "80% of women only date the top 20% of men. It's science. That's why I'm not dating. I'm in the 80%. Of being right.",
   "choices": [
     {"label": "That 80/20 thing is from a dating app blog, not science", "count": "stats_rebutted", "effects": {"clout": 10, "drama": 10}, "dunk": "section8", "react": [{"speaker": "section8", "text": "A blog is a form of science."}]},
     {"label": "So which 20% are you in", "spicy": true, "effects": {"drama": 16, "clout": 12}, "dunk": "section8", "react": [{"speaker": "pookie", "text": "the bottom 20 pookie 💀"}]},
     {"label": "Saint makes a point tbh", "spicy": true, "hint": "the women come for you", "effects": {"drama": 14, "clout": 4, "sanity": -6}, "ally": "section8", "react": [{"speaker": "mcman", "text": "Of course you'd agree with him."}]}
   ]},

  {"id": "g_s8_meeting", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 9,
   "text": "Hosting a men's discussion tonight on 'Leading Your Household.' Attendance so far: me. Big Mike said 'maybe' and sent a video.",
   "choices": [
     {"label": "RSVP: absolutely not", "effects": {"clout": 10, "drama": 5}},
     {"label": "I'll come if there's food", "hint": "the Saint warms up to you", "effects": {"saint_heat": -1, "sanity": 4}, "ally": "section8"},
     {"label": "Who are you leading? It's a studio apartment", "spicy": true, "effects": {"clout": 14, "drama": 14}, "dunk": "section8"}
   ]},

  {"id": "g_s8_tiffany", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 11,
   "text": "Tiffany is the only woman here I respect. She understands.",
   "choices": [
     {"label": "Tiffany, blink twice", "spicy": true, "effects": {"drama": 16, "clout": 12}, "dunk": "section8", "react": [{"speaker": "tiffany", "text": "😭 I just said he had ONE good point"}]},
     {"label": "Leave Tiffany out of this", "hint": "defending Tiffany", "effects": {"defend": 1, "clout": -5, "kimmy": 1}, "ally": "tiffany"},
     {"label": "watch Tiffany react ❤️", "act": true, "effects": {"sanity": -4}}
   ]},

  {"id": "g_s8_payback", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 14, "requires": ["mobbed_saint"],
   "text": "{name}. I haven't forgotten what you said. I've drafted a response. It has footnotes.",
   "choices": [
     {"label": "Post the footnotes, coward", "spicy": true, "effects": {"drama": 18, "clout": 12, "saint_heat": 2}},
     {"label": "Saint, I was out of line. My bad.", "effects": {"drama": -10, "saint_heat": -3, "clout": -6}, "ally": "section8", "react": [{"speaker": "section8", "text": "...Apology accepted. The footnotes remain on file."}]},
     {"label": "go dark on this one", "act": true, "effects": {"drama": 4}}
   ]},

  {"id": "g_s8_mob", "speaker": "section8", "topic": "gender", "tags": ["saint"], "min_day": 6,
   "text": "Women want equality until the bill comes. Then suddenly it's 1950.",
   "choices": [
     {"label": "Saint, you've never paid a bill in your life", "spicy": true, "set": "mobbed_saint", "effects": {"drama": 16, "clout": 14}, "dunk": "section8"},
     {"label": "Just split it, problem solved", "effects": {"drama": 6, "sanity": 3}},
     {"label": "tag Princess", "act": true, "hint": "starts a fight", "effects": {"drama": 18}, "react": [{"speaker": "princess", "text": "A REAL man pays, Saint. 👑"}, {"speaker": "section8", "text": "A real man has a JOB, Princess."}]}
   ]},

  {"id": "g_f4_requirements", "speaker": "furious4", "topic": "gender", "min_day": 1,
   "text": "My requirements are SIMPLE: 6'4+, six figures, owns land, likes my cat, ready to propose by date 3. Why is that hard?",
   "choices": [
     {"label": "Respectfully... what are YOU bringing to the table?", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"fury": 1, "clout": 14, "drama": 10}, "dunk": "furious4"},
     {"label": "Your cat has standards too, I respect it", "effects": {"clout": 10, "sanity": 4}},
     {"label": "Love that for you", "effects": {"sanity": 4, "clout": -4}, "ally": "furious4"}
   ]},

  {"id": "g_f4_puddle", "speaker": "furious4", "topic": "gender", "min_day": 4,
   "text": "The dating pool in this city is a PUDDLE. I'm a 10. Where are the 10s?? 😤",
   "choices": [
     {"label": "The 10s are on a boat avoiding this group", "effects": {"clout": 10, "drama": 8}},
     {"label": "What does the 4 stand for, then?", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"fury": 1, "drama": 14, "clout": 14}, "dunk": "furious4"},
     {"label": "watch Princess say 'you're a 10, queen'", "act": true, "effects": {"drama": 5}, "react": [{"speaker": "princess", "text": "You're a 10, queen. 👑 These brothas can't handle you."}]}
   ]},

  {"id": "g_f4_nice", "speaker": "furious4", "topic": "gender", "min_day": 7,
   "text": "4 dates this week. All of them were 'nice.' That's how you KNOW something is wrong with these men.",
   "choices": [
     {"label": "You rejected 4 nice men in one week??", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"fury": 1, "drama": 14, "clout": 14}, "dunk": "furious4"},
     {"label": "Nice is a red flag now? Noted.", "effects": {"clout": 10, "drama": 5}},
     {"label": "You'll find your 6'4 landowner", "effects": {"sanity": 4, "kimmy": 1}, "ally": "furious4"}
   ]},

  {"id": "g_f4_saint", "speaker": "furious4", "topic": "gender", "tags": ["saint"], "min_day": 10,
   "text": "The Saint just told me my standards are too high. A man whose standards are 'has a pulse.'",
   "choices": [
     {"label": "Y'all should go on a date honestly", "spicy": true, "effects": {"drama": 20, "clout": 12}, "react": [{"speaker": "section8", "text": "I would never date a woman with a list."}, {"speaker": "furious4", "text": "I would never date a man with a CHART."}], "next": "b"},
     {"label": "The Saint has no standing on standards", "effects": {"clout": 10, "drama": 10}, "dunk": "section8"},
     {"label": "tag Auntie Pat", "act": true, "effects": {"drama": -10, "saint_heat": -1}, "react": [{"speaker": "auntiepat", "text": "Both of y'all come to church Sunday 🌺"}]}
   ],
   "beats": {"b": {"speaker": "catfish", "text": "ok but imagine the wedding 😭 the vows would be a debate",
     "choices": [
       {"label": "I'd officiate. For free.", "effects": {"clout": 12, "drama": 8}},
       {"label": "Kimmy would sell them a house with separate wings", "effects": {"clout": 10, "kimmy": 2}, "react": [{"speaker": "kimmy", "text": "I have a listing for exactly that. 🏡"}]},
       {"label": "react 💍", "act": true, "effects": {"sanity": 3}}
     ]}}},

  {"id": "g_f4_ten", "speaker": "furious4", "topic": "gender", "min_day": 13,
   "text": "As a 10, I shouldn't have to say this, but men need to start approaching. Not like that though. Or that.",
   "choices": [
     {"label": "How SHOULD they approach?", "effects": {"drama": 8, "sanity": -4}, "react": [{"speaker": "furious4", "text": "Correctly."}]},
     {"label": "Men need a manual at this point", "effects": {"clout": 10, "drama": 5}},
     {"label": "Maybe the problem is the list", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"fury": 1, "drama": 14, "clout": 14}, "dunk": "furious4"}
   ]},

  {"id": "g_f4_kevin", "speaker": "furious4", "topic": "gender", "min_day": 17,
   "text": "Kevin asked me out AGAIN. That's 3 times. Persistence is NOT attractive. (It's a little attractive.)",
   "choices": [
     {"label": "Say yes to Kevin. Do it for the group.", "effects": {"clout": 10, "drama": 6, "sanity": 4}, "react": [{"speaker": "catfish", "text": "KEVIN KEVIN KEVIN 📣"}]},
     {"label": "How tall is Kevin though", "effects": {"drama": 8}, "react": [{"speaker": "furious4", "text": "5'11. With boots. I'm considering it."}]},
     {"label": "Kevin deserves peace", "spicy": true, "effects": {"drama": 14, "clout": 12}, "dunk": "furious4"}
   ]},

  {"id": "g_tf_cosign", "speaker": "tiffany", "topic": "gender", "tags": ["saint"], "min_day": 2,
   "text": "Honestly the Saint kind of has a point?? Like we could all be a little softer 🥺",
   "choices": [
     {"label": "Tiffany's allowed to have an opinion, chill", "hint": "defending Tiffany", "effects": {"defend": 1, "clout": -8, "kimmy": 1}, "ally": "tiffany"},
     {"label": "Tiffany is the Saint's entire fanbase", "spicy": true, "effects": {"clout": 14, "drama": 14, "kimmy": -1}, "dunk": "tiffany"},
     {"label": "change the subject to the cookout", "act": true, "effects": {"drama": -6}}
   ]},

  {"id": "g_tf_both", "speaker": "tiffany", "topic": "gender", "min_day": 6,
   "text": "not me agreeing with Princess AND the Saint in the same day 😭 i just want everyone to like me",
   "choices": [
     {"label": "That's the most honest post in this group", "effects": {"sanity": 8, "drama": -5}, "ally": "tiffany"},
     {"label": "Pick a side, Tiff", "spicy": true, "effects": {"drama": 16, "clout": 10}},
     {"label": "We like you, Tiffany", "hint": "Kimmy approves", "effects": {"kimmy": 2, "clout": -4}, "ally": "tiffany"}
   ]},

  {"id": "g_tf_sorry", "speaker": "tiffany", "topic": "gender", "min_day": 12,
   "text": "Sorry to the Saint. Also sorry to Princess. Also sorry to McMan. I'm just sorry.",
   "choices": [
     {"label": "Tiffany, you don't owe anybody an apology", "hint": "defending Tiffany", "effects": {"defend": 1, "clout": -4, "sanity": 4, "kimmy": 1}, "ally": "tiffany"},
     {"label": "Accepted. Who are you again?", "spicy": true, "effects": {"clout": 10, "drama": 10, "kimmy": -1}, "dunk": "tiffany"},
     {"label": "react ❤️", "act": true, "effects": {"drama": -5}}
   ]},

  {"id": "g_tf_favor", "speaker": "tiffany", "topic": "gender", "min_day": 15, "requires": ["defended_tiffany"],
   "text": "Not to be dramatic but {name} is the only one who's nice to me in here 🥹",
   "choices": [
     {"label": "Somebody had to be, Tiff", "effects": {"sanity": 6, "kimmy": 2}, "ally": "tiffany"},
     {"label": "Don't tell anybody, I have a reputation", "effects": {"clout": 8}},
     {"label": "react 🫶", "act": true, "effects": {"sanity": 3}}
   ]},

  {"id": "g_tf_dogpile_defend", "speaker": "tiffany", "topic": "gender", "min_day": 9,
   "text": "I said ONE nice thing about men and now McMan unfollowed me 😭",
   "choices": [
     {"label": "Being nice to men isn't a crime, Tiff", "hint": "defending Tiffany", "set": "defended_tiffany", "effects": {"defend": 1, "clout": -6, "kimmy": 1}, "ally": "tiffany", "react": [{"speaker": "mcman", "text": "It's not a crime. It's a CHOICE. 🙄"}]},
     {"label": "What was the nice thing", "effects": {"drama": 8}, "react": [{"speaker": "tiffany", "text": "I said Coach makes good ribs 😭"}, {"speaker": "coach", "text": "I do make good ribs."}]},
     {"label": "Should've known better 💀", "spicy": true, "effects": {"clout": 10, "drama": 12}, "dunk": "tiffany"}
   ]},

  {"id": "g_haters_vs_mike", "speaker": "pookie", "topic": "gender", "tags": ["combo"], "min_day": 12,
   "text": "big mike thinks he's a role model 💀 a SHURTLESS role model. pookie of the year",
   "choices": [
     {"label": "Mike drove 600 miles for his daughter's recital", "hint": "defending Mike", "effects": {"defend": 1, "clout": 8, "drama": 8}, "ally": "bigmike", "react": [{"speaker": "bigmike", "text": "My $0.02, she did the splits. Worth every mile."}]},
     {"label": "Shirtless AND a role model. Range.", "effects": {"clout": 10, "drama": 5}},
     {"label": "pookie of the year 🏆", "spicy": true, "effects": {"drama": 14, "clout": 8}, "dunk": "bigmike"}
   ]},

  {"id": "g_men_respond", "speaker": "coach", "topic": "gender", "min_day": 14,
   "text": "Not getting into it, but some of y'all talk about Black men like we're not in the chat. We're in the chat.",
   "choices": [
     {"label": "Coach said what needed to be said", "effects": {"clout": 6, "drama": 6, "kimmy": 1}, "ally": "coach", "react": [{"speaker": "bigmike", "text": "My $0.02, amen."}, {"speaker": "mcman", "text": "Then act like it."}]},
     {"label": "Coach, they know. That's the point.", "effects": {"drama": 12, "clout": 8}, "react": [{"speaker": "pookie", "text": "EXACKLY 💯"}]},
     {"label": "Can everybody just eat at the cookout in peace", "effects": {"drama": -8, "sanity": 4}}
   ]},

  {"id": "g_princess_seen_again", "speaker": "drunktdave", "topic": "gender", "time": "night", "min_day": 6,
   "text": "princess why r u always online at 2am watching mike's videos. asking for everyone",
   "choices": [
     {"label": "Dave asking the real questions 😂", "spicy": true, "effects": {"drama": 18, "clout": 12}, "react": [{"speaker": "princess", "text": "I'm a night owl. For research. 👑"}]},
     {"label": "Dave, go to bed", "effects": {"drama": -8}, "react": [{"speaker": "drunktdave", "text": "u go to bed"}]},
     {"label": "@Dave", "hint": "tags the wrong Dave", "effects": {"drama": 8, "clout": 8}, "react": [{"speaker": "bluewave", "text": "WRONG DAVE. Also yes, Princess, why? 🌊"}]}
   ]}
]);
