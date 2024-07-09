import { ClockClockwise as ClockClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ClockClockwise";
import { TrendWidget, TrendWidgetProps } from "./TrendWidget";
import { forwardRef, useImperativeHandle, useState } from "react";
import withMeasureValueChanges from "../../../hooks/WithMeasureValues";
import { MeasureValuesChangeHandler } from "./interfaces/MeasureValuesChangeHandler";
import { CoreService } from "../../../services/core-service/CoreService";

const ProgectedBmiWidget = forwardRef<MeasureValuesChangeHandler>((_, ref) => {
  const [trendWidgetProps, setTrendWidgetProps] = useState<TrendWidgetProps>({
    name: "Progected BMI",
    loading: false,
    diff: undefined,
    trend: undefined,
    value: "19 (bmi)",
    icon: ClockClockwiseIcon,
    iconColor: "success",
    description: "Your progected value at 18"
  });

  useImperativeHandle(ref, () => ({
    async onMeasureValuesChange(coreService: CoreService, measureValues: { [key: string]: string | undefined }) {
      console.log("Values changed in BMI Widget:", measureValues);
    }
  }));
  
  return (
    <TrendWidget {...trendWidgetProps} />
  );
});

export default withMeasureValueChanges(ProgectedBmiWidget, ["height", "weight", "age", "gender"]);
