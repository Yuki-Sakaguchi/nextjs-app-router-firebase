import { db } from "@/lib/firebase/server";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { userRawConverter } from "../datasource/UserRaw";

import { customInitApp } from "@/lib/firebase/server";
import { User } from "../../domain/model/User";

customInitApp();

const COLLECTION_NAME = "user";

export async function getUser(): Promise<User | undefined> {
  const session = cookies().get("session")?.value || "";
  if (!session) {
    return;
  }

  const decodedClaims = await auth().verifySessionCookie(session, true);
  if (!decodedClaims) {
    return;
  }

  const snapshot = await db
    .collection(COLLECTION_NAME)
    .doc(decodedClaims.uid)
    .withConverter(userRawConverter)
    .get();

  if (!snapshot.exists) {
    return;
  }

  const userRaw = snapshot.data();
  if (!userRaw) {
    return;
  }

  const user: User = {
    ...userRaw,
    createdAt: userRaw.createdAt as Date,
    uid: snapshot.id,
  };

  return user;
}

export async function GET(request: NextRequest) {
  const user = await getUser();
  return NextResponse.json(user);
}
