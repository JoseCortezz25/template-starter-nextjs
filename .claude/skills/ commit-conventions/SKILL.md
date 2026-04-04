---
name: commit-conventions
description: Enforce project-specific Git commit message conventions compatible with commitlint and pre-commit hooks. Use this skill whenever the user asks to write a commit message, create a git commit, stage and commit changes, suggest a commit for their changes, or review/fix an existing commit message. Also trigger when the user says "commitea esto", "hazme un commit", "qué mensaje de commit uso", or any variation of committing code changes.
---

# Commit Conventions

This project enforces strict commit message rules validated by **commitlint** and a custom pre-commit hook. Every commit message **must** pass both checks or the commit will be aborted.

---

## Format Rules

### Structure

```
<type>(<scope>): <description>
```

- **`<scope>`** is optional but recommended
- **`<description>`** starts after the colon + space
- The entire first line must be **≤ 100 characters**
- No period at the end of the description

### Allowed Types

| Type       | Use for                                          |
| ---------- | ------------------------------------------------ |
| `feat`     | New feature or capability                        |
| `fix`      | Bug fix                                          |
| `chore`    | Maintenance tasks, dependency updates, config    |
| `docs`     | Documentation only changes                       |
| `test`     | Adding or updating tests                         |
| `style`    | Formatting, missing semicolons (no logic change) |
| `refactor` | Code restructuring without behavior change       |
| `perf`     | Performance improvements                         |
| `build`    | Build system or tooling changes                  |
| `ci`       | CI/CD pipeline changes                           |
| `revert`   | Reverting a previous commit                      |

### Validation Regex (from pre-commit hook)

```
^(feat|fix|chore|docs|test|style|refactor|perf|build|ci|revert)(\(.+?\))?: .{1,}$
```

---

## Examples

### ✅ Valid commits

```
feat(auth): add JWT refresh token rotation
fix(api): handle null response from payment gateway
chore(deps): upgrade vite to 5.4.0
docs(readme): update local setup instructions
test(cart): add edge cases for empty cart checkout
refactor(user): extract profile validation to separate module
perf(images): lazy load hero images on landing page
build(docker): optimize multi-stage build layers
ci(github): add job to run e2e tests on PR
style(button): fix inconsistent spacing in component
revert: revert "feat(dark-mode): add theme toggle"
```

### ❌ Invalid commits (will be rejected by hook)

```
# Wrong: missing type
updated login page

# Wrong: invalid type
update(auth): fix token expiry

# Wrong: capital letter in type
Fix(api): resolve 500 error

# Wrong: no space after colon
feat(auth):add login page

# Wrong: exceeds 100 characters
feat(user-profile-settings): update the avatar upload component to support multiple image formats including WebP, AVIF, and HEIC

# Wrong: period at the end (bad practice, though not technically blocked)
fix(cart): resolve quantity not updating.
```

---

## How to Write Good Descriptions

- Use **imperative mood**: "add", "fix", "update" — not "added", "fixes", "updating"
- Be **specific but concise**: describe _what_ changed and _why_ if not obvious
- Keep it **under 100 characters** total (including type and scope)
- Avoid vague terms: "minor changes", "stuff", "wip", "updates"

### For complex commits, add a body (optional)

The body goes after a blank line and has no character limit:

```
feat(payments): integrate Stripe webhook for subscription events

Handle subscription.created, subscription.updated, and
subscription.deleted webhook events. Store raw event payload
for audit trail before processing.

Closes #234
```

---

## Quick Reference

When generating a commit message:

1. Identify the **primary change type** from the allowed list
2. Add **scope** in parentheses if it targets a specific module/area
3. Write a clear **imperative description** in the same line
4. Verify total length is **≤ 100 characters**
5. If changes are complex, add an optional body after a blank line

For detailed scope naming conventions and multi-package monorepo patterns, see `references/scopes.md`.
