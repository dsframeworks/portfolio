# Dhruv Sharma — Portfolio

Filmmaker portfolio. Vite + React + TypeScript + Tailwind CSS.

## Where the content lives

All content (about text, projects, filmography, skills, gallery, experience, tools, contact links) is data, not markup.

| Deploy | Source |
| --- | --- |
| Vercel (live site) | Supabase tables, served by `api/content.js` |
| GitHub Pages | `public/data/content.json` (same shape as the API response) |

`npm run sync-content` rewrites `public/data/content.json` from the database. On GitHub Pages you can also edit that JSON file by hand.

### Content shape

- `settings` — `email`, `instagram_url`, `instagram_handle`, `youtube_url`, `youtube_label`, `resume_url`, `portrait_url`
- `about[]` — `label`, `body`, `sort_order`
- `projects[]` — `slug`, `title`, `kind` (`film` or `collection`), `format`, `genre`, `year`, `role`, `responsibilities[]`, `synopsis`, `credits[]` (`{ role, name }`), `poster_url`, `stills[]` and `bts[]` (`{ url, caption }`), `watch_url`, `trailer_url`, `sort_order`
- `skills[]` — `name`, `phase`, `sort_order`
- `gallery[]` — `caption`, `image_url`, `aspect` (e.g. `4/5`), `sort_order`
- `experience[]` — `kind` (`education` or `project`), `title`, `organisation`, `period`, `description`, `sort_order`
- `tools[]` — `name`, `sort_order`

Any field left `null` is shown as a dash or "To be added". Entries with `kind: "film"` appear in the filmography automatically.

### Adding images

Put files in `public/images/` (portrait, gallery) or `public/projects/` (posters, stills) and reference them by relative path, e.g. `images/portrait.png` or `projects/i-am-here/poster.jpg`.

- **Portrait:** export a transparent PNG cutout, save it as `public/images/portrait.png`, and set `settings.portrait_url` to `images/portrait.png`. The site applies the monochrome treatment and the bottom fade.
- **Gallery and stills:** colour photographs are shown in monochrome automatically.
- **Resume:** replace `public/resume.pdf`.

## Develop

```bash
npm install
npm run dev
npm run build
```

## Deploy to GitHub Pages

1. Push the repository to GitHub with `main` as the default branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds with relative asset paths and publishes `dist/`.
