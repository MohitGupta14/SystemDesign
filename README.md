# ◆ System Design Atlas

**One map, every free resource.** A single-page app that collapses five sites' worth of system-design and low-level-design courses into one structured learning path, an interactive graph roadmap, and a source index — with every topic annotated and every link verified.

Live at: **https://github.com/MohitGupta14/SystemDesign** (built with Vite + React — `npm run build` produces a static `dist/` you can host anywhere: GitHub Pages, Netlify, or open locally).

---

## What's inside

The page has three tabs in the top nav bar:

| Tab | What it does |
| --- | --- |
| **Learning Path** | The canonical order of topics, grouped into 8 levels (L0 *Prerequisites* → L7 *Design Patterns*). Browse, filter by Free/Paid and by category (HLD / LLD / Case Study / Pattern), and search any topic. |
| **Roadmap** | A top-to-bottom graph of every topic. Each node is clickable — sub-node chips branch off it. Clicking a node opens its topic card. |
| **Resources** | The five source sites, with free/paid/unknown tallies and direct links. |

### Cards & the topic modal

- Every **topic card is clickable** and shows a one-line description of the topic before its resource links.
- Clicking a card (or a **roadmap node / sub-node**, or a **"Start here"** step) opens a **topic modal** — a focused view with:
  - the topic's category and difficulty badge,
  - a short *what this topic actually is* description,
  - its **sub-topics** (when present),
  - the resource links it maps to, with free/paid pills and a ★ on our recommended free pick.

### Data quality (why you can trust the links)

- **96 canonical topics**, ~120 resource URLs, merged across 5 sites.
- Every resource URL was **live-checked** (HTTP 200) in the current build. 8 DesignGurus slugs had silently changed → all 8 were corrected against the official course sitemap.
- Links that were **reconstructed from a site's URL pattern** carry a `~` tooltip so you know they weren't confirmed on-page at collection time.
- Free/paid status reflects what was visible at collection time and can change — always check the source before paying for anything.

## Status markers

| Marker | Meaning |
| --- | --- |
| `FREE` | No paywall found |
| `PAID` | Behind a paywall |
| `?` | Access unclear from the source |
| `★` | Our recommended pick for that topic |
| `~` | URL reconstructed from the site's pattern, not confirmed on the page |

## How the data is organized

This is a **Vite + React** app. Source lives in `src/`, and all content is data-driven:

- `src/data/levels.json` — an array of levels; each level has `topics`, and each topic has:
  - `name`, `difficulty` (`Beginner`/`Intermediate`/`Advanced`), `category` (`HLD`/`LLD`/`Case Study`/`Pattern`),
  - `about` — the one-liner shown on the card and in the modal,
  - `sub` — optional sub-topics rendered as child nodes in the roadmap,
  - `resources` — array of `{ site, title, url, status, conf }`.
- `src/data/sites.json` — the five source sites and their descriptions.
- `src/components/` — `Header`, `Hero`, `Toolbar`, `PathView`, `RoadmapView`, `ResourcesView`, `TopicModal`, and friends.

To add a topic, add an object to the matching level's `topics` in `levels.json` — the Learning Path, Roadmap, Resources tally, and stats all rebuild automatically.

## Running locally

```bash
npm install     # first time
npm run dev     # local dev server with hot reload
npm run build   # production build → dist/
npm run preview # preview the production build
```

## Adding / fixing a resource

1. Open `src/data/levels.json`, find the topic.
2. Add an entry to its `resources` array, e.g.
   `{ "site": "ByteByteGo", "title": "Design A Rate Limiter", "url": "<url>", "status": "free", "conf": "verified" }`
3. Run the link check to make sure it resolves:

```bash
# extract urls and check HTTP status
rg -o 'https://[^"}]+' src/data/levels.json | sort -u \
  | xargs -P 14 -I{} curl -s -o /dev/null -w '%{http_code}  {}\n' -L "{}"
```

Anything that isn't `200` needs fixing.

## Verification checklist (this build)

- [x] 96 topics across 8 levels, 3 views (Path, Roadmap, Resources)
- [x] All ~120 resource URLs return HTTP 200 (checked after fixing 8 stale DesignGurus slugs)
- [x] All 5 source-site bases + GitHub repo link resolve
- [x] Tab switching, filters, search, card clicks, node clicks, and the modal all pass a DOM smoke test
- [x] Builds to a static `dist/` — works from `file://` or any static host

---

Built & maintained by **Mohit Gupta** — [github.com/MohitGupta14/SystemDesign](https://github.com/MohitGupta14/SystemDesign).