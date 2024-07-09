import * as React from "react";
import { Ruler as RulerIcon } from "@phosphor-icons/react/dist/ssr/Ruler";
import { TrendWidget, TrendWidgetProps } from "./TrendWidget";
import withMeasureValueChanges from "../../../hooks/WithMeasureValues";
import { MeasureValuesChangeHandler } from "./interfaces/MeasureValuesChangeHandler";
import { CoreService } from "../../../services/core-service/CoreService";
import { useState } from "react";

const ProgectedHeightWidget = React.forwardRef<MeasureValuesChangeHandler>((_, ref) => {
  const [trendWidgetProps, setTrendWidgetProps] = useState<TrendWidgetProps>({
    name: "Progected height",
    loading: true,
    diff: "+20 (cm)",
    trend: "up",
    value: "180 (cm)",
    icon: RulerIcon,
    iconColor: "success",
    description: "Your progected height at 18"
  });

  React.useImperativeHandle(ref, () => ({
    async onMeasureValuesChange(coreService: CoreService, measureValues: { [key: string]: string | undefined }) {
      console.log("Values changed in BMI Widget:", measureValues);
    }
  }));
  
  return (
    <TrendWidget {...trendWidgetProps} />
  );
});

export default withMeasureValueChanges(ProgectedHeightWidget, ["height", "age", "gender"]);
