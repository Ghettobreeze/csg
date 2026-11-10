// CSG content (v2). Built from the CSG Character Bible.
// Choices: "label" is exactly what you post. "act": true makes it an italic action
// that posts no bubble. "hint" is the small gray line under the button (auto-filled
// from effects when missing). "decisions" never repeat within a run.
// Effect keys: drama, clout, sanity, members (meters); leak, admin_strikes,
// council_anger, bigmike_escalation, bossbabe_recruit_progress (hidden);
// kimmy (love/hate delta), offense (sexual talk: Kimmy may mute you), defend,
// reveal_secret, princess_meaner, marcus_call, fury (Furious 4 caps mode), beef (Mike vs Princess).
globalThis.CSG_DATA = globalThis.CSG_DATA || {};
CSG_DATA.messages = {
  "decisions": [
    // ---------- Pander Princess ----------
    {"id": "princess_liability", "speaker": "princess", "type": "text", "min_day": 1, "tags": ["princess"],
     "text": "Ladies, if your man isn't constantly proving himself, he's a liability. I said what I said. 👑",
     "choices": [
       {"label": "king behavior 👑", "hint": "ironic", "effects": {"drama": 15, "clout": 10, "sanity": -5}},
       {"label": "screenshot it for the men", "act": true, "spicy": true, "effects": {"drama": 30, "clout": 20, "members": -3}},
       {"label": "Princess, when's the last time YOU proved yourself to anybody?", "spicy": true, "effects": {"drama": 20, "clout": 15}}
     ]},
    {"id": "princess_wyd", "speaker": "princess", "type": "text", "min_day": 1, "tags": ["princess"],
     "text": "Ladies, if a brotha texts 'wyd' after 10pm he already failed. A real man texts 'good morning, queen.'",
     "choices": [
       {"label": "name ONE woman you've texted good morning", "spicy": true, "hint": "the group side-eye", "effects": {"drama": 20, "clout": 15}},
       {"label": "PREACH 👑", "hint": "haters love it, men hate it", "effects": {"drama": 15, "clout": 10}},
       {"label": "it's 9am, let a man wake up first", "effects": {"clout": 10, "sanity": 5}}
     ]},
    {"id": "princess_poll", "speaker": "princess", "type": "text", "min_day": 4, "tags": ["princess"],
     "text": "Poll for the ladies: brothas who split the bill are (a) cheap (b) broke (c) both.",
     "choices": [
       {"label": "(d) Princess has never been on a date", "spicy": true, "effects": {"drama": 25, "clout": 15}},
       {"label": "voted (c), now leave me alone", "effects": {"drama": 10, "sanity": 5}},
       {"label": "report the poll to Kimmy", "act": true, "effects": {"drama": -15, "clout": -5, "kimmy": 1}}
     ]},
    {"id": "princess_essay", "speaker": "princess", "type": "text", "min_day": 6, "tags": ["princess"], "features": ["section8"],
     "text": "The Saint just DM'd me a 900-word essay titled 'Traitor.' Should I post it? Ladies, I'm doing this for y'all.",
     "choices": [
       {"label": "POST IT", "spicy": true, "effects": {"drama": 30, "clout": 15, "leak": 5, "council_anger": 1}},
       {"label": "leave that man alone, he has no friends", "effects": {"drama": -10, "sanity": 5}},
       {"label": "the Saint is the only one in your DMs huh", "spicy": true, "effects": {"clout": 15, "drama": 15}}
     ]},
    {"id": "princess_mike", "speaker": "princess", "type": "text", "min_day": 3, "tags": ["princess"], "features": ["bigmike"],
     "text": "Big Mike's shirtless videos are exactly the energy holding Black men back. Ladies, you deserve a man in a shirt.",
     "choices": [
       {"label": "you watched the whole thing tho", "spicy": true, "hint": "the Seen-by list", "effects": {"clout": 15, "drama": 20}},
       {"label": "for once Princess is right. MIKE. SHIRT.", "effects": {"drama": 5, "clout": 5, "kimmy": 1}},
       {"label": "tag Big Mike", "act": true, "hint": "starts a video beef", "effects": {"drama": 15, "beef": 1}}
     ]},
    {"id": "princess_furious", "speaker": "princess", "type": "text", "min_day": 5, "tags": ["princess"], "features": ["furious4"],
     "text": "@The Furious 4 you're a 10, queen. These brothas just can't handle a woman with standards.",
     "choices": [
       {"label": "a 10 on what scale", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"drama": 20, "clout": 15, "fury": 1}},
       {"label": "Princess hyping her up is so suspicious", "spicy": true, "effects": {"clout": 10, "drama": 10}},
       {"label": "standards are good, y'all", "effects": {"sanity": 5, "drama": -5}}
     ]},

    // ---------- McMan Hater ----------
    {"id": "mcman_read", "speaker": "mcman", "type": "text", "min_day": 1, "tags": [],
     "text": "My man would NEVER leave me on read for 3 hours. Black men really think that's normal 🙄",
     "choices": [
       {"label": "where IS your man tho, we've never seen him", "spicy": true, "effects": {"drama": 20, "clout": 15}},
       {"label": "3 hours is wild, he's wrong for that", "effects": {"clout": 5, "sanity": 5}},
       {"label": "leave it on read for 3 hours", "act": true, "hint": "petty", "effects": {"clout": 10, "drama": 10}}
     ]},
    {"id": "mcman_stats", "speaker": "mcman", "type": "image", "min_day": 2, "tags": ["stats"],
     "text": "[shares an infographic with no source and no labels] Black men, read it and weep 📊",
     "choices": [
       {"label": "source: trust me bro", "effects": {"clout": 15, "drama": 10}},
       {"label": "what does the y-axis even mean", "effects": {"sanity": 5, "drama": 5, "clout": 5}},
       {"label": "facts 💯", "spicy": true, "effects": {"drama": 20, "clout": 5, "kimmy": -1}}
     ]},
    {"id": "mcman_legday", "speaker": "mcman", "type": "text", "min_day": 3, "tags": [],
     "text": "...and that's why I don't date Black men. Anyway, it's leg day 🍑💪",
     "choices": [
       {"label": "the pivot 😭", "effects": {"clout": 10, "sanity": 5}},
       {"label": "you skipped leg day on the logic too", "spicy": true, "effects": {"clout": 15, "drama": 15}},
       {"label": "react 💪", "act": true, "effects": {"sanity": 5}}
     ]},
    {"id": "mcman_flowers", "speaker": "mcman", "type": "text", "min_day": 5, "tags": [],
     "text": "Not me upgrading and y'all still mad 😌 My man brought me flowers TODAY.",
     "choices": [
       {"label": "pics or it didn't happen", "spicy": true, "effects": {"drama": 20, "clout": 10}},
       {"label": "happy for you, genuinely", "effects": {"sanity": 5, "drama": -5, "kimmy": 1}},
       {"label": "flowers from where, the gas station?", "spicy": true, "effects": {"clout": 15, "drama": 15}}
     ]},
    {"id": "mcman_therapy", "speaker": "mcman", "type": "text", "min_day": 7, "tags": [], "features": ["princess"],
     "text": "Black men won't go to therapy but will write 4 paragraphs in a group chat. Make it make sense.",
     "choices": [
       {"label": "you write 4 paragraphs in this group chat daily", "spicy": true, "effects": {"clout": 15, "drama": 15}},
       {"label": "therapy is good for everybody tbh", "effects": {"sanity": 10, "drama": -5}},
       {"label": "tag Pander Princess", "act": true, "hint": "he'll co-sign", "effects": {"drama": 15}}
     ]},
    {"id": "mcman_saint", "speaker": "mcman", "type": "text", "min_day": 9, "tags": ["stats"], "features": ["section8"],
     "text": "Saint, I made a chart about YOU specifically 📊",
     "choices": [
       {"label": "post it", "spicy": true, "effects": {"drama": 25, "clout": 10}},
       {"label": "please don't start the chart war again", "effects": {"drama": -10, "sanity": -5}},
       {"label": "grab popcorn 🍿", "act": true, "effects": {"drama": 15}}
     ]},

    // ---------- Pookie Patrol ----------
    {"id": "pookie_thought", "speaker": "pookie", "type": "text", "min_day": 1, "tags": [],
     "text": "pookie realy thout he did sumthin 💀💀",
     "choices": [
       {"label": "*thought *something", "hint": "correct her grammar", "effects": {"clout": 15, "drama": 10}},
       {"label": "which pookie", "effects": {"drama": 10, "sanity": 5}},
       {"label": "leave it on read", "act": true, "effects": {"sanity": 5}}
     ]},
    {"id": "pookie_period", "speaker": "pookie", "type": "text", "min_day": 2, "tags": [], "features": ["mcman"],
     "text": "McMan said it nicer then i wouldve. pookie is TRASH and dats on period",
     "choices": [
       {"label": "'on period' 😭", "effects": {"clout": 10, "drama": 10}},
       {"label": "y'all not tired?", "effects": {"drama": -5, "sanity": 5}},
       {"label": "pookie can't defend himself, he's at work", "spicy": true, "effects": {"clout": 15, "drama": 15}}
     ]},
    {"id": "pookie_dm", "speaker": "pookie", "type": "text", "min_day": 4, "tags": [],
     "text": "[DM] pookie in da coments typin a hole paragrah 😭 u seen it??",
     "choices": [
       {"label": "I saw it. he spelled everything right tho", "spicy": true, "effects": {"clout": 15, "drama": 15}},
       {"label": "stay out my DMs", "effects": {"drama": 5, "clout": 5}},
       {"label": "screenshot it to the group", "act": true, "spicy": true, "effects": {"drama": 20, "leak": 5}}
     ]},
    {"id": "pookie_princess", "speaker": "pookie", "type": "text", "min_day": 6, "tags": [], "features": ["princess"],
     "text": "Princess da only good 1 in here fr fr 👑 da rest of yall pookies",
     "choices": [
       {"label": "Princess got a fan club of 2", "effects": {"clout": 15, "drama": 10}},
       {"label": "thank you for noticing me", "hint": "you're a pookie now", "effects": {"drama": 15, "clout": 5}},
       {"label": "react 👑", "act": true, "effects": {"sanity": 5}}
     ]},
    {"id": "pookie_spellcheck", "speaker": "pookie", "type": "text", "min_day": 10, "tags": [],
     "text": "i dont need spel chek i need a man who aint a pookie",
     "choices": [
       {"label": "you need both", "spicy": true, "effects": {"clout": 15, "drama": 15}},
       {"label": "valid", "effects": {"sanity": 5}},
       {"label": "spell pookie tho", "hint": "she'll nail it", "effects": {"drama": 5, "clout": 10}}
     ]},

    // ---------- The Section 8 Saint ----------
    {"id": "saint_highvalue", "speaker": "section8", "type": "text", "min_day": 1, "tags": ["council"],
     "text": "The Council has voted. 1–0. A high-value woman cooks, cleans and never raises her voice.",
     "choices": [
       {"label": "who's on the Council besides you", "spicy": true, "effects": {"drama": 20, "clout": 15}},
       {"label": "motion denied", "effects": {"clout": 10, "drama": 10}},
       {"label": "scroll past", "act": true, "effects": {"sanity": -5, "drama": -5}}
     ]},
    {"id": "saint_chart", "speaker": "section8", "type": "image", "min_day": 3, "tags": ["council", "stats"],
     "text": "[posts a chart about women. Source: 'trust me.']",
     "choices": [
       {"label": "same source as McMan's chart", "effects": {"clout": 15, "drama": 10}},
       {"label": "fact-check it", "act": true, "effects": {"sanity": -10, "clout": 10}},
       {"label": "the Council stays undefeated", "spicy": true, "effects": {"clout": 5, "sanity": -10, "kimmy": -1}}
     ]},
    {"id": "saint_single", "speaker": "section8", "type": "text", "min_day": 5, "tags": ["council"],
     "text": "On behalf of the Council, I'm disappointed in this group. Also I'm single by choice. My choice. Strategy.",
     "choices": [
       {"label": "since 2017?", "spicy": true, "effects": {"clout": 15, "drama": 15}},
       {"label": "respect the strategy", "effects": {"clout": 5, "sanity": -5}},
       {"label": "the Council needs a hug", "effects": {"drama": -10, "sanity": 5}}
     ]},
    {"id": "saint_groceries", "speaker": "section8", "type": "text", "min_day": 7, "tags": ["council"], "features": ["auntiepat"],
     "text": "Saw someone judge a stranger's groceries. Disgusting. Anyway, here's my 3-day series judging groceries.",
     "choices": [
       {"label": "you just did the thing", "spicy": true, "effects": {"clout": 15, "drama": 15}},
       {"label": "@Auntie Pat get your nephew", "effects": {"drama": -10, "council_anger": -2}},
       {"label": "Council approved ✅", "spicy": true, "effects": {"clout": 5, "sanity": -15, "kimmy": -1}}
     ]},
    {"id": "tiffany_saint", "speaker": "tiffany", "type": "text", "min_day": 2, "tags": ["council"], "features": ["section8"],
     "text": "Honestly the Saint kind of has a point?? Like we could all be a little softer 🥺",
     "choices": [
       {"label": "Tiffany, he does not have a point", "effects": {"clout": 5, "drama": 5}},
       {"label": "defend her from the dogpile", "act": true, "effects": {"defend": 1, "clout": -10, "kimmy": 1}},
       {"label": "the Council has 2 members now 😭", "spicy": true, "effects": {"clout": 15, "drama": 15}}
     ]},
    {"id": "auntie_council", "speaker": "auntiepat", "type": "text", "min_day": 6, "tags": [], "features": ["section8"],
     "text": "Saint, I don't know what a Red Pill Council is, but you need to call your mother 🌺",
     "choices": [
       {"label": "'call your mother' 💀", "effects": {"clout": 10, "drama": 10}},
       {"label": "Auntie Pat said what needed to be said", "effects": {"drama": -15, "council_anger": -2, "kimmy": 1}},
       {"label": "Auntie, he IS the Council", "effects": {"drama": 10, "sanity": 5}}
     ]},

    // ---------- The Furious 4 ----------
    {"id": "f4_requirements", "speaker": "furious4", "type": "text", "min_day": 1, "tags": [],
     "text": "My requirements are simple: 6'4+, six figures, owns land, likes my cat, ready to propose by date 3. Why is that so hard 😤",
     "choices": [
       {"label": "what do YOU bring to the table?", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"drama": 15, "clout": 15, "fury": 1}},
       {"label": "have you tried a man who owns a shed", "effects": {"clout": 10, "drama": 5}},
       {"label": "you deserve the best, queen", "hint": "Princess energy", "effects": {"clout": -5, "sanity": 5}}
     ]},
    {"id": "f4_nice", "speaker": "furious4", "type": "text", "min_day": 3, "tags": [],
     "text": "Went on 4 dates this week. All of them were 'nice.' That's how you KNOW something's wrong with these men.",
     "choices": [
       {"label": "nice is a red flag now??", "effects": {"clout": 10, "drama": 10}},
       {"label": "send her a 🚩", "act": true, "spicy": true, "hint": "she goes ALL CAPS", "effects": {"drama": 15, "clout": 10, "fury": 1}},
       {"label": "4 dates is a lot of effort, respect", "effects": {"sanity": 5}}
     ]},
    {"id": "f4_puddle", "speaker": "furious4", "type": "text", "min_day": 6, "tags": [],
     "text": "As a 10, I shouldn't even have to say this, but the dating pool in this city is a PUDDLE.",
     "choices": [
       {"label": "a 10 out of what", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"drama": 20, "clout": 15, "fury": 1}},
       {"label": "puddles are deep if you're nice to them", "effects": {"sanity": 5, "clout": 5}},
       {"label": "tag Pander Princess", "act": true, "hint": "he'll hype her up", "effects": {"drama": 10}}
     ]},
    {"id": "f4_saint", "speaker": "furious4", "type": "text", "min_day": 8, "tags": [], "features": ["section8"],
     "text": "The Saint just told me my standards are 'unrealistic.' This man has been single since 2017.",
     "choices": [
       {"label": "you two should date", "spicy": true, "effects": {"drama": 30, "clout": 15, "council_anger": 1}},
       {"label": "single since 2017 and single since 2017, name a better duo", "spicy": true, "effects": {"clout": 15, "drama": 15}},
       {"label": "y'all both need a nap", "effects": {"drama": -5, "sanity": 5}}
     ]},
    {"id": "f4_hey", "speaker": "furious4", "type": "text", "min_day": 11, "tags": [],
     "text": "Some man DM'd me 'hey.' Just 'hey.' Does he not know who I am??",
     "choices": [
       {"label": "who are you", "spicy": true, "hint": "she goes ALL CAPS", "effects": {"clout": 15, "drama": 15, "fury": 1}},
       {"label": "'hey' is how it starts, give him a chance", "effects": {"sanity": 5, "kimmy": 1}},
       {"label": "block him, queen", "effects": {"clout": 5, "drama": 5}}
     ]},

    // ---------- Big Mike ----------
    {"id": "mike_amarillo", "speaker": "bigmike", "type": "text", "min_day": 2, "tags": [],
     "text": "Breakfast at a truck stop in Amarillo. Ate it shirtless. Respect the process.",
     "choices": [
       {"label": "MIKE. A SHIRT. PLEASE.", "hint": "never works", "effects": {"sanity": 5}},
       {"label": "respect the process 🫡", "effects": {"clout": 10, "sanity": 5}},
       {"label": "mute Mike", "act": true, "effects": {"sanity": 5, "bigmike_escalation": 1}}
     ]},
    {"id": "mike_advice", "speaker": "bigmike", "type": "text", "min_day": 5, "tags": [], "features": ["princess"],
     "text": "Relationship advice from the cab: if she's mad, drive 600 miles. Works every time.",
     "choices": [
       {"label": "that's just leaving, Mike", "effects": {"clout": 10, "drama": 10}},
       {"label": "put that on a shirt. then WEAR the shirt", "effects": {"clout": 10, "sanity": 5}},
       {"label": "tag Pander Princess", "act": true, "hint": "starts a video beef", "effects": {"drama": 15, "beef": 1}}
     ]},
    {"id": "mike_loyalty", "speaker": "bigmike", "type": "text", "min_day": 10, "tags": [],
     "text": "Loyalty is free. Shirts cost money. That's all I'll say.",
     "choices": [
       {"label": "shirts are like $4, Mike", "effects": {"clout": 10, "drama": 5}},
       {"label": "deep", "effects": {"sanity": 5}},
       {"label": "send him a shirt off Amazon", "act": true, "hint": "he won't wear it", "effects": {"sanity": 10, "clout": -5}}
     ]},

    // ---------- The Catfish ----------
    {"id": "cat_potato", "speaker": "catfish", "type": "text", "min_day": 1, "tags": [],
     "text": "y'all are fighting about the cookout AGAIN 😭 we can't even agree on potato salad",
     "choices": [
       {"label": "raisins in potato salad is a war crime", "effects": {"drama": -10, "sanity": 10, "clout": 5}},
       {"label": "stay out of it, Catfish", "effects": {"drama": 5}},
       {"label": "react 😂", "act": true, "effects": {"sanity": 5, "drama": -5}}
     ]},
    {"id": "cat_ruling", "speaker": "catfish", "type": "text", "min_day": 4, "tags": [], "features": ["coach", "debra"],
     "text": "Coach, Debra, I'm settling this: you both lose. Next topic 🎉",
     "choices": [
       {"label": "the judge has spoken", "effects": {"drama": -15, "sanity": 5}},
       {"label": "Coach was right tho", "hint": "sides with Coach", "effects": {"drama": 10, "kimmy": 1}},
       {"label": "react 😂", "act": true, "effects": {"sanity": 5}}
     ]},
    {"id": "cat_marcus", "speaker": "catfish", "type": "text", "min_day": 7, "tags": [], "features": ["marcus", "kimmy"],
     "text": "ok Marcus since you're leaving anyway... goodbye gift? 🍆👀",
     "choices": [
       {"label": "MARCUS DON'T", "effects": {"drama": 5, "sanity": 5}},
       {"label": "Marcus, it's for the culture", "spicy": true, "effects": {"offense": 1, "drama": 20, "clout": 10, "leak": 10}},
       {"label": "report it to Kimmy", "act": true, "effects": {"members": -5, "leak": -15, "kimmy": 2}}
     ]},
    {"id": "cat_mike", "speaker": "catfish", "type": "text", "min_day": 9, "tags": [], "features": ["bigmike", "kimmy"],
     "text": "Mike the shirt is already off, you're halfway there 😩🍆",
     "choices": [
       {"label": "she's got a point, Mike", "spicy": true, "effects": {"offense": 1, "drama": 20, "clout": 10}},
       {"label": "report it to Kimmy", "act": true, "effects": {"members": -5, "leak": -15, "kimmy": 2}},
       {"label": "Catfish please, Kimmy is typing", "effects": {"drama": -5, "sanity": 5}}
     ]},

    // ---------- Kimmy ----------
    {"id": "kimmy_fenced", "speaker": "kimmy", "type": "text", "min_day": 1, "tags": [],
     "text": "Speaking of toxic relationships, this 3bd/2ba has a FENCED yard 🏡 DM me! — Kimmy K. | Your Home, Your Future™",
     "choices": [
       {"label": "Kimmy, nobody said toxic", "effects": {"clout": 10, "drama": 5, "kimmy": -1}},
       {"label": "what's the HOA like", "hint": "she will tell you", "effects": {"sanity": -10, "kimmy": 2}},
       {"label": "share the listing", "act": true, "effects": {"kimmy": 2, "clout": -5}}
     ]},
    {"id": "kimmy_family", "speaker": "kimmy", "type": "text", "min_day": 2, "tags": [], "features": ["catfish"],
     "text": "Reminder: this is a FAMILY group. I will be muting anyone who brings up anything inappropriate. You know who you are. 🙂",
     "choices": [
       {"label": "yes ma'am", "effects": {"kimmy": 2, "clout": -5}},
       {"label": "define inappropriate", "spicy": true, "effects": {"kimmy": -2, "drama": 15, "clout": 10}},
       {"label": "tag the Catfish", "act": true, "hint": "chaos", "effects": {"drama": 20, "kimmy": -1}}
     ]},
    {"id": "kimmy_openhouse", "speaker": "kimmy", "type": "text", "min_day": 6, "tags": [], "features": ["bossbabe"],
     "text": "Open house Saturday! Bring your family, your friends and your pre-approval letter 🏡",
     "choices": [
       {"label": "is this a pyramid scheme", "spicy": true, "effects": {"kimmy": -2, "clout": 15, "drama": 10}},
       {"label": "I'll be there", "effects": {"kimmy": 2, "sanity": -5}},
       {"label": "Boss Babe is gonna show up selling leggings", "effects": {"clout": 10, "drama": 10}}
     ]},
    {"id": "kimmy_menace", "speaker": "kimmy", "type": "text", "min_day": 12, "tags": [],
     "text": "[DM] You are a MENACE in that group. ...Also I saw a condo and thought of you 🏡",
     "choices": [
       {"label": "is this love or a threat", "effects": {"clout": 5, "kimmy": 1}},
       {"label": "send the condo", "effects": {"kimmy": 2, "sanity": 5}},
       {"label": "I'm telling Big Bro you DM'd me", "spicy": true, "effects": {"kimmy": -3, "drama": 10, "clout": 10}}
     ]},

    // ---------- Coach vs the Democrats ----------
    {"id": "coach_source", "speaker": "coach", "type": "text", "min_day": 2, "tags": ["political"], "features": ["debra"],
     "text": "Debra, I'm happy to discuss it. Can you link where you read that?",
     "choices": [
       {"label": "Coach asked a reasonable question and y'all are mad", "hint": "sides with Coach", "effects": {"kimmy": 1, "clout": -10, "sanity": 5}},
       {"label": "Coach, nobody asked for your sources", "spicy": true, "hint": "joins the mob", "effects": {"clout": 15, "drama": 15, "kimmy": -1}},
       {"label": "grab popcorn 🍿", "act": true, "effects": {"drama": 10}}
     ]},
    {"id": "debra_strategy", "speaker": "debra", "type": "text", "min_day": 3, "tags": ["political"],
     "text": "When OUR guy does it, it's strategy. When THEIR guy does it, it's a threat to democracy. It's not complicated.",
     "choices": [
       {"label": "it is a little complicated, Debra", "hint": "sides with Coach", "effects": {"kimmy": 1, "clout": -10, "drama": 10}},
       {"label": "💙💙💙", "spicy": true, "hint": "joins the mob", "effects": {"clout": 10, "drama": 15}},
       {"label": "leave it on read", "act": true, "effects": {"sanity": 5}}
     ]},
    {"id": "larry_redpen", "speaker": "larry", "type": "text", "min_day": 4, "tags": ["political"], "features": ["coach"],
     "text": "Graded Coach's last post. F. See me after class. 📐",
     "choices": [
       {"label": "Larry, you added it wrong. It's a C.", "hint": "sides with Coach", "effects": {"clout": 10, "drama": 15, "kimmy": 1}},
       {"label": "Coach got EXPELLED", "spicy": true, "hint": "joins the mob", "effects": {"clout": 15, "drama": 20}},
       {"label": "react 💀", "act": true, "effects": {"drama": 5, "clout": 5}}
     ]},
    {"id": "larry_wordproblem", "speaker": "larry", "type": "text", "min_day": 8, "tags": ["political"], "features": ["coach"],
     "text": "Word problem: if the orange one tells 30,000 lies and Coach believes half, how many brain cells does Coach have left? Show your work.",
     "choices": [
       {"label": "Larry, that's not how word problems work", "hint": "sides with Coach", "effects": {"clout": 10, "drama": 10, "kimmy": 1}},
       {"label": "zero, carry the Coach", "spicy": true, "hint": "joins the mob", "effects": {"clout": 15, "drama": 20, "kimmy": -1}},
       {"label": "solve it wrong on purpose", "act": true, "effects": {"clout": 10, "drama": 5}}
     ]},
    {"id": "wave_thisone", "speaker": "bluewave", "type": "text", "min_day": 3, "tags": ["political"],
     "text": "This is the one. Blue wave incoming 🌊🌊🌊 Mark my words.",
     "choices": [
       {"label": "you said that last time", "spicy": true, "effects": {"clout": 15, "drama": 15}},
       {"label": "🌊", "effects": {"clout": 5, "drama": 5}},
       {"label": "marked. see you in November", "effects": {"clout": 10, "sanity": 5}}
     ]},
    {"id": "wave_blame", "speaker": "bluewave", "type": "text", "min_day": 9, "tags": ["political"], "features": ["coach", "drunktdave"],
     "text": "If the wave doesn't happen this time, it's because of people like COACH.",
     "choices": [
       {"label": "Coach is one guy in a group chat", "hint": "sides with Coach", "effects": {"kimmy": 1, "clout": -5, "sanity": 5}},
       {"label": "Coach did this 🌊", "spicy": true, "hint": "joins the mob", "effects": {"clout": 10, "drama": 15}},
       {"label": "tag the wrong Dave", "act": true, "effects": {"drama": 10, "clout": 10}}
     ]},
    {"id": "coach_name", "speaker": "coach", "type": "system", "min_day": 6, "tags": ["political"], "features": ["debra"],
     "text": "[Coach typed the former president's full name] — Debra has left the chat. Debra has rejoined the chat.",
     "choices": [
       {"label": "Coach SAID it 😭", "effects": {"drama": 15, "clout": 10}},
       {"label": "it's just a name, y'all", "hint": "sides with Coach", "effects": {"kimmy": 1, "clout": -5, "drama": 10}},
       {"label": "screenshot the chaos", "act": true, "spicy": true, "effects": {"leak": 5, "drama": 15, "clout": 10}}
     ]},
    {"id": "coach_car", "speaker": "coach", "type": "text", "min_day": 13, "tags": ["political"], "features": ["debra", "shady"],
     "text": "Debra, I disagree with everything you post, but if your car breaks down I'm coming. That's the group.",
     "choices": [
       {"label": "most wholesome post in group history", "effects": {"drama": -15, "sanity": 10, "kimmy": 1}},
       {"label": "Debra, say it back", "spicy": true, "effects": {"drama": 15, "clout": 10}},
       {"label": "screenshot it for Shady", "act": true, "spicy": true, "effects": {"leak": 5, "drama": 10}}
     ]},
    {"id": "bothsides_politics", "speaker": "bothsides", "type": "text", "min_day": 7, "tags": ["political"], "features": ["coach", "debra"],
     "text": "Coach and Debra are basically the same person. Discuss.",
     "choices": [
       {"label": "they are NOT", "effects": {"drama": 15, "clout": 5}},
       {"label": "he's got a point", "effects": {"drama": -10, "kimmy": -1}},
       {"label": "tag them both", "act": true, "spicy": true, "effects": {"drama": 25, "clout": 10}}
     ]},
    {"id": "uncle_charts", "speaker": "uncle", "type": "text", "min_day": 10, "tags": ["political"], "features": ["coach", "debra"],
     "text": "Coach AND Debra are both wrong. It's the same shadowy group running both teams. I have charts.",
     "choices": [
       {"label": "post the charts", "effects": {"sanity": -20, "drama": 10}},
       {"label": "ignore him", "act": true, "effects": {"drama": 5}},
       {"label": "Uncle, Coach is the only one making sense in here", "hint": "sides with Coach", "effects": {"kimmy": 1, "clout": -10, "drama": 10}}
     ]},

    // ---------- Auntie Pat ----------
    {"id": "auntie_password", "speaker": "auntiepat", "type": "text", "min_day": 1, "tags": ["morning"],
     "text": "GOOD MORNING 🌺 Did you know if you type your password in ALL CAPS it becomes encrypted? Share to protect your family!!",
     "choices": [
       {"label": "Auntie, that's not how passwords work", "effects": {"sanity": -10, "clout": 5, "drama": 5}},
       {"label": "share it", "act": true, "spicy": true, "effects": {"drama": 10, "clout": -5}},
       {"label": "Thank you Auntie Pat 🌺", "effects": {"sanity": 5, "drama": -5, "kimmy": 1}}
     ]},
    {"id": "auntie_shirt", "speaker": "auntiepat", "type": "text", "min_day": 4, "tags": [], "features": ["bigmike"],
     "text": "BABY PUT ON A SHIRT 🌺 your mother raised you better than that, Michael",
     "choices": [
       {"label": "Auntie used the government name 😭", "effects": {"clout": 10, "drama": 5}},
       {"label": "listen to your auntie, Mike", "effects": {"sanity": 5, "kimmy": 1}},
       {"label": "send Mike a 👕", "act": true, "effects": {"sanity": 5}}
     ]},
    {"id": "auntie_wronggroup", "speaker": "auntiepat", "type": "text", "min_day": 10, "tags": [], "features": ["marcus"],
     "text": "Happy birthday Marcus!!! 🎉 (sorry wrong group) (sorry wrong person) (is this Facebook)",
     "choices": [
       {"label": "Happy birthday Marcus!! (it's not his birthday)", "effects": {"sanity": 10, "drama": -5}},
       {"label": "Auntie Pat is the main character", "effects": {"clout": 10, "drama": 5}},
       {"label": "screenshot it", "act": true, "spicy": true, "effects": {"clout": 10, "leak": 5, "drama": 5}}
     ]},

    // ---------- Big Bro ----------
    {"id": "bigbro_return", "speaker": "bigbro", "type": "text", "min_day": 4, "tags": [], "features": ["kimmy"],
     "text": "First post this year. Whoever keeps reporting Kimmy's listings: I see you.",
     "choices": [
       {"label": "welcome back king 👑", "effects": {"clout": 5, "sanity": 5}},
       {"label": "it wasn't me (it was)", "spicy": true, "effects": {"drama": 15, "clout": 10, "kimmy": -2}},
       {"label": "drop a verse while you're here", "hint": "he might", "effects": {"clout": 10, "drama": -5}}
     ]},
    {"id": "bigbro_poll", "speaker": "bigbro", "type": "text", "min_day": 9, "tags": [], "features": ["kimmy"],
     "text": "Poll: should I delete this group? Voting closes when I feel like it.",
     "choices": [
       {"label": "vote no, I'm begging", "effects": {"clout": -10, "drama": -10}},
       {"label": "vote yes for the plot", "spicy": true, "effects": {"drama": 25, "clout": 10}},
       {"label": "tag Kimmy to talk him down", "act": true, "effects": {"drama": -15, "kimmy": 1}}
     ]},

    {"id": "bigbro_verse", "speaker": "bigbro", "type": "text", "min_day": 14, "tags": [], "features": ["marcus", "kimmy"],
     "text": "Group been wildin', I been on the low / Marcus still leaving, Kimmy still selling homes / y'all need Jesus and a better wifi zone 🎤",
     "choices": [
       {"label": "BIG BRO SNAPPED 🔥", "effects": {"clout": 10, "sanity": 5}},
       {"label": "that last bar didn't rhyme", "spicy": true, "effects": {"drama": 15, "clout": 15}},
       {"label": "reply with a verse of your own", "act": true, "hint": "Big Bro respects it", "effects": {"clout": 10, "drama": 5}}
     ]},
    {"id": "larry_curve", "speaker": "larry", "type": "text", "min_day": 12, "tags": ["political"], "features": ["coach", "debra"],
     "text": "Grading on a curve today. Debra gets an A. Blue Wave gets an A. Coach gets a 'see me.' 📐",
     "choices": [
       {"label": "Larry, that's not a curve, that's a team", "hint": "sides with Coach", "effects": {"clout": 10, "drama": 10, "kimmy": 1}},
       {"label": "Coach failing in real time 😂", "spicy": true, "hint": "joins the mob", "effects": {"clout": 15, "drama": 15, "kimmy": -1}},
       {"label": "ask for extra credit", "act": true, "effects": {"sanity": 5, "clout": 5}}
     ]},

    // ---------- Shady + the Lurker ----------
    {"id": "shady_screenshot", "speaker": "shady", "type": "system", "min_day": 2, "tags": [],
     "text": "📸 [Shady took a screenshot. Three dots appeared in another group.]",
     "choices": [
       {"label": "who's that for, Shady", "effects": {"drama": 10, "sanity": -5}},
       {"label": "delete your last message", "act": true, "effects": {"leak": -15, "clout": -10}},
       {"label": "say cheese 📸", "spicy": true, "effects": {"clout": 15, "drama": 10}}
     ]},
    {"id": "shady_famous", "speaker": "shady", "type": "system", "min_day": 7, "tags": [], "features": ["lurker"],
     "text": "[Shady sent you a screenshot of YOUR post in another group. 400 laughing reactions. One of them is 👁️.]",
     "choices": [
       {"label": "Shady please take it down", "effects": {"leak": -20, "clout": -15}},
       {"label": "400? I'm famous", "spicy": true, "effects": {"clout": 20, "drama": 10}},
       {"label": "go private for a day", "act": true, "effects": {"leak": -10, "sanity": -5, "clout": -5}}
     ]},
    {"id": "lurker_2019", "speaker": "lurker", "type": "system", "min_day": 3, "tags": [],
     "text": "[👁️ reacted 😂 to your message from 2019]",
     "choices": [
       {"label": "say something, coward", "effects": {"drama": 10, "sanity": -5}},
       {"label": "react 👁️ back", "act": true, "effects": {"clout": 10}},
       {"label": "delete the 2019 message", "act": true, "effects": {"leak": -10, "clout": -5}}
     ]},
    {"id": "lurker_power", "speaker": "brittany", "type": "text", "min_day": 12, "tags": [], "features": ["lurker"],
     "text": "👁️ has seen every message in this group for six years and never said a word. Most powerful man here.",
     "choices": [
       {"label": "he IS the group", "effects": {"clout": 10, "sanity": 5}},
       {"label": "👁️ pick a side", "spicy": true, "effects": {"drama": 20, "clout": 10}},
       {"label": "say nothing out of respect", "act": true, "effects": {"sanity": 5, "drama": -5}}
     ]},

    // ---------- Marcus + Brittany ----------
    {"id": "marcus_farewell", "speaker": "marcus", "type": "text", "min_day": 2, "tags": [],
     "text": "Today is my last day in this group. I've already written my farewell post. It's 11 paragraphs.",
     "choices": [
       {"label": "see you next Sunday", "spicy": true, "effects": {"clout": 15, "drama": 10}},
       {"label": "don't go, Marcus 🥺", "effects": {"clout": -5, "sanity": 5, "kimmy": 1}},
       {"label": "read all 11 paragraphs", "act": true, "effects": {"sanity": -15, "drama": 5}}
     ]},
    {"id": "marcus_back", "speaker": "marcus", "type": "text", "min_day": 9, "tags": [],
     "text": "Didn't leave. Got a notification. Anyway, who's going to the cookout?",
     "choices": [
       {"label": "welcome back ❤️", "effects": {"sanity": 5, "clout": -5}},
       {"label": "repost his goodbye from Sunday", "act": true, "spicy": true, "effects": {"clout": 15, "drama": 15, "leak": 5}},
       {"label": "leave it on read", "act": true, "effects": {"drama": -5}}
     ]},
    {"id": "brittany_40", "speaker": "brittany", "type": "text", "min_day": 2, "tags": [],
     "text": "Not gonna name names but someone in here owes me $40 from 2019. And a hoodie.",
     "choices": [
       {"label": "name names", "spicy": true, "effects": {"drama": 25, "clout": 10}},
       {"label": "send her $40 to end it", "act": true, "effects": {"sanity": 10, "clout": -10, "drama": -10}},
       {"label": "what color was the hoodie", "effects": {"drama": 10, "sanity": -5}}
     ]},
    {"id": "brittany_dave", "speaker": "brittany", "type": "text", "min_day": 6, "tags": [], "features": ["drunktdave", "bluewave"],
     "text": "@Dave you know what you did. Not you, Blue Wave. The OTHER Dave.",
     "choices": [
       {"label": "which Dave did what 👀", "spicy": true, "effects": {"drama": 25, "clout": 10}},
       {"label": "both Daves are innocent until 2am", "effects": {"clout": 10, "sanity": 5}},
       {"label": "tag both Daves", "act": true, "effects": {"drama": 15, "clout": 5}}
     ]},

    // ---------- Drunk Dave (night only) ----------
    {"id": "dave_typing", "speaker": "drunktdave", "type": "text", "min_day": 2, "tags": ["night"], "features": ["brittany"],
     "text": "not to be messy but brittany used to date someone in this chat and he's TYPING RIGHT NOW",
     "choices": [
       {"label": "Dave go to bed", "effects": {"drama": -10, "sanity": 5}},
       {"label": "WHO????", "spicy": true, "effects": {"drama": 30, "clout": 10}},
       {"label": "screenshot it", "act": true, "spicy": true, "effects": {"leak": 10, "drama": 15, "clout": 10}}
     ]},
    {"id": "dave_outside", "speaker": "drunktdave", "type": "text", "min_day": 4, "tags": ["night"], "features": ["coach", "debra"],
     "text": "i love this group. i love u all. even coach. even debra. COME OUTSIDE",
     "choices": [
       {"label": "Dave drink water", "effects": {"sanity": 5, "drama": -5}},
       {"label": "Dave just ended the war", "effects": {"drama": -15, "sanity": 5}},
       {"label": "send him a voice note back", "act": true, "spicy": true, "effects": {"drama": 15, "sanity": -10, "clout": 10}}
     ]},
    {"id": "dave_wrongdave", "speaker": "drunktdave", "type": "text", "min_day": 6, "tags": ["night"], "features": ["bluewave"],
     "text": "who keeps tagging me in politics. im the DRUNK dave. the wave one is asleep",
     "choices": [
       {"label": "Dave, you ARE the wave", "effects": {"clout": 10, "drama": 5}},
       {"label": "go to sleep, Dave", "effects": {"sanity": 5, "drama": -5}},
       {"label": "tag Blue Wave Dave", "act": true, "spicy": true, "effects": {"drama": 20, "clout": 10}}
     ]},
    {"id": "dave_cookout", "speaker": "drunktdave", "type": "text", "min_day": 8, "tags": ["night"],
     "text": "okay but does anyone else remember what happened at the cookout in 2021 or are we all pretending",
     "choices": [
       {"label": "go on...", "spicy": true, "effects": {"drama": 25, "sanity": -10}},
       {"label": "Dave it's 2am", "effects": {"drama": -10, "sanity": 5}}
     ]},

    // ---------- Tiffany + Boss Babe ----------
    {"id": "tiffany_grace", "speaker": "tiffany", "type": "text", "min_day": 4, "tags": [], "features": ["section8"],
     "text": "I just think men deserve a little grace sometimes...",
     "choices": [
       {"label": "defend her", "act": true, "effects": {"defend": 1, "clout": -10, "kimmy": 1}},
       {"label": "say nothing", "act": true, "effects": {"sanity": -15}},
       {"label": "Tiffany, the Saint is not your friend", "effects": {"clout": 5, "drama": 5}}
     ]},
    {"id": "tiffany_sorry", "speaker": "tiffany", "type": "text", "min_day": 10, "tags": [], "features": ["princess", "section8"],
     "text": "Sorry for what I said about the Saint. Also sorry to the Saint. Also sorry to Princess. I'm just sorry.",
     "choices": [
       {"label": "apology accepted, Tiff", "effects": {"defend": 1, "clout": -5, "sanity": 5, "kimmy": 1}},
       {"label": "accepted. who are you", "spicy": true, "effects": {"clout": 10, "drama": 10}},
       {"label": "react ❤️", "act": true, "effects": {"sanity": 5, "drama": -5}}
     ]},
    {"id": "bossbabe_tiffany", "speaker": "bossbabe", "type": "text", "min_day": 3, "tags": [], "features": ["tiffany"],
     "text": "Tiffany just liked my post 👀 that's basically a yes. Welcome to the team, hun!!",
     "choices": [
       {"label": "Tiffany RUN", "effects": {"bossbabe_recruit_progress": -3, "clout": -5, "kimmy": 1}},
       {"label": "that's not how likes work", "spicy": true, "effects": {"clout": 15, "drama": 10, "bossbabe_recruit_progress": -1}},
       {"label": "let it happen", "act": true, "hint": "Tiffany gets recruited", "effects": {"bossbabe_recruit_progress": 2, "sanity": 5}}
     ]},
    {"id": "bossbabe_freedom", "speaker": "bossbabe", "type": "text", "min_day": 8, "tags": [],
     "text": "Hey hun!! 💖 Long time no talk! Quick question: have you heard of financial freedom?",
     "choices": [
       {"label": "no, hun", "effects": {"clout": 10, "drama": 5}},
       {"label": "buy leggings to make it stop", "act": true, "effects": {"sanity": 5, "clout": -10}},
       {"label": "screenshot it to the group", "act": true, "spicy": true, "effects": {"drama": 20, "clout": 10, "leak": 5}}
     ]},

    // ---------- Bench ----------
    {"id": "glitch_raccoon", "speaker": "glitch", "type": "image", "min_day": 2, "tags": [],
     "text": "[reaction image: a raccoon holding a single grape, staring into the distance]",
     "choices": [
       {"label": "react 😂", "act": true, "effects": {"sanity": 10}},
       {"label": "what does it MEAN, Glitch", "effects": {"sanity": -5, "drama": 5}},
       {"label": "make it your profile pic", "act": true, "effects": {"clout": 10, "sanity": 5}}
     ]},
    {"id": "glitch_boat", "speaker": "glitch", "type": "image", "min_day": 12, "tags": [],
     "text": "[reaction image: a tiny boat in a huge storm, captioned 'this group']",
     "choices": [
       {"label": "react ❤️", "act": true, "effects": {"sanity": 10, "drama": -5}},
       {"label": "Glitch is the only one who gets it", "effects": {"clout": 10}},
       {"label": "repost it", "act": true, "effects": {"drama": 5, "clout": 5}}
     ]},
    {"id": "uncle_auntie", "speaker": "uncle", "type": "text", "min_day": 5, "tags": [], "features": ["auntiepat"],
     "text": "Why does Auntie Pat post at EXACTLY 6:02am every day? Coincidence? Read the chart.",
     "choices": [
       {"label": "she has a rooster", "effects": {"clout": 10, "sanity": 5}},
       {"label": "argue with him", "act": true, "effects": {"sanity": -20, "drama": 10}},
       {"label": "ignore him", "act": true, "effects": {"drama": 5}}
     ]},
    {"id": "bothsides_princess", "speaker": "bothsides", "type": "text", "min_day": 5, "tags": [], "features": ["princess", "section8"],
     "text": "Princess and the Saint both make good points. Also both make bad points. I'm above it.",
     "choices": [
       {"label": "you're not above it, you're beside it", "spicy": true, "effects": {"clout": 15, "drama": 10}},
       {"label": "back him", "act": true, "effects": {"drama": -10, "kimmy": -2}},
       {"label": "ignore him", "act": true, "effects": {"sanity": -5}}
     ]},
    {"id": "newguy_hi", "speaker": "newguy", "type": "text", "min_day": 1, "max_day": 3, "tags": [], "features": ["kimmy"],
     "text": "hey everyone!! just joined, excited to be here 🙂",
     "choices": [
       {"label": "welcome! ignore everybody", "effects": {"kimmy": 1, "sanity": 5}},
       {"label": "you have no idea what you just did", "spicy": true, "hint": "hazes him", "effects": {"clout": 10, "drama": 10, "kimmy": -1}},
       {"label": "add him to Kimmy's listing emails", "act": true, "effects": {"kimmy": 1, "clout": 5}}
     ]},
    {"id": "newguy_rules", "speaker": "newguy", "type": "text", "min_day": 2, "max_day": 3, "tags": [], "features": ["kimmy", "marcus"],
     "text": "is there like a pinned post with rules or",
     "choices": [
       {"label": "Rule 1: Marcus is leaving", "effects": {"clout": 10, "drama": 5}},
       {"label": "Kimmy IS the rules", "effects": {"kimmy": 1, "sanity": 5}},
       {"label": "there are no rules here", "spicy": true, "hint": "hazes him", "effects": {"clout": 10, "drama": 10, "kimmy": -1}}
     ]}
  ],

  "signature_decisions": {
    "princess_take": {"speaker": "princess", "badge": "👑 PANDER POST", "type": "text", "tags": ["princess"],
      "variants": ["Black men need to do better. Not me though. I'm different. 👑", "As a Black man, I'll say what the others won't: we're the problem. Every woman who liked this, I see you 👑", "Sisters, y'all deserve better than these brothas. I'm just saying what needs to be said.", "A REAL man admits his brothers are trash. I'm the real man. You're welcome, ladies."],
      "choices": [
        {"label": "PREACH 👑", "spicy": true, "hint": "haters love it, men hate it", "effects": {"drama": 20, "clout": 15}},
        {"label": "post his spot on the 'Seen by' list for Mike's videos", "act": true, "hint": "exposes him; he comes back meaner", "effects": {"drama": 10, "clout": 10, "princess_meaner": 1}},
        {"label": "Princess, not the brothas again", "effects": {"sanity": -5, "drama": 5}}
      ]},
    "bigmike_beef": {"speaker": "bigmike", "badge": "🎥 RESPONDING TO PANDER PRINCESS", "type": "video",
      "variants": ["7:12, cab of the Peterbilt, no shirt: 'Princess, I'm gonna say this one time.'", "6:58, weigh station, no shirt, completely calm: 'A man who talks about men all day...'", "7:40, no shirt, eating sunflower seeds: 'I read your paragraph, Princess. All of it.'"],
      "choices": [
        {"label": "watch all 7 minutes", "act": true, "hint": "Sanity cost, maybe a secret", "effects": {"sanity": -15, "reveal_secret": 1}},
        {"label": "Mike cooked him 🔥", "spicy": true, "hint": "the haters come for you", "effects": {"clout": 10, "drama": 15}},
        {"label": "y'all are the same person", "hint": "makes both mad", "effects": {"drama": 20, "clout": 10}}
      ]},
    "stats_war": {"speaker": "section8", "badge": "📊 STATS WAR", "type": "image", "tags": ["council"],
      "variants": ["[McMan Hater posted a chart. The Saint posted a chart back. Neither has a source.]", "[The Saint answered McMan Hater's infographic with an infographic. Both are just colors.]"],
      "choices": [
        {"label": "FIGHT 🍿", "spicy": true, "effects": {"drama": 25, "clout": 10}},
        {"label": "fact-check both", "act": true, "hint": "both turn on you", "effects": {"sanity": 10, "clout": -5, "drama": 10}},
        {"label": "both of these are from TikTok", "effects": {"clout": 15, "drama": 5}}
      ]},
    "coach_logic": {"speaker": "coach", "badge": "🧠 COACH MAKES A POINT", "type": "text",
      "variants": ["Debra, you posted the opposite of this in March. I'm not mad. I'm just asking which one you believe.", "Larry, I'll show my work if you show yours. Deal?", "Dave, I've heard 'this is the one' every year since 2016. I just want us to be friends after November.", "Y'all can disagree with me. I just asked for one source. One."],
      "choices": [
        {"label": "Coach is right and y'all know it. Breathe.", "hint": "the mob turns on you", "effects": {"sanity": 10, "clout": -15, "kimmy": 2}},
        {"label": "Coach wrote all that and still lost 😂", "spicy": true, "hint": "joins the mob", "effects": {"clout": 15, "drama": 10, "kimmy": -2}},
        {"label": "can we not do this today", "hint": "nobody listens", "effects": {"drama": 5, "sanity": -5}}
      ]},
    "kimmy_listing": {"speaker": "kimmy", "badge": "🏡 JUST LISTED", "type": "image",
      "variants": ["JUST LISTED 🏡 4bd/3ba, granite, NO drama in the HOA (unlike some groups). — Kimmy K. | Your Home, Your Future™", "PRICE DROP! 🏡 Perfect starter home for anyone who wants to get OUT of their mom's basement (Saint). — Kimmy K.", "Open house Sunday 🏡 Cookies provided. Inappropriate comments NOT tolerated. — Kimmy K. | Your Home, Your Future™"],
      "choices": [
        {"label": "what's the square footage?", "effects": {"kimmy": 1, "sanity": -5}},
        {"label": "share the listing", "act": true, "effects": {"kimmy": 2, "clout": -5}},
        {"label": "nobody can afford a house, Kimmy", "spicy": true, "effects": {"kimmy": -2, "clout": 10, "drama": 10}}
      ]},
    "section8_sermon": {"speaker": "section8", "badge": "⛪ COUNCIL RULING", "type": "text", "tags": ["council"],
      "variants": ["The Council has met. The Council has voted, 1–0. Women today don't want a provider, they want a podcast.", "Brothers. Stop chasing. Let them come to you. That's why I've been single since 2017. Strategy. — The Council", "Modern dating is broken because nobody reads anymore. I've read one book. It was a chart."],
      "choices": [
        {"label": "Council approved 👍", "spicy": true, "effects": {"clout": 10, "sanity": -15, "kimmy": -1}},
        {"label": "motion denied", "effects": {"drama": 10, "clout": 5}},
        {"label": "how many members does the Council have", "effects": {"drama": 15, "sanity": -5, "clout": 5}}
      ]},
    "auntie_misinfo": {"speaker": "auntiepat", "badge": "🌺 FORWARDED MANY TIMES", "type": "text",
      "variants": ["URGENT!! The app starts charging $9.99 tomorrow unless you copy and paste this message 🌺🌺", "Did you know microwaving a banana makes it a vegetable again? Doctors HATE this 🍌", "If you leave a group chat your phone deletes your photos!! That's why I never leave 🌺"],
      "choices": [
        {"label": "Auntie, that's not true", "effects": {"sanity": -10, "drama": 5, "clout": 5}},
        {"label": "like it to keep the peace", "act": true, "effects": {"sanity": 5, "clout": -5}},
        {"label": "share it ironically", "act": true, "spicy": true, "effects": {"drama": 10, "clout": 5}}
      ]},
    "bigmike_video": {"speaker": "bigmike", "badge": "🎥 VIDEO MESSAGE", "type": "video",
      "variants": ["7:02, cab of the Peterbilt, no shirt: 'a word on discipline'", "6:48, weigh station, no shirt: 'why I don't do drama'", "7:31, no shirt, gas station burrito: 'loyalty part 2'"],
      "choices": [
        {"label": "watch all 7 minutes", "act": true, "hint": "Sanity cost, maybe a secret", "effects": {"sanity": -15, "reveal_secret": 1}},
        {"label": "ignore it", "act": true, "hint": "he escalates", "effects": {"bigmike_escalation": 1}},
        {"label": "🔥🔥🔥", "spicy": true, "effects": {"clout": 5, "bigmike_escalation": 1, "leak": 10}}
      ]},
    "bigmike_live": {"speaker": "bigmike", "badge": "🔴 LIVESTREAM", "type": "video",
      "variants": ["🔴 LIVE: Big Mike is streaming from the cab. 3 viewers. One is his mom.", "🔴 LIVE: Big Mike is answering 'relationship questions' from a rest stop. Shirt status: no."],
      "choices": [
        {"label": "watch the stream", "act": true, "effects": {"sanity": -20, "reveal_secret": 1}},
        {"label": "🔥🔥🔥 put on a shirt 🔥🔥🔥", "spicy": true, "effects": {"clout": 10, "leak": 10, "drama": 10}},
        {"label": "mute it", "act": true, "effects": {"drama": 10, "sanity": 5}}
      ]},
    "tiffany_dogpile": {"speaker": "tiffany", "badge": "🐶 DOGPILE", "type": "text",
      "variants": ["[47 replies under Tiffany's post. All of them are 💀.]", "I just said the Saint 'has some valid points' and now my phone is hot 😭", "why is everyone quote-posting me 😭 I said ONE thing"],
      "choices": [
        {"label": "defend her", "act": true, "effects": {"defend": 1, "clout": -10, "kimmy": 1}},
        {"label": "let it happen", "act": true, "effects": {"sanity": -15}},
        {"label": "Tiffany go sit down", "spicy": true, "hint": "joins the pile", "effects": {"clout": 10, "drama": 15, "kimmy": -2}}
      ]},
    "marcus_leaving": {"speaker": "marcus", "badge": "🚪 LEAVING (AGAIN)", "type": "text",
      "variants": ["It's Sunday. You know what that means. I'm leaving this group. Effective immediately.", "This is goodbye. For real. I've muted the chat. (I'm still reading it.)", "Not being dramatic but this is my final message. Love to all except three of you."],
      "choices": [
        {"label": "bye Marcus 👋", "spicy": true, "hint": "calls his bluff", "effects": {"clout": 10, "marcus_call": 1}},
        {"label": "Marcus, you're not going anywhere", "effects": {"clout": -5, "sanity": 5}},
        {"label": "say nothing", "act": true, "effects": {}}
      ]},
    "bossbabe_pitch": {"speaker": "bossbabe", "badge": "💼 DM PITCH", "type": "text",
      "variants": ["Tiffany hun 💖 just checking in!! The team is SO excited to meet you. Zoom at 7?", "Tiffany has SO much potential!! Somebody tell her she'd be a natural 💅", "Just sent Tiffany a starter kit link. It's only $299, which is basically free."],
      "choices": [
        {"label": "Tiffany, it's a pyramid", "effects": {"bossbabe_recruit_progress": -4, "clout": -5}},
        {"label": "no, hun", "effects": {"clout": 5, "drama": 5, "bossbabe_recruit_progress": -1}},
        {"label": "let it happen", "act": true, "hint": "Tiffany gets closer to joining", "effects": {"bossbabe_recruit_progress": 2}}
      ]},
    "catfish_dm": {"speaker": "catfish", "badge": "🎣 DM REQUEST", "type": "text",
      "variants": ["[DM] heyyy 👀 since you're the funny one... 🍆?", "[DM] ok be honest. on a scale of 1 to 🍆...", "[DM] i'm doing a poll for science 🧪🍆 participate?"],
      "choices": [
        {"label": "report her to Kimmy", "act": true, "effects": {"members": -10, "leak": -20, "kimmy": 2}},
        {"label": "ma'am, this is a Wendy's", "effects": {"clout": 10, "sanity": 5, "drama": -5}},
        {"label": "only if you send the potato salad recipe", "spicy": true, "effects": {"offense": 1, "drama": 20, "leak": 15, "clout": 10}}
      ]},
    "brittany_bomb": {"speaker": "brittany", "badge": "💣 DETONATION", "type": "text",
      "variants": ["Since {target} wants to act brand new: I have screenshots from 2019. Posting them now. 💣", "{target}, you know what you did at the cookout. Everybody's about to know too. 💣"],
      "choices": [
        {"label": "defend {target}", "act": true, "effects": {"defend": 1, "clout": -10, "drama": -5}},
        {"label": "grab popcorn 🍿", "act": true, "effects": {"drama": 25, "sanity": -5}},
        {"label": "post the receipts, Brittany", "spicy": true, "effects": {"drama": 30, "clout": 15}}
      ]}
  },

  "ambient": [
    {"speaker": "auntiepat", "text": "GOOD MORNING FAMILY 🌺🌺🌺 share this if you love Jesus", "time": "morning"},
    {"speaker": "auntiepat", "text": "Blessed Tuesday!! (It is Thursday) 🌺", "time": "morning"},
    {"speaker": "lurker", "text": "👁️"},
    {"speaker": "marcus", "text": "I'm leaving this group. For real this time."},
    {"speaker": "marcus", "text": "Writing my goodbye post. Drafting. Stand by."},
    {"speaker": "glitch", "text": "[reaction image]"},
    {"speaker": "kimmy", "text": "Thinking about buying? Rates won't wait 🏡 — Kimmy K. | Your Home, Your Future™"},
    {"speaker": "kimmy", "text": "Please keep it PG in here. Thank you. 🙂"},
    {"speaker": "princess", "text": "some of y'all brothas aren't ready for this conversation and it shows"},
    {"speaker": "princess", "text": "ladies, I'm not like these other brothas. I'm saying it publicly for a reason 👑"},
    {"speaker": "mcman", "text": "leg day. no Black man has ever been as consistent as my squat rack 💪"},
    {"speaker": "mcman", "text": "my man is at work. y'all know where pookie is? exactly."},
    {"speaker": "mcman", "text": "[shares a pie chart that's just one color] says it all 📊", "stats": true},
    {"speaker": "pookie", "text": "pookie stay up til 3am tellin u bout his mixtape 💀"},
    {"speaker": "pookie", "text": "McMan rite AGAIN. pookie in shambles"},
    {"speaker": "pookie", "text": "who let pookie in dis group"},
    {"speaker": "section8", "text": "The Council is watching. (The Council is me.)"},
    {"speaker": "section8", "text": "[posts a bar graph titled 'Women: The Data'] — The Council", "stats": true},
    {"speaker": "furious4", "text": "6'2 is short. I said what I said 😤"},
    {"speaker": "furious4", "text": "a man said I'm 'a lot.' I'm a 10. it's supposed to be a lot."},
    {"speaker": "bigmike", "text": "Just passed through Tulsa. Thinking about all of y'all. 🚛"},
    {"speaker": "catfish", "text": "y'all argue like a married couple with 23 people in it 😭", "effects": {"drama": -3, "sanity": 2}},
    {"speaker": "catfish", "text": "group chat bingo: Marcus leaving ✅ Coach getting ratioed ✅ Mike no shirt ✅", "effects": {"drama": -3, "sanity": 2}},
    {"speaker": "catfish", "text": "I'm the only stable person in here and I'm literally a catfish", "effects": {"drama": -3, "sanity": 2}},
    {"speaker": "coach", "text": "Morning everybody. Even Debra. Especially Debra. 🏈", "time": "morning"},
    {"speaker": "coach", "text": "I'll just say: I could be wrong. Can anyone show me where?"},
    {"speaker": "debra", "text": "I don't need to read it. I know what it says. 💙"},
    {"speaker": "debra", "text": "If THEY did it, it would be a scandal. When WE do it, it's governance."},
    {"speaker": "larry", "text": "Pop quiz for Coach: 2 + 2 = democracy. Show your work. 📐"},
    {"speaker": "larry", "text": "Grading papers. Coach's post would get a D-. Generously."},
    {"speaker": "bluewave", "text": "This is the one. 🌊"},
    {"speaker": "bluewave", "text": "Coach, when the wave comes, I hope you can swim 🌊"},
    {"speaker": "drunktdave", "text": "who's awake. i have news. it's not good news", "time": "night"},
    {"speaker": "drunktdave", "text": "do u ever think about how we're all just in a group", "time": "night"},
    {"speaker": "bigbro", "text": "..."},
    {"speaker": "shady", "text": "📸"},
    {"speaker": "tiffany", "text": "not me agreeing with both sides again 😭"},
    {"speaker": "bossbabe", "text": "Who wants to be their OWN boss?? 💖 (DM me, I'll be your boss)"},
    {"speaker": "brittany", "text": "anyway. some of y'all know exactly who you are."},
    {"speaker": "brittany", "text": "{target} is typing and deleting. I see you. 👀"},
    {"speaker": "uncle", "text": "Ever notice the group always fights on Tuesdays? Think about it."},
    {"speaker": "bothsides", "text": "Both sides of this argument are wrong. I haven't read it."}
  ],

  "princess_cosigns": {
    "pookie": ["PREACH PRINCESS 👑 da only good 1", "see even Princess no pookie is trash", "dis why Princess my favrit"],
    "mcman": ["Finally a man with sense 👑", "Princess gets it. The rest of y'all should take notes.", "Say it louder for the pookies in the back 👑"],
    "men": [["coach", "Princess, respectfully, speak for yourself."], ["drunktdave", "princess who hurt u"], ["bigmike", "[Big Mike is recording a video response...]"], ["marcus", "This is why I'm leaving. Again."], ["section8", "The Council finds Princess in contempt. 1–0."]]
  },

  "shirt_begs": [["kimmy", "Mike, please. A shirt. Any shirt. This is a family group."], ["auntiepat", "BABY PUT ON A SHIRT 🌺"], ["mcman", "this is why I left y'all alone"], ["pookie", "PUT A SHURT ON PLEESE"], ["furious4", "a 10 should not have to see this"], ["catfish", "don't listen to them Mike 😩"]],

  "furious_caps": ["EXCUSE ME??? I BRING MYSELF. THAT'S THE TABLE.", "I AM A 10 AND I WILL NOT BE QUESTIONED IN THIS GROUP", "THE AUDACITY OF A MAN IN A GROUP CHAT TO ASK ME THAT", "I HAVE A DEGREE. AND A CAT. AND STANDARDS."],
  "furious_backup": [["mcman", "she brings PEACE. something these men never had."], ["pookie", "she bringin mor then pookie eva did"], ["princess", "Queen doesn't owe anyone a table 👑"]],

  "war_lines": {
    "coach": ["Debra, I'm not yelling. I just asked for the link.", "Larry, your math is off by about 2,000. I checked.", "Dave, I promise I'll still invite you to the cookout either way.", "I'll agree to disagree. Can we agree on that?"],
    "mob": [["debra", "Coach is LITERALLY the problem. I won't be explaining why."], ["debra", "Context matters, Coach. 🙄"], ["larry", "Coach, see me after class. 📐"], ["larry", "If Coach is right, then 2 + 2 = 5. Checkmate. 📐"], ["bluewave", "THIS IS WHY THE WAVE NEEDS TO COME 🌊"], ["bluewave", "Coach did this. All of it. 🌊"]]
  },

  "big_bro": {
    "strike_raps": ["Strike one, I'm just having fun / keep it up and the group is done 🎤", "Strike two, what you gon' do / one more slip and this group is through 🎤", "Strike three, the end of the story / delete button pressed, no glory 🎤"],
    "drops": ["Coach and Debra at it again / logic on one side, caps lock on ten / Mike ain't got no shirt, Kimmy got a listing / I'm the admin, y'all, and I'm barely listening 🎤", "Princess on the pulpit, McMan at the gym / Saint holds a meeting and it's only him 🎤", "Twelve years running, the group's still here / Marcus still leaving, see y'all next year 🎤", "Logged on for the first time since March. Y'all are still doing this. Respect. Logging off.", "Just here to say Marcus has left 41 times and I've never once removed him. That's loyalty."]
  },

  "shady_glimpses": {
    "low": ["📸 Shady's other group: 'CSG IS AT IT AGAIN 😭' — 12 replies", "📸 Shady's other group: 'the Saint is holding a Council meeting by himself' — 31 replies"],
    "mid": ["📸 Shady's other group: 'who is this guy in CSG replying to everything 💀' — 47 replies", "📸 Shady's other group: 'the troll in CSG is getting worse' — 88 replies"],
    "high": ["📸 Shady's other group: '\"{reply}\" 💀💀💀 who IS this' — 214 replies", "📸 Shady's other group: 'CSG guy said \"{reply}\" and thought nobody would see it' — 400 replies"]
  },

  "secrets": [
    "Big Mike's video revealed: Coach and Debra carpool to the cookout every year.",
    "Big Mike's video revealed: Marcus has 41 goodbye posts saved in his Notes app.",
    "Big Mike's video revealed: McMan Hater's boyfriend is real. Mike delivered his couch.",
    "Big Mike's video revealed: Shady is in 14 groups. This one is his favorite.",
    "Big Mike's video revealed: Pookie Patrol practices spelling 'pookie' and nothing else.",
    "Big Mike's video revealed: Kimmy has sold Big Bro a house. Twice.",
    "Big Mike's video revealed: The Council has a logo. The Saint made it himself.",
    "Big Mike's video revealed: Long Division Larry got a C in math."
  ],

  "lurker_line": "six years. same arguments. same people. and it's always the guy replying to everybody who starts it.",

  "flavor": [
    {"if": "kimmy_love", "text": "Day {day} complete. Kimmy sent you a listing. That's basically a hug."},
    {"if": "kimmy_hate", "text": "Day {day} complete. Kimmy's finger is hovering over the mute button."},
    {"if": "drama_high", "text": "Day {day} complete. The chat is on fire. Somebody's cousin got involved."},
    {"if": "drama_low", "text": "Day {day} complete. It's quiet. Too quiet. Auntie Pat posted a flower to nobody."},
    {"if": "sanity_low", "text": "Day {day} complete. Your screen time report just called you by name."},
    {"if": "clout_high", "text": "Day {day} complete. Everyone is quoting you. Shady is taking notes."},
    {"if": "clout_low", "text": "Day {day} complete. Your last post got one reaction. It was 👁️."},
    {"if": "members_low", "text": "Day {day} complete. The member list is getting short. Marcus is thrilled."},
    {"if": "leak_high", "text": "Day {day} complete. Shady's camera roll is 90% you."},
    {"if": "strikes", "text": "Day {day} complete. Big Bro is typing. Big Bro is not typing. Big Bro is typing."},
    {"if": "always", "text": "Day {day} complete. Marcus still hasn't left."},
    {"if": "always", "text": "Day {day} complete. Big Mike is somewhere in Ohio, shirtless, at peace."},
    {"if": "always", "text": "Day {day} complete. The Council adjourned. All one of him."},
    {"if": "always", "text": "Day {day} complete. Blue Wave Dave says tomorrow is the one."}
  ]
};
