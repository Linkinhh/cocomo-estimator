"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Estimador COCOMO</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramienta para estimar el esfuerzo, tiempo y costo de desarrollo de software utilizando los modelos COCOMO
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* COCOMO-81 Intermedio */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">COCOMO-81 Intermedio</CardTitle>
              <CardDescription className="text-base">
                Modelo clásico de estimación con 15 multiplicadores de esfuerzo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Basado en líneas de código (KLOC)</p>
                <p>• 15 multiplicadores de esfuerzo</p>
                <p>• 3 tipos de proyecto: Orgánico, Semi-acoplado, Empotrado</p>
                <p>• Ideal para proyectos tradicionales</p>
              </div>
              <div className="flex gap-2">
                <Link href="/cocomo-81" className="flex-1">
                  <Button className="w-full">
                    Usar COCOMO-81
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/cocomo-81/docs">
                  <Button variant="outline" size="icon">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* COCOMO II Post-Arquitectura */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Calculator className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">COCOMO II Post-Arquitectura</CardTitle>
              <CardDescription className="text-base">
                Modelo moderno con factores de escala y multiplicadores actualizados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Basado en puntos de función o KLOC</p>
                <p>• 5 factores de escala</p>
                <p>• 17 multiplicadores de esfuerzo</p>
                <p>• Ideal para proyectos modernos y ágiles</p>
              </div>
              <div className="flex gap-2">
                <Link href="/" className="flex-1">
                  <Button className="w-full">
                    Usar COCOMO II
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="icon">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-white/50 backdrop-blur">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">¿Qué modelo elegir?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>COCOMO-81:</strong> Mejor para proyectos tradicionales con metodologías en cascada y cuando se
                  tiene experiencia histórica con líneas de código.
                </div>
                <div>
                  <strong>COCOMO II:</strong> Mejor para proyectos modernos, metodologías ágiles, reutilización de
                  código y cuando se trabaja con puntos de función.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
