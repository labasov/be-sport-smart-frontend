import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useStaticTranslation } from "../../../hooks/UseTranslation";
import { routes } from "../../../routes";

export const GuestWidget = (): React.ReactElement => {
  const { t } = useStaticTranslation();
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = React.useState(false);

  const handleSignUp = () => {
    navigate(routes.signUp);
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  return (
    <>
      {!isClosed && (
        <Card>
          <CardContent style={{ padding: "8px 16px" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid sx={{ display: { xs: "none", sm: "block" } }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleSignUp}
                >
                  {t("auth.actions.signUp")}
                </Button>
              </Grid>
              <Grid xs>
                <Typography variant="h6" component="h2">
                  {t("widgets.guest.title")}
                </Typography>
                <Typography variant="body2" component="p">
                  {t("widgets.guest.description")}
                </Typography>
              </Grid>
              <Grid>
                <Stack direction="column" spacing={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                  >
                    <XIcon />
                  </Button>
                  <Button
                    sx={{ display: { xs: "block", sm: "none" } }}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleSignUp}
                  >
                    {t("auth.actions.signUp")}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
};
