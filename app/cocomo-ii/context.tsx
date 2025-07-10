"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CocomoIIState, TipoFuncion, NivelComplejidad } from './types'

interface CocomoIIContextType {
  state: CocomoIIState
  updateState: (updates: Partial<CocomoIIState>) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
}

const CocomoIIContext = createContext<CocomoIIContextType | undefined>(undefined)

const initialState: CocomoIIState = {
  size: 10,
  sizeType: "kloc",
  costPerPerson: 5000,
  scaleFactors: {
    prec: 3.72, // Precedentedness - Nominal
    flex: 3.04, // Development Flexibility - Nominal
    resl: 4.24, // Architecture/Risk Resolution - Nominal
    team: 3.29, // Team Cohesion - Nominal
    pmat: 4.68, // Process Maturity - Nominal
  },
  efMultipliers: {
    rely: 1.0, // Required Software Reliability - Nominal
    data: 1.0, // Database Size - Nominal
    cplx: 1.0, // Product Complexity - Nominal
    ruse: 1.0, // Required Reusability - Nominal
    docu: 1.0, // Documentation Match to Life-Cycle Needs - Nominal
    time: 1.0, // Execution Time Constraint - Nominal
    stor: 1.0, // Main Storage Constraint - Nominal
    pvol: 1.0, // Platform Volatility - Nominal
    acap: 1.0, // Analyst Capability - Nominal
    pcap: 1.0, // Programmer Capability - Nominal
    pcon: 1.0, // Personnel Continuity - Nominal
    apex: 1.0, // Applications Experience - Nominal
    plex: 1.0, // Platform Experience - Nominal
    ltex: 1.0, // Language and Tool Experience - Nominal
    tool: 1.0, // Use of Software Tools - Nominal
    site: 1.0, // Multisite Development - Nominal
    sced: 1.0, // Required Development Schedule - Nominal
  },
  pf: 0,
  language: "Java",
  customLanguageMultiplier: 53,
  functionPoints: {
    entradas: { baja: 0, media: 0, alta: 0 },
    salidas: { baja: 0, media: 0, alta: 0 },
    consultas: { baja: 0, media: 0, alta: 0 },
    archivos: { baja: 0, media: 0, alta: 0 },
    interfaces: { baja: 0, media: 0, alta: 0 }
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

export function CocomoIIProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CocomoIIState>(initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cocomo-ii-state')
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
    localStorage.setItem('cocomo-ii-state', JSON.stringify(state))
  }, [state])

  const updateState = (updates: Partial<CocomoIIState>) => {
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
    <CocomoIIContext.Provider value={{ state, updateState, nextStep, prevStep, goToStep }}>
      {children}
    </CocomoIIContext.Provider>
  )
}

export function useCocomoII() {
  const context = useContext(CocomoIIContext)
  if (context === undefined) {
    throw new Error('useCocomoII must be used within a CocomoIIProvider')
  }
  return context
}
