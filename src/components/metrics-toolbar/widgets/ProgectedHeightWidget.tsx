import { Ruler as RulerIcon } from "@phosphor-icons/react/dist/ssr/Ruler";
import * as React from "react";
import { useState } from "react";

import withMeasureValueChanges from "../../../hooks/WithMeasureValues";
import { CoreService } from "../../../services/core-service/CoreService";
import { MeasureValue } from "../../../stores/interfaces/MeasureValue";

import { MeasureValuesChangeHandler } from "./interfaces/MeasureValuesChangeHandler";
import { TrendWidget, TrendWidgetProps } from "./TrendWidget";

const ProgectedHeightWidget = React.forwardRef<MeasureValuesChangeHandler>((_, ref) => {
  const [trendWidgetProps, setTrendWidgetProps] = useState<TrendWidgetProps>({
    name: "Progected height",
    loading: true,
    value: undefined,
    measure: "(cm)",
    diff: undefined,
    trend: "up",
    icon: RulerIcon,
    iconColor: "success",
    description: "Progected height at 18"
  });

  React.useImperativeHandle(ref, () => ({
    async onMeasureValuesChange(coreService: CoreService, measureValues: MeasureValue[]) {
      const metrics = await coreService.evaluateMetrics(measureValues, ["height_at_18"]);
      const metricValue = metrics[0].result;
      const height = measureValues.find(x => x.name === "height")?.value;
      const newTrendWidgetProps = {... trendWidgetProps, ... {
        loading: false,
        value: isNaN(metricValue) ? undefined : metricValue.toString(),
        diff: !!(height) && !isNaN(metricValue) ? `+${metricValue - Number(height)}` : undefined
      }};

      setTrendWidgetProps(newTrendWidgetProps);
    }
  }));
  
  return (
    <TrendWidget {...trendWidgetProps} />
  );
});

export default withMeasureValueChanges(ProgectedHeightWidget, ["height", "age", "gender"]);
