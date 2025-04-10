import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Check if Firebase credentials are available
const firebaseConfig = {
  apiKey: "AIzaSyBX99ENh0ReOay6ceXzqdMjPGSDiGo1t0A",
  authDomain: "businessmanagementapp-979dc.firebaseapp.com",
  projectId: "businessmanagementapp-979dc",
  storageBucket: "businessmanagementapp-979dc.firebasestorage.app",
  messagingSenderId: "762025387118",
  appId: "1:762025387118:web:83a29686ceb635c440727f",
  measurementId: "G-2V6NFXQ0L1"
};

let app, analytics, auth, db, storage;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn('Firebase configuration not found. Running in development mode without Firebase.');
  
  // Mock Firebase services
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => callback(null),
    signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase not configured')),
    createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase not configured')),
    signOut: () => Promise.resolve()
  };

  db = {
    collection: () => ({
      add: () => Promise.reject(new Error('Firebase not configured')),
      get: () => Promise.reject(new Error('Firebase not configured')),
      doc: () => ({
        set: () => Promise.reject(new Error('Firebase not configured')),
        update: () => Promise.reject(new Error('Firebase not configured')),
        delete: () => Promise.reject(new Error('Firebase not configured'))
      })
    })
  };

  storage = {
    ref: () => ({
      put: () => Promise.reject(new Error('Firebase not configured')),
      getDownloadURL: () => Promise.reject(new Error('Firebase not configured'))
    })
  };

  app = { auth: () => auth };
}

export {
  auth,
  db,
  storage,
  analytics,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};

export default app;
