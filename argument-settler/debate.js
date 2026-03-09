// The debate engine — orchestrates the chaos

import { PERSONAS, JUDGE } from "./personas.js";

const ROUNDS = 3;

function generatePositions(topic) {
  // Generate two opposing positions on any topic
  const templates = [
    [`${topic} is absolutely, undeniably THE BEST thing ever`, `${topic} is overrated and the world needs to wake up`],
    [`${topic} will save humanity`, `${topic} is a ticking time bomb`],
    [`${topic} deserves MORE attention and funding`, `${topic} already gets way too much hype`],
    [`${topic} is the future`, `${topic} is a relic of the past`],
    [`we need MORE ${topic} in our lives`, `we need to collectively touch grass and forget about ${topic}`],
    [`${topic} is peak culture`, `${topic} is the downfall of civilization`],
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function printBanner() {
  console.log(`
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551   \u{2696}\u{FE0F}  THE ARGUMENT SETTLER  \u{2696}\u{FE0F}                    \u2551
\u2551   Two personas enter. One opinion survives.     \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D
  `);
}

function printDebaterIntro(persona, position) {
  console.log(`\n${"=".repeat(56)}`);
  console.log(`${persona.emoji}  ${persona.name}`);
  console.log(`   Style: ${persona.style.toUpperCase()}`);
  console.log(`   Position: "${position}"`);
  console.log(`${"=".repeat(56)}`);
}

function printRoundHeader(round) {
  console.log(`\n\u{1F514} ${"~".repeat(20)} ROUND ${round + 1} ${"~".repeat(20)} \u{1F514}\n`);
}

function printArgument(persona, argument) {
  const border = persona.style === "aggressive" ? "\u{1F525}" : "\u{1F9D0}";
  console.log(`${border} ${persona.name}:`);
  console.log(`   "${argument}"\n`);
}

function printJudgeScore(scoreResult) {
  console.log(`\u{2696}\u{FE0F}  JUDGE'S SCORECARD:`);
  scoreResult.commentary.forEach(line => {
    console.log(`   ${line}`);
  });
  console.log();
}

function printFinalVerdict(blazeTotal, profTotal) {
  const result = JUDGE.declareWinner(blazeTotal, profTotal);
  console.log(`\n${"*".repeat(56)}`);
  console.log(`\u{1F3C6}  FINAL VERDICT  \u{1F3C6}`);
  console.log(`${"*".repeat(56)}`);
  console.log(`\n${JUDGE.emoji} ${JUDGE.name} speaks:\n`);
  console.log(`   "${result.speech}"\n`);
  console.log(`   WINNER: ${result.winner}`);
  console.log(`\n   Final Score: \u{1F525} ${blazeTotal} — ${profTotal} \u{1F9D0}`);
  console.log(`\n${"*".repeat(56)}\n`);
}

export async function runDebate(topic) {
  const blaze = PERSONAS.firebrand;
  const prof = PERSONAS.professor;

  const [blazePosition, profPosition] = generatePositions(topic);

  let blazeTotal = 0;
  let profTotal = 0;

  printBanner();

  console.log(`\u{1F4E2} TODAY'S TOPIC: "${topic.toUpperCase()}"\n`);

  // Introduce the debaters
  printDebaterIntro(blaze, blazePosition);
  printDebaterIntro(prof, profPosition);

  // Opening statements
  console.log(`\n\u{1F3AC} OPENING STATEMENTS:\n`);
  const blazeOpener = blaze.openingLines[Math.floor(Math.random() * blaze.openingLines.length)];
  const profOpener = prof.openingLines[Math.floor(Math.random() * prof.openingLines.length)];
  printArgument(blaze, blazeOpener);
  await sleep(500);
  printArgument(prof, profOpener);
  await sleep(500);

  // Main rounds
  for (let round = 0; round < ROUNDS; round++) {
    printRoundHeader(round);
    await sleep(300);

    const blazeArg = blaze.buildArgument(topic, blazePosition, round);
    printArgument(blaze, blazeArg);
    await sleep(400);

    const profArg = prof.buildArgument(topic, profPosition, round);
    printArgument(prof, profArg);
    await sleep(400);

    // Judge scores the round
    const score = JUDGE.scoreRound(round, blazeArg, profArg);
    printJudgeScore(score);

    blazeTotal += score.blazeScore;
    profTotal += score.profScore;

    await sleep(500);
  }

  // Closing statements
  console.log(`\n\u{1F3AC} CLOSING STATEMENTS:\n`);
  const blazeCloser = blaze.closingLines[Math.floor(Math.random() * blaze.closingLines.length)];
  const profCloser = prof.closingLines[Math.floor(Math.random() * prof.closingLines.length)];
  printArgument(blaze, blazeCloser);
  await sleep(500);
  printArgument(prof, profCloser);
  await sleep(800);

  // Final verdict
  printFinalVerdict(blazeTotal, profTotal);
}
