// Debater personas with distinct personalities, arguing styles, and quirks

export const PERSONAS = {
  // The passionate, dramatic debater who argues with fire
  firebrand: {
    name: "Blaze McHotTake",
    style: "aggressive",
    emoji: "\u{1F525}",
    quirks: [
      "CAPITALIZES random WORDS for emphasis",
      "uses dramatic metaphors involving fire and explosions",
      "ends arguments with mic-drop one-liners",
      "occasionally breaks into fake statistics (74.3% of experts agree with me)",
    ],
    openingLines: [
      "Oh, you want to go there? LET'S GO THERE.",
      "I've been WAITING for someone to bring this up.",
      "Buckle up, because I'm about to DROP some truth.",
      "My opponent is already WRONG and they haven't even spoken yet.",
    ],
    closingLines: [
      "And THAT is why I rest my case. *drops mic*",
      "The EVIDENCE speaks for itself. I'm done here.",
      "If you disagree, you're not just wrong\u2014you're COSMICALLY wrong.",
      "I'll be here all week. Unlike my opponent's argument, which just DIED.",
    ],
    buildArgument(topic, position, round) {
      const intensity = round * 20;
      const tactics = [
        `Let me be CRYSTAL clear: ${position} is the only RATIONAL take on ${topic}.`,
        `While my opponent fiddles with feelings, I deal in FACTS. And the facts say ${position}.`,
        `I've studied this for YEARS (approximately ${Math.floor(Math.random() * 30) + 5} years, give or take). ${position}. End of story.`,
        `${Math.floor(Math.random() * 90 + 10)}% of leading experts in ${topic} agree: ${position}. I just made that up, but it FEELS right.`,
        `My opponent's argument has the structural integrity of a wet napkin. Meanwhile, ${position} stands like a FORTRESS.`,
      ];
      const rebuttalSpice = [
        "And ANOTHER thing\u2014",
        "But wait, there's MORE\u2014",
        "Oh, you thought I was done? I'm just getting WARMED UP\u2014",
        "Let me add GASOLINE to this fire\u2014",
      ];

      let argument = tactics[round % tactics.length];
      if (round > 1) {
        argument = rebuttalSpice[round % rebuttalSpice.length] + " " + argument;
      }
      return argument;
    }
  },

  // The calm, overly intellectual debater who argues with condescension
  professor: {
    name: "Dr. Penelope Pontific VIII",
    style: "intellectual",
    emoji: "\u{1F9D0}",
    quirks: [
      "references obscure philosophers nobody has heard of",
      "uses unnecessarily long words",
      "sighs before making counterpoints",
      "cites fake academic papers",
    ],
    openingLines: [
      "*adjusts monocle* Ah, a topic worthy of discourse. Finally.",
      "As Blünthorpe wrote in 1847, every great debate begins with a sigh. *sigh*",
      "I've prepared a 47-slide presentation, but I'll summarize for... simpler minds.",
      "How delightfully quaint that we're discussing this. Allow me to illuminate.",
    ],
    closingLines: [
      "*removes monocle, polishes it* I believe the point has been made. Adequately.",
      "As the ancient Sumerian proverb goes: 'The wise goat does not argue with thunder.' Think about it.",
      "I'd explain further, but I fear the nuance would be... lost.",
      "Q.E.D. For those unfamiliar, that means I'm right.",
    ],
    buildArgument(topic, position, round) {
      const fakePhilosophers = [
        "Günther von Schnitzelhaus",
        "Madame Blériot-Fantasque",
        "Professor Thaddeus Bumblington III",
        "the great Yoruba thinker Oluwafunmilayo",
        "12th-century monk Brother Pudding",
      ];
      const fakeJournals = [
        "The Quarterly Review of Obvious Things",
        "Journal of Unnecessarily Complex Opinions",
        "Annals of Being Correct (peer-reviewed)",
        "The International Gazette of Smugness",
      ];

      const tactics = [
        `*sigh* Must I explain this? As ${fakePhilosophers[round % fakePhilosophers.length]} theorized in their seminal work: ${position}. It's really quite elementary.`,
        `A study in the ${fakeJournals[round % fakeJournals.length]} conclusively demonstrated that ${position}. I presume my opponent hasn't read it. Pity.`,
        `The epistemological framework surrounding ${topic} makes it ABUNDANTLY clear to anyone with adequate cerebral capacity that ${position}.`,
        `I've lectured on ${topic} at no fewer than ${Math.floor(Math.random() * 12 + 3)} universities (some of which exist). The consensus? ${position}.`,
        `While my opponent relies on *checks notes* feelings and vibes, the hermeneutical analysis of ${topic} irrefutably supports that ${position}.`,
      ];

      let argument = tactics[round % tactics.length];
      if (round > 1) {
        argument = "*adjusts monocle with increasing frustration* " + argument;
      }
      return argument;
    }
  }
};

// The judge persona
export const JUDGE = {
  name: "The Honorable Judge Judy 2.0",
  emoji: "\u{2696}\u{FE0F}",

  scoreRound(round, blazeArg, profArg) {
    // Scoring is intentionally chaotic and funny
    const categories = [
      { name: "Dramatic Flair", blazeBonus: 2, profBonus: 0 },
      { name: "Vocabulary Intimidation", blazeBonus: 0, profBonus: 2 },
      { name: "Confidence (Unearned)", blazeBonus: 1, profBonus: 1 },
      { name: "Fake Statistic Quality", blazeBonus: 1, profBonus: 1 },
      { name: "Audience Eye-Roll Factor", blazeBonus: 1, profBonus: 2 },
      { name: "Sheer Audacity", blazeBonus: 2, profBonus: 1 },
    ];

    const category = categories[round % categories.length];
    const blazeScore = Math.floor(Math.random() * 5) + 3 + category.blazeBonus;
    const profScore = Math.floor(Math.random() * 5) + 3 + category.profBonus;

    const commentary = [
      `Judging on "${category.name}" this round...`,
      `Blaze scores ${blazeScore}/10\u2014${blazeScore >= 7 ? "ELECTRIC energy!" : "needs more fire."}`,
      `Dr. Pontific scores ${profScore}/10\u2014${profScore >= 7 ? "devastatingly pretentious. Love it." : "not pompous enough."}`,
    ];

    return { blazeScore, profScore, category: category.name, commentary };
  },

  declareWinner(blazeTotal, profTotal) {
    if (blazeTotal > profTotal) {
      return {
        winner: "Blaze McHotTake \u{1F525}",
        speech: `BY THE POWER VESTED IN ME by absolutely no one, I declare Blaze McHotTake the winner with ${blazeTotal} points to ${profTotal}! The crowd goes wild! (There is no crowd.) The hot takes have PREVAILED!`
      };
    } else if (profTotal > blazeTotal) {
      return {
        winner: "Dr. Penelope Pontific VIII \u{1F9D0}",
        speech: `After careful deliberation and a light nap, I declare Dr. Pontific the winner with ${profTotal} points to ${blazeTotal}! Pretentiousness TRIUMPHS over passion! Somewhere, a fake philosopher is smiling.`
      };
    } else {
      return {
        winner: "IT'S A TIE \u{1F92F}",
        speech: `UNBELIEVABLE! ${blazeTotal} to ${profTotal}! A perfect tie! Both debaters are equally right AND equally insufferable! This has never happened before! (It happens like 30% of the time.)`
      };
    }
  }
};
