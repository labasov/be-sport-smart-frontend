import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import BmiWidget from "./widgets/BmiWidget";
import ProgectedBmiWidget from "./widgets/ProgectedBmiWidget";
import ProgectedHeightWidget from "./widgets/ProgectedHeightWidget";
import GrowthVelocityWidget from "./widgets/GrowthVelocityWidget";
import { useAuth } from "../common/AuthProvider";
import { GuestWidget } from "./widgets/GuestWidget";

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
