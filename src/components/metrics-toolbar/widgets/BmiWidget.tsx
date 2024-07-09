import { Heart as HeartIcon } from "@phosphor-icons/react/dist/ssr/Heart";
import { TrendWidget, TrendWidgetProps } from "./TrendWidget";
import withMeasureValueChanges from "../../../hooks/WithMeasureValues";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MeasureValuesChangeHandler } from "./interfaces/MeasureValuesChangeHandler";
import { CoreService } from "../../../services/core-service/CoreService";


const BmiWidget = forwardRef<MeasureValuesChangeHandler>((_, ref) => {
  const [trendWidgetProps, setTrendWidgetProps] = useState<TrendWidgetProps>({
    name: "BMI",
    loading: false,
    diff: undefined,
    trend: undefined,
    value: "10 (bmi)",
    icon: HeartIcon,
    iconColor: "info",
    description: "Your current BMI based on height and weight"
  });

  useImperativeHandle(ref, () => ({
    async onMeasureValuesChange(coreService: CoreService, measureValues: { [key: string]: string | undefined }) {
      console.log("Values changed in BMI Widget:", measureValues);
    }
  }));
  
  return (
    <TrendWidget {...trendWidgetProps}/>
  );
});

export default withMeasureValueChanges(BmiWidget, ["height", "weight"]);
