# Scope Naming Conventions

Scopes are optional but strongly recommended. They clarify _where_ in the codebase a change lives.

---

## General Rules

- Use **kebab-case**: `user-profile`, not `userProfile` or `user_profile`
- Keep scopes **short and consistent** across the team
- Scope should match a **module, route, component, or domain area** — not a file name
- When in doubt, use the feature/domain name, not the technical layer

---

## Common Scope Patterns

### By feature/domain (recommended)

```
feat(auth): ...
fix(checkout): ...
feat(dashboard): ...
chore(notifications): ...
```

### By UI component

```
feat(button): ...
fix(modal): ...
style(navbar): ...
```

### By API route or service

```
fix(api/users): ...
feat(api/products): ...
```

### By infrastructure/tooling

```
chore(docker): ...
ci(github-actions): ...
build(webpack): ...
chore(eslint): ...
```

---

## Monorepo Scopes

For monorepos with multiple packages, prefix with the package name:

```
feat(web/auth): add SSO login page
fix(api/payments): handle Stripe webhook timeout
chore(shared/utils): add date formatting helpers
```

---

## When to Omit Scope

It's fine to omit scope when:

- The change is truly global (e.g., root config files)
- The type already implies the area (`ci:`, `build:`, `revert:`)
- It's a trivial one-liner with obvious context

```
chore: update .gitignore
ci: fix failing lint step
revert: revert "feat(auth): add OAuth"
```
