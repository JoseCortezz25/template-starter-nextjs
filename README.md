<div align="center">

# Next.js 15 Starter Template

![Next.js](https://img.shields.io/badge/Next.js-15.3.8-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css)

**A production-ready Next.js 15 starter template with TypeScript, Tailwind CSS v4, shadcn/ui, and modern architecture patterns.**

[Quick Start](#-quick-start) • [Features](#-features) • [Architecture](#-architecture) • [Tech Stack](#-tech-stack) • [AI-Assisted Development](#-ai-assisted-development) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Code Standards](#-code-standards)
- [Development Workflow](#-development-workflow)
- [AI-Assisted Development](#-ai-assisted-development)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## 🎯 Overview

This is a professional-grade Next.js 15 starter template designed for building scalable, maintainable web applications. It implements modern architectural patterns including **Screaming Architecture** and **Atomic Design**, with a focus on React Server Components (RSC) and Server Actions.

### Key Highlights

- ⚡ **Next.js 15** with React 19 and App Router
- 🎨 **Tailwind CSS v4** with shadcn/ui components
- 🏗️ **Screaming Architecture** - Domain-driven organization
- 🔐 **Server Actions** with authentication & authorization
- 📦 **React Query** for server state management
- 🎯 **Zustand** for UI state (not server data!)
- 📝 **TypeScript** for type safety
- 🧪 **Storybook** for component development
- ✅ **Husky & lint-staged** for code quality

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 20.11.0
- **pnpm**: 10.15.1 (recommended) or npm

### Installation

```bash
# Clone repository
git clone https://github.com/JoseCortezz25/nextjs-starter-template.git
cd nextjs-starter-template

# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Next Steps

```bash
# Start Storybook for component development
pnpm storybook

# Run tests
pnpm test

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## ✨ Features

### Core Features

- **React Server Components (RSC)** - Server-first architecture by default
- **Server Actions** - Simplified data mutations with built-in security
- **App Router** - Modern Next.js routing with layouts and nested routes
- **TypeScript** - Full type safety across the application
- **Tailwind CSS v4** - Latest utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible React components

### Developer Experience

- **Storybook** - Isolated component development and documentation
- **Vitest/Jest** - Fast and reliable testing
- **ESLint & Prettier** - Code quality and formatting
- **Husky & lint-staged** - Automated code quality checks on commits
- **Turbopack** - Next-generation bundler for faster builds
- **Path aliases** - Clean imports with `@/` prefix

### Architecture

- **Screaming Architecture** - Business-driven folder structure
- **Atomic Design** - Component hierarchy (atoms, molecules, organisms)
- **Domain-based organization** - Each feature is self-contained
- **Separation of concerns** - Clear boundaries between layers
- **Dependency management** - Unidirectional data flow

### State Management

- **React Query** - Server state (data from backend)
- **Zustand** - UI/client state (preferences, filters)
- **React Hook Form** - Complex forms with validation
- **useState** - Local component state

### Authentication & Authorization

- **NextAuth.js** - Complete authentication solution
- **Middleware protection** - Route-level security
- **Server Actions** - Request-level validation
- **Role-based access control** - Granular permissions

---

## 🏗️ Architecture

### Screaming Architecture + Atomic Design

This template follows **Screaming Architecture** proposed by Robert C. Martin, where the project structure "screams" its business purpose, not the tools it uses. Combined with **Atomic Design** for UI components, this creates a maintainable and scalable codebase.

```
src/
├── app/                    # Next.js App Router (Routing & Pages)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── (auth)/           # Route groups
│
├── domains/              # Business Logic by Domain
│   ├── auth/             # Authentication domain
│   │   ├── components/   # Auth-specific UI
│   │   ├── hooks/        # Custom hooks
│   │   ├── stores/       # Zustand stores (UI state)
│   │   ├── actions.ts    # Server Actions
│   │   ├── schema.ts     # Zod validations
│   │   └── types.ts      # TypeScript types
│   └── users/            # Users domain
│
├── components/           # Reusable UI Components
│   ├── ui/              # shadcn/ui components
│   ├── atoms/           # Atomic components
│   ├── molecules/       # Composition of atoms
│   └── organisms/       # Composition of molecules
│
├── lib/                  # Infrastructure
│   ├── auth.ts          # NextAuth config
│   ├── db.ts            # Database client
│   └── middleware.ts    # Shared middleware
│
├── utils/               # Pure Functions
│   ├── format-date.ts
│   ├── validate-email.ts
│   └── class-names.ts
│
├── config/              # Global Configuration
│   ├── site.ts         # Metadata, SEO
│   └── messages.ts     # UI text strings
│
└── styles/              # CSS Styles
    ├── main.css        # Global styles
    └── components/     # Component styles
```

### Layer Dependency Rules

```
┌─────────────────────────────────┐
│         APP (Next.js)           │ → Can import: domains, components, lib
├─────────────────────────────────┤
│         DOMAINS (Business)      │ → Can import: components, lib, utils
├─────────────────────────────────┤
│       COMPONENTS (UI)          │ → Can import: other components, lib, utils
├─────────────────────────────────┤
│         LIB (Infrastructure)    │ → Can import: utils
├─────────────────────────────────┤
│         UTILS (Pure Functions)  │ → Cannot import anything
└─────────────────────────────────┘
```

**Key Rule**: Dependencies point inward. Lower layers don't know about upper layers.

---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 15.3.8 | React framework with hybrid rendering |
| **React** | 19.1.1 | Core UI library with Server Components |
| **TypeScript** | 5.0 | Type-safe JavaScript |

### UI & Styling

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | v4.1.12 | Utility-first CSS framework |
| **shadcn/ui** | latest | Accessible React components |
| **Radix UI** | latest | Unstyled UI primitives |
| **Lucide React** | 0.503.0 | Icon library |

### State Management

| Technology | Purpose | When to Use |
|-----------|---------|-------------|
| **React Query** | Server state (data from backend) | Fetched, cached data |
| **Zustand** | UI/client state | Preferences, filters |
| **React Hook Form** | Complex forms | Multi-step forms, validation |
| **useState** | Local component state | Component-only data |

### Validation & Forms

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Zod** | latest | TypeScript-first schema validation |
| **React Hook Form** | latest | Form state management |

### Testing

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Vitest** | 3.1.3 | Fast testing framework |
| **Jest** | 29.7.0 | Alternative testing framework |
| **React Testing Library** | latest | React component testing |
| **Playwright** | latest | E2E testing |

### Development Tools

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Storybook** | 8.6.14 | Component development & documentation |
| **ESLint** | 9 | Code linting |
| **Prettier** | 3.5.3 | Code formatting |
| **Husky** | 9.1.7 | Git hooks |
| **lint-staged** | 15.5.2 | Run linters on staged files |
| **Turbopack** | built-in | Next-gen bundler |

### Package Manager

- **pnpm**: 10.15.1 (recommended)
- Alternative: npm

---

## 📁 Project Structure

### Directory Structure

```
nextjs-starter-template/
├── .claude/                  # AI assistant configuration
│   ├── agents/              # Specialized agents for tasks
│   ├── knowledge/           # Documentation
│   ├── plans/               # Implementation plans
│   ├── reports/             # Generated reports
│   └── tasks/               # Session logs
│
├── .husky/                  # Git hooks
│   ├── pre-commit          # Pre-commit hook
│   └── commit-msg          # Commit message validation
│
├── .storybook/             # Storybook configuration
│   ├── main.ts
│   └── preview.tsx
│
├── public/                 # Static assets
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   │
│   ├── components/          # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── select.tsx
│   │   ├── atoms/         # Atomic components
│   │   │   └── button.tsx
│   │   └── molecules/     # Composition of atoms
│   │       └── input.tsx
│   │
│   ├── lib/               # Infrastructure
│   │   └── utils.ts      # Utility functions
│   │
│   ├── stories/          # Storybook stories
│   │   ├── button.stories.tsx
│   │   ├── input.stories.ts
│   │   └── ...
│   │
│   └── styles/           # Global styles
│       └── main.css
│
├── .gitignore
├── .mcp.json
├── .prettierrc.json
├── CLAUDE.md             # AI assistant context
├── components.json       # shadcn/ui configuration
├── commitlint.config.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

### File Naming Conventions

**Components**: `kebab-case.tsx` (e.g., `user-profile.tsx`, `login-form.tsx`)
- ✅ `button.tsx`
- ❌ `Button.tsx`
- ❌ `userProfile.tsx`

**Hooks**: `use-{name}.ts` (e.g., `use-auth.ts`, `use-user-profile.ts`)
- ✅ `use-auth.ts`
- ❌ `useAuth.ts`

**Server Actions**: `actions.ts` or `{name}-actions.ts`
- ✅ `actions.ts`
- ❌ `authActions.ts`

**Stores**: `{name}-store.ts`
- ✅ `auth-store.ts`
- ❌ `authStore.ts`

**Schemas**: `schema.ts` or `{name}-schema.ts`
- ✅ `schema.ts`
- ❌ `authSchema.ts`

**Tests**: `{name}.test.ts` or `{name}.spec.ts`
- ✅ `button.test.tsx`
- ❌ `buttonTest.tsx`

---

## 🔨 Available Scripts

### Development

```bash
# Start development server with Turbopack (recommended)
pnpm dev

# Start development server with webpack
pnpm dev -- --no-turbopack

# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

### Building

```bash
# Create production build
pnpm build

# Preview production build
pnpm start

# Build and preview
pnpm preview
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e
```

### Code Quality

```bash
# Run ESLint
pnpm lint

# Auto-fix ESLint issues
pnpm eslint:format

# Format code with Prettier
pnpm prettier:format

# Run both lint and format
pnpm lint:format
```

### Git Hooks

```bash
# Install Husky hooks
pnpm prepare

# Manually run pre-commit hook
npx husky run pre-commit

# Manually run commit-msg hook
npx husky run commit-msg
```

---

## 📏 Code Standards

### Critical Rules

1. **React Server Components First**
   - ✅ Start as Server Components (no `"use client"`)
   - ❌ Don't add `"use client"` by default

2. **Server Actions for Mutations**
   - ✅ Use Server Actions with session validation
   - ❌ Don't mutate data from client components with fetch/axios

3. **Named Exports Only**
   - ✅ `export function Component() {}`
   - ❌ `export default function Component() {}` (except pages)

4. **Domain-based Organization**
   - ✅ Organize by feature/domain in `/domains/`
   - ❌ Don't mix business logic in `/components/`

5. **State Management Decision Matrix**
   - ✅ Server data → React Query
   - ✅ UI state → Zustand
   - ✅ Forms → React Hook Form
   - ✅ Local state → useState

6. **Naming Conventions**
   - ✅ Boolean: `isLoading`, `hasError`, `shouldRedirect`
   - ✅ Handlers: `handleSubmit`, `handleClick`
   - ✅ Files: `kebab-case`

### Import Ordering

```tsx
// 1. React and framework imports
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

// 2. External library imports
import { z } from 'zod';

// 3. Global UI component imports
import { Button } from '@/components/ui/button';

// 4. Other domain imports
import { useAuth } from '@/domains/auth/hooks/use-auth';

// 5. Current domain imports
import { updateUserProfile } from '@/domains/users/actions';

// 6. Utils and lib imports
import { formatDate } from '@/utils/format-date';

// 7. Type imports
import type { User } from '@/domains/users/types';

// 8. Style imports
import '@/styles/domains/users/user-profile.css';
```

### Absolute Imports

Always use absolute imports with `@/` alias:

```tsx
// ✅ CORRECT
import { Button } from '@/components/ui/button';
import { useAuth } from '@/domains/auth/hooks/use-auth';

// ❌ INCORRECT
import { Button } from '../../../../components/ui/button';
import { useAuth } from '../../../auth/hooks/use-auth';
```

---

## 🔄 Development Workflow

### 1. Feature Development

```bash
# Create a new feature branch
git checkout -b feature/your-feature

# Start development server
pnpm dev

# Work on your feature...

# Run tests
pnpm test

# Run lint
pnpm lint

# Commit changes
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

### 2. Component Development with Storybook

```bash
# Start Storybook in parallel
pnpm storybook

# Create component story
# src/components/ui/button.stories.tsx

# View component in isolation
# http://localhost:6006
```

### 3. Adding shadcn/ui Components

```bash
# Initialize shadcn/ui (if not already)
npx shadcn@latest init

# Add a component
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog

# Components are added to:
# - src/components/ui/{component}.tsx
# - src/stories/{component}.stories.tsx
```

### 4. Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve login form validation error
docs: update README with setup instructions
refactor: extract auth logic to domain
style: format code with prettier
test: add unit tests for user service
chore: update dependencies
```

### 5. Pre-commit Hooks

Before each commit:
1. **Husky** triggers the pre-commit hook
2. **lint-staged** runs on changed files
3. **Prettier** formats the code
4. **ESLint** checks for errors
5. If everything passes, the commit proceeds

---

## 🤖 AI-Assisted Development

This project includes a complete setup for coding with AI assistance using **OpenCode** or **Claude Code**. The configuration provides project context, MCPs (Model Context Protocol), specialized skills, and custom commands to maximize productivity with AI tools.

### Available MCPs (4)

| MCP | Functionality |
|-----|---------------|
| **shadcn** | Components, registries, and examples for shadcn/ui. Component search, usage examples, and commands to add components to the project. |
| **playwright** | Browser automation and E2E testing. Page navigation, interaction, snapshot capture, and test flow execution. |
| **chrome-devtools** | Page inspection, accessibility snapshots, performance analysis, and integrated DevTools. |
| **Figma Desktop** | Design context from Figma, screenshots, design variables, and code generation from designs. Requires Figma Desktop app to be open. |

**Configuration**: MCPs are defined in `.mcp.json` (Claude Code) and `opencode.json` (OpenCode). Enable only the ones you need for each task.

### Available Skills (5)

| Skill | Functionality |
|-------|---------------|
| **frontend-design** | Distinctive frontend designs, typography, color palettes, atmospheric backgrounds, and well-orchestrated motion. Avoids generic aesthetics. |
| **react-19** | React 19 patterns with React Compiler. No manual useMemo/useCallback needed. |
| **typescript** | Strict TypeScript patterns, types, interfaces, and generics. |
| **tailwind-4** | Tailwind CSS v4 patterns, `cn()`, theme variables. Do not use `var()` in className. |
| **zod-4** | Zod v4 schema validation and breaking changes from v3. |

**Location**: `.claude/skills/` (Claude) and `.opencode/skills/` (OpenCode). Skills are loaded automatically based on editing context.

### Available Commands

| Command | Description |
|---------|-------------|
| **ui-to-json** | Generates structured JSON prompts for Vibe Coding (V0, etc.) from wireframes or interface descriptions. Includes sections for context, objective, constraints, aesthetics, and output format. |

**Location**: `.claude/commands/` (Claude Code) and `.opencode/commands/` (OpenCode).

### AI Documentation

- **[CLAUDE.md](./CLAUDE.md)** — Project context for Claude Code
- **[AGENTS.md](./AGENTS.md)** — Project context for OpenCode
- **[Critical Constraints](./.claude/knowledge/critical-constraints.md)** — Non-negotiable architectural rules

---

## 📚 Documentation

### Internal Documentation

The project includes extensive documentation for AI assistants and developers:

- **[CLAUDE.md](./CLAUDE.md)** - Project context and workflow for AI agents
- **[Critical Constraints](./.claude/knowledge/critical-constraints.md)** - Non-negotiable architectural rules
- **[Architecture Patterns](./.claude/knowledge/architecture-patterns.md)** - Complete architecture definition
- **[File Structure](./.claude/knowledge/file-structure.md)** - Naming conventions and organization
- **[Tech Stack](./.claude/knowledge/tech-stack.md)** - Technology details and commands

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the code standards listed above
- Add tests for new features
- Update documentation when needed
- Ensure all tests pass before submitting PR
- Follow existing code style

---

## 👨‍💻 Author

**Jose Cortez**

- GitHub: [@JoseCortezz25](https://github.com/JoseCortezz25)

---

<div align="center">

**Built with ❤️ using Next.js 15, React 19, and modern web technologies**

[⬆ Back to Top](#nextjs-15-starter-template)

</div>
