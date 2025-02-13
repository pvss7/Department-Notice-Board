// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDv6vCL-E7OuOekyaLlvrlcoGA3E8zAQJI',
  authDomain: 'department-notice-board-f817c.firebaseapp.com',
  projectId: 'department-notice-board-f817c',
  storageBucket: 'department-notice-board-f817c.firebasestorage.app', // FIXED
  messagingSenderId: '73700127376',
  appId: '1:73700127376:web:5b8abbcecab154b5dc1e15',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ADD THIS LINE

export { auth };
