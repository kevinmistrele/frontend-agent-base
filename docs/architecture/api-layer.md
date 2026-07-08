# API Layer

## Where network calls live

- Cross-cutting client setup: `src/lib/api-client.ts`.
- Feature-specific requests: `src/features/<feature>/api/*.ts`.
- Never inside a component body or JSX.

## Pattern

```ts
// src/features/<feature>/api/get-entity.ts
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { Entity } from '@/features/<feature>/types/<feature>.types';

function getEntity(entityId: string): Promise<Entity> {
  return apiClient.get<Entity>(`/entities/${entityId}`);
}

export function useEntity(entityId: string) {
  return useQuery({
    queryKey: ['entity', entityId],
    queryFn: () => getEntity(entityId),
  });
}
```

Request functions:

- take explicit, typed parameters;
- return typed data (type the response, do not `as any` past `fetch`/`apiClient`);
- throw or reject on failure — they do not catch-and-swallow errors.
- do not show toasts, navigate, or touch global stores. That is the screen's job (see [errors.md](../standards/errors.md)).

## Error flow

```txt
api-client / api/*.ts  ->  feature hook (TanStack Query)  ->  screen
```

Errors propagate up through this chain untouched. The screen decides what the user sees (see [state-management.md](./state-management.md) and [../standards/errors.md](../standards/errors.md)).

## Config

- Environment variables are parsed and validated once in `src/config/env.ts` (Zod schema) and imported as `env` everywhere else — never read `import.meta.env` directly in feature code.
- Never hardcode a base URL, token, or secret in a feature file.

## Adding a new backend integration

Extend `src/lib/api-client.ts` (e.g. add `post`, `put`, `delete` methods) rather than introducing a new HTTP library. Only reach for a dedicated library (e.g. `axios`, generated SDK) when the task explicitly calls for it.
