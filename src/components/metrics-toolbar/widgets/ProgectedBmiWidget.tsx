import { HeartHalf as HeartHalfIcon } from "@phosphor-icons/react/dist/ssr/HeartHalf";
import { forwardRef, useImperativeHandle, useState } from "react";

import withMeasureValueChanges from "../../../hooks/WithMeasureValues";
import { CoreService } from "../../../services/core-service/CoreService";
import { MeasureValue } from "../../../stores/interfaces/MeasureValue";

import { MeasureValuesChangeHandler } from "./interfaces/MeasureValuesChangeHandler";
import { TrendWidget, TrendWidgetProps } from "./TrendWidget";

const ProgectedBmiWidget = forwardRef<MeasureValuesChangeHandler>((_, ref) => {
  const [trendWidgetProps, setTrendWidgetProps] = useState<TrendWidgetProps>({
    name: "Progected BMI",
    loading: true,
    value: undefined,
    measure: "(bmi)",
    diff: undefined,
    trend: "up",
    trendColor: "info",
    icon: HeartHalfIcon,
    iconColor: "success",
    description: "Progected BMI at 18"
  });

  useImperativeHandle(ref, () => ({
    async onMeasureValuesChange(coreService: CoreService, measureValues: MeasureValue[]) {
      const metrics = await coreService.evaluateMetrics(measureValues, ["bmi", "bmi_at_18"]);
      const bmiValue = metrics.find(x => x.name === "bmi")?.result ?? NaN;
      const bmiAt18Value = metrics.find(x => x.name === "bmi_at_18")?.result ?? NaN;
      const allDataProvided = !isNaN(bmiValue) && !isNaN(bmiAt18Value);
      const diff = allDataProvided ? (bmiAt18Value - bmiValue).toFixed(2) : undefined;
      const newTrendWidgetProps = {... trendWidgetProps, ... {
        loading: false,
        value: isNaN(bmiAt18Value) ? undefined : bmiAt18Value.toFixed(2),
        diff: `${(diff && diff[0] != "-") ? "+" : ""}${diff}`,
        trend: (diff && diff[0] != "-") ? "up" : "down" as "up" | "down"
      }};

      setTrendWidgetProps(newTrendWidgetProps);
    }
  }));
  
  return (
    <TrendWidget {...trendWidgetProps} />
  );
});

export default withMeasureValueChanges(ProgectedBmiWidget, ["height", "weight", "age", "gender"]);
