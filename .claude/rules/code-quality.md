---
paths: src/**/*.{ts,tsx}
---

# Code Quality and ESLint Conventions

This document defines the code quality standards and ESLint rules that must be followed when writing code in this project.

## TypeScript Rules

### No Unused Variables

- **Rule**: `@typescript-eslint/no-unused-vars: error`
- **Requirement**: All TypeScript variables, functions, imports, and parameters must be used. Unused code must be removed.
- **Exception**: Variables prefixed with `_` are allowed if they are intentionally unused (e.g., `_unusedParam`).

### No Explicit `any` Type

- **Rule**: `@typescript-eslint/no-explicit-any: error`
- **Requirement**: Never use the `any` type explicitly. Always use proper TypeScript types, interfaces, or `unknown` when the type is truly unknown.
- **Example**:

  ```typescript
  // ❌ Incorrect
  function processData(data: any) { ... }

  // ✅ Correct
  function processData(data: unknown) { ... }
  // or better
  function processData(data: UserData) { ... }
  ```

## Naming Conventions

### camelCase Enforcement

- **Rule**: `camelcase: error`
- **Requirement**: All variables, functions, and object properties must use camelCase naming.
- **Exceptions**: The following are allowed:
  - `api_url` (legacy API variable)
  - `Geist_Mono` (font name)

### Examples

```typescript
// ✅ Correct
const userName = 'John';
const isAuthenticated = true;
const fetchUserData = () => { ... };

// ❌ Incorrect
const user_name = 'John';
const is_authenticated = true;
const fetch_user_data = () => { ... };
```

## Console Usage

- **Rule**: `no-console: warn`
- **Requirement**: Avoid using `console.log`, `console.error`, etc. in production code.
- **Guidance**:
  - Use proper logging solutions for production
  - Console statements are acceptable during development/debugging but should be removed before committing
  - Consider using a logging utility or service instead

## React/Next.js Specific Rules

### Unescaped Entities

- **Rule**: `react/no-unescaped-entities: off`
- **Note**: This rule is disabled, so you can use apostrophes and quotes directly in JSX without escaping.

### Custom Fonts

- **Rule**: `@next/next/no-page-custom-font: off`
- **Note**: This rule is disabled, allowing custom fonts to be loaded in pages.

### Image Elements

- **Rule**: `@next/next/no-img-element: off`
- **Note**: This rule is disabled, allowing the use of standard `<img>` tags (though Next.js Image component is still recommended for optimization).

## Ignored Patterns

- **Pattern**: `./components/ui/**`
- **Note**: Files in `./components/ui/**` are ignored by ESLint. These are typically shadcn/ui components copied via CLI and may not follow all project conventions.

## Base Configurations

The project extends the following ESLint configurations:

- `next/core-web-vitals`: Next.js core web vitals rules
- `next/typescript`: Next.js TypeScript-specific rules
- `next`: Next.js general rules

## Best Practices Summary

1. **Always use proper TypeScript types** - Never use `any`
2. **Remove unused code** - Keep the codebase clean
3. **Follow camelCase naming** - Except for documented exceptions
4. **Avoid console statements** - Use proper logging instead
5. **Type safety first** - Leverage TypeScript's type system fully
