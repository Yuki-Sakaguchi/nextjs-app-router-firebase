"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Loading } from "../components";

const loadingContext = createContext(false);
const setLoadingContext = createContext<Dispatch<SetStateAction<boolean>>>(
  () => undefined,
);

type Props = {
  children: ReactNode;
};

export function LoadingProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <loadingContext.Provider value={loading}>
      <setLoadingContext.Provider value={setLoading}>
        {loading && <Loading />}
        {children}
      </setLoadingContext.Provider>
    </loadingContext.Provider>
  );
}

export const useLoading = () => useContext(loadingContext);
export const useSetLoading = () => useContext(setLoadingContext);
