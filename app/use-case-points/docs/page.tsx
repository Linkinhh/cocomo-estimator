"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calculator } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function UseCasePointsDocsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/use-case-points">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Documentación Puntos de Casos de Uso (UCP)</h1>
      </div>

      <div className="space-y-8">
        {/* Introducción */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Introducción al Modelo de Puntos de Casos de Uso
            </CardTitle>
            <CardDescription>Un método de estimación basado en los requisitos funcionales del sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              El método de Puntos de Casos de Uso (UCP) fue propuesto por Gustav Karner en 1993 como una adaptación del modelo de Puntos de Función. Su objetivo es estimar el tamaño y esfuerzo de un proyecto de software basándose en los casos de uso, que describen la funcionalidad del sistema desde la perspectiva del usuario.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Fórmulas Principales:</h4>
              <p className="font-mono text-sm">PCUSA = PA + PCU</p>
              <p className="font-mono text-sm">TCF = 0.6 + (0.01 * FCT)</p>
              <p className="font-mono text-sm">EF = 1.4 + (-0.03 * FA)</p>
              <p className="font-mono text-sm">PCUA = PCUSA * TCF * EF</p>
              <p className="font-mono text-sm">Esfuerzo (Horas-Persona) = PCUA * Factor de Productividad</p>
            </div>
          </CardContent>
        </Card>

        {/* Paso 1: Actores y Casos de Uso */}
        <Card>
          <CardHeader>
            <CardTitle>Cálculo de Puntos de Caso de Uso sin Ajustar (PCUSA)</CardTitle>
            <CardDescription>El PCUSA se calcula sumando los pesos de los actores (PA) y los casos de uso (PCU).</CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold mb-2">Tabla de Pesos de Actores (PA)</h4>
            <Table className="mb-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Actor</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Peso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Simple</TableCell>
                  <TableCell>Otro sistema que se comunica a través de una API.</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Medio</TableCell>
                  <TableCell>Otro sistema que interactúa a través de un protocolo (ej. TCP/IP) o CLI.</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Complejo</TableCell>
                  <TableCell>Una persona interactuando a través de una interfaz gráfica (GUI).</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <h4 className="font-semibold mb-2">Tabla de Pesos de Casos de Uso (PCU)</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Caso de Uso</TableHead>
                  <TableHead>Descripción (basado en transacciones)</TableHead>
                  <TableHead>Peso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Simple</TableCell>
                  <TableCell>3 o menos transacciones.</TableCell>
                  <TableCell>5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Medio</TableCell>
                  <TableCell>4 a 7 transacciones.</TableCell>
                  <TableCell>10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Complejo</TableCell>
                  <TableCell>Más de 7 transacciones.</TableCell>
                  <TableCell>15</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Paso 2: Factores de Complejidad Técnica */}
        <Card>
          <CardHeader>
            <CardTitle>Factor de Complejidad Técnica (FCT)</CardTitle>
            <CardDescription>Se evalúan 13 factores técnicos en una escala de 0 (no aplicable) a 5 (muy importante).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Factor Técnico</TableHead>
                  <TableHead>Peso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[ 
                  { id: 'T1', description: 'Sistema distribuido', weight: 2 },
                  { id: 'T2', description: 'Rendimiento', weight: 1 },
                  { id: 'T3', description: 'Eficiencia del usuario final', weight: 1 },
                  { id: 'T4', description: 'Complejidad de procesamiento interno', weight: 1 },
                  { id: 'T5', description: 'Reutilización de código', weight: 1 },
                  { id: 'T6', description: 'Fácil de instalar', weight: 0.5 },
                  { id: 'T7', description: 'Fácil de usar', weight: 0.5 },
                  { id: 'T8', description: 'Portabilidad', weight: 2 },
                  { id: 'T9', description: 'Fácil de cambiar', weight: 1 },
                  { id: 'T10', description: 'Concurrencia', weight: 1 },
                  { id: 'T11', description: 'Características especiales de seguridad', weight: 1 },
                  { id: 'T12', description: 'Proporciona acceso a terceros', weight: 1 },
                  { id: 'T13', description: 'Requiere formación especial para los usuarios', weight: 1 },
                ].map(factor => (
                  <TableRow key={factor.id}>
                    <TableCell className="font-medium">{factor.id}</TableCell>
                    <TableCell>{factor.description}</TableCell>
                    <TableCell>{factor.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Paso 3: Factores Ambientales */}
        <Card>
          <CardHeader>
            <CardTitle>Factor Ambiental (FA)</CardTitle>
            <CardDescription>Se evalúan 8 factores ambientales en una escala de 0 (no aplicable) a 5 (muy importante).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Factor Ambiental</TableHead>
                  <TableHead>Peso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[ 
                  { id: 'F1', description: 'Familiaridad con el modelo de proyecto', weight: 1.5 },
                  { id: 'F2', description: 'Experiencia en la aplicación', weight: 0.5 },
                  { id: 'F3', description: 'Experiencia en orientación a objetos', weight: 1 },
                  { id: 'F4', description: 'Capacidad del analista principal', weight: 0.5 },
                  { id: 'F5', description: 'Motivación', weight: 1 },
                  { id: 'F6', description: 'Requisitos estables', weight: 2 },
                  { id: 'F7', description: 'Personal a tiempo parcial', weight: -1 },
                  { id: 'F8', description: 'Dificultad del lenguaje de programación', weight: -1 },
                ].map(factor => (
                  <TableRow key={factor.id}>
                    <TableCell className="font-medium">{factor.id}</TableCell>
                    <TableCell>{factor.description}</TableCell>
                    <TableCell>{factor.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Paso 4: Resultados */}
        <Card>
          <CardHeader>
            <CardTitle>Estimación Final</CardTitle>
            <CardDescription>El esfuerzo se calcula multiplicando los PCUA por un factor de productividad.</CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold mb-2">Factor de Productividad (FP)</h4>
            <p className="text-gray-700 mb-4">
              El factor de productividad determina cuántas horas-persona se requieren para implementar un PCUA. Depende de la calidad de los factores ambientales (FA).
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Condición</TableHead>
                  <TableHead>Factor de Productividad (Horas/PCUA)</TableHead>
                  <TableHead>Descripción del Proyecto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Si la suma de factores F1-F6 es &lt; 3</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>Proyecto con factores ambientales favorables.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Si la suma de factores F1-F6 está entre 3 y 4</TableCell>
                  <TableCell>28</TableCell>
                  <TableCell>Proyecto con factores ambientales promedio.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Si la suma de factores F1-F6 es &gt; 4</TableCell>
                  <TableCell>36</TableCell>
                  <TableCell>Proyecto con factores ambientales desfavorables (alto riesgo).</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-gray-600 mt-4">
              Nota: Los factores F7 y F8 (personal a tiempo parcial y dificultad del lenguaje) también influyen en el FA total, y un valor alto en estos factores puede aumentar el riesgo y el esfuerzo.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
