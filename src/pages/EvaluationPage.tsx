
import Grid from "@mui/material/Unstable_Grid2";

import WithApplicationInsights from "../components/core/telemetry/TelemetryWithAppInsights.tsx";
import { EvaluationForm } from "../components/evaluation-form/EvaluationForm.tsx";
import { EvaluationMobileForm } from "../components/evaluation-form/EvaluationMobileForm.tsx";
import { SportList } from "../components/sport-list/SportList.tsx";
import { Measure, MeasureType } from "../services/core-service/interfaces/index.ts";
import { useMeasureValuesStore } from "../stores/MeasureValuesStore.ts";
import { useSportStore } from "../stores/SportStore.ts";

const EvaluationPage = () => {
  const { setValue, measureValues } = useMeasureValuesStore();
  const { rankSports } = useSportStore();

  const handleEnterMeasure = (measure: Measure, value?: string) => {
    let newMeasureProvided = false;

    switch (measure.type) {
      case MeasureType.String:
      case MeasureType.Number:
        if (value) {
          newMeasureProvided = setValue(measure, value);
        } else if (measure.options.length > 0) {
          newMeasureProvided = setValue(measure, measure.options[0]);
        }
        break;
      case MeasureType.Boolean:
        newMeasureProvided = setValue(measure, value ?? "false");
        break;
      default:
        break;
    }

    if (newMeasureProvided) {
      rankSports(measureValues);
    }

    return newMeasureProvided;
  };

  return (
    <Grid container spacing={3}>
      <Grid lg={8} xs={12}>
        <SportList sx={{ height: "100%" }} />
      </Grid>
      <Grid lg={4} md={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <EvaluationForm
          sx={{ height: "100%" }}
          enterMeasure={handleEnterMeasure}
        />
      </Grid>

      <EvaluationMobileForm enterMeasure={handleEnterMeasure} />
    </Grid>
  );
};

const EvaluationPageWithTelemetry = WithApplicationInsights(
  EvaluationPage,
  "EvaluationPage"
);

export default EvaluationPageWithTelemetry;
