import React from "react";

interface AuthDataContext {
  accessToken: null;
  refreshToken: null;
}

interface AuthContextInterface {
  Auth: AuthDataContext;
  setAuth: (value: AuthDataContext) => void;
}
export const AuthContextInitialValue: AuthDataContext = {
  accessToken: null,
  refreshToken: null,
};

export const AuthContext = React.createContext<AuthContextInterface>({
  Auth: AuthContextInitialValue,
  setAuth: () => undefined,
});

AuthContext.displayName = "Auth Context";

const AppAuthContext = ({ children }: { children: React.ReactNode }) => {
  const [AuthContextValue, setAuthContextValue] =
    React.useState<AuthDataContext>({ accessToken: null, refreshToken: null });

  return (
    <AuthContext.Provider
      value={{
        Auth: AuthContextValue,
        setAuth: setAuthContextValue,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AppAuthContext;
