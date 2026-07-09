## 2024-07-09 - Missing ARIA Labels on Mobile Icon Navigation

**Learning:** Found a recurring accessibility pattern across the main cockroach layout routes where mobile-only navigation elements (`<Bug />`, `<Home />`, `<Search />`, `<Bell />`, `<Mail />`) lacked accessible names. Without these labels, screen reader users would encounter empty or ambiguously labelled interactive elements, impeding basic app navigation.
**Action:** Implemented `aria-label`s on mobile icon-only buttons (`index.tsx`, `profile.tsx`, `$videoId.tsx`). In the future, actively audit all icon-only interactions (especially in responsive designs) to ensure accessible names are present.
