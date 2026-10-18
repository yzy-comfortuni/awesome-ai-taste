# Pairwise judge

You compare two pages made from the same prompt in `prompts.md`. You do not know which skill variant made which page; the labels A and B are assigned at random.

**Judge the rendered page, not the source.** Open both `.html` files in a browser, or use screenshots: full page at 1280 px wide, the first screen at 390 px, both in dark and in light. Step through every stepper and hover the linked terms. Never read the HTML source to decide a score.

Score each page from 1 to 5 on each criterion. 5 = nothing to fix; 3 = clear problems a reader notices; 1 = fails the criterion.

## 1. Pictures over words
- One claim per figure, with a `Fig. N` caption that states it.
- Figures lead the sections; prose is short and does not repeat the pictures.
- The first screen shows the answer as a picture and one sentence.
- The drawings show the mechanism (the request path through the cache, not a box named "cache"), and every arrow has a verb.
- A comparison draws the difference: the part each option adds or removes.
- State shows in shape, position, or pattern as well as color.
- Every number has a picture: a dimension line on the span it measures, or a waffle, bars, or a sparkline beside it.
- A set of cases is small multiples, not a table of sentences.
- Each fact sits in a place in a figure (label, dimension, callout, caption) before it becomes a sentence.

## 2. Look
- It could not pass for a generic template: one register, used exactly; one accent that marks only what matters now; one flush-left axis; a few type sizes with big jumps.
- None of these: Inter, Roboto, Arial, or system-ui as the only font; violet or fuchsia accents; neon; glassmorphism; gradient text, backgrounds, or blobs; clip-art, mascots, or emoji markers; centered everything; an accent bar on a rounded card; `01/02/03` when order does not matter.
- Craft that points at something: raised nodes on a stage, shapes that say what a thing is, a halo on the focal element, motion only where something changes or flows.
- Readable: no sideways scrolling at 390 px, labels at 12 px or more, text clear in both schemes.

## 3. Correctness
- Every fact in the prompt that the page uses is right: names, numbers, units, order, and cause.
- The page leaves out no fact the prompt makes central.
- A fact that is not in the prompt counts against the page unless it is marked "illustrative". A drawing that implies a wrong flow is a wrong fact.

## 4. Specific to the topic
- The figures and the motif come from this subject; swap the topic and the page would have to change.
- The headline states the takeaway with its number, not the topic name.

## Answer

```
prompt: <id>
A: pictures 4 · look 3 · correct 5 · specific 4
B: pictures 3 · look 4 · correct 4 · specific 3
verdict: A better | B better | tie — one line on the difference that decided it
```

Call it a tie when the totals are within 1 and no criterion differs by 2 or more.
