# Phumudzo Ndonyana — Portfolio Rebrand

## What's here
- `index.html` — full single-page site (all sections from the brief)
- `css/styles.css` — design tokens + all styling
- `js/script.js` — nav, scroll reveals, counters, before/after sliders, carousel, ripple
- `assets/` — labeled placeholder SVGs (profile, about, 6 projects incl. before/after pairs)

## Replace placeholders with your real assets
Every placeholder file is named for what it replaces:
- `assets/profile.svg` → your headshot (`profile.jpg`)
- `assets/about.svg` → workflow/behind-the-scenes photo
- `assets/project-1.svg` … `project-6.svg` and their `-before` / `-after` variants → real thumbnails/stills

Keep the same filenames (just replace the `.svg` extension references in `index.html` with your real file, e.g. `profile.jpg`) or rename and update the `src=` in `index.html` to match.

The AI Toolkit section uses text-based placeholder marks (GPT, RW, LEO, etc.) instead of real logos — swap these for official tool logo files before launch (trademark logos shouldn't be auto-generated).

## Merging into your existing VS Code project
1. Copy `index.html`, `css/`, `js/`, and `assets/` into your project root (or wherever your current site lives), overwriting/merging as needed.
2. If your existing repo has a different structure (e.g. `public/`, `src/`), move these files into the equivalent location and update the relative paths in `index.html`'s `<link>`/`<script>` tags accordingly.
3. Replace placeholder assets as above.

## Push to GitHub (run in your VS Code terminal)
```bash
git add .
git commit -m "Rebrand portfolio: premium creative strategist site"
git push origin main
```
(Replace `main` with your actual branch name if different — check with `git branch`.)

If Vercel is already connected to this repo, it will auto-deploy on push. No further action needed there.

## Notes
- No external JS frameworks — vanilla HTML/CSS/JS per the brief.
- Respects `prefers-reduced-motion`.
- Fully responsive (mobile menu kicks in under 860px).
- Google Fonts (Space Grotesk, Inter, JetBrains Mono) loaded via CDN link in `<head>` — swap for self-hosted fonts if you want zero external requests.
