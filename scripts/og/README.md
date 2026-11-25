# Social cards

The preview image a link to ciris.ai shows: one frame of the homepage's ocean
with the page's title over it. Still JPEGs, 1200x630, one per page and locale,
in `public/og` (English) and `public/og/<locale>`.

- `cards.json`: every page that has a card, and its art (`mode`: signet, whale
  or both; `night`; `seed`). `"en": true` means there is no localized twin.
  `src/lib/seo.ts` reads this file, so a page added here needs no other wiring
  if it uses `localizedSeo` or `ogImages`.
- `art.html`: draws the frame with the site's own ocean modules.
- `card.html`: sets the title, kicker and mark over a frame.
- `generate.py`: compiles the ocean, reads titles from the dictionaries and
  `src/lib/marketing-og.ts`, and renders. Run it after changing the ocean, a
  title, or `cards.json`:

      python3 scripts/og/generate.py [--locales en,ar] [--pages /,/web4]

Needs Chrome, node_modules, and `pip install playwright pillow`.
