import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { LocalizationProvider } from "./components/core/LocalizationProvider";
import Telemetry from "./components/core/telemetry/Telemetry";
import { ThemeProvider } from "./components/core/telemetry/ThemeProvider";
import MainLayout from "./components/MainLayout";
import { SnackbarProvider } from 'notistack';
import { snackbarProviderConfig } from "./constants/NotificationConstants";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Telemetry>
        <LocalizationProvider>
          <ThemeProvider>
            <SnackbarProvider {...snackbarProviderConfig}>
              <MainLayout />
            </SnackbarProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </Telemetry>
    </BrowserRouter>
  );
};

export default App;
