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

// In a domain hook
import { updateUserProfile } from '../actions';

export function useUpdateUserProfile() {
  // The hook owns the form orchestration and invokes the Server Action.
  return { updateUserProfile };
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
│   ├── authentication/
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

| State Type    | Tool            | When to Use                         | Example                         |
| ------------- | --------------- | ----------------------------------- | ------------------------------- |
| **Server**    | React Query     | Data from backend (fetched, cached) | User list, workouts, exercises  |
| **Client/UI** | Zustand         | UI state, local preferences         | Sidebar open, theme, filters    |
| **Local**     | useState        | Component-only state                | Form input, modal open          |
| **Forms**     | React Hook Form | Every form with Zod validation      | Login, search, multi-step forms |

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
export const useSidebarStore = create(set => ({
  isOpen: true,
  toggle: () => set(state => ({ isOpen: !state.isOpen }))
}));

// In component
function Sidebar() {
  const { isOpen, toggle } = useSidebarStore();
  // Correct: this store owns one UI capability.
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

// Layer 3: Conditional Client UI through a domain hook
('use client');
function AdminPanel() {
  const { canDeleteUsers, handleDeleteUser } = useAdminActions();

  if (!canDeleteUsers) return null;

  return <button onClick={handleDeleteUser}>Delete</button>;
}
```

---

## 9. Forms: React Hook Form + Zod for every form

❌ **NEVER**: Manage form state with `useState`, `useActionState`, or native form actions
✅ **ALWAYS**: Use React Hook Form with `zodResolver` and a dedicated Zod schema for every form

### Form pattern

Use **React Hook Form** with Zod validation for every form, regardless of its number of fields or steps. Each form keeps its schema in a dedicated `.schema.ts` file and revalidates it in its Server Action.

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

---

## 10. Styles: Tailwind + @apply for repetition

❌ **NEVER**: Long repeated class strings or arbitrary inline styles  
✅ **ALWAYS**: Use @apply in CSS files for repeated patterns, maintain mobile-first and using BEM for class names.

**Correct example**:

```css
/* styles/components/atoms/input.css */
/* ✅ Extract repeated patterns with @apply */
.input-base {
  @apply rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none;
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

---

## 12. English-only variables

❌ **NEVER**: Declare variables, parameters, constants, props, functions, hooks, types, or files in Spanish or another language
✅ **ALWAYS**: Write source-code identifiers in English, with no domain-term exception

```tsx
// Incorrect
const usuarioActual = getUser();

// Correct
const currentUser = getUser();
```

---

## 13. Segmented Zustand stores

❌ **NEVER**: Create universal, general, or catch-all stores such as `useAppStore`, `useUIStore`, `useGlobalStore`, or `useGeneralStore`
✅ **ALWAYS**: Create small stores that own one cohesive UI capability within its domain

```tsx
// Incorrect: unrelated concerns in one global store
const useAppStore = create(() => ({ isSidebarOpen: true, theme: 'light' }));

// Correct: each store owns one UI concern
const useSidebarStore = create(() => ({ isOpen: true }));
const useThemePreferenceStore = create(() => ({ theme: 'light' }));
```

---

## 14. Domain discovery and bounded scope

❌ **NEVER**: Create generic or oversized domains such as `core`, `common`, `app`, `shared`, or `management`, or start a feature when its domain is unclear
✅ **ALWAYS**: Define a narrowly scoped business capability before creating or extending `src/domains/`

Before planning or implementing a feature whose domain is not explicitly identified by the user, the agent must ask focused clarifying questions and wait for the answers. It must not continue design or implementation until it can name the business capability, its responsibilities, and its boundaries with adjacent domains.

---

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
- [ ] Names? → Verify English-only identifiers plus `is/has/should`, `handle`, and `kebab-case`
- [ ] State management? → Use correct tool: React Query (server), Zustand (UI), useState (local), React Hook Form (forms)
- [ ] Backend data? → Must use React Query for fetching/caching, never Zustand
- [ ] UI/Client state? → One segmented Zustand store per cohesive UI capability, never a universal store
- [ ] Form? → React Hook Form with `zodResolver` and one dedicated Zod schema
- [ ] Protected route? → Middleware + Server Action + Client UI validation
- [ ] Repeated styles? → Extract to @apply in appropriate CSS files and using BEM.
- [ ] Complex logic in component? → Extract to custom hook in `/domains/{domain}/hooks/`
- [ ] Domain unspecified? → Ask clarifying questions and wait before planning or implementation
