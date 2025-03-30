// firebase-config.js
// Replace these placeholder values with your Firebase project's configuration.
const firebaseConfig = {
  apiKey: "AIzaSyANsd06edEXRFaI_zxXxao3QX-XUMj6Jas",  // Your API key
  authDomain: "people-of-interest-e1889.firebaseapp.com",  // Your Firebase auth domain
  projectId: "people-of-interest-e1889",  // Your project ID
  storageBucket: "people-of-interest-e1889.firebasestorage.app",  // Your storage bucket
  messagingSenderId: "870008211518",  // Your messaging sender ID
  appId: "1:870008211518:web:13f31604eaeb02f15de96f"  // Your app ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
