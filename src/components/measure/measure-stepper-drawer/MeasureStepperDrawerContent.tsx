import { Box } from "@mui/material";
import React, {  } from "react";

import { useMeasureContext } from "../../../hooks/UseMeasureContext";
import { MeasureForm } from "../measure-form/MeasureForm";
import { MeasureImage } from "../MeasureImage";

export const MeasureStepperDrawerForm: React.FC = () => {
  const { currentValue, setCurrentValue, actions, currentMeasure} = useMeasureContext();

  return (
    <>
      <MeasureImage/>
      <Box sx={{padding: 2}}>
        <MeasureForm 
          measure={currentMeasure}
          value={currentValue}
          onValueChange={setCurrentValue}/>
        <Box sx={{paddingTop: 2}}>
          {actions}
        </Box>
      </Box>
    </>);
};