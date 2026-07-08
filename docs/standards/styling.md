# Styling

This base ships with a single global stylesheet (`src/styles.css`) and no CSS-in-JS or utility-CSS framework. Do not add Tailwind, styled-components, CSS Modules, etc. as a side effect of unrelated work — that is an architecture decision for the user to make explicitly.

## Conventions while the project has plain CSS

- Global resets/tokens (color, font, focus styles) stay in `src/styles.css`.
- Prefer semantic HTML and native styling hooks (`:disabled`, `:focus-visible`) over adding classes to replicate what the element does natively.
- Never remove the `:focus-visible` outline rule — it is the app's only visible keyboard-focus indicator (see [accessibility.md](./accessibility.md)).
- Keep component-specific styling minimal and inline via `className`/inline style only when a global rule doesn't already cover it; avoid introducing a per-component stylesheet convention without discussing it first.

## If the project adopts a styling library later

Document the decision in `docs/decisions/` (new ADR) and add one line here describing where component styles live (colocated `.module.css`, Tailwind classes, etc.) so agents don't have to rediscover the convention from file diffs.
