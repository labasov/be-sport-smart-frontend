import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/system";
import { ArrowCounterClockwise as ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import React from "react";

import { useStaticTranslation } from "../../hooks/UseTranslation";

interface MeasureStepperActionsProps {
  onClickBack: () => void;
  onClickSubmit: () => Promise<void>;
  onClickReset: () => Promise<void>;
  firstStep: boolean;
  lastStep: boolean;
  showReset: boolean;
  sx?: SxProps;
}

export const MeasureStepperActions: React.FC<MeasureStepperActionsProps> = ({
  onClickBack,
  onClickSubmit,
  onClickReset,
  firstStep,
  lastStep,
  showReset,
  sx,
}) => {
  const { t } = useStaticTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onClickSubmit();
    setIsSubmitting(false);
  };

  const handleReset = async () => {
    setIsSubmitting(true);
    await onClickReset();
    setIsSubmitting(false);
  };

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
        disabled={isSubmitting || firstStep}
      >
        {t("measure.stepper.actions.back")}
      </Button>
      {(showReset && (
        <Button
          color="primary"
          endIcon={<ArrowCounterClockwiseIcon fontSize="var(--icon-fontSize-md)" />}
          variant="text"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          {t("measure.stepper.actions.reset")}
        </Button>
      )) || (
        <Button
          color="primary"
          endIcon={lastStep ? <></> : <ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {lastStep ? t("measure.stepper.actions.enter") : t("measure.stepper.actions.next")}
        </Button>
      )}
    </Box>
  );
};

export default MeasureStepperActions;
