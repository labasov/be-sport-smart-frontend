import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import config from "../config";
import { CoreService } from "../services/core-service/CoreService";
import { Measure } from "../services/core-service/interfaces";

type State = {
  loading: boolean;
  initialized: boolean;
  measures: Measure[];
  currentInputIndex: number;
};

type Actions = {
  loadMeasures: () => Promise<Measure[]>;
  getCurrentMeasure: () => Measure | undefined;
  getCurrentMeasureIndex: () => number;
  getMeasureCount: () => number;
  moveBack: () => void;
  moveNext: () => void;
};

type MeasureStepperStore = State & Actions;

const initialValues: State = {
  loading: true,
  initialized: false,
  measures: [],
  currentInputIndex: 0
};

const coreService = new CoreService(config.api.baseUrl);

export const useMeasureStepperStore = create<MeasureStepperStore>()(
  persist(
    (set, get) => ({
      ...initialValues,
      loadMeasures: async (): Promise<Measure[]> => {
        set({ loading: true });
        const inputs = await coreService.getMeasures();
        set({ measures: inputs, loading: false, initialized: true});
        return get().measures;
      },
      getCurrentMeasure: () => {
        const { measures: inputs, currentInputIndex } = get();
        return inputs[currentInputIndex];
      },
      moveBack: () => {
        const { currentInputIndex } = get();
        const newIndex = (currentInputIndex ?? 0) - 1;
        if (newIndex < 0) {
          return;
        }
        set({ currentInputIndex: newIndex });
      },
      moveNext: () => {
        const { currentInputIndex } = get();
        const newIndex = (currentInputIndex ?? 0) + 1;
        if (newIndex >= get().measures.length) {
          return;
        }
        set({ currentInputIndex: (currentInputIndex ?? 0) + 1 });
      },
      getCurrentMeasureIndex: () => get().currentInputIndex ?? 0,
      getMeasureCount: () => get().measures.length
    }),
    {
      name: "measure-stepper-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
