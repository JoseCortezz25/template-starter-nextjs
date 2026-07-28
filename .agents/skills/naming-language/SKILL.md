---
name: naming-language
description: Enforce English-only identifiers in source code. Use this skill when writing, reviewing, or refactoring variable names, function names, types, interfaces, constants, props, or hooks. Trigger when the user writes or proposes a Spanish identifier, when reviewing code that mixes languages, or when naming something in a domain with Spanish business terms. Do NOT trigger for UI strings or message files — those are a product decision handled via messages.ts.
---

# Naming Language — English Only

**All source-code identifiers must be in English. No exceptions.**

---

## The Rule

Code reads as English prose. Every identifier — variable, function, type, interface, constant, prop, hook, file name — must be in English.

```ts
// ❌ Violation
const usuario = getUser();
const listaDeProductos = [];
function obtenerDatos() {}
type EstadoFormulario = { ... };

// ✅ Correct
const user = getUser();
const productList = [];
function fetchData() {}
type FormState = { ... };
```

---

## No Exceptions for Domain Terms

Domain concepts may remain in Spanish in UI strings, documentation, and data values when the product language requires it. Their source-code identifiers must still be English.

```ts
// ❌ Violation
const expedienteId = params.id;
type TramiteStatus = 'pending' | 'approved' | 'rejected';

// ✅ Correct
const caseFileId = params.id;
type ProcedureStatus = 'pending' | 'approved' | 'rejected';
```

---

## Always Forbidden

These generic Spanish words are never acceptable, even next to a valid domain term:

| Spanish      | English             |
| ------------ | ------------------- |
| `datos`      | `data`              |
| `usuario`    | `user`              |
| `lista`      | `list`              |
| `resultado`  | `result`            |
| `valor`      | `value`             |
| `nombre`     | `name`              |
| `tipo`       | `type`              |
| `estado`     | `state` / `status`  |
| `mensaje`    | `message`           |
| `elemento`   | `item` / `element`  |
| `obtener`    | `get` / `fetch`     |
| `crear`      | `create`            |
| `actualizar` | `update`            |
| `eliminar`   | `delete` / `remove` |
| `buscar`     | `search` / `find`   |
| `validar`    | `validate`          |

---

## File Names

Same rule — all file names in English, `kebab-case`.

```
❌  usuario.schema.ts / obtener-datos.ts / lista-productos.tsx
✅  user.schema.ts   / fetch-data.ts    / product-list.tsx
```

Domain-specific file names must also remain in English.

---

## What Is NOT Covered by This Rule

- **UI strings and labels**: `messages.ts` and `validation-messages.ts` — language is a product decision
- **Code comments**: English preferred, but Spanish is tolerated if that is the team's documented convention
- **String literals in logic**: must be English (e.g., enum values, status codes, keys)

---

## How to Apply When Reviewing

When you see a non-English identifier, replace it with the clearest English equivalent. Preserve domain precision in documentation or user-facing copy, never by mixing languages in source code.
