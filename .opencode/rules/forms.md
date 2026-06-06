---
paths: src/**/*.{ts,tsx}
---

# Forms — React Hook Form + Zod (Mandatory)

**All forms in this project MUST use React Hook Form with Zod validation. No exceptions.**

---

## Required Stack

| Concern | Tool | Location |
|---|---|---|
| Form state & submission | React Hook Form | Component / hook |
| Validation schema | Zod | `[entity].schema.ts` |
| Schema → RHF bridge | `@hookform/resolvers/zod` | Hook |
| Error messages | `validation-messages.ts` | Per domain |
| Form submission | Server Action | `actions.ts` |

---

## Schema File (`.schema.ts`)

Every form requires a Zod schema in its own `.schema.ts` file. One schema per file.

```tsx
// domains/auth/login.schema.ts
import { z } from 'zod';
import { authValidationMessages } from './validation-messages';

export const loginSchema = z.object({
  email: z.string().email(authValidationMessages.email),
  password: z.string().min(8, authValidationMessages.passwordTooShort),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

**Rules:**
- ✅ Named `{form-name}.schema.ts` or `{entity}.schema.ts` in kebab-case
- ✅ Export both `schema` (const) and `Input` type (inferred)
- ✅ Use validation messages from `validation-messages.ts` — no hardcoded strings
- ❌ Never put multiple unrelated schemas in one file
- ❌ Never use `any` or skip `.safeParse()` type narrowing

---

## Hook Pattern — `use-{form-name}-submit.ts`

Extract form logic to a custom hook inside `domains/[entity]/hooks/`.

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
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await loginAction(data);
    if (result?.error) {
      setError('root', { message: result.error });
    }
  });

  return { register, onSubmit, errors, isSubmitting };
}
```

**Rules:**
- ✅ Always pass `resolver: zodResolver(schema)` to `useForm`
- ✅ Type `useForm<SchemaInput>` explicitly — never infer `any`
- ✅ Use `handleSubmit` to wrap submission — never call `onSubmit` directly
- ✅ Map server errors back to fields via `setError`
- ❌ Never call Server Actions directly in a component — always go through the hook

---

## Form Component Pattern

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
        {isSubmitting ? authMessages.login.submitting : authMessages.login.submit}
      </button>
    </form>
  );
}
```

**Rules:**
- ✅ Form component only renders — all logic is in the hook
- ✅ Use `{...register('fieldName')}` for all inputs
- ✅ Always render `errors.{field}.message` beside each field
- ✅ Handle `errors.root` for server-side errors
- ✅ Disable submit button while `isSubmitting`
- ❌ Never use `useState` to track form field values — RHF owns that state
- ❌ Never use `e.preventDefault()` manually — `handleSubmit` does it

---

## Server-Side Validation (actions.ts)

Schemas are shared between client and server. Always revalidate on the server.

```tsx
// domains/auth/actions.ts
'use server';
import { loginSchema } from './login.schema';
import type { LoginInput } from './login.schema';

export async function loginAction(input: LoginInput) {
  // Always revalidate on server even if client already validated
  const validated = loginSchema.safeParse(input);
  if (!validated.success) {
    return { error: 'Invalid input' };
  }

  const { email, password } = validated.data;
  // ... auth logic
}
```

---

## Multi-Step Forms

Split the schema by step. Keep each step schema independent, compose with `.merge()` if you need the full shape.

```tsx
// domains/onboarding/onboarding-step-1.schema.ts
export const step1Schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// domains/onboarding/onboarding-step-2.schema.ts
export const step2Schema = z.object({
  role: z.enum(['admin', 'member', 'viewer']),
  team: z.string().min(1),
});

// domains/onboarding/onboarding.schema.ts (full shape for server validation)
import { step1Schema } from './onboarding-step-1.schema';
import { step2Schema } from './onboarding-step-2.schema';

export const onboardingSchema = step1Schema.merge(step2Schema);
export type OnboardingInput = z.infer<typeof onboardingSchema>;
```

---

## Anti-Patterns

```tsx
// ❌ useState for form fields
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// ❌ Manual validation without Zod
if (!email.includes('@')) { setError('Invalid email'); }

// ❌ Inline schema in component
const schema = z.object({ email: z.string() }); // should be in .schema.ts

// ❌ Calling Server Action directly from JSX
<form action={loginAction}>  // bypass hook + RHF — don't do this for complex forms

// ❌ No resolver
useForm();  // missing zodResolver — validation won't run

// ❌ Hardcoded error messages in schema
z.string().email('Please enter a valid email')  // should be in validation-messages.ts
```

---

## Checklist Before Submitting a Form

- [ ] Schema defined in `{name}.schema.ts` with exported type
- [ ] Validation messages in `validation-messages.ts` (no hardcoded strings)
- [ ] `useForm<InputType>({ resolver: zodResolver(schema) })` in the hook
- [ ] Server Action revalidates with `schema.safeParse(input)`
- [ ] `errors.root` handled for server errors
- [ ] Submit button disabled during `isSubmitting`
- [ ] All field errors rendered next to each input
