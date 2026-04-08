---
paths: src/**/*.{ts,tsx}
---

# Naming Conventions

Standardized nomenclature is fundamental to maintaining architectural consistency within the application. This document establishes the mandatory conventions that must be followed in all files, components, functions, and data structures.

## Files and Directories

### Directories

We use **kebab-case** (lowercase with hyphens) for all directories without exception. This convention guarantees compatibility between case-sensitive and case-insensitive operating systems, avoids conflicts in Git repositories, and facilitates command-line navigation.

- **Valid**: `client-selection/`, `auth-wizard/`, `extraction-panel/`, `color-palette/`
- **Incorrect**: `ClientSelection/`, `auth_wizard/`, `extractionPanel/`

### React Component Files

Files that export a React component as their main entity must be named using **kebab-case.tsx** (lowercase with hyphens). This ensures consistency with the directory structure and other file types.

- **Valid**: `login-form.tsx`, `client-selector.tsx`, `color-palette-preview.tsx`
- **Incorrect**: `LoginForm.tsx`, `ClientSelector.tsx`, `clientSelector.tsx`

### Hook Files

Custom hooks must always start with the `use-` prefix followed by the functionality description in **kebab-case**. This makes them easily identifiable in the file structure.

- **Valid**: `use-auth.ts`, `use-extraction.ts`, `use-client-selection.ts`
- **Incorrect**: `useAuth.ts` (avoid camelCase in filenames), `auth-hook.ts` (missing prefix)

### Store Files (Zustand)

Zustand stores must include the `.store` suffix before the extension to clearly indicate their purpose as state managers.

- **Valid**: `auth.store.ts`, `extraction.store.ts`, `ui-state.store.ts`
- **Incorrect**: `authStore.ts`, `store-auth.ts`

### Schema Files (Zod)

Validation schemas using Zod must include the `.schema` suffix. This separates validation logic from types and other utilities.

If a schema file becomes too large or handles multiple distinct entities, it is highly recommended to split it into smaller, more focused files following this convention (e.g., separating `auth.schema.ts` into `login.schema.ts` and `register.schema.ts`).

- **Valid**: `login.schema.ts`, `extraction-config.schema.ts`, `client.schema.ts`
- **Incorrect**: `loginSchema.ts`, `extraction-validation.ts`

### Type Files

Files dedicated exclusively to TypeScript definitions should use the `.types.ts` suffix. Avoid generic names like `types.ts` unless strictly necessary for a very small scope.

- **Valid**: `auth.types.ts`, `extraction.types.ts`, `canvas.types.ts`
- **Incorrect**: `types.ts`, `authTypes.ts`

### Service Files

Services that encapsulate business logic or external API interactions must use the `.service.ts` suffix.

- **Valid**: `color.service.ts`, `user-api.service.ts`
- **Incorrect**: `colorService.ts`, `service-color.ts`

### Utility Files

Pure auxiliary functions without side effects should be placed in files with the `.util.ts` suffix.

- **Valid**: `color.util.ts`, `serialization.util.ts`, `format.util.ts`
- **Incorrect**: `colorUtils.ts`, `utils-color.ts`

## Variables and Constants

### Boolean State Variables

All boolean variables must use semantic prefixes that indicate their nature: `is`, `has`, `should`, or `can`.

- **is**: Current state or condition (e.g., `isLoading`, `isAuthenticated`, `isVisible`).
- **has**: Possession or existence (e.g., `hasError`, `hasSelection`, `hasChildren`).
- **should**: Intention or requirement (e.g., `shouldRedirect`, `shouldRefetch`).
- **can**: Capability or permission (e.g., `canExtract`, `canSubmit`, `canEdit`).

**Incorrect examples**: `loading` (missing prefix), `error` (missing prefix), `redirect` (ambiguous).

### Non-Boolean State Variables

Variables storing data, references, or non-boolean values should use descriptive **camelCase** without prefixes.

- **Valid**: `selectedClient`, `extractedColors`, `currentUser`, `tokenExpirationTime`.
- **Incorrect**: `SelectedClient` (PascalCase), `extracted_colors` (snake_case).

### Global Constants

Immutable values defined in constant files or as enums must use **SCREAMING_SNAKE_CASE**.

- **Valid**: `API_BASE_URL`, `MAX_EXTRACTION_NODES`, `DEFAULT_TIMEOUT_MS`.
- **Incorrect**: `apiBaseUrl`, `maxExtractionNodes`.

## Functions and Methods

### Event Handlers

Functions responding to user or system events must use the `handle` prefix followed by the action.

- **Valid**: `handleLogin`, `handleClientSelection`, `handleFormSubmit`.
- **Incorrect**: `onLogin` (incorrect prefix for implementation), `login` (missing prefix).

**Note**: In component prop definitions, use the `on` prefix (e.g., `onClick`, `onSubmit`), but the implementation function passed to it should use `handle`.

### Fetch/Request Functions

Functions obtaining data from APIs or external services should use `fetch`, `get`, or `load` followed by the resource name.

- **Valid**: `fetchClients`, `getAuthToken`, `loadUserProfile`.
- **Incorrect**: `clients` (noun instead of verb), `retrieveClients` (less standard).

### Transformation Functions

Pure functions that transform or process data without side effects should use a **Verb + Object** structure.

- **Valid**: `parseFrameworkData`, `transformDataToComponent`, `formatColorToHex`.
- **Incorrect**: `frameworkParser` (noun), `hexFormat` (ambiguous).

### Async Functions

For operations that clearly imply I/O or waiting, you may include `Async` in the name if it improves clarity, though it is not strictly required if the context is obvious.

- **Valid**: `fetchClientsAsync`, `loadDataAsync`.

## React Components

### Component Names

All React components must use descriptive **PascalCase** in both definition and export.

- **Valid**: `export function LoginForm() { ... }`
- **Incorrect**: `export function loginForm() { ... }`, `export default function LoginForm() { ... }` (avoid default exports).

### Component Props

Prop interfaces must have the same name as the component followed by the `Props` suffix.

```typescript
interface LoginFormProps {
  onSubmit: (credentials: Credentials) => void;
  isLoading: boolean;
  errorMessage?: string;
}

export function LoginForm({
  onSubmit,
  isLoading,
  errorMessage
}: LoginFormProps) {
  /* ... */
}
```

**Incorrect**: `Props` (too generic), `ILoginFormProps` (avoid `I` prefix).

## Types and Schemas

### Interfaces and Types

TypeScript definitions should use **PascalCase** without prefixes like `I` or suffixes like `Interface`.

- **Valid**: `User`, `ExtractionResult`, `MessageType`.
- **Incorrect**: `IUser`, `UserInterface`, `user`.

### Zod Schemas

Variables containing Zod schemas must end with the `Schema` suffix and use camelCase.

```typescript
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
```

- **Incorrect**: `LoginSchema` (PascalCase), `login_schema` (snake_case).

### Inferred Types from Schemas

Types inferred from Zod schemas should use a clean **PascalCase** name without additional suffixes.

```typescript
export const loginSchema = z.object({ ... });
export type Login = z.infer<typeof loginSchema>;
```

- **Incorrect**: `LoginData`, `LoginType`, `ILogin`.
