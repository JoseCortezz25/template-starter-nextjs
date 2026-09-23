---
paths: src/**/*.{ts,tsx}
---

# Text Management

Static text management in the application follows a domain-centralized approach that eliminates scattered text strings in components. This practice improves maintainability, ensures consistency, and facilitates future internationalization implementations.

## Message classification by scope

### Global Messages (/config/messages.ts)

Global messages encompass reusable texts throughout the application, independent of any specific domain. These messages include common actions, system states, generic errors, and shared navigation elements.

```typescript
// /config/messages.ts
export const messages = {
  common: {
    actions: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import'
    }
  }
} as const;
```

### Domain Messages

Following the **Screaming Architecture** philosophy, each domain encapsulates its own messages in a `messages.ts` file within its folder. This maintains domain cohesion and facilitates maintenance.

#### Folder Structure

Message organization by domain follows the project's folder architecture. Each domain maintains its own `messages.ts` file at the root of its folder, alongside its components, hooks, and actions. This structure ensures:

- **Domain Cohesion**: All texts related to a specific domain are grouped together, facilitating their location and maintenance.
- **Scalability**: As domains grow, each can evolve its messages independently without affecting other domains.
- **Clarity**: Developers know exactly where to find or add messages related to a specific domain.
- **Maintainability**: Changes to a domain's texts do not require navigating through multiple scattered files in the application.

```
/domains
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── messages.ts          # Auth domain texts
│   └── actions.ts
│
├── users/
│   ├── components/
│   ├── hooks/
│   ├── messages.ts          # Users domain texts
│   └── actions.ts
```

## Using Messages in Components

### When to Use Domain Messages

Use domain messages when the text is specific and unique to that domain. This includes:

- **Form labels** specific to the domain (e.g., "Email" in auth, "Full Name" in users)
- **Error messages** related to domain logic
- **Titles and descriptions** of domain pages or sections
- **Confirmation messages** specific to domain actions
- **Input placeholders** related to the domain

### When to Use Common Messages

Use common messages (`/config/messages.ts`) when the text is generic and reusable across multiple domains:

- **Standard actions**: Save, Cancel, Delete, Edit, etc.
- **Generic states**: Loading, Error, Success, etc.
- **Cross-cutting errors**: Required fields, generic server errors
- **Navigation elements**: Menus, breadcrumbs, common links

Domain components import messages from their own domain:

```typescript
// /domains/auth/components/molecules/login-button.tsx
import { authMessages } from '../messages';

export function LoginButton() {
  return <button>{authMessages.login.submitButton}</button>;
}
```

### Common Messages

For messages shared across multiple domains, use `/config/messages.ts`:

```typescript
// /config/messages.ts
export const commonMessages = {
  actions: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete'
  },
  errors: {
    required: 'This field is required',
    serverError: 'Something went wrong'
  }
} as const;
```

### Dynamic Texts

Use functions for texts that require dynamic values:

```typescript
// /domains/users/messages.ts
export const userMessages = {
  greeting: (name: string) => `Welcome, ${name}!`,
  itemCount: (count: number) => `${count} ${count === 1 ? 'item' : 'items'}`
} as const;
```

### Validation Messages

Validation messages can be in the domain or shared:

```typescript
// /domains/auth/messages/validation.ts
export const authValidationMessages = {
  email: 'Please enter a valid email',
  passwordTooShort: 'Password must be at least 8 characters',
  passwordMismatch: 'Passwords do not match'
} as const;
```

## Best Practices

1. **One messages.ts file per domain** to maintain cohesion
2. **Common messages in /config** only for cross-cutting texts
3. **Type safety** using `as const` and exported types
4. **Descriptive names** that reflect the message context
5. **Functions for dynamic texts** instead of concatenation
6. **Consistency in message object structure** across domains
7. **Avoid message duplication** — consolidate repeated messages
