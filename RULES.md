# RULES.md — Code Culture

Quick-reference card for this project's non-negotiable conventions.
Full detail in `.claude/rules/` or `.opencode/rules/` and `.claude/knowledge/critical-constraints.md` or `.opencode/knowledge/critical-constraints.md`.

---

## TypeScript

- Never use `any` — use `unknown` or explicit types
- No unused variables, imports, or parameters; prefix intentionally unused with `_`
- Variables and functions: `camelCase`
- Interfaces and types: `PascalCase` — no `I` prefix, no `Interface` suffix
- Boolean variables: semantic prefix — `is`, `has`, `should`, `can`
- Global constants: `SCREAMING_SNAKE_CASE`
- No barrel `types.ts` re-exporting everything

---

## Naming

- All identifiers in English — no Spanish variable, function, type, or file names
- Exception: non-generic business domain nouns with no clean English equivalent (e.g. `expedienteId`, `TramiteStatus`) — generic wrappers like `datosUsuario` are always forbidden
- All files and directories: `kebab-case`
- React component files: `kebab-case.tsx` — never PascalCase filenames
- Hooks: `use-{feature}.ts`
- Stores: `{entity}.store.ts`
- Schemas: `{entity}.schema.ts`
- Types: `{entity}.types.ts`
- Services: `{entity}.service.ts`
- Utils: `{entity}.util.ts`
- Component props: `{ComponentName}Props`
- Event handlers: `handle` prefix on implementation, `on` prefix on props
- No default exports on components — always named exports

---

## Architecture

- **Screaming Architecture + Atomic Design** — these two patterns are non-negotiable and work together: Screaming Architecture organizes by domain, Atomic Design organizes components within each domain
- Business domains are top-level folders under `src/domains/`
- Each domain is fully self-contained: components, hooks, stores, schemas, messages, types
- No cross-domain imports — domains do not depend on each other
- Global reusable UI → `src/components/` (shared across 2+ domains)
- Global initializations (auth, db) → `src/lib/`
- Global constants and cross-domain messages → `src/config/`
- Pure cross-cutting utilities → `src/utils/`

---

## Components

- Atomic Design inside every domain: atoms → molecules → organisms
- **Atoms**: pure props, no hooks, no domain knowledge, single responsibility
- **Molecules**: may use `useState`/`useRef`, compose atoms only
- **Organisms**: use domain hooks, compose molecules, no cross-domain imports
- Components are dumb and presentational — all logic lives in hooks
- Never import `actions.ts` directly in a component — always through a hook
- Minimize `use client` — default to RSC; add directive only for interactivity or browser APIs
- Wrap async operations with `Suspense`

---

## Styling

- Tailwind CSS only — no inline styles, no arbitrary values unless strictly necessary
- Use `@apply` in `.css` files for frequently reused styles
- Always use `cn()` for conditional or merged class names — never string interpolation
- Mobile-first responsive design
- BEM class names — short and descriptive, avoid deep nesting chains

---

## Forms

- All forms: React Hook Form + Zod — no exceptions
- Schema in `{form-name}.schema.ts`, one per file, with exported inferred type
- Validation messages in `validation-messages.ts` — no hardcoded strings
- Form logic in a custom hook `use-{form-name}-submit.ts` under `domain/hooks/`
- Always `resolver: zodResolver(schema)` in `useForm<InputType>()`
- Use `handleSubmit` — never call `onSubmit` directly or `e.preventDefault()` manually
- Map server errors via `setError`; always handle `errors.root`
- Disable submit button during `isSubmitting`
- Server Actions must revalidate with `schema.safeParse(input)` before any persistence

---

## State & Data

- Zustand for UI/client state only — no server data, no fetching inside stores
- Server data via React Query hooks — never stored in Zustand
- Shareable/navigable URL state via `nuqs`
- Server Actions are the standard for mutations and form processing

---

## Text Management

- No hardcoded strings in JSX, hooks, or schemas
- Domain text → `domains/{entity}/messages.ts`
- Domain validation messages → `domains/{entity}/validation-messages.ts`
- Cross-domain text → `config/messages.ts`
- All message objects: `as const`
- Dynamic text via functions — never string concatenation

---

## Storybook

- Story files: `{component}.stories.tsx` under `src/stories/`
- Folder structure must mirror the project component structure
- Align story organization with Figma page structure
- Use `tags: ['autodocs']` for automatic documentation

---

## Git

- Conventional commits only — no AI attribution, no co-author tags
- Full rules → `.claude/skills/commit-conventions/SKILL.md` or `.opencode/skills/commit-conventions/SKILL.md`
