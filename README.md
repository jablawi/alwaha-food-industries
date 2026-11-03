# Al Waha Food Industries

An Arabic-first, bilingual brand website for Al Waha, with an English switch, responsive layouts, original generated PNG photography, scroll reveals, reduced-motion support, and an accessible enquiry composer.

Live website: https://alwaha-food-industries.vercel.app/

GitHub Pages: https://jablawi.github.io/alwaha-food-industries/

## Local development

Requires Node.js 22 or newer. The production website is static and has no runtime package dependencies.

```sh
npm ci
npm start
```

Open http://127.0.0.1:4173.

## Verification

With the local server running:

```sh
npx playwright install chromium
npm test
```

Checks both languages at 1440, 768, 390, and 320px; verifies images, horizontal overflow, WCAG A/AA automated accessibility rules, mobile navigation, enquiry preview and file download, dialog keyboard behavior, language persistence, reduced motion, and browser errors. Screenshots and accessibility results are saved locally in `screenshots/` (git ignored).

## Deployment

Vercel runs `npm run build` and serves `dist/`. Only `index.html`, `styles.css`, `app.js`, `.nojekyll`, and `assets/` are included in the deployed artifact.

For automatic production deployments from `main`, grant the Vercel GitHub app access to `jablawi/alwaha-food-industries`, then connect the repository in the Vercel project's Settings → Git. A linked local checkout can also deploy with `vercel --prod`.

The existing GitHub Actions workflow also deploys to GitHub Pages.

The planned custom domain is `alwahastores-sy.com`. Add it in the Vercel project's Settings → Domains, then apply the DNS records shown by Vercel at the domain registrar.

## Content and contact configuration

Brand identity and business context come from the client-supplied Al Waha presentation and packaging references. The factory integration, solar energy, green areas, and warehouse improvements are described as development priorities, not completed projects. Product details reflect the supplied packaging: fine white cane sugar, 100% pure cane sugar, 50 kg, cool and dry storage. No capacity, certifications, customer counts, founding date, or sales coverage are invented.

Contact details in the stationery mockups appeared to be placeholders and require confirmation. Until confirmed, the form explicitly prepares an enquiry for download; it does not send messages or collect data on a server. Form input stays in the visitor's browser and is never stored in localStorage. Only the language preference is stored locally. Connect a confirmed business email or an approved form endpoint before enabling direct sending.

Arabic and English copy is paired in `data-ar` and `data-en` attributes in `index.html`. Interactions are in `app.js`; brand colors and breakpoints are in `styles.css`.

Generated image provenance and exact prompts are documented in [ASSETS.md](ASSETS.md). The source presentation itself is not published. Google Fonts supplies the Arabic and Latin webfonts with local system fallbacks.
