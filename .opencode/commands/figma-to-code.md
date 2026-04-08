---
description: This command provides general instructions for converting Figma designs to code following the styles already created in the project.
---

# figma-to-code

**Stack:** Tailwind CSS v4

To create components or layouts from Figma, you must ALWAYS base them on the project files.
ALWAYS use Figma's MCP to inspect design values. Never guess or assume values.

_ALWAYS READ_:

- **Colors & Typography** → `src/app/globals.css`
  This is the single source of truth. It contains all CSS variables defined inside `@theme inline { }`, including color tokens, typography tokens, radius, and any custom variables.

_Process to follow_

1. ALWAYS read `src/app/globals.css` before writing any code. Locate the `@theme inline { }` block — every variable declared there is auto-registered as a Tailwind token. The project may already have custom variables defined; always use those before considering adding new ones.
2. For every Figma value (color, font size, weight, spacing), check if a matching variable exists in that block.
3. If a match exists → always use the Tailwind token derived from the CSS variable. Never hardcode a value that already has a variable.
4. If no variable exists and the value is reusable → first check if a similar or equivalent variable already exists elsewhere in `globals.css` (outside `@theme inline`, in `:root`, or in `.dark`). Only create a new variable if nothing equivalent exists:

```css
@theme inline {
  /* ... existing variables ... */
  --color-your-new-token: #value;
}
```

5. If a value has no variable and appears only once → hardcode it using Tailwind's arbitrary syntax:
   - Color: `text-[#000]` / `bg-[#1a1a2e]`
   - Font size: `text-[18px]`
   - Line height: `leading-[1.4]`
6. Always use Tailwind utility classes. Only use `@apply` when Tailwind does not support the CSS property natively.
7. Never use inline styles (`style="..."`). If a property is supported by Tailwind, always use the utility class instead.
8. **Colors → never use arbitrary values for tokens that exist in `@theme inline`.** The variable name maps directly to a Tailwind utility by stripping the `--color-` prefix:
   - `--color-brand-red` → `bg-brand-red` / `text-brand-red` / `border-brand-red`
   - `--color-black-950` → `bg-black-950` / `text-black-950`
   - `--color-primary` → `bg-primary` / `text-primary`
   - ✅ `bg-brand-red` / `text-black-950` / `border-primary`
   - ❌ `bg-[var(--color-brand-red)]` / `text-[var(--color-black-950)]`
9. **Typography → check `@theme inline` first.** If `--text-*`, `--leading-*`, or `--tracking-*` tokens are defined, use them as Tailwind utilities. If not, use standard Tailwind text utilities (`text-sm`, `text-base`, `font-bold`, etc.):
   - If token exists: `--text-heading-l` → `text-heading-l`
   - If no token: use `text-2xl font-bold leading-tight`
   - ❌ Never use `text-[length:var(--text-something)]`
10. **Never add comments** to CSS or TSX files. No block comments, no inline comments, no section headers.
11. **Figma aliases → Tailwind tokens**: Figma may export variables with `/` separators (e.g., `var(--brand/red, #f00)`). The `/` maps to `-` in the CSS variable name. Always resolve the alias to its `--color-*` token in `globals.css` and use the Tailwind utility:
    - `--brand/red` → check `globals.css` for `--color-brand-red` → `bg-brand-red`
    - `--neutral/950` → check `globals.css` for `--color-neutral-950` → `text-neutral-950`
    - If the resolved token does not exist in `globals.css`, create it under `@theme inline`.
12. **CSS files use `@apply`**: When writing `.css` files for components, always use `@apply` for all Tailwind-supported properties. Only fall back to raw CSS for properties Tailwind does not support natively (e.g., `border: 0.7px solid`, complex gradients, custom shadows).
13. **Typography shorthand classes**: If the project defines shorthand CSS classes for typography (e.g., `.text-display-m`), check whether they can be used with `@apply`. Plain CSS classes cannot be used with `@apply` — if that's the case, always resolve to the individual token-based Tailwind utilities from `globals.css`:
    - ❌ `@apply text-display-m`
    - ✅ `@apply text-display-display-m leading-display-display-m font-extrabold` (using tokens from `@theme inline`)
