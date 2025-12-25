# Critical Constraints

**Non-negotiable rules that MUST be followed in all code.**

---

## 1. React Server Components (RSC) as architectural foundation

❌ **NEVER**: Use `"use client"` by default or without clear justification  
✅ **ALWAYS**: Start components as Server Components. Only add `"use client"` when browser interactivity, browser APIs, or local state is required

**Correct example**:

```tsx
// app/dashboard/stats.tsx
// ✅ Server Component by default - no "use client"
async function Stats() {
  const data = await fetchStats();
  return <div>{data.total}</div>;
}

// app/dashboard/interactive-chart.tsx
// ✅ Client Component only when necessary
('use client');
import { useState } from 'react';

export function InteractiveChart({ initialData }) {
  const [filter, setFilter] = useState('all');
  // Interactivity logic...
}
```

---

## 2. Server Actions for all mutations

❌ **NEVER**: Make data mutations from client components using direct fetch/axios  
✅ **ALWAYS**: Use Server Actions with explicit session and role validation

**Correct example**:

```tsx
// domains/users/actions.ts
'use server';

export async function updateUserProfile(formData: FormData) {
  // ✅ Mandatory session validation
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  // ✅ Mandatory role validation
  if (!session.user.roles.includes('admin')) {
    throw new Error('Forbidden');
  }

  // Update logic...
}

// In component
('use client');
import { updateUserProfile } from '@/domains/users/actions';

function ProfileForm() {
  return <form action={updateUserProfile}>...</form>;
}
```

---

## 3. Mandatory Suspense for async operations

❌ **NEVER**: Async components without Suspense boundary  
✅ **ALWAYS**: Wrap components that fetch data with Suspense and appropriate fallback

**Correct example**:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { Stats } from './stats';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  return (
    <div>
      {/* ✅ Mandatory Suspense for async components */}
      <Suspense fallback={<Skeleton />}>
        <Stats />
      </Suspense>
    </div>
  );
}
```

---

## 4. Named exports only (NO default exports)

❌ **NEVER**: Use `export default`  
✅ **ALWAYS**: Use named exports for better autocompletion and refactoring

**Correct example**:

```tsx
// ❌ INCORRECT
export default function Button() {}

// ✅ CORRECT
export function Button() {}

// ✅ CORRECT for pages (Next.js allows it)
// app/dashboard/page.tsx
export default function DashboardPage() {} // Exception: Next.js pages
```

---

## 5. Screaming Architecture: Domain-based organization

❌ **NEVER**: Mix business logic in /components or /lib  
✅ **ALWAYS**: Organize business logic in /domains with complete structure per feature

**Correct example**:

```
src/
├── domains/           # ✅ Business logic by domain
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── actions.ts
│   │   └── schema.ts
│   ├── users/
│   │   └── ...
│
├── components/        # ✅ Only reusable UI components
│   ├── ui/           # shadcn components
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
```

---

## 6. Strict naming conventions

❌ **NEVER**: Generic names or without semantic prefixes  
✅ **ALWAYS**: Follow specific conventions

**Mandatory rules**:

```tsx
// ✅ Boolean states: is/has/should
const isLoading = true;
const hasError = false;
const shouldRedirect = true;

// ✅ Event handlers: handle
const handleSubmit = () => {};
const handleClick = () => {};

// ✅ Directories: kebab-case
// auth-wizard/, user-profile/, data-fetching/

// ❌ NEVER
const loading = true; // Missing "is" prefix
const submit = () => {}; // Missing "handle" prefix
const AuthWizard = '/'; // Directory must be kebab-case
```

---

## 7. State Management Strategy: Right tool for the right job

❌ **NEVER**: Use Zustand for server state (backend data) or useState for complex forms  
✅ **ALWAYS**: Follow the state management decision matrix based on data type

### Decision Matrix

| State Type    | Tool            | When to Use                         | Example                        |
| ------------- | --------------- | ----------------------------------- | ------------------------------ |
| **Server**    | React Query     | Data from backend (fetched, cached) | User list, workouts, exercises |
| **Client/UI** | Zustand         | UI state, local preferences         | Sidebar open, theme, filters   |
| **Local**     | useState        | Component-only state                | Form input, modal open         |
| **Forms**     | React Hook Form | Complex forms with validation       | Multi-step forms, registration |

### ❌ WRONG: Zustand for Server State

```tsx
// DON'T DO THIS
import { create } from 'zustand';

const useWorkoutStore = create(set => ({
  workouts: [],
  loading: false,
  fetchWorkouts: async () => {
    set({ loading: true });
    const data = await api.getWorkouts();
    set({ workouts: data, loading: false });
  }
}));
```

**Why it's wrong**:

- Manual loading state management
- No automatic cache invalidation
- No optimistic updates
- Hard to handle error states
- Duplicates data across components

### ✅ CORRECT: React Query for Server State

```tsx
// DO THIS
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutRepository } from '@/domains/workouts/actions';

export function useWorkouts() {
  return useQuery({
    queryKey: ['workouts'],
    queryFn: () => workoutRepository.findAll()
  });
}

export function useCreateWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workoutRepository.create,
    onSuccess: () => {
      // ✅ Automatic cache invalidation
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    }
  });
}

// In component
function WorkoutList() {
  const { data: workouts, isLoading, error } = useWorkouts();
  const createWorkout = useCreateWorkout();

  // ✅ React Query handles loading, error, cache automatically
}
```

### ✅ CORRECT: Zustand for Client/UI State

```tsx
// DO THIS
import { create } from 'zustand';

// ✅ Only UI/client state
export const useUIStore = create(set => ({
  sidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: theme => set({ theme })
}));

// In component
function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  // ✅ Perfect for UI state
}
```

### ✅ CORRECT: useState for Local State

```tsx
// DO THIS
function SearchBar() {
  const [query, setQuery] = useState(''); // ✅ Local to this component

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

### ✅ CORRECT: React Hook Form for Complex Forms

```tsx
// DO THIS
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './schema';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  // ✅ Handles validation, errors, submission state
}
```

---

## 8. Middleware + Server Actions for route protection

❌ **NEVER**: Validate authentication only on client-side  
✅ **ALWAYS**: 3-layer validation: Middleware → Server Action → Client UI

**Correct example**:

```tsx
// middleware.ts
// ✅ Layer 1: Middleware intercepts route
export async function middleware(request) {
  const session = await auth();
  if (!session) return NextResponse.redirect('/login');

  // Validate roles
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session.user.roles.includes('admin')) {
      return NextResponse.redirect('/unauthorized');
    }
  }
}

// domains/admin/actions.ts
// ✅ Layer 2: Server Action validates again
('use server');
export async function deleteUser(id: string) {
  const session = await auth();
  if (!session?.user.roles.includes('admin')) {
    throw new Error('Unauthorized');
  }
  // ...
}

// ✅ Layer 3: Conditional Client UI
('use client');
function AdminPanel() {
  const user = useAuthStore(s => s.user);

  if (!user.roles.includes('admin')) {
    return null; // Hide sensitive UI
  }

  return <button onClick={() => deleteUser(id)}>Delete</button>;
}
```

---

## 9. Forms: React Hook Form for complex, native hooks for simple

❌ **NEVER**: Handle complex form state manually with useState  
✅ **ALWAYS**: Use React Hook Form for complex forms, useActionState for simple forms

### Complex Forms (with validation)

Use **React Hook Form** with Zod validation for complex forms with multiple fields, validation rules, or multi-step flows.

```tsx
// domains/auth/components/register-form.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schema';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async data => {
    // Submit logic with validated data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
}
```

### Simple Forms (Server Actions)

Use **useActionState** and **useFormStatus** for simple forms with basic fields and server-side validation.

```tsx
// domains/auth/actions.ts
'use server';
export async function loginAction(prevState, formData: FormData) {
  const email = formData.get('email');
  // Validation and logic...
  return { success: true, message: 'Login successful' };
}

// domains/auth/components/login-form.tsx
('use client');
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Loading...' : 'Login'}</button>;
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <SubmitButton />
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
```

---

## 10. Styles: Tailwind + @apply for repetition

❌ **NEVER**: Long repeated class strings or arbitrary inline styles  
✅ **ALWAYS**: Use @apply in CSS files for repeated patterns, maintain mobile-first and using BEM for class names.

**Correct example**:

```css
/* styles/components/atoms/input.css */
/* ✅ Extract repeated patterns with @apply */
.input-base {
  @apply rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.input-error {
  @apply input-base border-red-500 focus:ring-red-500;
}
```

```tsx
export function Input({ error }) {
  return <input className={error ? 'input-error' : 'input-base'} />;
}

// ✅ Mobile-first always
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Start with mobile (w-full), then tablets and desktop */}
</div>;
```

---

## 11. Business logic in custom hooks

❌ **NEVER**: Place business logic directly in components or duplicate logic across components  
✅ **ALWAYS**: Extract business logic to custom hooks within the corresponding domain

**Correct example**:

```tsx
// domains/workouts/hooks/use-workout-stats.ts
// ✅ Business logic encapsulated in custom hook
import { useState, useEffect } from 'react';
import { fetchWorkoutStats } from '../actions';

export function useWorkoutStats(userId: string) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setIsLoading(true);
        const data = await fetchWorkoutStats(userId);
        setStats(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, [userId]);

  return { stats, isLoading, error };
}

// domains/workouts/components/workout-dashboard.tsx
('use client');
import { useWorkoutStats } from '../hooks/use-workout-stats';

export function WorkoutDashboard({ userId }: { userId: string }) {
  // ✅ Clean component: delegates logic to custom hook
  const { stats, isLoading, error } = useWorkoutStats(userId);

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return <StatsDisplay data={stats} />;
}
```

**Incorrect example**:

```tsx
// ❌ INCORRECT: Business logic mixed in component
'use client';
import { useState, useEffect } from 'react';

export function WorkoutDashboard({ userId }: { userId: string }) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ❌ Business logic directly in component
  useEffect(() => {
    fetch(`/api/workouts/${userId}/stats`)
      .then(res => res.json())
      .then(data => {
        // ❌ Complex calculations in component
        const processed = {
          total: data.workouts.length,
          avgDuration:
            data.workouts.reduce((acc, w) => acc + w.duration, 0) /
            data.workouts.length
          // ... more logic
        };
        setStats(processed);
        setIsLoading(false);
      });
  }, [userId]);

  return <div>{stats?.total}</div>;
}
```

## Verification Checklist for Agents

Before proceeding with any task, verify:

- [ ] I have read this entire document
- [ ] I understand all critical rules
- [ ] I will follow these rules in all code I plan or review
- [ ] I will flag violations of these rules if I find them
- [ ] If any rule is unclear, I will ask for clarification before proceeding

- [ ] New component? → Check if it should be RSC (default) or needs `"use client"`
- [ ] Data mutation? → Must use Server Action with session validation
- [ ] Async fetch? → Must be wrapped in `<Suspense>`
- [ ] Exports? → Must be named exports (no default)
- [ ] Business logic? → Must be in `/domains/{domain}/` and extracted to custom hooks
- [ ] Names? → Verify conventions: `is/has/should`, `handle`, `kebab-case`
- [ ] State management? → Use correct tool: React Query (server), Zustand (UI), useState (local), React Hook Form (forms)
- [ ] Backend data? → Must use React Query for fetching/caching, never Zustand
- [ ] UI/Client state? → Atomic Zustand store in `/domains/{domain}/stores/`
- [ ] Complex form? → React Hook Form with zodResolver for validation
- [ ] Protected route? → Middleware + Server Action + Client UI validation
- [ ] Repeated styles? → Extract to @apply in appropriate CSS files and using BEM.
- [ ] Complex logic in component? → Extract to custom hook in `/domains/{domain}/hooks/`
