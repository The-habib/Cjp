## 2026-07-09 - Added missing ARIA labels to mobile navigation

**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.

## 2026-07-16 - Added disabled attribute to visually disabled buttons

**Learning:** Found an accessibility issue pattern specific to this app's components: buttons visually disabled using 'opacity-50' and 'cursor-not-allowed' lacked the native HTML 'disabled' attribute, which is necessary for screen readers to announce the button as disabled and prevent keyboard interaction.
**Action:** Always ensure that when visually disabling UI elements, the semantic HTML 'disabled' attribute is applied to prevent unintended accessibility interactions.
