import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";
import React from "react";

export const GuestWidget = (): React.ReactElement => {
  return (
    <Card>
      <CardContent style={{ padding: "8px 16px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid sx={{ display: { xs: "none", sm: "block" } }}>
            <Button variant="contained" color="primary" size="small">
              Sign in
            </Button>
          </Grid>
          <Grid xs>
            <Typography variant="h6" component="h2">
              See more details
            </Typography>
            <Typography variant="body2" component="p">
              Create free account to see your projected BMI, height at 18, etc.
            </Typography>
          </Grid>
          <Grid>
            <Stack direction="column" spacing={1}>
              <Button variant="outlined" color="secondary">
                <XIcon />
              </Button>
              <Button
                sx={{ display: { xs: "block", sm: "none" } }}
                variant="outlined"
                color="primary"
                size="small"
              >
                Sign in
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
