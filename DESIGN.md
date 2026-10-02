# Design

Verbträning is a street of painted Swedish timber houses, kept calm. One accent colour (indigo) does all the pointing; pastel paints are reserved for the four tenses so colour only appears where it teaches. Shapes stay architectural: arched "doors" for the next-step card and flashcards, pills for controls, a short skyline strip on the header.

## Principles
- One primary action per screen. Everything else is quiet text.
- Reveal progressively: a new learner sees one card and one button. Practice, All verbs, Conjugations and Particle verbs appear in the nav as they become relevant ("Coming up" on Home says what unlocks them). "Show all features" on Home reveals everything.
- Words before forms: lessons teach meaning + infinitiv + presens first; preteritum + supinum are a separate lesson per verb, offered once that verb's words reach level 2 (Learning).
- Mastery, not known/unknown: every verb has a level (Not started, Started, Learning, Familiar, Strong, Mastered) derived from its card intervals (4, 10, 30, 90 days). Words and conjugations are tracked separately.

## Colour
Neutral ground, white surfaces, indigo `--primary` and its tint `--tint`. Mastery uses one hue light to dark (`--m0` to `--m5`). Tense paints (`.t-inf` sage, `.t-pres` butter, `.t-pret` rose, `.t-sup` sky) appear only on conjugation tiles and sentence rows. Dark mode is a night street with the same structure.

## Type
Familjen Grotesk (display, big verb forms) and Figtree (body). Sentence-case labels. Swedish terms always carry an English gloss on first sight: Preteritum (past), Supinum (perfect).

## Components
`.card-box`, `.next` (arched next-step door), `.batch-list`, `.mbar` + `.legend` (verbs by level), `.pips` (5-dot level), `.pair` (form tiles), `.tense` (sentence row), `.choice` (practice type), `.face` flashcard (white front, tinted back, level pips), `.rate-row` (Not yet / Got it / Easy), `.opts` (quiz).

## Motion
Exponential ease-out only. One staggered rise on route change, 3D card flip, a small burst on finishing a session. All disabled under `prefers-reduced-motion`.
