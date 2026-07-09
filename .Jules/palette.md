## 2024-07-09 - Accessible Form Labels

**Learning:** Found custom form inputs (`RegistrationForm.tsx`) where `<label>` tags lacked `htmlFor` attributes, and inputs lacked `id` attributes. This breaks screen reader associations and clicking the label doesn't focus the input.
**Action:** Always ensure `htmlFor` on `<label>` matches the `id` on `<input>`/`<select>` when building or maintaining custom forms, even if visually distinct.
