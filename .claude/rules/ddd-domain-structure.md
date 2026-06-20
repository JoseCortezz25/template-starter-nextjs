---
paths: src/domains/**/*.{ts,tsx,css}
---

# Domain-Driven Design — Internal Domain Structure

Each folder under `src/domains/` represents a **business domain**. Every domain is fully self-contained: it owns its components, hooks, stores, schemas, messages, and types. Nothing leaks in or out between domains.

---

## Anatomy of a Domain

```
src/domains/
└── auth/                           # Business domain name (kebab-case)
    ├── components/                 # Domain-specific UI (Atomic Design)
    │   ├── atoms/                  # Indivisible units: buttons, badges, inputs
    │   │   └── auth-button.tsx
    │   ├── molecules/              # Composed atoms: form fields, error banners
    │   │   └── password-field.tsx
    │   └── organisms/              # Composed molecules: full forms, panels
    │       └── login-form.tsx
    ├── hooks/                      # ALL business logic lives here
    │   ├── use-auth.ts
    │   └── use-session-check.ts
    ├── stores/                     # Zustand — UI state only
    │   └── auth.store.ts
    ├── actions.ts                  # Server Actions (mutations, data access)
    ├── auth.schema.ts              # Zod schemas (one file per entity/form)
    ├── messages.ts                 # Static UI text for this domain
    ├── validation-messages.ts      # Zod error messages for this domain
    └── types/                      # TypeScript types (one main type per file)
        ├── auth-user.types.ts
        └── login-credentials.types.ts
```

---

## Rules per Subfolder

### `components/` — Atomic Design within the Domain

Domain components follow the same Atomic Design hierarchy as global `components/`, but are **scoped to this domain only**.

**atoms/** — single-responsibility, no composition:
```tsx
// domains/auth/components/atoms/auth-button.tsx
// ✅ Receives everything via props, zero logic
export function AuthButton({ isLoading, children, ...props }: AuthButtonProps) {
  return (
    <button className={cn('auth-button', { 'auth-button--loading': isLoading })} {...props}>
      {children}
    </button>
  );
}
```

**molecules/** — compose atoms, may have minimal local state (e.g. `useState` for show/hide password):
```tsx
// domains/auth/components/molecules/password-field.tsx
'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function PasswordField({ register, error }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="password-field">
      <Input type={isVisible ? 'text' : 'password'} {...register('password')} />
      <button type="button" onClick={() => setIsVisible(v => !v)}>
        {/* toggle icon */}
      </button>
      {error && <span className="password-field__error">{error.message}</span>}
    </div>
  );
}
```

**organisms/** — full feature sections, coordinate molecules, use domain hooks:
```tsx
// domains/auth/components/organisms/login-form.tsx
'use client';
import { useLoginSubmit } from '../../hooks/use-login-submit';
import { PasswordField } from '../molecules/password-field';
import { authMessages } from '../../messages';

export function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting } = useLoginSubmit();
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <PasswordField register={register} error={errors.password} />
      <button disabled={isSubmitting}>{authMessages.login.submit}</button>
    </form>
  );
}
```

**Rules:**
- ✅ atoms → no hooks, no domain imports, pure props
- ✅ molecules → may use `useState`/`useRef`, compose atoms
- ✅ organisms → use domain hooks, compose molecules
- ❌ Components must NOT contain business logic — extract to `hooks/`
- ❌ Components must NOT import from `actions.ts` directly — go through a hook
- ❌ No `organisms/` importing from another domain

---

### `hooks/` — Business Logic

**Every piece of domain logic lives here.** Hooks are the layer between components and actions/stores.

```tsx
// domains/auth/hooks/use-login-submit.ts
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../auth.schema';
import { loginAction } from '../actions';
import { authValidationMessages } from '../validation-messages';
import type { LoginInput } from '../types/login-credentials.types';

export function useLoginSubmit() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await loginAction(data);
  });

  return {
    register: form.register,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
}
```

**Rules:**
- ✅ Named `use-{feature}.ts` in kebab-case
- ✅ One hook per business concern (not one giant `use-auth.ts` for everything)
- ✅ Hooks orchestrate: form state + actions + store + messages
- ❌ Components must NOT skip hooks and call actions directly

---

### `stores/` — Zustand (UI State Only)

Zustand stores in a domain manage **client/UI state** — never server data.

```tsx
// domains/auth/stores/auth.store.ts
import { create } from 'zustand';
import type { AuthStore } from '../types/auth-store.types';

export const useAuthStore = create<AuthStore>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
```

**Rules:**
- ✅ Named `{entity}.store.ts`
- ✅ Only UI state: open/closed panels, selected tabs, UI preferences
- ❌ Never fetch data in a store — use React Query hooks instead
- ❌ Never store backend data (user lists, records) in Zustand

---

### `actions.ts` — Server Actions

The data access and mutation layer. Combines validation + authorization + persistence.

```tsx
// domains/auth/actions.ts
'use server';
import { auth } from '@/lib/auth';
import { loginSchema } from './auth.schema';
import type { LoginInput } from './types/login-credentials.types';

export async function loginAction(input: LoginInput) {
  const validated = loginSchema.safeParse(input);
  if (!validated.success) {
    return { error: 'Invalid credentials' };
  }
  // ... persistence logic
}
```

**Rules:**
- ✅ Always `'use server'` at top
- ✅ Validate with Zod before any persistence
- ✅ Check session/authorization before mutations
- ❌ No `actions.ts` importing from another domain's `actions.ts`

---

### `messages.ts` and `validation-messages.ts` — Externalized Text

All static UI text for the domain lives here. **No hardcoded strings in components.**

```tsx
// domains/auth/messages.ts
export const authMessages = {
  login: {
    title: 'Sign in to your account',
    submit: 'Sign in',
    forgotPassword: 'Forgot your password?',
  },
  register: {
    title: 'Create an account',
    submit: 'Create account',
  },
} as const;

// domains/auth/validation-messages.ts
export const authValidationMessages = {
  email: 'Please enter a valid email address',
  passwordTooShort: 'Password must be at least 8 characters',
  passwordMismatch: 'Passwords do not match',
} as const;
```

**Rules:**
- ✅ `messages.ts` for UI labels, titles, CTAs, placeholders
- ✅ `validation-messages.ts` for Zod/form error strings
- ❌ Never hardcode strings directly in JSX or hooks

---

### `*.schema.ts` — Zod Schemas

One schema file per entity or form. Shared between client (React Hook Form) and server (actions).

```tsx
// domains/auth/auth.schema.ts
import { z } from 'zod';
import { authValidationMessages } from './validation-messages';

export const loginSchema = z.object({
  email: z.string().email(authValidationMessages.email),
  password: z.string().min(8, authValidationMessages.passwordTooShort),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

**Rules:**
- ✅ Named `{entity}.schema.ts` or `{form-name}.schema.ts`
- ✅ Export both the schema and the inferred type from the same file
- ❌ Do not put multiple unrelated schemas in one file — split by entity

---

### `types/` — TypeScript Types

One main type or closely related types per file.

```
domains/auth/types/
├── auth-user.types.ts          # User shape returned by the API
├── auth-store.types.ts         # AuthStore state + actions interface
└── login-credentials.types.ts # Form input type
```

```tsx
// domains/auth/types/auth-user.types.ts
export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
}
```

**Rules:**
- ✅ Suffix `.types.ts`, named in kebab-case
- ✅ One main type per file (exception: `AuthState + AuthActions` that together form `AuthStore`)
- ❌ No barrel `types.ts` file re-exporting everything
- ❌ No PascalCase file names

---

## Cross-Domain Isolation

Domains must NOT import from each other.

```tsx
// ❌ FORBIDDEN
// domains/users/hooks/use-user-profile.ts
import { useAuthStore } from '@/domains/auth/stores/auth.store';

// ✅ CORRECT — extract shared logic to components/ or utils/
import { useCurrentUser } from '@/components/providers/session-provider';
```

**Exception:** A domain may import a **type** from another domain if there is a documented dependency, but never a hook, store, or action.

---

## Atomic Design: Domain vs Global

| Level | Global (`src/components/`) | Domain (`src/domains/[entity]/components/`) |
|---|---|---|
| **atoms** | Generic: `Button`, `Badge`, `Input` | Domain-specific: `AuthButton`, `PlanBadge` |
| **molecules** | Generic: `SearchBar`, `FormField` | Domain-specific: `PasswordField`, `RoleSelector` |
| **organisms** | Generic: `Header`, `DataTable` | Domain-specific: `LoginForm`, `UserProfileCard` |

- If a component is **reused across 2+ domains** → move to `src/components/`
- If a component only makes sense in **one domain** → keep it in `domains/[entity]/components/`
