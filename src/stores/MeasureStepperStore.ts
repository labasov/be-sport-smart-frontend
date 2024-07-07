import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import config from "../config";
import { CoreService } from "../services/core-service/CoreService";
import { Measure } from "../services/core-service/interfaces";

type State = {
  loading: boolean;
  initialized: boolean;
  measures: Measure[];
  currentMeasureIndex: number;
};

type Actions = {
  loadMeasures: () => Promise<Measure[]>;
  getCurrentMeasure: () => Measure | undefined;
  getCurrentMeasureIndex: () => number;
  getMeasureCount: () => number;
  moveBack: () => Measure;
  moveNext: () => Measure;
  moveFirst: () => Measure;
};

type MeasureStepperStore = State & Actions;

const initialValues: State = {
  loading: true,
  initialized: false,
  measures: [],
  currentMeasureIndex: 0
};

const coreService = new CoreService(config.backend.baseUrl);

export const useMeasureStepperStore = create<MeasureStepperStore>()(
  persist(
    (set, get) => ({
      ...initialValues,
      loadMeasures: async (): Promise<Measure[]> => {
        set({ loading: true });
        const measures = await coreService.getMeasures();
        set({ measures, loading: false, initialized: true});
        return get().measures;
      },
      getCurrentMeasure: () => {
        const { measures, currentMeasureIndex: currentInputIndex } = get();
        return measures[currentInputIndex];
      },
      moveBack: () => {
        const { currentMeasureIndex, measures } = get();
        const newIndex = (currentMeasureIndex ?? 0) - 1;
        if (newIndex < 0) {
          return measures[0];
        }
        set({ currentMeasureIndex: newIndex });
        return measures[newIndex];
      },
      moveNext: () => {
        const { currentMeasureIndex, measures } = get();
        const newIndex = (currentMeasureIndex ?? 0) + 1;
        if (newIndex >= get().measures.length) {
          return measures[measures.length - 1];
        }
        set({ currentMeasureIndex: (currentMeasureIndex ?? 0) + 1 });
        return measures[newIndex];
      },
      moveFirst: () => {
        const { measures } = get();
        set({ currentMeasureIndex: 0 });
        return measures[0];
      },
      getCurrentMeasureIndex: () => get().currentMeasureIndex ?? 0,
      getMeasureCount: () => get().measures.length
    }),
    {
      name: "measure-stepper-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
