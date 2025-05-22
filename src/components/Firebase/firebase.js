import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Helper function to validate config
const validateFirebaseConfig = (config) => {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  const missingFields = requiredFields.filter((field) => !config[field]);

  if (missingFields.length > 0) {
    console.error(
      `Firebase config is missing required fields: ${missingFields.join(', ')}`
    );
    console.error('Current config:', config);
    return false;
  }

  return true;
};

const config = {
  apiKey: 'AIzaSyBl3Ux6RuBPabvRc5tZtSREGPmogmipIGM',
  authDomain: 'cal-portfolio-c40aa.firebaseapp.com',
  databaseURL: 'https://cal-portfolio-c40aa.firebaseio.com',
  projectId: 'cal-portfolio-c40aa',
  storageBucket: 'cal-portfolio-c40aa.firebasestorage.app',
  messagingSenderId: '200093543015',
  appId: '1:200093543015:web:4b0b756e5b3b60467002c2',
  measurementId: 'G-TWNDCZ16ZP',
};
const ENV = process.env.NODE_ENV;

console.log(`Firebase initializing in ${ENV} environment`);

// Only initialize Firebase if the config is valid
let app = null;
let analytics = null;

if (validateFirebaseConfig(config)) {
  try {
    app = !getApps().length ? initializeApp(config) : getApp();
  } catch (error) {
    console.error('Error initializing Firebase app:', error);
  }
}

const initializeAnalytics = async () => {
  if (!app) {
    console.error('Cannot initialize analytics: Firebase app not initialized');
    return null;
  }

  if (typeof window !== 'undefined') {
    try {
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        analytics = getAnalytics(app);
        return analytics;
      }
    } catch (error) {
      console.error('Firebase Analytics error:', error);
    }
  }
  return null;
};

export { app, analytics, initializeAnalytics };
