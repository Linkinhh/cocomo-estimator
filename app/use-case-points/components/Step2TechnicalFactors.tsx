"use client"

import { useUseCasePoints } from '../context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { TechnicalFactors } from '../types';

const technicalFactorData = [
  { id: 't1', description: 'T1 - Sistema distribuido', weight: 2 },
  { id: 't2', description: 'T2 - Rendimiento', weight: 1 },
  { id: 't3', description: 'T3 - Eficiencia del usuario final', weight: 1 },
  { id: 't4', description: 'T4 - Complejidad de procesamiento interno', weight: 1 },
  { id: 't5', description: 'T5 - Reutilización de código', weight: 1 },
  { id: 't6', description: 'T6 - Fácil de instalar', weight: 0.5 },
  { id: 't7', description: 'T7 - Fácil de usar', weight: 0.5 },
  { id: 't8', description: 'T8 - Portabilidad', weight: 2 },
  { id: 't9', description: 'T9 - Fácil de cambiar', weight: 1 },
  { id: 't10', description: 'T10 - Concurrencia', weight: 1 },
  { id: 't11', description: 'T11 - Características especiales de seguridad', weight: 1 },
  { id: 't12', description: 'T12 - Proporciona acceso a terceros', weight: 1 },
  { id: 't13', description: 'T13 - Requiere formación especial para los usuarios', weight: 1 },
];

export default function Step2TechnicalFactors() {
  const { state, updateState, nextStep, prevStep } = useUseCasePoints();

  const handleSliderChange = (id: keyof TechnicalFactors, value: number[]) => {
    updateState({ technicalFactors: { ...state.technicalFactors, [id]: value[0] } });
  };

  const calculateFCT = () => {
    return technicalFactorData.reduce((acc, factor) => {
      return acc + (state.technicalFactors[factor.id] * factor.weight);
    }, 0);
  };

  const fct = calculateFCT();
  const tcf = 0.6 + (0.01 * fct);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Factor de Complejidad Técnica (FCT)</CardTitle>
          <CardDescription>Evalúe cada factor técnico en una escala de 0 (no aplicable) a 5 (muy importante).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Factor Técnico</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead className="w-1/4">Valoración</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {technicalFactorData.slice(0, 7).map((factor) => (
                    <TableRow key={factor.id}>
                      <TableCell>
                        <p className="text-sm text-gray-600">{factor.description}</p>
                      </TableCell>
                      <TableCell>{factor.weight}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Slider
                            min={0}
                            max={5}
                            step={1}
                            value={[state.technicalFactors[factor.id]]}
                            onValueChange={(value) => handleSliderChange(factor.id as keyof TechnicalFactors, value)}
                          />
                          <span className="font-bold w-4 text-center">{state.technicalFactors[factor.id]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{(state.technicalFactors[factor.id] * factor.weight).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Factor Técnico</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead className="w-1/4">Valoración</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {technicalFactorData.slice(7).map((factor) => (
                    <TableRow key={factor.id}>
                      <TableCell>
                        <p className="text-sm text-gray-600">{factor.description}</p>
                      </TableCell>
                      <TableCell>{factor.weight}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Slider
                            min={0}
                            max={5}
                            step={1}
                            value={[state.technicalFactors[factor.id]]}
                            onValueChange={(value) => handleSliderChange(factor.id as keyof TechnicalFactors, value)}
                          />
                          <span className="font-bold w-4 text-center">{state.technicalFactors[factor.id]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{(state.technicalFactors[factor.id] * factor.weight).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="text-right font-bold mt-4 text-lg">Total FCT: {fct.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Technical Complexity Factor (TCF)</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-bold text-blue-600">{tcf.toFixed(4)}</p>
          <p className="text-gray-600">TCF = 0.6 + (0.01 * FCT) = 0.6 + (0.01 * {fct.toFixed(2)})</p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Anterior</Button>
        <Button onClick={nextStep}>Siguiente</Button>
      </div>
    </div>
  );
}
