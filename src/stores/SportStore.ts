import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import config from "../config";
import { CoreService } from "../services/core-service/CoreService";
import { ComputationResult, ComputationType } from "../services/core-service/interfaces";

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

const coreService = new CoreService(config.api.baseUrl);

export const useSportStore = create<SportStore>()(
  persist(
    (set, get) => ({
      ...initialValues,
      rankSports: async (measureValues: MeasureValue[]): Promise<void> => {
        set({ loading: true });

        const sports = await coreService
          .evaluateComputations(
            ComputationType.Sport,
            measureValues.reduce((acc, m) => {
              acc[m.name] = m.value;
              return acc;
            }, {} as { [key: string]: string }));

        set({ sports, loading: false, initialized: true });
      }
    }),
    {
      name: "sports-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
