---
paths: src/**/*.{ts,tsx}
---

# Naming Language — English Only

**All source-code identifiers must be in English. No exceptions.**

---

## Rule

Every identifier in source code must be written in English:

```ts
// ❌ Forbidden
const usuario = getUser();
const listaDeProductos = [];
function obtenerDatos() {}
type EstadoFormulario = { ... };
const estaActivo = true;

// ✅ Correct
const user = getUser();
const productList = [];
function fetchData() {}
type FormState = { ... };
const isActive = true;
```

---

## No Exceptions for Domain Terms

Business concepts may be written in Spanish in user-facing text, documentation, and data values when product language requires it. They must still use an English source-code identifier.

```ts
// Incorrect
const expedienteId = params.id;
type TramiteStatus = 'pending' | 'approved' | 'rejected';

// Correct
const caseFileId = params.id;
type ProcedureStatus = 'pending' | 'approved' | 'rejected';
```

---

## Always Forbidden in Any Context

These generic Spanish words are never acceptable, even with domain context:

| Forbidden               | Use instead                  |
| ----------------------- | ---------------------------- |
| `datos`                 | `data`                       |
| `usuario`               | `user`                       |
| `lista`                 | `list`                       |
| `resultado`             | `result`                     |
| `valor`                 | `value`                      |
| `nombre`                | `name`                       |
| `tipo`                  | `type`                       |
| `estado`                | `state` / `status`           |
| `error` (Spanish usage) | `error` (same word, English) |
| `mensaje`               | `message`                    |
| `elemento`              | `item` / `element`           |
| `obtener`               | `get` / `fetch`              |
| `crear`                 | `create`                     |
| `actualizar`            | `update`                     |
| `eliminar`              | `delete` / `remove`          |

---

## File Names

File names follow the same rule — `kebab-case` in English.

```
// ❌
usuario.schema.ts
obtener-datos.ts

// ✅
user.schema.ts
fetch-data.ts
```

---

## Comments and Strings

- Code comments: English preferred; Spanish acceptable if team convention requires it
- UI strings and messages: handled via `messages.ts` — language is a product decision, not a code convention
- String literals in schemas or logic: English

---

## Why

Mixing languages in identifiers creates inconsistency, makes code harder to search, and breaks the convention that code reads as English prose. Preserve domain precision through documentation and UI text, not through mixed-language identifiers.
