## 2026-07-09 - Added missing ARIA labels to mobile navigation

**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.

## 2026-07-16 - Semantic vs Visual Disabled States

**Learning:** Found multiple instances where buttons (e.g. the "Post" button in the Cockroach feed) were visually disabled using `opacity-50` and `cursor-not-allowed` utility classes, but lacked the semantic `disabled` HTML attribute. This is an accessibility anti-pattern because screen readers won't announce the button as disabled, and the button remains keyboard-focusable and theoretically clickable.
**Action:** Whenever applying visual disabled styles (`opacity`, `cursor-not-allowed`), always ensure the semantic `disabled` attribute (or `aria-disabled="true"` with custom keyboard handling) is applied to prevent unintended accessibility and interaction bugs.
