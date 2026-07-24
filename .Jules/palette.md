## 2026-07-09 - Added missing ARIA labels to mobile navigation
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.
## 2025-02-23 - Composer Actions Accessibility & Post Button State
**Learning:** Found multiple icon-only buttons (Image, Video, Poll, Schedule) lacking `aria-label`s, making them invisible to screen readers. Additionally, the primary "Post" button relied purely on CSS for its disabled state (`opacity-50`, `cursor-not-allowed`) without utilizing the native HTML `disabled` attribute, meaning keyboard users could still focus and interact with it despite it appearing inactive.
**Action:** When implementing icon-only controls, always verify `aria-label` or `title` presence. When visually disabling elements, enforce semantic consistency by applying the native `disabled` attribute or `aria-disabled="true"` to prevent unintended keyboard interactions.
