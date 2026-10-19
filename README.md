# White-label demo build: Fernhill Roofing (UK slating firm homepage)

**Demo build, fictional business.** Fernhill Roofing does not exist. The firm, address, reviews, guarantee, trade body ("Pennine Roofing Guild") and review site ("TradeRated") are made up; the last two stand in for NFRC and Checkatrade. The phone number 01632 960418 is from Ofcom's range reserved for drama use, and office@example.com is a reserved example address. The page is `noindex` and the form sends nothing.

**Live:** https://theoxfaber.github.io/whitelabel-demo-trades/

Built by Shanmukh Kiran Sagar to show agencies the kind of page I deliver from a brief: plain static HTML/CSS with a little vanilla JS. I build with AI-assisted tooling and check every page by hand in a real browser at phone and desktop widths.

## Design
- Setting: a four-person slating firm in Hebden Bridge, West Yorkshire, working the stone terraces of the upper Calder Valley.
- Palette taken from the roof: wet slate `#27333B`, lead `#7B878D`, lime wash `#ECEDE8`, fern `#3D5B2A` (the only action colour), lichen `#D2BF55` (focus ring and phone underline).
- Type: Archivo variable (one family; widened, heavy cuts for headings, normal width for body), self-hosted.
- The services section is laid like a slate roof: half-bond courses, nail holes, three slate tones. On phones the courses stagger left and right.
- Phone first: the number sits in the header on desktop and in a fixed call bar on phones.

## What's implemented
- **Responsive**: CSS grid, checked at 360, 390, 820 and 1440px with no horizontal overflow. Collapsible mobile menu (Escape closes it), sticky header, fixed call bar on phones.
- **Accessibility**: landmarks, skip link, one `h1` with ordered headings, labelled fields and fieldsets, visible focus ring, `aria-expanded` on the menu, inline errors announced via `aria-live`, `aria-invalid` on bad fields, focus moves to the first error and then to the confirmation, WCAG AA contrast, no scroll animation at all, `prefers-reduced-motion` respected.
- **Quote form (front end only)**: name, phone (UK format), property postcode (UK format, auto-formatted, with a check against the areas covered), optional email, job type, roof covering, urgency, details and up to 4 photos (size-checked). Success state changes its message when water is coming in now. Nothing is sent or stored.
- **Performance**: no frameworks or third-party requests, no tracking. One self-hosted variable font (90 KB, preloaded, `font-display: swap`), four WebP photos ≤ 240 KB each with width/height set and lazy loading below the fold.
- **SEO basics**: descriptive title and meta description, `lang="en-GB"`, semantic headings (`noindex` because it's a demo).

## Files
| File | Purpose |
|---|---|
| `index.html` | Page markup and copy |
| `styles.css` | All styles (custom properties, grid, breakpoints at 980px and 760px) |
| `main.js` | Mobile menu, postcode area check, form validation |
| `img/` | Four photos (WebP), credited below |
| `fonts/archivo-latin-var.woff2` | Archivo variable font, latin subset |

## Photo credits
All from Wikimedia Commons, resized and compressed (one cropped). They show real places and people unconnected with this demo.
- `img/slater-at-work.webp`: [Slater at work, Rothesay, Isle of Bute](https://commons.wikimedia.org/wiki/File:Slater_at_work,_Rothesay,_Isle_of_Bute.jpg) by Karora, public domain.
- `img/reclaimed-slate.webp`: [Mountain o Slate](https://commons.wikimedia.org/wiki/File:Mountain_o_Slate_(3678777512).jpg) by Steve Snodgrass, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- `img/valley-rooftops.webp`: [Saltaire rooftops](https://commons.wikimedia.org/wiki/File:Saltaire_rooftops.jpg) by Tim Green, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- `img/gritstone-house.webp`: [Weasel Hall](https://commons.wikimedia.org/wiki/File:Weasel_Hall.jpg) by Tim Green, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), cropped.

Font: [Archivo](https://fonts.google.com/specimen/Archivo) by Omnibus-Type, SIL Open Font License 1.1.

## On a real project
The same page would be rebuilt in the agency's stack (WordPress block editor or Elementor, or kept static), with the client's real copy, photos of their own jobs, verified accreditations, a form handler and whatever analytics they choose, under the agency's branding, with no credit to me.

Contact: shanmukhkiransagar@gmail.com
