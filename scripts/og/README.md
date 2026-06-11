# Social-preview (og:image) cards

Per-page social-preview images: the card that platforms (Slack, iMessage, X,
LinkedIn, WhatsApp) show when a CIRIS link is shared. 1200x630 (1.91:1), dark,
on-brand. This is **Model A** from the design handoff: text-free brand art with
a composited title zone, so the same art works across locales.

## Files

- `cards/` — the React/Babel card components (from the design handoff).
  - `mark.js` — the CIRIS compass mark path + viewBox.
  - `shell.jsx` — shared palette (`window.CIRIS`), `Mark`, `Lockup`, the `Card`
    frame (accent gradient + hairline grid + scrim + title zone), and `Stage`.
  - `cards-a.jsx` / `cards-b.jsx` / `cards-c.jsx` — the 18 marketing cards.
  - `cards-accord.jsx` — `OGAccord`, the unified Accord template (per-book accent).
  - `cards-default.jsx` — `OGBrand`, the generic title-less fallback card.
- `jobs.txt` — `slug|Component|book|accentKey`, one card per line.
- `generate.py` — inlines the cards, renders each at 2x via headless Chrome,
  crops + downscales to an exact 1200x630 PNG in `public/og/`.

## Regenerate

```bash
python3 scripts/og/generate.py            # all cards
python3 scripts/og/generate.py og-trust   # one (or more) slugs
```

Needs `google-chrome` on PATH, Pillow, and network access (React/Babel UMD and
the Geist webfont load from CDNs at render time).

## How it's wired

`src/lib/seo.ts` is the single source of truth:

- `ogImage(basePath)` maps a marketing page to `/og/og-<slug>.jpg`
  (`"/"` → `og-home`, `"/trust"` → `og-trust`). `localizedSeo()` sets every
  marketing page's `og:image`/`twitter:image` to its card, for all 29 locales.
- `DEFAULT_OG_IMAGE` (`/og/og-default.jpg`) is the generic brand fallback: the
  site-wide default in `src/app/layout.tsx`, and the image for English-only
  utility pages (architecture, papers, status, …) that set their own
  `openGraph` in `layout.tsx`.

Slugs in `jobs.txt` must match `ogImage()` / `DEFAULT_OG_IMAGE`. The Accord
reader (`/sections/**`) uses `og-sections.jpg`.

### Note on Next.js metadata merging

Next.js merges metadata **shallowly** and *overwrites* nested objects: a segment
that defines `openGraph` replaces the parent's `openGraph` entirely (images and
all). So any page/layout that sets its own `openGraph` must also set `images` —
that's why utility-page layouts spread in `DEFAULT_OG_IMAGE`, and why marketing
pages go through `localizedSeo()` rather than relying on inheritance.

## Localizing the cards (Model A, future)

The art is text-free, so a localized card = the same art with the locale's title
composited into the title zone. The display titles live in the card components
(short, with `<br/>` breaks) and differ from the longer SEO `og:title`. To ship
localized cards: translate those ~22 short titles per locale, render per locale,
and have `ogImage()` return a per-locale path.
