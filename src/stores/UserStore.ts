import { create } from "zustand";

import { IdentityService } from "../services/identity-service/IdentityService";

import { OperationResult } from "./interfaces/OperationResult";

type State = {
  loading: boolean;
  isSignedIn: boolean;
  isInitialized: boolean;
  userName?: string;
  userEmail?: string;
  userRoles?: string[];
};

type Actions = {
  signIn: (userName: string | undefined, email: string | undefined, password: string) => Promise<OperationResult>;
  signUp: (userName: string | undefined, email: string | undefined, password: string) => Promise<OperationResult>;
  signOut: () => Promise<OperationResult>;
  refreshUserInfo: () => Promise<OperationResult>;
};

type UserStore = State & Actions;

const initialValues: State = {
  loading: true,
  isInitialized: false,
  isSignedIn: false
};

const identityService = new IdentityService();

export const useUserStore = create<UserStore>()(
  (set) => ({
    ...initialValues,
    signIn: async (userName: string | undefined, email: string | undefined, password: string): Promise<OperationResult> => {
      set({ loading: true });
      await identityService.signIn(userName, email, password);

      const userInfo = await identityService.getUserInfo();
      set({ isSignedIn: true, userName: userInfo.userName, userEmail: userInfo.email, userRoles: userInfo.roles, loading: false });
    },
    signUp: async (userName: string | undefined, email: string | undefined, password: string): Promise<OperationResult> => {
      set({ loading: true });
      await identityService.signUp(userName, email, password);
      set({ loading: false });
    },
    signOut: async (): Promise<OperationResult> => {
      set({ loading: true });
      await identityService.signOut();

      set({ isSignedIn: false, userName: undefined, userEmail: undefined, userRoles: undefined, loading: false});
    },
    refreshUserInfo: async (): Promise<OperationResult> => {
      set({ loading: true });

      try {
        const userInfo = await identityService.getUserInfo();
        set({ isSignedIn: true, userName: userInfo.userName, userEmail: userInfo.email, userRoles: userInfo.roles, loading: false });
      }
      catch (error) {
        set({ isSignedIn: false, userName: undefined, userEmail: undefined, userRoles: undefined, loading: false, isInitialized: true });
      }
    }
  })
);
