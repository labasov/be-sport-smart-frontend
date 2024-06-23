import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import "./app.css";
import Telemetry from "./components/Telemetry";
import { LocalizationProvider } from "./components/core/LocalizationProvider";
import { ThemeProvider } from "./components/core/ThemeProvider";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Telemetry>
        <LocalizationProvider>
          {/* <UserProvider> */}
            <ThemeProvider>
              <AppLayout />
            </ThemeProvider>
          {/* </UserProvider> */}
        </LocalizationProvider>
      </Telemetry>
    </BrowserRouter>
  );
};

export default App;
