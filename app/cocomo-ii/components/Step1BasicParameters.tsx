"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCocomoII } from '../context'
import { languageFactors, functionWeights, TipoFuncion, NivelComplejidad } from '../types'
import { useEffect } from 'react'

export default function Step1BasicParameters() {
  const { state, updateState, nextStep } = useCocomoII()

  // Calculate size from function points when needed
  useEffect(() => {
    if (state.sizeType === "pf") {
      const totalFP = calculateTotalFunctionPoints()
      const multiplier = state.language === 'otro' ? state.customLanguageMultiplier : languageFactors[state.language] || 50
      const calculatedSize = totalFP * multiplier / 1000
      updateState({ size: calculatedSize, pf: totalFP })
    }
  }, [state.functionPoints, state.language, state.customLanguageMultiplier, state.sizeType])

  const calculateTotalFunctionPoints = () => {
    let total = 0
    Object.keys(state.functionPoints).forEach(tipo => {
      Object.keys(state.functionPoints[tipo as TipoFuncion]).forEach(nivel => {
        const count = state.functionPoints[tipo as TipoFuncion][nivel as NivelComplejidad]
        const weight = functionWeights[tipo as TipoFuncion][nivel as NivelComplejidad]
        total += count * weight
      })
    })
    return total
  }

  const handleNext = () => {
    if (state.size > 0) {
      nextStep()
    }
  }

  const handleSizeTypeChange = (method: string) => {
    updateState({ sizeType: method })
    if (method === 'kloc') {
      updateState({ size: 10 }) // Reset to default
    }
  }

  const updateFunctionPoint = (tipo: TipoFuncion, nivel: NivelComplejidad, value: number) => {
    const updatedFunctionPoints = {
      ...state.functionPoints,
      [tipo]: {
        ...state.functionPoints[tipo],
        [nivel]: Math.max(0, value)
      }
    }
    updateState({ functionPoints: updatedFunctionPoints })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Parámetros Básicos del Proyecto</CardTitle>
          <CardDescription>
            Configure los parámetros fundamentales para la estimación COCOMO II
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex flex-row justify-between">
          <div className="w-full">
            {/* Size Estimation Method */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Método de Estimación de Tamaño</Label>
              <RadioGroup
                value={state.sizeType}
                onValueChange={handleSizeTypeChange}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kloc" id="kloc" />
                  <Label htmlFor="kloc">Líneas de Código (KLOC)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pf" id="pf" />
                  <Label htmlFor="pf">Puntos de Función</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Direct KLOC Input */}
            {state.sizeType === "kloc" && (
              <div className="space-y-2 ">
                <Label htmlFor="size">Tamaño del Proyecto (KLOC)</Label>
                <Input
                  id="size"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={state.size}
                  onChange={(e) => updateState({ size: Number.parseFloat(e.target.value) || 0 })}
                  className="max-w-xs"
                />
              </div>
            )}

            {/* Function Points Input */}
            {state.sizeType === "pf" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Lenguaje de Programación</Label>
                  <Select
                    value={state.language}
                    onValueChange={(value) => updateState({ language: value })}
                  >
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Seleccione lenguaje" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(languageFactors).map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang} {lang !== 'otro' && `(${languageFactors[lang]} LOC/FP)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {state.language === "otro" && (
                  <div className="space-y-2">
                    <Label htmlFor="customMultiplier">Factor de Conversión Personalizado (LOC/FP)</Label>
                    <Input
                      id="customMultiplier"
                      type="number"
                      min="1"
                      value={state.customLanguageMultiplier}
                      onChange={(e) => updateState({ customLanguageMultiplier: Number.parseInt(e.target.value) || 50 })}
                      className="max-w-xs"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-base font-medium">Puntos de Función por Tipo y Complejidad</Label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo de Función</TableHead>
                        <TableHead>Baja</TableHead>
                        <TableHead>Media</TableHead>
                        <TableHead>Alta</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(functionWeights).map(([tipo, weights]) => {
                        const tipoFp = state.functionPoints[tipo as TipoFuncion]
                        const total = (tipoFp.baja * weights.baja) + (tipoFp.media * weights.media) + (tipoFp.alta * weights.alta)

                        return (
                          <TableRow key={tipo}>
                            <TableCell className="font-medium capitalize">{tipo}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                value={tipoFp.baja}
                                onChange={(e) => updateFunctionPoint(tipo as TipoFuncion, 'baja', Number.parseInt(e.target.value) || 0)}
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                value={tipoFp.media}
                                onChange={(e) => updateFunctionPoint(tipo as TipoFuncion, 'media', Number.parseInt(e.target.value) || 0)}
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                value={tipoFp.alta}
                                onChange={(e) => updateFunctionPoint(tipo as TipoFuncion, 'alta', Number.parseInt(e.target.value) || 0)}
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{total}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  <div className="text-sm text-muted-foreground">
                    Total de Puntos de Función: {calculateTotalFunctionPoints()}<br />
                    Tamaño estimado: {state.size.toFixed(2)} KLOC
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cost per Person */}
          <div className="space-y-2 w-full">
            <Label htmlFor="costPerPerson">Costo por Persona-Mes (USD)</Label>
            <Input
              id="costPerPerson"
              type="number"
              min="1000"
              value={state.costPerPerson}
              onChange={(e) => updateState({ costPerPerson: Number.parseInt(e.target.value) || 5000 })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={state.size <= 0}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
