import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQAehADk4BxQIm-08G3X0fdmbMnkDwp4w",
  authDomain: "qwik-kanban.firebaseapp.com",
  projectId: "qwik-kanban",
  storageBucket: "qwik-kanban.appspot.com",
  messagingSenderId: "951811863377",
  appId: "1:951811863377:web:dcec5db9dfe9f3a4fd5970",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
