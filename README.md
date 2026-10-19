# White-label demo build: UK roofing company homepage

**Demo build, fictional business.** "Fernhill Roofing & Repairs" does not exist. All names, phone numbers, towns and reviews are placeholders. The page is `noindex`.

**Live:** https://theoxfaber.github.io/whitelabel-demo-trades/

Built by Shanmukh Kiran Sagar to show agencies the kind of page I deliver from a design or brief: plain static HTML/CSS with a little vanilla JS. I build with AI-assisted tooling and check every page by hand in the browser.

## What's implemented
- **Responsive layout**: mobile-first CSS grid, checked at 390px, 768px and 1440px. Collapsible mobile menu, sticky header, fixed "Get a quote" button on phones.
- **Accessibility**: semantic landmarks (`header`, `nav`, `main`, `footer`), skip link, one `h1` and ordered headings, labelled form fields, visible focus styles, `aria-expanded` on the menu toggle, inline errors announced via `aria-live`, `aria-invalid` on bad fields, native `<details>` FAQ, respects `prefers-reduced-motion`, colour contrast at WCAG AA.
- **Contact form (front end only)**: client-side validation for name, phone, UK postcode, email and service, with friendly error messages and a success state. No backend: nothing is sent or stored.
- **Performance**: no frameworks, no web fonts (system font stack), no external requests, inline SVG artwork instead of photos. Total page weight is a few tens of KB.
- **SEO basics**: title, meta description, `lang="en-GB"`, semantic headings (set to `noindex` because it's a demo).

## Files
| File | Purpose |
|---|---|
| `index.html` | Page markup |
| `styles.css` | All styles (custom properties, grid, breakpoints at 900px and 760px) |
| `main.js` | Mobile menu toggle and form validation |

## On a real project
The same page would usually be rebuilt in the agency's stack (WordPress block editor or Elementor, or kept static), with the real copy, photos, form handler and analytics they choose, under the agency's branding, with no credit to me.

Contact: shanmukhkiransagar@gmail.com
