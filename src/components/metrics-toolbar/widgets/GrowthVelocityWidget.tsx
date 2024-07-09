import * as React from "react";
import { ChartLine as ChartLineIcon } from "@phosphor-icons/react/dist/ssr/ChartLine";
import { TrendWidget, TrendWidgetProps } from "./TrendWidget";
import { MeasureValuesChangeHandler } from "./interfaces/MeasureValuesChangeHandler";
import withMeasureValueChanges from "../../../hooks/WithMeasureValues";
import { CoreService } from "../../../services/core-service/CoreService";
import { useState } from "react";

const GrowthVelocityWidget = React.forwardRef<MeasureValuesChangeHandler>((_, ref) => {
  const [trendWidgetProps, setTrendWidgetProps] = useState<TrendWidgetProps>({
    name: "Growth Velocity",
    loading: false,
    diff: undefined,
    trend: undefined,
    value: "7 (cm/year)",
    icon: ChartLineIcon,
    iconColor: "primary",
    description: "Slower than avarage"
  });

  React.useImperativeHandle(ref, () => ({
    async onMeasureValuesChange(coreService: CoreService, measureValues: { [key: string]: string | undefined }) {
      console.log("Values changed in BMI Widget:", measureValues);
    }
  }));
  
  return (
    <TrendWidget { ...trendWidgetProps }/>
  );
});

export default withMeasureValueChanges(GrowthVelocityWidget, ["height", "age", "gender"]);
