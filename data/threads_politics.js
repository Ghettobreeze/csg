// Threads: Coach (the lone, calm Republican) vs Demmy Debra, Long Division Larry and
// Blue Wave Dave. Tag "political" starts a 3-turn war with a "Coach makes a point" moment.
// No real names: the Democrats never type the former president's name.
globalThis.CSG_DATA = globalThis.CSG_DATA || {};
CSG_DATA.threads = (CSG_DATA.threads || []).concat([
  {"id": "p_name", "speaker": "coach", "topic": "politics", "tags": ["political"], "min_day": 2,
   "text": "I'm just saying, you can disagree with the man and still say his name. It's a name.",
   "choices": [
     {"label": "Coach said the name. Everybody take cover.", "effects": {"drama": 14, "clout": 10}, "react": [{"speaker": "debra", "text": "We do NOT say that name in this group. 💙"}]},
     {"label": "He's not wrong, it's literally just a name", "hint": "sides with Coach", "count": "coach_right", "effects": {"clout": -10, "sanity": 4, "kimmy": 2}, "ally": "coach", "set": "backed_coach"},
     {"label": "watch Debra type in all caps", "act": true, "effects": {"drama": 10}, "react": [{"speaker": "debra", "text": "THAT MAN'S NAME IS A TRIGGER WARNING COACH"}]}
   ]},

  {"id": "p_receipts", "speaker": "coach", "topic": "politics", "tags": ["political"], "min_day": 4,
   "text": "Debra, respectfully, you posted the exact opposite of this in March. I have the screenshot. Not trying to fight.",
   "choices": [
     {"label": "Debra... he has the screenshot", "spicy": true, "effects": {"drama": 18, "clout": 14}, "dunk": "debra", "next": "b"},
     {"label": "Context matters, Coach 💙", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 10, "kimmy": -1}, "dunk": "coach"},
     {"label": "Coach, let it go, it's Tuesday", "effects": {"drama": -6, "sanity": 3}}
   ],
   "beats": {"b": {"speaker": "debra", "text": "That screenshot is OUT OF CONTEXT. In March, the context was different. 💙",
     "choices": [
       {"label": "What was the context in March, Debra", "effects": {"drama": 12, "clout": 10}, "react": [{"speaker": "debra", "text": "It was March, Coach. MARCH."}, {"speaker": "coach", "text": "I'm gonna let that one sit."}]},
       {"label": "Fair, March was a different time", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 8}, "dunk": "coach"},
       {"label": "react 📸", "act": true, "effects": {"clout": 4}}
     ]}}},

  {"id": "p_showwork", "speaker": "coach", "topic": "politics", "tags": ["political"], "min_day": 8,
   "text": "Larry, I'll show my work if you show yours. That's all I've ever asked.",
   "choices": [
     {"label": "Larry is NOT going to show his work", "effects": {"clout": 10, "drama": 10}, "react": [{"speaker": "larry", "text": "Teachers don't show their work. We GRADE it. 📐"}]},
     {"label": "Fair ask, honestly", "hint": "sides with Coach", "count": "coach_right", "effects": {"clout": -10, "sanity": 4, "kimmy": 2}, "ally": "coach", "set": "backed_coach"},
     {"label": "Coach got an F again 💀", "spicy": true, "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 14, "drama": 12, "kimmy": -1}, "dunk": "coach"}
   ]},

  {"id": "p_grill", "speaker": "coach", "topic": "politics", "min_day": 6,
   "text": "Real talk, I'm bringing the grill to the cookout Saturday. Debra, Larry, Dave: y'all eat first. No politics at the grill.",
   "choices": [
     {"label": "Coach is the bigger man every single time", "effects": {"sanity": 8, "drama": -8, "kimmy": 1}, "ally": "coach", "react": [{"speaker": "debra", "text": "...I'll bring the potato salad. Doesn't mean anything. 💙"}]},
     {"label": "The grill is political, Coach", "spicy": true, "effects": {"drama": 16, "clout": 12}, "react": [{"speaker": "larry", "text": "Charcoal emissions. Do the math. 📐"}]},
     {"label": "What are you grilling", "effects": {"sanity": 5}, "react": [{"speaker": "coach", "text": "Ribs. Hot dogs. A veggie burger for Larry. I'm not a monster."}]}
   ]},

  {"id": "p_source", "speaker": "coach", "topic": "politics", "tags": ["political"], "min_day": 11,
   "text": "Dave, you posted 'everyone knows' three times today. Who is everyone? I'd like to meet them.",
   "choices": [
     {"label": "Everyone is Dave's cousin and a podcast", "effects": {"clout": 12, "drama": 10}, "dunk": "bluewave", "react": [{"speaker": "bluewave", "text": "My cousin is VERY informed 🌊"}]},
     {"label": "Coach, everyone knows", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 10, "kimmy": -1}, "dunk": "coach"},
     {"label": "He's got a point, Dave", "hint": "sides with Coach", "count": "coach_right", "effects": {"clout": -8, "sanity": 4, "kimmy": 1}, "ally": "coach"}
   ]},

  {"id": "p_payback", "speaker": "coach", "topic": "politics", "min_day": 13, "requires": ["backed_coach"],
   "text": "Not gonna make a big deal of it, but {name} had my back last week. Plate's on me at the cookout.",
   "choices": [
     {"label": "Extra ribs, Coach", "effects": {"sanity": 8, "kimmy": 1}, "ally": "coach", "react": [{"speaker": "debra", "text": "So we're just picking sides now. Noted. 💙"}]},
     {"label": "I was just being fair, don't make it weird", "effects": {"drama": -5, "clout": 4}},
     {"label": "react 🏈", "act": true, "effects": {"sanity": 3}}
   ]},

  {"id": "p_mob_callback", "speaker": "coach", "topic": "politics", "min_day": 14, "requires": ["mobbed_coach"],
   "text": "{name}, you piled on me last war. No hard feelings. Still saving you a plate. That's the difference.",
   "choices": [
     {"label": "...that actually hurt, Coach", "effects": {"sanity": -4, "drama": -6, "kimmy": 1}, "ally": "coach", "react": [{"speaker": "kimmy", "text": "That's called growth. 🏡"}]},
     {"label": "Keep the plate, keep the speech", "spicy": true, "effects": {"drama": 14, "clout": 10}, "dunk": "coach"},
     {"label": "react 🍽️", "act": true, "effects": {"clout": 3}}
   ]},

  {"id": "p_db_ourguy", "speaker": "debra", "topic": "politics", "tags": ["political"], "min_day": 3,
   "text": "When OUR guy does it, it's strategy. When THEIR guy does it, it's a threat to democracy. It's not complicated, Coach. 💙",
   "choices": [
     {"label": "Debra just explained the double standard herself", "spicy": true, "effects": {"clout": 14, "drama": 16}, "dunk": "debra"},
     {"label": "THIS 💙", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 10, "drama": 8, "kimmy": -1}, "ally": "debra"},
     {"label": "watch Coach type a calm paragraph", "act": true, "effects": {"sanity": 4}, "react": [{"speaker": "coach", "text": "I think if a thing is bad, it's bad for everybody. That's all."}]}
   ]},

  {"id": "p_db_article", "speaker": "debra", "topic": "politics", "tags": ["political"], "min_day": 5,
   "text": "I didn't read the article but I already agree with it. Sharing. 💙",
   "choices": [
     {"label": "Coach read it. It says the opposite.", "spicy": true, "effects": {"drama": 16, "clout": 14}, "react": [{"speaker": "coach", "text": "Paragraph 4. Respectfully."}, {"speaker": "debra", "text": "Paragraph 4 is biased."}]},
     {"label": "That's how I do my taxes too", "effects": {"clout": 10, "sanity": 4}},
     {"label": "share it without reading it either", "act": true, "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 5, "drama": 10, "kimmy": -1}}
   ]},

  {"id": "p_db_context", "speaker": "debra", "topic": "politics", "tags": ["political"], "min_day": 10,
   "text": "Coach keeps saying 'context.' Well, CONTEXT matters, Coach. That's all I'm going to say about context.",
   "choices": [
     {"label": "Debra, what IS the context", "effects": {"drama": 12, "clout": 10}, "react": [{"speaker": "debra", "text": "If you have to ask, you won't understand. 💙"}]},
     {"label": "Context matters, Coach 💙", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 10, "kimmy": -1}, "dunk": "coach"},
     {"label": "Can we not do this today", "hint": "nobody listens", "effects": {"sanity": -4, "drama": -4}}
   ]},

  {"id": "p_db_kimmy", "speaker": "debra", "topic": "politics", "min_day": 15,
   "text": "Kimmy only sells houses to people who agree with her. I have no proof but I believe it with my whole heart. 💙",
   "choices": [
     {"label": "Kimmy sold Larry a condo last year", "effects": {"clout": 10, "drama": 8}, "react": [{"speaker": "larry", "text": "Great school district. Kimmy's an F in politics, A+ in real estate. 📐"}, {"speaker": "kimmy", "text": "Thank you, Larry. 🏡"}]},
     {"label": "Proof is overrated, Debra 💙", "effects": {"drama": 10, "kimmy": -2}, "ally": "debra"},
     {"label": "tag Kimmy", "act": true, "spicy": true, "effects": {"drama": 18}, "react": [{"speaker": "kimmy", "text": "I'd sell YOU a house, Debra. At full asking price. 🏡"}]}
   ]},

  {"id": "p_db_both", "speaker": "debra", "topic": "politics", "tags": ["political"], "min_day": 19,
   "text": "Not EVERY problem is both sides. Some problems are just Coach. 💙",
   "choices": [
     {"label": "Coach is one man in a Facebook group, Debra", "hint": "sides with Coach", "count": "coach_right", "effects": {"clout": -8, "sanity": 4, "kimmy": 2}, "ally": "coach"},
     {"label": "Some problems are just Coach 😂", "spicy": true, "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 14, "drama": 14}, "dunk": "coach"},
     {"label": "react 🙄", "act": true, "effects": {"drama": 3}}
   ]},

  {"id": "p_ld_redpen", "speaker": "larry", "topic": "politics", "tags": ["political"], "min_day": 3,
   "text": "Graded Coach's last post. F. See me after class. 📐❌",
   "choices": [
     {"label": "Larry, you're grading a Facebook comment", "effects": {"clout": 10, "drama": 10}, "dunk": "larry"},
     {"label": "What did Coach get wrong, specifically?", "hint": "Larry can't say", "effects": {"drama": 10, "sanity": 4, "kimmy": 1}, "react": [{"speaker": "larry", "text": "His tone. And his conclusion. And his punctuation was fine, unfortunately."}]},
     {"label": "Coach failed 💀💀", "spicy": true, "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 14, "drama": 12, "kimmy": -1}, "dunk": "coach"}
   ]},

  {"id": "p_ld_word", "speaker": "larry", "topic": "politics", "tags": ["political"], "min_day": 7,
   "text": "Word problem: if a train of bad ideas leaves Coach's house at 3pm, how long until we're all doomed? Show your work. 📐",
   "choices": [
     {"label": "That's not a math problem, that's a feeling", "effects": {"clout": 10, "drama": 10}, "dunk": "larry"},
     {"label": "Answer: 4. Final answer.", "effects": {"sanity": 8, "drama": -5}, "react": [{"speaker": "larry", "text": "...Partial credit."}]},
     {"label": "Coach solved it and Larry marked it wrong", "spicy": true, "effects": {"drama": 16, "clout": 14}, "next": "b"}
   ],
   "beats": {"b": {"speaker": "larry", "text": "Coach's answer was technically correct but EMOTIONALLY wrong. That's a C-. 📐",
     "choices": [
       {"label": "Emotionally wrong isn't a grade, Larry", "hint": "sides with Coach", "count": "coach_right", "effects": {"clout": -6, "sanity": 4, "kimmy": 1}, "ally": "coach"},
       {"label": "C- is generous honestly", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 10}, "dunk": "coach"},
       {"label": "react 📐", "act": true, "effects": {"clout": 3}}
     ]}}},

  {"id": "p_ld_badmath", "speaker": "larry", "topic": "politics", "tags": ["political"], "min_day": 12,
   "text": "Simple math: 3 of us agree, 1 doesn't. That's 80% of the group. Case closed. 📐",
   "choices": [
     {"label": "Larry, that's 75%", "hint": "correcting the teacher", "effects": {"clout": 14, "drama": 12}, "dunk": "larry", "react": [{"speaker": "larry", "text": "I was rounding. Up. For emphasis."}]},
     {"label": "Larry teaches CHILDREN", "spicy": true, "effects": {"clout": 14, "drama": 16}, "dunk": "larry"},
     {"label": "80% sounds right 💙", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 5, "kimmy": -1, "sanity": -4}}
   ]},

  {"id": "p_ld_parent", "speaker": "larry", "topic": "politics", "min_day": 16,
   "text": "Parent-teacher conferences this week. A dad asked if I'm 'the guy who argues on Facebook.' I said no. I'm the guy who WINS.",
   "choices": [
     {"label": "Larry, you've never won", "spicy": true, "effects": {"drama": 14, "clout": 14}, "dunk": "larry"},
     {"label": "Respect for the confidence", "effects": {"clout": 6, "sanity": 4}, "ally": "larry"},
     {"label": "Was it Coach's cousin?", "effects": {"drama": 10, "clout": 8}, "react": [{"speaker": "coach", "text": "...it was my cousin."}]}
   ]},

  {"id": "p_bw_thisone", "speaker": "bluewave", "topic": "politics", "tags": ["political"], "min_day": 2,
   "text": "Mark my words. This election is THE ONE. 🌊🌊🌊 Coach, start packing.",
   "choices": [
     {"label": "Dave, you said this last time", "effects": {"clout": 10, "drama": 10}, "dunk": "bluewave", "react": [{"speaker": "bluewave", "text": "And I'll say it NEXT time. Consistency. 🌊"}]},
     {"label": "Packing for where, Dave?", "effects": {"drama": 5, "sanity": 4}},
     {"label": "🌊🌊🌊", "hint": "joins the mob", "count": "coach_mob", "effects": {"clout": 10, "drama": 10, "kimmy": -1}, "ally": "bluewave"}
   ]},

  {"id": "p_bw_blame", "speaker": "bluewave", "topic": "politics", "tags": ["political"], "min_day": 8,
   "text": "The wave didn't come. I've thought about it, and it's Coach's fault. Personally.",
   "choices": [
     {"label": "Coach is one man in Ohio, Dave", "hint": "sides with Coach", "count": "coach_right", "effects": {"clout": -10, "sanity": 4, "kimmy": 2}, "ally": "coach", "set": "backed_coach"},
     {"label": "Coach did this 🌊😤", "spicy": true, "hint": "joins the mob", "count": "coach_mob", "set": "mobbed_coach", "effects": {"clout": 14, "drama": 14, "kimmy": -1}, "dunk": "coach"},
     {"label": "There's always next time, Dave", "effects": {"sanity": 5, "drama": -5}, "ally": "bluewave"}
   ]},

  {"id": "p_bw_wrongdave", "speaker": "bluewave", "topic": "politics", "tags": ["political"], "min_day": 11,
   "text": "Whoever keeps tagging me at 2am: I am NOT that Dave. I'm the political Dave. 🌊",
   "choices": [
     {"label": "@Dave go to bed", "hint": "tags the wrong Dave", "effects": {"drama": 10, "clout": 10}, "react": [{"speaker": "drunktdave", "text": "wrong dave 🍺"}]},
     {"label": "Honestly y'all should merge", "effects": {"clout": 10, "sanity": 5}},
     {"label": "Coach, which Dave is worse?", "spicy": true, "effects": {"drama": 16, "clout": 10}, "react": [{"speaker": "coach", "text": "I love both Daves. Equally. Next question."}]}
   ]},

  {"id": "p_bw_poll", "speaker": "bluewave", "topic": "politics", "min_day": 17,
   "text": "Ran a poll in my other group. 100% agree with me. Science is settled. 🌊",
   "choices": [
     {"label": "How many people are in the other group, Dave", "effects": {"clout": 10, "drama": 8}, "react": [{"speaker": "bluewave", "text": "Two. Me and my cousin. He voted twice. 🌊"}]},
     {"label": "100% is a strong number 🌊", "effects": {"clout": 6, "kimmy": -1}, "ally": "bluewave"},
     {"label": "Larry, check his math", "spicy": true, "effects": {"drama": 14, "clout": 10}, "react": [{"speaker": "larry", "text": "100% of 2 is... checks out. A. 📐"}]}
   ]},

  {"id": "p_un_charts", "speaker": "uncle", "topic": "politics", "tags": ["political"], "min_day": 6,
   "text": "Coach and Debra are both wrong. Same shadowy group runs both teams. I have charts.",
   "choices": [
     {"label": "Let's see the charts", "effects": {"sanity": -16, "drama": 10}, "react": [{"speaker": "uncle", "text": "[posts 14 charts. One is a map of a mall.]"}]},
     {"label": "ignore him", "act": true, "hint": "he'll post again", "effects": {"drama": 4}},
     {"label": "Tag Coach and Debra", "spicy": true, "effects": {"drama": 22, "clout": 10}}
   ]},

  {"id": "p_bs_same", "speaker": "bothsides", "topic": "politics", "tags": ["political"], "min_day": 9,
   "text": "Coach and Larry are basically the same person. Discuss.",
   "choices": [
     {"label": "Fair enough", "hint": "Kimmy hates fence-sitting", "effects": {"drama": -8, "kimmy": -2}, "ally": "bothsides"},
     {"label": "Tag them both", "spicy": true, "effects": {"drama": 20, "clout": 10}, "react": [{"speaker": "larry", "text": "I will not be compared to a man who uses Comic Sans."}, {"speaker": "coach", "text": "It was ONE flyer, Larry."}]},
     {"label": "Discuss? In THIS group?", "effects": {"clout": 10, "sanity": 5}}
   ]}
]);
