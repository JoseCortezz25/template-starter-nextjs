---
paths: src/**/*.{ts,tsx}
---

The approach to style management is primarily based on Tailwind CSS along with shadcn/ui components. To maintain style consistency and reduce repetition, we will implement an organized system for creating and applying classes.

For frequently repeated styles, it is recommended to use the @apply directive in separate CSS files named according to the entity/component. This allows for visual consistency throughout the application while leveraging the efficiency of Tailwind.

Each reusable UI component must have its variants and styled states clearly defined. More complex or specific styles should be extracted into separate files and applied using @apply, instead of long strings of classes within the components.

For components with style variations based on properties, we will implement utility functions for class construction that generate the appropriate combinations based on the received props. This keeps the styling logic encapsulated and facilitates maintenance.

A mobile-first approach will be used for all responsive designs, leveraging Tailwind's capabilities to create adaptable interfaces for different screen sizes in a consistent and predictable manner.
