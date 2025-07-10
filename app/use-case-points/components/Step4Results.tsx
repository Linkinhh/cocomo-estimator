"use client"

import { useUseCasePoints } from '../context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Data needed for recalculations
const actorFactors = { simple: 1, medium: 2, complex: 3 };
const useCaseFactors = { simple: 5, medium: 10, complex: 15 };
const technicalFactorData = [
  { id: 't1', weight: 2 }, { id: 't2', weight: 1 }, { id: 't3', weight: 1 },
  { id: 't4', weight: 1 }, { id: 't5', weight: 1 }, { id: 't6', weight: 0.5 },
  { id: 't7', weight: 0.5 }, { id: 't8', weight: 2 }, { id: 't9', weight: 1 },
  { id: 't10', weight: 1 }, { id: 't11', weight: 1 }, { id: 't12', weight: 1 },
  { id: 't13', weight: 1 },
];
const environmentalFactorData = [
  { id: 'f1', weight: 1.5 }, { id: 'f2', weight: 0.5 }, { id: 'f3', weight: 1 },
  { id: 'f4', weight: 0.5 }, { id: 'f5', weight: 1 }, { id: 'f6', weight: 2 },
  { id: 'f7', weight: -1 }, { id: 'f8', weight: -1 },
];

export default function Step4Results() {
  const { state, updateState, prevStep, goToStep } = useUseCasePoints();

  // Recalculate all values to ensure context is current
  const pa = (state.actors.simple * actorFactors.simple) + (state.actors.medium * actorFactors.medium) + (state.actors.complex * actorFactors.complex);
  const pcu = (state.useCases.simple * useCaseFactors.simple) + (state.useCases.medium * useCaseFactors.medium) + (state.useCases.complex * useCaseFactors.complex);
  const pcusa = pa + pcu;
  const fct = technicalFactorData.reduce((acc, factor) => acc + (state.technicalFactors[factor.id] * factor.weight), 0);
  const tcf = 0.6 + (0.01 * fct);
  const fa = environmentalFactorData.reduce((acc, factor) => acc + (state.environmentalFactors[factor.id] * factor.weight), 0);
  const ef = 1.4 + (-0.03 * fa);
  const pcua = pcusa * tcf * ef;

  // Step 7: Effort Calculation
  // X: Count F1-F6 factors that are < 3
  const xCount = Object.keys(state.environmentalFactors)
    .filter(key => {
      const factorNum = parseInt(key.substring(1));
      return key.startsWith('f') && factorNum >= 1 && factorNum <= 6;
    })
    .filter(key => state.environmentalFactors[key] < 3)
    .length;

  // Y: Count F7-F8 factors that are > 3
  const yCount = Object.keys(state.environmentalFactors)
    .filter(key => {
      const factorNum = parseInt(key.substring(1));
      return key.startsWith('f') && factorNum >= 7 && factorNum <= 8;
    })
    .filter(key => state.environmentalFactors[key] > 3)
    .length;

  const totalRiskFactors = xCount + yCount;

  let productivityFactor: number | null = null;
  let riskMessage: string | null = null;
  let effort: number | null = null;
  let totalCost: number | null = null;

  if (totalRiskFactors <= 2) {
    productivityFactor = 20;
  } else if (totalRiskFactors === 3 || totalRiskFactors === 4) {
    productivityFactor = 28;
  } else {
    // X + Y >= 5: No calcular esfuerzo, solo mostrar advertencia
    riskMessage = 'El proyecto presenta alto riesgo de fracaso. Se recomienda hacer cambios para reducir los factores de riesgo antes de proceder. No se puede calcular el esfuerzo hasta reducir los factores de riesgo.';
  }

  if (productivityFactor !== null) {
    effort = pcua * productivityFactor;
    totalCost = (effort / 160) * state.personnelCost; // Assuming 160 hours/month
  }

  const handleReset = () => {
    // This will reset the state by navigating to step 1 and reloading the page
    // A more sophisticated reset could be implemented in the context
    goToStep(1);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle>Estimación de Esfuerzo</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {effort !== null ? (
              <>
                <p className="text-5xl font-bold text-green-600">{effort.toFixed(2)}</p>
                <p className="text-gray-600">Horas-Persona</p>
                <p className="text-xs text-gray-500 mt-2">PCUA ({pcua.toFixed(2)}) * Factor Productividad ({productivityFactor})</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-red-600">No Calculable</p>
                <p className="text-red-600">Reducir factores de riesgo</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="bg-indigo-50 border-indigo-200">
          <CardHeader>
            <CardTitle>Estimación de Costo</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {totalCost !== null ? (
              <>
                <p className="text-5xl font-bold text-indigo-600">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-gray-600">Costo Total del Proyecto</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-red-600">No Calculable</p>
                <p className="text-red-600">Reducir factores de riesgo</p>
              </>
            )}
            <div className="flex items-center justify-center gap-2 mt-2">
              <Label htmlFor="personnelCost" className="text-xs text-gray-500">Costo/Mes:</Label>
              {totalCost !== null && (
                <Input
                  id="personnelCost"
                  type="number"
                  min="1000"
                  value={state.personnelCost}
                  onChange={(e) => updateState({ personnelCost: Number.parseInt(e.target.value) || 5000 })}
                  className="w-24 h-6 text-xs"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {riskMessage && (
        <Alert variant="destructive">
          <AlertTitle>¡Advertencia de Riesgo!</AlertTitle>
          <AlertDescription>{riskMessage}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Resumen de la Estimación</CardTitle>
          <CardDescription>Un desglose completo de todos los factores y cálculos.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Puntos de Caso de Uso</h3>
              <p>PA: {pa}</p>
              <p>PCU: {pcu}</p>
              <p className="font-bold">PCUSA: {pcusa}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Factores de Complejidad</h3>
              <p>FCT: {fct.toFixed(2)}</p>
              <p>TCF: {tcf.toFixed(4)}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Factores Ambientales</h3>
              <p>FA: {fa.toFixed(2)}</p>
              <p>EF: {ef.toFixed(4)}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Resultado Final</h3>
              <p className="font-bold">PCUA: {pcua.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Anterior</Button>
        <Button variant="destructive" onClick={handleReset}>Reiniciar</Button>
      </div>
    </div>
  );
}
