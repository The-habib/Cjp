## 2026-07-09 - Added missing ARIA labels to mobile navigation
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.
## 2025-07-15 - Unrelated formatting changes when fixing a11y

**Learning:** Running `pnpm lint --fix` to resolve formatting issues in modified files can cause widespread formatting changes in unrelated files across the codebase, violating the "keep changes under 50 lines" limit.
**Action:** Always verify the Git diff after running global formatters/linters and use `git restore` to revert changes in unrelated files before committing. Also ensure to add missing ARIA labels to adjacent icon buttons when fixing button states in the same block.
