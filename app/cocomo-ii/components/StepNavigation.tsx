"use client"

import { useCocomoII } from '../context'

export default function StepNavigation() {
  const { state, goToStep } = useCocomoII()

  const steps = [
    { number: 1, title: "Parámetros Básicos", description: "Tamaño del proyecto y método de estimación" },
    { number: 2, title: "Factores de Escala", description: "Factores que afectan la escala del proyecto" },
    { number: 3, title: "Factores EAF", description: "Multiplicadores de esfuerzo" },
    { number: 4, title: "Costos por Etapas", description: "Distribución de costos por fase" },
    { number: 5, title: "Resultados", description: "Estimaciones finales y análisis" }
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <button
              onClick={() => goToStep(step.number)}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium transition-colors ${
                step.number === state.currentStep
                  ? 'bg-blue-600 text-white border-blue-600'
                  : step.number < state.currentStep
                  ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                  : 'bg-white text-gray-400 border-gray-300 hover:border-gray-400'
              }`}
              disabled={step.number > state.currentStep}
            >
              {step.number < state.currentStep ? '✓' : step.number}
            </button>
            
            <div className="ml-3 hidden md:block">
              <p className={`text-sm font-medium ${
                step.number === state.currentStep ? 'text-blue-600' : 
                step.number < state.currentStep ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div className={`hidden md:block w-12 h-0.5 mx-4 ${
                step.number < state.currentStep ? 'bg-green-600' : 'bg-gray-300'
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
              key={step.number}
              className={`w-2 h-2 rounded-full mx-1 ${
                step.number === state.currentStep
                  ? 'bg-blue-600'
                  : step.number < state.currentStep
                  ? 'bg-green-600'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
