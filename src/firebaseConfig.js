
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNL_d8AdyNjT3JCFxvYK0P_F9n4OhNzHc",
  authDomain: "chatgo-76851.firebaseapp.com",
  projectId: "chatgo-76851",
  storageBucket: "chatgo-76851.appspot.com",
  messagingSenderId: "95922547637",
  appId: "1:95922547637:web:a565af3a92f87b3c0a47fc",
  measurementId: "G-8C247LX1SP"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };