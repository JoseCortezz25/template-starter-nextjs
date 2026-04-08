---
paths: src/**/*.{ts,tsx}
---

# State Management

State management in the application prioritizes performance and simplicity. Client-side state is minimized, making the most of the server's capabilities to reduce complexity in the browser.

In cases where client-side state is necessary, Zustand is used as the primary state management solution. Zustand offers a minimalist and powerful API, perfectly compatible with React Server Components, allowing for the creation of separate and atomic stores that can be selectively imported into client components without compromising the overall architecture and without the need for a provider.

The application implements useActionState to manage form state. This implementation leverages improvements in form state handling while maintaining compatibility with Server Actions.

URL-based state management is implemented using the nuqs library, allowing important states to be preserved in the URL to improve shareability and navigation without losing user context.

The useFormStatus hook with its enhanced properties (data, method, action) is used as the primary tool for providing feedback during form operations, ensuring a smooth user experience during data submission processes.

# Component Architecture

The application's architecture is strictly based on React Server Components (RSC) as its structural pillar. RSCs are a critical element for performance optimization, significantly reducing the amount of JavaScript sent to the client and facilitating direct access to server resources.

It is necessary to minimize the use of use client directives, limiting them exclusively to cases where user interactivity is essential or specific access to browser APIs is required. This technical restriction is fundamental to keeping most of the logic on the server, thus maximizing the application's performance and efficiency.

The implementation of Suspense is a mandatory technical requirement for all asynchronous operations, establishing defined loading states during processes such as data fetching. This specification guarantees an optimal user experience during loading cycles.

Server Actions are the standard protocol for data mutation operations, validation, and form processing, maximizing the security and efficiency benefits inherent in server-side execution.
