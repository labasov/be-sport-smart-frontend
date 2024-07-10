import { CoreService } from "../../../../services/core-service/CoreService";
import { MeasureValue } from "../../../../stores/interfaces/MeasureValue";

export interface MeasureValuesChangeHandler {
  onMeasureValuesChange: (coreService: CoreService, measureValues: MeasureValue[]) => Promise<void>;
}