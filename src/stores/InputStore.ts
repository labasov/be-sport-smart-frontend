import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { InputService } from "../services/input-service/InputService";
import config from "../config";
import { InputDto } from "../services/input-service/interfaces";

type State = {
  loading: boolean;
  inputs: InputDto[];
  currentInputIndex: number;
};

type Actions = {
  loadInputs: () => Promise<InputDto[]>;
  getCurrentInput: () => InputDto;
  moveNext: () => void;
  getCurrentInputIndex: () => number;
  getTotals: () => number;
};

type InputStore = State & Actions;

const initialValues: State = {
  loading: true,
  inputs: [],
  currentInputIndex: 0
};

const inputService = new InputService(config.api.baseUrl);

export const useInputStore = create<InputStore>()(
  persist(
    (set, get) => ({
      ...initialValues,
      loadInputs: async () : Promise<InputDto[]> => {
        set({ loading: true });
        const inputs = await inputService.getInputs();
        set({ inputs, loading: false });
        return get().inputs;
      },
      getCurrentInput: () => {
        const { inputs, currentInputIndex } = get();
        return inputs[currentInputIndex];
      },
      moveNext: () => {
        const { currentInputIndex } = get();
        const newIndex = (currentInputIndex ?? 0) + 1;
        if (newIndex >= get().inputs.length) {
          return;
        }

        set({ currentInputIndex: (currentInputIndex ?? 0) + 1 });
      },
      getCurrentInputIndex: () => get().currentInputIndex ?? 0,
      getTotals: () => get().inputs.length
    }),
    {
      name: "input-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
