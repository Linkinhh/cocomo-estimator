"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCocomoII } from '../context'
import { phases } from '../types'

export default function Step4PhaseCosts() {
  const { state, updateState, nextStep, prevStep } = useCocomoII()

  const updatePhaseCost = (phase: string, type: 'cost' | 'effort', value: number) => {
    updateState({
      phaseCosts: {
        ...state.phaseCosts,
        [phase]: {
          ...state.phaseCosts[phase as keyof typeof state.phaseCosts],
          [type]: value
        }
      }
    })
  }

  const getTotalEffortDistribution = () => {
    return Object.values(state.phaseCosts).reduce((sum, phase) => sum + phase.effort, 0)
  }

  const calculateTotalCost = () => {
    // Basic COCOMO II calculation for reference
    const scaleExponent = 1.01 + (0.01 * Object.values(state.scaleFactors).reduce((sum, value) => sum + value, 0))
    const eaf = Object.values(state.efMultipliers).reduce((product, value) => product * value, 1)
    const effort = 2.94 * Math.pow(state.size, scaleExponent) * eaf
    
    if (!state.usePhaseCosts) {
      return effort * state.costPerPerson
    }

    // Calculate costs by phases
    let totalCost = 0
    const totalEffortPercent = getTotalEffortDistribution()
    
    Object.entries(state.phaseCosts).forEach(([phase, data]) => {
      const phaseEffort = (data.effort / totalEffortPercent) * effort
      totalCost += phaseEffort * data.cost
    })
    
    return totalCost
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Costos por Etapas del Proyecto</CardTitle>
          <CardDescription>
            Configure los costos y distribución de esfuerzo para cada etapa del desarrollo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="usePhaseCosts"
              checked={state.usePhaseCosts}
              onCheckedChange={(checked) => updateState({ usePhaseCosts: checked })}
            />
            <Label htmlFor="usePhaseCosts">
              Usar costos diferenciados por etapa
            </Label>
          </div>

          {!state.usePhaseCosts && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                Se utilizará el costo uniforme de <strong>${state.costPerPerson.toLocaleString()}</strong> por persona-mes 
                para todas las etapas del proyecto.
              </p>
            </div>
          )}

          {state.usePhaseCosts && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Etapa</TableHead>
                    <TableHead>Costo por Persona-Mes (USD)</TableHead>
                    <TableHead>% de Esfuerzo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {phases.map(phase => (
                    <TableRow key={phase.key}>
                      <TableCell className="font-medium">
                        {phase.name}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1000"
                          value={state.phaseCosts[phase.key as keyof typeof state.phaseCosts].cost}
                          onChange={(e) => updatePhaseCost(phase.key, 'cost', Number.parseInt(e.target.value) || 5000)}
                          className="w-32"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={state.phaseCosts[phase.key as keyof typeof state.phaseCosts].effort}
                          onChange={(e) => updatePhaseCost(phase.key, 'effort', Number.parseInt(e.target.value) || 10)}
                          className="w-20"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Label className="text-sm font-medium text-green-700">
                    Total de Distribución de Esfuerzo
                  </Label>
                  <p className="text-xl font-bold text-green-800">
                    {getTotalEffortDistribution()}%
                  </p>
                  {getTotalEffortDistribution() !== 100 && (
                    <p className="text-sm text-orange-600 mt-1">
                      ⚠️ Recomendado: 100%
                    </p>
                  )}
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Label className="text-sm font-medium text-blue-700">
                    Costo Total Estimado
                  </Label>
                  <p className="text-xl font-bold text-blue-800">
                    ${calculateTotalCost().toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Anterior
        </Button>
        <Button onClick={nextStep}>
          Ver Resultados
        </Button>
      </div>
    </div>
  )
}
