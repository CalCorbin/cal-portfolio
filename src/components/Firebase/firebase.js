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
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
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
