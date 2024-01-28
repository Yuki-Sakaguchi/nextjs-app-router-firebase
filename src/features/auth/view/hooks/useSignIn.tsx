import { useEffect } from "react";

import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useRouter } from "next/navigation";

import { postSignIn } from "@/features/auth/domain/usecase/client";
import { useSetLoading } from "@/features/loading/view/provider";
import { auth, provider } from "@/lib/firebase/client";
import { revalidatePath } from "next/cache";

export function useSignIn() {
  const router = useRouter();
  const setLoading = useSetLoading();

  // useEffect(() => {
  //   setLoading(true);
  //   getRedirectResult(auth).then(async (userCred) => {
  //     if (!userCred) {
  //       setLoading(false);
  //       return;
  //     }
  //     const token = await userCred.user.getIdToken();
  //     const response = await postSignIn(token);
  //     if (response.status === 200) router.push("/dashboard");
  //     // setLoading(false);
  //   });
  // }, [router, setLoading]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  //     console.log("refresh!!");
  //     router.refresh();
  //   });
  //   return () => unsubscribe();
  // }, []);

  async function signIn() {
    // await signInWithRedirect(auth, provider);
    const result = await signInWithPopup(auth, provider);
    // const result = await getRedirectResult(auth);
    if (result) {
      const token = await result.user.getIdToken();
      const response = await postSignIn(token);
      const data = await response.json();
      // if (response.status === 200) router.push("/dashboard");
      router.refresh();
    } else {
    }
  }

  return {
    signIn,
  };
}
