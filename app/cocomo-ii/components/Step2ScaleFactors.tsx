"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { InfoIcon as InfoCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCocomoII } from '../context'
import { scaleFactorDescriptions, scaleFactorOptions } from '../types'

export default function Step2ScaleFactors() {
  const { state, updateState, nextStep, prevStep } = useCocomoII()

  const updateScaleFactor = (factor: string, value: number) => {
    updateState({
      scaleFactors: {
        ...state.scaleFactors,
        [factor]: value
      }
    })
  }

  const calculateScaleExponent = () => {
    const totalScaleFactors = Object.values(state.scaleFactors).reduce((sum, value) => sum + value, 0)
    return 1.01 + (0.01 * totalScaleFactors)
  }

  const getTotalScaleFactors = () => {
    return Object.values(state.scaleFactors).reduce((sum, value) => sum + value, 0)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Factores de Escala COCOMO II</CardTitle>
          <CardDescription>
            Los factores de escala determinan cómo la complejidad del proyecto afecta al exponente 
            utilizado en la ecuación de estimación de esfuerzo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(scaleFactorDescriptions).map(([factor, description]) => (
            <div key={factor} className="space-y-2">
              <div className="flex items-center">
                <Label className="mr-2">{description}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Valor actual: {state.scaleFactors[factor as keyof typeof state.scaleFactors]}<br/>
                        {factor === 'prec' && 'Evalúa cuánta experiencia previa tiene la organización con este tipo de proyecto.'}
                        {factor === 'flex' && 'Evalúa el grado de flexibilidad en el proceso de desarrollo.'}
                        {factor === 'resl' && 'Evalúa cuánto se conoce sobre la arquitectura y se han identificado los riesgos.'}
                        {factor === 'team' && 'Evalúa qué tan bien trabajen juntos los miembros del equipo.'}
                        {factor === 'pmat' && 'Evalúa la madurez del proceso de desarrollo de software.'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={state.scaleFactors[factor as keyof typeof state.scaleFactors].toString()}
                onValueChange={(value) => updateScaleFactor(factor, Number.parseFloat(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione valor" />
                </SelectTrigger>
                <SelectContent>
                  {scaleFactorOptions[factor as keyof typeof scaleFactorOptions].map((option, index) => (
                    <SelectItem key={index} value={option.value.toString()}>
                      {option.label} ({option.value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Factores de Escala</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Suma Total de Factores de Escala</Label>
              <p className="text-2xl font-bold text-blue-600">{getTotalScaleFactors().toFixed(2)}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Exponente de Escala (E)</Label>
              <p className="text-2xl font-bold text-green-600">{calculateScaleExponent().toFixed(3)}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> El exponente de escala se calcula como E = 1.01 + 0.01 × (suma de factores de escala).
              Un valor más bajo indica mayor economía de escala.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Anterior
        </Button>
        <Button onClick={nextStep}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
