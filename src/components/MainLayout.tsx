import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FC, ReactElement } from "react";
//import GlobalStyles from "@mui/material/GlobalStyles";

import { MainNav } from "./common/MainNav";
import MainRoutes from "./MainRoutes";

const MainLayout: FC = (): ReactElement => {
  return (
    <>
      {/* <GlobalStyles
        styles={{
          body: {
            "--MainNav-height": "56px",
            "--MainNav-zIndex": 1000,
            "--SideNav-width": "280px",
            "--SideNav-zIndex": 1100,
            "--MobileNav-width": "320px",
            "--MobileNav-zIndex": 1100,
          },
        }}
      /> */}
      <Box
        sx={{
          backgroundImage: "url(/assets/background.png)",
          bgcolor: "var(--mui-palette-background-default)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          minHeight: "100%",
        }}
      >
        {/* <SideNav /> */}
        <Box
          sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}
        >
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: "64px" }}>
              <MainRoutes />
            </Container>
          </main>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
