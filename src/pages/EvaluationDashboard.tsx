import Grid from "@mui/material/Unstable_Grid2";

import WithApplicationInsights from "../components/core/telemetry/TelemetryWithAppInsights.tsx";
import { MeasureStepperDrawer } from "../components/measure/measure-stepper-drawer/MeasureStepperDrawer.tsx";
import { MeasureStepperCard } from "../components/measure/MeasureStepperCard.tsx";
import { MeasureStepperProvider } from "../components/measure/MeasureStepperProvider.tsx";
import MetricsToolbar from "../components/metrics-toolbar/MetricsToolbar.tsx";
import { SportRankCard } from "../components/sport/SportRankCard.tsx";
import { useMeasureValuesStore } from "../stores/MeasureValuesStore.ts";
import { useSportStore } from "../stores/SportStore.ts";

const EvaluationDashboard = () => {
  const { measureValues } = useMeasureValuesStore();
  const { rankSports } = useSportStore();

  const handleMeasuresUpdated = async (
    useNoValues?: boolean
  ): Promise<void> => {
    await rankSports(useNoValues ? [] : measureValues);
  };

  return (
    <Grid container spacing={3} sx={{ mt: { xs: 3 }, mb: { xs: 7 } }}>
      <MetricsToolbar/>
      <Grid lg={8} xs={12}>
        <SportRankCard />
      </Grid>
      <Grid lg={4} xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
        <MeasureStepperProvider measuresUpdated={handleMeasuresUpdated}>
          <MeasureStepperCard />
        </MeasureStepperProvider>
      </Grid>
      <MeasureStepperProvider measuresUpdated={handleMeasuresUpdated}>
        <MeasureStepperDrawer />
      </MeasureStepperProvider>
    </Grid>
  );
};

const EvaluationPageWithTelemetry = WithApplicationInsights(
  EvaluationDashboard,
  "EvaluationDashboard"
);

export default EvaluationPageWithTelemetry;
