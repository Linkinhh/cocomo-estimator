"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RefreshCw } from "lucide-react"
import { useCocomoII } from '../context'
import { phases } from '../types'

export default function Step5Results() {
  const { state, updateState, prevStep } = useCocomoII()

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

  const resetToDefaults = () => {
    updateState({
      size: 10,
      sizeType: "kloc",
      costPerPerson: 5000,
      scaleFactors: {
        prec: 3.72,
        flex: 3.04,
        resl: 4.24,
        team: 3.29,
        pmat: 4.68,
      },
      efMultipliers: {
        rely: 1.0, data: 1.0, cplx: 1.0, ruse: 1.0, docu: 1.0,
        time: 1.0, stor: 1.0, pvol: 1.0, acap: 1.0, pcap: 1.0,
        pcon: 1.0, apex: 1.0, plex: 1.0, ltex: 1.0, tool: 1.0,
        site: 1.0, sced: 1.0,
      },
      usePhaseCosts: false,
      currentStep: 1
    })
  }

  const exportResults = () => {
    const results = {
      parameters: {
        size: state.size,
        sizeType: state.sizeType,
        costPerPerson: state.costPerPerson,
      },
      scaleFactors: state.scaleFactors,
      efMultipliers: state.efMultipliers,
      calculations: {
        scaleExponent: calculateScaleExponent(),
        eaf: calculateEAF(),
        effort: calculateEffort(),
        developmentTime: calculateDevelopmentTime(),
        personnel: calculatePersonnel(),
        totalCost: calculateTotalCost(),
      },
      phaseCosts: state.usePhaseCosts ? state.phaseCosts : null,
    }

    const dataStr = JSON.stringify(results, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `cocomo-ii-estimation-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const effort = calculateEffort()
  const developmentTime = calculateDevelopmentTime()
  const personnel = calculatePersonnel()
  const totalCost = calculateTotalCost()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resultados de la Estimación COCOMO II</CardTitle>
          <CardDescription>
            Estimaciones calculadas basadas en los parámetros configurados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Esfuerzo</h3>
              <p className="text-2xl font-bold text-blue-600">{effort.toFixed(1)}</p>
              <p className="text-sm text-blue-600">personas-mes</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Tiempo</h3>
              <p className="text-2xl font-bold text-green-600">{developmentTime.toFixed(1)}</p>
              <p className="text-sm text-green-600">meses</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Personal</h3>
              <p className="text-2xl font-bold text-purple-600">{personnel.toFixed(1)}</p>
              <p className="text-sm text-purple-600">personas</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800">Costo Total</h3>
              <p className="text-xl font-bold text-orange-600">
                ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-orange-600">USD</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Resumen</TabsTrigger>
          <TabsTrigger value="factors">Factores</TabsTrigger>
          <TabsTrigger value="phases">Etapas</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parámetros de Entrada</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Tamaño del Proyecto</TableCell>
                    <TableCell>{state.size} {state.sizeType === 'kloc' ? 'KLOC' : 'KLOC (desde PF)'}</TableCell>
                  </TableRow>
                  {state.sizeType === 'pf' && (
                    <TableRow>
                      <TableCell className="font-medium">Puntos de Función</TableCell>
                      <TableCell>{state.pf} PF</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="font-medium">Costo por Persona-Mes</TableCell>
                    <TableCell>${state.costPerPerson.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Exponente de Escala (E)</TableCell>
                    <TableCell>{calculateScaleExponent().toFixed(3)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Factor de Ajuste de Esfuerzo (EAF)</TableCell>
                    <TableCell>{calculateEAF().toFixed(3)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Factores de Escala</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {Object.entries(state.scaleFactors).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{key.toUpperCase()}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiplicadores de Esfuerzo</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {Object.entries(state.efMultipliers).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{key.toUpperCase()}</TableCell>
                        <TableCell className={value > 1.0 ? 'text-red-600' : value < 1.0 ? 'text-green-600' : ''}>
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          {state.usePhaseCosts ? (
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Costos por Etapa</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Etapa</TableHead>
                      <TableHead>% Esfuerzo</TableHead>
                      <TableHead>Esfuerzo (PM)</TableHead>
                      <TableHead>Costo/PM</TableHead>
                      <TableHead>Costo Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phases.map(phase => {
                      const phaseData = state.phaseCosts[phase.key as keyof typeof state.phaseCosts]
                      const totalEffortPercent = getTotalEffort()
                      const phaseEffort = (phaseData.effort / totalEffortPercent) * effort
                      const phaseCost = phaseEffort * phaseData.cost
                      
                      return (
                        <TableRow key={phase.key}>
                          <TableCell className="font-medium">{phase.name}</TableCell>
                          <TableCell>{phaseData.effort}%</TableCell>
                          <TableCell>{phaseEffort.toFixed(1)}</TableCell>
                          <TableCell>${phaseData.cost.toLocaleString()}</TableCell>
                          <TableCell>${phaseCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Costo Uniforme</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-lg">
                  Se utiliza un costo uniforme de <strong>${state.costPerPerson.toLocaleString()}</strong> por persona-mes
                  para todo el proyecto.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={prevStep}>
            Anterior
          </Button>
          <Button variant="outline" onClick={resetToDefaults} className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reiniciar
          </Button>
        </div>
        <Button onClick={exportResults} className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Exportar Resultados
        </Button>
      </div>
    </div>
  )
}
