import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase/client";
import { postSignIn } from "@/features/auth/api/signIn";

export function useSignIn() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) return;
      const token = await userCred.user.getIdToken();
      const response = await postSignIn(token);
      if (response.status === 200) router.push("/dashboard");
    });
  }, []);

  function signIn() {
    signInWithRedirect(auth, provider);
  }

  return {
    signIn,
  };
}
