"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCocomoII } from '../context'
import { phases } from '../types'

export default function Step5Results() {
  const { state, prevStep, goToStep } = useCocomoII()

  // COCOMO II calculations
  const calculateScaleExponent = () => {
    const totalScaleFactors = Object.values(state.scaleFactors).reduce((sum, value) => sum + value, 0)
    return 1.01 + (0.01 * totalScaleFactors)
  }

  const calculateEAF = () => {
    return Object.values(state.efMultipliers).reduce((product, value) => product * value, 1)
  }

  const getSizeInKLOC = () => {
    return state.size
  }

  const calculateEffort = () => {
    const scaleExponent = calculateScaleExponent()
    const eaf = calculateEAF()
    const size = getSizeInKLOC()
    return 2.94 * Math.pow(size, scaleExponent) * eaf
  }

  const calculateDevelopmentTime = () => {
    const effort = calculateEffort()
    const scaleExponent = calculateScaleExponent()
    return 3.67 * Math.pow(effort, (0.28 + 0.2 * (scaleExponent - 1.01)))
  }

  const calculatePersonnel = () => {
    const effort = calculateEffort()
    const time = calculateDevelopmentTime()
    return effort / time
  }

  const calculateTotalCost = () => {
    const effort = calculateEffort()
    
    if (!state.usePhaseCosts) {
      return effort * state.costPerPerson
    }

    // Calculate costs by phases
    let totalCost = 0
    const totalEffortPercent = Object.values(state.phaseCosts).reduce((sum, phase) => sum + phase.effort, 0)
    
    Object.entries(state.phaseCosts).forEach(([phase, data]) => {
      const phaseEffort = (data.effort / totalEffortPercent) * effort
      totalCost += phaseEffort * data.cost
    })
    
    return totalCost
  }

  const getTotalEffort = () => {
    return Object.values(state.phaseCosts).reduce((sum, phase) => sum + phase.effort, 0)
  }

  // Calculate costs by phase 
  const calculatePhaseCosts = () => {
    const effort = calculateEffort()
    return phases.map((phase) => {
      const phaseKey = phase.key as keyof typeof state.phaseCosts
      const phaseData = state.phaseCosts[phaseKey]
      const phaseEffort = (effort * phaseData.effort) / 100
      const phaseCost = state.usePhaseCosts ? phaseEffort * phaseData.cost : phaseEffort * state.costPerPerson

      return {
        name: phase.name,
        effort: Math.round(phaseEffort * 100) / 100,
        cost: Math.round(phaseCost),
        percentage: phaseData.effort
      }
    })
  }

  const results = {
    kloc: getSizeInKLOC(),
    scaleExponent: calculateScaleExponent(),
    eaf: calculateEAF(),
    effort: calculateEffort(),
    time: calculateDevelopmentTime(),
    personnel: calculatePersonnel(),
    totalCost: calculateTotalCost(),
    phaseCosts: calculatePhaseCosts()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Estimación COCOMO II - Resultados Finales</CardTitle>
          <CardDescription>
            Resultados completos basados en los parámetros y factores configurados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {results.effort.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Personas-Mes</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {results.time.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Meses</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {results.personnel.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Personas</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                ${results.totalCost.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">Costo Total</p>
            </div>
          </div>

          {/* Main Results Layout - Matching COCOMO-81 structure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribución por Fases */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribución por Fases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fase</TableHead>
                        <TableHead className="text-center">Esfuerzo (%)</TableHead>
                        <TableHead className="text-center">Esfuerzo (PM)</TableHead>
                        <TableHead className="text-center">Costo ($)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.phaseCosts.map((phase, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{phase.name}</TableCell>
                          <TableCell className="text-center">{phase.percentage}%</TableCell>
                          <TableCell className="text-center">{phase.effort}</TableCell>
                          <TableCell className="text-center">${phase.cost.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-medium bg-gray-50">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-center">100%</TableCell>
                        <TableCell className="text-center">{results.effort.toFixed(1)}</TableCell>
                        <TableCell className="text-center">${results.totalCost.toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col justify-between w-full">
              {/* Factores de Escala */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Factores de Escala</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(state.scaleFactors).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium uppercase">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium">Exponente de Escala: {results.scaleExponent.toFixed(3)}</p>
                  </div>
                </CardContent>
              </Card>
              {/* Factores EAF */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Factores de Ajuste de Esfuerzo (EAF)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                    {Object.entries(state.efMultipliers).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium uppercase">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium">EAF Total: {results.eaf.toFixed(3)}</p>
                  </div>
                </CardContent>
              </Card>
              {/* Fórmulas Utilizadas */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Fórmulas Utilizadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Esfuerzo:</strong> E = 2.94 × KLOC^E × EAF</p>
                  <p><strong>Tiempo:</strong> T = 3.67 × E^(0.28 + 0.2 × (E-1.01))</p>
                  <p><strong>Personal:</strong> P = E / T</p>
                  <p><strong>Costo:</strong> C = E × Costo_por_Persona</p>
                  <p><strong>Exponente:</strong> E = 1.01 + 0.01 × ΣSF</p>
                </CardContent>
              </Card>
            </div>
          </div>

        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Anterior
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => goToStep(1)}>
            Reiniciar
          </Button>
          <Button onClick={() => window.print()}>
            Imprimir Resultados
          </Button>
        </div>
      </div>
    </div>
  )
}
