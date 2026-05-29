# Workflow Init — Domain Resolution Protocol

**Mandatory before creating or modifying any file under `src/domains/`.**

---

## Why This Rule Exists

Documentation examples in `.claude/knowledge/` use placeholder domains (`auth`, `users`, `workouts`). These do NOT represent the actual business domains of this project. Generating code inside a domain that doesn't exist in the project creates orphaned structure and pollutes the architecture.

This rule establishes the domain map as the single source of truth before any code is written.

---

## The 5-Step Protocol

### Step 1 — Check for domain-map.md

```
Read: .claude/knowledge/domain-map.md
```

- If the file **exists** → proceed to Step 4.
- If the file **does not exist** → proceed to Step 2.

---

### Step 2 — Gather business context

Answer these questions using available inputs (task description, PRD, README, user conversation):

| Question | Purpose |
|---|---|
| What problem does this product solve? | Core domain identification |
| Who are the primary actors (users, admins, systems)? | Actor-driven domains |
| What are the main nouns in the business language? | Ubiquitous language |
| What are the top 3-5 user actions the system must support? | Use-case driven slicing |
| What data entities does the system own vs. consume externally? | Bounded context boundaries |

If inputs are insufficient, **STOP and ask the user** before continuing.

---

### Step 3 — Generate domain-map.md

Create `.claude/knowledge/domain-map.md` with the following structure:

```markdown
# Domain Map

> Source of truth for business domains in this project.
> Generated from: [describe the source — PRD, user input, README, etc.]
> Last updated: YYYY-MM-DD

## Domains

### `{domain-name}`
- **Purpose**: One sentence describing what this domain owns.
- **Key entities**: List the main data objects.
- **Key use cases**: List 3-5 actions this domain handles.
- **Bounded context**: What this domain does NOT own.

### `{domain-name-2}`
...

## Shared / Cross-cutting

List concepts that are NOT a domain but are used across domains:
- (e.g., notifications, audit logs, i18n)
  These belong in `src/components/`, `src/utils/`, or `src/config/` — NOT in `src/domains/`.
```

Commit the file immediately after creation with message: `docs: add domain-map to knowledge base`.

---

### Step 4 — Validate the target domain

Before creating any file under `src/domains/{name}/`, verify:

- [ ] `{name}` appears as a domain in `domain-map.md`
- [ ] The feature you're implementing matches the domain's **purpose** and **use cases**
- [ ] You are not mixing concerns that belong to a different listed domain

---

### Step 5 — Domain gate

**Can you answer this question?**

> "This file belongs to the `{domain}` domain because it implements `{use-case}` which is owned by that domain per `domain-map.md`."

- If **YES** → proceed with implementation.
- If **NO** → STOP. Do not create the file. Ask the user to clarify the domain boundary first.

---

## Updating domain-map.md

When a new domain is added to the project:

1. Append the new domain entry to `domain-map.md` (never overwrite existing entries).
2. Describe its purpose, entities, use cases, and bounded context.
3. Commit: `docs: add {domain-name} domain to domain-map`.

Do not silently add new domains while implementing a feature. Adding a domain is an explicit architectural decision that must be visible in the commit history.

---

## Applies to

All agents and all sessions. No exceptions for "trivial" changes — if the file path contains `src/domains/`, this protocol is mandatory.
