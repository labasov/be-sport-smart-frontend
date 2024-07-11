import { ChartLine as ChartLineIcon } from "@phosphor-icons/react/dist/ssr/ChartLine";
import * as React from "react";
import { useState } from "react";

import withMeasureValueChanges from "../../../hooks/WithMeasureValues";
import { CoreService } from "../../../services/core-service/CoreService";
import { MeasureValue } from "../../../stores/interfaces/MeasureValue";

import { MeasureValuesChangeHandler } from "./interfaces/MeasureValuesChangeHandler";
import { TrendWidget, TrendWidgetProps } from "./TrendWidget";

const GrowthVelocityWidget = React.forwardRef<MeasureValuesChangeHandler>((_, ref) => {
  const [trendWidgetProps, setTrendWidgetProps] = useState<TrendWidgetProps>({
    name: "Growth Velocity",
    loading: true,
    value: "7",
    measure: "(cm/year)",
    diff: undefined,
    trend: "trendUp",
    trendColor: "success",
    icon: ChartLineIcon,
    iconColor: "primary",
    description: "Gain during these years"
  });

  React.useImperativeHandle(ref, () => ({
    async onMeasureValuesChange(coreService: CoreService, measureValues: MeasureValue[]) {
      const metrics = await coreService.evaluateMetrics(measureValues, ["height_at_18"]);
      const heightAt18 = metrics[0].result;
      const height = measureValues.find(x => x.name === "height")?.value;
      const age = measureValues.find(x => x.name === "age")?.value;
      const allDataProvided = !!(height) && !!(age) && !isNaN(heightAt18);
      const newTrendWidgetProps = {... trendWidgetProps, ... {
        loading: false,
        value: allDataProvided ? ((heightAt18 - Number(height)) / (18 - Number(age))).toFixed(2) : undefined,
        diff: `${age ?? '?'} - 18`
      }};

      setTrendWidgetProps(newTrendWidgetProps);
    }
  }));
  
  return (
    <TrendWidget { ...trendWidgetProps }/>
  );
});

export default withMeasureValueChanges(GrowthVelocityWidget, ["height", "age", "gender"]);
