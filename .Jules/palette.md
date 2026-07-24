## 2026-07-09 - Added missing ARIA labels to mobile navigation
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.

## 2024-07-24 - Semantic disabled attribute missing on composer buttons
**Learning:** Discovered a recurring pattern where composer action buttons (like "Post" or "Reply") are visually styled as disabled (e.g., using `opacity-50`, `cursor-not-allowed`) but lack semantic HTML `disabled` attributes. This leaves them active for keyboard focus and screen readers.
**Action:** When visually disabling buttons, always apply the semantic `disabled` attribute to ensure correct interaction and accessibility behaviors.
