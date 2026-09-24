/* BusyBee personas: Xtensio template structure, content derived from the
   Phase 2 affinity wall. Bars are 0-100.
   evidence: "d" = stated in the interviews | "i" = inferred from them */

const P = [
  {
    name: "Maya Whitfield",
    archetype: "The Planner",
    accent: "#E1584E",
    from: "P1, P4",
    themes: "T1, T4, T5, T6, T7",
    facts: [
      ["Age", "62"],
      ["Status", "Retired, formerly operations"],
      ["Travels", "6 to 8 trips a year"],
      ["Goes out", "Most days: groceries, gym, dinner"],
      ["Location", "Metro Detroit, Michigan"],
      ["Walk-away", "20 to 30 min locally, none when it matters"]
    ],
    traits: ["Methodical", "Early", "Skeptical", "Self-reliant"],
    quote: "The cost of being early is a coffee and a magazine. The cost of being late is a missed flight, a rebooking fee and a night in a hotel. Those aren't the same size.",
    personality: [
      ["Introvert", "Extrovert", 42],
      ["Thinking", "Feeling", 26],
      ["Sensing", "Intuition", 30],
      ["Judging", "Perceiving", 14]
    ],
    goals: [
      "Know how bad the wait is before leaving the house, while a choice still exists",
      "Stop padding 45 minutes onto every trip that actually matters",
      "Pick the line that is moving, not the one that is nearest"
    ],
    frustrations: [
      "Published wait times are stale, and stale is indistinguishable from wrong",
      "Once she is committed to a line there is no leaving it",
      "The waiting is arithmetic and dread, not boredom"
    ],
    bio: "Maya is retired, which means her week no longer has a fixed shape, but the trips that matter are planned to the minute. She works backwards from a departure time the night before and treats any unknown as something to pad against. She stopped trusting posted wait times after one told her ten minutes and cost her forty. Now she asks people instead: her wife texting from a different line, a shuttle driver who has made the run forty times that morning. Locally she is relaxed: a twenty minute wait for dinner and she will simply go elsewhere. The difference is never the venue, it is whether being wrong is expensive.",
    motivation: [
      ["Time certainty", 96],
      ["Crowd avoidance", 34],
      ["Social coordination", 58],
      ["Trust in strangers", 46],
      ["Willingness to report", 72]
    ],
    apps: [
      ["Group chat / SMS", 92],
      ["Phone calls to venues", 84],
      ["Google Maps", 60],
      ["Airline / flight apps", 78],
      ["Official wait-time signage", 12],
      ["Waze", 30],
      ["Instagram", 8],
      ["Online reviews", 24]
    ]
  },
  {
    name: "Jordan Ellis",
    archetype: "The Improviser",
    accent: "#F0A32A",
    from: "P2, P7",
    themes: "T1, T2, T4, T5, T7",
    facts: [
      ["Age", "21"],
      ["Major", "Computer Science"],
      ["Year", "Junior"],
      ["School", "University of Michigan–Flint"],
      ["Location", "Flint, Michigan"],
      ["Walk-away", "A table or nothing; 30 min socially"]
    ],
    traits: ["Spontaneous", "Social", "Impatient", "Adaptable"],
    quote: "Some weeks I feel like I've spent half my study time looking for somewhere to study.",
    personality: [
      ["Introvert", "Extrovert", 78],
      ["Thinking", "Feeling", 58],
      ["Sensing", "Intuition", 62],
      ["Judging", "Perceiving", 84]
    ],
    goals: [
      "Know whether a seat exists before committing to the walk",
      "Avoid walking in, seeing it full, and turning straight back around",
      "Settle the group chat in less than twenty minutes"
    ],
    frustrations: [
      "Popular times knows the pattern but has no idea it is midterms",
      "Blames herself for wasted trips she had no way to predict",
      "Turning around in a full room is a small public humiliation"
    ],
    bio: "Jordan is on campus five days a week and never studies at home, so most days end with a walk to a cafe or the library. There is no planning involved. Class ends and she goes, because the gap between classes is however long it is and thinking about it only eats into it. Going out with friends is the opposite, though she would not call it planning either: six people negotiating in a group chat while someone checks Maps and someone else reports that it was awful last Friday. She wants a cafe empty and a bar full, and the same app has to understand both. Any one wasted trip is trivial. It is the accumulation she notices.",
    motivation: [
      ["Time certainty", 62],
      ["Crowd avoidance", 54],
      ["Social coordination", 94],
      ["Trust in strangers", 66],
      ["Willingness to report", 48]
    ],
    apps: [
      ["Group chat / SMS", 98],
      ["Instagram", 86],
      ["Google Maps", 74],
      ["Snapchat", 80],
      ["Online reviews", 22],
      ["Phone calls to venues", 6],
      ["Waze", 26],
      ["Airline / flight apps", 10]
    ]
  },
  {
    name: "Sam Okafor",
    archetype: "The Good Neighbor",
    accent: "#8A6BD1",
    from: "P3, P5, P6",
    themes: "T3, T8, T9",
    facts: [
      ["Age", "34"],
      ["Occupation", "Logistics coordinator"],
      ["Household", "Partner, two young children"],
      ["Goes out", "Daily errands; dines out rarely"],
      ["Location", "Grand Blanc, Michigan"],
      ["Walk-away", "About 30 min; any wait with the kids"]
    ],
    traits: ["Crowd-averse", "Considerate", "Cautious", "Practical"],
    quote: "I've definitely talked about how busy places are. If I knew someone else was thinking about going there, I might tell them how crowded it was.",
    personality: [
      ["Introvert", "Extrovert", 18],
      ["Thinking", "Feeling", 64],
      ["Sensing", "Intuition", 32],
      ["Judging", "Perceiving", 36]
    ],
    goals: [
      "Avoid crowds rather than endure them",
      "Warn people without attaching his real name to anything public",
      "Use a tool that is already populated enough to be worth opening"
    ],
    frustrations: [
      "Posting for strangers has no visible payoff, so who is even reading it?",
      "Will not trust a crowd whose moderation story is unexplained",
      "With two young children, any wait at all ends the outing"
    ],
    bio: "Sam does not like being around a lot of people, and plans around that rather than tolerating it. He checks almost nothing before leaving, he simply arrives and finds out, but he already reports traffic on Waze out of habit and trusts GasBuddy for the same reason. He tells people before they head over, every time, and gives a prediction when asked, but he has never written a review and does not think of any of that as reporting. He assumes good faith from other users, seeing no reason anyone would call a busy place quiet, though he would want to know what happens when someone does.",
    motivation: [
      ["Time certainty", 48],
      ["Crowd avoidance", 92],
      ["Social coordination", 70],
      ["Trust in strangers", 74],
      ["Willingness to report", 86]
    ],
    apps: [
      ["Waze", 90],
      ["GasBuddy", 82],
      ["Group chat / SMS", 76],
      ["Google Maps", 64],
      ["Online reviews", 34],
      ["Phone calls to venues", 28],
      ["Instagram", 16],
      ["Airline / flight apps", 6]
    ]
  }
];
