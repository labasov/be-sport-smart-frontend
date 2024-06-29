import { SnackbarOrigin } from "notistack";

const maxNotificationCount = 3;

export const snackbarProviderConfig = {
  maxSnack: maxNotificationCount,
  anchorOrigin: { vertical: "top", horizontal: "center" } as SnackbarOrigin
};