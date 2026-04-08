# Migration Rules

**Mandatory rules to review BEFORE each migration phase.**

---

## Pre-Flight Checklist (Review before each phase)

- [ ] Read `critical-constraints.md`
- [ ] Read `folder-structure.md` (relevant section)
- [ ] Understand which files will be created/moved
- [ ] Verify no rules are being violated

---

## File Rules

### ❌ NO Barrel Files

```typescript
// ❌ INCORRECT - DO NOT create index.ts that re-export
// src/lib/index.ts
export * from './auth';
export * from './db';

// ✅ CORRECT - Direct imports
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
```

**Single exception**: `/utils/index.ts` for common utilities.

### ❌ NO Types Barrel Files

Type files must also be specific, NOT a single file with multiple types.

```typescript
// ❌ INCORRECT - One file with multiple unrelated types
// src/domains/auth/auth.types.ts
export type Role = ...;
export type Permission = ...;
export interface User = ...;
export interface AuthStore = ...;

// ✅ CORRECT - Specific files per type
// src/domains/auth/types/role.types.ts
export type Role = 'admin' | 'editor' | 'viewer';

// src/domains/auth/types/user.types.ts
import type { Role } from './role.types';
export interface User { ... }

// Direct imports:
import type { Role } from '@/domains/auth/types/role.types';
import type { User } from '@/domains/auth/types/user.types';
```

**Rule**: Each `.types.ts` file must contain **one main type** (or very related types like `AuthState` + `AuthActions` that together form `AuthStore`).

### ✅ Kebab-case for everything

```
✅ CORRECT
src/lib/api-client.ts
src/domains/auth/types/user.types.ts
src/domains/auth/hooks/use-login-submit.ts

❌ INCORRECT
src/lib/apiClient.ts
src/domains/auth/types/User.types.ts
src/domains/auth/hooks/useLoginSubmit.ts
```

### ✅ Mandatory suffixes

| Type      | Suffix          | Example               |
| --------- | --------------- | --------------------- |
| Types     | `.types.ts`     | `user.types.ts`       |
| Schemas   | `.schema.ts`    | `login.schema.ts`     |
| Stores    | `.store.ts`     | `auth.store.ts`       |
| Services  | `.service.ts`   | `user-api.service.ts` |
| Utilities | `.util.ts`      | `format-date.util.ts` |
| Hooks     | `use-{name}.ts` | `use-auth.ts`         |

### ✅ Named exports (no default)

```typescript
// ✅ CORRECT
export function useAuth() {}
export const apiClient = {};
export type User = {};

// ❌ INCORRECT
export default function useAuth() {}
export default apiClient;
```

**Exception**: Next.js pages (`page.tsx`, `layout.tsx`).

---

## Architecture Rules

### Layers and allowed dependencies

```
L4: app/        → can import: domains/, components/, config/, lib/
L3: domains/    → can import: components/, lib/, config/, utils/
L2: components/ → can import: lib/, utils/
L1: lib/        → can import: nothing (external deps only)
L0: config/     → can import: nothing (pure config)
L0: utils/      → can import: nothing (pure functions)
```

### Isolated domains

Domains encapsulate their own components, hooks, stores, schemas, and messages. They must NOT import from each other.

```typescript
// ❌ INCORRECT - Domains cannot import from each other
// src/domains/users/...
import { something } from '@/domains/auth/...';

// ✅ CORRECT - Extract shared logic to components/, utils/, or config/
import { something } from '@/components/atoms/...';
import { something } from '@/utils/format.util';
```

---

## Code Rules

### RSC by default

```typescript
// ✅ Server Component (default)
async function Stats() {
  const data = await fetchStats();
  return <div>{data}</div>;
}

// ✅ Client Component (only when necessary)
'use client';
import { useState } from 'react';
export function InteractiveChart() {
  const [filter, setFilter] = useState('all');
}
```

### Externalized texts

```typescript
// ❌ INCORRECT
<button>Save</button>

// ✅ CORRECT
import { messages } from '@/config/messages';
<button>{messages.common.actions.save}</button>
```

### State management

| State type                      | Tool                  |
| ------------------------------- | --------------------- |
| Server state (backend data)     | React Query           |
| UI state (sidebar, theme)       | Zustand               |
| URL state (filters, pagination) | nuqs                  |
| Local state (input value)       | useState              |
| Forms                           | React Hook Form + Zod |

---

## Checklist per Phase

### Phase 1: Foundation (lib/ + config/ + utils/)

- [ ] Files in `lib/` do NOT import from other project layers
- [ ] Files in `config/` are pure constants/config with no side effects
- [ ] Files in `utils/` are pure functions with no side effects
- [ ] Names in kebab-case with correct suffixes
- [ ] No barrel files
- [ ] Named exports

### Phase 2: Design System (components/)

- [ ] Files in `components/` only import from `lib/` and `utils/`
- [ ] Atomic structure respected (atoms/, molecules/, organisms/, layout/)
- [ ] No business logic in components
- [ ] shadcn/ui components stay in `components/ui/` untouched

### Phase 3: Domains (domains/)

- [ ] Each domain is self-contained (no cross-domain imports)
- [ ] Business logic encapsulated in hooks under `domains/{domain}/hooks/`
- [ ] Zustand stores under `domains/{domain}/stores/`
- [ ] Text messages in `domains/{domain}/messages.ts`
- [ ] Zod schemas in `domains/{domain}/*.schema.ts`

### Phase 4: Routes (app/)

- [ ] Only imports from `domains/`, `components/`, `config/`, `lib/`
- [ ] Pages use Server Components by default
- [ ] Suspense boundaries for async components

---

## Common errors to avoid

1. **Creating barrel files** → Use direct imports
2. **Creating types barrel files** → Separate types into specific files
3. **PascalCase in file names** → Use kebab-case
4. **Default exports** → Use named exports
5. **Importing between domains** → Extract shared code to `components/` or `utils/`
6. **Logic in components** → Extract to hooks in `domains/{domain}/hooks/`
7. **Hardcoding texts** → Use `messages.ts` per domain or `config/messages.ts`
8. **Zustand for server state** → Use React Query
