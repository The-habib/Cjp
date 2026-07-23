## 2025-02-12 - Fix Privilege Escalation via Unverified Emails
**Vulnerability:** Admin endpoints and client-side UI checked for a valid admin email, but did not enforce that the email address was verified via `emailVerified`. This meant an attacker could create an unverified Firebase account using a known admin's email and bypass authorization.
**Learning:** Checking for email alone is insufficient in environments where self-registration is enabled, or email addresses can be spoofed prior to verification.
**Prevention:** Both client-side code and backend rules (Firestore rules) must explicitly check that `request.auth.token.email_verified == true` (backend) and `user.emailVerified` (frontend) when gating admin-level functionality based on specific email domains or addresses.
