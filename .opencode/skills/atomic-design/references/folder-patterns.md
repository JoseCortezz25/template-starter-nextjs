# Folder Patterns & Project Structure

This reference covers how to organize atomic components across different project architectures. Always adapt to the existing project structure — don't overwrite established conventions.

---

## Standard React / Next.js (Pages Router)

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Icon/
│   │   └── ...
│   ├── molecules/
│   │   ├── SearchBar/
│   │   ├── FormField/
│   │   └── ...
│   ├── organisms/
│   │   ├── Header/
│   │   ├── ProductCard/
│   │   └── ...
│   └── templates/
│       ├── DashboardLayout/
│       └── ...
├── pages/
│   ├── index.tsx        ← Page (implements a Template)
│   ├── dashboard.tsx
│   └── ...
└── styles/
```

---

## Next.js App Router

```
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
└── app/
    ├── page.tsx              ← Page
    ├── dashboard/
    │   └── page.tsx          ← Page
    └── layout.tsx            ← Can implement a Template
```

---

## Feature-Based Architecture (hybrid)

Common in large apps. Atomic components live in two places:

- **Shared/global atoms and molecules** → `src/shared/components/`
- **Feature-specific organisms** → `src/features/<feature>/components/`

```
src/
├── shared/
│   └── components/
│       ├── atoms/
│       │   ├── Button/
│       │   └── Input/
│       └── molecules/
│           └── FormField/
├── features/
│   ├── auth/
│   │   ├── components/       ← Feature organisms
│   │   │   ├── LoginForm/
│   │   │   └── SignupForm/
│   │   ├── hooks/
│   │   └── services/
│   └── products/
│       ├── components/
│       │   ├── ProductCard/
│       │   └── ProductGrid/
│       └── ...
└── app/ (or pages/)
```

**Decision rule:**

- If a component is reusable across 2+ features → put it in `shared/components/`
- If it's only used within one feature → keep it in `features/<name>/components/`

---

## Monorepo (Turborepo / Nx)

```
packages/
├── ui/                       ← Atoms & Molecules (design system package)
│   └── src/
│       ├── atoms/
│       └── molecules/
└── web/                      ← App
    └── src/
        ├── components/
        │   └── organisms/    ← Organisms (app-specific)
        ├── templates/
        └── pages/ (or app/)
```

---

## Component File Anatomy

Each component folder follows this pattern:

```
ComponentName/
├── ComponentName.tsx         ← Component code
├── ComponentName.module.css  ← Scoped styles (if using CSS Modules)
├── ComponentName.test.tsx    ← Unit tests
└── ComponentName.stories.tsx ← Storybook stories (if using Storybook)
```

---

## Import Direction Rules

Components can only import from equal or lower levels:

```
Page       → can import Template, Organism, Molecule, Atom
Template   → can import Organism, Molecule, Atom
Organism   → can import Molecule, Atom
Molecule   → can import Atom
Atom       → imports nothing from components/
```

**Never:** An Atom importing a Molecule. A Molecule importing an Organism. This creates circular dependencies and breaks portability.

---

## Naming Conventions

- Use **PascalCase** for component names and folders: `ProductCard`, `SearchBar`
- Name reflects **what it is**, not what it does: `UserMenu` (not `RenderUserDropdown`)
- For variants, use suffixes sparingly: `ButtonPrimary` is acceptable; prefer props (`variant="primary"`)
- Avoid generic names: not `Card` (too vague) → `ProductCard`, `ArticleCard`, `UserCard`
- Avoid level suffixes in the name: not `ButtonAtom` → just `Button`

---

## When Atom/Molecule Boundary is Blurry

Some components are genuinely ambiguous. Use this tiebreaker:

| Question                                 | Lean Atom | Lean Molecule  |
| ---------------------------------------- | --------- | -------------- |
| Does it render exactly one element?      | ✅        | —              |
| Does it combine multiple distinct atoms? | —         | ✅             |
| Does it have internal multi-part state?  | —         | ✅             |
| Is it domain-agnostic?                   | ✅        | ✅ (should be) |
| Would it make sense in any project?      | ✅        | Sometimes      |

**Default:** when truly unsure, classify as the **lower** level. Promote to Molecule when the complexity justifies it.
