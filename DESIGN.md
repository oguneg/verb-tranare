# Design

Verbträning is a street of painted Swedish timber houses. Colour carries meaning; shapes are architectural (arched doors, round windows, gables, pills). Friendly and lively, never cartoony or precious.

## Colour
Pale cool ground (`--ground`), one indigo for ink and primary action (`--ink`, `--primary`), and a set of pastel facade paints used as fills:

| Paint | Role |
|---|---|
| sage | infinitiv, "next: learn" door, card C (irregular), done steps |
| butter | presens, current step, "next: practice" door |
| rose | preteritum, "next: review" door, again, irregular badge |
| sky-paint | supinum, particle-verbs card |
| lilac | particle card type (P), irregular-verbs card, "all caught up" door |
| peach | card type A (EN to SV), hard |
| mint | card type B (SV to EN) |

Tense colours are fixed across the whole app (`.t-inf .t-pres .t-pret .t-sup`). A card's paint must never equal the paint of tiles drawn on it. Dark mode is a night street: deep indigo ground, same paints at low lightness, lighter indigo primary.

## Type
Familjen Grotesk (display, headings, big forms, numerals) and Figtree (body), both from Google Fonts. Sentence-case labels, no tracked uppercase.

## Shape
Arch-topped "doors" (large top radius, round window dot) for the next-step card and every flashcard; 20-28px radii on surfaces; pills for chips, buttons, stats and nav tabs (nav tabs have an arched top). A pastel skyline SVG (`img/skyline.svg`) stands on the header edge with a slowly bobbing sun.

## Depth and motion
Soft two-layer shadows, no outlines, no hard offset shadows. Exponential ease-out only (`--ease`, `--spring`, no overshoot). One authored moment per route change (staggered rise), progress bars grow in, cards flip in 3D, completion screens release a burst of pastel dots. All motion is disabled under `prefers-reduced-motion`.

## Components
`.card-box` surface, `.next` door, `.path` step pills, `.pill-stat`, `.chip` (cycling paints, `.on` = primary), `.tense` rows tinted by tense, `.face` flashcard door (`.card-A/B/C/P`), `.rate` buttons (rose/peach/sage/sky), `.opts` quiz pills, `.bar` tier-coloured progress, `.burst` completion.
