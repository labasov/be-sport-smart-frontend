
import Grid from "@mui/material/Unstable_Grid2";
import { useSnackbar } from "notistack";

import WithApplicationInsights from "../components/core/telemetry/TelemetryWithAppInsights.tsx";
import { MeasureStepperDrawer } from "../components/measure/measure-stepper-drawer/MeasureStepperDrawer.tsx";
import { MeasureStepperCard } from "../components/measure/MeasureStepperCard.tsx";
import { SportRankCard } from "../components/sport/SportRankCard.tsx";
import { useStaticTranslation } from "../hooks/UseTranslation.ts";
import { Measure, MeasureType } from "../services/core-service/interfaces/index.ts";
import { useMeasureValuesStore } from "../stores/MeasureValuesStore.ts";
import { useSportStore } from "../stores/SportStore.ts";

const EvaluationDashboard = () => {
  const { t } = useStaticTranslation();
  const { setValue, measureValues } = useMeasureValuesStore();
  const { rankSports } = useSportStore();
  const { enqueueSnackbar } = useSnackbar();

  const handleEnterMeasure = async (measure: Measure, value?: string) : Promise<boolean> => {
    let newMeasureProvided = false;
    let newMeasureAccepted = false;

    switch (measure.type) {
      case MeasureType.String:
      case MeasureType.Number:
        if (value) {
          newMeasureProvided = setValue(measure, value);
          newMeasureAccepted = true;
        } else if (measure.options.length > 0) {
          newMeasureProvided = setValue(measure, measure.options[0]);
          newMeasureAccepted = true;
        }
        break;
      case MeasureType.Boolean:
        newMeasureProvided = setValue(measure, value ?? "false");
        newMeasureAccepted = true;
        break;
      default:
        break;
    }

    if (newMeasureProvided) {
      await rankSports(measureValues);
    }

    if (!newMeasureAccepted) {
      enqueueSnackbar(t("sport.rank.alerts.nonValidMeasure"), { variant: "error" });
    }
    else if (newMeasureProvided) {
      enqueueSnackbar(t("sport.rank.alerts.measureAccepted"), { variant: "info" });
    }

    return newMeasureAccepted;
  };

  return (
    <Grid container spacing={3} sx={{  mt: {xs : 3}, mb: { xs: 7 } }}>
      <Grid lg={8} xs={12}>
        <SportRankCard/>
      </Grid>
      <Grid lg={4} md={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <MeasureStepperCard enterMeasure={handleEnterMeasure}/>
      </Grid>
      <MeasureStepperDrawer enterMeasure={handleEnterMeasure} />
    </Grid>
  );
};

const EvaluationPageWithTelemetry = WithApplicationInsights(
  EvaluationDashboard,
  "EvaluationPage"
);

export default EvaluationPageWithTelemetry;
