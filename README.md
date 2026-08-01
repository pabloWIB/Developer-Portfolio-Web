# Developer-Portfolio-Web

Front-end developer portfolio built to a devChallenges design brief: skills, hobbies and six project builds on a single page.

[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)

[![Live demo](https://img.shields.io/badge/demo-portfoliobilly.wib.digital-2ea44f)](https://portfoliobilly.wib.digital)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)
![First load](https://img.shields.io/badge/first%20load-166%20KB-blue)

## Description

A developer portfolio implemented from a supplied design. The identity on screen — **Billy Pearson** — is the fictional persona that comes with the brief, not a real person, and the page says so in its own footer.

The structure is the conventional one done carefully: a headline naming the role, a skills row across React, JavaScript, CSS, Vue, Redux and React Native, and a grid of six project builds. Each skill row is a button; pressing it reveals the level, and the number stays in the accessibility tree whether or not it is visible, so screen readers never depend on the animation.

A hobbies section closes it, on the reasoning that a portfolio's job is partly to make its author look like someone worth working with.

## Features

- Six project cards, each with a real screenshot of the build it describes.
- Skill rows that reveal their level on click, `Enter` or `Space`.
- A portrait that winks when activated — keyboard included.
- Mobile-first layout verified with no horizontal scroll at 360, 768, 1024 and 1440 px.
- Every interactive element reaches 44×44 px and shows a 3 px focus ring.
- All body and heading text measured at 4.5:1 contrast or better.
- 166 KB across 14 requests on first load. No build step, no npm dependencies, no JavaScript framework.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html` |
| Styling | CSS3 with custom properties | Three files: variables and reset, layout, components |
| Scripting | Vanilla JavaScript | One file, 55 lines, one delegated listener |
| Fonts | Montserrat, via Google Fonts | `preconnect` plus `display=swap` |
| Images | WebP | 11 assets, 179 KB total |
| Icons | Inline SVG | Favicon, generated in-repo |

## Project structure

```
.
├── index.html                    # The whole site: header, skills, hobbies, projects
├── 404.html                      # Error page, links back to the homepage
├── favicon.ico                   # 16/32 px, rendered from favicon.svg
├── robots.txt
├── sitemap.xml                   # Relative <loc>; needs the domain prefixed before submitting
├── assets/
│   ├── css/
│   │   ├── base.css              # Custom properties, reset, typography, focus ring
│   │   ├── layout.css            # Container, header, nav, grids, footer
│   │   └── components.css        # Cards, avatar, skill bars, tags, project cards
│   ├── js/
│   │   └── main.js               # Delegated ARIA toggles for the avatar and skill rows
│   └── img/
│       ├── brand/                # favicon.svg, apple-touch-icon.png
│       ├── content/              # Avatar (2 states) and hobby photographs
│       └── projects/             # Six project screenshots
└── docs/
    ├── auditoria.md              # State of the repository before the reorganisation
    └── cambios.md                # Everything changed, grouped by phase
```

## Running it locally

The site is static and has no build step. Opening `index.html` straight from the file system works — the script is a classic deferred script rather than an ES module precisely so that it does.

To serve it over HTTP instead:

```bash
git clone https://github.com/pabloWIB/Developer-Portfolio-Web.git
cd Developer-Portfolio-Web
npx serve .
```

Any static server will do; `python -m http.server` works the same way.

## Deployment

Deployed on Vercel at [portfoliobilly.wib.digital](https://portfoliobilly.wib.digital). Upload the repository root as-is: no build command, no output directory, no environment variables.

Two things still need the production domain filled in, because they cannot be correct without it:

- `sitemap.xml` uses a relative `<loc>`. The sitemap protocol requires absolute URLs, so prefix the domain before submitting it to Search Console.
- `index.html` carries no `<link rel="canonical">` and no `og:url`. Both need the absolute URL.

## Credits

Built to a [devChallenges](https://devchallenges.io) front-end challenge brief. The six builds are visible on [the devChallenges profile](https://devchallenges.io/portfolio/pabloDYEL).

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
