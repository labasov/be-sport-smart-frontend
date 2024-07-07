import * as React from "react";

import { useMeasureContext } from "../../hooks/UseMeasureContext";
import { DashboardCard } from "../common/DashboardCard";

import { MeasureForm } from "./measure-form/MeasureForm";
import { MeasureImage } from "./MeasureImage";

export function MeasureStepperCard(): React.JSX.Element {
  const { loading, currentValue, setCurrentValue, actions, currentMeasure} = useMeasureContext();

  return (
    <DashboardCard
      titleKey={"measure.stepper.title"}
      loading={loading}
      actions={actions}
      media={
        <MeasureImage/>
      }>
      <MeasureForm
        measure={currentMeasure}
        value={currentValue}
        onValueChange={setCurrentValue}/>
    </DashboardCard>
  );
}