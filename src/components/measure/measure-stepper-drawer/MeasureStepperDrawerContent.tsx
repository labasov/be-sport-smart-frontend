import { Box } from "@mui/material";
import React from "react";

import {
  ScreenType,
  useMeasureContext,
} from "../../../hooks/UseMeasureContext";
import FinalScreen from "../FinalScreen";
import { MeasureForm } from "../measure-form/MeasureForm";
import { MeasureImage } from "../MeasureImage";

export const MeasureStepperDrawerForm: React.FC = () => {
  const { currentValue, screenType, setCurrentValue, actions, currentMeasure } =
    useMeasureContext();

  const isMeasuring = screenType == ScreenType.Measuring;

  return (
    <>
      {isMeasuring && <MeasureImage />}
      <Box sx={{ padding: 2 }}>
        {(isMeasuring && (
          <MeasureForm
            measure={currentMeasure}
            value={currentValue}
            onValueChange={setCurrentValue}
          />
        )) || <FinalScreen />}
        <Box sx={{ paddingTop: isMeasuring ? 2 : 6 }}>
          {actions}
        </Box>
      </Box>
    </>
  );
};
