export type TipoFuncion = "entradas" | "salidas" | "consultas" | "archivos" | "interfaces"
export type NivelComplejidad = "baja" | "media" | "alta"

export interface CocomoIIState {
  // Basic parameters
  kloc: number
  costPerPerson: number
  language: string
  customLanguageMultiplier: number
  
  // Sizing method choice
  sizingMethod: 'kloc' | 'functionPoints'
  
  // Function points
  useFunctionPoints: boolean
  functionPoints: Record<TipoFuncion, Record<NivelComplejidad, number>>
  
  // EAF values
  eafValues: {
    rss: number // Fiabilidad requerida del software
    tbd: number // Tamaño de la base de datos
    cpr: number // Complejidad del producto
    rte: number // Restricciones de tiempo de ejecución
    rmp: number // Restricciones de almacenamiento principal
    vmc: number // Volatilidad de la máquina virtual
    trc: number // Tiempo de respuesta requerido
    can: number // Capacidad del analista
    ean: number // Experiencia en aplicaciones
    cpro: number // Capacidad del programador
    eso: number // Experiencia en la máquina virtual
    elp: number // Experiencia en el lenguaje de programación
    utp: number // Uso de prácticas modernas de programación
    uhs: number // Uso de herramientas de software
    rpl: number // Restricciones de plazo de desarrollo
  }
  
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
  "Cobol": 91,
  "Ensamblador": 320,
  "Fortran": 105,
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
