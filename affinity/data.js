/* BusyBee: Phase 2 Contextual Inquiry
   Source: BusyBee_Contextual_Inquiry_Master.pdf (7 interviews, 10 questions each)
   src: "v" = verbatim first-person transcript | "r" = interviewer's recorded summary */

const PARTICIPANTS = {
  p1: { id: "P1", color: "#E1584E", role: "Retired, six to eight flights a year", by: "Omar Naguib" },
  p2: { id: "P2", color: "#F0A32A", role: "Student, studies off-campus every day", by: "Omar Naguib" },
  p3: { id: "P3", color: "#6DAE4F", role: "Dines out every three weeks, two young children", by: "Evan Wilkin" },
  p4: { id: "P4", color: "#2E9E9E", role: "Out three to four times a day, errand-driven", by: "Evan Wilkin" },
  p5: { id: "P5", color: "#4A82D6", role: "Out once or twice a week, patient planner", by: "Evan Wilkin" },
  p6: { id: "P6", color: "#8A6BD1", role: "Out most days, strongly crowd-averse", by: "Nolan Jarvinen" },
  p7: { id: "P7", color: "#C4568F", role: "Out daily: gym, stores, golf, long drives", by: "Nolan Jarvinen" }
};

const QUESTIONS = {
  1: "How often do you go out?",
  2: "Do you plan ahead before going out, or are you more spontaneous?",
  3: "How important is knowing an establishment's busyness to you?",
  4: "What methods, if any, do you use to find the predicted or expected wait time?",
  5: "What do you do when you can't tell how busy a place is going to be?",
  6: "How often do you end up somewhere more crowded than you like?",
  7: "How do you feel when a place is busier or has a longer wait than you expected?",
  8: "How bad does the busyness or wait time need to be for you to consider leaving and trying another place?",
  9: "Have you ever told someone else how busy a place was?",
  10: "Would you trust a community-based predicted wait time or busyness app?"
};

/* n(participant, question, note text, verbatim/recorded response, source type) */
const n = (p, q, t, v, src) => ({ p, q, t, v, src: src || "v" });

const THEMES = [
  {
    id: "T1",
    label: "How much busyness matters is set by the trip, not by the person",
    groups: [
      {
        label: "The same person cares completely differently depending on the venue",
        notes: [
          n("p1", 3, "A restaurant wait only changes whether we eat at six or at seven.", "For a restaurant it's nice to know. It changes whether we go at six or at seven. It isn't going to ruin the evening either way."),
          n("p1", 3, "At an airport it is the one thing I most want to know and cannot get.", "At an airport it's the single thing I'd most like to know and can't. Everything else about that morning I can control."),
          n("p1", 3, "The security line is the only part of the morning I'm guessing at.", "The security line is the one part I'm guessing at, and it's the part that decides whether I make the flight."),
          n("p7", 3, "Restaurant yes, grocery store no.", "If it's a restaurant, I like knowing whether or not it's busy, but for something like a grocery store, I don't care as much."),
          n("p7", 3, "Downtown matters because of traffic and parking, not the venue itself.", "If I'm going to downtown Detroit, it's more important because I want to know what traffic and parking are going to be like."),
          n("p7", 3, "It would be nice to know if a golf course is really busy.", "It would also be nice to know if something like a golf course is really busy."),
          n("p4", 3, "Won't go to the gym when it's packed, because it's a small gym.", "Depends on the establishment. Doesn't want to go to the gym when it is packed since it's a smaller sized gym.", "r"),
          n("p4", 3, "Grocery stores are a mess when busy; wants in and out.", "Grocery stores are also a mess when busy, wants to get in and out.", "r"),
          n("p6", 8, "A busy store still gets my business; a busy theater doesn't.", "Stores are different though. If a store is busy, I'll typically still go in and get what I need."),
          n("p6", 8, "Wouldn't stay for a movie if the theater were extremely crowded.", "I also wouldn't really want to stay for a movie if the theater was extremely crowded."),
          n("p3", 4, "For a movie theater I check how many seats have been bought.", "Will look at the predicted busyness through Google, or if it is a movie theater will check how many seats are bought.", "r")
        ]
      },
      {
        label: "Who I'm with resets my limit before I even arrive",
        notes: [
          n("p3", 8, "Any wait at all is too much with two young children along.", "Any wait time is too much when going with a family with two young children.", "r"),
          n("p2", 8, "Once six people have agreed on somewhere, nobody reopens it.", "And once six people have agreed on something, nobody wants to reopen it."),
          n("p2", 8, "We'll wait longer if we've already walked there.", "For dinner with friends we'd wait half an hour easily, if it's somewhere we actually wanted to go. Longer if we've already walked there."),
          n("p7", 8, "My cutoff moves with how hungry I am.", "For a restaurant, around 45 minutes is usually my cutoff, especially depending on how hungry I am."),
          n("p7", 8, "If I could get a drink while I waited, I'd stay longer.", "If I could get a drink or something while I waited, I might stay longer."),
          n("p5", 7, "I'll put up with it if it's a restaurant I actually want.", "It sucks but will put up with it, especially if it's a restaurant they want to eat at.", "r")
        ]
      },
      {
        label: "Sometimes I want the place to be busy",
        notes: [
          n("p2", 3, "A place that's dead on a Friday night is the wrong place.", "If a place is dead on a Friday night I don't want to go. You want it to be busy, that's the whole point of going out."),
          n("p2", 3, "Busy means no table, and no table means the whole trip was pointless.", "Really important for studying... Busy means no table, and no table means the whole trip was pointless."),
          n("p2", 3, "I hadn't realised how much studying depends on it until asked.", "Really important for studying, and I don't think I'd realised that until you asked.")
        ]
      },
      {
        label: "And the baseline weight varies a lot from person to person",
        notes: [
          n("p6", 3, "Pretty important, because I don't like being around a lot of people.", "Pretty important. I don't really like being around a lot of people, so if I know a place is going to be really crowded, I wouldn't typically go, or I would look for another place."),
          n("p3", 3, "Medium. Nobody wants to wait, but it isn't a huge concern.", "Medium. Nobody wants to wait or be crowded, but where they go, it isn't a huge concern.", "r"),
          n("p5", 3, "Not super important. Nice to know, but I'll just wait.", "Not super important. Nice to know ahead, but if it's busy when they get there, they'll just wait.", "r"),
          n("p7", 3, "Somewhat important, and entirely situational.", "Somewhat important. If it's a restaurant, I like knowing whether or not it's busy.")
        ]
      }
    ],
    impl: "Busyness is not one number. A full cafe is a <b>failed trip</b> for a student and a <b>good sign</b> for a Friday night out. Let a report carry the venue type and let the user state which direction they want. BusyBee's vibe tags are the hook for this, and the gauge should read against the user's intent, not an absolute scale."
  },

  {
    id: "T2",
    label: "The tools I have describe last Tuesday, not today",
    groups: [
      {
        label: "Google's graph knows the pattern, not the day",
        notes: [
          n("p2", 4, "Popular times is a vibe: right about the shape, blind to today.", "Google Maps has the popular times thing, and it's a vibe. It's right about the general shape, lunch is busy obviously, but it doesn't know anything about today."),
          n("p2", 4, "It doesn't know it's midterms.", "It doesn't know it's midterms. During finals every cafe near the library is full at eleven at night and the graph says quiet, because normally it would be."),
          n("p4", 4, "Google predicted busyness is the only thing I use.", "Google predicted busyness.", "r"),
          n("p5", 4, "Usually just a Google-based wait time.", "Usually just a Google based wait time.", "r"),
          n("p3", 4, "I check Google's predicted busyness casually and infrequently.", "Checks online casually and infrequently.", "r")
        ]
      },
      {
        label: "The official number burned me once and I stopped believing it",
        notes: [
          n("p1", 4, "The published airport wait said ten minutes. I stood there forty.", "For the airport there's the wait time they publish and I've stopped trusting it. It told me ten minutes once and I stood there the better part of forty."),
          n("p1", 4, "I never found out whether it was wrong or just old, and that's what bothers me.", "I don't know whether it was wrong or whether it was just old, and that's the part that bothers me."),
          n("p1", 10, "An hour-old number gets ignored, same as I ignore the signs now.", "And if it was an hour old I'd ignore it, same as I ignore the signs now.")
        ]
      },
      {
        label: "So I improvise, or I use nothing at all",
        notes: [
          n("p6", 4, "I don't use anything. I go and find out when I arrive.", "I don't really use anything right now to check wait times or how busy somewhere is before I go. Most of the time I just go there and find out once I arrive."),
          n("p2", 4, "I check Instagram stories, because you can tell if a place is rammed.", "And sometimes I'll check whether a place got tagged on Instagram recently, you can tell from a story whether it's rammed."),
          n("p7", 4, "Maps for traffic, the website for a posted wait, then a phone call.", "I'll usually check Google Maps or Apple Maps to see how long the drive is and what traffic looks like. For restaurants, I'll look online to see if there are reservations available or if they have a wait time posted."),
          n("p7", 4, "No single source is enough on its own.", "Sometimes I'll call ahead and ask how busy they are or if they have any tables open.")
        ]
      }
    ],
    impl: "Every score needs a <b>visible age</b>. The competitor is a historical average, so BusyBee wins by never showing one: live-only reports with a 30-minute decay, and a timestamp shown as prominently as the score itself."
  },

  {
    id: "T3",
    label: "A person who is standing there beats any app",
    groups: [
      {
        label: "I message whoever is already inside",
        notes: [
          n("p2", 4, "Someone at the library beats any app, because they're looking right at it.", "Mostly I just message someone who's there. If someone from my course is at the library I'll ask if there's space, and that's better than any app because they're looking right at it."),
          n("p1", 4, "My wife texts me which checkpoint is actually moving.", "My wife goes through a different checkpoint and texts me which one is moving.")
        ]
      },
      {
        label: "I ring the place and ask a human",
        notes: [
          n("p1", 4, "Somebody picks up, tells you forty minutes, and that's that.", "For restaurants we'll just ring them and ask. Somebody picks up, tells you forty minutes, and that's that."),
          n("p7", 4, "I call ahead and ask if they have tables open.", "Sometimes I'll call ahead and ask how busy they are or if they have any tables open.")
        ]
      },
      {
        label: "I trust people whose job keeps them there all day",
        notes: [
          n("p1", 4, "The shuttle driver has done forty runs, so he knows which terminal is a mess.", "The shuttle driver has done forty runs that morning, he knows which terminal is a mess.")
        ]
      },
      {
        label: "What I'm buying is recency, not authority",
        notes: [
          n("p1", 10, "Someone standing there ten minutes ago is telling me something real.", "Somebody who was standing there ten minutes ago is telling me something real. A sign is telling me what somebody typed in at some point."),
          n("p2", 10, "I'd trust it more than Maps because at least it's about today.", "I'd trust it more than Maps because at least it's about today."),
          n("p5", 9, "If someone asks about a restaurant, I'll give them my prediction.", "If someone asks about a restaurant, they'll give their prediction.", "r")
        ]
      }
    ],
    impl: "Frame a report as <b>eyewitness testimony, not prediction</b>. Lead with the human fact, such as &ldquo;4 people reported from here in the last 12 minutes&rdquo;, and keep the aggregation logic out of the way. The product BusyBee is replacing is a text message from a friend."
  },

  {
    id: "T4",
    label: "With no information, I absorb the risk myself",
    groups: [
      {
        label: "I pad the schedule and eat the cost",
        notes: [
          n("p1", 5, "I add more time. That's the whole strategy, there isn't a second one.", "I add more time. That's the whole strategy, there isn't a second one."),
          n("p1", 5, "Holiday or a tight connection means another forty-five minutes on top.", "If it's a holiday, or I've got a connection I can't afford to miss, another forty five minutes on top."),
          n("p1", 5, "Early costs a coffee. Late costs a flight, a rebooking and a hotel.", "The cost of being early is a coffee and a magazine. The cost of being late is a missed flight, a rebooking fee and a night in a hotel. Those aren't the same size, so I don't treat them the same.")
        ]
      },
      {
        label: "Or I just go and find out",
        notes: [
          n("p6", 5, "I go to the business and see how busy it is when I get there.", "I'll go to the business and see how busy it is when I get there."),
          n("p7", 5, "I take my chances; if it's too busy I go somewhere else.", "Usually I'll just take my chances and go there. If I get there and it's too busy, I'll just go somewhere else."),
          n("p4", 5, "Just goes and risks it being busier than normal.", "Just goes and risks it being busier than normal.", "r"),
          n("p5", 5, "Still goes anyway; if it's too busy, goes somewhere else.", "Still goes anyway. If it's too busy, just goes somewhere else.", "r"),
          n("p2", 5, "It's a five-minute walk. Not a big deal any one time.", "I just go. It's a five minute walk, and if it's full I'll go somewhere else. It's not a big deal any one time."),
          n("p3", 5, "I weigh how much I want it against the wait it might have.", "Debates the desire versus the potential wait.", "r")
        ]
      },
      {
        label: "I time-shift to beat the crowd, and it still fails",
        notes: [
          n("p7", 6, "I'm pretty good at predicting busy times and beating the crowd.", "I'm usually pretty good at predicting when somewhere is going to be busy and trying to beat the crowd."),
          n("p4", 6, "Even the gym at 6 a.m. is busier than expected.", "Happens about 2 to 3 times a week. Even going to the gym at 6 a.m. is busier than expected.", "r"),
          n("p6", 6, "It happens when I go at a time a lot of other people are out.", "It happens pretty frequently, especially when I go somewhere at a time when a lot of other people are out.")
        ]
      },
      {
        label: "How often the guess goes wrong (self-reported)",
        notes: [
          n("p6", 6, "More than half the time I go out.", "Probably more than half of the time that I go out."),
          n("p4", 6, "Two or three times a week.", "Happens about 2 to 3 times a week.", "r"),
          n("p5", 6, "Pretty often, about once every week.", "Pretty often, probably once every week.", "r"),
          n("p2", 6, "Weekly, and more during midterms and finals.", "Honestly, weekly. Probably more during midterms and finals."),
          n("p7", 6, "About 25% of the time for places; for traffic, every day.", "If we're talking about traffic, every day. For actual places, I'd say maybe 25% of the time."),
          n("p1", 6, "A few times a year at the airport; about monthly locally.", "A few times a year at the airport, where it actually matters. Locally, maybe once a month we'll walk somewhere on a Saturday and turn straight around."),
          n("p3", 6, "Rarely, about four times a year, because I rarely go out.", "Pretty rarely, about 4 times a year, due to the infrequency of going out (separate from daily highway traffic).", "r")
        ]
      },
      {
        label: "Each failure is trivial, so the total stays invisible",
        notes: [
          n("p2", 5, "Twenty minutes here, twenty there, and some weeks it's half my study time.", "Although if I actually think about it, that happens a lot, and it adds up. Twenty minutes here, twenty there. Some weeks I feel like I've spent half my study time looking for somewhere to study."),
          n("p2", 6, "It's so normal I don't register it as something going wrong.", "It's so normal that I don't really register it as a thing that's going wrong. It's just what happens."),
          n("p1", 6, "The airport ones stay with you. The restaurant ones are gone by morning.", "The airport ones stay with you though. The restaurant ones you've forgotten by the next day.")
        ]
      }
    ],
    impl: "The behaviour BusyBee replaces is <b>padding and gambling</b>, not searching. Success is a trip not wasted, so the confirmation screen should tell the reporter what their report prevented, and the app should be measured in avoided trips rather than sessions."
  },

  {
    id: "T5",
    label: "Being wrong costs composure, not just minutes",
    groups: [
      {
        label: "Low stakes produce annoyance that passes",
        notes: [
          n("p7", 7, "It's an &ldquo;aw man&rdquo; or &ldquo;dang it&rdquo; kind of feeling.", "It's more of an “aw man” or “dang it” kind of feeling. Like I wanted to eat or hang out there, and now I might have to change plans."),
          n("p7", 7, "I can't describe the emotion. It's annoying, I guess.", "I don't know how to describe the emotion, really. It's annoying I guess."),
          n("p1", 7, "At a restaurant, mildly irritated, and then over it.", "At a restaurant, mildly irritated, and then over it."),
          n("p3", 7, "Moderately inconvenienced to discouraged.", "Moderately inconvenienced to discouraged.", "r"),
          n("p5", 7, "It sucks, but I put up with it.", "It sucks but will put up with it.", "r")
        ]
      },
      {
        label: "High stakes produce dread, anxiety and stress",
        notes: [
          n("p1", 7, "Not irritation, but a low-level dread that builds while you stand there.", "At the airport it isn't irritation, it's a low level dread that builds the whole time you're standing there."),
          n("p1", 7, "You do the arithmetic over and over: another fifteen minutes, then what?", "You're doing the arithmetic over and over. If this line takes another fifteen minutes, where does that put me."),
          n("p6", 7, "It makes me anxious when it's much more crowded than I expected.", "It makes me anxious, especially when a place is much more crowded than I was expecting."),
          n("p4", 7, "Stressed about wasting time.", "Stressed about wasting time.", "r")
        ]
      },
      {
        label: "The helplessness is the worst part of it",
        notes: [
          n("p1", 7, "You can't do anything with the feeling. You're just stuck in it.", "And you can't do anything with the feeling, that's the worst part of it. You're just stuck in it."),
          n("p1", 8, "At the airport there is no leaving. That's the whole point of it.", "At the airport there is no leaving. That's the whole point of it. You can't decide the line is too long and go to a different airport.")
        ]
      },
      {
        label: "There's a social sting on top of the lost time",
        notes: [
          n("p2", 7, "Walking in, seeing it's full, and walking straight back out while everyone watches.", "If I'm on my own there's a bit of embarrassment in walking in, seeing it's full, and having to turn round and walk straight back out. Everyone watches you do it."),
          n("p2", 7, "Annoyed at myself, which is stupid, because there was no way to know.", "Annoyed, but mostly at myself, which is stupid because there was no way for me to know.")
        ]
      }
    ],
    impl: "Tone must scale with stakes. A restaurant deserves the calm half-circle gauge; a high-consequence context deserves unambiguous lead-time language and a bias toward over-warning. And because people <b>blame themselves</b> for a wasted trip, the empty state should say the data isn't there yet, and never imply the user missed something."
  },

  {
    id: "T6",
    label: "Everyone has a walk-away number, and everyone's is different",
    groups: [
      {
        label: "My cutoff, stated in minutes",
        notes: [
          n("p4", 8, "Ten minutes or more and I leave.", "10 minutes or more will cause them to leave.", "r"),
          n("p5", 8, "Fifteen minutes is about my average wait.", "15 minutes is the average wait time.", "r"),
          n("p1", 8, "Twenty and we look elsewhere; thirty and we definitely will.", "For dinner, twenty minutes and we'll look elsewhere. Thirty and we definitely will."),
          n("p2", 8, "Half an hour easily, for somewhere we actually wanted to go.", "For dinner with friends we'd wait half an hour easily, if it's somewhere we actually wanted to go."),
          n("p6", 8, "Over about thirty minutes and I'd consider somewhere else.", "For a restaurant, if the wait is over about 30 minutes, I would probably consider going somewhere else."),
          n("p7", 8, "Around forty-five minutes is usually my cutoff.", "For a restaurant, around 45 minutes is usually my cutoff."),
          n("p3", 8, "Any wait at all, with two young kids in tow.", "Any wait time is too much when going with a family with two young children.", "r")
        ]
      },
      {
        label: "For some trips it isn't a wait at all, it's pass or fail",
        notes: [
          n("p2", 8, "Either there's a table or there isn't. There's nothing to wait for.", "For studying it isn't about the wait at all, it's just binary. Either there's a table or there isn't. If there's nowhere to sit I've already left, there's nothing to wait for.")
        ]
      },
      {
        label: "And sometimes there is no walking away",
        notes: [
          n("p1", 8, "You stand in it for however long it is.", "You can't decide the line is too long and go to a different airport. You stand in it for however long it is."),
          n("p6", 8, "If a store is busy I still go in and get what I need.", "Stores are different though. If a store is busy, I'll typically still go in and get what I need.")
        ]
      },
      {
        label: "The clock keeps running after I'm seated",
        notes: [
          n("p5", 8, "Twenty minutes for a waiter, then I flag someone down.", "If already seated, will wait 20 minutes for a waiter before trying to flag someone down, and will only leave if that doesn't work.", "r")
        ]
      },
      {
        label: "I read the crowd from outside before I commit",
        notes: [
          n("p7", 8, "A full parking lot and long checkout lines at Costco are the signal.", "For stores, it would have to be really busy. The Costco in Ann Arbor can get packed, and seeing a really full parking lot or really long checkout lines can get frustrating.")
        ]
      }
    ],
    impl: "The walk-away number spans <b>0 to 45 minutes</b> across seven people. A single &ldquo;Busy&rdquo; badge can't serve that range, so let users set a personal threshold and alert against it, and support a <b>capacity state</b> (&ldquo;no tables&rdquo;) alongside a wait in minutes, because for study trips the wait is irrelevant."
  },

  {
    id: "T7",
    label: "The only useful moment is before I leave, and I'm already moving",
    groups: [
      {
        label: "How often the question even comes up",
        notes: [
          n("p4", 1, "Three to four times a day, most likely three.", "3 to 4 times a day, most likely 3.", "r"),
          n("p7", 1, "Almost every day: gym six days a week, store weekly, work, long drives.", "I leave the house almost every day. I go to the gym six days a week, the store about once a week, and then I have work, or I'll drive all the way to Flint."),
          n("p6", 1, "Almost every day, usually a store or getting something to eat.", "I go out almost every day. Usually there is something I need to do, like going to a store or getting something to eat."),
          n("p2", 1, "Every day. Campus five days a week, and I never study at home.", "Every day basically, if going out counts as leaving the house. I'm on campus five days a week and I never study at home, so that's a cafe or the library most days."),
          n("p1", 1, "Most days, plus six or eight trips a year.", "Most days, in some form. Being retired means the week doesn't have the shape it used to have... And there's the travel, which is the big one. Six or eight trips a year."),
          n("p5", 1, "At least once or twice every week.", "At least once or twice every week.", "r"),
          n("p3", 1, "Once every three weeks, sitting down.", "Once every three weeks (sitting down, not ordering take out).", "r")
        ]
      },
      {
        label: "The decision window closes when I set off",
        notes: [
          n("p1", 8, "I'd want to know before I left the house, because that's my only moment of choice.", "Which is exactly why I'd want to know before I left the house, because that's the only moment I've got any choice in it."),
          n("p4", 2, "Always plans ahead, and hates walking around not knowing what they need.", "Always plans ahead. Last thing they want is to walk around not knowing what they need.", "r"),
          n("p6", 2, "I like knowing where I'm going and how long I'll be there.", "I usually plan ahead before I go somewhere. I like knowing where I'm going and having an idea of how long I will be there."),
          n("p5", 2, "Usually a plan-ahead type of person.", "Usually a plan ahead type of person.", "r")
        ]
      },
      {
        label: "But plenty of trips contain no planning at all",
        notes: [
          n("p2", 2, "For studying, zero planning. Class ends and I walk somewhere.", "For studying, zero planning. Class ends and I walk somewhere."),
          n("p2", 2, "The gap is however long it is, so thinking about it eats into it.", "The gap is however long it is, so thinking about it just eats into it."),
          n("p1", 2, "Dinner locally we just go; flying I plan to the minute.", "Dinner locally, we'll just go... Flying, I plan it to the minute. I'm working backwards from boarding time the night before."),
          n("p7", 2, "Golf is planned; whatever I do after might be spontaneous.", "If I'm doing something like golfing, I'll have a plan to go golfing, but whatever I do after might be spontaneous."),
          n("p3", 2, "Chooses the establishment, but doesn't research it.", "Typically chooses what establishment to visit, but doesn't necessarily research where they want to go.", "r")
        ]
      },
      {
        label: "Choosing where to go is a group negotiation, not a plan",
        notes: [
          n("p2", 2, "Six people in a group chat for twenty minutes, not planning but negotiating.", "Going out with friends is the opposite, except it isn't really planning, it's negotiating. Six people in a group chat for twenty minutes."),
          n("p2", 2, "Someone suggests a place, someone checks Maps, someone says it was awful.", "Someone suggests a place, someone checks Maps, someone says they went last Friday and it was awful.")
        ]
      },
      {
        label: "If contributing costs me anything, I skip it",
        notes: [
          n("p2", 10, "More than a couple of seconds and I'm not doing it, because I'm already walking.", "It would need to be quick, too. If reporting takes more than a couple of seconds I'm not doing it, I'm already walking."),
          n("p4", 3, "Wants to get in and get out.", "Grocery stores are also a mess when busy, wants to get in and out.", "r")
        ]
      },
      {
        label: "The second useful moment is on arrival, for the people behind me",
        notes: [
          n("p7", 9, "I get there first, tell them it's busy, and we decide together.", "If I'm meeting someone somewhere and I get there first, I'll usually let them know if it's really busy. Then we can decide if we want to go somewhere else.")
        ]
      }
    ],
    impl: "Two moments carry the product: <b>pre-departure</b> and <b>on arrival</b>. Reading must work before leaving the house; reporting must be a single tap from a notification or widget in under two seconds, with the slider, tags and note all strictly optional."
  },

  {
    id: "T8",
    label: "People already warn each other, they just don't call it reporting",
    groups: [
      {
        label: "I tell my group the moment I see it",
        notes: [
          n("p1", 9, "&ldquo;Leave now, security is a zoo&rdquo; goes to the family group message.", "All the time, to the family. We've got a group message and I'll send “leave now, security is a zoo” if I've just come through it."),
          n("p2", 9, "I photograph the place and send &ldquo;do not come here.&rdquo; That's just normal.", "Constantly. I'll take a photo of the place and send it to the group with something like “do not come here.” That's just normal.")
        ]
      },
      {
        label: "But only for people I'm meeting, or people who ask",
        notes: [
          n("p3", 9, "Yes, when a friend is meeting up or going separately.", "Yes, both when a friend is coming to meet up or when they are going separately, will let them know.", "r"),
          n("p5", 9, "If they're coming to meet up I'll tell them before they head over.", "If they are coming to meet up, they'll let them know before heading over.", "r"),
          n("p6", 9, "If I knew someone was thinking of going, I might tell them.", "Probably. I've definitely talked about how busy places are. If I knew someone else was thinking about going there, I might tell them how crowded it was."),
          n("p7", 9, "Yeah. Can't name a time, but if I'm there first I say something.", "Yeah. I can't really think of a specific time, but if I'm meeting someone somewhere and I get there first, I'll usually let them know if it's really busy.")
        ]
      },
      {
        label: "I don't think of what I'm sending as information",
        notes: [
          n("p2", 9, "I wouldn't write a review. It isn't information, it's complaining.", "I wouldn't write a review about it though. It's a thing you tell your friends, it isn't information, it's just complaining.")
        ]
      },
      {
        label: "Warning strangers has no obvious payoff",
        notes: [
          n("p1", 9, "Somewhere public, for strangers, I wouldn't think to. Who's reading it?", "Somewhere public, for strangers, I wouldn't think to. Who's reading it? What am I getting out of it?"),
          n("p4", 9, "Maybe like once.", "Maybe like once.", "r")
        ]
      },
      {
        label: "The motive is already there, and it's reciprocity",
        notes: [
          n("p1", 9, "You've stood in it. You don't want the next person standing in it.", "You've stood in it, you don't want the next person standing in it.")
        ]
      }
    ],
    impl: "The reporting behaviour exists, it's just trapped in group chats. Two moves unlock it: give a report a <b>share-to-chat path</b> so posting publicly costs nothing extra, and close the loop with a <b>reciprocity receipt</b> (&ldquo;you kept 12 people out of that line&rdquo;) rather than abstract points, because &ldquo;what am I getting out of it&rdquo; is the real objection."
  },

  {
    id: "T9",
    label: "Trust is conditional, and not one participant said yes outright",
    groups: [
      {
        label: "Show me when it was posted",
        notes: [
          n("p1", 10, "More than the official number, provided I can see when it was posted.", "More than the official number, I think, provided I could see when it was posted."),
          n("p1", 10, "An hour old and I ignore it, same as I ignore the signs now.", "And if it was an hour old I'd ignore it, same as I ignore the signs now.")
        ]
      },
      {
        label: "Show me how many people said it",
        notes: [
          n("p1", 10, "One person could be at the wrong terminal, or just wrong.", "But I'd want to know how many people said it. One person could be at the wrong terminal, or just wrong.")
        ]
      },
      {
        label: "Tell me how you handle liars and trolls",
        notes: [
          n("p7", 10, "I'd want to know how they make sure the information is trustworthy.", "I would, but it would have to be done the right way. I'd want to know how they make sure the information is trustworthy."),
          n("p7", 10, "Explain false reports, trolls and moderation and I'd trust it more.", "If the app explained how it deals with false reports, trolls, and moderation, I'd be more likely to trust what people are reporting."),
          n("p3", 10, "I see no reason for someone to rate a place not busy when it is.", "Sees no reason for someone to rate a place not busy when it is.", "r")
        ]
      },
      {
        label: "It has to be right the times I actually check",
        notes: [
          n("p2", 10, "I'd know within about two weeks whether to keep it.", "Whether I'd keep it depends on whether it's ever right when I check it, and I'd work that out within about two weeks."),
          n("p6", 10, "Probably, as long as it's run well and the information seems accurate.", "Probably, as long as the app was run well and the information seemed accurate."),
          n("p5", 10, "Yes, if the results are reliable.", "Yes, if the results are reliable and there is a community already using it.", "r"),
          n("p4", 10, "Doesn't know, maybe. Would have to trial and error it.", "Doesn't know, maybe. Would have to trial and error it.", "r")
        ]
      },
      {
        label: "An empty map is worse than no app at all",
        notes: [
          n("p2", 10, "Nobody posting near campus and it's just an empty map. I'd delete it.", "But it only works if people actually use it. An app like that near campus with nobody posting is just an empty map, and I'd delete it."),
          n("p3", 10, "As a starting point, as long as there's active community use.", "As a starting point, as long as there is active community use.", "r"),
          n("p5", 10, "Yes, if there's a community already using it.", "Yes, if the results are reliable and there is a community already using it.", "r")
        ]
      },
      {
        label: "I already trust apps built exactly this way",
        notes: [
          n("p6", 10, "I use Waze, which relies on other people reporting conditions.", "I already use Waze, which relies on others reporting things like traffic, accidents, and other conditions, so I could see myself using something similar to find out how busy a business is."),
          n("p3", 10, "Already trusts apps such as GasBuddy.", "Already trusts apps such as GasBuddy.", "r")
        ]
      }
    ],
    impl: "Trust signals are <b>features, not polish</b>. Ship the timestamp, the reporter count and the decay on the face of the score; write a plain-language page on how false reports are handled and link it from the gauge; and seed venues so no one's first open is an empty map. Name Waze and GasBuddy in onboarding, since two participants reached for them unprompted."
  }
];

/* ---------------------------------------------------------------------------
   PERSONAS, derived from the affinity wall above.
   Names retained from the team's earlier research pass; substance re-grounded
   in the Phase 2 interview data. Each persona names the participants and the
   themes it was built from.
--------------------------------------------------------------------------- */

const PERSONAS = [
  {
    key: "maya",
    name: "Maya",
    archetype: "The high-stakes planner",
    accent: "#E1584E",
    from: ["p1", "p4"],
    themes: ["T1", "T4", "T5", "T6", "T7"],
    snapshot: "Flies six to eight times a year and plans those mornings to the minute, working backwards from boarding time the night before. Everything else she does is casual. The difference isn't the venue, it's whether a deadline is attached.",
    principle: "The cost of being wrong is asymmetric, and she budgets against the expensive side of it.",
    goals: [
      "Know before leaving the house, because that is the last moment a choice exists",
      "Pick the checkpoint or lane that is actually moving, not the nearest one",
      "Stop paying a 45-minute padding tax on every trip that matters"
    ],
    frustrations: [
      "Published wait times are stale, and there is no way to tell stale from wrong",
      "Once she is in the line there is no leaving, because the decision was already made",
      "The waiting itself is dread plus arithmetic, not boredom"
    ],
    behaviour: [
      "Adds more time. &ldquo;That's the whole strategy, there isn't a second one.&rdquo;",
      "Asks people who are physically there: her wife at another checkpoint, the shuttle driver",
      "Texts the family group the moment she clears a line"
    ],
    threshold: "20 to 30 min for dinner, but where it matters, no threshold at all",
    trust: "Needs a visible timestamp and a count of how many people reported. Ignores anything an hour old.",
    quote: "The cost of being early is a coffee and a magazine. The cost of being late is a missed flight, a rebooking fee and a night in a hotel. Those aren't the same size.",
    quoteBy: "p1",
    serves: "FlightSync puts a live checkpoint and lane breakdown inside the flight lookup she is already doing, and shows the score's age next to the score itself."
  },
  {
    key: "jordan",
    name: "Jordan",
    archetype: "The spontaneous local",
    accent: "#F0A32A",
    from: ["p2", "p7"],
    themes: ["T1", "T2", "T4", "T5", "T7"],
    snapshot: "Out most days with no plan attached. Studies off campus every day, eats out with friends several times a week. Decisions get made while already walking, or negotiated by six people in a group chat.",
    principle: "Each wasted trip is too small to complain about, which is exactly why the total goes unnoticed.",
    goals: [
      "Know whether there is a seat before committing to the walk",
      "Avoid walking in, seeing it full, and walking straight back out",
      "Settle the group chat faster than twenty minutes"
    ],
    frustrations: [
      "Popular times knows the pattern but &ldquo;doesn't know it's midterms&rdquo;",
      "Blames herself for a wasted trip she had no way to predict",
      "Turning around in a full room is a small public humiliation"
    ],
    behaviour: [
      "Just goes, because it's a five minute walk and it's not a big deal any one time",
      "Messages whoever is already inside, because they are looking right at it",
      "Reads Instagram stories to see whether a place is rammed"
    ],
    threshold: "Binary when studying: a table or no table. Half an hour socially.",
    trust: "Will try it and decide inside two weeks. Deletes it if the map near campus is empty.",
    quote: "Some weeks I feel like I've spent half my study time looking for somewhere to study.",
    quoteBy: "p2",
    serves: "Live map with a capacity state, not just a wait in minutes, and a report that completes in one tap, because if it takes longer she is already walking."
  },
  {
    key: "sam",
    name: "Sam",
    archetype: "The reciprocal reporter",
    accent: "#8A6BD1",
    from: ["p6", "p3", "p5"],
    themes: ["T3", "T8", "T9"],
    snapshot: "Already uses Waze and GasBuddy and accepts the bargain those apps make. Warns people he is meeting, gives a prediction when asked, and has never once written a review. He does not think of any of that as reporting.",
    principle: "He contributes because he has stood in the line himself, not because anyone is keeping score.",
    goals: [
      "Not be the reason someone else wastes a trip",
      "Contribute without attaching his real name to anything",
      "Use a tool that is already populated enough to be worth opening"
    ],
    frustrations: [
      "Posting for strangers has no visible payoff, so who is even reading it?",
      "Won't trust a crowd whose moderation story is unexplained",
      "An app with nobody posting is just an empty map"
    ],
    behaviour: [
      "Tells people before they head over, every time",
      "Reports traffic and conditions on Waze already, out of habit",
      "Assumes good faith, seeing no reason for anyone to call a busy place quiet"
    ],
    threshold: "About 30 min at a restaurant, but will still enter a busy store to get what he needs",
    trust: "Needs the moderation policy stated plainly, and needs to see the community is already active.",
    quote: "You've stood in it, you don't want the next person standing in it.",
    quoteBy: "p1",
    serves: "Anonymous bee-name identity removes the exposure objection, and a reciprocity receipt, showing who your report actually helped, answers &ldquo;what am I getting out of it.&rdquo;",
    revision: "This persona was revised by the Phase 2 data. The earlier draft cast Sam as a leaderboard-and-streak completionist. No participant raised gamification, and three questioned the payoff of contributing at all (P1, P2, P4). The motive the interviews actually support is reciprocity, and the barrier is identity exposure, so badges and streaks are retention polish, not the reason anyone adopts."
  }
];
