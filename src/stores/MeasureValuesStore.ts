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
  setValue: (measure: Measure, value: string) => boolean;
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
      setValue: (measure: Measure, value: string): boolean => {
        const { measureValues: measures } = get();
        const measureIndex = measures.findIndex((m) => m.name === measure.name);
        if (measureIndex !== -1) {
          const oldMeasure = measures[measureIndex];
          const newMeasures = [...measures];
          newMeasures[measureIndex] = { ...measures[measureIndex], value };
          set({ measureValues: newMeasures });
          return oldMeasure.value !== value;
        } else {
          const newMeasure = { ...measure, value };
          set({ measureValues: [...measures, newMeasure] });
          return true;
        }
      }
    }),
    {
      name: "measure-values-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
