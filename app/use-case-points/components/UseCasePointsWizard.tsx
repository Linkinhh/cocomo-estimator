"use client"

import { useUseCasePoints } from '../context';
import StepNavigation from './StepNavigation';
import Step1ActorsAndUseCases from './Step1ActorsAndUseCases';
import Step2TechnicalFactors from './Step2TechnicalFactors';
import Step3EnvironmentalFactors from './Step3EnvironmentalFactors';
import Step4Results from './Step4Results';

export default function UseCasePointsWizard() {
  const { state } = useUseCasePoints();

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1ActorsAndUseCases />;
      case 2:
        return <Step2TechnicalFactors />;
      case 3:
        return <Step3EnvironmentalFactors />;
      case 4:
        return <Step4Results />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="space-y-6">
      <StepNavigation />
      <div className="p-6 bg-white rounded-lg shadow-md">
        {renderStep()}
      </div>
    </div>
  );
}
