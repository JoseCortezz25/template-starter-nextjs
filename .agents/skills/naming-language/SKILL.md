---
name: naming-language
description: Enforce English-only identifiers in source code. Use this skill when writing, reviewing, or refactoring variable names, function names, types, interfaces, constants, props, or hooks. Trigger when the user writes or proposes a Spanish identifier, when reviewing code that mixes languages, or when naming something in a domain with Spanish business terms. Do NOT trigger for UI strings or message files — those are a product decision handled via messages.ts.
---

# Naming Language — English Only

**All identifiers must be in English. Spanish names in code are a violation — with one narrow exception.**

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

## The Exception (narrow and strict)

A Spanish identifier is allowed **only when ALL three conditions are met**:

1. It is a **business domain noun** — a concept specific to the application's domain (regulatory, industry-specific, financial, legal)
2. It is **non-generic** — it cannot be cleanly replaced by a common English word without losing precision
3. It is used **as the domain noun itself**, not as a wrapper, container, or modifier

```ts
// ✅ Allowed — the Spanish term IS the domain concept
const expedienteId = params.id;
type TramiteStatus = 'pendiente' | 'aprobado' | 'rechazado';
const facturaSchema = z.object({ ... });
interface CuentaCorrienteItem { ... }

// ❌ NOT allowed — Spanish modifier wrapped around generic concept
const datosUsuario = {};        // → userData
const listaExpedientes = [];    // → expedienteList
const resultadoBusqueda = {};   // → searchResult
const tipoTramite = '';         // → tramiteType
const estadoTramite = '';       // → tramiteStatus
```

The key distinction: `expediente` as a noun (allowed) vs `datos` + anything (never allowed).

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

Exception applies: `expediente.schema.ts` is valid if `expediente` is a domain concept.

---

## What Is NOT Covered by This Rule

- **UI strings and labels**: `messages.ts` and `validation-messages.ts` — language is a product decision
- **Code comments**: English preferred, but Spanish is tolerated if that is the team's documented convention
- **String literals in logic**: must be English (e.g., enum values, status codes, keys)

---

## How to Apply When Reviewing

When you see a Spanish identifier, ask:

1. Is this a generic word? → Always replace with English
2. Is this a domain noun? → Is it non-generic? Can English express it without precision loss?
   - No → keep it as the domain noun
   - Yes (English works fine) → replace it

When proposing names, default to English. Only suggest a Spanish domain noun when the user has already established it as a domain concept in the codebase or explicitly names it as such.
