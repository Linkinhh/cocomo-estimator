"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UseCasePointsState, ActorCounts, UseCaseCounts, TechnicalFactors, EnvironmentalFactors } from './types';

const initialState: UseCasePointsState = {
  currentStep: 1,
  actors: {
    simple: 0,
    medium: 0,
    complex: 0,
  },
  useCases: {
    simple: 0,
    medium: 0,
    complex: 0,
  },
  useCaseMethod: 'transactions',
  technicalFactors: {
    t1: 3, t2: 3, t3: 3, t4: 3, t5: 3, t6: 3, t7: 3,
    t8: 3, t9: 3, t10: 3, t11: 3, t12: 3, t13: 3,
  },
  environmentalFactors: {
    f1: 3, f2: 3, f3: 3, f4: 3, f5: 3, f6: 3, f7: 0, f8: 0,
  },
  personnelCost: 5000,
};

interface UseCasePointsContextType {
  state: UseCasePointsState;
  updateState: (newState: Partial<UseCasePointsState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

const UseCasePointsContext = createContext<UseCasePointsContextType | undefined>(undefined);

export const UseCasePointsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UseCasePointsState>(initialState);

  const updateState = (newState: Partial<UseCasePointsState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const nextStep = () => {
    if (state.currentStep < 4) { // Assuming 4 steps total
      setState(prevState => ({ ...prevState, currentStep: prevState.currentStep + 1 }));
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setState(prevState => ({ ...prevState, currentStep: prevState.currentStep - 1 }));
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      setState(prevState => ({ ...prevState, currentStep: step }));
    }
  };

  return (
    <UseCasePointsContext.Provider value={{ state, updateState, nextStep, prevStep, goToStep }}>
      {children}
    </UseCasePointsContext.Provider>
  );
};

export const useUseCasePoints = () => {
  const context = useContext(UseCasePointsContext);
  if (context === undefined) {
    throw new Error('useUseCasePoints must be used within a UseCasePointsProvider');
  }
  return context;
};
