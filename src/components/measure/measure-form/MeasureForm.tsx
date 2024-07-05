import { Grid, Typography, FormControl, Box } from "@mui/material";
import { useImperativeHandle, forwardRef, useRef } from "react";

import {
  useDynamicTranslation,
  useStaticTranslation,
} from "../../../hooks/UseTranslation";
import {
  Measure,
  MeasureType,
} from "../../../services/core-service/interfaces";
import HowToMeasure from "../how-to-measure/HowToMeasure";

import { MeasureChoice } from "./MeasureChoice";
import { MeasureInput } from "./MeasureInput";

export interface MeasureFormProps {
  measure: Measure;
  value?: string;
  onValueChange: (value: string | undefined) => void;
}

export interface MeasureFormHandle {
  submitForm: () => void;
}

export const MeasureForm = forwardRef<MeasureFormHandle, MeasureFormProps>(
  ({ measure, value, onValueChange }, ref) => {
    const { t } = useDynamicTranslation();
    const { t: tStatic } = useStaticTranslation();
    const formRef = useRef<HTMLFormElement>(null);

    const measureName = t(`measures.${measure.name}.name`);
    const measureDescription = t(`measures.${measure.name}.description`);

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        if (formRef.current) {
          formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }
      },
    }));

    return (
      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
        }}
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography gutterBottom variant="h5" component="div">
                {measureName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {measureDescription}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <FormControl fullWidth required>
              {measure.type === MeasureType.Boolean ? (
                <MeasureChoice
                  name={measure.name}
                  size="small"
                  value={value}
                  onChange={(value) => onValueChange(value.toString())}
                />
              ) : measure.type === MeasureType.Number ||
                measure.type === MeasureType.String ? (
                <MeasureInput
                  name={measure.name}
                  options={measure.options}
                  type={measure.type}
                  size="small"
                  value={value}
                  onChange={onValueChange}
                />
              ) : (
                <>{tStatic("measures.form.unsuported")}</>
              )}
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <HowToMeasure measureName={measure.name} />
          </Grid>
        </Grid>
      </form>
    );
  }
);
