---
name: forms
description: Forms with React Hook Form + Zod. Use this skill whenever the user is building a form, adding a form field, writing a Zod schema for a form, creating a form hook, wiring a Server Action to a form, or handling form validation. Trigger when the user creates a new form component, asks how to validate a field, wants to handle form submission, or needs to show server-side errors. Do NOT trigger for general Zod schema questions unrelated to forms.
---

# Forms — React Hook Form + Zod

**Every form in this project MUST use React Hook Form + Zod. No exceptions.**

---

## Required Stack

| Concern                 | Tool                      | Location             |
| ----------------------- | ------------------------- | -------------------- |
| Form state & submission | React Hook Form           | Custom hook          |
| Validation schema       | Zod                       | `[entity].schema.ts` |
| Schema → RHF bridge     | `@hookform/resolvers/zod` | Custom hook          |
| Error messages          | `validation-messages.ts`  | Per domain           |
| Form submission         | Server Action             | `actions.ts`         |

---

## File Structure (per form)

```
domains/[entity]/
├── [form-name].schema.ts          ← Zod schema + inferred type
├── hooks/
│   └── use-[form-name]-submit.ts  ← useForm, resolver, onSubmit
├── components/organisms/
│   └── [form-name]-form.tsx       ← purely presentational
└── actions.ts                     ← Server Action with server-side revalidation
```

---

## 1. Schema (`[form-name].schema.ts`)

```tsx
// domains/auth/login.schema.ts
import { z } from 'zod';
import { authValidationMessages } from './validation-messages';

export const loginSchema = z.object({
  email: z.string().email(authValidationMessages.email),
  password: z.string().min(8, authValidationMessages.passwordTooShort)
});

export type LoginInput = z.infer<typeof loginSchema>;
```

Rules:

- One schema per file — never mix unrelated schemas
- Export both the schema constant and the inferred `Input` type
- Error messages from `validation-messages.ts` — no hardcoded strings
- Never use `any` or bypass `.safeParse()` type narrowing

---

## 2. Hook (`use-[form-name]-submit.ts`)

```tsx
// domains/auth/hooks/use-login-submit.ts
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '../login.schema';
import { loginAction } from '../actions';

export function useLoginSubmit() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = handleSubmit(async data => {
    const result = await loginAction(data);
    if (result?.error) {
      setError('root', { message: result.error });
    }
  });

  return { register, onSubmit, errors, isSubmitting };
}
```

Rules:

- Always pass `resolver: zodResolver(schema)` to `useForm`
- Type `useForm<SchemaInput>` explicitly — never infer `any`
- Wrap submission with `handleSubmit` — never call directly
- Map server errors back via `setError('root', ...)`
- Never call Server Actions directly from a component

---

## 3. Form Component (`[form-name]-form.tsx`)

```tsx
// domains/auth/components/organisms/login-form.tsx
'use client';
import { useLoginSubmit } from '../../hooks/use-login-submit';
import { authMessages } from '../../messages';

export function LoginForm() {
  const { register, onSubmit, errors, isSubmitting } = useLoginSubmit();

  return (
    <form onSubmit={onSubmit} className="login-form">
      <div className="login-form__field">
        <label htmlFor="email">{authMessages.login.emailLabel}</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && (
          <span className="login-form__error">{errors.email.message}</span>
        )}
      </div>

      <div className="login-form__field">
        <label htmlFor="password">{authMessages.login.passwordLabel}</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && (
          <span className="login-form__error">{errors.password.message}</span>
        )}
      </div>

      {errors.root && (
        <p className="login-form__root-error">{errors.root.message}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? authMessages.login.submitting
          : authMessages.login.submit}
      </button>
    </form>
  );
}
```

Rules:

- Form component only renders — all logic lives in the hook
- Use `{...register('fieldName')}` for every input
- Always render `errors.{field}.message` beside each field
- Always handle `errors.root` for server-side errors
- Disable submit button while `isSubmitting`
- Never use `useState` to track field values — RHF owns state
- Never use `e.preventDefault()` — `handleSubmit` does it

---

## 4. Server Action (`actions.ts`)

```tsx
// domains/auth/actions.ts
'use server';
import { loginSchema, type LoginInput } from './login.schema';

export async function loginAction(input: LoginInput) {
  const validated = loginSchema.safeParse(input);
  if (!validated.success) {
    return { error: 'Invalid input' };
  }

  const { email, password } = validated.data;
  // ... business logic
}
```

Rules:

- Always revalidate on the server with `schema.safeParse()` — never trust client validation alone
- Return `{ error: string }` for errors the hook can pass to `setError('root', ...)`

---

## Multi-Step Forms

Split by step. Compose with `.merge()` for server validation.

```tsx
// step schemas stay independent
export const step1Schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1)
});
export const step2Schema = z.object({
  role: z.enum(['admin', 'member']),
  team: z.string().min(1)
});

// composed for server-side full validation
export const onboardingSchema = step1Schema.merge(step2Schema);
export type OnboardingInput = z.infer<typeof onboardingSchema>;
```

---

## Anti-Patterns

```tsx
// ❌ useState for form fields
const [email, setEmail] = useState('');

// ❌ Manual validation without Zod
if (!email.includes('@')) { setError('Invalid email'); }

// ❌ Inline schema in component
const schema = z.object({ email: z.string() }); // must be in .schema.ts

// ❌ Server Action directly in JSX for complex forms
<form action={loginAction}>

// ❌ useForm without resolver
useForm(); // validation won't run

// ❌ Hardcoded error messages in schema
z.string().email('Please enter a valid email') // must be in validation-messages.ts
```

---

## Pre-Submit Checklist

- [ ] Schema in `{name}.schema.ts` with exported type
- [ ] Validation messages in `validation-messages.ts`
- [ ] `useForm<InputType>({ resolver: zodResolver(schema) })` in the hook
- [ ] Server Action revalidates with `schema.safeParse(input)`
- [ ] `errors.root` handled for server errors
- [ ] Submit button disabled during `isSubmitting`
- [ ] All field errors rendered beside each input
