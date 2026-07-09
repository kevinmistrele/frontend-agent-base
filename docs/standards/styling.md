# Styling

This base ships with a single global stylesheet (`src/styles.css`) and no CSS-in-JS or utility-CSS framework. Do not add Tailwind, styled-components, CSS Modules, etc. as a side effect of unrelated work — that is an architecture decision for the user to make explicitly.

## Conventions while the project has plain CSS

- Global resets/tokens (color, font, focus styles) stay in `src/styles.css`.
- Prefer semantic HTML and native styling hooks (`:disabled`, `:focus-visible`) over adding classes to replicate what the element does natively.
- Never remove the `:focus-visible` outline rule — it is the app's only visible keyboard-focus indicator (see [accessibility.md](./accessibility.md)).
- Keep component-specific styling minimal and inline via `className`/inline style only when a global rule doesn't already cover it; avoid introducing a per-component stylesheet convention without discussing it first.

## If the project adopts a styling library later

Document the decision in `docs/decisions/` (new ADR) and add one line here describing where component styles live (colocated `.module.css`, Tailwind classes, etc.) so agents don't have to rediscover the convention from file diffs.

## If the project adopts Tailwind

These rules only apply once Tailwind has been adopted explicitly (ADR above). They exist so agents don't have to rediscover the convention:

- Design tokens (colors, spacing, fonts) live in the Tailwind theme (`@theme` / `tailwind.config`), migrated from `src/styles.css` — one source of truth. `styles.css` keeps only resets and what Tailwind can't express.
- Stick to the theme scale. An arbitrary value (`w-[13px]`, `text-[#3b82f6]`) is a smell — use the nearest scale/token value, or add a token if the value is genuinely part of the design.
- Never build class names dynamically (`text-${color}-500`) — Tailwind only generates classes it can see as complete strings at build time. Use full class names in a conditional or a small lookup map.
- Repeated class strings are deduplicated by extracting a component (see [components.md](./components.md)), not by `@apply`. Reserve `@apply` for the rare truly global pattern.
- Use variant prefixes (`disabled:`, `focus-visible:`, `aria-*:`, `hover:`) instead of JS state for what the platform already tracks — same principle as the native-styling rule above.
- Mobile-first responsive: base classes for small screens, `md:`/`lg:` prefixes to scale up.
- Add `prettier-plugin-tailwindcss` with the adoption so class order is automated, never hand-sorted or argued about in review.
- All-Tailwind or plain CSS per concern, not both: once adopted, component styles are Tailwind classes — don't leave a component half-migrated with a parallel stylesheet.
- The accessibility rules above still hold: `:focus-visible` styling must survive the migration (as a `focus-visible:` ring/outline), and Tailwind's `outline-none` must never leave an element without a visible focus indicator.
