import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
  getNumberFromEnvParser,
  getStringFromEnvParser,
  validateConfig,
} from 'typed-env-parser';

// Validate env variables
export const firebase = validateConfig({
  apiKey: getStringFromEnvParser('REACT_APP_API_KEY'),
  authDomain: getStringFromEnvParser('REACT_APP_AUTHDOMAIN', {
    pattern: '.+.firebaseapp.com',
  }),
  projectId: getStringFromEnvParser('REACT_APP_PROJECTID'),
  storageBucket: getStringFromEnvParser('REACT_APP_STORAGEBUCKET', {
    pattern: '.+.appspot.com',
  }),
  messagingSenderId: getNumberFromEnvParser('REACT_APP_MESSAGINGSENDERID'),
  appId: getStringFromEnvParser('REACT_APP_APPID', {
    pattern: '1:.*:web:.*',
  }),
});

// @ts-ignore: Unreachable error
const app = initializeApp(firebase);
export const db = getFirestore(app);
export const storage = getStorage(app);
