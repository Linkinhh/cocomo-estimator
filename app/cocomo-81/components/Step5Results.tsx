"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCocomo } from '../context'
import { functionWeights, languageFactors, phases, TipoFuncion, NivelComplejidad } from '../types'

export default function Step5Results() {
  const { state, prevStep, goToStep } = useCocomo()

  // Coeficientes según el tipo de proyecto
  const coefficients = {
    organic: { a: 3.2, b: 1.05, c: 0.38 },
    semidetached: { a: 3.0, b: 1.12, c: 0.35 },
    embedded: { a: 2.8, b: 1.2, c: 0.32 },
  }

  // Calcular el EAF (Factor de Ajuste de Esfuerzo)
  const calculateEAF = () => {
    return Object.values(state.eafValues).reduce((acc, val) => acc * val, 1.0)
  }

  // Calcular UFP (Puntos de Función No Ajustados)
  const calculateUFP = () => {
    let total = 0
    Object.keys(state.functionPoints).forEach((tipo) => {
      Object.keys(state.functionPoints[tipo as TipoFuncion]).forEach((nivel) => {
        const count = state.functionPoints[tipo as TipoFuncion][nivel as NivelComplejidad]
        const weight = functionWeights[tipo as TipoFuncion][nivel as NivelComplejidad]
        total += count * weight
      })
    })
    return total
  }

  // Calcular KLOC efectivo (considerando puntos de función si están habilitados)
  const getEffectiveKLOC = () => {
    if (state.useFunctionPoints) {
      const ufp = calculateUFP()
      const languageFactor = languageFactors[state.language] || 50
      const ldc = ufp * languageFactor
      return ldc / 1000
    }
    return state.kloc
  }

  // Calcular el esfuerzo (personas-mes)
  const calculateEffort = () => {
    const { a, b } = coefficients[state.projectType as keyof typeof coefficients]
    const eaf = calculateEAF()
    const kloc = getEffectiveKLOC()
    const effort = a * Math.pow(kloc, b) * eaf
    return Math.round(effort * 100) / 100
  }

  // Calcular el tiempo de desarrollo (meses)
  const calculateDevelopmentTime = () => {
    const { c } = coefficients[state.projectType as keyof typeof coefficients]
    const effort = calculateEffort()
    return Math.round((2.5 * Math.pow(effort, c)) * 100) / 100
  }

  // Calcular el número de personas requeridas
  const calculatePersonnel = () => {
    const effort = calculateEffort()
    const time = calculateDevelopmentTime()
    return Math.round((effort / time) * 100) / 100
  }

  // Calcular el costo total
  const calculateTotalCost = () => {
    const effort = calculateEffort()

    if (state.usePhaseCosts && getTotalEffort() === 100) {
      let totalCost = 0
      Object.values(state.phaseCosts).forEach((phase) => {
        const phaseEffort = (effort * phase.effort) / 100
        totalCost += phaseEffort * phase.cost
      })
      return Math.round(totalCost)
    }

    return Math.round(effort * state.costPerPerson)
  }

  // Función para calcular el total de esfuerzo por fases
  const getTotalEffort = () => {
    return Object.values(state.phaseCosts).reduce((total, phase) => total + phase.effort, 0)
  }

  // Calcular costos por fase
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
    kloc: getEffectiveKLOC(),
    ufp: calculateUFP(),
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
          <CardTitle>Resultados de la Estimación COCOMO 81</CardTitle>
          <CardDescription>
            Resumen completo de la estimación del proyecto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-row gap-4">
            {/* Resumen Principal */}
            <div className="flex flex-wrap justify-between w-full">
              <div className="border bg-blue-50 p-4 rounded-lg text-center w-1/2">
                <h3 className="font-medium text-blue-900">Esfuerzo</h3>
                <p className="text-2xl font-bold text-blue-700">{results.effort}</p>
                <p className="text-sm text-blue-600">personas-mes</p>
              </div>
              <div className="border bg-green-50 p-4 rounded-lg text-center w-1/2">
                <h3 className="font-medium text-green-900">Tiempo</h3>
                <p className="text-2xl font-bold text-green-700">{results.time}</p>
                <p className="text-sm text-green-600">meses</p>
              </div>
              <div className="border bg-purple-50 p-4 rounded-lg text-center w-1/2">
                <h3 className="font-medium text-purple-900">Personal</h3>
                <p className="text-2xl font-bold text-purple-700">{results.personnel}</p>
                <p className="text-sm text-purple-600">personas</p>
              </div>
              <div className="border bg-orange-50 p-4 rounded-lg text-center w-1/2">
                <h3 className="font-medium text-orange-900">Costo Total</h3>
                <p className="text-2xl font-bold text-orange-700">${results.totalCost.toLocaleString()}</p>
                <p className="text-sm text-orange-600">USD</p>
              </div>
            </div>

            {/* Parámetros de Entrada */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">Parámetros de Entrada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>KLOC:</strong> {results.kloc.toFixed(2)}</p>
                    <p><strong>Tipo de Proyecto:</strong> {
                      state.projectType === 'organic' ? 'Orgánico' :
                        state.projectType === 'semidetached' ? 'Semi-acoplado' : 'Empotrado'
                    }</p>
                    <p><strong>Lenguaje:</strong> {state.language}</p>
                    <p><strong>Costo por Persona:</strong> ${state.costPerPerson.toLocaleString()}/mes</p>
                  </div>
                  <div>
                    {state.useFunctionPoints && (
                      <>
                        <p><strong>UFP:</strong> {results.ufp}</p>
                        <p><strong>Factor de Lenguaje:</strong> {languageFactors[state.language] || 50}</p>
                      </>
                    )}
                    <p><strong>EAF:</strong> {results.eaf.toFixed(2)}</p>
                    <p><strong>Coeficientes:</strong> a={coefficients[state.projectType as keyof typeof coefficients].a},
                      b={coefficients[state.projectType as keyof typeof coefficients].b},
                      c={coefficients[state.projectType as keyof typeof coefficients].c}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
          {/* Distribución por Fases */}
          <div className="flex flex-row w-full justify-between gap-4">

            <Card className="w-full">
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
                        <TableCell className="text-center">{results.effort}</TableCell>
                        <TableCell className="text-center">${results.totalCost.toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col justify-between w-full">
              {/* Factores EAF */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Factores de Ajuste de Esfuerzo (EAF)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
                    {Object.entries(state.eafValues).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium uppercase">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium">EAF Total: {results.eaf.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
              {/* Fórmulas Utilizadas */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Fórmulas Utilizadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Esfuerzo:</strong> E = a × KLOC^b × EAF</p>
                  <p><strong>Tiempo:</strong> T = 2.5 × E^c</p>
                  <p><strong>Personal:</strong> P = E / T</p>
                  <p><strong>Costo:</strong> C = E × Costo_por_Persona</p>
                  {state.useFunctionPoints && (
                    <p><strong>KLOC:</strong> KLOC = (UFP × Factor_Lenguaje) / 1000</p>
                  )}
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
