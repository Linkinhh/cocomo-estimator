"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { InfoIcon as InfoCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCocomo } from '../context'

export default function Step3EAFFactors() {
  const { state, updateState, nextStep, prevStep } = useCocomo()

  const updateEAF = (factor: string, value: number) => {
    updateState({
      eafValues: {
        ...state.eafValues,
        [factor]: value
      }
    })
  }

  const calculateEAF = () => {
    return Object.values(state.eafValues).reduce((acc, val) => acc * val, 1)
  }

  const eafDescriptions = {
    rss: "Fiabilidad Requerida del Software",
    tbd: "Tamaño de la Base de Datos",
    cpr: "Complejidad del Producto",
    rte: "Restricciones de Tiempo de Ejecución",
    rmp: "Restricciones de Almacenamiento Principal",
    vmc: "Volatilidad de la Máquina Virtual",
    trc: "Tiempo de Respuesta Requerido",
    can: "Capacidad del Analista",
    ean: "Experiencia en Aplicaciones",
    cpro: "Capacidad del Programador",
    eso: "Experiencia en la Máquina Virtual",
    elp: "Experiencia en el Lenguaje de Programación",
    utp: "Uso de Prácticas Modernas de Programación",
    uhs: "Uso de Herramientas de Software",
    rpl: "Restricciones de Plazo de Desarrollo"
  }

  const eafOptions = {
    rss: [
      { label: "Muy Bajo", value: 0.75 },
      { label: "Bajo", value: 0.88 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 1.15 },
      { label: "Muy Alto", value: 1.40 }
    ],
    tbd: [
      { label: "Bajo", value: 0.94 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 1.08 },
      { label: "Muy Alto", value: 1.16 }
    ],
    cpr: [
      { label: "Muy Bajo", value: 0.70 },
      { label: "Bajo", value: 0.85 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 1.15 },
      { label: "Muy Alto", value: 1.30 },
      { label: "Extra Alto", value: 1.65 }
    ],
    rte: [
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 1.11 },
      { label: "Muy Alto", value: 1.30 },
      { label: "Extra Alto", value: 1.66 }
    ],
    rmp: [
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 1.06 },
      { label: "Muy Alto", value: 1.21 },
      { label: "Extra Alto", value: 1.56 }
    ],
    vmc: [
      { label: "Bajo", value: 0.87 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 1.15 },
      { label: "Muy Alto", value: 1.30 }
    ],
    trc: [
      { label: "Bajo", value: 0.87 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 1.07 },
      { label: "Muy Alto", value: 1.15 }
    ],
    can: [
      { label: "Muy Bajo", value: 1.46 },
      { label: "Bajo", value: 1.19 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 0.86 },
      { label: "Muy Alto", value: 0.71 }
    ],
    ean: [
      { label: "Muy Bajo", value: 1.29 },
      { label: "Bajo", value: 1.13 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 0.91 },
      { label: "Muy Alto", value: 0.82 }
    ],
    cpro: [
      { label: "Muy Bajo", value: 1.42 },
      { label: "Bajo", value: 1.17 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 0.86 },
      { label: "Muy Alto", value: 0.70 }
    ],
    eso: [
      { label: "Muy Bajo", value: 1.21 },
      { label: "Bajo", value: 1.10 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 0.90 }
    ],
    elp: [
      { label: "Muy Bajo", value: 1.14 },
      { label: "Bajo", value: 1.07 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 0.95 }
    ],
    utp: [
      { label: "Muy Bajo", value: 1.24 },
      { label: "Bajo", value: 1.10 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 0.91 },
      { label: "Muy Alto", value: 0.82 }
    ],
    uhs: [
      { label: "Muy Bajo", value: 1.24 },
      { label: "Bajo", value: 1.10 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 0.91 },
      { label: "Muy Alto", value: 0.83 }
    ],
    rpl: [
      { label: "Muy Bajo", value: 1.23 },
      { label: "Bajo", value: 1.08 },
      { label: "Nominal", value: 1.00 },
      { label: "Alto", value: 1.04 },
      { label: "Muy Alto", value: 1.10 }
    ]
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paso 3: Factores de Ajuste de Esfuerzo (EAF)</CardTitle>
          <CardDescription>
            Configure los multiplicadores que afectan el esfuerzo del proyecto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="product" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="product">Producto</TabsTrigger>
              <TabsTrigger value="computer">Computadora</TabsTrigger>
              <TabsTrigger value="personnel">Personal</TabsTrigger>
              <TabsTrigger value="project">Proyecto</TabsTrigger>
            </TabsList>

            <TabsContent value="product" className="space-y-4">
              {["rss", "tbd", "cpr"].map((factor) => (
                <div key={factor} className="space-y-2">
                  <div className="flex items-center">
                    <Label className="mr-2">{eafDescriptions[factor as keyof typeof eafDescriptions]}</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Valor actual: {state.eafValues[factor as keyof typeof state.eafValues]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={state.eafValues[factor as keyof typeof state.eafValues].toString()}
                    onValueChange={(value) => updateEAF(factor, Number.parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione valor" />
                    </SelectTrigger>
                    <SelectContent>
                      {eafOptions[factor as keyof typeof eafOptions].map((option, index) => (
                        <SelectItem key={index} value={option.value.toString()}>
                          {option.label} ({option.value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="computer" className="space-y-4">
              {["rte", "rmp", "vmc", "trc"].map((factor) => (
                <div key={factor} className="space-y-2">
                  <div className="flex items-center">
                    <Label className="mr-2">{eafDescriptions[factor as keyof typeof eafDescriptions]}</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Valor actual: {state.eafValues[factor as keyof typeof state.eafValues]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={state.eafValues[factor as keyof typeof state.eafValues].toString()}
                    onValueChange={(value) => updateEAF(factor, Number.parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione valor" />
                    </SelectTrigger>
                    <SelectContent>
                      {eafOptions[factor as keyof typeof eafOptions].map((option, index) => (
                        <SelectItem key={index} value={option.value.toString()}>
                          {option.label} ({option.value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="personnel" className="space-y-4">
              {["can", "ean", "cpro", "eso", "elp"].map((factor) => (
                <div key={factor} className="space-y-2">
                  <div className="flex items-center">
                    <Label className="mr-2">{eafDescriptions[factor as keyof typeof eafDescriptions]}</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Valor actual: {state.eafValues[factor as keyof typeof state.eafValues]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={state.eafValues[factor as keyof typeof state.eafValues].toString()}
                    onValueChange={(value) => updateEAF(factor, Number.parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione valor" />
                    </SelectTrigger>
                    <SelectContent>
                      {eafOptions[factor as keyof typeof eafOptions].map((option, index) => (
                        <SelectItem key={index} value={option.value.toString()}>
                          {option.label} ({option.value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="project" className="space-y-4">
              {["utp", "uhs", "rpl"].map((factor) => (
                <div key={factor} className="space-y-2">
                  <div className="flex items-center">
                    <Label className="mr-2">{eafDescriptions[factor as keyof typeof eafDescriptions]}</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Valor actual: {state.eafValues[factor as keyof typeof state.eafValues]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={state.eafValues[factor as keyof typeof state.eafValues].toString()}
                    onValueChange={(value) => updateEAF(factor, Number.parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione valor" />
                    </SelectTrigger>
                    <SelectContent>
                      {eafOptions[factor as keyof typeof eafOptions].map((option, index) => (
                        <SelectItem key={index} value={option.value.toString()}>
                          {option.label} ({option.value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Factor de Ajuste de Esfuerzo (EAF)</h4>
            <p className="text-lg font-bold">EAF Total: {calculateEAF().toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Este factor se multiplicará por el esfuerzo base calculado
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Anterior
        </Button>
        <Button onClick={nextStep}>
          Siguiente
        </Button>
      </div>
    </div>
  )
}
