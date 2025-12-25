# CLAUDE.md: Project Context for AI Agents

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application using React 19, TypeScript, and Tailwind CSS v4. It follows a Screaming Architecture approach with domain-driven organization at the top level, where each domain implements Atomic Design principles for component structure. The project includes Storybook for component development and uses shadcn/ui for the component library foundation and Jest with Testing Library for testing.

**Tech Stack**: Next 15, React 19, TailwindCSS v4, shadcn/ui, TypeScript, zod, React Hook Form

## 🔴 CRITICAL - READ FIRST

**BEFORE doing anything else**, you MUST read:

`.claude/knowledge/critical-constraints.md`

This document contains non-negotiable architectural rules. Violating these rules is unacceptable.

## Available Specialized Agents

**When working on features, you can delegate to these specialized agents:**

**Agents in this project:**

- **Business Analysis & Ideation** → `.claude/agents/business-analyst.md`
- **Next.js 15 & App Router Architecture** → `.claude/agents/nextjs-builder.md`
- **Domain Business Logic & Entities** → `.claude/agents/domain-architect.md`
- **UX/UI Design & Architecture** → `.claude/agents/ux-ui-designer.md`
- **shadcn/ui Component Selection** → `.claude/agents/shadcn-builder.md`
- **Code Quality Review** → `.claude/agents/code-reviewer.md`
- **UI Architecture (legacy)** → `.claude/agents/ui-architect.md`

**How to use agents:**

- Read the agent file to understand its role and capabilities
- Use the Task tool to invoke: `Launch {agent-name} with session_id="{id}" to {task}`
- Agent creates plan in `.claude/plans/`, then you execute it

## Workflow Protocol

### For New Features (Automatic Orchestration)

**Parent Agent Process:**

1. **Create session file** automatically with unique session_id
2. **Analyze task** and determine which specialized agents are needed
3. **Invoke specialized agents** to create implementation plans
4. **Execute plans** step-by-step
5. **Update session context** after each phase (append-only)

**Session files**: `.claude/tasks/context_session_{id}.md` (append-only logs)

### For Trivial Changes

Implement directly (typos, simple edits) - no session needed.

## Session Context Protocol

**When session_id is provided:**

1. Read `.claude/tasks/context_session_{id}.md` FIRST
2. Understand previous decisions and progress
3. Continue from where previous work left off
4. **Append** your entry at the end (NEVER overwrite)

**Entry format**: See `.claude/tasks/README.md` for full protocol.

## Documentation Map

**Load strategically - don't read everything upfront!**

### Always Read First

- `.claude/knowledge/critical-constraints.md`- Non-negotiable rules

### Read If Session Exists

- `.claude/tasks/context_session_{id}.md` - Session history

### Load As Needed (Use Grep for sections)

- `.claude/knowledge/architecture-patterns.md` - Architecture rules
- `.claude/knowledge/business-rules.md` - Domain rules
- `.claude/knowledge/context-strategy.md` - Context loading strategy
- `.claude/knowledge/file-structure.md` - Naming conventions
- `.claude/knowledge/tech-stack.md` - Technologies, commands

**Strategy**: Use Grep to search specific sections instead of reading full files.

**Example**:

```
❌ Read: architecture-patterns.md
✅ Grep: pattern="## Repository Pattern", path="architecture-patterns.md", -A=30
```

## Key Constraints (Summary)

**Full details in `.claude/knowledge/critical-constraints.md`**

- Use repository pattern for data access (no direct DB imports)
- Externalize all text to text maps (no hardcoded strings)
- Follow architecture dependency rules strictly
- Agents create plans, parent executes
- Session context is append-only (never overwrite)

## MCP Configuration

**Available MCP Servers**: Defined in `.mcp.json`

<!-- List your MCP servers with token counts -->

- Example: **shadcn** (~4.7k tokens), **playwright** (~14k tokens)

**Strategy**: Enable only what the current task needs in `.claude/settings.local.json`

## For Agents: Pre-Work Checklist

Before starting work:

- [ ] Read `.claude/knowledge/critical-constraints.md`?
- [ ] Read session context if `session_id` provided?
- [ ] Understand my role (check `.claude/agents/{my-name}.md` if specialized agent)?
- [ ] Know which MCP tools I have access to?
- [ ] Will append to session context (not overwrite)?
- [ ] Will create plan in `.claude/plans/` (not implement directly)?

If any ❌, STOP and review documentation.

**Token Budget Goal**: ~400-500 tokens for this file. All details are in `.claude/knowledge/` docs.
