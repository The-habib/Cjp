## 2025-03-01 - Missing email verification in Firebase Security Rules

**Vulnerability:** A missing check for `request.auth.token.email_verified == true` in the `firestore.rules` file for the `isSignedIn()` helper function.
**Learning:** This allowed unverified email accounts to submit and modify registrations, bypassing the intended security requirement specified in the `security_spec.md`. The design intent was to enforce verified Google sign-ins to ensure authenticity of submissions.
**Prevention:** Always verify both the authentication status (`request.auth != null`) and the verification status (`request.auth.token.email_verified == true`) for write operations when email authenticity is a requirement.
