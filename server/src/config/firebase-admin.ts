import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import admin from 'firebase-admin';

let initialized = false;

export function getFirebaseAdmin() {
  if (!initialized) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    const credential = serviceAccountJson
      ? admin.credential.cert(JSON.parse(serviceAccountJson) as admin.ServiceAccount)
      : admin.credential.cert(
          JSON.parse(
            readFileSync(resolve(process.cwd(), serviceAccountPath ?? '../firebase-service-account.json'), 'utf8'),
          ) as admin.ServiceAccount,
        );

    admin.initializeApp({ credential });
    initialized = true;
  }

  return admin;
}

export function getAuth() {
  return getFirebaseAdmin().auth();
}

export function getFirestore() {
  return getFirebaseAdmin().firestore();
}
