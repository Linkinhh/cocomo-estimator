"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCocomo } from '../context'
import { languageFactors, functionWeights, TipoFuncion, NivelComplejidad } from '../types'
import { useEffect } from 'react'

export default function Step1BasicParameters() {
  const { state, updateState, nextStep } = useCocomo()

  // Calculate KLOC from function points when sizing method changes
  useEffect(() => {
    if (state.sizingMethod === 'functionPoints') {
      const totalFP = calculateTotalFunctionPoints()
      const multiplier = state.language === 'otro' ? state.customLanguageMultiplier : languageFactors[state.language] || 50
      const calculatedKLOC = totalFP * multiplier / 1000
      updateState({ kloc: calculatedKLOC })
    }
  }, [state.functionPoints, state.language, state.customLanguageMultiplier, state.sizingMethod])

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
    if (state.kloc > 0) {
      nextStep()
    }
  }

  const handleSizingMethodChange = (method: 'kloc' | 'functionPoints') => {
    updateState({ sizingMethod: method })
    if (method === 'kloc') {
      updateState({ kloc: 10 }) // Reset to default
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Parámetros Básicos del Proyecto</CardTitle>
          <CardDescription>
            Configure los parámetros fundamentales para la estimación COCOMO 81
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Grid layout for better space utilization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left Column - Sizing Method */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Método de Dimensionamiento</Label>
                <RadioGroup
                  value={state.sizingMethod}
                  onValueChange={handleSizingMethodChange}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kloc" id="kloc-method" />
                    <Label htmlFor="kloc-method">KLOC (Líneas de Código)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="functionPoints" id="fp-method" />
                    <Label htmlFor="fp-method">Puntos de Función</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* KLOC Input */}
              {state.sizingMethod === 'kloc' && (
                <div className="space-y-2">
                  <Label htmlFor="kloc">Líneas de Código (KLOC)</Label>
                  <Input
                    id="kloc"
                    type="number"
                    value={state.kloc}
                    onChange={(e) => updateState({ kloc: Number(e.target.value) })}
                    placeholder="Ingrese KLOC"
                    min="0.1"
                    step="0.1"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tamaño estimado en miles de líneas de código
                  </p>
                </div>
              )}

              {/* Function Points Input */}
              {state.sizingMethod === 'functionPoints' && (
                <div className="space-y-4">
                  <div className="text-sm font-medium text-gray-700">
                    Puntos de Función por Tipo y Complejidad
                  </div>

                  {/* Function Points Grid */}
                  <div className="space-y-3">
                    {Object.keys(functionWeights).map((tipo) => (
                      // Siempre para el primer item tambien dibujar la cabecera
                      
                      <div key={tipo} className="space-y-2 flex flex-row">
                        <Label className="text-sm font-medium capitalize w-1/2">
                          {tipo === 'entradas' ? 'Entradas Externas' :
                            tipo === 'salidas' ? 'Salidas Externas' :
                              tipo === 'consultas' ? 'Consultas Externas' :
                                tipo === 'archivos' ? 'Archivos Lógicos Internos' :
                                  'Archivos de Interfaz Externa'}
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {['baja', 'media', 'alta'].map((nivel) => (
                            <div key={nivel} className="space-y-1">
                              <Label className="text-xs text-gray-600 capitalize">
                                {nivel} ({functionWeights[tipo as TipoFuncion][nivel as NivelComplejidad]} pts.)
                              </Label>
                              <Input
                                type="number"
                                min="0"
                                value={state.functionPoints[tipo as TipoFuncion][nivel as NivelComplejidad]}
                                onChange={(e) => {
                                  const newFP = { ...state.functionPoints }
                                  newFP[tipo as TipoFuncion][nivel as NivelComplejidad] = Number(e.target.value)
                                  updateState({ functionPoints: newFP })
                                }}
                                className="text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    Total FP: {calculateTotalFunctionPoints()} | KLOC calculado: {state.kloc.toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Project Parameters */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectType">Tipo de Proyecto</Label>
                <Select
                  value={state.projectType}
                  onValueChange={(value) => updateState({ projectType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Orgánico</SelectItem>
                    <SelectItem value="semidetached">Semi-acoplado</SelectItem>
                    <SelectItem value="embedded">Empotrado</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {state.projectType === 'organic' ? 'Proyectos pequeños con equipos experimentados' :
                    state.projectType === 'semidetached' ? 'Proyectos medianos con experiencia mixta' :
                      'Proyectos complejos con restricciones estrictas'}
                </p>
              </div>

              {state.sizingMethod === 'functionPoints' && (
                <div className="space-y-2">
                <Label htmlFor="language">Lenguaje de Programación</Label>
                <Select
                  value={state.language}
                  onValueChange={(value) => updateState({ language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione lenguaje" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(languageFactors).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang} {languageFactors[lang] > 0 && `(${languageFactors[lang]} LOC/FP)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Custom multiplier for 'otro' */}
                {state.language === 'otro' && (
                  <div className="space-y-2">
                    <Label htmlFor="customMultiplier">Multiplicador Personalizado</Label>
                    <Input
                      id="customMultiplier"
                      type="number"
                      value={state.customLanguageMultiplier}
                      onChange={(e) => updateState({ customLanguageMultiplier: Number(e.target.value) })}
                      placeholder="LOC por Punto de Función"
                      min="1"
                    />
                    <p className="text-xs text-muted-foreground">
                      Líneas de código por punto de función para su lenguaje
                    </p>
                  </div>
                )}
              </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="costPerPerson">Costo por Persona ($/mes)</Label>
                <Input
                  id="costPerPerson"
                  type="number"
                  value={state.costPerPerson}
                  onChange={(e) => updateState({ costPerPerson: Number(e.target.value) })}
                  placeholder="Costo mensual"
                  min="1000"
                  step="100"
                />
                <p className="text-xs text-muted-foreground">
                  Costo promedio mensual por desarrollador
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={state.kloc <= 0}
          className="min-w-24"
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
