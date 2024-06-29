import { create } from "zustand";
import { Notification } from "./interfaces/Notification";


type NotificationStoreState = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (notification: Notification) => void;
};

export const useNotificationStore = create<NotificationStoreState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotification: (notification) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n !== notification),
    })),
}));
