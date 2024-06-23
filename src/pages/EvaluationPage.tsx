import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useMediaQuery } from "@mui/material";

import dayjs from "dayjs";

import { styled } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { useRef } from "react";
import { Global } from "@emotion/react";
import WithApplicationInsights from "../components/TelemetryWithAppInsights.tsx";
import { useInputStore } from "../stores/InputStore.ts";
import { SportList } from "../components/evaluation/sport-list/SportList.tsx";
import { EvaluationForm } from "../components/evaluation/evaluation-form/EvaluationForm.tsx";
import { InputDto, InputType } from "../services/input-service/interfaces/index.ts";

const drawerBleeding = 56;

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 20,
  left: "calc(50% - 15px)",
}));

const EvaluationPage = () => {
  const containerRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { loadInputs, inputs } = useInputStore();

  useEffect(() => {
    loadInputs();
  }, [loadInputs]);

  const handleMeasure = (input: InputDto, value: string) => {
    switch (input.type) {
      case InputType.String:
        return true;
      case InputType.Number:
        return true;
      default:
        return true;
    }
  };

  return (
    <Grid container spacing={3}>
      <Global
        styles={{
          ".EvaluationDrawer.MuiDrawer-root > .MuiPaper-root": {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: "visible",
            left: "2%",
            right: "2%",
          },
        }}
      />
      <Grid lg={8} xs={12}>
        <SportList
          orders={[
            {
              id: "ORD-007",
              customer: { name: "Ekaterina Tankova" },
              amount: 30.5,
              status: "pending",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-006",
              customer: { name: "Cao Yu" },
              amount: 25.1,
              status: "delivered",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-004",
              customer: { name: "Alexa Richardson" },
              amount: 10.99,
              status: "refunded",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-003",
              customer: { name: "Anje Keizer" },
              amount: 96.43,
              status: "pending",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-002",
              customer: { name: "Clarke Gillebert" },
              amount: 32.54,
              status: "delivered",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-001",
              customer: { name: "Adam Denisov" },
              amount: 16.76,
              status: "delivered",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      {!isMobile && (
        <Grid lg={4} md={12} xs={12}>
          <EvaluationForm 
            sx={{ height: "100%" }}
            measure={handleMeasure}
          />
        </Grid>
      )}

      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>

      <Container maxWidth="sm" ref={containerRef} />

      {isMobile && (
        <SwipeableDrawer
          className="EvaluationDrawer"
          container={containerRef.current}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              marginTop: `${-drawerBleeding}px`,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              Inputs form
            </Typography>
          </StyledBox>
          <StyledBox sx={{ mt: 2, px: 2, pb: 2 }}>
            <EvaluationForm />
          </StyledBox>
        </SwipeableDrawer>
      )}
    </Grid>
  );
};

const EvaluationPageWithTelemetry = WithApplicationInsights(
  EvaluationPage,
  "EvaluationPage"
);

export default EvaluationPageWithTelemetry;
