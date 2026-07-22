## 2024-05-24 - [Admin Privilege Escalation via Unverified Email Spoofing]
**Vulnerability:** The admin endpoint and Firestore rules only checked if the authenticated user's email was in an allowed list (`ALLOWED_EMAILS`), but failed to check if that email was actually verified (`emailVerified`).
**Learning:** This allowed an attacker to create an account with a password using the admin's email address and immediately gain administrative access without needing to verify ownership of the email.
**Prevention:** Always verify `emailVerified` / `request.auth.token.email_verified == true` when relying on email addresses for sensitive authorization in Firebase Auth and Firestore rules.
