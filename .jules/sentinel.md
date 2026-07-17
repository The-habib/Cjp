## 2024-05-14 - Prevent Admin Privilege Escalation via Unverified Emails
**Vulnerability:** The `isAdmin()` function in `firestore.rules` relied solely on `request.auth.token.email` matching hardcoded admin emails without verifying if the user actually owned the email address (`request.auth.token.email_verified`). This allowed an attacker to create a custom password account with the admin's email and gain immediate administrative privileges.
**Learning:** Always verify email ownership before granting privileges based on an email address.
**Prevention:** Always enforce `request.auth.token.email_verified == true` in Firebase security rules for write operations and admin privileges.
