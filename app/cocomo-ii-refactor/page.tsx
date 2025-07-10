"use client"

import { ArrowLeft, Calculator, FileText } from "lucide-react"
import Link from "next/link"
import { CocomoProvider, useCocomo } from './context'
import StepNavigation from './components/StepNavigation'
import Step1BasicParameters from './components/Step1BasicParameters'
import Step3EAFFactors from './components/Step3EAFFactors'
import Step4PhaseCosts from './components/Step4PhaseCosts'
import Step5Results from './components/Step5Results'

// Multi-step wizard component
function CocomoWizard() {
  const { state } = useCocomo()

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1BasicParameters />
      // case 2:
      // return <Step2FunctionPoints />
      case 2:
        return <Step3EAFFactors />
      case 3:
        return <Step4PhaseCosts />
      case 4:
        return <Step5Results />
      default:
        return <Step1BasicParameters />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-row justify-between">
          <div className="flex justify-between items-start mb-4">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
          <div className="flex items-center">
            <Calculator className="mr-3 h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Estimador COCOMO II Post-Arquitectura</h1>
              <p className="text-gray-600">Modelo de estimación de costos de software</p>
            </div>
          </div>
          <Link
            href="/cocomo-ii-refactor/docs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="mr-2 h-4 w-4" />
            Documentación
          </Link>
        </div>

        {/* Step Navigation */}
        <StepNavigation />

        {/* Current Step Content */}
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  )
}

export default function Cocomo81Page() {
  return (
    <CocomoProvider>
      <CocomoWizard />
    </CocomoProvider>
  )
}
