"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calculator } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function CocomoIIDocsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cocomo-ii">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Documentación COCOMO II Post-Arquitectura</h1>
      </div>

      <div className="space-y-8">
        {/* Introducción */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Introducción al Modelo COCOMO II
            </CardTitle>
            <CardDescription>Constructive Cost Model - Versión 2000</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              COCOMO II es la evolución del modelo COCOMO original, desarrollado para abordar las prácticas modernas de
              desarrollo de software. El modelo Post-Arquitectura se aplica después de que la arquitectura del sistema
              ha sido diseñada y es el más detallado de los tres submodelos de COCOMO II.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Ecuación Principal:</h4>
              <p className="font-mono text-sm">Esfuerzo = A × Tamaño^E × ∏EM</p>
              <p className="font-mono text-sm">E = B + 0.01 × ∑SF</p>
              <p className="font-mono text-sm">Tiempo = C × Esfuerzo^F × SCED%</p>
              <p className="text-sm text-gray-600 mt-2">
                Donde A=2.94, B=0.91, C=3.67, F=0.28+0.2×(E-B), ∏EM es el producto de multiplicadores de esfuerzo, y ∑SF
                es la suma de factores de escala
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Factores de Escala */}
        <Card>
          <CardHeader>
            <CardTitle>Factores de Escala</CardTitle>
            <CardDescription>5 factores que determinan el exponente de escala del proyecto</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Factor</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Rango</TableHead>
                  <TableHead>Impacto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">PREC</TableCell>
                  <TableCell>Precedentedness - Familiaridad con el tipo de proyecto</TableCell>
                  <TableCell>0.0 - 6.2</TableCell>
                  <TableCell>Experiencia previa similar</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FLEX</TableCell>
                  <TableCell>Development Flexibility - Flexibilidad en el desarrollo</TableCell>
                  <TableCell>0.0 - 5.07</TableCell>
                  <TableCell>Rigidez de requisitos y procesos</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">RESL</TableCell>
                  <TableCell>Architecture/Risk Resolution - Resolución de riesgos</TableCell>
                  <TableCell>0.0 - 7.07</TableCell>
                  <TableCell>Análisis de riesgos y arquitectura</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">TEAM</TableCell>
                  <TableCell>Team Cohesion - Cohesión del equipo</TableCell>
                  <TableCell>0.0 - 5.48</TableCell>
                  <TableCell>Colaboración y comunicación</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">PMAT</TableCell>
                  <TableCell>Process Maturity - Madurez del proceso</TableCell>
                  <TableCell>0.0 - 7.80</TableCell>
                  <TableCell>Nivel de madurez CMM/CMMI</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-4 space-y-3">
              <h4 className="font-semibold">Descripción Detallada:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p>
                    <strong>PREC:</strong> Refleja la experiencia previa de la organización con este tipo de proyecto.
                    Valores bajos indican alta familiaridad.
                  </p>
                  <p>
                    <strong>FLEX:</strong> Grado de flexibilidad en el proceso de desarrollo. Valores bajos indican alta
                    flexibilidad.
                  </p>
                  <p>
                    <strong>RESL:</strong> Extensión del análisis de riesgos realizado. Valores bajos indican análisis
                    exhaustivo.
                  </p>
                </div>
                <div>
                  <p>
                    <strong>TEAM:</strong> Nivel de cohesión del equipo de desarrollo. Valores bajos indican alta
                    cohesión.
                  </p>
                  <p>
                    <strong>PMAT:</strong> Madurez del proceso de desarrollo según CMM/CMMI. Valores bajos indican alta
                    madurez.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Multiplicadores de Esfuerzo */}
        <Card>
          <CardHeader>
            <CardTitle>Multiplicadores de Esfuerzo</CardTitle>
            <CardDescription>17 factores organizados en 4 categorías</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="product">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="product">Producto</TabsTrigger>
                <TabsTrigger value="platform">Plataforma</TabsTrigger>
                <TabsTrigger value="personnel">Personal</TabsTrigger>
                <TabsTrigger value="project">Proyecto</TabsTrigger>
              </TabsList>

              <TabsContent value="product">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Rango</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">RELY</TableCell>
                      <TableCell>Required Software Reliability</TableCell>
                      <TableCell>0.82 - 1.26</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DATA</TableCell>
                      <TableCell>Database Size</TableCell>
                      <TableCell>0.90 - 1.28</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CPLX</TableCell>
                      <TableCell>Product Complexity</TableCell>
                      <TableCell>0.73 - 1.74</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">RUSE</TableCell>
                      <TableCell>Required Reusability</TableCell>
                      <TableCell>0.95 - 1.24</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DOCU</TableCell>
                      <TableCell>Documentation Match to Life-Cycle Needs</TableCell>
                      <TableCell>0.81 - 1.23</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>RELY:</strong> Impacto de fallos del software en la misión.
                  </p>
                  <p>
                    <strong>DATA:</strong> Tamaño de la base de datos de prueba relativo al programa.
                  </p>
                  <p>
                    <strong>CPLX:</strong> Complejidad del producto en términos de estructuras de control, operaciones,
                    etc.
                  </p>
                  <p>
                    <strong>RUSE:</strong> Grado de reutilización requerida para el software.
                  </p>
                  <p>
                    <strong>DOCU:</strong> Adecuación de la documentación del proyecto a las necesidades del ciclo de
                    vida.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="platform">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Rango</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">TIME</TableCell>
                      <TableCell>Execution Time Constraint</TableCell>
                      <TableCell>1.00 - 1.63</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">STOR</TableCell>
                      <TableCell>Main Storage Constraint</TableCell>
                      <TableCell>1.00 - 1.46</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PVOL</TableCell>
                      <TableCell>Platform Volatility</TableCell>
                      <TableCell>0.87 - 1.30</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>TIME:</strong> Grado de restricción de tiempo de ejecución impuesta al software.
                  </p>
                  <p>
                    <strong>STOR:</strong> Grado de restricción de almacenamiento principal impuesta al software.
                  </p>
                  <p>
                    <strong>PVOL:</strong> Frecuencia de cambios en la plataforma de desarrollo (hardware/software).
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="personnel">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Rango</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">ACAP</TableCell>
                      <TableCell>Analyst Capability</TableCell>
                      <TableCell>0.71 - 1.42</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PCAP</TableCell>
                      <TableCell>Programmer Capability</TableCell>
                      <TableCell>0.76 - 1.34</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PCON</TableCell>
                      <TableCell>Personnel Continuity</TableCell>
                      <TableCell>0.81 - 1.29</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">APEX</TableCell>
                      <TableCell>Applications Experience</TableCell>
                      <TableCell>0.81 - 1.22</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PLEX</TableCell>
                      <TableCell>Platform Experience</TableCell>
                      <TableCell>0.85 - 1.19</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">LTEX</TableCell>
                      <TableCell>Language and Tool Experience</TableCell>
                      <TableCell>0.84 - 1.20</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>ACAP:</strong> Capacidad de análisis y diseño del equipo.
                  </p>
                  <p>
                    <strong>PCAP:</strong> Capacidad de programación del equipo.
                  </p>
                  <p>
                    <strong>PCON:</strong> Rotación anual del personal del proyecto.
                  </p>
                  <p>
                    <strong>APEX:</strong> Experiencia del equipo en aplicaciones similares.
                  </p>
                  <p>
                    <strong>PLEX:</strong> Experiencia del equipo en la plataforma objetivo.
                  </p>
                  <p>
                    <strong>LTEX:</strong> Experiencia del equipo en lenguajes y herramientas.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="project">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Rango</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">TOOL</TableCell>
                      <TableCell>Use of Software Tools</TableCell>
                      <TableCell>0.78 - 1.17</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SITE</TableCell>
                      <TableCell>Multisite Development</TableCell>
                      <TableCell>0.80 - 1.22</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SCED</TableCell>
                      <TableCell>Required Development Schedule</TableCell>
                      <TableCell>1.00 - 1.43</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>TOOL:</strong> Nivel de uso de herramientas de desarrollo de software.
                  </p>
                  <p>
                    <strong>SITE:</strong> Grado de distribución geográfica del equipo de desarrollo.
                  </p>
                  <p>
                    <strong>SCED:</strong> Restricción de cronograma impuesta al proyecto (también afecta el tiempo de
                    desarrollo).
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Diferencias con COCOMO-81 */}
        <Card>
          <CardHeader>
            <CardTitle>Diferencias Principales con COCOMO-81</CardTitle>
            <CardDescription>Mejoras y actualizaciones del modelo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">Mejoras en COCOMO II:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Factores de escala para mejor precisión</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Soporte para puntos de función</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Nuevos multiplicadores (RUSE, DOCU, PCON, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Mejor manejo de reutilización</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Adaptado a prácticas modernas</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Cuándo usar COCOMO II:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Proyectos con metodologías modernas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Desarrollo orientado a objetos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Proyectos con reutilización significativa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Equipos distribuidos geográficamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Cuando se tienen puntos de función</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guía de Uso */}
        <Card>
          <CardHeader>
            <CardTitle>Guía de Uso Avanzada</CardTitle>
            <CardDescription>Mejores prácticas para COCOMO II</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Proceso Recomendado:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Definir la arquitectura del sistema</li>
                <li>Estimar el tamaño (KLOC o puntos de función)</li>
                <li>Evaluar los 5 factores de escala</li>
                <li>Evaluar los 17 multiplicadores de esfuerzo</li>
                <li>Calcular y revisar resultados</li>
                <li>Calibrar con datos históricos</li>
                <li>Documentar suposiciones y limitaciones</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-700">Ventajas:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-600">
                  <li>Mayor precisión que COCOMO-81</li>
                  <li>Mejor para proyectos modernos</li>
                  <li>Considera factores de escala</li>
                  <li>Soporte para reutilización</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-orange-700">Consideraciones:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-orange-600">
                  <li>Requiere más experiencia para evaluar</li>
                  <li>Más complejo que COCOMO-81</li>
                  <li>Necesita calibración local</li>
                  <li>Mejor después de la fase de arquitectura</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/cocomo-ii">
            <Button size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Ir al Estimador COCOMO II
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
