import { CoreService } from "../../../../services/core-service/CoreService";

export interface MeasureValuesChangeHandler {
  onMeasureValuesChange: (coreService: CoreService, measureValues: { [key: string]: string | undefined }) => Promise<void>;
}