## 2026-07-09 - Added missing ARIA labels to mobile navigation

**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.

## 2024-07-12 - Missing Accessibility on Icon-Only Buttons

**Learning:** Found multiple icon-only buttons (like image/video upload) in the post composer lacking `aria-label` and `title` attributes. This is a common pattern when quickly building UI with icons (e.g., Lucide React). Without these, screen readers announce them as just "button" and sighted users get no tooltip context. Adding `focus-visible:ring-2` provides critical keyboard navigation context.
**Action:** Always ensure any button containing only an icon has an explicit `aria-label` and `title`, and includes a visual focus indicator (`focus-visible`).
