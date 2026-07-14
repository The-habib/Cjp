import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

let apiKey = "";
try {
  // Vite static replacement will inline this in the browser
  apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
} catch {
  // Fallback for Node.js (e.g. tsx prerender.ts) where import.meta.env is undefined
  if (typeof process !== "undefined" && process.env) {
    apiKey = process.env.VITE_FIREBASE_API_KEY || "";
  }
}

const fullFirebaseConfig = {
  ...firebaseConfig,
  apiKey,
};

const app = initializeApp(fullFirebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
