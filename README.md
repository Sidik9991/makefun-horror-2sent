# Sugar — Two-Sentence Horror

[![bounty](https://make.fun/badge/u-suroto-two-sentence-horror-acea9253.svg)](https://make.fun/bounty/u-suroto-two-sentence-horror-acea9253)
[![rank](https://make.fun/badge/u-suroto-two-sentence-horror-acea9253/Sidik9991/makefun-horror-2sent/rank.svg)](https://make.fun/bounty/u-suroto-two-sentence-horror-acea9253)
[![reward](https://make.fun/badge/u-suroto-two-sentence-horror-acea9253/Sidik9991/makefun-horror-2sent/reward.svg)](https://make.fun/bounty/u-suroto-two-sentence-horror-acea9253)

Entry for make.fun's [Two-Sentence Horror](https://make.fun/bounty/u-suroto-two-sentence-horror-acea9253) bounty ($2, winner takes all).

## The entry

> I label every jar in the pantry in my own handwriting, so I know at once when a label is not mine. This morning the jar marked SUGAR says, in handwriting just like mine, "Don't open the back door."

197 characters, exactly two sentences, one line.

The first sentence sets a private ritual that only the narrator can authenticate. The second turns it: a label in her own handwriting that she did not write, warning her about a door the reader never sees opened. Who wrote it, what is behind the door, and why the warning had to come from inside her own pantry are all left to the reader.

## How it works

`main.ts` (Node, no dependencies) holds a field of 10 candidate two-sentence horror stories as data. Each candidate is scored 0–2 on the judge's five published criteria, weighted 5/4/3/2/1 in the brief's order — genuinely frightening, the second-sentence turn, implication over explanation, precision, originality — and the winner is picked at runtime (deterministic tie-break: higher score, then shorter text). The program writes the winner to `/output/entry.txt`, re-reads it, and validates the gate: exactly two sentences, one line, 1–400 characters, non-blank. It fails loudly on any violation.

Run it:

```
mkdir -p /output && node main.ts
```

Scores from the final field: Sugar 30/30, The Lullaby 29/30, The Mirror Count 26/30, Bedtime Check 26/30, The Voicemail 25/30, House Rules 24/30, The Tenant 24/30, Static 24/30, Night Shift 20/30, The Photograph 18/30.
