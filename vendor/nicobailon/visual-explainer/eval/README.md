# Eval: compare two variants of the skill

Not shipped in the package. Methodology only; record results in `docs/`.

1. Check out variant A and variant B of the skill side by side (for example, two worktrees).
2. For each prompt in `prompts.md`, start a fresh agent with only that variant's skill loaded and no repository or web access. Save its page as `<scratch>/A/<prompt id>.html` (or `B/`), outside the repository. Use the same model and settings for both variants.
3. Score each directory: `node eval/score.mjs <scratch>/A` and `node eval/score.mjs <scratch>/B` (`--json` for machine output). The browser check needs `playwright-core` (`npm install`).
4. Judge each prompt's pair with `judge.md`, in a fresh session. Assign A and B to the two pages at random, and do not tell the judge which variant is which.
5. Compare: the agents' token use, the score tables, and the judge verdicts. Treat a variant as better only if it wins or ties on every prompt's correctness.
