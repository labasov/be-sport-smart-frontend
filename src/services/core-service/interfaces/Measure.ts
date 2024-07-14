import { MeasureAvailability } from "./MeasureAvailability";

export interface Measure {
  name: string;
  type: string;
  minValue?: number;
  maxValue?: number;
  availability: MeasureAvailability;
  options: string[];
}
