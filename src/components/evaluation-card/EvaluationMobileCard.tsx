import { Global } from "@emotion/react";
import { Container, styled, SwipeableDrawer, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import * as React from "react";

import {
  Measure,
} from "../../services/core-service/interfaces";


import { EvaluationCard } from "./EvaluationCard";


const drawerBleeding = 56;

const StyledBox = styled("div")(() => ({
  backgroundColor: "#fff",
}));

const Puller = styled("div")(() => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 20,
  left: "calc(50% - 15px)",
}));

export interface EvaluationMobileCardProps {
  enterMeasure: (measure: Measure, value?: string) => boolean;
}
export function EvaluationMobileCard({
  enterMeasure,
}: EvaluationMobileCardProps): React.JSX.Element {
  const isMobile = useMediaQuery("(max-width:600px)");
  const containerRef = React.useRef(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  return (
    <>
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
      <Container maxWidth="sm" ref={containerRef} />
      <SwipeableDrawer
          className="EvaluationDrawer"
          container={containerRef.current}
          anchor="bottom"
          hidden={!isMobile}
          open={drawerOpen}
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
            <Puller/>
            <Typography
              onClick={() => toggleDrawer(!drawerOpen)}
              sx={{ p: 2, color: "text.secondary" }}
            >
              Measures form
            </Typography>
          </StyledBox>
          <StyledBox >
            <EvaluationCard enterMeasure={enterMeasure}/>
          </StyledBox>
        </SwipeableDrawer>
    </>
  );
}
