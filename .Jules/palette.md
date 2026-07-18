## 2026-07-09 - Added missing ARIA labels to mobile navigation

**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.

## 2023-10-27 - Icon-Only Button Accessibility
**Learning:** Icon-only action buttons (like those for replies, reposts, likes, etc.) in the feed required both ARIA labels for screen readers and title tooltips for visual users, alongside proper focus styles to ensure keyboard navigation visibility.
**Action:** Always ensure that icon-only interactive elements include `aria-label` and `title` attributes, and apply `focus-visible` ring styling.
