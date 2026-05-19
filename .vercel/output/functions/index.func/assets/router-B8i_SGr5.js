import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, createRouter } from "@tanstack/react-router";
import { jsxDEV } from "react/jsx-dev-runtime";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDocFromServer, serverTimestamp, setDoc } from "firebase/firestore";
const appCss = "/assets/styles-7DHs_KZz.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxDEV("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "text-7xl font-bold text-foreground", children: "404" }, void 0, false, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }, void 0, false, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }, void 0, false, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "mt-6", children: /* @__PURE__ */ jsxDEV(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/routes/__root.tsx",
        lineNumber: 23,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/__root.tsx",
    lineNumber: 16,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/routes/__root.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsxDEV("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }, void 0, false, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }, void 0, false, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 45,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/routes/__root.tsx",
          lineNumber: 49,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/routes/__root.tsx",
          lineNumber: 58,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/__root.tsx",
    lineNumber: 41,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/routes/__root.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cockroach Janta Party" },
      { property: "og:site_name", content: "Cockroach Janta Party" },
      { property: "og:type", content: "website" }
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "any"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxDEV("html", { lang: "en-IN", children: [
    /* @__PURE__ */ jsxDEV("head", { children: /* @__PURE__ */ jsxDEV(HeadContent, {}, void 0, false, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 102,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("body", { children: [
      children,
      /* @__PURE__ */ jsxDEV(Scripts, {}, void 0, false, {
        fileName: "/app/applet/src/routes/__root.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/__root.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/__root.tsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
    fileName: "/app/applet/src/routes/__root.tsx",
    lineNumber: 117,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/routes/__root.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
}
const BASE_URL = "https://cockroach-janta-party.lovable.app";
const Route$1 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" }
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const projectId = "cockroach-janta-party";
const appId = "1:565981274228:web:2ad8c005bba134eacab121";
const apiKey = "AIzaSyDevyO_zZkaMIsh58pEkk3o-_k_IbvdMYc";
const authDomain = "cockroach-janta-party.firebaseapp.com";
const firestoreDatabaseId = "ai-studio-38612186-345f-4ca4-b461-f719d7f030d7";
const storageBucket = "cockroach-janta-party.firebasestorage.app";
const messagingSenderId = "565981274228";
const measurementId = "";
const firebaseConfig = {
  projectId,
  appId,
  apiKey,
  authDomain,
  firestoreDatabaseId,
  storageBucket,
  messagingSenderId,
  measurementId
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);
var OperationType = /* @__PURE__ */ ((OperationType2) => {
  OperationType2["CREATE"] = "create";
  OperationType2["UPDATE"] = "update";
  OperationType2["DELETE"] = "delete";
  OperationType2["LIST"] = "list";
  OperationType2["GET"] = "get";
  OperationType2["WRITE"] = "write";
  return OperationType2;
})(OperationType || {});
function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
function RegistrationForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    chronicallyOnline: "Yes",
    lazy: "Yes",
    identifyAsCockroach: "Yes",
    twitterHandle: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
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
        } catch (err) {
          if (err instanceof Error && err.message.includes("the client is offline")) {
            console.error("Please check your Firebase configuration.");
          }
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
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    setSuccess(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError(null);
    const payload = {
      name: formData.name,
      email: user.email || "",
      phone: formData.phone || void 0,
      chronicallyOnline: formData.chronicallyOnline,
      lazy: formData.lazy,
      identifyAsCockroach: formData.identifyAsCockroach,
      twitterHandle: formData.twitterHandle || void 0,
      createdAt: serverTimestamp()
    };
    Object.keys(payload).forEach((key) => payload[key] === void 0 && delete payload[key]);
    try {
      await setDoc(doc(db, "registrations", user.uid), payload);
      setSuccess(true);
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.WRITE, `registrations/${user.uid}`);
      } catch (handlerErr) {
        setError("Failed to register. Are you sure you are a cockroach?");
        console.error(handlerErr);
      }
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxDEV("div", { className: "cjp-join-qs", style: { textAlign: "center", padding: "2rem 0" }, children: "Loading..." }, void 0, false, {
    fileName: "/app/applet/src/components/RegistrationForm.tsx",
    lineNumber: 94,
    columnNumber: 23
  }, this);
  if (success) {
    return /* @__PURE__ */ jsxDEV("div", { className: "cjp-join-qs", style: { textAlign: "center", padding: "2rem 0", color: "var(--ink)" }, children: [
      /* @__PURE__ */ jsxDEV("h3", { style: { fontFamily: '"Archivo Black", sans-serif', fontSize: "1.5rem", marginBottom: "1rem" }, children: [
        "You're in, ",
        user?.displayName || "Roach",
        "!"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { style: { marginBottom: "2rem" }, children: "Your receipt is secured on the blockchain. Just kidding, it's in a database." }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 100,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: handleLogout, className: "cjp-btn cjp-btn-ghost", children: "Logout" }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 101,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this);
  }
  if (!user) {
    return /* @__PURE__ */ jsxDEV("div", { className: "cjp-join-qs", style: { textAlign: "center", padding: "1rem 0" }, children: [
      /* @__PURE__ */ jsxDEV("p", { style: { marginBottom: "1rem", color: "var(--ink)" }, children: "To sign the roster, authenticate yourself." }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 109,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: handleLogin, className: "cjp-btn cjp-btn-dark cjp-btn-block", children: [
        "Sign in with Google ",
        /* @__PURE__ */ jsxDEV("em", { children: "→" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 110,
          columnNumber: 106
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 110,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 108,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "1rem" }, children: [
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxDEV("span", { style: { fontSize: "0.8rem", opacity: 0.7 }, children: [
        "Signed in as ",
        user.email
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 118,
        columnNumber: 10
      }, this),
      /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: handleLogout, style: { border: "none", background: "none", textDecoration: "underline", cursor: "pointer", fontSize: "0.8rem" }, children: "Switch" }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 119,
        columnNumber: 10
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 117,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
      /* @__PURE__ */ jsxDEV("label", { style: { fontSize: "0.85rem", fontWeight: "bold" }, children: "Name *" }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("input", { required: true, type: "text", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), style: { padding: "0.75rem", borderRadius: "8px", border: "2px solid var(--ink)", background: "var(--paper)", fontFamily: "inherit" } }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
      /* @__PURE__ */ jsxDEV("label", { style: { fontSize: "0.85rem", fontWeight: "bold" }, children: "Phone (optional)" }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 128,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("input", { type: "text", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), style: { padding: "0.75rem", borderRadius: "8px", border: "2px solid var(--ink)", background: "var(--paper)", fontFamily: "inherit" } }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 129,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
      /* @__PURE__ */ jsxDEV("label", { style: { fontSize: "0.85rem", fontWeight: "bold" }, children: "Are you chronically online?" }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("select", { value: formData.chronicallyOnline, onChange: (e) => setFormData({ ...formData, chronicallyOnline: e.target.value }), style: { padding: "0.75rem", borderRadius: "8px", border: "2px solid var(--ink)", background: "var(--paper)", fontFamily: "inherit" }, children: [
        /* @__PURE__ */ jsxDEV("option", { value: "Yes", children: "Yes" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 135,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("option", { value: "No", children: "No" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 136,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("option", { value: "Maybe", children: "Maybe" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 137,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 134,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 132,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
      /* @__PURE__ */ jsxDEV("label", { style: { fontSize: "0.85rem", fontWeight: "bold" }, children: "Are you lazy?" }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 142,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("select", { value: formData.lazy, onChange: (e) => setFormData({ ...formData, lazy: e.target.value }), style: { padding: "0.75rem", borderRadius: "8px", border: "2px solid var(--ink)", background: "var(--paper)", fontFamily: "inherit" }, children: [
        /* @__PURE__ */ jsxDEV("option", { value: "Yes", children: "Yes" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 144,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("option", { value: "No", children: "No" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("option", { value: "Strategically", children: "Strategically" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 146,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 141,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
      /* @__PURE__ */ jsxDEV("label", { style: { fontSize: "0.85rem", fontWeight: "bold" }, children: 'Do you identify as a "cockroach" as defined by the CJI?' }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 151,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("select", { value: formData.identifyAsCockroach, onChange: (e) => setFormData({ ...formData, identifyAsCockroach: e.target.value }), style: { padding: "0.75rem", borderRadius: "8px", border: "2px solid var(--ink)", background: "var(--paper)", fontFamily: "inherit" }, children: [
        /* @__PURE__ */ jsxDEV("option", { value: "Yes", children: "Yes" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 153,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("option", { value: "No", children: "No" }, void 0, false, {
          fileName: "/app/applet/src/components/RegistrationForm.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "0.4rem" }, children: [
      /* @__PURE__ */ jsxDEV("label", { style: { fontSize: "0.85rem", fontWeight: "bold" }, children: "Twitter Handle (optional)" }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 159,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("input", { type: "text", value: formData.twitterHandle, onChange: (e) => setFormData({ ...formData, twitterHandle: e.target.value }), style: { padding: "0.75rem", borderRadius: "8px", border: "2px solid var(--ink)", background: "var(--paper)", fontFamily: "inherit" }, placeholder: "@" }, void 0, false, {
        fileName: "/app/applet/src/components/RegistrationForm.tsx",
        lineNumber: 160,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 158,
      columnNumber: 7
    }, this),
    error && /* @__PURE__ */ jsxDEV("div", { style: { color: "var(--red)", fontSize: "0.85rem", marginTop: "0.5rem" }, children: error }, void 0, false, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 163,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV("button", { type: "submit", disabled: submitting, className: "cjp-btn cjp-btn-primary cjp-btn-block", style: { marginTop: "1rem" }, children: submitting ? "Submitting..." : "I'm in. Take me. →" }, void 0, false, {
      fileName: "/app/applet/src/components/RegistrationForm.tsx",
      lineNumber: 165,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/RegistrationForm.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
}
const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cockroach Janta Party — Voice of the Lazy & Unemployed" },
      { name: "description", content: "A political party for the people the system forgot to count. Five demands. Zero sponsors. One large, stubborn swarm. They tried to step on us. We came back." },
      { name: "keywords", content: "Cockroach Janta Party, CJP, Indian political party, satirical political party India, Voice of the Lazy and Unemployed, Abhijeet Dipke, Indian politics, anti-establishment India, youth political party India, cockroach party" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "author", content: "Cockroach Janta Party" },
      { name: "theme-color", content: "#0d1a12" },
      { property: "og:title", content: "Cockroach Janta Party (CJP)" },
      { property: "og:description", content: "Voice of the Lazy & Unemployed. Five demands. Zero sponsors. They tried to step on us — we came back." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cockroach Janta Party" },
      { property: "og:url", content: "https://cockroach-janta-party.lovable.app/" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cockroach Janta Party (CJP) — Voice of the Lazy & Unemployed" },
      { name: "twitter:description", content: "Five demands. Zero sponsors. One large, stubborn swarm. They tried to step on us — we came back." }
    ],
    links: [
      { rel: "canonical", href: "https://cockroach-janta-party.lovable.app/" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://cockroach-janta-party.lovable.app/#org",
              name: "Cockroach Janta Party",
              alternateName: ["CJP", "Cockroach Janta Party (CJP)"],
              url: "https://cockroach-janta-party.lovable.app/",
              email: "contact@cockroachjantaparty.org",
              slogan: "Voice of the Lazy & Unemployed",
              description: "Cockroach Janta Party (CJP) is a satirical Indian political movement for the people the system forgot to count. Five demands. Zero sponsors.",
              founder: { "@type": "Person", name: "Abhijeet Dipke" },
              areaServed: "IN"
            },
            {
              "@type": "WebSite",
              "@id": "https://cockroach-janta-party.lovable.app/#website",
              url: "https://cockroach-janta-party.lovable.app/",
              name: "Cockroach Janta Party",
              inLanguage: "en-IN",
              publisher: { "@id": "https://cockroach-janta-party.lovable.app/#org" }
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is the Cockroach Janta Party?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Cockroach Janta Party (CJP) is a satirical Indian political party — a movement for the lazy, the unemployed and the chronically online. Five demands, zero corporate sponsors."
                  }
                },
                {
                  "@type": "Question",
                  name: "Who founded the Cockroach Janta Party?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Cockroach Janta Party was founded by Abhijeet Dipke, who serves as Founder & Convenor."
                  }
                },
                {
                  "@type": "Question",
                  name: "How do I join the Cockroach Janta Party?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Membership is free and lifelong. Fill in the membership form linked on the homepage. No fees, no selfies with the leader, no missed call to register."
                  }
                },
                {
                  "@type": "Question",
                  name: "What are the five demands of the CJP?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No Rajya Sabha for retired CJIs; vote tampering treated under UAPA; 50% reservation for women without expanding Parliament; cancellation of Ambani and Adani media licences; and a 20-year ban on political defectors."
                  }
                }
              ]
            }
          ]
        })
      }
    ]
  })
});
function Roach({ size = 280 }) {
  return /* @__PURE__ */ jsxDEV("svg", { viewBox: "0 0 320 320", width: size, height: size, xmlns: "http://www.w3.org/2000/svg", "aria-label": "CJP cockroach mascot", className: "cjp-roach", children: [
    /* @__PURE__ */ jsxDEV("defs", { children: /* @__PURE__ */ jsxDEV("filter", { id: "rough", children: [
      /* @__PURE__ */ jsxDEV("feTurbulence", { type: "fractalNoise", baseFrequency: "0.9", numOctaves: "2", seed: "3" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("feDisplacementMap", { in: "SourceGraphic", scale: "1.2" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 104,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("g", { filter: "url(#rough)", children: [
      /* @__PURE__ */ jsxDEV("g", { className: "cjp-antenna a-l", style: { transformOrigin: "135px 95px" }, children: [
        /* @__PURE__ */ jsxDEV("path", { d: "M135 95 Q95 55 55 30", stroke: "#0a0a0a", strokeWidth: "5", fill: "none", strokeLinecap: "round" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 112,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("circle", { cx: "55", cy: "30", r: "6", fill: "#c8ff00", stroke: "#0a0a0a", strokeWidth: "3" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 113,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("g", { className: "cjp-antenna a-r", style: { transformOrigin: "185px 95px" }, children: [
        /* @__PURE__ */ jsxDEV("path", { d: "M185 95 Q225 55 265 30", stroke: "#0a0a0a", strokeWidth: "5", fill: "none", strokeLinecap: "round" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 116,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("circle", { cx: "265", cy: "30", r: "6", fill: "#c8ff00", stroke: "#0a0a0a", strokeWidth: "3" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 115,
        columnNumber: 9
      }, this),
      [0, 1, 2].map((i) => /* @__PURE__ */ jsxDEV("g", { className: `cjp-leg L${i}`, style: { transformOrigin: `120px ${165 + i * 28}px` }, children: /* @__PURE__ */ jsxDEV("path", { d: `M120 ${165 + i * 28} L${50 - i * 8} ${150 + i * 36}`, stroke: "#0a0a0a", strokeWidth: "6", strokeLinecap: "round" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 122,
        columnNumber: 13
      }, this) }, `L${i}`, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 121,
        columnNumber: 11
      }, this)),
      [0, 1, 2].map((i) => /* @__PURE__ */ jsxDEV("g", { className: `cjp-leg R${i}`, style: { transformOrigin: `200px ${165 + i * 28}px` }, children: /* @__PURE__ */ jsxDEV("path", { d: `M200 ${165 + i * 28} L${270 + i * 8} ${150 + i * 36}`, stroke: "#0a0a0a", strokeWidth: "6", strokeLinecap: "round" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 127,
        columnNumber: 13
      }, this) }, `R${i}`, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this)),
      /* @__PURE__ */ jsxDEV("ellipse", { cx: "160", cy: "105", rx: "42", ry: "32", fill: "#0a0a0a" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("path", { d: "M85 175 Q160 110 235 175 Q260 240 160 280 Q60 240 85 175 Z", fill: "#0a0a0a" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("path", { d: "M120 165 Q160 200 200 165", stroke: "#c8ff00", strokeWidth: "4", fill: "none", strokeLinecap: "round" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("path", { d: "M115 200 Q160 235 205 200", stroke: "#c8ff00", strokeWidth: "3", fill: "none", strokeLinecap: "round", opacity: "0.7" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("path", { d: "M160 130 L160 270", stroke: "#1a1a1a", strokeWidth: "2" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("circle", { cx: "146", cy: "100", r: "7", fill: "#f5f5f0" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("circle", { cx: "174", cy: "100", r: "7", fill: "#f5f5f0" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 141,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("circle", { cx: "146", cy: "102", r: "3.5", fill: "#0a0a0a" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 142,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("circle", { cx: "174", cy: "102", r: "3.5", fill: "#0a0a0a" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("path", { d: "M138 88 L154 94", stroke: "#c8ff00", strokeWidth: "3", strokeLinecap: "round" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 145,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("path", { d: "M182 88 L166 94", stroke: "#c8ff00", strokeWidth: "3", strokeLinecap: "round" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 109,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/index.tsx",
    lineNumber: 102,
    columnNumber: 5
  }, this);
}
const manifesto = [
  { t: "No Rajya Sabha for retired CJIs", b: "If CJP comes to power, no Chief Justice gets a Rajya Sabha seat as a post-retirement reward. Period." },
  { t: "Vote tampering = UAPA", b: "If a legitimate vote is deleted — anywhere — the CEC gets arrested under UAPA. Taking voting rights from citizens is terrorism." },
  { t: "50% reservation for women", b: "Women get 50%, not 33%, without inflating Parliament. 50% of all Cabinet positions reserved for women." },
  { t: "Cancel Ambani & Adani media licences", b: "All media houses owned by them lose licences. Independent media gets oxygen. Godi anchors' bank accounts get a deep audit." },
  { t: "20-year ban on defectors", b: "Any MLA or MP who jumps party is barred from contesting or holding public office for 20 years." }
];
const eligibility = [
  { id: "01", t: "Unemployed", b: "By force, by choice, or by principle. We don't ask which." },
  { id: "02", t: "Lazy", b: "Physically only. The brain may continue to spiral at 3am." },
  { id: "03", t: "Chronically online", b: "Minimum 11 hours / day. Bathroom scrolling counts." },
  { id: "04", t: "Can rant professionally", b: "Sharp, honest, and pointed at something that actually matters." }
];
const tickerWords = [
  "हम ज़िंदा हैं",
  "WE SURVIVE",
  "तेज़ धूप में भी",
  "STEP ON US, WE COME BACK",
  "जनता का जवाब",
  "5 DEMANDS · 0 SPONSORS",
  "बेरोज़गारों की पार्टी",
  "VOICE OF THE LAZY & UNEMPLOYED",
  "🪳 ZINDABAD 🪳"
];
const WA_URL = "https://wa.me/?text=" + encodeURIComponent("Join the Cockroach Janta Party — Voice of the Lazy & Unemployed. cockroach-janta-party.lovable.app");
function useCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, x = -100, y = -100, tx = -100, ty = -100;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}
function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  style,
  as = "div"
}) {
  const Component = motion[as] || motion.div;
  return /* @__PURE__ */ jsxDEV(
    Component,
    {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] },
      className,
      style,
      children
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 214,
      columnNumber: 5
    },
    this
  );
}
function Index() {
  const cursorRef = useCursor();
  return /* @__PURE__ */ jsxDEV("div", { className: "cjp", children: [
    /* @__PURE__ */ jsxDEV("style", { children: cjpCss }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 233,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "cjp-grain", "aria-hidden": true }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 236,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "cjp-cursor", ref: cursorRef, "aria-hidden": true }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 237,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }, className: "cjp-ticker cjp-ticker-top", "aria-hidden": true, children: /* @__PURE__ */ jsxDEV("div", { className: "cjp-ticker-track", children: Array.from({ length: 4 }).flatMap(
      (_, k) => tickerWords.map((w, i) => /* @__PURE__ */ jsxDEV("span", { className: "cjp-ticker-item", children: [
        w,
        " ",
        /* @__PURE__ */ jsxDEV("em", { children: "🪳" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 245,
          columnNumber: 21
        }, this)
      ] }, `${k}-${i}`, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 244,
        columnNumber: 15
      }, this))
    ) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 241,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 240,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(motion.nav, { initial: { y: -100 }, animate: { y: 0 }, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }, className: "cjp-nav", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "cjp-nav-bg", "aria-hidden": true, children: /* @__PURE__ */ jsxDEV(
        "img",
        {
          src: "https://static.toiimg.com/thumb/msid-131177259,width-1280,height-720,imgsize-48962,resizemode-6,overlay-toi_sw,pt-32,y_pad-600,x_pad-1200/photo.jpg",
          alt: ""
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 255,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 254,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("a", { href: "#top", className: "cjp-brand", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "cjp-brand-roach", children: "🪳" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 261,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "cjp-brand-text", children: [
          /* @__PURE__ */ jsxDEV("b", { children: "CJP" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 263,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("i", { children: "est. now" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 263,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 260,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "cjp-nav-pill", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "#manifesto", children: "Manifesto" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 267,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#join", children: "Join" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 268,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#contact", children: "Contact" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 269,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 266,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("a", { href: "#join", className: "cjp-nav-cta", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "Join the Swarm" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("em", { children: "→" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 273,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 271,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 253,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("header", { id: "top", className: "cjp-hero", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "cjp-hero-grid", children: [
        /* @__PURE__ */ jsxDEV(Reveal, { className: "cjp-hero-headline", y: 50, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "cjp-hero-tag", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "cjp-dot" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 283,
              columnNumber: 15
            }, this),
            " Volume 1 · Edition 1 · Filed under General Disgruntlement"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 282,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h1", { className: "cjp-h1", children: [
            /* @__PURE__ */ jsxDEV(
              motion.span,
              {
                initial: { opacity: 0, x: -30 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8, delay: 0.1, ease: "easeOut" },
                className: "cjp-word l1",
                children: [
                  "COCK",
                  /* @__PURE__ */ jsxDEV("span", { className: "cjp-accent", children: "·" }, void 0, false, {
                    fileName: "/app/applet/src/routes/index.tsx",
                    lineNumber: 292,
                    columnNumber: 21
                  }, this),
                  "ROACH"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 286,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              motion.span,
              {
                initial: { opacity: 0, x: 30 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                className: "cjp-word l2",
                children: [
                  /* @__PURE__ */ jsxDEV("i", { children: "janta" }, void 0, false, {
                    fileName: "/app/applet/src/routes/index.tsx",
                    lineNumber: 300,
                    columnNumber: 17
                  }, this),
                  " party"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 294,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              motion.span,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                className: "cjp-word l3",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "cjp-strike", children: "वो" }, void 0, false, {
                    fileName: "/app/applet/src/routes/index.tsx",
                    lineNumber: 308,
                    columnNumber: 17
                  }, this),
                  " हम।"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 302,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 285,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "cjp-sub", children: [
            /* @__PURE__ */ jsxDEV("b", { children: "A political party for the people the system forgot to count." }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 312,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 312,
              columnNumber: 82
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Five demands. Zero sponsors. One large, stubborn swarm." }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 313,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 311,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "cjp-hero-ctas", children: [
            /* @__PURE__ */ jsxDEV("a", { href: "#join", className: "cjp-btn cjp-btn-primary", children: [
              "Join the swarm ",
              /* @__PURE__ */ jsxDEV("em", { children: "→" }, void 0, false, {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 317,
                columnNumber: 32
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 316,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("a", { href: "#manifesto", className: "cjp-btn cjp-btn-ghost", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "cjp-btn-num", children: "05" }, void 0, false, {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 320,
                columnNumber: 17
              }, this),
              " Demands"
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 319,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 315,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 281,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { className: "cjp-hero-stage", y: 50, delay: 0.2, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "cjp-stage-bg", "aria-hidden": true, children: [
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                animate: { rotate: 360 },
                transition: { duration: 40, repeat: Infinity, ease: "linear" },
                className: "cjp-blob b1"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 328,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                animate: { rotate: -360 },
                transition: { duration: 35, repeat: Infinity, ease: "linear" },
                className: "cjp-blob b2"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 333,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "cjp-cross-grid" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 338,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 327,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "cjp-roach-wrap", children: [
            /* @__PURE__ */ jsxDEV(Roach, { size: 340 }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 341,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "cjp-roach-shadow" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 342,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 340,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(motion.div, { initial: { scale: 0, rotate: -30 }, animate: { scale: 1, rotate: 15 }, transition: { type: "spring", delay: 0.4 }, className: "cjp-stamp cjp-stamp-1", children: /* @__PURE__ */ jsxDEV("span", { children: [
            "NOT",
            /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 345,
              columnNumber: 24
            }, this),
            "SQUASHABLE"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 345,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 344,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(motion.div, { initial: { scale: 0, rotate: 30 }, animate: { scale: 1, rotate: -12 }, transition: { type: "spring", delay: 0.5 }, className: "cjp-stamp cjp-stamp-2", children: /* @__PURE__ */ jsxDEV("span", { children: [
            "EST.",
            /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 348,
              columnNumber: 25
            }, this),
            "NOW"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 348,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 347,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(motion.div, { initial: { scale: 0, rotate: 30 }, animate: { scale: 1, rotate: -10 }, transition: { type: "spring", delay: 0.6 }, className: "cjp-stamp cjp-stamp-3", children: /* @__PURE__ */ jsxDEV("span", { children: [
            "0",
            /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 351,
              columnNumber: 22
            }, this),
            "FUNDING"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 351,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 350,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 326,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 279,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Reveal, { y: 30, delay: 0.4, className: "cjp-ribbon", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("b", { children: "05" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 358,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Demands" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 358,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 358,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("b", { children: "00" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 359,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Corporate Donors" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 359,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 359,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("b", { children: "∞" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 360,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Patience" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 360,
            columnNumber: 24
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 360,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("b", { children: "01" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 361,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Founder, no PA" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 361,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 361,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 357,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 278,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: "0px" }, transition: { duration: 0.8, ease: "easeOut" }, className: "cjp-bigmarquee", "aria-hidden": true, children: /* @__PURE__ */ jsxDEV("div", { className: "cjp-bigmarquee-track", children: Array.from({ length: 3 }).map((_, k) => /* @__PURE__ */ jsxDEV("span", { children: [
      "They tried to step on us. ",
      /* @__PURE__ */ jsxDEV("em", { children: "★" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 370,
        columnNumber: 41
      }, this),
      " We came back. ",
      /* @__PURE__ */ jsxDEV("em", { children: "★" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 370,
        columnNumber: 66
      }, this),
      " We came back angrier. ",
      /* @__PURE__ */ jsxDEV("em", { children: "★" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 370,
        columnNumber: 99
      }, this),
      " हम ज़िंदा हैं ",
      /* @__PURE__ */ jsxDEV("em", { children: "★" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 370,
        columnNumber: 124
      }, this)
    ] }, k, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 369,
      columnNumber: 13
    }, this)) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 367,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 366,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { id: "vision", className: "cjp-section", children: /* @__PURE__ */ jsxDEV("div", { className: "cjp-container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { className: "cjp-h2-row", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "cjp-eyebrow", children: "Chapter 01 — The Why" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 380,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "cjp-h2", children: [
          "We are not",
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 381,
            columnNumber: 46
          }, this),
          "here to ",
          /* @__PURE__ */ jsxDEV("em", { children: "fix" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 381,
            columnNumber: 59
          }, this),
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 381,
            columnNumber: 71
          }, this),
          "the chair."
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 381,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "cjp-lede", children: "We are here to ask — loudly, repeatedly, in writing — where the money went. Then ask again next week. And the week after." }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 382,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 379,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "cjp-bento", children: [
        /* @__PURE__ */ jsxDEV(Reveal, { as: "article", delay: 0.1, className: "cjp-tile cjp-tile-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "cjp-tile-num", children: "01" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 390,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { children: "The Mission" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 391,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: "Build a party for the people who keep getting called lazy, chronically online, and — most recently — cockroaches. That's it. The rest is satire." }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 392,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 389,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { as: "article", delay: 0.2, className: "cjp-tile cjp-tile-2 cjp-tile-lime", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "cjp-tile-num", children: "02" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 395,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { children: "The Method" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 396,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: "Ask, in writing. File RTIs. Print receipts. Refuse to forget. The internet has memory. So do we." }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 397,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 394,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { as: "article", delay: 0.3, className: "cjp-tile cjp-tile-3 cjp-tile-red", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "cjp-tile-num", children: "03" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 400,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { children: "The Symbol" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 401,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: "They called us cockroaches. We made it the logo. You cannot squash a movement that already lives behind the fridge." }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 402,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 399,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { as: "article", delay: 0.4, className: "cjp-tile cjp-tile-4", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "cjp-tile-num", children: "04" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 405,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { children: "The Mood" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 406,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: "Sharp. Petty. Specific. Funny. Refuses to be polite about it." }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 407,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 404,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 388,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 378,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 377,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { id: "manifesto", className: "cjp-section cjp-section-dark", children: /* @__PURE__ */ jsxDEV("div", { className: "cjp-container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { className: "cjp-h2-row", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "cjp-eyebrow cjp-eyebrow-light", children: "Chapter 02 — The Demands" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 417,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "cjp-h2 cjp-h2-light", children: [
          "Five demands.",
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 419,
            columnNumber: 28
          }, this),
          /* @__PURE__ */ jsxDEV("em", { children: "No" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 420,
            columnNumber: 15
          }, this),
          " negotiation."
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 418,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 416,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("ol", { className: "cjp-demands", children: manifesto.map((m, i) => /* @__PURE__ */ jsxDEV(Reveal, { as: "li", delay: i * 0.15, className: "cjp-demand", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "cjp-demand-num", children: String(i + 1).padStart(2, "0") }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 426,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "cjp-demand-body", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: m.t }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 428,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: m.b }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 429,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 427,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "cjp-demand-arrow", children: "↗" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 431,
          columnNumber: 17
        }, this)
      ] }, i, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 425,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 423,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 415,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 414,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { id: "eligibility", className: "cjp-section", children: /* @__PURE__ */ jsxDEV("div", { className: "cjp-container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { className: "cjp-h2-row", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "cjp-eyebrow", children: "Chapter 03 — Eligibility" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 442,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "cjp-h2", children: [
          "Are you",
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 443,
            columnNumber: 43
          }, this),
          /* @__PURE__ */ jsxDEV("em", { children: "cockroach" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 443,
            columnNumber: 48
          }, this),
          " enough?"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 443,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "cjp-lede", children: "We do not check religion, caste, or gender. We do check these four (4) things." }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 444,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 441,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "cjp-elig", children: eligibility.map((e, i) => /* @__PURE__ */ jsxDEV(Reveal, { delay: i * 0.1, className: `cjp-elig-card e-${i}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "cjp-elig-head", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "cjp-elig-id", children: [
            "REQ / ",
            e.id
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 450,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "cjp-check", children: "✓" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 451,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 449,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { children: e.t }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 453,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { children: e.b }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 454,
          columnNumber: 17
        }, this)
      ] }, e.id, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 448,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 446,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Reveal, { delay: 0.4, children: /* @__PURE__ */ jsxDEV("p", { className: "cjp-fineprint", children: 'Membership is free, lifelong, and revocable only by you. No fees. No selfies with the leader. No "missed call to register."' }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 459,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 458,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 440,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 439,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { id: "join", className: "cjp-section cjp-section-lime", children: /* @__PURE__ */ jsxDEV("div", { className: "cjp-container cjp-join", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { className: "cjp-join-left", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "cjp-eyebrow cjp-eyebrow-dark", children: "Chapter 04 — Enlist" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 470,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "cjp-h2 cjp-h2-dark", children: [
          "Sign the",
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 472,
            columnNumber: 23
          }, this),
          "roach roll."
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 471,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "cjp-lede cjp-lede-dark", children: "Two clicks. One form. Lifelong membership. Bring your rage, your memes, your receipts." }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 474,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "cjp-hero-ctas", children: [
          /* @__PURE__ */ jsxDEV("a", { href: "#join", className: "cjp-btn cjp-btn-lime-alt", children: [
            "Open the form ",
            /* @__PURE__ */ jsxDEV("em", { children: "→" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 479,
              columnNumber: 31
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 478,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("a", { href: WA_URL, target: "_blank", rel: "noreferrer", className: "cjp-btn cjp-btn-lime-ghost", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "📱" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 482,
              columnNumber: 17
            }, this),
            " Share on WhatsApp"
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 481,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 477,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 469,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Reveal, { delay: 0.2, className: "cjp-join-card", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "cjp-join-head", children: [
          /* @__PURE__ */ jsxDEV("b", { children: "Membership Form" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 488,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("small", { children: "Cockroach Janta Party · v1" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 489,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 487,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(RegistrationForm, {}, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 491,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 486,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 468,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 467,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { id: "contact", className: "cjp-section cjp-section-dark", children: /* @__PURE__ */ jsxDEV("div", { className: "cjp-container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { className: "cjp-h2-row", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "cjp-eyebrow cjp-eyebrow-light", children: "Chapter 05 — Contact" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 500,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "cjp-h2 cjp-h2-light", children: [
          "Yell at us",
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 501,
            columnNumber: 59
          }, this),
          "(politely)."
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 501,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 499,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "cjp-contact-grid", children: [
        /* @__PURE__ */ jsxDEV(Reveal, { as: "a", delay: 0.1, href: "mailto:contact@cockroachjantaparty.org", className: "cjp-contact", children: [
          /* @__PURE__ */ jsxDEV("small", { children: "Email" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 505,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "contact@cockroachjantaparty.org" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 506,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("em", { children: "↗" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 507,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 504,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { as: "a", delay: 0.2, href: "mailto:contact@cockroachjantaparty.org", className: "cjp-contact", children: [
          /* @__PURE__ */ jsxDEV("small", { children: "Press" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 510,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "contact@cockroachjantaparty.org" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 511,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("em", { children: "↗" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 512,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 509,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { delay: 0.3, className: "cjp-contact", children: [
          /* @__PURE__ */ jsxDEV("small", { children: "HQ" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 515,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Wherever the wifi works." }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 516,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("em", { children: "📍" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 517,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 514,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { delay: 0.4, className: "cjp-contact", children: [
          /* @__PURE__ */ jsxDEV("small", { children: "Founder & Convenor" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 520,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Abhijeet Dipke" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 521,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("em", { children: "🪳" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 522,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 519,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 503,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 498,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 497,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("footer", { className: "cjp-footer", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { y: 100, delay: 0.2, children: /* @__PURE__ */ jsxDEV("div", { className: "cjp-footer-mega", children: "COCKROACH · JANTA · PARTY ·" }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 531,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 530,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "cjp-container cjp-footer-grid", children: [
        /* @__PURE__ */ jsxDEV(Reveal, { delay: 0.1, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "cjp-brand cjp-brand-foot", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "cjp-brand-roach", children: "🪳" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 536,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "cjp-brand-text", children: [
              /* @__PURE__ */ jsxDEV("b", { children: "CJP" }, void 0, false, {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 537,
                columnNumber: 48
              }, this),
              /* @__PURE__ */ jsxDEV("i", { children: "since now" }, void 0, false, {
                fileName: "/app/applet/src/routes/index.tsx",
                lineNumber: 537,
                columnNumber: 58
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 537,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 535,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: "Sponsored by no one. Funded by nothing. HQ: wherever the wifi works." }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 539,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 534,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { delay: 0.2, children: [
          /* @__PURE__ */ jsxDEV("small", { children: "Sitemap" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 542,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { children: [
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#vision", children: "Vision" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 544,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 544,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#manifesto", children: "Manifesto" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 545,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 545,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#eligibility", children: "Eligibility" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 546,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 546,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#join", children: "Join" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 547,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 547,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#contact", children: "Contact" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 548,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 548,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 543,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 541,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { delay: 0.3, children: [
          /* @__PURE__ */ jsxDEV("small", { children: "Channels" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 552,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { children: [
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: WA_URL, target: "_blank", rel: "noreferrer", children: "WhatsApp ↗" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 554,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 554,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#", target: "_blank", rel: "noreferrer", children: "Twitter / X ↗" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 555,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 555,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#", target: "_blank", rel: "noreferrer", children: "Instagram ↗" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 556,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 556,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#", target: "_blank", rel: "noreferrer", children: "YouTube ↗" }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 557,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/routes/index.tsx",
              lineNumber: 557,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 553,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 551,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Reveal, { delay: 0.4, children: [
          /* @__PURE__ */ jsxDEV("small", { children: "Legal-ish" }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 561,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "cjp-disclaimer", children: "Satire, dissent, and chitin. Filed under General Disgruntlement. Now accepting rants, retweets, and resentment." }, void 0, false, {
            fileName: "/app/applet/src/routes/index.tsx",
            lineNumber: 562,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 560,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 533,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "cjp-footer-bottom", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " CJP"
        ] }, void 0, true, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 568,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Made with ❤️ and chitin by a proud Cockroach Janta Party member" }, void 0, false, {
          fileName: "/app/applet/src/routes/index.tsx",
          lineNumber: 569,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/routes/index.tsx",
        lineNumber: 567,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/routes/index.tsx",
      lineNumber: 529,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/routes/index.tsx",
    lineNumber: 232,
    columnNumber: 5
  }, this);
}
const cjpCss = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700;900&family=Space+Mono:wght@400;700&family=Hind:wght@400;700&display=swap');

.cjp {
  --ink: #0a0a0a;
  --paper: #f5f5f0;
  --lime: #c8ff00;
  --red: #ff3d00;
  --grey: #1a1a1a;
  --muted: #6b6b6b;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Inter', system-ui, 'Hind', sans-serif;
  min-height: 100vh;
  overflow-x: clip;
  position: relative;
  -webkit-font-smoothing: antialiased;
}
.cjp * { box-sizing: border-box; }
.cjp a { color: inherit; text-decoration: none; }
.cjp-container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; position: relative; }

/* GRAIN */
.cjp-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.5; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>");
}

/* CURSOR */
.cjp-cursor {
  position: fixed; left: 0; top: 0; width: 28px; height: 28px; border-radius: 50%;
  background: var(--lime); mix-blend-mode: difference; z-index: 9999; pointer-events: none;
  box-shadow: 0 0 0 2px var(--ink); transition: width .2s, height .2s;
}
@media (hover: none) { .cjp-cursor { display: none; } }

/* TICKER */
.cjp-ticker { background: var(--ink); color: var(--paper); border-bottom: 2px solid var(--ink); overflow: hidden; position: relative; z-index: 3; }
.cjp-ticker-track {
  display: inline-flex; gap: 2.5rem; padding: 0.6rem 0; white-space: nowrap;
  animation: cjp-marquee 38s linear infinite; font-family: 'Space Mono', monospace; font-size: 0.78rem; letter-spacing: 0.1em;
}
.cjp-ticker-item em { color: var(--lime); font-style: normal; margin-left: 0.4rem; }
@keyframes cjp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* NAV */
.cjp-nav {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 1rem 1.5rem; background: var(--paper);
  border-bottom: 4px solid var(--ink); box-shadow: 0 8px 0 rgba(10,10,10,0.1);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}
.cjp-nav-bg {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  opacity: 0.2; mix-blend-mode: luminosity;
}
.cjp-nav-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
.cjp-nav > *:not(.cjp-nav-bg) { position: relative; z-index: 1; text-shadow: 0 0 10px var(--paper), 0 0 5px var(--paper); }
.cjp-brand { display: flex; align-items: center; gap: 0.8rem; }
.cjp-brand-roach { font-size: 2rem; display: inline-block; animation: cjp-wiggle 3s ease-in-out infinite; filter: drop-shadow(2px 2px 0 var(--ink)); }
.cjp-brand-text b { font-family: 'Archivo Black', sans-serif; font-size: 1.2rem; letter-spacing: 0.02em; line-height: 1; display: block; text-transform: uppercase; }
.cjp-brand-text i { font-family: 'Space Mono', monospace; font-style: normal; font-size: 0.7rem; color: var(--ink); display: block; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: bold; }
.cjp-nav-pill { display: flex; gap: 0.25rem; padding: 0.4rem; border: 3px solid var(--ink); border-radius: 999px; background: var(--paper); box-shadow: 4px 4px 0 var(--ink); }
.cjp-nav-pill a { font-family: 'Space Mono', monospace; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.6rem 1.2rem; border-radius: 999px; transition: all .2s; font-weight: bold; }
.cjp-nav-pill a:hover { background: var(--lime); color: var(--ink); transform: scale(1.05); }
.cjp-nav-cta {
  display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1.4rem;
  background: var(--lime); color: var(--ink) !important; border: 3px solid var(--ink);
  font-family: 'Archivo Black', sans-serif; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em;
  border-radius: 999px; box-shadow: 5px 5px 0 var(--ink); transition: transform .15s, box-shadow .15s;
}
.cjp-nav-cta:hover { transform: translate(-3px, -3px); box-shadow: 8px 8px 0 var(--ink); background: var(--red); color: var(--paper) !important; }
.cjp-nav-cta em { font-style: normal; font-size: 1.2em; transition: transform .2s; }
.cjp-nav-cta:hover em { transform: translateX(4px); }
@media (max-width: 820px) { .cjp-nav-pill { display: none; } }
@media (max-width: 600px) {
  .cjp-nav { padding: 0.75rem 1rem; border-bottom: 3px solid var(--ink); gap: 0.5rem; }
  .cjp-brand { gap: 0.5rem; }
  .cjp-brand-roach { font-size: 1.6rem; }
  .cjp-brand-text b { font-size: 1rem; }
  .cjp-brand-text i { font-size: 0.6rem; display: none; }
  .cjp-nav-cta { padding: 0.6rem 1rem; font-size: 0.75rem; border-width: 2px; box-shadow: 3px 3px 0 var(--ink); gap: 0.4rem; }
  .cjp-nav-cta span { display: none; }
  .cjp-nav-cta::before { content: 'Join Swarm'; }
}

/* HERO */
.cjp-hero { position: relative; padding: 4rem 1.5rem 3rem; z-index: 2; overflow: hidden; }
.cjp-hero-grid { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.15fr 1fr; gap: 3.5rem; align-items: center; }
@media (max-width: 900px) { .cjp-hero-grid { grid-template-columns: 1fr; gap: 3rem; } }
@media (max-width: 600px) { .cjp-hero { padding: 2rem 1.25rem 2rem; } }
.cjp-hero-tag {
  display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.5rem 1rem;
  background: var(--ink); color: var(--paper);
  font-family: 'Space Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em;
  border-radius: 999px; box-shadow: 4px 4px 0 var(--lime); transform: rotate(-2deg); margin-bottom: 0.5rem;
}
@media (max-width: 600px) { .cjp-hero-tag { font-size: 0.65rem; padding: 0.4rem 0.8rem; } }
.cjp-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--lime); animation: cjp-pulse 1.4s ease-in-out infinite; }
@keyframes cjp-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }

.cjp-h1 {
  margin: 1.25rem 0 1.5rem;
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(3rem, 11vw, 8.5rem); line-height: 0.82; letter-spacing: -0.05em;
  text-transform: uppercase; position: relative;
}
.cjp-word { display: block; filter: drop-shadow(4px 4px 0 rgba(0,0,0,0.1)); }
.cjp-word.l1 { color: var(--ink); transform: translateX(-10px); }
.cjp-word.l2 { color: var(--ink); padding-left: 0.5em; z-index: 2; position: relative; }
.cjp-word.l2 i { font-style: italic; font-family: 'Inter', serif; font-weight: 900; background: var(--lime); padding: 0.05em 0.3em; transform: rotate(-3deg) translateY(-8px); display: inline-block; border: 3px solid var(--ink); box-shadow: 4px 4px 0 var(--ink); }
.cjp-word.l3 { font-family: 'Hind', sans-serif; font-weight: 700; color: var(--paper); -webkit-text-stroke: 2px var(--ink); font-size: 0.7em; padding-left: 0.6em; margin-top: -10px; position: relative; z-index: 1;}
.cjp-accent { color: var(--red); }
.cjp-strike { position: relative; opacity: 0.7; color: var(--ink); -webkit-text-stroke: 0; }
.cjp-strike::after { content: ''; position: absolute; left: -10%; right: -10%; top: 50%; height: 8px; background: var(--red); transform: rotate(-8deg); }

.cjp-sub { font-size: clamp(1.1rem, 1.5vw, 1.3rem); max-width: 540px; line-height: 1.6; color: var(--grey); border-left: 4px solid var(--lime); padding-left: 1.25rem; }
.cjp-sub b { color: var(--ink); font-weight: 900; font-size: 1.1em;}
.cjp-sub span { color: var(--ink); opacity: 0.8; font-family: 'Space Mono', monospace; font-size: 0.85em; text-transform: uppercase; display: inline-block; margin-top: 0.5rem; font-weight: bold;}

.cjp-hero-ctas { display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
.cjp-btn {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 1.1rem 1.6rem; border: 3px solid var(--ink);
  font-family: 'Archivo Black', sans-serif; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em;
  border-radius: 999px; transition: transform .2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow .2s;
  cursor: pointer; position: relative; overflow: hidden;
}
@media (max-width: 600px) { .cjp-btn { padding: 0.9rem 1.25rem; font-size: 0.85rem; border-width: 2px; text-align: center; justify-content: center; width: 100%; max-width: 320px;} .cjp-hero-ctas { flex-direction: column; width: 100%; align-items: flex-start; } }
.cjp-btn em { font-style: normal; transition: transform .2s; font-size: 1.2em; }
.cjp-btn:hover em { transform: translateX(6px); }
.cjp-btn-primary { background: var(--lime); color: var(--ink); box-shadow: 6px 6px 0 var(--ink); }
.cjp-btn-primary:active { transform: translate(2px,2px); box-shadow: 4px 4px 0 var(--ink); }
.cjp-btn-primary:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 var(--ink); background: var(--red); color: var(--paper); }
.cjp-btn-ghost { background: var(--paper); color: var(--ink); box-shadow: 6px 6px 0 rgba(0,0,0,0.1); }
.cjp-btn-ghost:hover { background: var(--ink); color: var(--paper); box-shadow: 8px 8px 0 var(--lime); }
.cjp-btn-num { background: var(--red); color: var(--paper); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.85rem; transform: rotate(-5deg); display: inline-block;}
.cjp-btn-dark { background: var(--ink); color: var(--paper); box-shadow: 6px 6px 0 var(--lime); }
.cjp-btn-dark:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 var(--lime); background: var(--red); }
.cjp-btn-ghost-dark { background: transparent; color: var(--paper); border-color: var(--paper); box-shadow: 6px 6px 0 rgba(255,255,255,0.2); }
.cjp-btn-ghost-dark:hover { background: var(--paper); color: var(--ink); border-color: var(--paper); box-shadow: 8px 8px 0 var(--lime); }
.cjp-btn-lime-alt { background: var(--ink); color: var(--paper); box-shadow: 6px 6px 0 var(--paper); }
.cjp-btn-lime-alt:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 var(--paper); background: var(--red); color: var(--paper); }
.cjp-btn-lime-ghost { background: transparent; color: var(--ink); border-color: var(--ink); box-shadow: 6px 6px 0 rgba(0,0,0,0.1); }
.cjp-btn-lime-ghost:hover { background: var(--paper); color: var(--ink); border-color: var(--ink); box-shadow: 8px 8px 0 var(--ink); }
.cjp-btn-block { display: flex; justify-content: center; width: 100%; margin-top: 1rem; }

/* HERO STAGE */
.cjp-hero-stage { position: relative; aspect-ratio: 1/1; max-width: 540px; margin: 0 auto; perspective: 1000px; }
.cjp-stage-bg { position: absolute; inset: 0; border: 4px solid var(--ink); border-radius: 40px; overflow: hidden; background: var(--lime); box-shadow: 16px 16px 0 var(--ink); transform: rotateZ(1deg); transition: transform 0.4s ease; }
.cjp-hero-stage:hover .cjp-stage-bg { transform: rotateZ(-1deg) scale(1.02); }
@media (max-width: 600px) {
  .cjp-hero-stage { max-width: 380px; margin-top: 1rem; width: 100%; }
  .cjp-stage-bg { box-shadow: 8px 8px 0 var(--ink); border-width: 3px; border-radius: 24px; }
}
.cjp-blob { position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.8; mix-blend-mode: multiply; }
.cjp-blob.b1 { width: 60%; height: 60%; background: var(--red); top: -10%; right: -10%; animation: cjp-float 9s ease-in-out infinite; }
.cjp-blob.b2 { width: 50%; height: 50%; background: #00d4ff; bottom: -15%; left: -10%; animation: cjp-float 11s ease-in-out infinite reverse; }
.cjp-cross-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(var(--ink) 1px, transparent 1px),
    linear-gradient(90deg, var(--ink) 1px, transparent 1px);
  background-size: 40px 40px; opacity: 0.08;
}
.cjp-roach-wrap { position: absolute; inset: 0; display: grid; place-items: center; }
.cjp-roach { animation: cjp-bob 3.5s ease-in-out infinite; filter: drop-shadow(8px 8px 0 var(--ink)); position: relative; z-index: 2; }
.cjp-roach-shadow { position: absolute; bottom: 12%; left: 50%; width: 60%; height: 12px; background: var(--ink); opacity: 0.35; border-radius: 50%; filter: blur(6px); transform: translateX(-50%); animation: cjp-shadow 3.5s ease-in-out infinite; }
@keyframes cjp-bob { 0%,100% { transform: translateY(-6px) rotate(-1deg); } 50% { transform: translateY(6px) rotate(2deg); } }
@keyframes cjp-shadow { 0%,100% { transform: translateX(-50%) scale(1); opacity: 0.35; } 50% { transform: translateX(-50%) scale(0.7); opacity: 0.55; } }
@keyframes cjp-wiggle { 0%,100% { transform: rotate(-12deg); } 50% { transform: rotate(15deg); } }
@keyframes cjp-float { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-20px); } }
.cjp-antenna { animation: cjp-antenna 1.6s ease-in-out infinite; }
.cjp-antenna.a-r { animation-delay: -0.8s; }
@keyframes cjp-antenna { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
.cjp-leg { animation: cjp-leg 0.55s ease-in-out infinite; }
.cjp-leg.L0, .cjp-leg.R1 { animation-delay: -0.15s; }
.cjp-leg.L1, .cjp-leg.R2 { animation-delay: -0.3s; }
.cjp-leg.L2, .cjp-leg.R0 { animation-delay: -0.45s; }
@keyframes cjp-leg { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }

/* STAMPS */
.cjp-stamp {
  position: absolute; display: grid; place-items: center; border-radius: 50%;
  font-family: 'Archivo Black', sans-serif; text-transform: uppercase; text-align: center;
  font-size: 0.8rem; line-height: 1; padding: 0.4rem; z-index: 3; box-shadow: 6px 6px 0 var(--ink);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cjp-stamp:hover { transform: scale(1.1) rotate(0deg) !important; z-index: 10; cursor: default; }
.cjp-stamp-1 { top: 2%; right: -2%; width: 110px; height: 110px; background: var(--red); color: var(--paper); transform: rotate(15deg); border: 3px solid var(--ink); }
.cjp-stamp-2 { bottom: 4%; right: -4%; width: 90px; height: 90px; background: var(--ink); color: var(--lime); transform: rotate(-12deg); border: 3px solid var(--ink); }
.cjp-stamp-3 { top: 35%; left: -8%; width: 95px; height: 95px; background: var(--paper); color: var(--ink); border: 3px solid var(--ink); transform: rotate(-10deg); }
.cjp-stamp span { display: block; filter: drop-shadow(1px 1px 0 rgba(0,0,0,0.2)); }
@media (max-width: 600px) {
  .cjp-stamp { font-size: 0.6rem; border-width: 2px !important; box-shadow: 4px 4px 0 var(--ink) !important; }
  .cjp-stamp-1 { width: 80px; height: 80px; top: -5%; right: -5%; }
  .cjp-stamp-2 { width: 70px; height: 70px; bottom: 0%; right: -5%; }
  .cjp-stamp-3 { width: 75px; height: 75px; left: -5%; top: 40%; }
}

/* RIBBON */
.cjp-ribbon {
  margin-top: 4.5rem;
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-top: 4px solid var(--ink); border-bottom: 4px solid var(--ink);
  background: var(--paper); color: var(--ink); box-shadow: 0 12px 0 var(--ink); position: relative; z-index: 5;
}
.cjp-ribbon > div { padding: 1.5rem 1.25rem; border-right: 2px solid var(--ink); transition: background 0.3s; }
.cjp-ribbon > div:hover { background: var(--lime); cursor: default; }
.cjp-ribbon > div:last-child { border-right: none; }
.cjp-ribbon b { font-family: 'Archivo Black', sans-serif; font-size: clamp(2.5rem, 5vw, 3.8rem); display: block; line-height: 0.9; text-shadow: 3px 3px 0 var(--lime); }
.cjp-ribbon > div:hover b { text-shadow: 3px 3px 0 var(--paper); }
.cjp-ribbon span { font-family: 'Space Mono', monospace; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); margin-top: 0.5rem; display: block; font-weight: bold; }
@media (max-width: 720px) { .cjp-ribbon { grid-template-columns: repeat(2, 1fr); border-bottom: 2px solid var(--ink); box-shadow: 0 8px 0 var(--ink); } .cjp-ribbon > div:nth-child(2) { border-right: none; } .cjp-ribbon > div:nth-child(1), .cjp-ribbon > div:nth-child(2) { border-bottom: 2px solid var(--ink); } }

/* BIG MARQUEE */
.cjp-bigmarquee { background: var(--lime); color: var(--ink); overflow: hidden; border-bottom: 2px solid var(--ink); position: relative; z-index: 2; }
.cjp-bigmarquee-track {
  display: inline-flex; gap: 2.5rem; padding: 1.25rem 0; white-space: nowrap;
  animation: cjp-marquee 28s linear infinite;
  font-family: 'Archivo Black', sans-serif; font-size: clamp(1.5rem, 3vw, 2.5rem); text-transform: uppercase; letter-spacing: -0.01em;
}
.cjp-bigmarquee-track em { font-style: normal; color: var(--red); }

/* SECTIONS */
.cjp-section { padding: 5rem 0; position: relative; z-index: 2; }
@media (max-width: 600px) { .cjp-section { padding: 3rem 0; } }
.cjp-section-dark { background: var(--ink); color: var(--paper); }
.cjp-section-lime { background: var(--lime); color: var(--ink); }
.cjp-h2-row { max-width: 900px; margin-bottom: 3rem; }
@media (max-width: 600px) { .cjp-h2-row { margin-bottom: 2rem; } }
.cjp-eyebrow {
  display: inline-block; font-family: 'Space Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.18em;
  background: var(--ink); color: var(--paper); padding: 0.35rem 0.75rem; border-radius: 4px;
}
.cjp-eyebrow-light { background: var(--lime); color: var(--ink); }
.cjp-eyebrow-dark { background: var(--ink); color: var(--lime); }
.cjp-h2 {
  font-family: 'Archivo Black', sans-serif; font-size: clamp(2.2rem, 8vw, 5.5rem);
  line-height: 0.92; letter-spacing: -0.03em; margin: 1rem 0 1.25rem; text-transform: uppercase;
}
.cjp-h2 em { font-style: italic; background: var(--lime); padding: 0 0.2em; display: inline-block; transform: rotate(-2deg); }
.cjp-h2-light em { background: var(--lime); color: var(--ink); }
.cjp-h2-dark em { background: var(--ink); color: var(--lime); }
.cjp-lede { font-size: clamp(1rem, 1.3vw, 1.2rem); max-width: 640px; color: var(--grey); line-height: 1.55; }
.cjp-lede-dark { color: var(--ink); opacity: 0.85; }
.cjp-section-dark .cjp-lede { color: #b9b9b9; }

/* BENTO */
.cjp-bento { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; }
.cjp-tile {
  border: 2px solid var(--ink); border-radius: 24px; padding: 1.75rem;
  background: var(--paper); position: relative; transition: transform .3s, box-shadow .3s;
  min-height: 220px; display: flex; flex-direction: column; justify-content: space-between;
}
.cjp-tile:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 var(--ink); }
.cjp-tile-1 { grid-column: span 4; transform: rotate(-0.4deg); }
.cjp-tile-2 { grid-column: span 2; transform: rotate(0.6deg); }
.cjp-tile-3 { grid-column: span 2; transform: rotate(-0.3deg); }
.cjp-tile-4 { grid-column: span 4; transform: rotate(0.4deg); }
.cjp-tile-lime { background: var(--lime); }
.cjp-tile-red { background: var(--red); color: var(--paper); }
.cjp-tile-num { font-family: 'Space Mono', monospace; font-size: 0.85rem; opacity: 0.7; }
.cjp-tile h3 { font-family: 'Archivo Black', sans-serif; font-size: clamp(1.4rem, 2.2vw, 1.9rem); line-height: 1; margin: 0.75rem 0 0.6rem; text-transform: uppercase; }
.cjp-tile p { font-size: 0.95rem; line-height: 1.5; }
@media (max-width: 820px) {
  .cjp-bento { grid-template-columns: 1fr; }
  .cjp-tile-1, .cjp-tile-2, .cjp-tile-3, .cjp-tile-4 { grid-column: span 1; transform: none; }
}

/* DEMANDS */
.cjp-demands { list-style: none; margin: 0; padding: 0; border-top: 1px solid #2a2a2a; }
.cjp-demand {
  display: grid; grid-template-columns: 120px 1fr 60px; gap: 1.5rem; align-items: center;
  padding: 2rem 0.5rem; border-bottom: 1px solid #2a2a2a;
  cursor: pointer; transition: padding .3s, background .3s;
}
.cjp-demand:hover { padding-left: 1.5rem; padding-right: 1.5rem; background: #111; }
.cjp-demand:hover .cjp-demand-num { color: var(--lime); }
.cjp-demand:hover .cjp-demand-arrow { transform: translate(6px,-6px) rotate(0); color: var(--lime); }
.cjp-demand-num { font-family: 'Archivo Black', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1; color: #444; transition: color .3s; }
.cjp-demand-body h3 { font-family: 'Archivo Black', sans-serif; font-size: clamp(1.3rem, 2.4vw, 2rem); text-transform: uppercase; line-height: 1.05; margin: 0 0 0.5rem; }
.cjp-demand-body p { color: #b9b9b9; line-height: 1.55; max-width: 700px; }
.cjp-demand-arrow { font-size: 2rem; color: #555; transition: transform .3s, color .3s; transform: rotate(0); justify-self: end; }
@media (max-width: 700px) {
  .cjp-demand { grid-template-columns: 50px 1fr; gap: 1rem; padding: 1.5rem 0.25rem; align-items: flex-start;}
  .cjp-demand:hover { padding-left: 0.5rem; padding-right: 0.5rem; }
  .cjp-demand-arrow { display: none; }
  .cjp-demand-num { font-size: 2rem; line-height: 1.1; }
  .cjp-demand-body h3 { font-size: 1.15rem; }
}

/* ELIG */
.cjp-elig { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.cjp-elig-card {
  border: 2px solid var(--ink); border-radius: 20px; padding: 1.5rem; background: var(--paper);
  transition: transform .3s, box-shadow .3s, background .3s;
}
.cjp-elig-card:hover { transform: translateY(-6px); box-shadow: 6px 6px 0 var(--ink); background: var(--lime); }
.cjp-elig-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.cjp-elig-id { font-family: 'Space Mono', monospace; font-size: 0.7rem; opacity: 0.65; letter-spacing: 0.1em; }
.cjp-check { width: 28px; height: 28px; border-radius: 50%; background: var(--ink); color: var(--lime); display: grid; place-items: center; font-weight: 900; }
.cjp-elig-card h3 { font-family: 'Archivo Black', sans-serif; font-size: 1.4rem; line-height: 1; margin: 0 0 0.5rem; text-transform: uppercase; }
.cjp-elig-card p { font-size: 0.92rem; line-height: 1.5; color: var(--grey); }
.cjp-fineprint { margin-top: 2rem; font-family: 'Space Mono', monospace; font-size: 0.82rem; color: var(--muted); text-align: center; border-top: 1px dashed var(--ink); padding-top: 1.5rem; }
@media (max-width: 900px) { .cjp-elig { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .cjp-elig { grid-template-columns: 1fr; } }

/* JOIN */
.cjp-join { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: center; }
@media (max-width: 900px) { .cjp-join { grid-template-columns: 1fr; } }
.cjp-join-card {
  background: var(--paper); border: 2px solid var(--ink); border-radius: 24px; padding: 2rem;
  box-shadow: 10px 10px 0 var(--ink); transform: rotate(0.8deg);
}
.cjp-join-head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed var(--ink); padding-bottom: 0.75rem; margin-bottom: 1rem; }
.cjp-join-head b { font-family: 'Archivo Black', sans-serif; text-transform: uppercase; }
.cjp-join-head small { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--muted); }
.cjp-join-qs { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.cjp-join-qs li { display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.95rem; line-height: 1.4; }
.cjp-join-qs li span { font-family: 'Space Mono', monospace; font-size: 0.75rem; background: var(--ink); color: var(--lime); padding: 0.15rem 0.4rem; border-radius: 4px; flex: none; }
.cjp-join-qs li em { font-style: italic; color: var(--muted); }
.cjp-form-note { display: block; margin-top: 0.75rem; text-align: center; font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--muted); }
@media (max-width: 600px) {
  .cjp-join-card { padding: 1.5rem; box-shadow: 6px 6px 0 var(--ink); border-radius: 16px; transform: none; }
  .cjp-join-qs li { flex-direction: column; gap: 0.35rem; margin-bottom: 0.5rem; }
  .cjp-join-head { flex-direction: column; gap: 0.25rem; }
}

/* CONTACT */
.cjp-contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.cjp-contact {
  display: grid; grid-template-columns: 100px 1fr 40px; gap: 1rem; align-items: center;
  padding: 1.5rem; border: 1px solid #2a2a2a; border-radius: 16px;
  transition: background .25s, border-color .25s, transform .25s; color: var(--paper); text-decoration: none;
}
.cjp-contact:hover { background: #111; border-color: var(--lime); transform: translateY(-3px); }
.cjp-contact small { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: #888; letter-spacing: 0.08em; text-transform: uppercase; }
.cjp-contact span { font-family: 'Archivo Black', sans-serif; font-size: 1rem; text-transform: uppercase; word-break: break-word; min-width: 0; }
.cjp-contact em { font-style: normal; font-size: 1.4rem; justify-self: end; }
@media (max-width: 700px) {
  .cjp-contact-grid { grid-template-columns: 1fr; }
  .cjp-contact { display: flex; flex-direction: column; align-items: flex-start; padding: 1.25rem; position: relative; gap: 0.25rem; }
  .cjp-contact small { font-size: 0.7rem; }
  .cjp-contact span { font-size: 0.85rem; max-width: 85%; }
  .cjp-contact em { position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%); font-size: 1.2rem; }
}

/* FOOTER */
.cjp-footer { background: var(--ink); color: var(--paper); padding-top: 3rem; position: relative; z-index: 2; overflow: hidden; }
.cjp-footer-mega {
  font-family: 'Archivo Black', sans-serif; font-size: clamp(3rem, 14vw, 14rem); line-height: 0.85;
  letter-spacing: -0.04em; white-space: nowrap; overflow: hidden;
  color: transparent; -webkit-text-stroke: 2px var(--lime); padding: 0 1rem;
  user-select: none;
}
@media (max-width: 600px) { .cjp-footer-mega { -webkit-text-stroke: 1px var(--lime); font-size: 16vw; } }
.cjp-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 2rem; padding-top: 3rem; padding-bottom: 2rem; }
.cjp-footer-grid small { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: #888; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 0.75rem; }
.cjp-footer-grid ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.cjp-footer-grid a:hover { color: var(--lime); }
.cjp-footer-grid p { color: #b9b9b9; font-size: 0.9rem; line-height: 1.5; max-width: 320px; }
.cjp-disclaimer { font-family: 'Space Mono', monospace !important; font-size: 0.78rem !important; }
.cjp-brand-foot { margin-bottom: 0.75rem; }
.cjp-footer-bottom {
  border-top: 1px solid #2a2a2a; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; gap: 1rem;
  font-family: 'Space Mono', monospace; font-size: 0.75rem; color: #888; flex-wrap: wrap; text-align: center;
}
@media (max-width: 820px) { .cjp-footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 520px) { .cjp-footer-grid { grid-template-columns: 1fr; gap: 2.5rem; padding-top: 2rem; } .cjp-footer-bottom { justify-content: center; } }

/* Removed .cjp-reveal */

@media (prefers-reduced-motion: reduce) {
  .cjp-roach, .cjp-roach-shadow, .cjp-blob, .cjp-dot, .cjp-brand-roach,
  .cjp-antenna, .cjp-leg, .cjp-ticker-track, .cjp-bigmarquee-track { animation: none !important; }
  .cjp-reveal { opacity: 1; transform: none; transition: none; }
}
`;
const SitemapDotxmlRoute = Route$1.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$2
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  SitemapDotxmlRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
