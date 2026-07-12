## 2024-07-12 - Missing Memoization in Admin Dashboard

**Learning:** Unmemoized array filtering operations over potentially large data sets (like the registrations list) cause unnecessary O(n) computations on every render state change (e.g., typing in search, switching tabs).
**Action:** Use `useMemo` for any list filtering functionality that depends on potentially large arrays and search input state to prevent needless re-calculations.
