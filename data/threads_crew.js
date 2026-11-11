// Threads: Kimmy, the Catfish, Big Mike ("My $0.02,"), Drunk Dave, Auntie Pat, Big Bro,
// Shady, Marcus, Boss Babe, Brittany, the Lurker and the bench.
globalThis.CSG_DATA = globalThis.CSG_DATA || {};
CSG_DATA.threads = (CSG_DATA.threads || []).concat([
  {"id": "k_toxic", "speaker": "kimmy", "topic": "kimmy", "min_day": 1,
   "text": "Speaking of toxic relationships 😬 this 3bd/2ba has a FENCED yard and great schools. DM me! — Kimmy K. | Your Home, Your Future™",
   "choices": [
     {"label": "Nobody was speaking of toxic relationships, Kimmy", "effects": {"clout": 10, "drama": 5, "kimmy": -1}},
     {"label": "What's the HOA like?", "hint": "she writes a novel", "effects": {"sanity": -8, "kimmy": 3}, "react": [{"speaker": "kimmy", "text": "Wonderful people. Strict about mailboxes. As they should be. 🏡"}]},
     {"label": "like it", "act": true, "effects": {"kimmy": 1, "clout": -4}}
   ]},

  {"id": "k_family", "speaker": "kimmy", "topic": "catfish", "min_day": 3,
   "text": "Reminder: this is a FAMILY group. I will not be repeating myself. (I will be repeating myself.) 🏡",
   "choices": [
     {"label": "Yes ma'am", "effects": {"kimmy": 2, "clout": -5, "drama": -5}},
     {"label": "The Catfish has entered the chat 👀", "spicy": true, "effects": {"drama": 14, "clout": 10, "kimmy": -2}, "react": [{"speaker": "catfish", "text": "i was summoned 😇"}]},
     {"label": "Which family though", "effects": {"clout": 10, "kimmy": -1}}
   ]},

  {"id": "k_coach", "speaker": "kimmy", "topic": "politics", "min_day": 7,
   "text": "Not getting into politics, but Coach is the only adult in that thread and I'll leave it there. 🏡",
   "choices": [
     {"label": "Kimmy chose violence today", "effects": {"drama": 12, "clout": 10}, "react": [{"speaker": "debra", "text": "Wow, Kimmy. WOW. 💙"}]},
     {"label": "Agreed, Kimmy", "hint": "sides with Coach", "count": "coach_right", "effects": {"kimmy": 2, "clout": -8}, "ally": "coach"},
     {"label": "Is that thread for sale too?", "effects": {"clout": 10, "sanity": 4}}
   ]},

  {"id": "k_gift", "speaker": "kimmy", "topic": "kimmy", "min_day": 10,
   "text": "Saw this condo and thought of you, {name}. Not because I like you. Because it's on a quiet street and you need one.",
   "choices": [
     {"label": "Kimmy, is this love?", "effects": {"kimmy": 2, "sanity": 5}, "react": [{"speaker": "kimmy", "text": "It's a COMMISSION. ...and a little love. 🏡"}]},
     {"label": "I can't afford a condo, Kimmy", "effects": {"sanity": 4, "kimmy": 1}, "react": [{"speaker": "kimmy", "text": "Nobody can. That's never stopped anybody. 🏡"}]},
     {"label": "Is this a pyramid scheme?", "hint": "she's offended", "effects": {"clout": 10, "kimmy": -2}}
   ]},

  {"id": "k_mute_warning", "speaker": "kimmy", "topic": "kimmy", "min_day": 5,
   "text": "I've muted 3 people this week. I'm not saying who's next. I'm looking at the Catfish. And {name}. Mostly the Catfish.",
   "choices": [
     {"label": "Kimmy, I've been an angel", "effects": {"kimmy": 1, "clout": -3}, "react": [{"speaker": "kimmy", "text": "Angels don't send 🌶️ emojis. 🏡"}]},
     {"label": "Mute me, I need the break honestly", "effects": {"sanity": 8, "kimmy": -1}},
     {"label": "Mute the Catfish, she's the problem", "effects": {"kimmy": 2, "drama": 8}, "dunk": "catfish", "react": [{"speaker": "catfish", "text": "SNITCH 🐟"}]}
   ]},

  {"id": "k_openhouse", "speaker": "kimmy", "topic": "kimmy", "min_day": 14,
   "text": "Open house went GREAT. Only one problem: Big Mike showed up. Shirtless. Asked if the garage fits a Peterbilt.",
   "choices": [
     {"label": "Does it though?", "effects": {"clout": 8, "sanity": 5}, "react": [{"speaker": "kimmy", "text": "...It might. I'm checking. 🏡"}, {"speaker": "bigmike", "text": "My $0.02, she's checking."}]},
     {"label": "Mike in a cul-de-sac is a threat to the HOA", "effects": {"clout": 10, "drama": 6}},
     {"label": "react 🚛", "act": true, "effects": {"sanity": 3}}
   ]},

  {"id": "k_listing_war", "speaker": "kimmy", "topic": "kimmy", "min_day": 18,
   "text": "Boss Babe just commented 'DM me for a better rate 💖' under my LISTING. In MY group.",
   "choices": [
     {"label": "Kimmy, square up", "spicy": true, "effects": {"drama": 16, "clout": 10}, "react": [{"speaker": "bossbabe", "text": "Just helping, hun!! 💖"}, {"speaker": "kimmy", "text": "Help yourself to the exit. 🏡"}]},
     {"label": "Mute her, you're the admin", "effects": {"kimmy": 2, "drama": 6}, "dunk": "bossbabe"},
     {"label": "What IS the better rate though", "effects": {"clout": 8, "kimmy": -2}}
   ]},

  {"id": "c_potato", "speaker": "catfish", "topic": "general", "min_day": 1,
   "text": "y'all are fighting about the cookout AGAIN 😭 we can't even agree on potato salad and you want world peace",
   "choices": [
     {"label": "Auntie Pat's potato salad ends all wars", "effects": {"drama": -10, "sanity": 8}, "react": [{"speaker": "auntiepat", "text": "The secret is love. And paprika. 🌺"}]},
     {"label": "Raisins in potato salad, discuss", "spicy": true, "effects": {"drama": 20, "clout": 10}, "react": [{"speaker": "coach", "text": "I have never agreed with Debra more. No raisins."}, {"speaker": "debra", "text": "First time I've agreed with Coach. Don't get used to it. 💙"}]},
     {"label": "react 😂", "act": true, "effects": {"drama": -5}}
   ]},

  {"id": "c_settle", "speaker": "catfish", "topic": "politics", "min_day": 4,
   "text": "Coach. Debra. I'm settling this: you both lose. Next topic. Who has snacks.",
   "choices": [
     {"label": "Catfish for president", "effects": {"drama": -10, "sanity": 8, "clout": 5}, "ally": "catfish"},
     {"label": "Coach actually won that one", "hint": "sides with Coach", "count": "coach_right", "effects": {"clout": -5, "kimmy": 1, "drama": 8}, "ally": "coach"},
     {"label": "I have snacks", "effects": {"sanity": 5, "drama": -5}}
   ]},

  {"id": "c_gift", "speaker": "catfish", "topic": "catfish", "min_day": 6,
   "text": "ok Marcus since you're leaving anyway... 🍆 pic as a goodbye gift? for the memories 👀",
   "choices": [
     {"label": "MARCUS DON'T DO IT", "effects": {"drama": 8, "sanity": 4}, "react": [{"speaker": "marcus", "text": "I'm not doing anything. I'm leaving. (Not leaving.)"}]},
     {"label": "Marcus has been waiting for this moment", "spicy": true, "sexual": true, "effects": {"drama": 20, "clout": 10}},
     {"label": "report it to Kimmy", "act": true, "hint": "lose the fun, lower the leak", "effects": {"members": -5, "leak": -15, "kimmy": 2}, "dunk": "catfish"}
   ]},

  {"id": "c_halfway", "speaker": "catfish", "topic": "mike", "min_day": 9,
   "text": "Big Mike the shirt is already off, you're halfway there 😩🍆",
   "choices": [
     {"label": "Catfish, it's 9am", "effects": {"drama": -5, "sanity": 4}},
     {"label": "She's got a point, Mike", "spicy": true, "sexual": true, "effects": {"drama": 20, "clout": 12}},
     {"label": "report it to Kimmy", "act": true, "hint": "lose the fun, lower the leak", "effects": {"members": -5, "leak": -15, "kimmy": 2}, "dunk": "catfish"}
   ]},

  {"id": "c_real", "speaker": "catfish", "topic": "general", "min_day": 12,
   "text": "real talk, this group is the only thing that makes me laugh this week. y'all are crazy but y'all are mine 🫶",
   "choices": [
     {"label": "Same. Even Marcus.", "effects": {"sanity": 8, "drama": -8}, "ally": "catfish"},
     {"label": "Who hacked the Catfish", "effects": {"clout": 10, "drama": 5}},
     {"label": "react ❤️", "act": true, "effects": {"drama": -5}}
   ]},

  {"id": "c_rename", "speaker": "catfish", "topic": "general", "min_day": 8,
   "text": "proposal: we rename the group 'Conversations, Sh*ts & Gaslighting'. all in favor 🙋‍♀️",
   "choices": [
     {"label": "🙋 Seconded", "effects": {"clout": 10, "sanity": 4}},
     {"label": "Big Bro would never allow it", "effects": {"drama": 4}, "react": [{"speaker": "bigbro", "text": "...I'm considering it. 🎤"}]},
     {"label": "Kimmy, she said a bad word", "effects": {"kimmy": 2, "clout": -4}, "react": [{"speaker": "kimmy", "text": "It was censored. I'll allow it. Once. 🏡"}]}
   ]},

  {"id": "c_coach_dm", "speaker": "catfish", "topic": "catfish", "min_day": 16,
   "text": "Coach you've been so calm lately 👀 calm men send pics. it's known. 🍆",
   "choices": [
     {"label": "Coach is a married man, Catfish", "effects": {"drama": 6, "kimmy": 1}, "react": [{"speaker": "coach", "text": "Happily. 22 years. Next."}]},
     {"label": "Coach, she's got a point", "spicy": true, "sexual": true, "effects": {"drama": 18, "clout": 10}},
     {"label": "report it to Kimmy", "act": true, "hint": "lose the fun, lower the leak", "effects": {"members": -5, "leak": -15, "kimmy": 2}, "dunk": "catfish"}
   ]},

  {"id": "c_roast", "speaker": "catfish", "topic": "general", "min_day": 20,
   "text": "roast session. rules: no politics, no Princess, no 'stats'. go 🔥",
   "choices": [
     {"label": "Marcus has said goodbye more than a flight attendant", "effects": {"clout": 12, "sanity": 6, "drama": 4}, "react": [{"speaker": "marcus", "text": "...that's actually funny. Still leaving."}]},
     {"label": "Kimmy would sell a house to a ghost", "effects": {"clout": 10, "kimmy": -1}, "react": [{"speaker": "kimmy", "text": "Ghosts pay cash. 🏡"}]},
     {"label": "Larry grades his own grocery lists", "effects": {"clout": 10, "drama": 4}, "react": [{"speaker": "larry", "text": "B+. The milk was a reach. 📐"}]}
   ]},

  {"id": "m_breakfast", "speaker": "bigmike", "topic": "mike", "min_day": 2,
   "text": "My $0.02, breakfast at a truck stop in Amarillo. Ate it shirtless. Respect the process. 🚛",
   "choices": [
     {"label": "Respect the process 🫡", "effects": {"clout": 10, "sanity": 4}, "ally": "bigmike"},
     {"label": "Mike, the waitress deserves better", "effects": {"drama": 5, "clout": 10, "kimmy": 1}},
     {"label": "Mike please put on a shirt", "hint": "never works", "effects": {"sanity": -2}, "react": [{"speaker": "bigmike", "text": "My $0.02, no."}]}
   ]},

  {"id": "m_advice", "speaker": "bigmike", "topic": "gender", "min_day": 5,
   "text": "My $0.02, relationship advice from the cab: if she's mad, drive 600 miles. Works every time.",
   "choices": [
     {"label": "Mike, that's just leaving", "effects": {"clout": 10, "drama": 8}},
     {"label": "The Saint is taking notes", "spicy": true, "effects": {"drama": 16, "clout": 10, "saint_heat": 1}, "react": [{"speaker": "section8", "text": "I don't have a truck. I have principles."}]},
     {"label": "Drive safe, Mike", "effects": {"sanity": 5, "kimmy": 1}, "ally": "bigmike"}
   ]},

  {"id": "m_princess", "speaker": "bigmike", "topic": "gender", "media": "video", "min_day": 10,
   "text": "My $0.02, 🎥 1:12 — no shirt: 'Princess, I see you watching every video first. I appreciate the support, brother.'",
   "choices": [
     {"label": "MIKE 💀💀💀", "spicy": true, "effects": {"drama": 20, "clout": 14}, "react": [{"speaker": "princess", "text": "I watch for QUALITY CONTROL. 👑"}]},
     {"label": "Mike is so unbothered it's scary", "effects": {"clout": 10, "sanity": 5}, "ally": "bigmike"},
     {"label": "watch Princess type 9 paragraphs", "act": true, "effects": {"drama": 12}}
   ]},

  {"id": "m_daughter", "speaker": "bigmike", "topic": "mike", "min_day": 13,
   "text": "My $0.02, my daughter made honor roll. Drove 600 miles to take her to Red Lobster. Still no shirt. Had a blazer though.",
   "choices": [
     {"label": "Proud of you Mike, for real", "effects": {"sanity": 8, "drama": -6}, "ally": "bigmike", "react": [{"speaker": "auntiepat", "text": "God is GOOD 🌺"}, {"speaker": "pookie", "text": "...ok dat one pookie is cool"}]},
     {"label": "A blazer with no shirt is a choice", "effects": {"clout": 10, "drama": 4}, "react": [{"speaker": "bigmike", "text": "My $0.02, a confident choice."}]},
     {"label": "react 🦞", "act": true, "effects": {"sanity": 3}}
   ]},

  {"id": "m_crypto", "speaker": "bossbabe", "topic": "money", "min_day": 13,
   "text": "Big Mike just bought in!! He's investing from the cab between deliveries. That's a BOSS 💼🚀",
   "choices": [
     {"label": "Mike, call me before you send another dollar", "hint": "defending Mike", "effects": {"defend": 1, "clout": -4, "drama": 5}, "ally": "bigmike"},
     {"label": "Mike's gonna be a shirtless millionaire", "effects": {"clout": 10, "drama": 8}},
     {"label": "Ask what the coin is called", "effects": {"sanity": -8, "drama": 5}, "react": [{"speaker": "bossbabe", "text": "BABECOIN 💖 (it's a pyramid but make it digital)"}]}
   ]},

  {"id": "m_shirt_vote", "speaker": "auntiepat", "topic": "mike", "min_day": 17,
   "text": "I'm starting a prayer chain for Big Mike to put on a shirt. Who's with me 🌺🙏",
   "choices": [
     {"label": "🙏 Amen", "effects": {"kimmy": 1, "sanity": 4}, "react": [{"speaker": "bigmike", "text": "My $0.02, I felt that. Still no."}]},
     {"label": "Leave Mike alone, he's free", "effects": {"clout": 8, "drama": 6}, "ally": "bigmike"},
     {"label": "Auntie Pat watches every video though 👀", "spicy": true, "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "auntiepat", "text": "For PRAYER purposes. 🌺"}]}
   ]},

  {"id": "d_cookout", "speaker": "drunktdave", "topic": "drama", "time": "night", "min_day": 2,
   "text": "okay but does anyone remember what happened at the cookout in 2021 or are we all pretending",
   "choices": [
     {"label": "Go on...", "spicy": true, "effects": {"drama": 20, "sanity": -8}, "react": [{"speaker": "drunktdave", "text": "nvm i forgot. it'll come back at 3am"}]},
     {"label": "Dave it's 2am. Water. Bed.", "effects": {"drama": -8, "sanity": 4}, "ally": "drunktdave"},
     {"label": "@Dave", "hint": "tags the wrong Dave", "effects": {"drama": 8, "clout": 8}, "react": [{"speaker": "bluewave", "text": "WRONG DAVE. Go to sleep. 🌊"}]}
   ]},

  {"id": "d_typing", "speaker": "drunktdave", "topic": "drama", "time": "night", "min_day": 4,
   "text": "not to be messy but brittany used to date someone in this chat and he's TYPING RIGHT NOW",
   "choices": [
     {"label": "Dave go to bed", "effects": {"drama": -8, "sanity": 4}},
     {"label": "WHO??", "spicy": true, "effects": {"drama": 24, "clout": 10}, "react": [{"speaker": "brittany", "text": "Dave, I will end you. 💣"}], "next": "b"},
     {"label": "screenshot it", "act": true, "spicy": true, "effects": {"leak": 8, "drama": 12, "clout": 8}}
   ],
   "beats": {"b": {"speaker": "drunktdave", "text": "ok ok i'll give a hint. he's on this group. he has a truck. no he doesn't. maybe he does.",
     "choices": [
       {"label": "MIKE??", "spicy": true, "effects": {"drama": 18, "clout": 10}, "react": [{"speaker": "bigmike", "text": "My $0.02, I've never been to Brittany's state."}]},
       {"label": "Dave, I'm taking your phone", "effects": {"drama": -10, "sanity": 4}, "ally": "brittany"},
       {"label": "react 🍿", "act": true, "effects": {"drama": 6}}
     ]}}},

  {"id": "d_love", "speaker": "drunktdave", "topic": "general", "time": "night", "min_day": 7,
   "text": "i love this group. i love u all. even larry. larry come outside. coach come outside. EVERYBODY OUTSIDE",
   "choices": [
     {"label": "Dave drink water", "effects": {"sanity": 5, "drama": -5}, "ally": "drunktdave"},
     {"label": "Larry would grade the outside", "effects": {"clout": 10, "drama": 5}, "react": [{"speaker": "larry", "text": "Outside: C. Too many variables. 📐"}]},
     {"label": "send a voice note back", "act": true, "spicy": true, "effects": {"drama": 12, "sanity": -8, "clout": 10}}
   ]},

  {"id": "d_wrongdave", "speaker": "drunktdave", "topic": "politics", "time": "night", "min_day": 10,
   "text": "whoever keeps tagging me about elections i am NOT that dave. i am the fun dave. the wave never came btw",
   "choices": [
     {"label": "Fun Dave just ended Political Dave 💀", "spicy": true, "effects": {"drama": 16, "clout": 14}, "react": [{"speaker": "bluewave", "text": "It's 2am and I'm being bullied by my own cousin. 🌊"}]},
     {"label": "The fun Dave has spoken", "effects": {"clout": 10, "sanity": 5}},
     {"label": "Both Daves, go to bed", "effects": {"drama": -10, "sanity": 4}}
   ]},

  {"id": "d_secret", "speaker": "drunktdave", "topic": "drama", "time": "night", "min_day": 15,
   "text": "kimmy sold the saint his apartment and he haggled for 3 WEEKS. kimmy told me. at the cookout. after her 2nd wine cooler",
   "choices": [
     {"label": "KIMMY DRINKS??", "spicy": true, "effects": {"drama": 18, "clout": 12, "kimmy": -2}, "react": [{"speaker": "kimmy", "text": "ONE wine cooler. For the HOA. Dave, you're muted in my heart. 🏡"}]},
     {"label": "3 weeks for a studio is wild", "effects": {"clout": 10, "drama": 8}, "dunk": "section8", "react": [{"speaker": "section8", "text": "Negotiation is leadership."}]},
     {"label": "Dave, delete this", "effects": {"drama": -6, "kimmy": 2}, "ally": "kimmy"}
   ]},

  {"id": "a_password", "speaker": "auntiepat", "topic": "general", "time": "morning", "min_day": 1,
   "text": "GOOD MORNING 🌺 Did you know if you type your password in ALL CAPS it becomes encrypted? Share to protect your family!!",
   "choices": [
     {"label": "Auntie Pat, that's not how passwords work 🥲", "effects": {"sanity": -8, "drama": 5, "clout": 5}},
     {"label": "Thank you Auntie Pat 🌺", "effects": {"sanity": 5, "drama": -5, "kimmy": 1}, "ally": "auntiepat"},
     {"label": "share it ironically", "act": true, "spicy": true, "effects": {"clout": 10, "drama": 8}}
   ]},

  {"id": "a_saint", "speaker": "auntiepat", "topic": "gender", "tags": ["saint"], "min_day": 6,
   "text": "Saint, baby, I've read your posts. You need to call your mother. And eat a vegetable. 🌺",
   "choices": [
     {"label": "CALL YOUR MOTHER 💀", "effects": {"clout": 10, "drama": 8}},
     {"label": "Auntie Pat is right", "hint": "calms the Saint", "effects": {"drama": -10, "saint_heat": -2, "clout": -4}, "ally": "auntiepat"},
     {"label": "Explain the Saint's whole thing to Auntie Pat", "effects": {"sanity": -12, "drama": 8}, "react": [{"speaker": "auntiepat", "text": "Lord. I'm adding him to the prayer list. Top of it. 🌺"}]}
   ]},

  {"id": "a_wronggroup", "speaker": "auntiepat", "topic": "general", "min_day": 9,
   "text": "Happy birthday Marcus!!! 🎉 (sorry wrong group) (sorry wrong person) (is this Facebook)",
   "choices": [
     {"label": "Happy birthday Marcus anyway 🎉", "effects": {"sanity": 8, "drama": -5}, "react": [{"speaker": "marcus", "text": "It's not my birthday. But thank you. I'm staying one more day."}]},
     {"label": "Auntie Pat is the main character", "effects": {"clout": 10, "drama": 5}},
     {"label": "screenshot it", "act": true, "spicy": true, "effects": {"clout": 10, "drama": 5}}
   ]},

  {"id": "a_scam", "speaker": "auntiepat", "topic": "money", "min_day": 14,
   "text": "A nice prince messaged me about an inheritance!! He just needs gift cards to release it 🌺 who knows where to buy Apple cards",
   "choices": [
     {"label": "AUNTIE PAT NO. That's a scam. Don't send anything.", "hint": "protects Auntie Pat", "effects": {"sanity": -4, "clout": 6, "kimmy": 2}, "ally": "auntiepat", "react": [{"speaker": "auntiepat", "text": "...he seemed so nice 🥺 ok baby. Thank you."}, {"speaker": "coach", "text": "Good catch. Auntie, call me before you buy anything."}]},
     {"label": "Ask the prince if he's single", "spicy": true, "effects": {"drama": 14, "clout": 10}, "react": [{"speaker": "catfish", "text": "i'll take the prince 👀"}]},
     {"label": "tag Boss Babe, this is her department", "effects": {"drama": 10, "clout": 8}, "react": [{"speaker": "bossbabe", "text": "Auntie, if you want to invest, I have something BETTER 💖"}, {"speaker": "kimmy", "text": "ABSOLUTELY not. 🏡"}]}
   ]},

  {"id": "bb_return", "speaker": "bigbro", "topic": "kimmy", "min_day": 4,
   "text": "Posting for the first time this year to say: Kimmy runs this place now. I just pay for it. 🎤",
   "choices": [
     {"label": "He's alive!", "effects": {"sanity": 5, "clout": 5}},
     {"label": "Kimmy, did you write this for him?", "effects": {"drama": 10, "clout": 10, "kimmy": -1}, "react": [{"speaker": "kimmy", "text": "I edited it. Lightly. 🏡"}]},
     {"label": "All hail Kimmy", "effects": {"kimmy": 2, "clout": -4}}
   ]},

  {"id": "bb_poll", "speaker": "bigbro", "topic": "general", "min_day": 14,
   "text": "Poll: should I delete this group? Voting closes when I feel like it. 🎤",
   "choices": [
     {"label": "Please don't, we have nowhere else to go", "effects": {"clout": -8, "drama": -8}},
     {"label": "Do it. Free us.", "spicy": true, "effects": {"drama": 20, "clout": 10}, "react": [{"speaker": "bigbro", "text": "Bold. Noted. 🎤"}]},
     {"label": "tag Kimmy to talk him down", "act": true, "effects": {"drama": -12, "kimmy": 1, "clout": -4}, "react": [{"speaker": "kimmy", "text": "He's not deleting anything. I have listings pinned. 🏡"}]}
   ]},

  {"id": "bb_rap", "speaker": "bigbro", "topic": "general", "min_day": 21,
   "text": "Freestyle Friday. Give me a topic and I'll body it. 🎤",
   "choices": [
     {"label": "Big Mike's shirt", "effects": {"sanity": 8, "drama": -5}, "react": [{"speaker": "bigbro", "text": "Mike in the cab and the AC on blast / shirt in the closet, it's a thing of the past 🎤"}]},
     {"label": "Coach losing every argument", "effects": {"clout": 8, "drama": 4}, "react": [{"speaker": "bigbro", "text": "Coach got receipts but the mob got the votes / Larry with the red pen, still writing his notes 🎤"}]},
     {"label": "Me", "effects": {"clout": 10}, "react": [{"speaker": "bigbro", "text": "{name} in the chat, always stirring the pot / one more strike and I'm deleting the lot 🎤"}]}
   ]},

  {"id": "sh_screenshot", "speaker": "shady", "topic": "drama", "media": "system", "min_day": 2,
   "text": "📸 [Shady took a screenshot. Three dots appeared in another group.]",
   "choices": [
     {"label": "Shady, who is that for", "effects": {"drama": 8, "sanity": -4}},
     {"label": "delete your last message", "act": true, "effects": {"leak": -15, "clout": -8}},
     {"label": "👋 hi Shady's other group", "spicy": true, "effects": {"clout": 14, "drama": 8}}
   ]},

  {"id": "sh_dm", "speaker": "shady", "topic": "drama", "media": "system", "min_day": 8,
   "text": "[Shady sent you a screenshot of YOUR reply in another group. 400 laughing reactions. One of them is 👁️.]",
   "choices": [
     {"label": "Shady please take that down 🙏", "effects": {"leak": -20, "clout": -12}},
     {"label": "400 reactions? I'm famous", "spicy": true, "effects": {"clout": 18, "drama": 8}},
     {"label": "go quiet for the rest of the day", "act": true, "effects": {"leak": -10, "clout": -5}}
   ]},

  {"id": "mc_farewell", "speaker": "marcus", "topic": "general", "min_day": 2,
   "text": "Today is my last day in this group. I've written my farewell post. It's 11 paragraphs.",
   "choices": [
     {"label": "See you next Sunday, Marcus", "spicy": true, "effects": {"clout": 12, "drama": 8}, "dunk": "marcus"},
     {"label": "We'd miss you, man. Stay.", "effects": {"clout": -4, "sanity": 4, "kimmy": 1}, "ally": "marcus"},
     {"label": "read all 11 paragraphs", "act": true, "effects": {"sanity": -12, "drama": 5}, "react": [{"speaker": "marcus", "text": "Thank you for reading. I'm staying, actually."}]}
   ]},

  {"id": "mc_back", "speaker": "marcus", "topic": "general", "min_day": 9,
   "text": "Didn't leave. Got a notification. Anyway, who's going to the cookout?",
   "choices": [
     {"label": "Welcome back ❤️", "effects": {"sanity": 4, "clout": -4}, "ally": "marcus"},
     {"label": "repost his goodbye from Sunday", "act": true, "spicy": true, "effects": {"clout": 14, "drama": 12}},
     {"label": "The Catfish is going to the cookout 👀", "effects": {"drama": 10, "clout": 8}, "react": [{"speaker": "catfish", "text": "and i'm bringing a CAMERA 📸"}]}
   ]},

  {"id": "bx_kimmy", "speaker": "bossbabe", "topic": "money", "min_day": 3,
   "text": "Kimmy liked my post 👀 basically a yes. Welcome to the team, hun!! Realtors make the BEST recruiters 💖",
   "choices": [
     {"label": "Kimmy don't do it. It's a pyramid with a ring light.", "hint": "protects Kimmy", "effects": {"boss": -3, "clout": -4, "kimmy": 2}},
     {"label": "That's not how likes work", "spicy": true, "effects": {"clout": 14, "drama": 10, "boss": -1}, "dunk": "bossbabe"},
     {"label": "let it happen", "act": true, "effects": {"boss": 2}}
   ]},

  {"id": "bx_freedom", "speaker": "bossbabe", "topic": "money", "min_day": 8,
   "text": "Hey {name}!! 💖 Long time no talk! Quick question: have you heard of financial freedom? It's crypto now btw 🚀",
   "choices": [
     {"label": "No, hun", "effects": {"clout": 10, "drama": 5}},
     {"label": "buy leggings to make it stop", "act": true, "effects": {"clout": -8}, "ally": "bossbabe"},
     {"label": "screenshot it to the group", "act": true, "spicy": true, "effects": {"drama": 16, "clout": 10}}
   ]},

  {"id": "br_40", "speaker": "brittany", "topic": "drama", "min_day": 2,
   "text": "Not gonna name names but someone in here owes me $40 from 2019. And a hoodie.",
   "choices": [
     {"label": "Name names", "spicy": true, "effects": {"drama": 20, "clout": 10}, "react": [{"speaker": "brittany", "text": "Not yet. 💣"}]},
     {"label": "send her $40 to end it", "act": true, "effects": {"sanity": 8, "clout": -8, "drama": -8}, "ally": "brittany"},
     {"label": "What color was the hoodie?", "effects": {"drama": 8, "sanity": -4}, "react": [{"speaker": "brittany", "text": "Gray. With a truck on it. 👀"}, {"speaker": "bigmike", "text": "My $0.02, lots of people have truck hoodies."}]}
   ]},

  {"id": "br_kimmy", "speaker": "brittany", "topic": "kimmy", "min_day": 7,
   "text": "Kimmy acts so sweet but I've seen the house she listed with the 'cozy' bedroom. It's a closet.",
   "choices": [
     {"label": "Kimmy's listings are honest, leave her alone", "hint": "defending Kimmy", "effects": {"defend": 1, "kimmy": 2, "clout": -4}, "ally": "kimmy"},
     {"label": "Cozy is realtor for closet 💀", "spicy": true, "effects": {"drama": 16, "clout": 14, "kimmy": -2}},
     {"label": "leave it on read", "act": true, "effects": {"drama": -4}}
   ]},

  {"id": "lk_react", "speaker": "lurker", "topic": "general", "media": "system", "min_day": 3,
   "text": "[👁️ reacted 😂 to your message from 2019]",
   "choices": [
     {"label": "Say something, 👁️. Anything.", "effects": {"drama": 8, "sanity": -4}},
     {"label": "react back 👁️", "act": true, "effects": {"clout": 10}},
     {"label": "delete the 2019 message", "act": true, "effects": {"leak": -10, "clout": -5}}
   ]},

  {"id": "lk_seen", "speaker": "catfish", "topic": "general", "min_day": 11,
   "text": "👁️ has read every message in this group for six years and never said a word. most powerful man here",
   "choices": [
     {"label": "He IS the group", "effects": {"clout": 10, "sanity": 5}},
     {"label": "👁️, pick a side: Coach or Debra", "spicy": true, "effects": {"drama": 16, "clout": 10}, "react": [{"speaker": "lurker", "text": "👁️"}]},
     {"label": "say nothing, out of respect", "act": true, "effects": {"drama": -5}}
   ]},

  {"id": "x_glitch1", "speaker": "glitch", "topic": "general", "media": "image", "min_day": 2,
   "text": "[reaction image: a raccoon holding a single grape, staring into the distance]",
   "choices": [
     {"label": "react 😂", "act": true, "effects": {"sanity": 10}},
     {"label": "Glitch, what does this mean", "effects": {"sanity": -4, "drama": 5}},
     {"label": "make it your profile pic", "act": true, "effects": {"clout": 10, "sanity": 5}}
   ]},

  {"id": "x_glitch2", "speaker": "glitch", "topic": "general", "media": "image", "min_day": 12,
   "text": "[reaction image: a tiny boat in a huge storm, captioned 'this group']",
   "choices": [
     {"label": "react ❤️", "act": true, "effects": {"sanity": 10, "drama": -5}},
     {"label": "Glitch is the only one who gets it", "effects": {"clout": 10}},
     {"label": "repost it", "act": true, "effects": {"drama": 5, "clout": 5}}
   ]},

  {"id": "x_uncle", "speaker": "uncle", "topic": "general", "min_day": 10,
   "text": "Why does Auntie Pat post at EXACTLY 6:02am every day? Coincidence? Read the chart.",
   "choices": [
     {"label": "Argue with him", "effects": {"sanity": -16, "drama": 10}},
     {"label": "She has a rooster", "effects": {"clout": 10, "sanity": 5}, "react": [{"speaker": "auntiepat", "text": "His name is Pastor Jenkins 🐓🌺"}]},
     {"label": "ignore him", "act": true, "effects": {"drama": 4}}
   ]},

  {"id": "x_bothsides", "speaker": "bothsides", "topic": "gender", "tags": ["saint"], "min_day": 5,
   "text": "Princess and the Saint both make good points. Also both make bad points. I haven't read either. I'm above it.",
   "choices": [
     {"label": "Fair enough", "hint": "Kimmy hates fence-sitting", "effects": {"drama": -8, "kimmy": -2}},
     {"label": "You're not above it, you're beside it", "spicy": true, "effects": {"clout": 14, "drama": 10}},
     {"label": "ignore him", "act": true, "effects": {"drama": -2}}
   ]},

  {"id": "x_newguy", "speaker": "newguy", "topic": "general", "min_day": 1, "max_day": 3,
   "text": "hey everyone!! just joined, excited to be here 🙂",
   "choices": [
     {"label": "Welcome! Ignore everybody, especially me.", "hint": "protects him", "effects": {"kimmy": 2, "sanity": 5}, "ally": "newguy"},
     {"label": "Oh you have NO idea what you just joined", "effects": {"clout": 10, "drama": 5}},
     {"label": "Quick, which Dave are you voting for", "spicy": true, "hint": "hazing", "effects": {"clout": 10, "kimmy": -2, "drama": 8}}
   ]},

  {"id": "x_newguy2", "speaker": "newguy", "topic": "general", "min_day": 2, "max_day": 3,
   "text": "is there like a pinned post with rules or",
   "choices": [
     {"label": "Rule 1: this is a FAMILY group (Kimmy's words)", "effects": {"kimmy": 2, "sanity": 5}},
     {"label": "Rule 1: Marcus is leaving. Rule 2: he isn't.", "effects": {"clout": 10, "drama": 5}},
     {"label": "Rule 1: send the Catfish your number", "spicy": true, "hint": "hazing", "effects": {"clout": 10, "kimmy": -2, "drama": 8}}
   ]}
]);
