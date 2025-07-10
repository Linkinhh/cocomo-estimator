"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCocomo } from '../context'
import { phases } from '../types'

export default function Step4PhaseCosts() {
  const { state, updateState, nextStep, prevStep } = useCocomo()

  const updatePhaseCost = (phase: string, type: 'cost' | 'effort', value: number) => {
    updateState({
      phaseCosts: {
        ...state.phaseCosts,
        [phase]: {
          ...state.phaseCosts[phase as keyof typeof state.phaseCosts],
          [type]: value,
        },
      }
    })
  }

  const getTotalEffort = () => {
    return Object.values(state.phaseCosts).reduce((total, phase) => total + phase.effort, 0)
  }

  const resetToDefaults = () => {
    updateState({
      phaseCosts: {
        requirements: { cost: 5000, effort: 15 },
        productDesign: { cost: 5000, effort: 20 },
        detailedDesign: { cost: 5000, effort: 15 },
        codingUnitTest: { cost: 5000, effort: 30 },
        integrationTest: { cost: 5000, effort: 15 },
        maintenance: { cost: 5000, effort: 5 },
      }
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paso 4: Configuración de Costos por Fase (Opcional)</CardTitle>
          <CardDescription>
            Configure costos y esfuerzos específicos para cada fase del desarrollo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="usePhaseCosts"
                checked={state.usePhaseCosts}
                onCheckedChange={(checked) => updateState({ usePhaseCosts: checked })}
              />
              <Label htmlFor="usePhaseCosts">Usar Costos Personalizados por Fase</Label>
            </div>
            {state.usePhaseCosts && (
              <Button variant="outline" size="sm" onClick={resetToDefaults}>
                Restaurar Valores por Defecto
              </Button>
            )}
          </div>

          {state.usePhaseCosts && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fase</TableHead>
                      <TableHead className="text-center">Costo por Persona ($/mes)</TableHead>
                      <TableHead className="text-center">Esfuerzo (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phases.map((phase) => {
                      const phaseKey = phase.key as keyof typeof state.phaseCosts
                      const phaseData = state.phaseCosts[phaseKey]

                      return (
                        <TableRow key={phase.key}>
                          <TableCell className="font-medium">{phase.name}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={phaseData.cost}
                              onChange={(e) => updatePhaseCost(phase.key, 'cost', Number(e.target.value))}
                              min="1000"
                              step="100"
                              className="text-center"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={phaseData.effort}
                              onChange={(e) => updatePhaseCost(phase.key, 'effort', Number(e.target.value))}
                              min="1"
                              max="100"
                              step="1"
                              className="text-center"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Distribución de Esfuerzo</h4>
                  <div className="text-sm space-y-1">
                    {phases.map((phase) => {
                      const phaseKey = phase.key as keyof typeof state.phaseCosts
                      const effort = state.phaseCosts[phaseKey].effort
                      return (
                        <div key={phase.key} className="flex justify-between">
                          <span>{phase.name}:</span>
                          <span>{effort}%</span>
                        </div>
                      )
                    })}
                    <div className="border-t pt-1 mt-2 font-medium flex justify-between">
                      <span>Total:</span>
                      <span className={getTotalEffort() !== 100 ? "text-red-600" : "text-green-600"}>
                        {getTotalEffort()}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Costos Promedio</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Costo Promedio:</strong> ${(
                      Object.values(state.phaseCosts).reduce((sum, phase) => sum + phase.cost, 0) / phases.length
                    ).toLocaleString()}/mes</p>
                    <p><strong>Costo Mínimo:</strong> ${Math.min(...Object.values(state.phaseCosts).map(p => p.cost)).toLocaleString()}/mes</p>
                    <p><strong>Costo Máximo:</strong> ${Math.max(...Object.values(state.phaseCosts).map(p => p.cost)).toLocaleString()}/mes</p>
                  </div>
                </div>
              </div>

              {getTotalEffort() !== 100 && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-yellow-800">
                    <strong>Advertencia:</strong> La suma de los porcentajes de esfuerzo debe ser 100%.
                    Actualmente es {getTotalEffort()}%.
                  </p>
                </div>
              )}
            </div>
          )}

          {!state.usePhaseCosts && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-muted-foreground">
                Los costos por fase están deshabilitados. Se utilizará el costo por persona general para todas las fases.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Anterior
        </Button>

        <Button disabled={getTotalEffort() !== 100} onClick={nextStep}>
          Ver Resultados
        </Button>

      </div>
    </div>
  )
}
