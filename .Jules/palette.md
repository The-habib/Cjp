## 2026-07-09 - Added missing ARIA labels to mobile navigation
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.

## 2026-07-09 - Visually disabled buttons lack semantic disabled attribute
**Learning:** Found an accessibility issue pattern where buttons were visually styled as disabled (e.g. `opacity-50 cursor-not-allowed`) but missing the semantic HTML `disabled` attribute, which allows unintended keyboard focus and screen reader interaction.
**Action:** Always ensure the semantic HTML `disabled` attribute (or `aria-disabled="true"` with appropriate keyboard handling) is applied to visually disabled UI elements.
