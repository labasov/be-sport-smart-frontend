import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { LocalizationProvider } from "./components/core/LocalizationProvider";
import Telemetry from "./components/core/telemetry/Telemetry";
import { ThemeProvider } from "./components/core/telemetry/ThemeProvider";
import MainLayout from "./components/MainLayout";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Telemetry>
        <LocalizationProvider>
          <ThemeProvider>
            <MainLayout />
          </ThemeProvider>
        </LocalizationProvider>
      </Telemetry>
    </BrowserRouter>
  );
};

export default App;
