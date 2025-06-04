"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calculator } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function Cocomo81DocsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cocomo-81">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Documentación COCOMO-81 Intermedio</h1>
      </div>

      <div className="space-y-8">
        {/* Introducción */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Introducción al Modelo COCOMO-81
            </CardTitle>
            <CardDescription>Constructive Cost Model - Versión 1981</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              COCOMO-81 es un modelo algorítmico de estimación de costos de software desarrollado por Barry Boehm en
              1981. El modelo intermedio incluye 15 multiplicadores de esfuerzo que ajustan la estimación básica según
              las características específicas del proyecto.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Ecuación Principal:</h4>
              <p className="font-mono text-sm">Esfuerzo = a × (KLOC)^b × EAF</p>
              <p className="font-mono text-sm">Tiempo = c × (Esfuerzo)^d</p>
              <p className="text-sm text-gray-600 mt-2">
                Donde EAF es el producto de todos los multiplicadores de esfuerzo
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Proyecto */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Proyecto</CardTitle>
            <CardDescription>Clasificación según la complejidad y restricciones</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Coeficiente a</TableHead>
                  <TableHead>Exponente b</TableHead>
                  <TableHead>Coeficiente c</TableHead>
                  <TableHead>Descripción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Orgánico</TableCell>
                  <TableCell>2.4</TableCell>
                  <TableCell>1.05</TableCell>
                  <TableCell>0.38</TableCell>
                  <TableCell>Equipos pequeños, experiencia en aplicaciones similares, requisitos flexibles</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Semi-acoplado</TableCell>
                  <TableCell>3.0</TableCell>
                  <TableCell>1.12</TableCell>
                  <TableCell>0.35</TableCell>
                  <TableCell>Equipos medianos, experiencia mixta, requisitos moderadamente rígidos</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Empotrado</TableCell>
                  <TableCell>3.6</TableCell>
                  <TableCell>1.20</TableCell>
                  <TableCell>0.32</TableCell>
                  <TableCell>Proyectos con fuertes restricciones de hardware, software y operacionales</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Multiplicadores de Esfuerzo */}
        <Card>
          <CardHeader>
            <CardTitle>Multiplicadores de Esfuerzo (EAF)</CardTitle>
            <CardDescription>15 factores que ajustan la estimación básica</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="product">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="product">Atributos del Producto</TabsTrigger>
                <TabsTrigger value="hardware">Atributos de Hardware</TabsTrigger>
                <TabsTrigger value="personnel">Atributos del Personal</TabsTrigger>
              </TabsList>

              <TabsContent value="product">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Rango de Valores</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">RELY</TableCell>
                      <TableCell>Fiabilidad requerida del software</TableCell>
                      <TableCell>0.75 - 1.40</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DATA</TableCell>
                      <TableCell>Tamaño de la base de datos</TableCell>
                      <TableCell>0.94 - 1.16</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CPLX</TableCell>
                      <TableCell>Complejidad del producto</TableCell>
                      <TableCell>0.70 - 1.65</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>RELY:</strong> Mide el impacto de fallos del software. Valores altos para sistemas críticos.
                  </p>
                  <p>
                    <strong>DATA:</strong> Relación entre el tamaño de la base de datos y el programa. D/P donde D es
                    bytes de datos y P es SLOC.
                  </p>
                  <p>
                    <strong>CPLX:</strong> Evaluación subjetiva de la complejidad del producto basada en estructuras de
                    control, operaciones computacionales, etc.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="hardware">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Rango de Valores</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">TIME</TableCell>
                      <TableCell>Restricciones de tiempo de ejecución</TableCell>
                      <TableCell>1.00 - 1.66</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">STOR</TableCell>
                      <TableCell>Restricciones de almacenamiento principal</TableCell>
                      <TableCell>1.00 - 1.56</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">VIRT</TableCell>
                      <TableCell>Volatilidad de la máquina virtual</TableCell>
                      <TableCell>0.87 - 1.30</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TURN</TableCell>
                      <TableCell>Tiempo de respuesta requerido</TableCell>
                      <TableCell>0.87 - 1.15</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>TIME:</strong> Porcentaje de tiempo de CPU disponible usado por el software.
                  </p>
                  <p>
                    <strong>STOR:</strong> Porcentaje de memoria disponible usado por el software.
                  </p>
                  <p>
                    <strong>VIRT:</strong> Frecuencia de cambios en el entorno de desarrollo (hardware/software).
                  </p>
                  <p>
                    <strong>TURN:</strong> Tiempo entre envío de trabajo y recepción de resultados.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="personnel">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Rango de Valores</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">ACAP</TableCell>
                      <TableCell>Capacidad del analista</TableCell>
                      <TableCell>0.71 - 1.46</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AEXP</TableCell>
                      <TableCell>Experiencia en aplicaciones</TableCell>
                      <TableCell>0.82 - 1.29</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PCAP</TableCell>
                      <TableCell>Capacidad del programador</TableCell>
                      <TableCell>0.70 - 1.42</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">VEXP</TableCell>
                      <TableCell>Experiencia en la máquina virtual</TableCell>
                      <TableCell>0.90 - 1.21</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">LEXP</TableCell>
                      <TableCell>Experiencia en el lenguaje de programación</TableCell>
                      <TableCell>0.95 - 1.14</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">MODP</TableCell>
                      <TableCell>Uso de prácticas modernas de programación</TableCell>
                      <TableCell>0.82 - 1.24</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TOOL</TableCell>
                      <TableCell>Uso de herramientas de software</TableCell>
                      <TableCell>0.83 - 1.24</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SCED</TableCell>
                      <TableCell>Cronograma requerido de desarrollo</TableCell>
                      <TableCell>1.04 - 1.23</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>ACAP:</strong> Capacidad de análisis y diseño, eficiencia y comunicación.
                  </p>
                  <p>
                    <strong>AEXP:</strong> Experiencia del equipo en aplicaciones similares.
                  </p>
                  <p>
                    <strong>PCAP:</strong> Capacidad de programación, eficiencia y comunicación.
                  </p>
                  <p>
                    <strong>VEXP:</strong> Experiencia en el sistema operativo y hardware objetivo.
                  </p>
                  <p>
                    <strong>LEXP:</strong> Experiencia en el lenguaje de programación a usar.
                  </p>
                  <p>
                    <strong>MODP:</strong> Uso de técnicas como programación estructurada, revisiones de diseño, etc.
                  </p>
                  <p>
                    <strong>TOOL:</strong> Uso de herramientas de desarrollo como compiladores, depuradores, etc.
                  </p>
                  <p>
                    <strong>SCED:</strong> Restricciones de cronograma impuestas al proyecto.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Guía de Uso */}
        <Card>
          <CardHeader>
            <CardTitle>Guía de Uso</CardTitle>
            <CardDescription>Cómo utilizar efectivamente el estimador COCOMO-81</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Pasos para una estimación precisa:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Determine el tamaño del proyecto en KLOC</li>
                  <li>Clasifique el tipo de proyecto</li>
                  <li>Evalúe cada multiplicador de esfuerzo</li>
                  <li>Revise y ajuste los resultados</li>
                  <li>Documente las suposiciones</li>
                </ol>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Mejores prácticas:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Use datos históricos cuando sea posible</li>
                  <li>Involucre al equipo en la evaluación</li>
                  <li>Considere múltiples escenarios</li>
                  <li>Actualice estimaciones regularmente</li>
                  <li>Calibre con proyectos completados</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">⚠️ Limitaciones del Modelo:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Basado en datos de proyectos de los años 70-80</li>
                <li>No considera metodologías ágiles modernas</li>
                <li>Puede no ser preciso para proyectos muy pequeños (&lt;2 KLOC) o muy grandes (&gt;1000 KLOC)</li>
                <li>Requiere experiencia para evaluar correctamente los multiplicadores</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/cocomo-81">
            <Button size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Ir al Estimador COCOMO-81
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
