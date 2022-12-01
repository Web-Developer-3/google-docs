import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB7UZ9ED1irdQ85rORbdpP-ET4md7bFOTk",
  authDomain: "docs-6d746.firebaseapp.com",
  projectId: "docs-6d746",
  storageBucket: "docs-6d746.appspot.com",
  messagingSenderId: "124668851610",
  appId: "1:124668851610:web:9d713de6354555acb2f623",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)