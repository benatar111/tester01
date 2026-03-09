#!/usr/bin/env node

// THE ARGUMENT SETTLER
// Two personas debate any topic. A judge declares a winner.
// Nobody learns anything. Everyone has a great time.

import { runDebate } from "./debate.js";
import { createInterface } from "readline";

const SAMPLE_TOPICS = [
  "pineapple on pizza",
  "tabs vs spaces",
  "cats vs dogs",
  "is a hot dog a sandwich",
  "should toilet paper hang over or under",
  "vim vs emacs",
  "dark mode vs light mode",
  "Oxford comma",
  "whether birds are real",
  "standing up to wipe vs sitting down",
  "is water wet",
  "are pop tarts ravioli",
  "should cereal or milk go first",
];

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
  \u{2696}\u{FE0F}  THE ARGUMENT SETTLER  \u{2696}\u{FE0F}

  Usage:
    node index.js                    Interactive mode — enter a topic
    node index.js <topic>            Debate the given topic
    node index.js --random           Debate a random spicy topic
    node index.js --help             Show this help

  Examples:
    node index.js "pineapple on pizza"
    node index.js "is a hot dog a sandwich"
    node index.js --random
    `);
    process.exit(0);
  }

  let topic;

  if (args.includes("--random") || args.includes("-r")) {
    topic = SAMPLE_TOPICS[Math.floor(Math.random() * SAMPLE_TOPICS.length)];
    console.log(`\n\u{1F3B2} Random topic selected: "${topic}"\n`);
  } else if (args.length > 0) {
    topic = args.join(" ");
  } else {
    // Interactive mode
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    topic = await new Promise((resolve) => {
      console.log("\n\u{2696}\u{FE0F}  THE ARGUMENT SETTLER  \u{2696}\u{FE0F}\n");
      console.log("Give me any topic and two personas will battle it out.\n");
      console.log("Sample topics:");
      const samples = SAMPLE_TOPICS.sort(() => Math.random() - 0.5).slice(0, 5);
      samples.forEach(t => console.log(`  \u{2022} ${t}`));
      console.log();
      rl.question("\u{1F4AC} Enter a topic to debate: ", (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });

    if (!topic) {
      topic = SAMPLE_TOPICS[Math.floor(Math.random() * SAMPLE_TOPICS.length)];
      console.log(`\nNo topic? Fine. I'll pick one: "${topic}"\n`);
    }
  }

  await runDebate(topic);
}

main().catch(console.error);
