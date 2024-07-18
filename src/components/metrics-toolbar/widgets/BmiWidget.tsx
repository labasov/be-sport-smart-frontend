import { Heart as HeartIcon } from "@phosphor-icons/react/dist/ssr/Heart";
import { forwardRef, useImperativeHandle, useState } from "react";

import withMeasureValueChanges from "../../../hooks/WithMeasureValues";
import { CoreService } from "../../../services/core-service/CoreService";
import { MeasureValue } from "../../../stores/interfaces/MeasureValue";

import { MeasureValuesChangeHandler } from "./interfaces/MeasureValuesChangeHandler";
import { TrendWidget, TrendWidgetProps } from "./TrendWidget";


const BmiWidget = forwardRef<MeasureValuesChangeHandler>((_, ref) => {
  const [trendWidgetProps, setTrendWidgetProps] = useState<TrendWidgetProps>({
    name: "BMI",
    loading: false,
    value: undefined,
    measure: "(bmi)",
    diff: undefined,
    trend: undefined,
    trendColor: "success",
    icon: HeartIcon,
    iconColor: "info",
    description: "Current BMI based on height and weight"
  });

  useImperativeHandle(ref, () => ({
    async onMeasureValuesChange(coreService: CoreService, measureValues: MeasureValue[]) {
      setTrendWidgetProps({...trendWidgetProps, loading: true});

      const metrics = await coreService.evaluateMetrics(measureValues, ["bmi"]);
      const metricValue = metrics[0].result;
      const newTrendWidgetProps = {... trendWidgetProps, ... {
        loading: false,
        value: isNaN(metricValue) ? undefined : metricValue.toFixed(2)
      }}

      setTrendWidgetProps(newTrendWidgetProps);
    }
  }));
  
  return (
    <TrendWidget {...trendWidgetProps}/>
  );
});

export default withMeasureValueChanges(BmiWidget, ["height", "weight"]);
