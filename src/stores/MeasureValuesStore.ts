import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Measure } from "../services/core-service/interfaces";

import { MeasureValue } from "./interfaces/MeasureValue";

type State = {
  loading: boolean;
  measureValues: MeasureValue[];
};

type Actions = {
  loadFromAccount: () => Promise<void>;
  setMeasureValue: (measure: Measure, value?: string) => boolean;
  getMeasureValue: (measure: Measure) => string;
  clearAllMeasureValues: () => void;
};

type MeasureValuesStore = State & Actions;

const initialValues: State = {
  loading: true,
  measureValues: [],
};

// const coreService = new CoreService(config.api.baseUrl);

export const useMeasureValuesStore = create<MeasureValuesStore>()(
  persist(
    (set, get) => ({
      ...initialValues,
      loadFromAccount: async (): Promise<void> => {
        set({ loading: true });
        // TODO: Load measure values from account
        set({ measureValues: [], loading: false });
      },
      setMeasureValue: (measure: Measure, value?: string): boolean => {
        const { measureValues } = get();
        const measureIndex = measureValues.findIndex((m) => m.name === measure.name);
        if (measureIndex !== -1) {
          const oldMeasure = measureValues[measureIndex];
          const newMeasures = [...measureValues];
          newMeasures[measureIndex] = { ...measureValues[measureIndex], value };
          set({ measureValues: newMeasures });
          return oldMeasure.value !== value;
        } else {
          const newMeasure = { ...measure, value };
          set({ measureValues: [...measureValues, newMeasure] });
          return true;
        }
      },
      getMeasureValue: (measure: Measure): string => {
        const { measureValues } = get();
        const measureIndex = measureValues.findIndex((m) => m.name === measure.name);
        return measureIndex !== -1 ? measureValues[measureIndex].value! : "";
      },
      clearAllMeasureValues: () => {
        set({ measureValues: [] });
      },
    }),
    {
      name: "measure-values-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
