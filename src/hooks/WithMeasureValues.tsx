import { useEffect, useRef, ComponentType, FC } from "react";

import { MeasureValuesChangeHandler } from "../components/metrics-toolbar/widgets/interfaces/MeasureValuesChangeHandler";
import config from "../config";
import { CoreService } from "../services/core-service/CoreService";
import { MeasureValue } from "../stores/interfaces/MeasureValue";
import { useMeasureValuesStore } from "../stores/MeasureValuesStore";
import { useSportStore } from "../stores/SportStore";

const coreService = new CoreService(config.backend.baseUrl);

const withMeasureValueChanges = <P extends object>(
  Component: ComponentType<P>,
  dependentMeasures: string[]
): FC<P> => {
  return (props: P) => {
    const childRef = useRef<MeasureValuesChangeHandler>();
    const { measureValues } = useMeasureValuesStore();
    const { sports } = useSportStore();
    const previousValuesRef = useRef<MeasureValue[]>([]);

    const getMetricValues = (): MeasureValue[] => {
      const values: MeasureValue[] = [];

      for (const measure of dependentMeasures) {
        const measureValue = measureValues.find((m) => m.name === measure);

        if (measureValue) {
          values.push(measureValue);
        }
      }

      return values;
    };

    useEffect(() => {
      const currentValues = getMetricValues();
      let valuesChanged = false;
    
      for (const currentValue of currentValues) {
        const previousValue = previousValuesRef.current.find(
          (prev) => prev.name === currentValue.name
        );
        if (previousValue?.value !== currentValue?.value) {
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
