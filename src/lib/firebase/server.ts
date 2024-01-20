
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import type * as admin from 'firebase-admin';

const serviceAccount = require('../../../credentials/sample-product-6e1b1-firebase-adminsdk-5d2ez-b0041c31d7.json');

export function customInitApp() {
  if (getApps().length === 0) {
    return initializeApp({
      credential: cert(serviceAccount as admin.ServiceAccount),
    });
  } else {
    return getApps()[0];
  }
}

export const adminAuth = customInitApp();
export const auth = getAuth();
export const db = getFirestore();
