
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FC, ReactElement } from "react";
import { useLocation } from "react-router-dom";

import { routes } from "../routes";

import { MainNav } from "./common/MainNav";
import MainRoutes from "./MainRoutes";

import "../styles/global.css"

const fullScreenPages: string[] = [routes.signIn, routes.signUp];

const MainLayout: FC = (): ReactElement => {
  const { pathname } = useLocation();
  const fullScreenPage = () => fullScreenPages.find((page) => page === pathname);

  if (fullScreenPage()) {
    return <MainRoutes />;
  }

  return (
    <>
      <Box
        sx={{
          backgroundImage: "url(/assets/cool-background.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <MainNav />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "calc(100vh - 65px)" }}
        >
          <Container maxWidth="xl">
            <MainRoutes />
          </Container>
        </Grid>
      </Box>
    </>
  );
};

export default MainLayout;
