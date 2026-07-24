## 2026-07-09 - Added missing ARIA labels to mobile navigation
**Learning:** Found an accessibility issue pattern specific to this app's components: icon-only mobile navigation buttons (bottom nav and floating action button) lacked `aria-label`s, making them unreadable by screen readers.
**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes, especially in recurring layout components like navigation bars.
## 2024-07-24 - Contextual Playwright Locators
**Learning:** When writing Playwright UI tests involving buttons with common names (like "Post"), you often encounter strict mode violations because multiple instances exist in the DOM (e.g., in a sidebar vs. main compose box).
**Action:** Always specify the containing region context (e.g., using `page.get_by_role("main").get_by_role("button", name="Post")`) to uniquely identify the intended element.
