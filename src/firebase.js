import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyDXURq-SEtBLRUuZP_Qmka22WE6kDXlcms",
  authDomain:        "tunbra-af4fa.firebaseapp.com",
  projectId:         "tunbra-af4fa",
  storageBucket:     "tunbra-af4fa.firebasestorage.app",
  messagingSenderId: "895997639518",
  appId:             "1:895997639518:web:5afd10b7e9cabf85aa2dcf",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
