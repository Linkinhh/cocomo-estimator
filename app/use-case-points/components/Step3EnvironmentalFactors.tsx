"use client"

import { useUseCasePoints } from '../context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { EnvironmentalFactors } from '../types';

const environmentalFactorData = [
  { id: 'f1', description: 'Familiaridad con el modelo de proyecto utilizado', weight: 1.5 },
  { id: 'f2', description: 'Experiencia en la aplicación', weight: 0.5 },
  { id: 'f3', description: 'Experiencia en orientación a objetos', weight: 1 },
  { id: 'f4', description: 'Capacidad del analista principal', weight: 0.5 },
  { id: 'f5', description: 'Motivación', weight: 1 },
  { id: 'f6', description: 'Estabilidad de los requisitos', weight: 2 },
  { id: 'f7', description: 'Personal a tiempo parcial', weight: -1 },
  { id: 'f8', description: 'Dificultad del lenguaje de programación', weight: -1 },
];

const actorFactors = { simple: 1, medium: 2, complex: 3 };
const useCaseFactors = { simple: 5, medium: 10, complex: 15 };
const technicalFactorData = [
  { id: 't1', weight: 2 }, { id: 't2', weight: 1 }, { id: 't3', weight: 1 },
  { id: 't4', weight: 1 }, { id: 't5', weight: 1 }, { id: 't6', weight: 0.5 },
  { id: 't7', weight: 0.5 }, { id: 't8', weight: 2 }, { id: 't9', weight: 1 },
  { id: 't10', weight: 1 }, { id: 't11', weight: 1 }, { id: 't12', weight: 1 },
  { id: 't13', weight: 1 },
];

export default function Step3EnvironmentalFactors() {
  const { state, updateState, nextStep, prevStep } = useUseCasePoints();

  const handleSliderChange = (id: keyof EnvironmentalFactors, value: number[]) => {
    updateState({ environmentalFactors: { ...state.environmentalFactors, [id]: value[0] } });
  };

  // Recalculate previous steps for context
  const pa = (state.actors.simple * actorFactors.simple) + (state.actors.medium * actorFactors.medium) + (state.actors.complex * actorFactors.complex);
  const pcu = (state.useCases.simple * useCaseFactors.simple) + (state.useCases.medium * useCaseFactors.medium) + (state.useCases.complex * useCaseFactors.complex);
  const pcusa = pa + pcu;
  const fct = technicalFactorData.reduce((acc, factor) => acc + (state.technicalFactors[factor.id] * factor.weight), 0);
  const tcf = 0.6 + (0.01 * fct);

  // Calculations for this step
  const fa = environmentalFactorData.reduce((acc, factor) => acc + (state.environmentalFactors[factor.id] * factor.weight), 0);
  const ef = 1.4 + (-0.03 * fa);
  const pcua = pcusa * tcf * ef;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Factor Ambiental (FA)</CardTitle>
          <CardDescription>Evalúe cada factor ambiental en una escala de 0 (muy bajo) a 5 (muy alto).</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Factor Ambiental</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead className="w-1/4">Valoración</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {environmentalFactorData.map((factor) => (
                <TableRow key={factor.id}>
                  <TableCell>
                    <p className="font-medium">{factor.id.toUpperCase()}</p>
                    <p className="text-sm text-gray-500">{factor.description}</p>
                  </TableCell>
                  <TableCell>{factor.weight}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Slider
                        min={0}
                        max={5}
                        step={1}
                        value={[state.environmentalFactors[factor.id]]}
                        onValueChange={(value) => handleSliderChange(factor.id as keyof EnvironmentalFactors, value)}
                      />
                      <span className="font-bold w-4 text-center">{state.environmentalFactors[factor.id]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{(state.environmentalFactors[factor.id] * factor.weight).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-right font-bold mt-4 text-lg">Total FA: {fa.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Puntos de Caso de Uso Ajustados (PCUA)</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-gray-500">Environmental Factor (EF)</p>
            <p className="text-2xl font-bold text-blue-600">{ef.toFixed(4)}</p>
            <p className="text-xs text-gray-500">EF = 1.4 + (-0.03 * FA) = 1.4 + (-0.03 * {fa.toFixed(2)})</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Puntos de Caso de Uso Ajustados (PCUA)</p>
            <p className="text-4xl font-bold text-blue-600">{pcua.toFixed(2)}</p>
            <p className="text-xs text-gray-500">PCUA = PCUSA * TCF * EF = {pcusa} * {tcf.toFixed(4)} * {ef.toFixed(4)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Anterior</Button>
        <Button onClick={nextStep}>Siguiente</Button>
      </div>
    </div>
  );
}
