import { create } from "zustand";

import config from "../config";
import { CoreService } from "../services/core-service/CoreService";
import { ComputationResult } from "../services/core-service/interfaces";

import { MeasureValue } from "./interfaces/MeasureValue";

type State = {
  loading: boolean;
  initialized: boolean;
  sports: ComputationResult[];
};

type Actions = {
  rankSports: (measureValues: MeasureValue[]) => Promise<void>;
};

type SportStore = State & Actions;

const initialValues: State = {
  loading: true,
  initialized: false,
  sports: []
};

const coreService = new CoreService(config.backend.baseUrl);

export const useSportStore = create<SportStore>()(
  (set) => ({
    ...initialValues,
    rankSports: async (measureValues: MeasureValue[]): Promise<void> => {
      set({ loading: true });

      const sports = await coreService
        .evaluateSports(measureValues);

      set({ sports, loading: false, initialized: true });
    }
  })
);
