# Architecture Guidance

This document gives concise guidance for the template's architecture and coding standards.

Principles

- Domain-Driven Design (DDD): group code by domain (features). Each feature exposes a public barrel (see `src/features/public.ts`).
- SOLID: keep components and services single-responsibility and testable.
- KISS & DRY: prefer simple, readable code and avoid duplication.
- Frontend micro-frontends: aim for decoupled feature boundaries and well-defined public APIs.

Folder conventions

- `features/<feature>/ui` — presentational components
- `features/<feature>/model` — domain/service logic
- `features/<feature>/index.ts` — public exports (barrel)

Import rules

- Consumers must import from the feature root (or `@/features`) and not from `ui` or `model` subpaths. ESLint `no-restricted-imports` enforces this.

Testing & Ownership

- Add unit/integration tests in `__tests__` near their code.
- Use `CODEOWNERS` to assign ownership and reviewers for critical paths.
