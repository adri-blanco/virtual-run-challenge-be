import * as admin from "firebase-admin";

const privatekey = process.env.FIREBASE_PRIVATE_KEY;

if (privatekey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: privatekey.replace(/\\n/g, "\n"),
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const db = admin.firestore();
export { admin, db };
