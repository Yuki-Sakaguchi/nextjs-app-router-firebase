import { db } from "@/lib/firebase/server";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { userRawConverter } from "../datasource/UserRaw";

import { customInitApp } from "@/lib/firebase/server";

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
    .withConverter(userRawConverter)
    .doc(decodedClaims.uid)
    .get();

  if (!snapshot.exists) {
    return NextResponse.json({ isLogged: false }, { status: 404 });
  }

  const userRaw = snapshot.data();
  if (!userRaw) {
    return NextResponse.json({ isLogged: false }, { status: 404 });
  }

  return NextResponse.json({
    ...userRaw,
    createdAt: new Date(userRaw.createdAt.seconds * 1000),
    id: snapshot.id,
  });
}
