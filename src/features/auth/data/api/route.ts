import { auth as adminAuth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { initializeAuthenticatedApp } from "@/lib/firebase/client";
import { customInitApp } from "@/lib/firebase/server";
import { getAuth, signInWithCustomToken } from "firebase/auth";

customInitApp();

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";
  if (!session) {
    return NextResponse.json(
      { isLogged: false, currentUser: null },
      { status: 401 },
    );
  }

  const decodedClaims = await adminAuth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json(
      { isLogged: false, currentUser: null },
      { status: 401 },
    );
  }

  const app = initializeAuthenticatedApp(decodedClaims.uid);
  const auth = getAuth(app);

  if (auth.currentUser?.uid !== decodedClaims.uid) {
    // TODO(jamesdaniels) get custom claims
    const customToken = await adminAuth()
      .createCustomToken(decodedClaims.uid)
      .catch((e) => console.error(e.message));

    if (!customToken) {
      return NextResponse.json(
        { isLogged: false, currentUser: null },
        { status: 401 },
      );
    }
    await signInWithCustomToken(auth, customToken);
  }
  return NextResponse.json(
    { isLogged: true, currentUser: auth.currentUser },
    { status: 200 },
  );
}

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get("Authorization");

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await adminAuth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await adminAuth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);

      const app = initializeAuthenticatedApp(decodedToken.uid);
      const auth = getAuth(app);

      if (auth.currentUser?.uid !== decodedToken.uid) {
        // TODO(jamesdaniels) get custom claims
        const customToken = await adminAuth()
          .createCustomToken(decodedToken.uid)
          .catch((e) => console.error(e.message));

        if (!customToken) {
          return NextResponse.json(
            { isLogged: false, currentUser: null },
            { status: 401 },
          );
        }
        await signInWithCustomToken(auth, customToken);
      }
      return NextResponse.json(
        { isLogged: true, currentUser: auth.currentUser },
        { status: 200 },
      );
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const token = cookies().get("session")?.value || "";
  if (!token) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  await invalidateLogin(token);
  return NextResponse.json({}, { status: 200 });
}

export const invalidateLogin = async (token: string) => {
  const decodedClaims = await adminAuth().verifySessionCookie(token, true);
  await adminAuth().revokeRefreshTokens(decodedClaims.uid);
  cookies().delete("session");
  return;
};
