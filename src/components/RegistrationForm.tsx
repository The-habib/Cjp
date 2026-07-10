import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDocFromServer, setDoc, serverTimestamp } from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { handleFirestoreError, OperationType } from "../firebase-utils";
import { toast } from "sonner";

export function RegistrationForm() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    chronicallyOnline: "Yes",
    lazy: "Yes",
    identifyAsCockroach: "Yes",
    twitterHandle: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const docRef = doc(db, "registrations", u.uid);
          const snap = await getDocFromServer(docRef);
          if (snap.exists()) {
            setSuccess(true);
          }
        } catch (err: unknown) {
          if (err instanceof Error && err.message.includes("the client is offline")) {
            console.error("Please check your Firebase configuration.");
          }
          // Ignore read errors here if permissions didn't allow maybe, but read is allowed for self.
        }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Authenticated successfully");
    } catch (e: unknown) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : String(e));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);

    const payload = {
      name: formData.name,
      email: user.email || "",
      ...(formData.phone ? { phone: formData.phone } : {}),
      chronicallyOnline: formData.chronicallyOnline,
      lazy: formData.lazy,
      identifyAsCockroach: formData.identifyAsCockroach,
      ...(formData.twitterHandle ? { twitterHandle: formData.twitterHandle } : {}),
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, "registrations", user.uid), payload);
      setSuccess(true);
      toast.success("Registration successful!");
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.WRITE, `registrations/${user.uid}`);
      } catch (handlerErr: unknown) {
        toast.error("Failed to register. Are you sure you are a cockroach?");
        console.error(handlerErr);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="cjp-join-qs" style={{ textAlign: "center", padding: "2rem 0" }}>
        Loading...
      </div>
    );

  if (success) {
    return (
      <div
        className="cjp-join-qs"
        style={{ textAlign: "center", padding: "2rem 0", color: "var(--ink)" }}
      >
        <h3
          style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          You're in, {user?.displayName || "Roach"}!
        </h3>
        <p style={{ marginBottom: "2rem" }}>
          The bond is sealed. Your receipt is secured on the blockchain. Just kidding, it's in a
          database.
        </p>
        <button onClick={handleLogout} className="cjp-btn cjp-btn-ghost">
          Logout
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="cjp-join-qs" style={{ textAlign: "center", padding: "1rem 0" }}>
        <p style={{ marginBottom: "1rem", color: "var(--ink)" }}>
          To forge the bond, authenticate yourself.
        </p>
        <button onClick={handleLogin} className="cjp-btn cjp-btn-dark cjp-btn-block">
          Sign in with Google <em>→</em>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>Signed in as {user.email}</span>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            border: "none",
            background: "none",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "0.8rem",
          }}
        >
          Switch
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="field-name" style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Name *</label>
        <input
          id="field-name"
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "2px solid var(--ink)",
            background: "var(--paper)",
            fontFamily: "inherit",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="field-phone" style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Phone (optional)</label>
        <input
          id="field-phone"
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "2px solid var(--ink)",
            background: "var(--paper)",
            fontFamily: "inherit",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="field-chronicallyOnline" style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
          Are you chronically online?
        </label>
        <select
          id="field-chronicallyOnline"
          value={formData.chronicallyOnline}
          onChange={(e) => setFormData({ ...formData, chronicallyOnline: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "2px solid var(--ink)",
            background: "var(--paper)",
            fontFamily: "inherit",
          }}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="field-lazy" style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Are you lazy?</label>
        <select
          id="field-lazy"
          value={formData.lazy}
          onChange={(e) => setFormData({ ...formData, lazy: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "2px solid var(--ink)",
            background: "var(--paper)",
            fontFamily: "inherit",
          }}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Strategically">Strategically</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="field-identifyAsCockroach" style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
          Do you identify as a "cockroach" as defined by the CJI?
        </label>
        <select
          id="field-identifyAsCockroach"
          value={formData.identifyAsCockroach}
          onChange={(e) => setFormData({ ...formData, identifyAsCockroach: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "2px solid var(--ink)",
            background: "var(--paper)",
            fontFamily: "inherit",
          }}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="field-twitterHandle" style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Twitter Handle (optional)</label>
        <input
          id="field-twitterHandle"
          type="text"
          value={formData.twitterHandle}
          onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "2px solid var(--ink)",
            background: "var(--paper)",
            fontFamily: "inherit",
          }}
          placeholder="@"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="cjp-btn cjp-btn-primary cjp-btn-block"
        style={{ marginTop: "1rem" }}
      >
        {submitting ? "Submitting..." : "I'm in. Take me. →"}
      </button>
    </form>
  );
}
