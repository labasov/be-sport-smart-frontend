import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/system";
import { ArrowCounterClockwise as ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowCounterClockwise";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import React from "react";

import { useStaticTranslation } from "../../hooks/UseTranslation";
import { ConfirmationPopover } from "../common/ConfirmationPopover";

interface MeasureStepperActionsProps {
  onClickBack: () => void;
  onClickSubmit: () => Promise<void>;
  onClickReset: () => Promise<void>;
  firstStep: boolean;
  lastStep: boolean;
  showReset: boolean;
  showSubmit: boolean;
  sx?: SxProps;
}

export const MeasureStepperActions: React.FC<MeasureStepperActionsProps> = ({
  onClickBack,
  onClickSubmit,
  onClickReset,
  firstStep,
  lastStep,
  showReset,
  showSubmit,
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
        pb: "2",
      }}
    >
      <Box>
        <Button
          color="secondary"
          startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
          variant="text"
          size="small"
          onClick={onClickBack}
          disabled={isSubmitting || firstStep}
        >
          {t("measure.stepper.actions.back")}
        </Button>
        {showReset && (
          <ConfirmationPopover
            onConfirm={handleReset}
            message={t("measure.stepper.actions.startOverQuestion")}
          >
            <Button
              sx={{ ml: 1 }}
              color="secondary"
              startIcon={
                <ArrowCounterClockwiseIcon fontSize="var(--icon-fontSize-md)" />
              }
              variant="outlined"
              size="small"
              disabled={isSubmitting}
            >
              {t("measure.stepper.actions.reset")}
            </Button>
          </ConfirmationPopover>
        )}
      </Box>
      {showSubmit && (
        <Button
          color="primary"
          variant="outlined"
          onClick={handleSubmit}
          size="small"
          disabled={isSubmitting || showReset}
        >
          {lastStep
            ? t("measure.stepper.actions.enter")
            : t("measure.stepper.actions.next")}
        </Button>
      )}
    </Box>
  );
};

export default MeasureStepperActions;
