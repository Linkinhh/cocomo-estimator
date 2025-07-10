export interface ActorCounts {
  simple: number;
  medium: number;
  complex: number;
}

export interface UseCaseCounts {
  simple: number;
  medium: number;
  complex: number;
}

export type UseCaseMethod = 'transactions' | 'analysisClasses';

export interface TechnicalFactors {
  [key: string]: number;
  t1: number; t2: number; t3: number; t4: number; t5: number;
  t6: number; t7: number; t8: number; t9: number; t10: number;
  t11: number; t12: number; t13: number;
}

export interface EnvironmentalFactors {
  [key: string]: number;
  f1: number; f2: number; f3: number; f4: number; f5: number;
  f6: number; f7: number; f8: number;
}

export interface UseCasePointsState {
  currentStep: number;
  actors: ActorCounts;
  useCases: UseCaseCounts;
  useCaseMethod: UseCaseMethod;
  technicalFactors: TechnicalFactors;
  environmentalFactors: EnvironmentalFactors;
  personnelCost: number;
}
