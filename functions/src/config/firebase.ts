import * as admin from "firebase-admin";

const privatekey = process.env.APP_FIREBASE_PRIVATE_KEY;

if (privatekey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: privatekey.replace(/\\n/g, "\n"),
      projectId: process.env.APP_FIREBASE_PROJECT_ID,
      clientEmail: process.env.APP_FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: `https://${process.env.APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const db = admin.firestore();
export { admin, db };
