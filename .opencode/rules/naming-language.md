---
paths: src/**/*.{ts,tsx}
---

# Naming Language — English Only

**All identifiers must be in English. No Spanish variable names, function names, types, interfaces, constants, props, or hooks.**

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

## Exception — Domain-Specific Business Terms

A Spanish identifier is allowed **only when ALL of the following are true**:

1. It represents a business concept that belongs to a specific domain (not a generic programming term)
2. The term is non-generic — it cannot be replaced by a common English word without losing domain meaning
3. It is used as a domain noun, not as a generic container or utility

```ts
// ✅ Allowed — non-generic domain business terms
const expedienteId = params.id;
type TramiteStatus = 'pendiente' | 'aprobado' | 'rechazado';
const facturaSchema = z.object({ ... });
interface CuentaCorrienteItem { ... }

// ❌ NOT allowed — generic terms disguised as domain
const datosUsuario = {};       // → userData
const listaExpedientes = [];   // → expedienteList
const resultadoBusqueda = {};  // → searchResult
const tipoTramite = '';        // → tramiteType
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

Mixing languages in identifiers creates inconsistency, makes code harder to search, and breaks the convention that code reads as English prose. The exception exists for genuine domain terms (often regulatory or industry-specific) that have no idiomatic English translation without losing precision.
