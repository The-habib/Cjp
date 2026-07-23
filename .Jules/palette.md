## 2026-07-09 - Added missing ARIA labels to mobile navigation
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.
## 2024-05-18 - Semantic Disabled States on Buttons
**Learning:** Adding visual disabled styles (`opacity-50 cursor-not-allowed`) to a `<button>` without applying the semantic `disabled` attribute leaves the button focusable and interactive for screen readers and keyboard users, creating a confusing discrepancy between the visual and accessible state.
**Action:** Always pair visual disabled styling classes with the native HTML `disabled` attribute for buttons (or `aria-disabled="true"` with custom click/focus prevention logic if `disabled` cannot be used).
