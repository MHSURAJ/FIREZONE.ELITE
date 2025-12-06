// firebase.js (COMMON FILE)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, get, set } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD66aIVOTVco6rTtpVinkl64UZGnZDgn1o",
  authDomain: "firezone-elite.firebaseapp.com",
  databaseURL: "https://firezone-elite-default-rtdb.firebaseio.com/",
  projectId: "firezone-elite",
  storageBucket: "firezone-elite.appspot.com",
  messagingSenderId: "121224317328",
  appId: "1:121224317328:web:a4d19bab51fc8076400b15",
  measurementId: "G-9YR0LYN37X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);

// Role Fetch Function
export async function getUserRole(uid) {
  const snap = await get(ref(db, "users/" + uid + "/role"));
  if (snap.exists()) return snap.val();
  return null;
}

// Create user database entry (if new)
export function createUserIfNotExists(uid, name, email) {
  set(ref(db, "users/" + uid), {
    name: name,
    email: email,
    role: "player"            // default role
  });
}
