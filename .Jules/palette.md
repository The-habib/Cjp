## 2026-07-09 - Added missing ARIA labels to mobile navigation
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.

## 2024-05-20 - Adding Semantic `disabled` Attribute to Visually Disabled Buttons
**Learning:** Some buttons in the Cockroach route were styled with `opacity-50` and `cursor-not-allowed` to appear disabled, but lacked the native HTML `disabled` attribute. This is an accessibility issue because screen readers won't announce them as disabled and keyboard users can still interact with them.
**Action:** Always ensure the semantic HTML `disabled` attribute is applied alongside visual disabled styles to prevent unintended interactions and provide correct accessibility context.
