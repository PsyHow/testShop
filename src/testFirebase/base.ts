import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

// Set the configuration for your app
const firebaseConfig = {
  apiKey: 'AIzaSyBmHCyPray2xBASfLEugdbet6kNho7m9Aw',
  authDomain: 'shop-test-56339.firebaseapp.com',
  databaseURL: 'https://shop-test-56339-default-rtdb.firebaseio.com',
  storageBucket: 'shop-test-56339.appspot.com',
  projectId: 'shop-test-56339',
  messagingSenderId: '968457568982',
  appId: '1:968457568982:web:8dcadca58cf4fc5f847f77',
  measurementId: 'G-5D9SPM1JJZ',
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const dbRef = ref(getDatabase());
