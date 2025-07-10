export type TipoFuncion = "entradas" | "salidas" | "consultas" | "archivos" | "interfaces"
export type NivelComplejidad = "baja" | "media" | "alta"

export interface CocomoIIState {
  // Basic parameters
  size: number
  sizeType: string
  costPerPerson: number
  
  // Scale factors (COCOMO II specific)
  scaleFactors: {
    prec: number // Precedentedness
    flex: number // Development Flexibility
    resl: number // Architecture/Risk Resolution
    team: number // Team Cohesion
    pmat: number // Process Maturity
  }
  
  // Effort multipliers
  efMultipliers: {
    rely: number // Required Software Reliability
    data: number // Database Size
    cplx: number // Product Complexity
    ruse: number // Required Reusability
    docu: number // Documentation Match to Life-Cycle Needs
    time: number // Execution Time Constraint
    stor: number // Main Storage Constraint
    pvol: number // Platform Volatility
    acap: number // Analyst Capability
    pcap: number // Programmer Capability
    pcon: number // Personnel Continuity
    apex: number // Applications Experience
    plex: number // Platform Experience
    ltex: number // Language and Tool Experience
    tool: number // Use of Software Tools
    site: number // Multisite Development
    sced: number // Required Development Schedule
  }
  
  // Function points (for size estimation)
  pf: number
  language: string
  customLanguageMultiplier: number
  functionPoints: Record<TipoFuncion, Record<NivelComplejidad, number>>
  
  // Phase costs
  usePhaseCosts: boolean
  phaseCosts: {
    requirements: { cost: number; effort: number }
    productDesign: { cost: number; effort: number }
    detailedDesign: { cost: number; effort: number }
    codingUnitTest: { cost: number; effort: number }
    integrationTest: { cost: number; effort: number }
    maintenance: { cost: number; effort: number }
  }
  
  // Current step
  currentStep: number
}

export const functionWeights: Record<TipoFuncion, Record<NivelComplejidad, number>> = {
  entradas: { baja: 3, media: 4, alta: 6 },
  salidas: { baja: 4, media: 5, alta: 7 },
  consultas: { baja: 3, media: 4, alta: 6 },
  archivos: { baja: 7, media: 10, alta: 15 },
  interfaces: { baja: 5, media: 7, alta: 10 }
}

export const languageFactors: { [key: string]: number } = {
  "C": 128,
  "C++": 29,
  "Java": 53,
  "Python": 42,
  "JavaScript": 47,
  "TypeScript": 50,
  "Ruby": 50,
  "Kotlin": 43,
  "Go": 38,
  "Rust": 39,
  "Swift": 42,
  "PHP": 50,
  "otro": 0
}

export const phases = [
  { key: 'requirements', name: 'Requerimientos' },
  { key: 'productDesign', name: 'Diseño del Producto' },
  { key: 'detailedDesign', name: 'Diseño Detallado' },
  { key: 'codingUnitTest', name: 'Codificación y Pruebas Unitarias' },
  { key: 'integrationTest', name: 'Integración y Testeo' },
  { key: 'maintenance', name: 'Mantenimiento' },
]

// Scale factors descriptions and options
export const scaleFactorDescriptions = {
  prec: "Precedencia",
  flex: "Flexibilidad de Desarrollo",
  resl: "Resolución de Arquitectura/Riesgo",
  team: "Cohesión del Equipo",
  pmat: "Madurez del Proceso"
}

export const scaleFactorOptions = {
  prec: [
    { label: "Muy Bajo", value: 6.20 },
    { label: "Bajo", value: 4.96 },
    { label: "Nominal", value: 3.72 },
    { label: "Alto", value: 2.48 },
    { label: "Muy Alto", value: 1.24 },
    { label: "Extra Alto", value: 0.00 }
  ],
  flex: [
    { label: "Muy Bajo", value: 5.07 },
    { label: "Bajo", value: 4.05 },
    { label: "Nominal", value: 3.04 },
    { label: "Alto", value: 2.03 },
    { label: "Muy Alto", value: 1.01 },
    { label: "Extra Alto", value: 0.00 }
  ],
  resl: [
    { label: "Muy Bajo", value: 7.07 },
    { label: "Bajo", value: 5.65 },
    { label: "Nominal", value: 4.24 },
    { label: "Alto", value: 2.83 },
    { label: "Muy Alto", value: 1.41 },
    { label: "Extra Alto", value: 0.00 }
  ],
  team: [
    { label: "Muy Bajo", value: 5.48 },
    { label: "Bajo", value: 4.38 },
    { label: "Nominal", value: 3.29 },
    { label: "Alto", value: 2.19 },
    { label: "Muy Alto", value: 1.10 },
    { label: "Extra Alto", value: 0.00 }
  ],
  pmat: [
    { label: "Muy Bajo", value: 7.80 },
    { label: "Bajo", value: 6.24 },
    { label: "Nominal", value: 4.68 },
    { label: "Alto", value: 3.12 },
    { label: "Muy Alto", value: 1.56 },
    { label: "Extra Alto", value: 0.00 }
  ]
}

// Effort multipliers descriptions and options
export const efDescriptions = {
  rely: "Fiabilidad Requerida del Software",
  data: "Tamaño de la Base de Datos",
  cplx: "Complejidad del Producto",
  ruse: "Reusabilidad Requerida",
  docu: "Documentación Acorde al Ciclo de Vida",
  time: "Restricciones de Tiempo de Ejecución",
  stor: "Restricciones de Almacenamiento Principal",
  pvol: "Volatilidad de la Plataforma",
  acap: "Capacidad del Analista",
  pcap: "Capacidad del Programador",
  pcon: "Continuidad del Personal",
  apex: "Experiencia en Aplicaciones",
  plex: "Experiencia en la Plataforma",
  ltex: "Experiencia en Lenguaje y Herramientas",
  tool: "Uso de Herramientas de Software",
  site: "Desarrollo Multi-sitio",
  sced: "Calendario de Desarrollo Requerido"
}

export const efOptions = {
  rely: [
    { label: "Muy Bajo", value: 0.82 },
    { label: "Bajo", value: 0.92 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.10 },
    { label: "Muy Alto", value: 1.26 }
  ],
  data: [
    { label: "Bajo", value: 0.90 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.14 },
    { label: "Muy Alto", value: 1.28 }
  ],
  cplx: [
    { label: "Muy Bajo", value: 0.73 },
    { label: "Bajo", value: 0.87 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.17 },
    { label: "Muy Alto", value: 1.34 },
    { label: "Extra Alto", value: 1.74 }
  ],
  ruse: [
    { label: "Bajo", value: 0.95 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.07 },
    { label: "Muy Alto", value: 1.15 },
    { label: "Extra Alto", value: 1.24 }
  ],
  docu: [
    { label: "Muy Bajo", value: 0.81 },
    { label: "Bajo", value: 0.91 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.11 },
    { label: "Muy Alto", value: 1.23 }
  ],
  time: [
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.11 },
    { label: "Muy Alto", value: 1.29 },
    { label: "Extra Alto", value: 1.63 }
  ],
  stor: [
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.05 },
    { label: "Muy Alto", value: 1.17 },
    { label: "Extra Alto", value: 1.46 }
  ],
  pvol: [
    { label: "Bajo", value: 0.87 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.15 },
    { label: "Muy Alto", value: 1.30 }
  ],
  acap: [
    { label: "Muy Bajo", value: 1.42 },
    { label: "Bajo", value: 1.19 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 0.85 },
    { label: "Muy Alto", value: 0.71 }
  ],
  pcap: [
    { label: "Muy Bajo", value: 1.34 },
    { label: "Bajo", value: 1.15 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 0.88 },
    { label: "Muy Alto", value: 0.76 }
  ],
  pcon: [
    { label: "Muy Bajo", value: 1.29 },
    { label: "Bajo", value: 1.12 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 0.90 },
    { label: "Muy Alto", value: 0.81 }
  ],
  apex: [
    { label: "Muy Bajo", value: 1.22 },
    { label: "Bajo", value: 1.10 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 0.88 },
    { label: "Muy Alto", value: 0.81 }
  ],
  plex: [
    { label: "Muy Bajo", value: 1.19 },
    { label: "Bajo", value: 1.09 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 0.91 },
    { label: "Muy Alto", value: 0.85 }
  ],
  ltex: [
    { label: "Muy Bajo", value: 1.20 },
    { label: "Bajo", value: 1.09 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 0.91 },
    { label: "Muy Alto", value: 0.84 }
  ],
  tool: [
    { label: "Muy Bajo", value: 1.17 },
    { label: "Bajo", value: 1.09 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 0.90 },
    { label: "Muy Alto", value: 0.78 }
  ],
  site: [
    { label: "Muy Bajo", value: 1.22 },
    { label: "Bajo", value: 1.09 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 0.93 },
    { label: "Muy Alto", value: 0.86 },
    { label: "Extra Alto", value: 0.80 }
  ],
  sced: [
    { label: "Muy Bajo", value: 1.43 },
    { label: "Bajo", value: 1.14 },
    { label: "Nominal", value: 1.00 },
    { label: "Alto", value: 1.00 },
    { label: "Muy Alto", value: 1.00 }
  ]
}
