# OPENCODE.md

This file provides guidance to Opencode when working with code in this repository.

## Project Overview

This is a Next.js 15 application using React 19, TypeScript, and Tailwind CSS v4. It follows a Screaming Architecture approach with domain-driven organization at the top level, where each domain implements Atomic Design principles for component structure. The project includes Storybook for component development and uses shadcn/ui for the component library foundation and Jest with Testing Library for testing.

**Tech Stack**: Next 15, React 19, TailwindCSS v4, shadcn/ui, TypeScript, zod, React Hook Form

## General Rules

- **Styling**: Use Tailwind CSS with `@apply` for component styles — no inline styles, no arbitrary values unless strictly necessary.
- **Naming**: BEM methodology for class names. Keep names short and descriptive — avoid deeply nested chains like `block__element--modifier--state`.
- **Component structure**: Atomic Design — atoms, molecules, organisms, templates. Components are dumb and presentational; logic lives in hooks.
- **Architecture**: Domain Driven Design — each domain is self-contained with its own components, hooks, stores, schemas, and messages. No cross-domain imports.
- **Forms**: Always use React Hook Form + Zod. Schemas in `.schema.ts` files; one schema per file.
- **Conditional classes**: Always use the `cn()` utility for conditional or merged class names — never string interpolation (`\`class-${var}\``).

> Full non-negotiable constraints → `.opencode/knowledge/critical-constraints.md`
> Full rules of project → `.opencode/rules/*.md`

## 🔴 CRITICAL - READ FIRST

**BEFORE doing anything else**, you MUST read:

`.opencode/knowledge/critical-constraints.md`

This document contains non-negotiable architectural rules. Violating these rules is unacceptable.

## Available Specialized Agents

**When working on features, you can delegate to these specialized agents:**

**Agents in this project:**

- **Project Knowledge & Context** → `.opencode/agents/project-consultant.md`
- **Business Analysis & Ideation** → `.opencode/agents/business-analyst.md`
- **Next.js 15 & App Router Architecture** → `.opencode/agents/nextjs-builder.md`
- **Domain Business Logic & Entities** → `.opencode/agents/domain-architect.md`
- **UX/UI Design & Architecture** → `.opencode/agents/ux-ui-designer.md`
- **Wireframe Design** → `.opencode/agents/wireframe-designer.md`
- **Code Quality Review** → `.opencode/agents/code-reviewer.md`
- **Code Audit** → `.opencode/agents/code-audit.md`
- **Doc Gardener** → `.opencode/agents/doc-gardener.md`

**How to use agents:**

- Read the agent file to understand its role and capabilities
- Use the Task tool to invoke: `Launch {agent-name} with session_id="{id}" to {task}`
- Agent creates plan in `.opencode/plans/`, then you execute it

## Workflow Protocol

### Agent Process

1. **Analyze task** and determine which specialized agents are needed
2. **Invoke specialized agents** to create implementation plans
3. **Execute plans** step-by-step
4. **Run Guardian** after each implementation to verify code culture alignment

### Guardian — Code Culture Verification

After every implementation (feature, fix, or refactor), run:

```bash
guardian run
```

Guardian reads `RULES.md` and validates that the implemented code follows the team's cultural conventions. Do not consider an implementation complete until Guardian passes or all violations are explicitly acknowledged.

## Documentation Map

**Load strategically - don't read everything upfront!**

### Always Read First

- `.opencode/knowledge/critical-constraints.md`- Non-negotiable rules

### Load As Needed (Use Grep for sections)

- `.opencode/knowledge/architecture-patterns.md` - Architecture rules
- `.opencode/knowledge/business-rules.md` - Domain rules
- `.opencode/knowledge/context-strategy.md` - Context loading strategy
- `.opencode/knowledge/file-structure.md` - Naming conventions
- `.opencode/knowledge/tech-stack.md` - Technologies, commands

**Strategy**: Use Grep to search specific sections instead of reading full files.

**Example**:

```
❌ Read: architecture-patterns.md
✅ Grep: pattern="## Repository Pattern", path="architecture-patterns.md", -A=30
```

## Key Constraints (Summary)

**Full details in `.opencode/knowledge/critical-constraints.md`**

- Use repository pattern for data access (no direct DB imports)
- Externalize all text to text maps (no hardcoded strings)
- Follow architecture dependency rules strictly
- Agents create plans, parent executes
- Session context is append-only (never overwrite)

## MCP Configuration

**Available MCP Servers**: Defined in `opencode.json`

- **shadcn** (~4.7k tokens) — componentes, registros, ejemplos shadcn/ui
- **playwright** (~14k tokens) — automatización de navegador, pruebas E2E
- **chrome-devtools** — inspección, snapshots, performance, DevTools
- **Figma Desktop** — diseño, contexto de Figma, screenshots, variables

**Strategy**: Enable only what the current task needs in `opencode.json`

## Coding Rules

**Auto-applied rules** (based on file paths) in `.opencode/rules/`:

| Rule                              | Applies to                  | Description                                                                 |
| --------------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| `code-quality.md`                 | `src/**/*.{ts,tsx}`         | ESLint conventions, TypeScript strictness, no `any`                         |
| `naming-conventions.md`           | `src/**/*.{ts,tsx}`         | kebab-case files, PascalCase components, suffixes                           |
| `folder-structure.md`             | `src/**/*.{ts,tsx}`         | Screaming Architecture + Atomic Design layout                               |
| `text-management.md`              | `src/**/*.{ts,tsx}`         | Domain messages, no hardcoded strings                                       |
| `styling.md`                      | `src/**/*.{ts,tsx}`         | Tailwind + `@apply`, mobile-first, no inline styles                         |
| `project-characteristics.md`      | `src/**/*.{ts,tsx}`         | RSC-first, Zustand, nuqs, Server Actions                                    |
| `document-component-storybook.md` | `src/**/*.{ts,tsx}`         | Storybook story structure aligned with Figma                                |
| `ddd-domain-structure.md`         | `src/domains/**/*.{ts,tsx}` | DDD domain anatomy: components, hooks, stores, actions, schemas, messages   |
| `forms.md`                        | `src/**/*.{ts,tsx}`         | React Hook Form + Zod obligatorio, schema por archivo, hook por formulario  |
| `naming-language.md`              | `src/**/*.{ts,tsx}`         | English-only identifiers — no Spanish names except non-generic domain terms |

## Available Skills

### Skills

Canonical source: `AGENTS/` (root). `.claude/skills` and `.opencode/skills` are symlinks to it.

| Skill                                | Description                                                                                  | Source                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `frontend-design`                    | Distinctive frontend designs, typography, color palettes, motion                             | [.opencode/skills/frontend-design](.opencode/skills/frontend-design/SKILL.md)                                       |
| `react-19`                           | React 19 patterns, React Compiler, no manual memoization                                     | [.opencode/skills/react-19](.opencode/skills/react-19/SKILL.md)                                                     |
| `typescript`                         | TypeScript strict patterns, types, interfaces, generics                                      | [.opencode/skills/typescript](.opencode/skills/typescript/SKILL.md)                                                 |
| `tailwind-4`                         | Tailwind CSS v4, cn(), theme variables, no var() in className                                | [.opencode/skills/tailwind-4](.opencode/skills/tailwind-4/SKILL.md)                                                 |
| `zod-4`                              | Zod v4 schema validation, breaking changes from v3                                           | [.opencode/skills/zod-4](.opencode/skills/zod-4/SKILL.md)                                                           |
| `grill-me`                           | Interview the user relentlessly about a plan or design until reaching shared understanding   | [.opencode/skills/grill-me](.opencode/skills/grill-me/SKILL.md)                                                     |
| `thermo-nuclear-code-quality-review` | Extremely strict maintainability review — abstraction quality, giant files, spaghetti growth | [.opencode/skills/thermo-nuclear-code-quality-review](.opencode/skills/thermo-nuclear-code-quality-review/SKILL.md) |
| `commit-conventions`                 | Enforce project-specific Git commit message conventions compatible with commitlint           | [.opencode/skills/commit-conventions](.opencode/skills/commit-conventions/SKILL.md)                                 |
| `atomic-design`                      | Guide for creating, componentizing, and refactoring UI components following Atomic Design    | [.opencode/skills/atomic-design](.opencode/skills/atomic-design/SKILL.md)                                           |
| `forms`                              | Forms with React Hook Form + Zod — schema, hook, component, and Server Action patterns       | [.opencode/skills/forms](.opencode/skills/forms/SKILL.md)                                                           |
| `naming-language`                    | English-only identifiers — detect and fix Spanish names with narrow domain-term exception    | [.opencode/skills/naming-language](.opencode/skills/naming-language/SKILL.md)                                       |

## How Skills Work

1. **Auto-detection**: Open Code reads AGENTS.md which contains skill triggers
2. **Context matching**: When editing Go/TUI code, gentleman-bubbletea loads
3. **Pattern application**: AI follows the exact patterns from the skill
4. **First-time-correct**: No trial and error - skills provide exact conventions

## For Agents: Pre-Work Checklist

Before starting work:

- [ ] Read `.opencode/knowledge/critical-constraints.md`?
- [ ] Understand my role (check `.opencode/agents/{my-name}.md` if specialized agent)?
- [ ] Know which MCP tools I have access to?
- [ ] If there is information that replaces or modifies the knowledge, run the `project-consultant` agent to update the files involved in `.opencode/knowledge/`.

If any ❌, STOP and review documentation.
