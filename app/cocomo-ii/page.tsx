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

export default function CocomoIIPage() {
  // Estado para los parámetros de entrada
  const [size, setSize] = useState<number>(10)
  const [sizeType, setSizeType] = useState<string>("kloc")
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

  // Factores de escala (inicializados en valor nominal)
  const [scaleFactors, setScaleFactors] = useState({
    prec: 3.72, // Precedentedness
    flex: 3.04, // Development Flexibility
    resl: 4.24, // Architecture/Risk Resolution
    team: 3.29, // Team Cohesion
    pmat: 4.68, // Process Maturity
  })

  // Multiplicadores de esfuerzo COCOMO II
  const [efMultipliers, setEfMultipliers] = useState({
    rely: 1.0, // Required Software Reliability
    data: 1.0, // Database Size
    cplx: 1.0, // Product Complexity
    ruse: 1.0, // Required Reusability
    docu: 1.0, // Documentation Match to Life-Cycle Needs
    time: 1.0, // Execution Time Constraint
    stor: 1.0, // Main Storage Constraint
    pvol: 1.0, // Platform Volatility
    acap: 1.0, // Analyst Capability
    pcap: 1.0, // Programmer Capability
    pcon: 1.0, // Personnel Continuity
    apex: 1.0, // Applications Experience
    plex: 1.0, // Platform Experience
    ltex: 1.0, // Language and Tool Experience
    tool: 1.0, // Use of Software Tools
    site: 1.0, // Multisite Development
    sced: 1.0, // Required Development Schedule
  })

  // Calcular el exponente de escala
  const calculateScaleExponent = () => {
    const sumSF = Object.values(scaleFactors).reduce((acc, val) => acc + val, 0)
    return 0.91 + 0.01 * sumSF
  }

  // Calcular el EAF (Factor de Ajuste de Esfuerzo)
  const calculateEAF = () => {
    return Object.values(efMultipliers).reduce((acc, val) => acc * val, 1.0)
  }

  // Convertir puntos de función a KLOC si es necesario
  const getSizeInKLOC = () => {
    if (sizeType === "kloc") return size
    // Conversión aproximada: 1 punto de función ≈ 53 líneas de código (promedio)
    return (size * 53) / 1000
  }

  // Calcular el esfuerzo (personas-mes)
  const calculateEffort = () => {
    const sizeKLOC = getSizeInKLOC()
    const scaleExp = calculateScaleExponent()
    const eaf = calculateEAF()
    return 2.94 * Math.pow(sizeKLOC, scaleExp) * eaf
  }

  // Calcular el tiempo de desarrollo (meses)
  const calculateDevelopmentTime = () => {
    const effort = calculateEffort()
    const scaleExp = calculateScaleExponent()
    const sced = efMultipliers.sced
    return 3.67 * Math.pow(effort, 0.28 + 0.2 * (scaleExp - 0.91)) * sced
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

  // Función para actualizar un factor de escala
  const updateScaleFactor = (factor: string, value: number) => {
    setScaleFactors((prev) => ({
      ...prev,
      [factor]: value,
    }))
  }

  // Función para actualizar un multiplicador de esfuerzo
  const updateEfMultiplier = (factor: string, value: number) => {
    setEfMultipliers((prev) => ({
      ...prev,
      [factor]: value,
    }))
  }

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

  // Descripciones de los factores de escala
  const scaleFactorDescriptions = {
    prec: "Precedentedness - Familiaridad con el tipo de proyecto",
    flex: "Development Flexibility - Flexibilidad en el desarrollo",
    resl: "Architecture/Risk Resolution - Resolución de arquitectura y riesgos",
    team: "Team Cohesion - Cohesión del equipo",
    pmat: "Process Maturity - Madurez del proceso",
  }

  // Descripciones de los multiplicadores de esfuerzo
  const efDescriptions = {
    rely: "Required Software Reliability - Fiabilidad requerida",
    data: "Database Size - Tamaño de la base de datos",
    cplx: "Product Complexity - Complejidad del producto",
    ruse: "Required Reusability - Reutilización requerida",
    docu: "Documentation Match - Documentación requerida",
    time: "Execution Time Constraint - Restricciones de tiempo",
    stor: "Main Storage Constraint - Restricciones de memoria",
    pvol: "Platform Volatility - Volatilidad de la plataforma",
    acap: "Analyst Capability - Capacidad del analista",
    pcap: "Programmer Capability - Capacidad del programador",
    pcon: "Personnel Continuity - Continuidad del personal",
    apex: "Applications Experience - Experiencia en aplicaciones",
    plex: "Platform Experience - Experiencia en la plataforma",
    ltex: "Language and Tool Experience - Experiencia en herramientas",
    tool: "Use of Software Tools - Uso de herramientas",
    site: "Multisite Development - Desarrollo multisitio",
    sced: "Required Development Schedule - Cronograma requerido",
  }

  // Opciones para factores de escala
  const scaleFactorOptions = {
    prec: [
      { label: "Muy bajo", value: 6.2 },
      { label: "Bajo", value: 4.96 },
      { label: "Nominal", value: 3.72 },
      { label: "Alto", value: 2.48 },
      { label: "Muy alto", value: 1.24 },
      { label: "Extra alto", value: 0.0 },
    ],
    flex: [
      { label: "Muy bajo", value: 5.07 },
      { label: "Bajo", value: 4.05 },
      { label: "Nominal", value: 3.04 },
      { label: "Alto", value: 2.03 },
      { label: "Muy alto", value: 1.01 },
      { label: "Extra alto", value: 0.0 },
    ],
    resl: [
      { label: "Muy bajo", value: 7.07 },
      { label: "Bajo", value: 5.65 },
      { label: "Nominal", value: 4.24 },
      { label: "Alto", value: 2.83 },
      { label: "Muy alto", value: 1.41 },
      { label: "Extra alto", value: 0.0 },
    ],
    team: [
      { label: "Muy bajo", value: 5.48 },
      { label: "Bajo", value: 4.38 },
      { label: "Nominal", value: 3.29 },
      { label: "Alto", value: 2.19 },
      { label: "Muy alto", value: 1.1 },
      { label: "Extra alto", value: 0.0 },
    ],
    pmat: [
      { label: "Muy bajo", value: 7.8 },
      { label: "Bajo", value: 6.24 },
      { label: "Nominal", value: 4.68 },
      { label: "Alto", value: 3.12 },
      { label: "Muy alto", value: 1.56 },
      { label: "Extra alto", value: 0.0 },
    ],
  }

  // Opciones para multiplicadores de esfuerzo (simplificado)
  const efOptions = {
    rely: [
      { label: "Muy bajo", value: 0.82 },
      { label: "Bajo", value: 0.92 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.1 },
      { label: "Muy alto", value: 1.26 },
    ],
    data: [
      { label: "Bajo", value: 0.9 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.14 },
      { label: "Muy alto", value: 1.28 },
    ],
    cplx: [
      { label: "Muy bajo", value: 0.73 },
      { label: "Bajo", value: 0.87 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.17 },
      { label: "Muy alto", value: 1.34 },
      { label: "Extra alto", value: 1.74 },
    ],
    ruse: [
      { label: "Bajo", value: 0.95 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.07 },
      { label: "Muy alto", value: 1.15 },
      { label: "Extra alto", value: 1.24 },
    ],
    docu: [
      { label: "Muy bajo", value: 0.81 },
      { label: "Bajo", value: 0.91 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.11 },
      { label: "Muy alto", value: 1.23 },
    ],
    time: [
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.11 },
      { label: "Muy alto", value: 1.29 },
      { label: "Extra alto", value: 1.63 },
    ],
    stor: [
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.05 },
      { label: "Muy alto", value: 1.17 },
      { label: "Extra alto", value: 1.46 },
    ],
    pvol: [
      { label: "Bajo", value: 0.87 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.15 },
      { label: "Muy alto", value: 1.3 },
    ],
    acap: [
      { label: "Muy bajo", value: 1.42 },
      { label: "Bajo", value: 1.19 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.85 },
      { label: "Muy alto", value: 0.71 },
    ],
    pcap: [
      { label: "Muy bajo", value: 1.34 },
      { label: "Bajo", value: 1.15 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.88 },
      { label: "Muy alto", value: 0.76 },
    ],
    pcon: [
      { label: "Muy bajo", value: 1.29 },
      { label: "Bajo", value: 1.12 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.9 },
      { label: "Muy alto", value: 0.81 },
    ],
    apex: [
      { label: "Muy bajo", value: 1.22 },
      { label: "Bajo", value: 1.1 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.88 },
      { label: "Muy alto", value: 0.81 },
    ],
    plex: [
      { label: "Muy bajo", value: 1.19 },
      { label: "Bajo", value: 1.09 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.91 },
      { label: "Muy alto", value: 0.85 },
    ],
    ltex: [
      { label: "Muy bajo", value: 1.2 },
      { label: "Bajo", value: 1.09 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.91 },
      { label: "Muy alto", value: 0.84 },
    ],
    tool: [
      { label: "Muy bajo", value: 1.17 },
      { label: "Bajo", value: 1.09 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.9 },
      { label: "Muy alto", value: 0.78 },
    ],
    site: [
      { label: "Muy bajo", value: 1.22 },
      { label: "Bajo", value: 1.09 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 0.93 },
      { label: "Muy alto", value: 0.86 },
      { label: "Extra alto", value: 0.8 },
    ],
    sced: [
      { label: "Muy bajo", value: 1.43 },
      { label: "Bajo", value: 1.14 },
      { label: "Nominal", value: 1.0 },
      { label: "Alto", value: 1.0 },
      { label: "Muy alto", value: 1.0 },
    ],
  }

  // Renderizar los resultados
  const effort = calculateEffort()
  const time = calculateDevelopmentTime()
  const personnel = calculatePersonnel()
  const cost = calculateTotalCost()
  const scaleExp = calculateScaleExponent()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">COCOMO II Post-Arquitectura</h1>
        </div>
        <Link href="/cocomo-ii/docs">
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
              <Label>Tipo de Medida de Tamaño</Label>
              <Select value={sizeType} onValueChange={setSizeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo de medida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kloc">KLOC (Miles de líneas de código)</SelectItem>
                  <SelectItem value="fp">Puntos de Función</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="size" className="mr-2">
                  Tamaño del Proyecto ({sizeType === "kloc" ? "KLOC" : "Puntos de Función"})
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {sizeType === "kloc"
                          ? "Miles de líneas de código estimadas"
                          : "Puntos de función estimados para el proyecto"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="size"
                  min={1}
                  max={sizeType === "kloc" ? 1000 : 5000}
                  step={1}
                  value={[size]}
                  onValueChange={(value) => setSize(value[0])}
                  className="flex-1"
                />
                <Input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-20" />
              </div>
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
            <CardDescription>Estimaciones calculadas según COCOMO II</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Exponente de escala</TableCell>
                  <TableCell className="text-right">{scaleExp.toFixed(3)}</TableCell>
                </TableRow>
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
                  <TableCell className="font-medium">
                    Productividad ({sizeType === "kloc" ? "KLOC" : "PF"}/persona-mes)
                  </TableCell>
                  <TableCell className="text-right">{(size / effort).toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Fórmulas y Cálculos */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Fórmulas y Cálculos</CardTitle>
            <CardDescription>Detalles de los cálculos realizados según COCOMO II</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="formulas">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="formulas">Fórmulas</TabsTrigger>
                <TabsTrigger value="calculations">Cálculos Paso a Paso</TabsTrigger>
              </TabsList>

              <TabsContent value="formulas" className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Fórmulas COCOMO II Post-Arquitectura</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <p><strong>Exponente de escala:</strong></p>
                    <p className="ml-4">E = B + 0.01 × ∑SF</p>
                    <p className="ml-4">donde B = 0.91</p>
                    
                    <p className="mt-3"><strong>Esfuerzo (personas-mes):</strong></p>
                    <p className="ml-4">Esfuerzo = A × Tamaño^E × ∏EM</p>
                    <p className="ml-4">donde A = 2.94</p>
                    
                    <p className="mt-3"><strong>Exponente de tiempo:</strong></p>
                    <p className="ml-4">F = 0.28 + 0.2 × (E - B)</p>
                    
                    <p className="mt-3"><strong>Tiempo de desarrollo (meses):</strong></p>
                    <p className="ml-4">T = C × Esfuerzo^F × SCED%</p>
                    <p className="ml-4">donde C = 3.67</p>
                    
                    <p className="mt-3"><strong>Personal promedio:</strong></p>
                    <p className="ml-4">P = Esfuerzo / T</p>
                    
                    <p className="mt-3"><strong>Suma de factores de escala:</strong></p>
                    <p className="ml-4">∑SF = PREC + FLEX + RESL + TEAM + PMAT</p>
                    
                    <p className="mt-3"><strong>Producto de multiplicadores:</strong></p>
                    <p className="ml-4">∏EM = ∏(todos los multiplicadores de esfuerzo)</p>
                    
                    <p className="mt-3"><strong>Conversión Puntos de Función a KLOC:</strong></p>
                    <p className="ml-4">KLOC = (Puntos de Función × 53) / 1000</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Constantes del Modelo</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Constante</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Descripción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">A</TableCell>
                        <TableCell>2.94</TableCell>
                        <TableCell>Constante de calibración para esfuerzo</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">B</TableCell>
                        <TableCell>0.91</TableCell>
                        <TableCell>Constante base para exponente de escala</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">C</TableCell>
                        <TableCell>3.67</TableCell>
                        <TableCell>Constante de calibración para tiempo</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Factor conversión PF</TableCell>
                        <TableCell>53</TableCell>
                        <TableCell>Líneas de código por punto de función</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="calculations" className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Cálculos Paso a Paso</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">1. Parámetros de entrada:</p>
                      <ul className="ml-4 space-y-1">
                        <li>• Tamaño = {size} {sizeType === "kloc" ? "KLOC" : "Puntos de Función"}</li>
                        {sizeType === "fp" && <li>• Tamaño en KLOC = {getSizeInKLOC().toFixed(2)} KLOC</li>}
                        <li>• Costo por persona-mes = ${costPerPerson.toLocaleString()}</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold">2. Factores de escala:</p>
                      <ul className="ml-4 space-y-1">
                        <li>• PREC = {scaleFactors.prec}</li>
                        <li>• FLEX = {scaleFactors.flex}</li>
                        <li>• RESL = {scaleFactors.resl}</li>
                        <li>• TEAM = {scaleFactors.team}</li>
                        <li>• PMAT = {scaleFactors.pmat}</li>
                        <li>• ∑SF = {Object.values(scaleFactors).reduce((acc, val) => acc + val, 0).toFixed(2)}</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold">3. Cálculo del exponente de escala:</p>
                      <div className="ml-4 space-y-1">
                        <p>E = 0.91 + 0.01 × {Object.values(scaleFactors).reduce((acc, val) => acc + val, 0).toFixed(2)}</p>
                        <p>E = 0.91 + {(0.01 * Object.values(scaleFactors).reduce((acc, val) => acc + val, 0)).toFixed(3)}</p>
                        <p>E = {scaleExp.toFixed(3)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">4. Multiplicadores de esfuerzo:</p>
                      <div className="ml-4 space-y-1">
                        <p>∏EM = {Object.entries(efMultipliers).map(([key, value]) => value.toFixed(2)).join(" × ")}</p>
                        <p>∏EM = {calculateEAF().toFixed(4)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">5. Cálculo del esfuerzo:</p>
                      <div className="ml-4 space-y-1">
                        <p>Esfuerzo = 2.94 × ({getSizeInKLOC().toFixed(2)})^{scaleExp.toFixed(3)} × {calculateEAF().toFixed(4)}</p>
                        <p>Esfuerzo = 2.94 × {Math.pow(getSizeInKLOC(), scaleExp).toFixed(2)} × {calculateEAF().toFixed(4)}</p>
                        <p>Esfuerzo = {effort.toFixed(2)} personas-mes</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">6. Cálculo del exponente de tiempo:</p>
                      <div className="ml-4 space-y-1">
                        <p>F = 0.28 + 0.2 × ({scaleExp.toFixed(3)} - 0.91)</p>
                        <p>F = 0.28 + 0.2 × {(scaleExp - 0.91).toFixed(3)}</p>
                        <p>F = {(0.28 + 0.2 * (scaleExp - 0.91)).toFixed(3)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">7. Cálculo del tiempo:</p>
                      <div className="ml-4 space-y-1">
                        <p>T = 3.67 × ({effort.toFixed(2)})^{(0.28 + 0.2 * (scaleExp - 0.91)).toFixed(3)} × {efMultipliers.sced}</p>
                        <p>T = 3.67 × {Math.pow(effort, 0.28 + 0.2 * (scaleExp - 0.91)).toFixed(2)} × {efMultipliers.sced}</p>
                        <p>T = {time.toFixed(2)} meses</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">8. Cálculos derivados:</p>
                      <ul className="ml-4 space-y-1">
                        <li>• Personal promedio = {effort.toFixed(2)} ÷ {time.toFixed(2)} = {personnel.toFixed(2)} personas</li>
                        <li>• Costo total = {effort.toFixed(2)} × ${costPerPerson.toLocaleString()} = ${cost.toLocaleString("es-ES", { maximumFractionDigits: 2 })}</li>
                        <li>• Productividad = {size} ÷ {effort.toFixed(2)} = {(size / effort).toFixed(2)} {sizeType === "kloc" ? "KLOC" : "PF"}/persona-mes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      {/* Factores de escala */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Factores de Escala</CardTitle>
          <CardDescription>Ajuste los factores de escala según las características de su proyecto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.keys(scaleFactors).map((factor) => (
            <div key={factor} className="space-y-2">
              <div className="flex items-center">
                <Label className="mr-2">
                  {scaleFactorDescriptions[factor as keyof typeof scaleFactorDescriptions]}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoCircle className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Valor actual: {scaleFactors[factor as keyof typeof scaleFactors]}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={scaleFactors[factor as keyof typeof scaleFactors].toString()}
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
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Suma de factores de escala:{" "}
            {Object.values(scaleFactors)
              .reduce((acc, val) => acc + val, 0)
              .toFixed(2)}
          </div>
        </CardFooter>
      </Card>

      {/* Multiplicadores de esfuerzo */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Multiplicadores de Esfuerzo</CardTitle>
          <CardDescription>Ajuste los multiplicadores según las características de su proyecto</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="product">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="product">Producto</TabsTrigger>
              <TabsTrigger value="platform">Plataforma</TabsTrigger>
              <TabsTrigger value="personnel">Personal</TabsTrigger>
              <TabsTrigger value="project">Proyecto</TabsTrigger>
            </TabsList>

            <TabsContent value="product" className="space-y-4">
              {["rely", "data", "cplx", "ruse", "docu"].map((factor) => (
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
                            Valor actual: {efMultipliers[factor as keyof typeof efMultipliers]}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={efMultipliers[factor as keyof typeof efMultipliers].toString()}
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

            <TabsContent value="platform" className="space-y-4">
              {["time", "stor", "pvol"].map((factor) => (
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
                            Valor actual: {efMultipliers[factor as keyof typeof efMultipliers]}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={efMultipliers[factor as keyof typeof efMultipliers].toString()}
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

            <TabsContent value="personnel" className="space-y-4">
              {["acap", "pcap", "pcon", "apex", "plex", "ltex"].map((factor) => (
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
                            Valor actual: {efMultipliers[factor as keyof typeof efMultipliers]}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={efMultipliers[factor as keyof typeof efMultipliers].toString()}
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

            <TabsContent value="project" className="space-y-4">
              {["tool", "site", "sced"].map((factor) => (
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
                            Valor actual: {efMultipliers[factor as keyof typeof efMultipliers]}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={efMultipliers[factor as keyof typeof efMultipliers].toString()}
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
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">EAF Total: {calculateEAF().toFixed(2)}</div>
        </CardFooter>
      </Card>
    </div>
  )
}
