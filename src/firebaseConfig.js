import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjXo4SpgFQ5tyFTK-nMDYrV1gajHzyWtQ",
  authDomain: "todo-app-d6e6b.firebaseapp.com",
  projectId: "todo-app-d6e6b",
  storageBucket: "todo-app-d6e6b.firebasestorage.app",
  messagingSenderId: "665564388728",
  appId: "1:665564388728:web:33b13394f7698ffaab3c8d",
  measurementId: "G-ZDVHQ26K60"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

