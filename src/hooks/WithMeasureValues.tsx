import { useEffect, useRef, ComponentType, FC } from "react";
import { useMeasureValuesStore } from "../stores/MeasureValuesStore";
import { useSportStore } from "../stores/SportStore";
import { MeasureValuesChangeHandler } from "../components/metrics-toolbar/widgets/interfaces/MeasureValuesChangeHandler";
import { CoreService } from "../services/core-service/CoreService";
import config from "../config";

var coreService = new CoreService(config.backend.baseUrl);

const withMeasureValueChanges = <P extends object>(
  Component: ComponentType<P>,
  dependentMeasures: string[]
): FC<P> => {
  return (props: P) => {
    const childRef = useRef<MeasureValuesChangeHandler>();
    const { measureValues } = useMeasureValuesStore();
    const { sports } = useSportStore();
    const previousValuesRef = useRef<{ [key: string]: string | undefined }>({});

    const getMetricValues = (): { [key: string]: string | undefined } => {
      const values: { [key: string]: string | undefined } = {};

      for (const measure of dependentMeasures) {
        const measureValue = measureValues.find((m) => m.name === measure);
        values[measure] = measureValue?.value;
      }

      return values;
    };

    useEffect(() => {
      const currentValues = getMetricValues();
      let valuesChanged = false;

      for (const key in currentValues) {
        if (currentValues[key] !== previousValuesRef.current[key]) {
          valuesChanged = true;
          break;
        }
      }

      if (valuesChanged) {
        if (childRef.current) {
          childRef.current.onMeasureValuesChange(coreService, currentValues);
        }

        previousValuesRef.current = currentValues;
      }
    }, [sports]);

    return <Component {...props} ref={childRef} />;
  };
};

export default withMeasureValueChanges;
