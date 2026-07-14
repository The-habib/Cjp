## 2024-05-24 - [Vite/Node Environment Variables in Shared Files]
**Vulnerability:** A hardcoded API key was moved to an environment variable via `import.meta.env`, but the file is shared with a Node prerender script.
**Learning:** In Vite + Node SSR/prerender setups, `import.meta.env` causes a runtime `TypeError` in Node because it's not statically replaced, and the `env` property doesn't exist on `import.meta` natively. Optional chaining (`import.meta?.env?.VAR`) prevents Vite's static analyzer from injecting the value entirely, breaking the browser build.
**Prevention:** Use a `try/catch` to read `import.meta.env.VAR` statically (for Vite), and fall back to `process.env.VAR` in the catch block (for Node environments).
