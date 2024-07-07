import * as React from "react";

import { ScreenType, useMeasureContext } from "../../hooks/UseMeasureContext";
import { DashboardCard } from "../common/DashboardCard";

import FinalScreen from "./FinalScreen";
import { MeasureForm } from "./measure-form/MeasureForm";
import { MeasureImage } from "./MeasureImage";

export function MeasureStepperCard(): React.JSX.Element {
  const {
    loading,
    screenType,
    currentValue,
    setCurrentValue,
    actions,
    currentMeasure,
  } = useMeasureContext();

  return (
    <DashboardCard
      titleKey={"measure.stepper.title"}
      loading={loading}
      buttomActions={actions}
      media={(screenType == ScreenType.Measuring && <MeasureImage />)}
    >
      {screenType == ScreenType.Measuring && (
        <MeasureForm
          measure={currentMeasure}
          value={currentValue}
          onValueChange={setCurrentValue}
        />
      )
      || (
        <FinalScreen/>
      )}
    </DashboardCard>
  );
}
