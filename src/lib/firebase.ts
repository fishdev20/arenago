import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAZOb0X2D8U4I2L6s6LL4yAVzLkPongJWQ',
  authDomain: 'arenago-842a7.firebaseapp.com',
  projectId: 'arenago-842a7',
  storageBucket: 'arenago-842a7.firebasestorage.app',
  messagingSenderId: '226749872223',
  appId: '1:226749872223:web:fcf73dd7b83f3143a203ea',
  measurementId: 'G-W3QPL57F99',
}

// Avoid initializing multiple times during hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true })
export const storage = getStorage(app)

export const googleProvider = new GoogleAuthProvider()
