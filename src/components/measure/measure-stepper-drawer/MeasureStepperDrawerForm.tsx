import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useMeasureStepperStore } from "../../../stores/MeasureStepperStore";
import { MeasureStepperProps } from "../interfaces/MeasureStepperProps";
import { MeasureForm } from "../measure-form/MeasureForm";
import { MeasureImage } from "../MeasureImage";
import MeasureStepperActions from "../MeasureStepperActions";

export const MeasureStepperDrawerForm: React.FC<MeasureStepperProps> = ({ enterMeasure }) => {
  const {
    initialized,
    loadMeasures,
    getCurrentMeasure,
    moveBack,
    moveNext } = useMeasureStepperStore();
  const currentMeasure = getCurrentMeasure();
  const [currentValue, setCurrentValue] = useState<string | undefined>();

  useEffect(() => {
    if(!initialized) {
      loadMeasures();
    }
  }, []);

  const handleClickBack = () => {
    moveBack();
    setCurrentValue(undefined);
  };

  const handleClickNext = async () => {
    if (await enterMeasure(currentMeasure!, currentValue)) {
      moveNext();
      setCurrentValue(undefined);
    }
  };

  if (!currentMeasure)
    return <></>;

  return (
    <Box sx={{padding: 2}}>
      <MeasureImage/>
      <MeasureForm 
        measure={currentMeasure}
        value={currentValue}
        onValueChange={setCurrentValue}/>
      <MeasureStepperActions
        sx={{marginTop: 2}}
        onClickBack={handleClickBack}
        onClickNext={handleClickNext}
      />
    </Box>);
};