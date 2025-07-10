"use client"

import { useUseCasePoints } from '../context';

const steps = [
  { id: 1, title: 'Actores y Casos de Uso', description: 'Definir actores y casos de uso' },
  { id: 2, title: 'Factores Técnicos', description: 'Evaluar la complejidad técnica' },
  { id: 3, title: 'Factores Ambientales', description: 'Evaluar el entorno del proyecto' },
  { id: 4, title: 'Resultados', description: 'Ver la estimación final' },
];

export default function StepNavigation() {
  const { state, goToStep } = useUseCasePoints();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => goToStep(step.id)}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium transition-colors ${
                state.currentStep === step.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : state.currentStep > step.id
                  ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                  : 'bg-white text-gray-400 border-gray-300 hover:border-gray-400'
              }`}
              disabled={step.id > state.currentStep}
            >
              {state.currentStep > step.id ? '✓' : step.id}
            </button>
            
            <div className="ml-3 hidden md:block">
              <p className={`text-sm font-medium ${
                state.currentStep === step.id ? 'text-blue-600' : 
                state.currentStep > step.id ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div className={`hidden md:block w-12 h-0.5 mx-4 ${
                state.currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile version */}
      <div className="md:hidden mt-4">
        <div className="text-center">
          <p className="text-sm font-medium text-blue-600">
            Paso {state.currentStep} de {steps.length}: {steps[state.currentStep - 1].title}
          </p>
          <p className="text-xs text-gray-500">{steps[state.currentStep - 1].description}</p>
        </div>
        <div className="flex justify-center mt-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`w-2 h-2 rounded-full mx-1 ${
                state.currentStep === step.id
                  ? 'bg-blue-600'
                  : state.currentStep > step.id
                  ? 'bg-green-600'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
