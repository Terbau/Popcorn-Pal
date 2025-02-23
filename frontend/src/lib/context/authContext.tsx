import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useReactiveVar } from "@apollo/client";
import { sessionVar } from "../reactiveVars";
import type { GetCurrentUserQuery } from "../graphql/generated/graphql";

export type User = Exclude<GetCurrentUserQuery["getUser"], null | undefined>;

interface AuthContextProps {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  session: string | undefined;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const session = useReactiveVar(sessionVar);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, session }}>
      {children}
    </AuthContext.Provider>
  );
}
