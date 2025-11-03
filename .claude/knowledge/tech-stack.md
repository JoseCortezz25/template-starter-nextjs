# Tech Stack

**Complete technology stack with versions, commands, and development tools.**

---

## 1. Core Technologies

### Framework and Versions

| Technology     | Version   | Purpose                                              |
| -------------- | --------- | ---------------------------------------------------- |
| **Next.js**    | `15.3.1`  | React framework with hybrid rendering and App Router |
| **React**      | `19.0.0`  | Core UI library with Server Components               |
| **Node.js**    | `22.15.0` | JavaScript runtime for server                        |
| **TypeScript** | `latest`  | Typed language (JavaScript superset)                 |

### Build Tools

- **Turbopack** (included in Next.js 15): Next-generation bundler
- **SWC** (included in Next.js): Fast compiler for TypeScript/JavaScript

---

## 2. Key Dependencies

### UI Libraries and Styling

| Library                       | Version  | Purpose                                    |
| ----------------------------- | -------- | ------------------------------------------ |
| **Tailwind CSS**              | `4.1.0`  | Utility-first CSS framework                |
| **shadcn/ui**                 | `latest` | Collection of accessible React components  |
| **Radix UI**                  | `latest` | Unstyled UI primitives (shadcn foundation) |
| **class-variance-authority**  | `latest` | Component variant management               |
| **clsx** / **tailwind-merge** | `latest` | Utilities for combining CSS classes        |

```bash
# Install shadcn/ui
npx shadcn@latest init

# Add individual components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
```

---

### State Management

| Library             | Version   | Purpose                                   |
| ------------------- | --------- | ----------------------------------------- |
| **React Query**     | `^5.0.0`  | Server state management (data fetching)   |
| **Zustand**         | `5.0.5`   | Client/UI state management                |
| **React Hook Form** | `^7.53.2` | Complex form state management             |
| **nuqs**            | `latest`  | URL-based state management (query params) |

#### State Management Strategy

We follow a **decision matrix** to choose the right tool:

| State Type    | Tool            | When to Use                         |
| ------------- | --------------- | ----------------------------------- |
| **Server**    | React Query     | Data from backend (fetched, cached) |
| **Client/UI** | Zustand         | UI state, local preferences         |
| **Local**     | useState        | Component-only state                |
| **Forms**     | React Hook Form | Complex forms with validation       |

**React Query (TanStack Query) Features**:

- Automatic caching and background refetching
- Optimistic updates
- Request deduplication
- Automatic loading and error states
- Pagination and infinite scroll support
- Devtools for debugging

```tsx
// React Query example
import { useQuery, useMutation } from '@tanstack/react-query';

export function useWorkouts() {
  return useQuery({
    queryKey: ['workouts'],
    queryFn: () => workoutRepository.findAll()
  });
}
```

**Zustand Features** (for UI state only):

- No providers needed
- Minimalist API
- Compatible with React Server Components
- Atomic stores per domain
- Built-in persistence middleware

```tsx
// Zustand example (UI state only)
import { create } from 'zustand';

export const useSidebarStore = create(set => ({
  isOpen: true,
  toggle: () => set(state => ({ isOpen: !state.isOpen }))
}));
```

**React Hook Form Features**:

- Built-in validation with Zod resolver
- Minimal re-renders
- TypeScript support
- Easy field management

```tsx
// React Hook Form example
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit } = useForm({
  resolver: zodResolver(mySchema)
});
```

---

### Authentication and Authorization

| Library         | Version  | Purpose                             |
| --------------- | -------- | ----------------------------------- |
| **NextAuth.js** | `latest` | Complete authentication for Next.js |
| **@auth/core**  | `latest` | NextAuth core                       |

**Supported Providers**:

- Credentials (email/password)
- Okta (OAuth 2.0)
- Azure Active Directory (future)

**Session Strategy**: JWT (JSON Web Tokens)

---

### Validation and Schemas

| Library | Version  | Purpose                            |
| ------- | -------- | ---------------------------------- |
| **Zod** | `latest` | TypeScript-first schema validation |

```tsx
// Schema example
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
```

---

### Form Handling

| Library                 | Version   | Purpose                        |
| ----------------------- | --------- | ------------------------------ |
| **React Hook Form**     | `^7.53.2` | Complex form state management  |
| **@hookform/resolvers** | `^3.9.1`  | Zod integration for validation |

**Approach**: React Hook Form for complex forms, native hooks for simple forms

- **Complex forms**: React Hook Form with Zod validation
- **Simple forms**: React 19 built-in hooks (`useActionState`, `useFormStatus`)
- **Server Actions**: Validation and mutation logic on server

```tsx
// Complex forms with validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit, formState } = useForm({
  resolver: zodResolver(mySchema)
});

// Simple forms with Server Actions
import { useActionState, useFormStatus } from 'react';
```

---

### Routing

**Next.js App Router** (built-in)

- File-system based routing
- Nested layouts
- Route groups: `(auth)`, `(dashboard)`
- Parallel routes and intercepting routes
- Middleware for route protection

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
└── api/
    └── users/route.ts
```

---

### Data Fetching

| Library         | Version  | Purpose                               |
| --------------- | -------- | ------------------------------------- |
| **React Query** | `^5.0.0` | Client-side data fetching and caching |

**Approach**: React Query for client components, native fetch for Server Components

**Client Components** (interactive data):

- Use **React Query** (TanStack Query) for all client-side data fetching
- Automatic caching, background refetching, optimistic updates
- Built-in loading and error states

```tsx
// Client component with React Query
'use client';
import { useQuery } from '@tanstack/react-query';

export function WorkoutList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => workoutRepository.findAll()
  });
}
```

**Server Components** (initial data):

- Use native `fetch` with Next.js caching
- Server Actions for mutations
- `revalidatePath` / `revalidateTag` for cache invalidation

```tsx
// Server component with native fetch
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  return res.json();
}

// Server Action for mutations
('use server');
export async function createWorkout(data: FormData) {
  // Mutation logic
  revalidatePath('/workouts');
}
```

**Strategy**:

- **Server Components**: Initial data loading, SEO-critical content
- **Client Components with React Query**: Interactive features, real-time updates, optimistic UI

---

### Testing

| Library                   | Version  | Purpose                       |
| ------------------------- | -------- | ----------------------------- |
| **Vitest** (recommended)  | `latest` | Fast testing framework        |
| **Jest** (alternative)    | `latest` | Traditional testing framework |
| **React Testing Library** | `latest` | React component testing       |
| **Playwright**            | `latest` | E2E testing                   |

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

---

## 3. Development Tools

### Package Manager

**Recommended**: NPM or PNPM

```bash
# Node.js 22.15.0 includes npm
node -v  # v22.15.0
npm -v   # Check npm version

# Alternative: PNPM (faster)
npm install -g pnpm
pnpm -v
```

---

### Component Documentation

| Tool          | Version  | Purpose                                    |
| ------------- | -------- | ------------------------------------------ |
| **Storybook** | `8.6.14` | UI component development and documentation |

```bash
# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

**Structure**:

```
stories/
├── components/
│   ├── button.stories.tsx
│   └── card.stories.tsx
└── domains/
    └── auth/
        └── login-form.stories.tsx
```

---

### Linter and Formatter

| Tool                   | Version  | Purpose                      |
| ---------------------- | -------- | ---------------------------- |
| **ESLint**             | `latest` | JavaScript/TypeScript linter |
| **Prettier**           | `latest` | Code formatter               |
| **eslint-config-next** | `latest` | ESLint config for Next.js    |

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint:fix

# Format code
npm run format

# Check format without modifying
npm run format:check
```

**Recommended config** (`.eslintrc.json`):

```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn"
  }
}
```

---

### Pre-commit Hooks

| Tool            | Version  | Purpose                     |
| --------------- | -------- | --------------------------- |
| **Husky**       | `latest` | Git hooks manager           |
| **lint-staged** | `latest` | Run linters on staged files |

```bash
# Install husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

**Configuration** (`package.json`):

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

---

### Git and Version Control

- **Git**: Version control system
- **GitHub/GitLab/Bitbucket**: Repository platform
- **Conventional Commits**: Commit message standard

```bash
# Commit examples
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login form validation"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor: extract auth logic to domain"
```

---

## 4. Command Reference

### Installing Dependencies

```bash
# Install all dependencies
npm install
# or
pnpm install

# Install production dependency
npm install <package>

# Install dev dependency
npm install -D <package>

# Update dependencies
npm update

# Audit vulnerabilities
npm audit
npm audit fix
```

---

### Development Server

```bash
# Start dev server (http://localhost:3000)
npm run dev

# With specific port
PORT=3001 npm run dev

# With Turbopack (faster)
npm run dev --turbo
```

---

### Production Build

```bash
# Create optimized build
npm run build

# Analyze bundle size
npm run build -- --analyze

# Clean cache and build
rm -rf .next
npm run build
```

---

### Run Production Locally

```bash
# First build
npm run build

# Then start production server
npm run start
```

---

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui
```

---

### Formatting and Linting

```bash
# Run ESLint
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Format all code with Prettier
npm run format

# Check format without modifying
npm run format:check

# Run TypeScript compiler check
npm run type-check
```

---

### Storybook

```bash
# Run Storybook in dev mode
npm run storybook

# Build static Storybook
npm run build-storybook

# Serve Storybook build
npx http-server storybook-static
```

---

### Other Useful Commands

```bash
# Clean Next.js cache
rm -rf .next

# Clean node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check versions
node -v
npm -v
npx next -v

# Analyze bundle size
npm run build
npm run analyze

# Generate database schema (if using Prisma)
npx prisma generate
npx prisma migrate dev
```
