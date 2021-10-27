import React from "react";

import type { PostBodyLogin } from "../apis/POST_login";

interface AuthContextInterface {
  signIn: (data: PostBodyLogin) => Promise<void>;
  signOut: (clearCache?: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  signIn: async () => undefined,
  signOut: () => undefined,
});

export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;
