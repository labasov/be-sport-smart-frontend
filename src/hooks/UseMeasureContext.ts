import { createContext, useContext } from 'react';

import { Measure } from '../services/core-service/interfaces';

type MeasureContextProps = {
  loading: boolean;
  currentValue: string | undefined;
  setCurrentValue: (value: string | undefined) => void;
  currentMeasure: Measure | undefined;
  actions: React.ReactNode;
};

export const MeasureContext = createContext<MeasureContextProps | undefined>(undefined);

export const useMeasureContext = () => {
  const context = useContext(MeasureContext);
  if (!context) {
    throw new Error('useMeasureContext must be used within a MeasureProvider');
  }
  return context;
};