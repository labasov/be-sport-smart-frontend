import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";

import { useAuth } from "../common/AuthProvider";

import BmiWidget from "./widgets/BmiWidget";
import GrowthVelocityWidget from "./widgets/GrowthVelocityWidget";
import { GuestWidget } from "./widgets/GuestWidget";
import ProgectedBmiWidget from "./widgets/ProgectedBmiWidget";
import ProgectedHeightWidget from "./widgets/ProgectedHeightWidget";

export default function MetricsToolbar(): React.JSX.Element {
  const auth = useAuth();

  return (
    <>
      {auth.user && (
        <>
          <Grid lg={3} sm={6} xs={12}>
            <BmiWidget />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <ProgectedBmiWidget />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <ProgectedHeightWidget />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <GrowthVelocityWidget />
          </Grid>
        </>
      ) || (
        <Grid lg={12} xs={12}>
          <GuestWidget />
        </Grid>
      )}
    </>
  );
}
