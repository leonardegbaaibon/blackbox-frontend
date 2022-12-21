// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDbBTLvWhFpBeu5eJuy1hx0BceEsJTI6qU',
  authDomain: 'tsaron-technologies.firebaseapp.com',
  projectId: 'tsaron-technologies',
  storageBucket: 'tsaron-technologies.appspot.com',
  messagingSenderId: '659212583390',
  appId: '1:659212583390:web:46360c0bdeb9db83729d4f',
  measurementId: 'G-B3SNNS6ZCT',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const messaging = getMessaging(app)
