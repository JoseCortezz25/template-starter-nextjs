# Session Context Guide

**How to use session files for multi-step tasks and agent coordination.**

---

## What are Sessions?

**Sessions** are append-only log files that track the progress, decisions, and context of multi-step tasks across multiple agent invocations.

### Purpose

Sessions solve three critical problems:

1. **Context Continuity**: Preserve decisions and progress across multiple agent invocations
2. **Agent Coordination**: Enable multiple specialized agents to work on the same feature
3. **KV-Cache Optimization**: Append-only format keeps context prefix stable for faster responses

### When to Create Sessions

 **Create a session when**:

- Task requires multiple steps or phases
- Multiple specialized agents will be involved
- Task will span multiple conversations
- Decisions need to be preserved for future reference
- Complex feature requiring planning � implementation � testing

L **Skip sessions when**:

- Single, trivial task (typo fix, simple edit)
- Task completes in one step
- No agent coordination needed
- Task is purely conversational

---

## Session Lifecycle

### 1. Creating a Session

**When**: At the start of a new feature or complex task

**How**: Parent agent creates session file automatically

**File Location**: `.claude/tasks/context-session-{id}.md`

**Session ID Format**: `{feature-name}-{YYYYMMDD}` or `{uuid-short}`

**Example**:

```
.claude/tasks/context_session_workout-tracking-20250103.md
.claude/tasks/context_session_auth-flow-a3f8.md
```

**Initial Content**: Use template from `.claude/tasks/template/context-session-template.md`

### 2. Active Sessions

**Status**: =� Active

**Characteristics**:

- Currently being worked on
- Agents are appending entries
- Plans are being executed
- Files are being created/modified

**Agent Responsibilities**:

1. **ALWAYS read session context first** before starting work
2. **Understand previous decisions** and why they were made
3. **Continue from where previous work left off**
4. **Append your entry** when done (NEVER overwrite)

### 3. Completed Sessions

**Status**:  Completed

**When**: All tasks finished, feature is implemented and working

**Final Entry**: Mark session as completed with summary

**Archive**: Move to `.claude/tasks/archive/` after 30 days

### 4. Paused Sessions

**Status**: =� Paused

**When**: Work temporarily stopped (waiting for user input, dependency, or context switch)

**Resume**: Update status to =� Active when resuming work

### 5. Blocked Sessions

**Status**: � Blocked

**When**: Cannot proceed due to blocker

**Common Blockers**:

- Waiting for user decision
- Missing dependency
- Unresolved error
- Unclear requirements

**Document**: Clearly state blocker and what's needed to unblock

### 6. Failed Sessions

**Status**: L Failed

**When**: Encountered unrecoverable error or approach is not viable

**Document**: What went wrong, what was tried, lessons learned

---

## Why Append-Only?

### KV-Cache Optimization

Claude uses a KV-cache (key-value cache) to speed up processing. When the beginning of a prompt stays the same (stable prefix), the cache can be reused, resulting in:

- � **Faster responses** (skip processing cached content)
- =� **Lower costs** (cached tokens are cheaper)
- <� **Better consistency** (same context = consistent behavior)

**Example**:

```
Request 1: [Session Context] + [New Entry 1]
         �
    Cache prefix: [Session Context]

Request 2: [Session Context] + [New Entry 1] + [New Entry 2]
         �
    Cache HIT! Reuse: [Session Context] + [New Entry 1]
    Only process: [New Entry 2]
```

If you **overwrite** instead of append:

- L Cache invalidated (prefix changed)
- L Full reprocessing required
- L Slower and more expensive

### Audit Trail

Append-only preserves **complete history**:

- See what was tried
- Understand why decisions were made
- Learn from errors
- Track progress over time

### Error Learning

When things go wrong, having the full history allows:

- Debugging what led to the error
- Avoiding repeated mistakes
- Understanding context of failed approaches

---

## Entry Format

### Required Fields

Every entry MUST include:

```markdown
---
## [YYYY-MM-DD HH:MM] {agent-name}: {Action Title}

**Task**: {One-line description}

**Status**: {status-emoji} {Status}

**Key Decisions**:
- {Decision with brief rationale}

**Next Steps**:
- {What should happen next}

---
```

### Status Values

| Status    | Emoji | When to Use                           |
| --------- | ----- | ------------------------------------- |
| Active    | =�    | Currently working on this             |
| Paused    | =�    | Temporarily stopped, can resume later |
| Completed |       | Work finished successfully            |
| Blocked   | �     | Cannot proceed, need intervention     |
| Failed    | L     | Encountered unrecoverable error       |

### Optional Fields

Include when relevant:

- **Plan Location**: Path to plan file in `.claude/plans/`
- **Files Created/Modified**: List of affected files
- **Blockers**: What's preventing progress
- **Coordination**: Which agents need to be invoked next

---

## Token Budget per Entry

**Target**: 300-500 tokens per entry

**Maximum**: 800 tokens (only for complex phase transitions)

### What to Include 

- **Task summary**: 1-2 sentences of what was done
- **Key decisions**: 3-5 bullet points with rationale
- **Status**: Current status and why
- **Next steps**: What needs to happen next (2-4 items)
- **Plan location**: Link to plan file (don't duplicate content)
- **Important file paths**: Files created or significantly modified
- **Blockers**: If stuck, what's blocking and what's needed

### What to Exclude L

- L **Full code blocks**: Link to files instead
- L **Detailed implementation steps**: Put in plan files
- L **Debug logs**: Summarize the issue, not full logs
- L **Exploration notes**: Only document final decisions
- L **Copy-pasted code**: Reference file:line instead
- L **Redundant information**: Don't repeat what's in plans

### Example: Good Entry

```markdown
---
## [2025-01-03 14:30] domain-architect: Workout Domain Model Design

**Task**: Designed workout domain entities and business rules

**Status**:  Completed

**Plan Location**: `.claude/plans/domain-workout-plan.md`

**Key Decisions**:
- Used Repository Pattern for data access (abstracts DB)
- Workout has one-to-many with Exercise (composition)
- Validation: min 1 exercise per workout, max 20
- Server Actions require session validation (security)

**Files Created**:
- `src/domains/workouts/types.ts`: Core entities
- `src/domains/workouts/schema.ts`: Zod validation
- `src/domains/workouts/actions.ts`: Server Actions

**Next Steps**:
- nextjs-builder: Design workout pages and routing
- shadcn-builder: Select components for workout forms
- Parent: Implement Server Actions with session validation

---
```

**Token Count**: ~380 tokens 

### Example: Bad Entry (Too Verbose)

````markdown
---

## [2025-01-03 14:30] domain-architect: Workout Domain Model

**Task**: Created workout domain model with all entities

**Status**: Completed

**Key Decisions**:

- Repository Pattern because it provides abstraction over data access...
  [500 words of explanation]
- Here's the full Workout interface:
  ```typescript
  [100 lines of code]
  ```
````

- Here's the validation schema:
  ```typescript
  [80 lines of code]
  ```

[More verbose explanations and code dumps...]

---

````

**Token Count**: ~2500 tokens L

**Problems**:
- Includes full code (should link to files)
- Over-explains decisions (should be brief)
- Duplicates content from plan file
- Wastes tokens on low-signal content

---

## Best Practices

### For Parent Agents

**Creating Sessions**:
1. Use descriptive session_id: `{feature}-{date}` or `{feature}-{uuid}`
2. Start with template from `.claude/tasks/template/`
3. Set clear objective (1-2 sentences)
4. List related files that will be affected

**Coordinating Agents**:
1. Pass session_id to all specialized agents
2. Update session after each agent completes
3. Summarize decisions from agent plans
4. Track which agents have run and what's next

**Completing Sessions**:
1. Add final entry summarizing outcome
2. Update status to  Completed
3. List all files created/modified
4. Document lessons learned (if any)

### For Specialized Agents

**Before Starting Work**:
1. **ALWAYS read session context first** (`.claude/tasks/context_session_{id}.md`)
2. Understand what's been done and why
3. Check if your area was already planned
4. Look for relevant decisions that affect your work

**Creating Plans**:
1. Reference session decisions in your plan
2. Build on previous agent work (don't duplicate)
3. Link to session in plan metadata

**After Completing Work**:
1. **ALWAYS append entry to session** (never overwrite)
2. Use entry template for consistency
3. Link to your plan file
4. Document key decisions concisely
5. Specify next steps for other agents

### Token Optimization

**Minimize Entry Size**:
-  Link to plan files instead of duplicating
-  Reference file:line for code instead of copying
-  Use bullet points (concise) not paragraphs (verbose)
-  Document decisions, not implementation details
-  Link to external resources instead of quoting

**Keep Prefix Stable**:
-  ONLY append at the end
-  NEVER edit previous entries
-  NEVER reorder entries
-  NEVER delete content

**Lazy Loading**:
- Agents should use Grep to find specific entries if session is long
- Pattern: `## \[.*\] {agent-name}:` to find agent's previous work

---

## Session Workflow Example

### Full Feature: User Authentication

**Session**: `context_session_auth-flow-20250103.md`

```markdown
[2025-01-03 10:00] parent-agent: Initial Session Setup
Status: =� Active
Next Steps: Launch domain-architect for business logic planning

---

[2025-01-03 10:15] domain-architect: Auth Domain Design
Status:  Completed
Plan: .claude/plans/domain-auth-plan.md
Key Decisions:
- JWT tokens with refresh mechanism
- Role-based permissions (user, admin)
- Password strength validation (zod schema)
Next Steps: UX designer for auth flow design

---

[2025-01-03 10:45] ux-ui-designer: Auth UX Design
Status:  Completed
Plan: .claude/plans/ux-auth-plan.md
Key Decisions:
- Multi-step registration (email � password � profile)
- Social login as secondary option
- Password strength indicator (live feedback)
Next Steps: nextjs-builder for page routing

---

[2025-01-03 11:20] nextjs-builder: Auth Pages Architecture
Status:  Completed
Plan: .claude/plans/nextjs-auth-plan.md
Key Decisions:
- Route group (auth) for shared layout
- Server Components for pages, Client for forms
- Middleware for protected route checking
Next Steps: shadcn-builder for form components

---

[2025-01-03 11:40] shadcn-builder: Auth Component Selection
Status:  Completed
Plan: .claude/plans/shadcn-auth-plan.md
Components: button, input, form, card, alert
Next Steps: Parent implements all plans

---

[2025-01-03 14:30] parent-agent: Implementation Complete
Status:  Completed
Files Created: [list of 12 files]
All features working and tested
Session COMPLETED

---
````

**Total Session Tokens**: ~2500 tokens (6 entries � ~400 tokens each)

---

## Coordination Patterns

### Sequential Agents (Dependencies)

When agents depend on each other:

```
domain-architect (business logic)
    �
ux-ui-designer (uses domain entities)
    �
nextjs-builder (uses UX design)
    �
shadcn-builder (uses Next.js requirements)
    �
parent-agent (implements everything)
```

**Session Entry Pattern**: Each agent documents what next agent needs

### Parallel Agents (Independent)

When agents can work independently:

```
domain-architect (backend)  +  ux-ui-designer (frontend)
              �                        �
         [Both complete in parallel]
                      �
            nextjs-builder (combines both)
```

**Session Entry Pattern**: Note which agents can run concurrently

### Iterative Agents (Refinement)

When design needs refinement:

```
ux-ui-designer (initial design)
    �
parent reviews with user
    �
ux-ui-designer (refined design)
    �
implementation
```

**Session Entry Pattern**: Link to previous iteration, document what changed

---

## Archive Strategy

### When to Archive

Archive sessions after:

-  30 days since completion
-  Feature is stable in production
-  No ongoing related work

### How to Archive

1. Move file: `.claude/tasks/` � `.claude/tasks/archive/{year}/`
2. Keep filename: `context_session_{id}.md`
3. Create archive index if needed

### Archive Structure

```
.claude/tasks/
   archive/
      2024/
         context_session_auth-20241201.md
         context_session_profile-20241215.md
      2025/
          context_session_workout-20250103.md
   context_session_active-feature-20250110.md  (active)
   README.md  (this file)
```

---

## Troubleshooting

### Session Not Being Read

**Problem**: Agents not reading session before starting

**Solution**:

- Verify session_id is passed to agent
- Check session file exists at expected path
- Ensure agents follow "read session first" rule

### Session Too Large

**Problem**: Session file growing too large (>5000 tokens)

**Solutions**:

- Summarize early entries (create summary entry, archive old ones)
- Split into multiple sessions (phase-based)
- Use more concise entries (follow token budget)

### Conflicting Decisions

**Problem**: Later agent contradicts earlier decision

**Solution**:

- Agent MUST read full session before planning
- Reference conflicting decision explicitly
- Document why change is necessary
- Update earlier agent's plan if needed

### Lost Context

**Problem**: Conversation restarted, lost context

**Solution**:

- Session file preserves all context
- New conversation can read session and continue
- This is the primary benefit of append-only sessions

---

## Quick Reference

### Agent Checklist

Before starting work:

- [ ] Session ID provided?
- [ ] Read `.claude/tasks/context_session_{id}.md`?
- [ ] Understand previous decisions?
- [ ] Know which agents already ran?
- [ ] Reviewed plans from other agents?

After completing work:

- [ ] Created plan in `.claude/plans/`?
- [ ] Appended entry to session (not overwrite)?
- [ ] Entry follows template?
- [ ] Entry is 300-500 tokens?
- [ ] Documented key decisions?
- [ ] Specified next steps?

### Session Status Guide

| Status     | What to Do                                   |
| ---------- | -------------------------------------------- |
| =� Active  | Continue work, append entries                |
| =� Paused  | Resume when unblocked                        |
|  Completed | Archive after 30 days                        |
| � Blocked  | Document blocker, wait for resolution        |
| L Failed   | Document lessons, may retry with new session |

### Token Budget

| Item                | Target  | Max  |
| ------------------- | ------- | ---- |
| Entry               | 300-500 | 800  |
| Session Total       | <3000   | 5000 |
| Entire Context Load | <1500   | 2000 |

---

## Templates

**Session Template**: `.claude/tasks/template/context-session-template.md`

**Entry Template**: See template file for full format

**Quick Entry**:

```markdown
---
## [{timestamp}] {agent}: {Title}

**Task**: {one-line}

**Status**: {emoji} {Status}

**Key Decisions**:
- {decision}

**Next Steps**:
- {step}

---
```

---

## Summary

**Sessions enable**:

-  Context continuity across conversations
-  Multi-agent coordination on complex tasks
-  KV-cache optimization (faster, cheaper)
-  Audit trail of decisions
-  Error recovery and learning

**Remember**:

- Always append, never overwrite
- Keep entries concise (300-500 tokens)
- Read session before starting work
- Document decisions, not implementation
- Link to plans, don't duplicate

**Token Budget**: ~5000 tokens (this guide). Agents should Grep for specific sections, not read in full.
