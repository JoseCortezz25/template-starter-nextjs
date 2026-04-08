---
paths: src/**/*.{ts,tsx}
---

# Text Management

Static text management in the application follows a domain-centralized approach that eliminates scattered text strings in components. This practice improves maintainability, ensures consistency, and facilitates future internationalization implementations.

## Clasificación de mensajes por alcance

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

This section describes how and when to use messages in application components. Proper use of centralized messages improves consistency, facilitates maintenance, and prepares the application for future internationalization implementations.

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

Following these practices ensures maintainable, scalable, and consistent code in text management. These recommendations are based on real project experiences and help avoid common problems:

1. **One messages.ts file per domain** to maintain cohesion

   - Avoid fragmenting messages into multiple files within the same domain
   - Facilitates searching and maintaining related texts
   - Allows having a complete view of all domain messages

2. **Common messages in /config** only for cross-cutting texts

   - Don't use common messages for texts that are only used in one domain
   - If a message is used in 2+ domains, consider moving it to `/config/messages.ts`
   - Keep `/config/messages.ts` focused on truly generic actions and states

3. **Type safety** using `as const` and exported types

   - Use `as const` to ensure literal types and prevent mutations
   - Export TypeScript types for autocomplete and compile-time validation
   - Consider creating typed helpers to access nested messages

4. **Descriptive names** that reflect the message context

   - Use names that clearly indicate where and when the message is used
   - Group related messages using nested objects (e.g., `login.title`, `login.submitButton`)
   - Avoid generic names like `message1`, `text`, `label` that don't provide context

5. **Functions for dynamic texts** instead of concatenation

   - Use functions that receive parameters instead of concatenating strings in components
   - This facilitates translation and pluralization handling in the future
   - Example: `itemCount(count)` is better than `count + ' items'` in the component

6. **Consistency in message object structure**

   - Maintain a similar structure across domains to facilitate navigation
   - Use the same nesting depth for similar concepts
   - Document the expected structure in comments when necessary

7. **Avoid message duplication**
   - If a message repeats in multiple places, consider moving it to a higher level
   - Use common messages for identical texts that appear in different domains
   - Periodically review if there are similar messages that can be consolidated
