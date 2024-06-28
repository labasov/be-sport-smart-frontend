import { Grid, Typography, FormControl, Button } from "@mui/material";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";

import { Measure, MeasureType } from "../../../services/core-service/interfaces";

import { MeasureChoise } from "./MeasureChoice";
import { MeasureInput } from "./MeasureInput";
import { useDynamicTranslation, useStaticTranslation } from "../../../hooks/UseTranslation";

export interface MeasureFormProps {
  measure: Measure;
  value?: string;
  onValueChange : (value: string | undefined) => void;
}

export const MeasureForm: React.FC<MeasureFormProps> = ({ measure, value, onValueChange }) => {
  const { t } = useDynamicTranslation();
  const { t : tStatic } = useStaticTranslation();
  const measureName = t(`measures.${measure.name}.name`);
  const measureDescription = t(`measures.${measure.name}.description`);

 return (
  <form
    onSubmit={(event) => {
      event.preventDefault();
    }}
  >
    <Grid container spacing={3}>
      <Grid item md={12} xs={12}>
        <Typography gutterBottom variant="h5" component="div">
          {measureName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {measureDescription}
        </Typography>
      </Grid>
      <Grid item md={8} xs={12}>
        <FormControl fullWidth required>
          {measure.type === MeasureType.Boolean ? (
            <MeasureChoise
              name={measure.name}
              variant="standard"
              size="small"
              value={value}
              onChange={(value) => onValueChange(value.toString())}
            />
          ) : measure.type === MeasureType.Number || measure.type === MeasureType.String ? (
            <MeasureInput
              name={measure.name}
              options={measure.options}
              type={measure.type}
              variant="standard"
              size="small"
              value={value}
              onChange={onValueChange}
            />
          ) : (
            <>{tStatic('measures.form.unsuported')}</>
          )}
        </FormControl>
      </Grid>
      <Grid item md={4} xs={12}>
        <Button
          color="info"
          fullWidth
          endIcon={<InfoIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          {tStatic('measure.form.help')}
        </Button>
      </Grid>
    </Grid>
  </form>
);
};
