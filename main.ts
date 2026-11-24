// Sugar — a two-sentence horror entry for make.fun's "Two-Sentence Horror".
//
// Holds a field of candidate two-sentence horror stories as data, scores each
// one against the judge's published criteria, picks the winner at runtime,
// writes it to /output/entry.txt, then re-reads the file and validates the
// gate: exactly two sentences, one line, 1-400 characters, non-blank.
// Any gate failure is loud: the program throws and exits non-zero.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = {
  title: string;
  text: string;
  // Scores 0-2 per criterion, in the judge's order of importance:
  // [dread, twist, implication, precision, originality]
  scores: [number, number, number, number, number];
};

// Weights follow the judge brief: frightening first, then the second-sentence
// turn, then implication over explanation, then precision, then originality.
const WEIGHTS = [5, 4, 3, 2, 1];
const MAX_SCORE = 2 * WEIGHTS.reduce((a, b) => a + b, 0); // 30

const CANDIDATES: Candidate[] = [
  {
    title: "Sugar",
    text: 'I label every jar in the pantry in my own handwriting, so I know at once when a label is not mine. This morning the jar marked SUGAR says, in handwriting just like mine, "Don\'t open the back door."',
    scores: [2, 2, 2, 2, 2],
  },
  {
    title: "The Mirror Count",
    text: "Every night I count the reflections in the hallway mirror to make sure there are only two of us in the house. Last night there were three, and the extra one was the only one not moving.",
    scores: [2, 2, 1, 2, 1],
  },
  {
    title: "Bedtime Check",
    text: "My daughter asks me to check under her bed every night, and every night I tell her there is nothing there. Tonight she whispered from inside the closet that the thing under the bed is asking about me too.",
    scores: [2, 2, 2, 1, 0],
  },
  {
    title: "The Voicemail",
    text: "My phone saves one voicemail from my mother every year on my birthday, though she died six years ago. This year's message was just her counting down from ten, and she is getting slower.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    title: "House Rules",
    text: "The new babysitter left a note saying the children were angels and the man in the attic was very polite. We do not have an attic.",
    scores: [1, 2, 2, 2, 1],
  },
  {
    title: "Night Shift",
    text: "The security guard at the morgue quit after he kept finding the toe tags rearranged into alphabetical order. On his last night, his own name was spelled out on the empty slab.",
    scores: [2, 1, 1, 1, 1],
  },
  {
    title: "The Photograph",
    text: "In every family photo from my childhood, a tall man stands behind my father with his hands on his shoulders. My father insists he has never seen the man, but he will not look at the photographs anymore.",
    scores: [1, 1, 2, 1, 1],
  },
];

function scoreOf(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

// A sentence ends at ., ! or ? (plus any closing quote/bracket) that is
// followed by whitespace or the end of the text. This keeps abbreviations
// like "3 a.m.," from counting as sentence breaks.
function countSentences(text: string): number {
  const matches = text.match(/[.!?]+["'”’)]*(?=\s|$)/g);
  return matches ? matches.length : 0;
}

function validateGate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("gate fail: entry is blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate fail: entry is not one line");
  }
  if (text.length < 1 || text.length > 400) {
    throw new Error(`gate fail: entry is ${text.length} chars, outside 1-400`);
  }
  const sentences = countSentences(text);
  if (sentences !== 2) {
    throw new Error(`gate fail: entry has ${sentences} sentences, need exactly 2`);
  }
}

function pickWinner(candidates: Candidate[]): Candidate {
  let best: Candidate | null = null;
  let bestScore = -1;
  for (const c of candidates) {
    validateGate(c.text); // every candidate must itself pass the gate
    const s = scoreOf(c);
    // Deterministic: higher score wins; a tie goes to the shorter text,
    // then to the earlier candidate in the list.
    if (s > bestScore || (s === bestScore && best !== null && c.text.length < best.text.length)) {
      best = c;
      bestScore = s;
    }
  }
  if (best === null) throw new Error("no candidates");
  return best;
}

function main(): void {
  for (const c of CANDIDATES) {
    console.log(`${scoreOf(c)}/${MAX_SCORE}  ${c.title}`);
  }
  const winner = pickWinner(CANDIDATES);
  console.log(`winner: "${winner.title}" (${scoreOf(winner)}/${MAX_SCORE}, ${winner.text.length} chars)`);

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.text, "utf8");

  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== winner.text) {
    throw new Error("gate fail: /output/entry.txt does not match the winning text");
  }
  validateGate(written);
  console.log(`gate ok: one line, ${written.length} chars, ${countSentences(written)} sentences`);
  console.log(written);
}

main();
