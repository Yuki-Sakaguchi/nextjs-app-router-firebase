import { db } from "@/lib/firebase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { userRawConverter } from "../datasource/UserRaw";

import { auth, customInitApp } from "@/lib/firebase/server";
import { User } from "../../domain/model/User";

customInitApp();

const COLLECTION_NAME = "user";

export async function getUserUid(): Promise<string> {
  const session = cookies().get("session")?.value || "";
  if (!session) {
    return "";
  }

  const decodedClaims = await auth.verifySessionCookie(session, true);
  if (!decodedClaims) {
    return "";
  }

  return decodedClaims.uid;
}

export async function getUser(): Promise<User | undefined> {
  const uid = await getUserUid();

  if (uid === "") {
    return;
  }

  const snapshot = await db
    .collection(COLLECTION_NAME)
    .doc(uid)
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
