---
name: atomic-design
description: Guide for creating, componentizing, and refactoring UI components following Atomic Design. Use this skill whenever the user is actively building a new component, breaking down a UI into components, or refactoring an existing component. Trigger when the user shares a design/screenshot/code to componentize, when they are writing a new component from scratch, when they are splitting a large component into smaller ones, or when they are refactoring a component's structure or responsibilities. Do NOT trigger for general questions about Atomic Design theory — only when there is a concrete component being created, split, or refactored.
---

# Atomic Design — Componentization Guide

This skill teaches **how to classify and build decoupled components** following Atomic Design. The scope is deliberate: classify correctly, build correctly. Business logic, routing, and state management live elsewhere in the app architecture — this skill does not dictate those.

## Mandatory vs Optional Levels

| Level       | Status        | Notes                                                                                   |
| ----------- | ------------- | --------------------------------------------------------------------------------------- |
| ⚛️ Atom     | **Mandatory** | Always applies in every project                                                         |
| 🧪 Molecule | **Mandatory** | Always applies in every project                                                         |
| 🦠 Organism | **Mandatory** | Always applies in every project                                                         |
| 🧩 Template | **Optional**  | Skip if the framework provides layout conventions (e.g. Next.js `layout.tsx`)           |
| 📄 Page     | **Optional**  | Skip if the framework owns routing and page structure (e.g. Next.js `app/` or `pages/`) |

**The mandatory core is always Atom → Molecule → Organism.** Templates and Pages are useful in framework-agnostic projects or when the app has no built-in layout/routing conventions. When the framework already handles those concerns — like Next.js does — imposing them as extra component folders creates unnecessary duplication. In those cases, skip them and let the framework own that layer.

---

## The Five Levels

### ⚛️ Atom

The smallest indivisible unit. Renders one thing. No business logic. No API calls. No knowledge of the app it lives in.

**Characteristics:**

- Cannot be broken down further without losing its meaning
- Purely presentational — controlled entirely via props
- Has its own visual states (disabled, hover, error, sizes, variants)
- Zero side effects unrelated to its own UI behavior
- Unaware of context, feature, or domain

**Examples:** `Button`, `Input`, `Label`, `Icon`, `Badge`, `Avatar`, `Spinner`, `Checkbox`, `Tag`, `Divider`, `Heading`, `Text`, `Tooltip`

**Rule:** If you can drop it into any other project and it still makes sense — it's an Atom.

---

### 🧪 Molecule

A functional composition of atoms (and sometimes HTML elements). Does one thing well, but that thing requires coordination between atoms.

**Characteristics:**

- Composed of 2+ atoms working together as a unit
- May hold internal UI state (open/closed, focused, etc.) — but NOT app state
- Passes data down and events up via props
- No API calls
- No access to global stores or app-level context
- Single responsibility: one clear function

**Examples:** `SearchBar` (Input + Button + Icon), `FormField` (Label + Input + ErrorMessage), `Dropdown` (Button + Menu + Option), `CardHeader` (Avatar + Heading + Badge), `PaginationControls`, `DatePicker`

**Rule:** If it combines atoms to accomplish one specific UI task — it's a Molecule.

---

### 🦠 Organism

A distinct, self-contained section of the UI. Product-specific. May coordinate multiple molecules and atoms into a meaningful feature area.

**Characteristics:**

- Combines molecules (and atoms) into a complete interface section
- **May** hold local feature state and trigger data fetching (via hooks/services, not inline)
- Can be connected to app state or context — but should isolate this via props/hooks
- Product-specific: usually tied to a domain (e.g., `ProductCard`, `LoginForm`, `UserMenu`)
- Reusable across pages/templates of the _same product_, but not universally portable
- Should remain composable: avoid hardcoding layout positions or external margins

**Examples:** `Header`, `Footer`, `ProductCard`, `LoginForm`, `NavigationMenu`, `DataTable`, `UserProfilePanel`, `HeroSection`, `CommentThread`

**Rule:** If it represents a full, meaningful _section_ of the UI with its own identity — it's an Organism.

---

### 🧩 Template _(optional — depends on project)_

The skeleton of a page. Defines layout and slot positions for organisms. Contains no real content — uses placeholders.

> **Skip this level** if the framework provides its own layout primitive (e.g. Next.js `layout.tsx` in App Router, `_app.tsx` in Pages Router). In those cases the framework already owns the layout layer — creating a `/templates` folder would duplicate that responsibility.

**Characteristics:**

- Defines the spatial structure of a page (grid, columns, zones)
- Slots in organisms without knowing their content
- No styles beyond layout (no colors, no business logic, no data)
- Acts like a wireframe — validates that the layout holds up before content arrives
- Rarely contains conditional logic

**Examples:** `DashboardLayout`, `TwoColumnLayout`, `ArticleLayout`, `AuthLayout`, `MarketingPageLayout`

**Rule:** If it only arranges organisms into a layout and has no real content — it's a Template.

---

### 📄 Page _(optional — depends on project)_

A template instance populated with real content, connected to the app. This is where the system integrates with routing, data, and state.

> **Skip this level** if the framework owns the routing and page file structure (e.g. Next.js `app/page.tsx`, Remix `routes/`). The framework's route files already are the Pages — there's no need to create a parallel `/pages` component folder.

**Characteristics:**

- Implements a Template with real data
- Connected to routing
- Passes real content/data down to organisms and molecules
- The integration point between the design system and the application logic
- May orchestrate multiple data sources

**Examples:** `HomePage`, `ProductDetailPage`, `DashboardPage`, `LoginPage`, `UserProfilePage`

**Rule:** If it's a route + a template filled with real content — it's a Page.

---

## Classification Decision Tree

```
Is it a single HTML element / design token / icon with visual states only?
└─ YES → Atom ✅ mandatory

Does it combine 2+ atoms into one functional UI unit? No API calls, no app state?
└─ YES → Molecule ✅ mandatory

Does it represent a complete, identifiable section of the UI? May use app state/hooks?
└─ YES → Organism ✅ mandatory

Does it only define the spatial layout / grid structure? (and framework doesn't own this)
└─ YES → Template ⚙️ optional

Is it a specific route with real data? (and framework doesn't own routing)
└─ YES → Page ⚙️ optional
```

**When in doubt:** start from the bottom. Check if it's an Atom first. If it violates Atom rules, check Molecule. Work upward until you find the lowest level that fits.

---

## Rules for Decoupled Components

These rules apply regardless of the level:

### 1. Props down, events up

Components receive data through props. They communicate back to parents through callback props. They don't reach up into the tree.

### 2. No hardcoded margins or positions on the outer wrapper

Atoms and molecules must not set their own `margin`, `position`, `top`, `left`. Position is the parent's responsibility. Use internal padding only.

### 3. No business logic below Organism

Atoms and molecules must not know about users, products, carts, or any domain entity. They deal with UI state only (open, disabled, focused).

### 4. Single Responsibility Principle

Each component does one thing. If you struggle to name it with one clear noun or noun-phrase, it probably does too much. Split it.

### 5. Avoid prop drilling beyond 2 levels

If data needs to travel 3+ levels down, move it to context/state at the Organism or Page level. Don't pass business data through molecules.

### 6. No direct API calls in atoms or molecules

Data fetching belongs at the Organism or Page level. Atoms and molecules receive data as props, period.

---

## Folder Structure

Respect the existing app structure. If the project already has a defined folder convention, place components in the correct category within that convention.

**Default structure (if not already defined):**

```
src/
├── components/
│   ├── atoms/
│   │   └── Button/
│   │       ├── Button.tsx
│   │       └── Button.module.css   (if applicable)
│   ├── molecules/
│   ├── organisms/
│   └── templates/        ← omit if framework owns layouts (Next.js, Remix)
├── pages/                ← omit if framework owns routing (Next.js app/, Remix routes/)
└── ...
```

**Key rule:** Always check the existing project structure first. If the project uses `features/`, `modules/`, or `shared/` folders, the atomic hierarchy may live inside those. Don't impose a structure that conflicts with what's already there.

For deeper guidance on folder organization, scope conventions, and monorepo patterns, see `references/folder-patterns.md`.

---

## Common Mistakes to Avoid

| Mistake                                             | Fix                                                              |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| Atom that makes an API call                         | Move data fetching to Organism or Page                           |
| Molecule with business domain logic                 | Strip it out; pass results as props                              |
| Organism with hardcoded pixel margins               | Use layout wrapper or let the Template position it               |
| Page mixing routing logic with render logic         | Separate data orchestration from JSX                             |
| "God component" doing everything                    | Split by responsibility — find the seam                          |
| Different teams disagreeing on Molecule vs Organism | Default to the lower level; upgrade when complexity justifies it |
