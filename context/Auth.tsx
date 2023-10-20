import { createContext } from "react";

type Props = {
  children: React.ReactNode;
};

type AuthContextType = Partial<{}>;

const AuthContext = createContext<AuthContextType>({});

const AuthProvider = (props: Props) => {
  const { children } = props;

  const value: AuthContextType = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
