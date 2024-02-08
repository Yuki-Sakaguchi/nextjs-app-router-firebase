import { db } from "@/lib/firebase/server";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { userRawConverter } from "../datasource/UserRaw";

import { customInitApp } from "@/lib/firebase/server";
import { User } from "../../domain/model/User";

customInitApp();

const COLLECTION_NAME = "user";

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const decodedClaims = await auth().verifySessionCookie(session, true);
  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const snapshot = await db
    .collection(COLLECTION_NAME)
    .doc(decodedClaims.uid)
    .withConverter(userRawConverter)
    .get();

  if (!snapshot.exists) {
    return NextResponse.json({ isLogged: false }, { status: 404 });
  }

  const userRaw = snapshot.data();
  if (!userRaw) {
    return NextResponse.json({ isLogged: false }, { status: 404 });
  }

  const user: User = {
    ...userRaw,
    createdAt: userRaw.createdAt as Date,
    uid: snapshot.id,
  };
  return NextResponse.json(user);
}
