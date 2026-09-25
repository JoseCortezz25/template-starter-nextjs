# AGENTS.md

This file provides guidance to AI coding agents (OpenCode and Claude Code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application using React 19, TypeScript, and Tailwind CSS v4. It follows a Screaming Architecture approach with domain-driven organization at the top level, where each domain implements Atomic Design principles for component structure. The project includes Storybook for component development and uses shadcn/ui for the component library foundation and Jest with Testing Library for testing.

**Tech Stack**: Next 15, React 19, TailwindCSS v4, shadcn/ui, TypeScript, zod, React Hook Form

## General Rules

- **Styling**: Use Tailwind CSS with `@apply` for component styles — no inline styles, no arbitrary values unless strictly necessary.
- **Naming**: BEM methodology for class names. Keep names short and descriptive — avoid deeply nested chains like `block__element--modifier--state`.
- **Component structure**: Atomic Design — atoms, molecules, organisms, templates. Components are dumb and presentational; logic lives in hooks.
- **Architecture**: Domain Driven Design — each domain is self-contained with its own components, hooks, stores, schemas, and messages. No cross-domain imports.
- **Forms**: Always use React Hook Form + Zod. Schemas in `.schema.ts` files; one schema per file.
- **Identifiers**: Use English-only source-code identifiers, without exceptions for domain terms.
- **Stores**: Segment Zustand stores by one cohesive UI capability; universal or general stores are forbidden.
- **Conditional classes**: Always use the `cn()` utility for conditional or merged class names — never string interpolation (`\`class-${var}\``).

> Full non-negotiable constraints → `.agents/knowledge/critical-constraints.md`
> Full rules of project → `.agents/rules/*.md`

## 🔴 CRITICAL - READ FIRST

**BEFORE doing anything else**, you MUST read:

`.agents/knowledge/critical-constraints.md`

This document contains non-negotiable architectural rules. Violating these rules is unacceptable.

## Shared context - canonical source

Content lives once under `.agents/`. Both tools reach it through the paths below.
Never write a `@`-prefixed path here: Claude Code inlines those at launch.

- `.agents/knowledge/critical-constraints.md` - non-negotiable rules, read before any work
- `.agents/knowledge/{file}.md` - the rest of the documentation map, loaded on demand with Grep
- `.agents/rules/{file}.md` - path-scoped rules
- `.agents/skills/{name}/SKILL.md` - skills

## Domain Clarification Gate

Before planning or implementing a feature, verify that the user has explicitly identified its business domain. If not, ask focused clarification questions and wait for the answers. Do not design, create, or extend a domain until its capability, responsibilities, and boundaries with adjacent domains are clear.

## Subagents - per tool, intentionally not shared

Claude Code and OpenCode define subagents differently, so each tool reads its own directory:

- Claude Code: `.claude/agents/*.md`
- OpenCode: `.opencode/agents/*.md`

`wireframe-designer` exists only for OpenCode (`.opencode/agents/wireframe-designer.md`).

**How to use agents:**

- Read the agent file to understand its role and capabilities
- Use the Task tool to invoke: `Launch {agent-name} with session_id="{id}" to {task}`
- Agent creates a plan in the tool's plans directory, then you execute it

## Tool-specific configuration - not shared

- Claude Code hooks: `.claude/settings.json`, `.claude/hooks/`
- OpenCode MCP servers: `opencode.json`

## Workflow Protocol

### Agent Process

1. **Analyze task** and determine which specialized agents are needed
2. **Invoke specialized agents** to create implementation plans
3. **Execute plans** step-by-step
4. **Run Guardian** after each implementation to verify code culture alignment

### For Trivial Changes

Implement directly (typos, simple edits) — no planning session needed.

### Guardian — Code Culture Verification

After every implementation (feature, fix, or refactor), run:

```bash
guardian run
```

Guardian reads `RULES.md` and validates that the implemented code follows the team's cultural conventions. Do not consider an implementation complete until Guardian passes or all violations are explicitly acknowledged.

## Documentation Map

**Load strategically - don't read everything upfront!**

### Always Read First

- `.agents/knowledge/critical-constraints.md` - Non-negotiable rules

### Load As Needed (Use Grep for sections)

- `.agents/knowledge/architecture-patterns.md` - Architecture rules
- `.agents/knowledge/business-logic.md` - Domain rules
- `.agents/knowledge/file-structure.md` - Naming conventions
- `.agents/knowledge/tech-stack.md` - Technologies, commands

**Strategy**: Use Grep to search specific sections instead of reading full files.

**Example**:

```
❌ Read: architecture-patterns.md
✅ Grep: pattern="## Repository Pattern", path="architecture-patterns.md", -A=30
```

## Key Constraints (Summary)

**Full details in `.agents/knowledge/critical-constraints.md`**

- Use repository pattern for data access (no direct DB imports)
- Externalize all text to text maps (no hardcoded strings)
- Follow architecture dependency rules strictly
- Define a bounded domain before planning or implementing a feature
- Use English-only identifiers and segmented Zustand stores
- Agents create plans, parent executes
- Session context is append-only (never overwrite)

## MCP Configuration

**Available MCP Servers**: Defined per tool in `.mcp.json` (Claude Code) and `opencode.json` (OpenCode)

- **shadcn** (~4.7k tokens) — components, registries, examples shadcn/ui
- **playwright** (~14k tokens) — browser automation, E2E testing
- **chrome-devtools** — inspection, snapshots, performance, DevTools
- **Figma Desktop** — Figma design context, screenshots, variables

**Strategy**: Enable only what the current task needs in the tool's MCP configuration file.

## Coding Rules

**Auto-applied rules** (based on file paths) in `.agents/rules/`:

| Rule                              | Applies to                  | Description                                                               |
| --------------------------------- | --------------------------- | ------------------------------------------------------------------------- |
| `code-quality.md`                 | `src/**/*.{ts,tsx}`         | ESLint conventions, TypeScript strictness, no `any`                       |
| `naming-conventions.md`           | `src/**/*.{ts,tsx}`         | kebab-case files, PascalCase components, suffixes                         |
| `folder-structure.md`             | `src/**/*.{ts,tsx}`         | Screaming Architecture + Atomic Design layout                             |
| `text-management.md`              | `src/**/*.{ts,tsx}`         | Domain messages, no hardcoded strings                                     |
| `styling.md`                      | `src/**/*.{ts,tsx}`         | Tailwind + `@apply`, mobile-first, no inline styles                       |
| `project-characteristics.md`      | `src/**/*.{ts,tsx}`         | RSC-first, Zustand, nuqs, Server Actions                                  |
| `document-component-storybook.md` | `src/**/*.{ts,tsx}`         | Storybook story structure aligned with Figma                              |
| `ddd-domain-structure.md`         | `src/domains/**/*.{ts,tsx}` | DDD domain anatomy: components, hooks, stores, actions, schemas, messages |
| `forms.md`                        | `src/**/*.{ts,tsx}`         | React Hook Form + Zod required, one schema per file, one hook per form    |
| `naming-language.md`              | `src/**/*.{ts,tsx}`         | English-only identifiers, without exceptions                              |

## Available Skills

### Skills

Canonical source: `.agents/skills/`. `.claude/skills/{name}` and `.opencode/skills` are symlinks to it.

| Skill                                | Description                                                                                  | Source                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `frontend-design`                    | Distinctive frontend designs, typography, color palettes, motion                             | [.agents/skills/frontend-design](.agents/skills/frontend-design/SKILL.md)                                       |
| `react-19`                           | React 19 patterns, React Compiler, no manual memoization                                     | [.agents/skills/react-19](.agents/skills/react-19/SKILL.md)                                                     |
| `typescript`                         | TypeScript strict patterns, types, interfaces, generics                                      | [.agents/skills/typescript](.agents/skills/typescript/SKILL.md)                                                 |
| `tailwind-4`                         | Tailwind CSS v4, cn(), theme variables, no var() in className                                | [.agents/skills/tailwind-4](.agents/skills/tailwind-4/SKILL.md)                                                 |
| `zod-4`                              | Zod v4 schema validation, breaking changes from v3                                           | [.agents/skills/zod-4](.agents/skills/zod-4/SKILL.md)                                                           |
| `grill-me`                           | Interview the user relentlessly about a plan or design until reaching shared understanding   | [.agents/skills/grill-me](.agents/skills/grill-me/SKILL.md)                                                     |
| `thermo-nuclear-code-quality-review` | Extremely strict maintainability review — abstraction quality, giant files, spaghetti growth | [.agents/skills/thermo-nuclear-code-quality-review](.agents/skills/thermo-nuclear-code-quality-review/SKILL.md) |
| `commit-conventions`                 | Enforce project-specific Git commit message conventions compatible with commitlint           | [.agents/skills/commit-conventions](.agents/skills/commit-conventions/SKILL.md)                                 |
| `atomic-design`                      | Guide for creating, componentizing, and refactoring UI components following Atomic Design    | [.agents/skills/atomic-design](.agents/skills/atomic-design/SKILL.md)                                           |
| `forms`                              | Forms with React Hook Form + Zod — schema, hook, component, and Server Action patterns       | [.agents/skills/forms](.agents/skills/forms/SKILL.md)                                                           |
| `naming-language`                    | English-only identifiers — detect and fix non-English source-code names                      | [.agents/skills/naming-language](.agents/skills/naming-language/SKILL.md)                                       |

## How Skills Work

1. **Auto-detection**: the AI agent reads AGENTS.md, which lists each skill and its trigger
2. **Context matching**: when a task matches a skill's trigger, that skill's instructions load
3. **Pattern application**: follow the exact patterns from the skill
4. **First-time-correct**: no trial and error — skills provide exact conventions

## For Agents: Pre-Work Checklist

Before starting work:

- [ ] Read `.agents/knowledge/critical-constraints.md`?
- [ ] Is the feature domain explicit and bounded? If not, ask and wait before continuing.
- [ ] Understand your role (check the tool's agents directory: `.claude/agents/` or `.opencode/agents/`)?
- [ ] Know which MCP tools you have access to?
- [ ] If there is information that replaces or modifies the knowledge, run the `project-consultant` agent to update the files involved in `.agents/knowledge/`.

If any ❌, STOP and review documentation.
