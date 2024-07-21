import React, { createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { routes } from "../../routes";
import { useUserStore } from "../../stores/UserStore";

type AuthContextType = {
  user?: { userName?: string; userEmail?: string, userRoles?: string[] };
  loading: boolean;
  signIn: (userName: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signValidate: () => Promise<boolean>;
  isInRole: (role: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: {children: React.ReactElement}) => {
  const {
    isSignedIn,
    isInitialized,
    loading,
    userName,
    userEmail,
    userRoles,
    signIn: userSignIn,
    signOut: userSignOut,
    refreshUserInfo,
  } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized) {
      refreshUserInfo();
    }
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

  const isInRole = (role: string) => {
    return isSignedIn && !!userRoles && userRoles?.includes(role);
  };

  const value: AuthContextType = {
    user: isSignedIn ? { userName, userEmail } : undefined,
    loading,
    signIn,
    signOut,
    signValidate,
    isInRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () : AuthContextType => {
  return useContext(AuthContext)!;
};
