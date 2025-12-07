// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyD66aIVOTVco6rTtpVinkl64UZGnZDgn1o",
  authDomain: "firezone-elite.firebaseapp.com",
  databaseURL: "https://firezone-elite-default-rtdb.firebaseio.com",
  projectId: "firezone-elite",
  storageBucket: "firezone-elite.firebasestorage.app",
  messagingSenderId: "121224317328",
  appId: "1:121224317328:web:a4d19bab51fc8076400b15",
  measurementId: "G-9YR0LYN37X"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
