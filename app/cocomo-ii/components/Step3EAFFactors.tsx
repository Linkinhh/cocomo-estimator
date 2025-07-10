"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon as InfoCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCocomoII } from '../context'
import { efDescriptions, efOptions } from '../types'

export default function Step3EAFFactors() {
  const { state, updateState, nextStep, prevStep } = useCocomoII()

  const updateEfMultiplier = (factor: string, value: number) => {
    updateState({
      efMultipliers: {
        ...state.efMultipliers,
        [factor]: value
      }
    })
  }

  const calculateEAF = () => {
    return Object.values(state.efMultipliers).reduce((product, value) => product * value, 1)
  }

  // Group factors by category
  const productFactors = ["rely", "data", "cplx", "ruse", "docu"]
  const platformFactors = ["time", "stor", "pvol"]
  const personnelFactors = ["acap", "pcap", "pcon", "apex", "plex", "ltex"]
  const projectFactors = ["tool", "site", "sced"]

  const renderFactorGroup = (factors: string[], groupName: string) => (
    <TabsContent value={groupName.toLowerCase()} className="space-y-4">
      {factors.map((factor) => (
        <div key={factor} className="space-y-2">
          <div className="flex items-center">
            <Label className="mr-2">{efDescriptions[factor as keyof typeof efDescriptions]}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoCircle className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Valor actual: {state.efMultipliers[factor as keyof typeof state.efMultipliers]}<br/>
                    {getFactorTooltip(factor)}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select
            value={state.efMultipliers[factor as keyof typeof state.efMultipliers].toString()}
            onValueChange={(value) => updateEfMultiplier(factor, Number.parseFloat(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione valor" />
            </SelectTrigger>
            <SelectContent>
              {efOptions[factor as keyof typeof efOptions].map((option, index) => (
                <SelectItem key={index} value={option.value.toString()}>
                  {option.label} ({option.value})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </TabsContent>
  )

  const getFactorTooltip = (factor: string) => {
    const tooltips: { [key: string]: string } = {
      rely: 'Impacto de fallas del software en el funcionamiento general del sistema.',
      data: 'Tamaño de la base de datos en relación al tamaño del programa.',
      cplx: 'Complejidad del módulo de control, computacional, de manejo de dispositivos, de manejo de datos.',
      ruse: 'Grado de reutilización requerido.',
      docu: 'Coincidencia entre documentación y necesidades del ciclo de vida.',
      time: 'Porcentaje de tiempo de ejecución disponible usado por el software.',
      stor: 'Grado de restricción de almacenamiento principal impuesto al software.',
      pvol: 'Frecuencia de cambios en la plataforma de desarrollo.',
      acap: 'Capacidad de los analistas del proyecto.',
      pcap: 'Capacidad de los programadores del proyecto.',
      pcon: 'Continuidad del personal del proyecto.',
      apex: 'Experiencia del equipo en aplicaciones similares.',
      plex: 'Experiencia del equipo en la plataforma utilizada.',
      ltex: 'Experiencia del equipo en lenguajes y herramientas.',
      tool: 'Nivel de uso de herramientas de software.',
      site: 'Grado de colaboración multi-sitio.',
      sced: 'Restricciones de calendario de desarrollo.'
    }
    return tooltips[factor] || 'Factor de ajuste de esfuerzo'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Factores de Ajuste de Esfuerzo (EAF)</CardTitle>
          <CardDescription>
            Los multiplicadores de esfuerzo ajustan la estimación base según las características 
            específicas del proyecto y del equipo de desarrollo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="product" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="product">Producto</TabsTrigger>
              <TabsTrigger value="platform">Plataforma</TabsTrigger>
              <TabsTrigger value="personnel">Personal</TabsTrigger>
              <TabsTrigger value="project">Proyecto</TabsTrigger>
            </TabsList>

            {renderFactorGroup(productFactors, "Product")}
            {renderFactorGroup(platformFactors, "Platform")}
            {renderFactorGroup(personnelFactors, "Personnel")}
            {renderFactorGroup(projectFactors, "Project")}
          </Tabs>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Factores EAF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Factor de Ajuste de Esfuerzo Total</Label>
              <p className="text-2xl font-bold text-purple-600">{calculateEAF().toFixed(3)}</p>
            </div>
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
