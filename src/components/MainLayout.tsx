import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FC, ReactElement } from "react";

import { MainNav } from "./common/MainNav";
import MainRoutes from "./MainRoutes";

import "../styles/global.css"

const MainLayout: FC = (): ReactElement => {
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
