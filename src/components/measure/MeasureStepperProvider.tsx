import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { useEffect } from "react";

import { MeasureContext, ScreenType } from "../../hooks/UseMeasureContext";
import { useStaticTranslation } from "../../hooks/UseTranslation";
import { MeasureType } from "../../services/core-service/interfaces";
import { useMeasureStepperStore } from "../../stores/MeasureStepperStore";
import { useMeasureValuesStore } from "../../stores/MeasureValuesStore";

import { MeasureStepperActions } from "./MeasureStepperActions";

export interface MeasureStepperProviderProps {
  measuresUpdated: (useNoValues?: boolean) => Promise<void>;
  children : React.ReactNode
}

export function MeasureStepperProvider({
  children,
  measuresUpdated,
}: MeasureStepperProviderProps): React.JSX.Element {
  const { t } = useStaticTranslation();
  const {
    loading,
    initialized,
    currentMeasureIndex,
    measures: { length: measureCount },
    loadMeasures,
    getCurrentMeasure,
    moveBack,
    moveNext,
    moveFirst } = useMeasureStepperStore();
  const currentMeasure = getCurrentMeasure();
  const { getMeasureValue, setMeasureValue, clearAllMeasureValues } = useMeasureValuesStore();
  const [ submittedLastMeasure, setSubmittedLastMeasure ] = React.useState(false);

  useEffect(() => {
    if(!initialized) {
      loadMeasures();
    }
  }, []);

  const handleClickBack = () => {
    setSubmittedLastMeasure(false);
    if (!submittedLastMeasure) {
      moveBack();
    }
  };

  const handleClickSubmit = async () => {
    if (!currentMeasure) {
      return;
    }

    const measureValue = getMeasureValue(currentMeasure);
    let newMeasureAccepted = false;

    switch (currentMeasure.type) {
      case MeasureType.String:
      case MeasureType.Number:
        if (measureValue) {
          if (!!currentMeasure.minValue && Number(measureValue) < currentMeasure.minValue) {
            enqueueSnackbar(t("sport.rank.alerts.measureBelowMin", { min: currentMeasure.minValue }), { variant: "error" });
            return;
          }

          if (!!currentMeasure.maxValue && Number(measureValue) > currentMeasure.maxValue) {
            enqueueSnackbar(t("sport.rank.alerts.measureAboveMax", { max: currentMeasure.maxValue }), { variant: "error" });
            return;
          }

          newMeasureAccepted = true;
        } else if (currentMeasure.options.length > 0) {
          setMeasureValue(currentMeasure, currentMeasure.options[0]);
          newMeasureAccepted = true;
        }
        break;
      case MeasureType.Boolean:
        if (measureValue) {
          newMeasureAccepted = true;
        } else {
          setMeasureValue(currentMeasure, "false");
          newMeasureAccepted = true;
        }
        break;
      default:
        break;
    }

    if (!newMeasureAccepted) {
      enqueueSnackbar(t("sport.rank.alerts.nonValidMeasure"), { variant: "error" });
    }
    else{
      await measuresUpdated();
      if (moveNext() === currentMeasure) {
        setSubmittedLastMeasure(true);
      }
    }
  };

  const handleClickReset = async () => {
    clearAllMeasureValues();
    await measuresUpdated(true);
    moveFirst();
    setSubmittedLastMeasure(false);
  }

  const handleSetCurrentValue = (value?: string) => {
    if (!currentMeasure) {
      return;
    }

    setSubmittedLastMeasure(false);
    setMeasureValue(currentMeasure, value);
  }

  const actions = <MeasureStepperActions
    onClickBack={handleClickBack}
    onClickSubmit={handleClickSubmit}
    onClickReset={handleClickReset}
    firstStep={currentMeasureIndex === 0}
    lastStep={currentMeasureIndex === measureCount - 1}
    showReset={submittedLastMeasure}
    showSubmit={true}
  />

  const screenType = submittedLastMeasure ? ScreenType.Final : ScreenType.Measuring;

  return (
    <MeasureContext.Provider value={{ loading, screenType, actions, currentValue: getMeasureValue(currentMeasure!), setCurrentValue: handleSetCurrentValue, currentMeasure }}>
      { children}
    </MeasureContext.Provider>
  );
}