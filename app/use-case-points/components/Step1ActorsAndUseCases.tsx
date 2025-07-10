"use client"

import { useUseCasePoints } from '../context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActorCounts, UseCaseCounts } from '../types';

const actorFactors = { simple: 1, medium: 2, complex: 3 };
const useCaseFactors = { simple: 5, medium: 10, complex: 15 };

const UseCaseTable = ({ method }: { method: 'transactions' | 'analysisClasses' }) => {
  const { state, updateState } = useUseCasePoints();

  const handleUseCaseChange = (type: keyof UseCaseCounts, value: string) => {
    if (value === '') {
      updateState({ useCases: { ...state.useCases, [type]: '' as any } });
      return;
    }
    const count = parseInt(value, 10);
    if (!isNaN(count)) {
      updateState({ useCases: { ...state.useCases, [type]: count } });
    }
  };

  const getUseCaseValue = (type: keyof UseCaseCounts) => {
    const value = state.useCases[type];
    return value === 0 ? '' : value;
  };

  const descriptions = {
    transactions: {
      simple: 'Menor o igual que 3 transacciones',
      medium: 'De 4 a 7 transacciones',
      complex: 'Mayor que 7 transacciones',
    },
    analysisClasses: {
      simple: 'Menor que 5 clases de análisis',
      medium: 'De 5 a 10 clases de análisis',
      complex: 'Mayor que 10 clases de análisis',
    },
  };

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Tipo de Caso de Uso</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Factor</TableHead>
          <TableHead className="w-32">Cantidad</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Simple</TableCell>
          <TableCell>{descriptions[method].simple}</TableCell>
          <TableCell>{useCaseFactors.simple}</TableCell>
          <TableCell><Input type="number" value={getUseCaseValue('simple')} onChange={e => handleUseCaseChange('simple', e.target.value)} placeholder="0" /></TableCell>
          <TableCell className="text-right">{state.useCases.simple * useCaseFactors.simple}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Medio</TableCell>
          <TableCell>{descriptions[method].medium}</TableCell>
          <TableCell>{useCaseFactors.medium}</TableCell>
          <TableCell><Input type="number" value={getUseCaseValue('medium')} onChange={e => handleUseCaseChange('medium', e.target.value)} placeholder="0" /></TableCell>
          <TableCell className="text-right">{state.useCases.medium * useCaseFactors.medium}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Complejo</TableCell>
          <TableCell>{descriptions[method].complex}</TableCell>
          <TableCell>{useCaseFactors.complex}</TableCell>
          <TableCell><Input type="number" value={getUseCaseValue('complex')} onChange={e => handleUseCaseChange('complex', e.target.value)} placeholder="0" /></TableCell>
          <TableCell className="text-right">{state.useCases.complex * useCaseFactors.complex}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default function Step1ActorsAndUseCases() {
  const { state, updateState, nextStep } = useUseCasePoints();

  const handleActorChange = (type: keyof ActorCounts, value: string) => {
    if (value === '') {
      updateState({ actors: { ...state.actors, [type]: '' as any } });
      return;
    }
    const count = parseInt(value, 10);
    if (!isNaN(count)) {
      updateState({ actors: { ...state.actors, [type]: count } });
    }
  };

  const getActorValue = (type: keyof ActorCounts) => {
    const value = state.actors[type];
    return value === 0 ? '' : value;
  };





  const calculatePA = () => {
    const simple = Number(state.actors.simple) || 0;
    const medium = Number(state.actors.medium) || 0;
    const complex = Number(state.actors.complex) || 0;
    return (simple * actorFactors.simple) +
      (medium * actorFactors.medium) +
      (complex * actorFactors.complex);
  };

  const pa = calculatePA();
  const calculatePCU = () => {
    const simple = Number(state.useCases.simple) || 0;
    const medium = Number(state.useCases.medium) || 0;
    const complex = Number(state.useCases.complex) || 0;
    return (simple * useCaseFactors.simple) +
      (medium * useCaseFactors.medium) +
      (complex * useCaseFactors.complex);
  };

  const pcu = calculatePCU();
  const pcusa = pa + pcu;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Peso de los Actores (PA)</CardTitle>
            <CardDescription>Clasifique los actores del sistema según su complejidad.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Actor</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Factor</TableHead>
                  <TableHead className="w-32">Cantidad</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Simple</TableCell>
                  <TableCell>Sistema externo con API</TableCell>
                  <TableCell>{actorFactors.simple}</TableCell>
                  <TableCell><Input type="number" value={getActorValue('simple')} onChange={e => handleActorChange('simple', e.target.value)} placeholder="0" /></TableCell>
                  <TableCell className="text-right">{state.actors.simple * actorFactors.simple}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medio</TableCell>
                  <TableCell>Sistema externo con protocolo o CLI</TableCell>
                  <TableCell>{actorFactors.medium}</TableCell>
                  <TableCell><Input type="number" value={getActorValue('medium')} onChange={e => handleActorChange('medium', e.target.value)} placeholder="0" /></TableCell>
                  <TableCell className="text-right">{state.actors.medium * actorFactors.medium}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Complejo</TableCell>
                  <TableCell>Persona interactuando con GUI</TableCell>
                  <TableCell>{actorFactors.complex}</TableCell>
                  <TableCell><Input type="number" value={getActorValue('complex')} onChange={e => handleActorChange('complex', e.target.value)} placeholder="0" /></TableCell>
                  <TableCell className="text-right">{state.actors.complex * actorFactors.complex}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="text-right font-bold mt-4 text-lg">Total PA: {pa}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peso de los Casos de Uso (PCU)</CardTitle>
            <CardDescription>Clasifique los casos de uso según su complejidad.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={state.useCaseMethod} onValueChange={(value) => updateState({ useCaseMethod: value as any })} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transactions">Por Transacciones</TabsTrigger>
                <TabsTrigger value="analysisClasses">Por Clases de Análisis</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions">
                <UseCaseTable method="transactions" />
              </TabsContent>
              <TabsContent value="analysisClasses">
                <UseCaseTable method="analysisClasses" />
              </TabsContent>
            </Tabs>
            <div className="text-right font-bold mt-4 text-lg">Total PCU: {pcu}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Puntos de Caso de Uso sin Ajustar (PCUSA)</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-bold text-blue-600">{pcusa}</p>
          <p className="text-gray-600">PCUSA = PA + PCU = {pa} + {pcu}</p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={nextStep}>Siguiente</Button>
      </div>
    </div>
  );
}
