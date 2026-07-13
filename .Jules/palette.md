## 2026-07-09 - Added missing ARIA labels to mobile navigation

**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.

## 2024-05-18 - Ensure Visually Disabled Buttons are Semantically Disabled
**Learning:** We had buttons (like the Composer Post button) that looked visually disabled using `opacity-50` and `cursor-not-allowed`, but lacked the actual `disabled` HTML attribute. This allowed them to still receive keyboard focus and be operable by screen reader users, breaking accessibility.
**Action:** Always ensure that if a button is visually disabled, it must also receive the `disabled` attribute (or `aria-disabled="true"` with appropriate keyboard handling) to prevent unintended interactions.
