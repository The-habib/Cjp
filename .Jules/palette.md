## 2024-07-09 - Ensure Label-to-Input Association
**Learning:** In long registration forms, missing htmlFor-id bindings on label-input pairs can make screen-reader navigation and touch tap targets frustratingly small or confusing.
**Action:** Always ensure inputs have specific ID strings that are strictly matching their visual label's htmlFor attribute, especially in custom UI forms where native wrapper logic isn't heavily relied upon.
