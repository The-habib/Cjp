## 2024-05-18 - Stack Trace Exposure
**Vulnerability:** Found `error.stack` being rendered in `src/routes/__root.tsx` via `ErrorComponent` and in `local-dev-server.ts`.
**Learning:** Stack traces expose implementation details and sensitive internal structures.
**Prevention:** Remove stack trace output from client-facing error UI components and HTTP responses.
