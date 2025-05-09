import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAA1DIuzVJpBhJDYg2kREFnFynFiFyyKgU",
  projectId: "pockit-a2754",
  storageBucket: "pockit-a2754.firebasestorage.app",
  messagingSenderId: "643973537125",
  appId: "1:643973537125:android:45964c738862b5ff56158c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app; 