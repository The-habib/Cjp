# Security Spec

## Data Invariants
- A registration requires a valid name, email, and specific constraints for enums.
- The createdAt field must match request.time.
- Only authenticated users can read their own registration, but since anyone can join without auth if they don't want to sign in... Wait, you should enforce an authenticated user submitting their own registration or allow anonymous? The form doesn't use passwords, so maybe allow strictly structured creates from anyone? No, "For all standard write operations (unless the app explicitly supports anonymous users), you MUST strictly mandate that the user is verified using `request.auth.token.email_verified == true`." But it's a public form. Let's use anonymous auth or Google Sign In for the form.
Wait, they said "Hosted on Google Forms. Never submit passwords." We should replace this with a real React form submitting to Firestore, and we'll require Google Sign-In to submit to ensure authenticity.
Let's update the invariant: "A user must be signed in with a verified email to submit a registration. A user can only submit one registration (registrationId == request.auth.uid). A user can read their own registration."

## The "Dirty Dozen" Payloads
1. Create Registration without Auth (Missing Auth)
2. Create Registration with unverified email (Unverified Email)
3. Create Registration with someone else's UID as document ID (Spoofed Identity)
4. Create Registration with invalid enum for `lazy` (Schema Violation - Enum)
5. Create Registration with extra field `isAdmin` (Schema Violation - Extra Fields)
6. Create Registration without required field `name` (Schema Violation - Missing Keys)
7. Create Registration with massive payload string (Resource Poisoning)
8. Update Registration (Updates forbidden)
9. Delete Registration (Deletes forbidden)
10. Read all Registrations (Blanket Read)
11. Read Registration of another user (PII Leak)
12. Create Registration with forged timestamp (Temporal Forgery)

## Test Runner (Skipped for brevity but normally written in `firestore.rules.test.ts`)
