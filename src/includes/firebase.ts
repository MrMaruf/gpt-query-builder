import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyADRG4Eehr-eYrVo1-HS1wY8Gef3LzeooE',
  authDomain: 'gpt-query-builder.firebaseapp.com',
  projectId: 'gpt-query-builder',
  storageBucket: 'gpt-query-builder.appspot.com',
  messagingSenderId: '780443918308',
  appId: '1:780443918308:web:639b0ae828aecde29b71f1',
};

const app = initializeApp(firebaseConfig);

const firestoreDB = getFirestore(app);


const firebaseAuth = getAuth();

export { firestoreDB, firebaseAuth };
