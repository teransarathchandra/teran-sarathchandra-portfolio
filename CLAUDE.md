# teran-sarathchandra-portfolio

Personal developer portfolio. Spec and acceptance criteria: `SPEC.md`.

## Stack
- Astro 7 static site, strict TypeScript, pnpm, Vitest, Playwright (e2e).
- GSAP + ScrollTrigger (parallax, reveals), Lenis smooth scroll on `gsap.ticker`.
- Three.js (vanilla, no React) for one scroll-bound 3D object, lazy-loaded.
- Deployed to GitHub Pages under base `/teran-sarathchandra-portfolio`.

## Verify
- Single command: `bash scripts/verify.sh` (typecheck, build, unit tests).
- UI acceptance criteria also need their `pnpm e2e <spec>` check from SPEC.md.
- Dev server: `astro dev --background`; manage with `astro dev stop|status|logs`.

## Definition of done
- `bash scripts/verify.sh` exits 0, with output shown.
- The AC's check command from SPEC.md passes; only then tick it `- [x]` in SPEC.md.
- UI work: screenshots at 1440x900 and 390x844 in light and dark were reviewed (`/visual-qa`).
- Before merge: `ac-reviewer` agent and `/code-review`.
- After code changes: `graphify update .`

## Design rules (anti-AI-slop)
- Run the `hallmark` skill before building any UI section and audit with it after. `DESIGN.md` is the source of truth; extend it, never bypass it.
- Use only tokens from `src/styles/tokens.css`. No raw hex, px font sizes or ad-hoc easing in components.
- Light mode is the default theme.
- Copy comes from the CV and repos: concrete, specific, first person, no buzzwords.
- Motion enhances; content is visible without JS and under `prefers-reduced-motion`.

## Forbidden
- Purple/indigo gradient heroes, glassmorphism cards, emoji as icons, stock or AI-generated images, lorem ipsum.
- Adding React/Vue/Svelte or Tailwind without asking.
- Hardcoded `/` paths: use `import.meta.env.BASE_URL`.
- Publishing the phone number or home address.
- Committing secrets or `.env`; `GITHUB_TOKEN` comes from the environment only.
- Ticking an AC without running its check; editing tests to make them pass.

## Conventions
- Content lives in typed Astro content collections; components render, never hold copy.
- Animation: one module per effect, each with a reduced-motion path.
- Conventional commits (`feat:`, `fix:`, `chore:`), one AC per commit where possible.
- Git identity from `~/.config/git/personal.inc`.
