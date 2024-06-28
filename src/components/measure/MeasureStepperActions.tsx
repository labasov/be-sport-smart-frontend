import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/system";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import React from "react";
import { useStaticTranslation } from "../../hooks/UseTranslation";

interface MeasureStepperActionsProps {
  onClickBack: () => void;
  onClickNext: () => void;
  sx?: SxProps
}

export const MeasureStepperActions: React.FC<MeasureStepperActionsProps> = ({
  onClickBack,
  onClickNext,
  sx,
}) => {
  const { t } = useStaticTranslation();

  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Button
        color="secondary"
        startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        onClick={onClickBack}
      >
        {t('measure.stepper.actions.back')}
      </Button>
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        onClick={onClickNext}
      >
        {t('measure.stepper.actions.next')}
      </Button>
    </Box>
  );
};

export default MeasureStepperActions;