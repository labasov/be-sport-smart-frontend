import { Measure } from "../../../services/core-service/interfaces";

export interface MeasureStepperProps {
  enterMeasure: (measure: Measure, value?: string) => Promise<boolean>;
}
