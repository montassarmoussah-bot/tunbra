// ─────────────────────────────────────────────────────────────
//  PASTE YOUR FIREBASE CONFIG HERE
//  Go to Firebase Console → Project Settings → Your apps → SDK setup
//  Copy the firebaseConfig object and replace below
// ─────────────────────────────────────────────────────────────
import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "REPLACE_ME",
  authDomain:        "REPLACE_ME",
  projectId:         "REPLACE_ME",
  storageBucket:     "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId:             "REPLACE_ME",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
