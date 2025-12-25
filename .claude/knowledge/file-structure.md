# File Structure Conventions

**Strict rules for file names, directory organization, and import patterns.**

---

## 1. File Naming Conventions

### Components

**Rule**: `kebab-case.tsx` for all components

```
✅ CORRECT:
components/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   └── dialog.tsx
├── atoms/
│   ├── icon-button.tsx
│   └── text-field.tsx
├── molecules/
│   ├── search-bar.tsx
│   └── user-avatar.tsx
└── organisms/
    ├── navigation-menu.tsx
    └── data-table.tsx

❌ INCORRECT:
- Button.tsx          # PascalCase not allowed
- iconButton.tsx      # camelCase not allowed
- icon_button.tsx     # snake_case not allowed
```

**Domain components**:

```
domains/
├── auth/
│   └── components/
│       ├── atoms/
│       │   └── auth-button.tsx       # Optional domain prefix
│       └── molecules/
│           └── login-form.tsx        # Descriptive purpose name
└── users/
    └── components/
        └── organisms/
            └── user-profile-card.tsx
```

---

### Pages (Next.js App Router)

**Rule**: Follow Next.js conventions - always `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

```
✅ CORRECT:
app/
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout
├── loading.tsx                 # Root loading
├── error.tsx                   # Root error
├── dashboard/
│   ├── page.tsx               # /dashboard
│   ├── layout.tsx             # Dashboard layout
│   ├── loading.tsx            # Dashboard loading
│   └── settings/
│       └── page.tsx           # /dashboard/settings
└── api/
    └── users/
        └── route.ts           # API route handler

❌ INCORRECT:
- Dashboard.tsx        # Don't use custom names for pages
- dashboard-page.tsx   # Next.js requires page.tsx
- index.tsx           # Next.js 13+ uses page.tsx
```

---

### Hooks

**Rule**: `use-{name}.ts` in kebab-case, always prefix with `use`

```
✅ CORRECT:
domains/auth/hooks/
├── use-auth.ts                 # Authentication hook
├── use-login.ts                # Specific login hook
└── use-session-check.ts        # Session verification hook

domains/users/hooks/
├── use-user-profile.ts
├── use-user-permissions.ts
└── use-debounced-search.ts

❌ INCORRECT:
- auth.ts                # Missing "use" prefix
- useAuth.ts             # camelCase not allowed
- use_auth.ts            # snake_case not allowed
- authHook.ts            # "Hook" suffix redundant
```

---

### Server Actions

**Rule**: `actions.ts` in each domain (single file) or `{name}-actions.ts` if separation needed

```
✅ CORRECT:
domains/auth/
├── actions.ts                  # All auth actions
└── schema.ts                   # Validation schemas

# If domain is very large:
domains/users/
├── user-actions.ts             # User CRUD
├── user-permission-actions.ts  # Permission actions
└── user-export-actions.ts      # Export actions

❌ INCORRECT:
- authActions.ts         # camelCase not allowed
- auth_actions.ts        # snake_case not allowed
- Actions.ts             # Too generic
- updateUser.ts          # Each action in separate file (not scalable)
```

---

### Stores (Zustand)

**Rule**: `{name}-store.ts` in kebab-case, always suffix with `-store`

```
✅ CORRECT:
domains/auth/stores/
└── auth-store.ts               # export const useAuthStore

domains/users/stores/
├── user-store.ts               # User state
└── user-filters-store.ts       # Filters state

❌ INCORRECT:
- authStore.ts           # camelCase not allowed
- auth.ts                # Missing "-store" suffix
- useAuthStore.ts        # Don't use "use" in file name
- store.ts               # Too generic
```

---

### Schemas and Validations (Zod/Yup)

**Rule**: `schema.ts` or `{name}-schema.ts` in kebab-case

```
✅ CORRECT:
domains/auth/
├── schema.ts                   # All auth schemas
└── validation.ts               # Custom validations

# If many schemas:
domains/users/
├── user-schema.ts
├── user-profile-schema.ts
└── user-settings-schema.ts

❌ INCORRECT:
- authSchema.ts          # camelCase not allowed
- schemas.ts             # Plural confusing
- validations.ts         # Plural confusing
```

---

### Utilities

**Rule**: `{name}.ts` in kebab-case, descriptive names of main function

```
✅ CORRECT:
utils/
├── format-date.ts              # export function formatDate()
├── validate-email.ts           # export function validateEmail()
├── debounce.ts                 # export function debounce()
└── class-names.ts              # export function cn()

❌ INCORRECT:
- formatDate.ts          # camelCase not allowed
- dateUtils.ts           # "Utils" suffix redundant
- helpers.ts             # Too generic
- utils.ts               # Too generic
```

---

### Types

**Rule**: `types.ts` or `{name}.types.ts` in kebab-case

```
✅ CORRECT:
domains/auth/
└── types.ts                    # All auth types

# If many types:
domains/users/
├── user.types.ts
├── user-profile.types.ts
└── user-permissions.types.ts

# Global types:
lib/
└── types.ts                    # Shared types

❌ INCORRECT:
- authTypes.ts           # camelCase not allowed
- auth.d.ts              # Use .types.ts instead of .d.ts for local types
- interfaces.ts          # Use "types" instead
```

---

### Styles (CSS)

**Rule**: Same name as component or category, with `.css` extension

```
✅ CORRECT:
styles/
├── main.css                    # Global styles
├── components/
│   ├── atoms/
│   │   ├── button.css         # Matches button.tsx
│   │   └── input.css          # Matches input.tsx
│   └── molecules/
│       └── search-bar.css
└── domains/
    └── auth/
        └── login-form.css

❌ INCORRECT:
- Button.css             # PascalCase not allowed
- buttonStyles.css       # Redundant suffix
- button-component.css   # Redundant suffix
```

---

### Tests

**Rule**: `{name}.test.ts` or `{name}.spec.ts` in kebab-case, same name as tested file

```
✅ CORRECT:
components/ui/
├── button.tsx
└── button.test.tsx             # Test next to component

# Or in __tests__ folder:
domains/auth/
├── actions.ts
└── __tests__/
    └── actions.test.ts

utils/
├── format-date.ts
└── format-date.test.ts

❌ INCORRECT:
- buttonTest.tsx         # camelCase not allowed
- button.spec.js         # Use .ts or .tsx
- test-button.tsx        # Prefix not recommended
- Button.test.tsx        # PascalCase not allowed
```

---

### Configuration

**Rule**: `kebab-case.config.ts` or tool-specific names

```
✅ CORRECT:
/
├── next.config.js              # Required by Next.js
├── tailwind.config.ts          # Required by Tailwind
├── tsconfig.json               # Required by TypeScript
└── .storybook/
    ├── main.ts                 # Required by Storybook
    └── preview.ts

❌ INCORRECT:
- nextConfig.js          # camelCase not allowed (unless tool requires it)
- config.ts              # Too generic
```

---

## 2. Directory Structure

### Strategy: Screaming Architecture + Atomic Design

**Principle**: Structure should scream the project's purpose, not the tools it uses.

```
src/
├── app/                        # [Next.js] Routes and pages
│   ├── (auth)/                # Route groups
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── loading.tsx
│   └── api/                   # API Routes
│       └── users/
│           └── route.ts
│
├── domains/                    # [BUSINESS] Logic by domain
│   ├── auth/
│   │   ├── components/        # Auth-specific components
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   ├── hooks/            # Auth hooks
│   │   ├── stores/           # Auth state (Zustand)
│   │   ├── actions.ts        # Auth Server Actions
│   │   ├── schema.ts         # Auth validations
│   │   └── types.ts          # Auth types
│   │
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── actions.ts
│   │   ├── schema.ts
│   │   └── types.ts
│   │
│   └── projects/             # Another domain
│       └── ...
│
├── components/                 # [UI] Global reusable components
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── dialog.tsx
│   ├── atoms/                # Atomic components
│   │   ├── icon-button.tsx
│   │   └── logo.tsx
│   ├── molecules/            # Composition of atoms
│   │   ├── search-bar.tsx
│   │   └── form-field.tsx
│   ├── organisms/            # Composition of molecules
│   │   ├── header.tsx
│   │   └── data-table.tsx
│   └── layout/               # Shared layouts
│       ├── main-layout.tsx
│       ├── sidebar.tsx
│       └── footer.tsx
│
├── lib/                        # [INFRA] Infrastructure logic
│   ├── auth.ts                # NextAuth configuration
│   ├── db.ts                  # Database client
│   └── middleware.ts          # Shared middlewares
│
├── config/                     # [CONFIG] Global configurations
│   ├── site.ts                # Metadata, SEO, titles
│   └── messages.ts            # Hardcoded UI text
│
├── styles/                     # [STYLES] CSS styles
│   ├── main.css               # Global styles, reset, Tailwind
│   ├── components/            # Global component styles
│   │   ├── atoms/
│   │   │   ├── button.css
│   │   │   └── input.css
│   │   ├── molecules/
│   │   └── organisms/
│   ├── domains/               # Domain-specific styles
│   │   ├── auth/
│   │   │   └── login-form.css
│   │   └── users/
│   └── utils/                 # CSS mixins, helpers
│       ├── media.css
│       └── animations.css
│
├── utils/                      # [UTILS] Pure shared functions
│   ├── format-date.ts
│   ├── validate-email.ts
│   ├── debounce.ts
│   └── class-names.ts
│
└── stories/                    # [STORYBOOK] Component documentation
    ├── components/
    │   ├── button.stories.tsx
    │   └── card.stories.tsx
    └── domains/
        └── auth/
            └── login-form.stories.tsx
```

---

### Location Rules

#### Where does each file type go?

| File type                     | Location                        | Example                                             |
| ----------------------------- | ------------------------------- | --------------------------------------------------- |
| **Reusable UI component**     | `/components/{atomic-level}/`   | `/components/atoms/button.tsx`                      |
| **Domain-specific component** | `/domains/{domain}/components/` | `/domains/auth/components/molecules/login-form.tsx` |
| **Reusable hook**             | `/utils/` or create `/hooks/`   | `/utils/use-media-query.ts`                         |
| **Domain hook**               | `/domains/{domain}/hooks/`      | `/domains/auth/hooks/use-auth.ts`                   |
| **Server Action**             | `/domains/{domain}/actions.ts`  | `/domains/users/actions.ts`                         |
| **Store (Zustand)**           | `/domains/{domain}/stores/`     | `/domains/auth/stores/auth-store.ts`                |
| **Validation schema**         | `/domains/{domain}/schema.ts`   | `/domains/auth/schema.ts`                           |
| **Domain types**              | `/domains/{domain}/types.ts`    | `/domains/users/types.ts`                           |
| **Global types**              | `/lib/types.ts`                 | `/lib/types.ts`                                     |
| **Pure utility**              | `/utils/`                       | `/utils/format-date.ts`                             |
| **Configuration**             | `/config/` or `/lib/`           | `/lib/auth.ts`                                      |
| **Global styles**             | `/styles/components/`           | `/styles/components/atoms/button.css`               |
| **Domain styles**             | `/styles/domains/{domain}/`     | `/styles/domains/auth/login-form.css`               |
| **Tests**                     | Next to file or `__tests__/`    | `/components/ui/button.test.tsx`                    |
| **Stories**                   | `/stories/` mirroring structure | `/stories/components/button.stories.tsx`            |

---

### Grouping Strategy: By Feature (Domain) first

✅ **CORRECT - Group by domain**:

```
domains/auth/
├── components/
│   └── molecules/
│       └── login-form.tsx
├── hooks/
│   └── use-auth.ts
├── stores/
│   └── auth-store.ts
├── actions.ts
├── schema.ts
└── types.ts
```

❌ **INCORRECT - Group by type**:

```
components/
├── LoginForm.tsx
└── RegisterForm.tsx
hooks/
├── useAuth.ts
└── useUser.ts
stores/
├── authStore.ts
└── userStore.ts
# Hard to find everything related to "auth"
```

---

## 3. Import Patterns

### Absolute vs Relative Imports

**Rule**: ALWAYS use absolute imports with `@/` alias

```tsx
// tsconfig.json configuration:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

✅ **CORRECT - Absolute imports**:

```tsx
// domains/users/components/organisms/user-profile.tsx
import { Button } from '@/components/ui/button';
import { useAuth } from '@/domains/auth/hooks/use-auth';
import { updateUser } from '@/domains/users/actions';
import { formatDate } from '@/utils/format-date';
```

❌ **INCORRECT - Relative imports**:

```tsx
import { Button } from '../../../../components/ui/button';
import { useAuth } from '../../../auth/hooks/use-auth';
import { updateUser } from '../../actions';
// Hard to maintain and refactor
```

**Only exception**: Imports within same directory

```tsx
// domains/auth/components/molecules/login-form.tsx
import { AuthButton } from '../atoms/auth-button'; // ✅ OK: same domain
import { loginAction } from '../../actions'; // ✅ OK: same domain
```

---

### Import Ordering

**Rule**: Order imports in the following order with blank line between groups

```tsx
// 1. React and framework imports
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

// 2. External library imports
import { z } from 'zod';
import { create } from 'zustand';

// 3. Global UI component imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// 4. Other domain imports
import { useAuth } from '@/domains/auth/hooks/use-auth';

// 5. Current domain imports
import { updateUserProfile } from '@/domains/users/actions';
import { useUserStore } from '@/domains/users/stores/user-store';

// 6. Utils and lib imports
import { formatDate } from '@/utils/format-date';
import { cn } from '@/lib/class-names';

// 7. Type imports
import type { User } from '@/domains/users/types';

// 8. Style imports
import '@/styles/domains/users/user-profile.css';
```

**Within each group**: Sort alphabetically

---

### Barrel Files (index.ts) - AVOID

❌ **NEVER use barrel files for re-exports**:

```tsx
// ❌ components/ui/index.ts - DON'T DO THIS
export { Button } from './button';
export { Input } from './input';
export { Dialog } from './dialog';
// Problems: tree-shaking, circular dependencies, complexity
```

✅ **ALWAYS import directly**:

```tsx
// ✅ Direct import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
```

**Only allowed exception**: `page.tsx`, `layout.tsx`, `route.ts` in Next.js (required by framework)

---

### Type Imports

**Rule**: Use `type` keyword for type imports (TypeScript 3.8+)

```tsx
✅ CORRECT:
import type { User } from '@/domains/users/types';
import type { ReactNode } from 'react';

// For multiple mixed imports:
import { useAuth } from '@/domains/auth/hooks/use-auth';
import type { AuthUser } from '@/domains/auth/types';

❌ INCORRECT:
import { User } from '@/domains/users/types';  // Without "type"
import { type User, type Profile } from '@/domains/users/types';  // Inline type
```

---

### Dynamic Imports

**Rule**: Use for code-splitting only when necessary

```tsx
✅ CORRECT - For heavy components:
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(
  () => import('@/components/organisms/heavy-chart'),
  {
    loading: () => <Skeleton />,
    ssr: false  // If SSR not needed
  }
);

❌ INCORRECT - For lightweight components:
const Button = dynamic(() => import('@/components/ui/button'));
// Makes no sense for small components
```
