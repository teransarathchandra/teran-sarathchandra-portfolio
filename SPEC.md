# SPEC: Teran Sarathchandra portfolio

## Goal
A personal developer portfolio that reads as designed by a person, not generated. **Success test:** within about 60 seconds a visitor knows what Teran builds and is good at, has seen proof (shipped work, open source, the IEEE paper), and can email him or download the CV.

## Users
- Hiring managers and recruiters (remote, hybrid, on-site, relocation).
- Freelance or contract clients.
- Developers who find the open-source work (jira-delivery-mcp, coachline).

## Content sources
- CV: `~/Documents/CV-2026/Teran_Sarathchandra_CV.docx` (summary, experience at TIQRI, Softlogic Life, Scienter; projects; IEEE ICCCI 2026 paper; SLIIT BSc; certifications).
- GitHub: public, non-fork repos of `teransarathchandra`, fetched at build time.

## Stack and constraints
- Astro 7 (static output), strict TypeScript, pnpm, Vitest, Playwright for e2e.
- GSAP + ScrollTrigger for parallax and reveals; Lenis for smooth scroll, driven by `gsap.ticker`.
- One crafted Three.js object, lazy-loaded, bound to scroll progress.
- GitHub Pages at `https://teransarathchandra.github.io/teran-sarathchandra-portfolio/` (base path `/teran-sarathchandra-portfolio`).
- Light mode is the default. Every UI step runs the `hallmark` anti-AI-slop skill (design, then audit).

## Non-goals
- No CMS, no backend, no contact form, no analytics that need cookies or a consent banner.
- No phone number or home address on the site.
- No React or other UI framework island just for the 3D object.
- No stock illustrations, AI-generated imagery, emoji icons, or template "glassmorphism + purple gradient" look.

## Acceptance criteria
- [ ] AC-1: Design system exists before any page UI: `DESIGN.md` (from a `hallmark` pass: chosen direction, type pairing, palette with roles, spacing and motion scales, banned patterns) and `src/styles/tokens.css` defining color, type, space, radius and motion tokens on `:root`, light by default, with every text/background pair at WCAG AA contrast or better - check: `pnpm exec vitest run tests/tokens.test.ts`
- [ ] AC-2: Playwright is set up against `astro preview` with the base path, desktop (1440x900) and mobile (390x844) projects, and `pnpm e2e` runs it - check: `pnpm e2e --list`
- [ ] AC-3: Hero shows name, role, a one-line value statement written from the CV (not generic), an email CTA and a CV download, all above the fold on desktop and mobile - check: `pnpm e2e e2e/hero.spec.ts`
- [ ] AC-4: Smooth scroll (Lenis + GSAP ScrollTrigger) with layered parallax on at least 3 sections; with `prefers-reduced-motion: reduce`, Lenis and parallax are off and content is fully visible - check: `pnpm e2e e2e/motion.spec.ts`
- [ ] AC-5: One crafted Three.js object whose rotation/form follows scroll progress through the sections; `three` loads only after first paint (not in the initial JS chunk); a static image is shown when WebGL is unavailable or motion is reduced; renderer pauses when off-screen - check: `pnpm e2e e2e/three.spec.ts && pnpm exec vitest run tests/bundle.test.ts`
- [ ] AC-6: About and experience timeline (TIQRI, Softlogic Life, Scienter Technologies) rendered from typed content data in `src/content/`, with role, dates and 2-4 impact points each - check: `pnpm e2e e2e/sections.spec.ts`
- [ ] AC-7: GitHub data is fetched at build time (public, non-fork repos: name, description, language, stars, updated date, URL) using `GITHUB_TOKEN` when set; a committed snapshot `src/data/github.json` is used when the API fails, so the build never breaks offline - check: `pnpm exec vitest run tests/github.test.ts`
- [ ] AC-8: Selected work section on the home page mixes CV projects and GitHub repos, linking to case studies and repos - check: `pnpm e2e e2e/sections.spec.ts`
- [ ] AC-9: Case studies at `/work/<slug>/` for at least 3 flagship projects (Classroom Observation PWA, jira-delivery-mcp, coachline, Kubernetes scheduler research), each with problem, constraints, approach, outcome and stack - check: `pnpm e2e e2e/case-studies.spec.ts`
- [ ] AC-10: Blog: `/writing/` index and post pages from an Astro content collection (Markdown/MDX), sorted by date, with an RSS feed at `/rss.xml` and at least one real seed post - check: `pnpm build && pnpm exec vitest run tests/blog.test.ts`
- [ ] AC-11: Skills, IEEE publication (with DOI link 10.1109/ICCCI70321.2026.11666506), education and certifications are present - check: `pnpm e2e e2e/sections.spec.ts`
- [ ] AC-12: Contact: mailto link, copy-email button with visible and announced feedback, LinkedIn and GitHub links, and a CV PDF in `public/` that downloads - check: `pnpm e2e e2e/contact.spec.ts`
- [ ] AC-13: Light theme by default, dark theme toggle that persists, follows `prefers-color-scheme` only when no choice is stored, and has no flash of the wrong theme on load - check: `pnpm e2e e2e/theme.spec.ts`
- [ ] AC-14: Accessibility: zero serious or critical axe violations on every page, skip link, visible focus, full keyboard navigation, semantic landmarks - check: `pnpm e2e e2e/a11y.spec.ts`
- [ ] AC-15: Anti-slop audit: a `hallmark` audit pass reports no slop findings, and an automated guard bans known tells (purple/indigo gradient hero, emoji icons, "passionate", "cutting-edge", "leverage", "seamless", lorem ipsum, default Inter-only type, identical 3-card grids) - check: `pnpm exec vitest run tests/slop.test.ts`
- [ ] AC-16: Every internal link and asset resolves under the base path in the built site - check: `pnpm build && pnpm exec vitest run tests/links.test.ts`
- [ ] AC-17: SEO: per-page title and description, Open Graph image, canonical URL, sitemap, and JSON-LD `Person` on the home page - check: `pnpm build && pnpm exec vitest run tests/seo.test.ts`
- [ ] AC-18: Performance on the home page (mobile Lighthouse): performance >= 90, accessibility = 100, LCP < 2.5 s, CLS < 0.1 - check: `pnpm lighthouse`
- [ ] AC-19: `.github/workflows/deploy.yml` deploys to GitHub Pages on push to `main` and the live URL returns 200 - check: `gh run list --workflow deploy.yml --limit 1 --json conclusion -q '.[0].conclusion' | grep -qx success && curl -sfo /dev/null https://teransarathchandra.github.io/teran-sarathchandra-portfolio/`

## Edge cases
- No WebGL, low-power devices, or `prefers-reduced-motion`: static fallback, no smooth-scroll hijack, all content readable.
- JavaScript disabled: all content visible (animations only enhance; no content starts at `opacity: 0` without JS).
- GitHub API rate limit or offline build: fall back to the committed snapshot.
- Deep links and anchors work with Lenis (header offset, `#contact` from another page).
- Base path: every `href`, `src`, font and model URL uses `import.meta.env.BASE_URL`.
- Long repo descriptions and empty descriptions render cleanly.
- Mobile Safari: no scroll jank, no 100vh jumps (`svh`/`dvh`), no horizontal overflow.

## Open questions
- CV PDF: export the DOCX to PDF without the phone number, or keep it? (Default: remove the phone number.)
- Which 3-4 GitHub repos to pin as featured (default: jira-mcp-server, coachline, agent-skills, EV-Charging-Station-Booking-System)?
- Seed blog post topic (default: building jira-delivery-mcp, or offline sync with Dexie and Azure append blobs).
- Headshot photo: use one or not?
