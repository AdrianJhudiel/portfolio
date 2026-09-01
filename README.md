# Portfolio — Jhudiel Adrian B. Artezuela

An interactive portfolio built as a "molecular graph": About, Skills, Experience, Projects, and Education
are nodes you click to zoom into. It ships with a **Simple View** fallback — a plain, semantic,
scrollable resume layout — reachable via the toggle pinned at the top of the page, and used automatically
as the default for mobile visitors and screen-reader-first browsing.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

## Project structure

```
app/                   Routes, metadata, loading/error/not-found states
components/graph/      The interactive graph (MolecularCanvas, MolNode, BondLines, PearlAmbient)
components/simple/     SimpleView — the plain scrollable fallback
components/content/    Shared content primitives used by both views (e.g. FeatureList)
components/seo/        Structured data (JSON-LD)
components/ViewSwitcher.tsx   Toggles graph <-> Simple View, persists the choice
lib/                    Content (site.ts, graph-data.ts, experience-data.ts) + graph layout/camera math
public/                 Static assets — put resume.pdf here (see below)
```

All portfolio content (name, role, bio, skills, projects, education, contact links) lives in `lib/site.ts`,
`lib/graph-data.ts`, and `lib/experience-data.ts`. Both the graph and Simple View read from these same
files, so there's a single source of truth — edit content there, not in the components.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding the resume PDF

`siteConfig.resumeUrl` (`lib/site.ts`) points at `/resume.pdf`. Drop the actual file at `public/resume.pdf`
(create the `public/` folder if it doesn't exist yet) and the "Download Resume" links in both views will
work immediately — no code changes needed.

## Environment variables

| Variable                | Purpose                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`  | The site's real production URL. Feeds `metadataBase`, the sitemap, robots.txt, and the Open Graph/Twitter share previews (`lib/site.ts`). Falls back to a placeholder Vercel URL if unset. |

## Deploying (Vercel, free tier)

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), import the repo as a new project — Next.js is auto-detected, no
   config needed.
3. In the Vercel project's **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` set to the
   domain Vercel assigns you (e.g. `https://your-project.vercel.app`), then redeploy.
4. Once live, remove the stale TODO comment above `url` in `lib/site.ts`.

## Scope notes

- The graph has no touch/pinch/pan gesture support by design — Simple View is the intended mobile
  experience instead of a from-scratch gesture implementation (see the comment near the resize listener
  in `components/graph/MolecularCanvas.tsx`).
- Dark mode follows the OS `prefers-color-scheme` setting only; there's no manual in-page toggle.
