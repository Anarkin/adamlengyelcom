# Agent instructions

Stack, layout, and commands: see [README.md](README.md). Below is only what can't be inferred from the code or the README.

## Conventions

- Run `npm run format` after changing any file.
- `azure-pipelines.yml` is an inactive placeholder kept on purpose — do not delete or "fix" it.
- Keep the site fully self-contained: no CDNs, no external requests. The Cascadia Mono font is self-hosted in `src/resources/` (subset woff2, OFL-licensed).
- Theming goes through CSS variables in `:root` with a `prefers-color-scheme: dark` override block. The accent color comes from the favicon's purple (`#a55da0`).
- Prefer element selectors over classes when an element type appears only once; keep HTML semantic (`main`, `header`, `h1`, `ul`).

## Sensitive data

- Some contact values are deliberately obfuscated in the source and revealed client-side. Never decode and write them out in plain form anywhere in the repo, and keep the obfuscation intact when refactoring.
