"use client"

import { ArrowLeft, Calculator, FileText } from "lucide-react"
import Link from "next/link"
import { UseCasePointsProvider } from './context'
import UseCasePointsWizard from './components/UseCasePointsWizard'

// Main page component
function UseCasePointsWizardPage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Estimador de Puntos de Casos de Uso</h1>
              <p className="text-gray-600">Modelo de estimación basado en casos de uso</p>
            </div>
          </div>
          <Link
            href="/use-case-points/docs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="mr-2 h-4 w-4" />
            Documentación
          </Link>
        </div>

        {/* Wizard Content */}
        <UseCasePointsWizard />
      </div>
    </div>
  )
}

export default function UseCasePointsPage() {
  return (
    <UseCasePointsProvider>
      <UseCasePointsWizardPage />
    </UseCasePointsProvider>
  )
}
