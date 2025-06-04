"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { InfoIcon as InfoCircle, ArrowLeft, BookOpen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

export default function Cocomo81Page() {
  // Estado para los parámetros de entrada
  const [kloc, setKloc] = useState<number>(10)
  const [projectType, setProjectType] = useState<string>("organic")
  const [costPerPerson, setCostPerPerson] = useState<number>(5000)

  // Estados para costos por etapas
  const [usePhaseCosts, setUsePhaseCosts] = useState<boolean>(false)
  const [phaseCosts, setPhaseCosts] = useState({
    requirements: { cost: 5000, effort: 15 },
    productDesign: { cost: 5000, effort: 20 },
    detailedDesign: { cost: 5000, effort: 15 },
    codingUnitTest: { cost: 5000, effort: 30 },
    integrationTest: { cost: 5000, effort: 15 },
    maintenance: { cost: 5000, effort: 5 },
  })

  // Definición de las etapas
  const phases = [
    { key: 'requirements', name: 'Requerimientos' },
    { key: 'productDesign', name: 'Diseño del Producto' },
    { key: 'detailedDesign', name: 'Diseño Detallado' },
    { key: 'codingUnitTest', name: 'Codificación y Pruebas Unitarias' },
    { key: 'integrationTest', name: 'Integración y Testeo' },
    { key: 'maintenance', name: 'Mantenimiento' },
  ]

  // Función para actualizar costos por etapa
  const updatePhaseCost = (phase: string, type: 'cost' | 'effort', value: number) => {
    setPhaseCosts((prev) => ({
      ...prev,
      [phase]: {
        ...prev[phase as keyof typeof prev],
        [type]: value,
      },
    }))
  }

  // Función para calcular el total de esfuerzo
  const getTotalEffort = () => {
    return Object.values(phaseCosts).reduce((total, phase) => total + phase.effort, 0)
  }

  // Estado para los multiplicadores de esfuerzo (todos inicializados en valor nominal = 1.0)
  const [eafValues, setEafValues] = useState({
    rely: 1.0, // Fiabilidad requerida del software
    data: 1.0, // Tamaño de la base de datos
    cplx: 1.0, // Complejidad del producto
    time: 1.0, // Restricciones de tiempo de ejecución
    stor: 1.0, // Restricciones de almacenamiento principal
    virt: 1.0, // Volatilidad de la máquina virtual
    turn: 1.0, // Tiempo de respuesta requerido
    acap: 1.0, // Capacidad del analista
    aexp: 1.0, // Experiencia en aplicaciones
    pcap: 1.0, // Capacidad del programador
    vexp: 1.0, // Experiencia en la máquina virtual
    lexp: 1.0, // Experiencia en el lenguaje de programación
    modp: 1.0, // Uso de prácticas modernas de programación
    tool: 1.0, // Uso de herramientas de software
    sced: 1.0, // Cronograma requerido de desarrollo
  })

  // Coeficientes según el tipo de proyecto
  const coefficients = {
    organic: { a: 2.4, b: 1.05, c: 0.38 },
    semidetached: { a: 3.0, b: 1.12, c: 0.35 },
    embedded: { a: 3.6, b: 1.2, c: 0.32 },
  }

  // Calcular el EAF (Factor de Ajuste de Esfuerzo)
  const calculateEAF = () => {
    return Object.values(eafValues).reduce((acc, val) => acc * val, 1.0)
  }

  // Calcular el esfuerzo (personas-mes)
  const calculateEffort = () => {
    const { a, b } = coefficients[projectType as keyof typeof coefficients]
    const eaf = calculateEAF()
    return a * Math.pow(kloc, b) * eaf
  }

  // Calcular el tiempo de desarrollo (meses)
  const calculateDevelopmentTime = () => {
    const { c } = coefficients[projectType as keyof typeof coefficients]
    const effort = calculateEffort()
    return 2.5 * Math.pow(effort, c)
  }

  // Calcular el número de personas requeridas
  const calculatePersonnel = () => {
    const effort = calculateEffort()
    const time = calculateDevelopmentTime()
    return effort / time
  }

  // Calcular el costo total
  const calculateTotalCost = () => {
    const effort = calculateEffort()

    if (usePhaseCosts && getTotalEffort() === 100) {
      // Calcular costo total usando distribución por etapas
      let totalCost = 0
      Object.values(phaseCosts).forEach((phase) => {
        const phaseEffort = (effort * phase.effort) / 100
        totalCost += phaseEffort * phase.cost
      })
      return totalCost
    }

    return effort * costPerPerson
  }

  // Función para actualizar un multiplicador de esfuerzo
  const updateEAF = (factor: string, value: number) => {
    setEafValues((prev) => ({
      ...prev,
      [factor]: value,
    }))
  }

  // Descripción de los factores EAF
  const eafDescriptions = {
    rely: "Fiabilidad requerida del software",
    data: "Tamaño de la base de datos",
    cplx: "Complejidad del producto",
    time: "Restricciones de tiempo de ejecución",
    stor: "Restricciones de almacenamiento principal",
    virt: "Volatilidad de la máquina virtual",
    turn: "Tiempo de respuesta requerido",
    acap: "Capacidad del analista",
    aexp: "Experiencia en aplicaciones",
    pcap: "Capacidad del programador",
    vexp: "Experiencia en la máquina virtual",
    lexp: "Experiencia en el lenguaje de programación",
    modp: "Uso de prácticas modernas de programación",
    tool: "Uso de herramientas de software",
    sced: "Cronograma requerido de desarrollo",
  }

  // Valores posibles para cada factor EAF
  const eafOptions = {
    rely: [
      { label: "Muy bajo", value: 0.75 },
      { label: "Bajo", value: 0.88 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.15 },
      { label: "Muy alto", value: 1.4 },
    ],
    data: [
      { label: "Bajo", value: 0.94 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.08 },
      { label: "Muy alto", value: 1.16 },
    ],
    cplx: [
      { label: "Muy bajo", value: 0.7 },
      { label: "Bajo", value: 0.85 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.15 },
      { label: "Muy alto", value: 1.3 },
      { label: "Extra alto", value: 1.65 },
    ],
    time: [
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.11 },
      { label: "Muy alto", value: 1.3 },
      { label: "Extra alto", value: 1.66 },
    ],
    stor: [
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.06 },
      { label: "Muy alto", value: 1.21 },
      { label: "Extra alto", value: 1.56 },
    ],
    virt: [
      { label: "Bajo", value: 0.87 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.15 },
      { label: "Muy alto", value: 1.3 },
    ],
    turn: [
      { label: "Bajo", value: 0.87 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.07 },
      { label: "Muy alto", value: 1.15 },
    ],
    acap: [
      { label: "Muy bajo", value: 1.46 },
      { label: "Bajo", value: 1.19 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.86 },
      { label: "Muy alto", value: 0.71 },
    ],
    aexp: [
      { label: "Muy bajo", value: 1.29 },
      { label: "Bajo", value: 1.13 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.91 },
      { label: "Muy alto", value: 0.82 },
    ],
    pcap: [
      { label: "Muy bajo", value: 1.42 },
      { label: "Bajo", value: 1.17 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.86 },
      { label: "Muy alto", value: 0.7 },
    ],
    vexp: [
      { label: "Muy bajo", value: 1.21 },
      { label: "Bajo", value: 1.1 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.9 },
    ],
    lexp: [
      { label: "Muy bajo", value: 1.14 },
      { label: "Bajo", value: 1.07 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.95 },
    ],
    modp: [
      { label: "Muy bajo", value: 1.24 },
      { label: "Bajo", value: 1.1 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.91 },
      { label: "Muy alto", value: 0.82 },
    ],
    tool: [
      { label: "Muy bajo", value: 1.24 },
      { label: "Bajo", value: 1.1 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.91 },
      { label: "Muy alto", value: 0.83 },
    ],
    sced: [
      { label: "Muy bajo", value: 1.23 },
      { label: "Bajo", value: 1.08 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.04 },
      { label: "Muy alto", value: 1.1 },
    ],
  }

  // Renderizar los resultados
  const effort = calculateEffort()
  const time = calculateDevelopmentTime()
  const personnel = calculatePersonnel()
  const cost = calculateTotalCost()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">COCOMO-81 Intermedio</h1>
        </div>
        <Link href="/cocomo-81/docs">
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            Documentación
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parámetros básicos */}
        <Card>
          <CardHeader>
            <CardTitle>Parámetros Básicos</CardTitle>
            <CardDescription>Ingrese los parámetros principales del proyecto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="kloc" className="mr-2">
                  Tamaño del Proyecto (KLOC)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Miles de líneas de código estimadas para el proyecto</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="kloc"
                  min={1}
                  max={1000}
                  step={1}
                  value={[kloc]}
                  onValueChange={(value) => setKloc(value[0])}
                  className="flex-1"
                />
                <Input type="number" value={kloc} onChange={(e) => setKloc(Number(e.target.value))} className="w-20" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="project-type" className="mr-2">
                  Tipo de Proyecto
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Orgánico: Equipos pequeños con experiencia en aplicaciones similares.
                        <br />
                        Semi-acoplado: Equipos mixtos con experiencia variada.
                        <br />
                        Empotrado: Proyectos con fuertes restricciones.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger id="project-type">
                  <SelectValue placeholder="Seleccione tipo de proyecto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Orgánico</SelectItem>
                  <SelectItem value="semidetached">Semi-acoplado</SelectItem>
                  <SelectItem value="embedded">Empotrado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="cost" className="mr-2">
                    Costo por Persona-Mes ($)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircle className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Costo promedio mensual por persona en el equipo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="cost"
                  type="number"
                  value={costPerPerson}
                  onChange={(e) => setCostPerPerson(Number(e.target.value))}
                  disabled={usePhaseCosts}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="phase-costs"
                  checked={usePhaseCosts}
                  onChange={(e) => setUsePhaseCosts(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="phase-costs" className="text-sm font-medium">
                  Costo Personas-Mes por etapas
                </Label>
              </div>

              {usePhaseCosts && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-3">
                    Distribución de costos y esfuerzo por etapas del ciclo de vida
                  </div>

                  {phases.map((phase) => (
                    <div key={phase.key} className="grid grid-cols-2 gap-4 items-center">
                      <div className="space-y-1">
                        <Label className="text-sm">{phase.name}</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">$</span>
                          <Input
                            type="number"
                            value={phaseCosts[phase.key as keyof typeof phaseCosts].cost}
                            onChange={(e) => updatePhaseCost(phase.key, 'cost', Number(e.target.value))}
                            className="text-sm"
                            placeholder="Costo"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm">Esfuerzo (%)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={phaseCosts[phase.key as keyof typeof phaseCosts].effort}
                            onChange={(e) => updatePhaseCost(phase.key, 'effort', Number(e.target.value))}
                            className="text-sm"
                            placeholder="%"
                          />
                          <span className="text-xs text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">Total esfuerzo:</span>
                    <span className={`text-sm font-medium ${getTotalEffort() === 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {getTotalEffort()}%
                    </span>
                  </div>

                  {getTotalEffort() !== 100 && (
                    <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                      ⚠️ El total de esfuerzo debe ser exactamente 100%
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {/* Resultados */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>Estimaciones calculadas según COCOMO-81</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Esfuerzo (personas-mes)</TableCell>
                  <TableCell className="text-right">{effort.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tiempo de desarrollo (meses)</TableCell>
                  <TableCell className="text-right">{time.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Personal requerido (promedio)</TableCell>
                  <TableCell className="text-right">{personnel.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Costo total estimado ($)</TableCell>
                  <TableCell className="text-right">
                    {cost.toLocaleString("es-ES", { maximumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Productividad (KLOC/persona-mes)</TableCell>
                  <TableCell className="text-right">{(kloc / effort).toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Fórmulas y Cálculos */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Fórmulas y Cálculos</CardTitle>
            <CardDescription>Detalles de los cálculos realizados según COCOMO-81</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="formulas">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="formulas">Fórmulas</TabsTrigger>
                <TabsTrigger value="calculations">Cálculos Paso a Paso</TabsTrigger>
              </TabsList>

              <TabsContent value="formulas" className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Fórmulas COCOMO-81 Intermedio</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <p><strong>Esfuerzo (personas-mes):</strong></p>
                    <p className="ml-4">E = a × (KLOC)^b × EAF</p>

                    <p className="mt-3"><strong>Tiempo de desarrollo (meses):</strong></p>
                    <p className="ml-4">T = c × (E)^d</p>

                    <p className="mt-3"><strong>Personal promedio:</strong></p>
                    <p className="ml-4">P = E / T</p>

                    <p className="mt-3"><strong>Factor de Ajuste de Esfuerzo (EAF):</strong></p>
                    <p className="ml-4">EAF = ∏(multiplicadores de esfuerzo)</p>

                    <p className="mt-3"><strong>Costo total:</strong></p>
                    <p className="ml-4">Costo = E × Costo_por_persona_mes</p>

                    <p className="mt-3"><strong>Productividad:</strong></p>
                    <p className="ml-4">Productividad = KLOC / E</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Coeficientes según Tipo de Proyecto</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>a</TableHead>
                        <TableHead>b</TableHead>
                        <TableHead>c</TableHead>
                        <TableHead>d</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className={projectType === "organic" ? "bg-blue-100" : ""}>
                        <TableCell className="font-medium">Orgánico</TableCell>
                        <TableCell>2.4</TableCell>
                        <TableCell>1.05</TableCell>
                        <TableCell>0.38</TableCell>
                        <TableCell>0.38</TableCell>
                      </TableRow>
                      <TableRow className={projectType === "semidetached" ? "bg-blue-100" : ""}>
                        <TableCell className="font-medium">Semi-acoplado</TableCell>
                        <TableCell>3.0</TableCell>
                        <TableCell>1.12</TableCell>
                        <TableCell>0.35</TableCell>
                        <TableCell>0.35</TableCell>
                      </TableRow>
                      <TableRow className={projectType === "embedded" ? "bg-blue-100" : ""}>
                        <TableCell className="font-medium">Empotrado</TableCell>
                        <TableCell>3.6</TableCell>
                        <TableCell>1.20</TableCell>
                        <TableCell>0.32</TableCell>
                        <TableCell>0.32</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-sm text-gray-600 mt-2">
                    * Fila resaltada indica el tipo de proyecto seleccionado
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="calculations" className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Cálculos Paso a Paso</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">1. Parámetros de entrada:</p>
                      <ul className="ml-4 space-y-1">
                        <li>• KLOC = {kloc}</li>
                        <li>• Tipo de proyecto = {projectType === "organic" ? "Orgánico" : projectType === "semidetached" ? "Semi-acoplado" : "Empotrado"}</li>
                        <li>• Costo por persona-mes = ${costPerPerson.toLocaleString()}</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold">2. Coeficientes seleccionados:</p>
                      <ul className="ml-4 space-y-1">
                        <li>• a = {coefficients[projectType as keyof typeof coefficients].a}</li>
                        <li>• b = {coefficients[projectType as keyof typeof coefficients].b}</li>
                        <li>• c = {coefficients[projectType as keyof typeof coefficients].c}</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold">3. Cálculo del EAF:</p>
                      <div className="ml-4 space-y-1">
                        <p>EAF = {Object.entries(eafValues).map(([key, value]) => value.toFixed(2)).join(" × ")}</p>
                        <p>EAF = {calculateEAF().toFixed(4)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">4. Cálculo del esfuerzo:</p>
                      <div className="ml-4 space-y-1">
                        <p>E = {coefficients[projectType as keyof typeof coefficients].a} × ({kloc})^{coefficients[projectType as keyof typeof coefficients].b} × {calculateEAF().toFixed(4)}</p>
                        <p>E = {coefficients[projectType as keyof typeof coefficients].a} × {Math.pow(kloc, coefficients[projectType as keyof typeof coefficients].b).toFixed(2)} × {calculateEAF().toFixed(4)}</p>
                        <p>E = {effort.toFixed(2)} personas-mes</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">5. Cálculo del tiempo:</p>
                      <div className="ml-4 space-y-1">
                        <p>T = 2.5 × ({effort.toFixed(2)})^{coefficients[projectType as keyof typeof coefficients].c}</p>
                        <p>T = 2.5 × {Math.pow(effort, coefficients[projectType as keyof typeof coefficients].c).toFixed(2)}</p>
                        <p>T = {time.toFixed(2)} meses</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">6. Cálculos derivados:</p>
                      <ul className="ml-4 space-y-1">
                        <li>• Personal promedio = {effort.toFixed(2)} ÷ {time.toFixed(2)} = {personnel.toFixed(2)} personas</li>
                        <li>• Costo total = {effort.toFixed(2)} × ${costPerPerson.toLocaleString()} = ${cost.toLocaleString("es-ES", { maximumFractionDigits: 2 })}</li>
                        <li>• Productividad = {kloc} ÷ {effort.toFixed(2)} = {(kloc / effort).toFixed(2)} KLOC/persona-mes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Multiplicadores de esfuerzo */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Multiplicadores de Esfuerzo (EAF)</CardTitle>
            <CardDescription>Ajuste los factores según las características de su proyecto</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="product">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="product">Atributos del Producto</TabsTrigger>
                <TabsTrigger value="hardware">Atributos de Hardware</TabsTrigger>
                <TabsTrigger value="personnel">Atributos del Personal</TabsTrigger>
              </TabsList>

              <TabsContent value="product" className="space-y-4">
                {["rely", "data", "cplx"].map((factor) => (
                  <div key={factor} className="space-y-2">
                    <div className="flex items-center">
                      <Label className="mr-2">{eafDescriptions[factor as keyof typeof eafDescriptions]}</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoCircle className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Valor actual: {eafValues[factor as keyof typeof eafValues]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select
                      value={eafValues[factor as keyof typeof eafValues].toString()}
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

              <TabsContent value="hardware" className="space-y-4">
                {["time", "stor", "virt", "turn"].map((factor) => (
                  <div key={factor} className="space-y-2">
                    <div className="flex items-center">
                      <Label className="mr-2">{eafDescriptions[factor as keyof typeof eafDescriptions]}</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoCircle className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Valor actual: {eafValues[factor as keyof typeof eafValues]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select
                      value={eafValues[factor as keyof typeof eafValues].toString()}
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
                {["acap", "aexp", "pcap", "vexp", "lexp", "modp", "tool", "sced"].map((factor) => (
                  <div key={factor} className="space-y-2">
                    <div className="flex items-center">
                      <Label className="mr-2">{eafDescriptions[factor as keyof typeof eafDescriptions]}</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoCircle className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Valor actual: {eafValues[factor as keyof typeof eafValues]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select
                      value={eafValues[factor as keyof typeof eafValues].toString()}
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
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">EAF Total: {calculateEAF().toFixed(2)}</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
