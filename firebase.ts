import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCubUBrSlIxvIrru7amIynQdupxFNOuGM4",
  authDomain: "eleviacrm.firebaseapp.com",
  projectId: "eleviacrm",
  storageBucket: "eleviacrm.firebasestorage.app",
  messagingSenderId: "491332703087",
  appId: "1:491332703087:web:22d1ba719300f966e8ce9a",
  measurementId: "G-VY731C6T52"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
