import { Box, CardMedia, SxProps, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import * as React from "react";
import { useEffect } from "react";

import { Measure, MeasureType } from "../../services/core-service/interfaces";
import { useMeasureStepperStore } from "../../stores/MeasureStepperStore";

import EvaluationChoise from "./evaluation-inputs/EvaluationChoice";
import EvaluationInput from "./evaluation-inputs/EvaluationInput";


export interface EvaluationFormProps {
  sx?: SxProps;
  enterMeasure: (measure: Measure, value?: string) => boolean;
}

export function EvaluationCard({
  enterMeasure: measure,
}: EvaluationFormProps): React.JSX.Element {
  const {
    loading,
    initialized,
    loadMeasures,
    getCurrentMeasure,
    moveBack,
    moveNext } = useMeasureStepperStore();
  const [value, setValue] = React.useState<string | undefined>();
  const currentMeasure = getCurrentMeasure();

  useEffect(() => {
    if(!initialized) {
      loadMeasures();
    }
  }, []);


  const handleBack = () => {
    moveBack();
  };

  const handleNext = () => {
    if (measure(currentMeasure, value)) {
      setValue("");
      moveNext();
    }
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <CardHeader title="Your value" />
          {/* <Divider /> */}
          <CardMedia
            component="img"
            // height="194"
            // width="151"
            image="/assets/body-type.png"
            alt="Sport"
            sx={{ objectFit: "scale-down" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Grid container spacing={3}>
                <Grid md={12} xs={12}>
                  <Typography gutterBottom variant="h5" component="div">
                    {currentMeasure.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </Grid>
                <Grid md={8} xs={8}>
                  <FormControl fullWidth required>
                    {currentMeasure.type === MeasureType.Boolean ? (
                      <EvaluationChoise
                        name={currentMeasure.name}
                        variant="outlined"
                        size="small"
                        value={value}
                        onChange={(value) => setValue(value.toString())}
                      />
                    ) : currentMeasure.type === MeasureType.Number ||
                      currentMeasure.type === MeasureType.String ? (
                      <EvaluationInput
                        name={currentMeasure.name}
                        options={currentMeasure.options}
                        type={currentMeasure.type}
                        variant="outlined"
                        size="small"
                        value={value}
                        onChange={(value) => setValue(value)}
                      />
                    ) : (
                      <>UNSUPORTED</>
                    )}
                  </FormControl>
                </Grid>
                <Grid md={4} xs={4}>
                  <Button
                    color="info"
                    fullWidth
                    endIcon={<InfoIcon fontSize="var(--icon-fontSize-md)" />}
                    variant="contained"
                  >
                    Measure
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <Divider />
          <CardActions sx={{ pb: 1, pt: 1, pl: 3, pr: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                color="secondary"
                startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
                variant="contained"
                onClick={() => handleBack()}
              >
                Back
              </Button>
              <Button
                color="primary"
                endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
                variant="contained"
                onClick={() => handleNext()}
              >
                Next
              </Button>
            </Box>
          </CardActions>
        </>
      )}
    </Card>
  );
}
