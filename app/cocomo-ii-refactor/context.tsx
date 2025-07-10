"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CocomoState, TipoFuncion, NivelComplejidad } from './types'

interface CocomoContextType {
  state: CocomoState
  updateState: (updates: Partial<CocomoState>) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
}

const CocomoContext = createContext<CocomoContextType | undefined>(undefined)

const initialState: CocomoState = {
  kloc: 10,
  projectType: "organic",
  costPerPerson: 5000,
  language: "JavaScript",
  customLanguageMultiplier: 47,
  sizingMethod: 'kloc',
  useFunctionPoints: false,
  functionPoints: {
    entradas: { baja: 0, media: 0, alta: 0 },
    salidas: { baja: 0, media: 0, alta: 0 },
    consultas: { baja: 0, media: 0, alta: 0 },
    archivos: { baja: 0, media: 0, alta: 0 },
    interfaces: { baja: 0, media: 0, alta: 0 }
  },
  eafValues: {
    rss: 1.0,
    tbd: 1.0,
    cpr: 1.0,
    rte: 1.0,
    rmp: 1.0,
    vmc: 1.0,
    trc: 1.0,
    can: 1.0,
    ean: 1.0,
    cpro: 1.0,
    eso: 1.0,
    elp: 1.0,
    utp: 1.0,
    uhs: 1.0,
    rpl: 1.0
  },
  usePhaseCosts: false,
  phaseCosts: {
    requirements: { cost: 5000, effort: 15 },
    productDesign: { cost: 5000, effort: 20 },
    detailedDesign: { cost: 5000, effort: 15 },
    codingUnitTest: { cost: 5000, effort: 30 },
    integrationTest: { cost: 5000, effort: 15 },
    maintenance: { cost: 5000, effort: 5 },
  },
  currentStep: 1
}

export function CocomoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CocomoState>(initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cocomo-81-state')
    if (saved) {
      try {
        setState(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading saved state:', error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cocomo-81-state', JSON.stringify(state))
  }, [state])

  const updateState = (updates: Partial<CocomoState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 5) }))
  }

  const prevStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }))
  }

  const goToStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: Math.max(1, Math.min(step, 5)) }))
  }

  return (
    <CocomoContext.Provider value={{ state, updateState, nextStep, prevStep, goToStep }}>
      {children}
    </CocomoContext.Provider>
  )
}

export function useCocomo() {
  const context = useContext(CocomoContext)
  if (context === undefined) {
    throw new Error('useCocomo must be used within a CocomoProvider')
  }
  return context
}
