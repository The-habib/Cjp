## 2024-05-24 - Stack Trace Leakage in Error Boundaries
**Vulnerability:** Uncaught exceptions were exposing raw error stack traces to the client in production through both `local-dev-server.ts` (Express SSR/API responses) and `src/routes/__root.tsx` (React ErrorBoundary).
**Learning:** Development convenience features (like showing error stacks) were inadvertently deployed without environment checks, enabling potential information leakage about application internals.
**Prevention:** Always verify `isProd` or `import.meta.env.DEV` around debug outputs, especially in top-level error catchers and root boundaries.
