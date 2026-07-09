# AGENTS.md

## Purpose

This repository is a React + TypeScript front-end base designed for scalable feature development and AI-agent collaboration. It works the same way whether you are Claude, Codex, Cursor, Copilot, or any other agent — start here.

## Rule Priority

1. Explicit user request.
2. Existing code and local patterns.
3. This `AGENTS.md` and `docs/`.
4. General React, TypeScript and accessibility best practices.

If rules conflict, mark `Pending decision` and choose the smallest safe change only when progress is still possible.

## Required Reading

On the first task in a session, read in order:

1. `docs/agents/workflow.md` — how to approach a task.
2. `docs/ponytail/overview.md` — the minimalism ladder: what NOT to build, applied on every task.
3. `docs/architecture/overview.md` — the layers and why.
4. `docs/architecture/project-structure.md` — where things live on disk.
5. `docs/architecture/feature-template.md` — the shape of a new feature.

Then read only the extra docs relevant to the task — see the index below.

## Documentation Map

```txt
docs/
  agents/         how to work: workflow, validation, review checklist
  ponytail/       what NOT to build: the minimalism ladder, review, audit, debt ledger
  architecture/   the system: overview, structure, dependency rules, API layer, state,
                  i18n, feature flags
  standards/      the code: typescript, naming, react, components, hooks, forms, styling,
                  ui-states, accessibility, errors, security, performance, tests,
                  documentation, git
  decisions/      why: numbered architecture decision records
```

Jump straight to the doc that matches the task instead of reading everything:

| Task involves                                         | Read                                                                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| A new feature or route                                | `docs/architecture/feature-template.md`, `docs/architecture/dependency-rules.md`, `docs/decisions/0002-routing.md` |
| Fetching/sending data                                 | `docs/architecture/api-layer.md`, `docs/standards/errors.md`                                                       |
| Component or screen work                              | `docs/standards/react.md`, `docs/standards/components.md`, `docs/standards/hooks.md`                               |
| A form                                                | `docs/standards/forms.md`                                                                                          |
| Shared/global state question                          | `docs/architecture/state-management.md`                                                                            |
| User-facing text / translations                       | `docs/architecture/i18n.md`                                                                                        |
| Gating something behind a flag                        | `docs/architecture/feature-flags.md`                                                                               |
| Styling                                               | `docs/standards/styling.md`                                                                                        |
| Loading/error/empty UI for a screen                   | `docs/standards/ui-states.md`                                                                                      |
| Naming a function, variable or file                   | `docs/standards/naming.md`                                                                                         |
| Asked to commit, branch or open a PR                  | `docs/standards/git.md`                                                                                            |
| Tests                                                 | `docs/standards/tests.md`                                                                                          |
| Anything user-facing/interactive                      | `docs/standards/accessibility.md`                                                                                  |
| Tempted to add a new abstraction, dependency, or file | `docs/ponytail/overview.md`                                                                                        |
| Reviewing a diff or the repo for bloat                | `docs/ponytail/review.md`, `docs/ponytail/audit.md`                                                                |

## Architecture (short version)

Feature-based, inspired by Bulletproof React. Full rules: `docs/architecture/`.

```txt
app -> features -> shared (components, hooks, lib, types, utils)
```

- `src/app` composes providers, routing and features.
- `src/features/*` are self-contained; they must not import each other.
- Shared folders are business-agnostic and must not import from `app` or `features`.

These boundaries are lint-enforced (`import/no-restricted-paths` in `eslint.config.js`), not just documented — `npm run lint` fails on a violation. When adding a new feature, add its zone to that config too (see `docs/architecture/dependency-rules.md`).

## Never Do This

- Use `any`.
- Call an API from inside JSX (network calls belong in `src/lib` or a feature's `api/`).
- Import one feature from another (`src/features/a` importing `src/features/b`) — this fails lint.
- Add global state for data that's local to one screen.
- Put translations in one shared app-wide file — they belong in the owning feature's `i18n/` (see `docs/architecture/i18n.md`).
- Read `import.meta.env.VITE_FEATURE_*` directly — go through `useFeatureFlag` (see `docs/architecture/feature-flags.md`).
- Refactor broadly beyond what the request needs.
- Add, log, or expose secrets, tokens, private endpoints, or proprietary business rules.
- Add a new dependency, abstraction, or file without climbing the ladder in `docs/ponytail/overview.md` first — reuse, standard library, and native platform features come before new code.

## Validation

Run the smallest useful check for the change (full table: `docs/agents/validation.md`):

```bash
npm run typecheck
npm run lint
npm run test
```

Run `npm run build` when the change touches bundling, routing, global config, dependencies or public contracts. Run `npm run format` if you're not sure formatting is clean — `npm run format:check` is what CI checks.

A pre-commit hook (lint + typecheck + format) and a pre-push hook (tests) run automatically, and GitHub Actions (`.github/workflows/ci.yml`) re-runs everything on push/PR — these are a backstop, not a substitute for running validation yourself during the task.

## Before Reporting Done

Self-check against `docs/agents/review-checklist.md`, then summarize: what changed, files touched, checks run, anything skipped and why, any `Pending decision`.

## Safety

- Change only what is necessary; preserve unrelated user changes.
- Do not commit, push, or open PRs unless explicitly asked.
- Do not run destructive git operations without explicit instruction.
