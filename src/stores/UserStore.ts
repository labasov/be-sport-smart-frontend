import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import config from "../config";
import { IdentityService } from "../services/identity-service/IdentityService";

import { OperationResult } from "./interfaces/OperationResult";

type State = {
  isSignedIn: boolean;
  userName?: string;
  userEmail?: string;
  userRole?: 'User';
};

type Actions = {
  signIn: (userName: string | undefined, email: string | undefined, password: string) => Promise<OperationResult>;
  signUp: (userName: string | undefined, email: string | undefined, password: string) => Promise<OperationResult>;
  signOut: () => Promise<OperationResult>;
  refreshUserInfo: () => Promise<OperationResult>;
};

type UserStore = State & Actions;

const initialValues: State = {
  isSignedIn: false
};

const identityService = new IdentityService(config.backend.baseUrl);

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialValues,
      signIn: async (userName: string | undefined, email: string | undefined, password: string): Promise<OperationResult> => {
        await identityService.signIn(userName, email, password);

        const userInfo = await identityService.getUserInfo();
        set({ isSignedIn: true, userName: userInfo.userName, userEmail: userInfo.email, userRole: 'User' });
      },
      signUp: async (userName: string | undefined, email: string | undefined, password: string): Promise<OperationResult> => {
        await identityService.signUp(userName, email, password);
      },
      signOut: async (): Promise<OperationResult> => {
        await identityService.signOut();

        set({ isSignedIn: false, userName: undefined, userEmail: undefined, userRole: undefined });
      },
      refreshUserInfo: async (): Promise<OperationResult> => {
        try {
          const userInfo = await identityService.getUserInfo();
          set({ isSignedIn: true, userName: userInfo.userName, userEmail: userInfo.email, userRole: 'User' });
        }
        catch (error) {
          set({ isSignedIn: false, userName: undefined, userEmail: undefined, userRole: undefined });
        }
      }
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
