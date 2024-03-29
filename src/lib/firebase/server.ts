import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import type { ServiceAccount } from "firebase-admin";

const serviceAccount = require("../../../credentials/sample-product-6e1b1-firebase-adminsdk-5d2ez-b0041c31d7.json");

export function customInitApp() {
  if (getApps().length === 0) {
    return initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  }
  return getApps()[0];
}

export const adminAuth = customInitApp();
export const auth = getAuth();
export const db = getFirestore();
