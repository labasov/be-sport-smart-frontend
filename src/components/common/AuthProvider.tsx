import React, { createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import { useUserStore } from "../../stores/UserStore";

type AuthContextType = {
  user?: { userName?: string; userEmail?: string };
  loading: boolean;
  signIn: (userName: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signValidate: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: {children: React.ReactElement}) => {
  const {
    isSignedIn,
    loading,
    userName,
    userEmail,
    signIn: userSignIn,
    signOut: userSignOut,
    refreshUserInfo,
  } = useUserStore();
  const navigate = useNavigate();

  const fetchUser = async () => {
    await refreshUserInfo();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signIn = async (userName: string, email: string, password: string) => {
    try {
      await userSignIn(userName, email, password);
      if (isSignedIn) {
        navigate(routes.home);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    await userSignOut();
    navigate(routes.signIn); 
  };

  const signValidate = async () => {
    await refreshUserInfo();
    return isSignedIn;
  };

  const value: AuthContextType = {
    user: isSignedIn ? { userName, userEmail } : undefined,
    loading,
    signIn,
    signOut,
    signValidate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () : AuthContextType => {
  return useContext(AuthContext)!;
};
