import { CardMedia } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";

import { useMeasureStepperStore } from "../../stores/MeasureStepperStore";
import { DashboardCard } from "../common/DashboardCard";

import { MeasureStepperProps } from "./interfaces/MeasureStepperProps";
import { MeasureForm } from "./measure-form/MeasureForm";
import { MeasureStepperActions } from "./MeasureStepperActions";
import { MeasureImage } from "./MeasureImage";

export function MeasureStepperCard({
  enterMeasure,
}: MeasureStepperProps): React.JSX.Element {
  const {
    loading,
    initialized,
    loadMeasures,
    getCurrentMeasure,
    moveBack,
    moveNext } = useMeasureStepperStore();
  const currentMeasure = getCurrentMeasure();
  const [currentValue, setCurrentValue] = React.useState<string | undefined>();

  useEffect(() => {
    if(!initialized) {
      loadMeasures();
    }
  }, []);

  const handleClickBack = () => {
    moveBack();
    setCurrentValue(undefined);
  };

  const handleClickNext = () => {
    if (enterMeasure(currentMeasure!, currentValue)) {
      moveNext();
      setCurrentValue(undefined);
    }
  };

  return (
    <DashboardCard
      titleKey={"measure.stepper.title"}
      loading={loading}
      actions={<MeasureStepperActions
        onClickBack={handleClickBack}
        onClickNext={handleClickNext}
      />}
      media={
        (currentMeasure && (<MeasureImage/>))
      }>
      {currentMeasure && (
        <MeasureForm 
          measure={currentMeasure}
          value={currentValue}
          onValueChange={setCurrentValue}/>
      )}
    </DashboardCard>
  );
}