## 2026-07-09 - Added missing ARIA labels to mobile navigation
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.
## 2026-07-20 - Ensure Visually Disabled Elements are Semantically Disabled
**Learning:** Found an accessibility issue pattern where UI elements (like the 'Post' button) were styled to look disabled using Tailwind classes (`opacity-50 cursor-not-allowed`) but lacked the native HTML `disabled` attribute, making them still interactive for screen readers and keyboard users.
**Action:** Always ensure that visually disabled interactive elements also have the semantic HTML `disabled` attribute (or `aria-disabled="true"` if keyboard navigation is still intended) to prevent unintended accessibility interactions.
