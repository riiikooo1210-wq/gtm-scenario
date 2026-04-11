import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AccountEntry, RootCauseEntry, GradingResult } from '../types/game'

interface GtmGameState {
  playerName: string
  currentNodeId: string
  visitedNodes: string[]
  currentScenario: 0 | 1 | 2 | 3
  scenariosSubmitted: number[]

  // Scenario 1
  prioritizationCriteria: string
  accounts: AccountEntry[]

  // Scenario 2
  rootCauses: RootCauseEntry[]

  // Scenario 3
  triagePrioritization: string
  coltonRescuePlan: string
  fedRampHandling: string
  danaBrief: string

  // Glossary tracking
  definitionClicks: Record<string, number>

  // Scenario 3 partial submission
  s3ResponsesSubmitted: boolean

  // Grading
  gradingStatus: 'idle' | 'loading' | 'complete' | 'error'
  gradingResult: GradingResult | null
  gradingError: string | null

  // Actions
  navigateTo: (nodeId: string) => void
  goBack: () => void
  setCurrentScenario: (s: 0 | 1 | 2 | 3) => void
  markScenarioSubmitted: (s: number) => void

  setPlayerName: (name: string) => void

  // Scenario 1 setters
  setPrioritizationCriteria: (text: string) => void
  setAccount: (index: number, field: keyof AccountEntry, value: string) => void

  // Scenario 2 setters
  setRootCause: (index: number, field: keyof RootCauseEntry, value: string) => void
  addRootCause: () => void
  removeRootCause: (index: number) => void

  // Glossary
  trackDefinitionClick: (term: string) => void

  // Scenario 3 partial
  setS3ResponsesSubmitted: (v: boolean) => void

  // Scenario 3 setters
  setTriagePrioritization: (text: string) => void
  setColtonRescuePlan: (text: string) => void
  setFedRampHandling: (text: string) => void
  setDanaBrief: (text: string) => void

  // Grading
  setGradingStatus: (status: 'idle' | 'loading' | 'complete' | 'error') => void
  setGradingResult: (result: GradingResult) => void
  setGradingError: (error: string | null) => void

  resetGame: () => void
}

const emptyAccount = (): AccountEntry => ({ name: '', rationale: '', contact: '' })
const emptyRootCause = (): RootCauseEntry => ({ title: '', explanation: '', actions: '' })

const initialState = {
  playerName: '',
  currentNodeId: 'intro',
  visitedNodes: ['intro'],
  currentScenario: 0 as 0 | 1 | 2 | 3,
  scenariosSubmitted: [] as number[],

  prioritizationCriteria: '',
  accounts: [emptyAccount(), emptyAccount(), emptyAccount(), emptyAccount(), emptyAccount()],

  rootCauses: [emptyRootCause(), emptyRootCause(), emptyRootCause()],

  definitionClicks: {} as Record<string, number>,
  s3ResponsesSubmitted: false,

  triagePrioritization: '',
  coltonRescuePlan: '',
  fedRampHandling: '',
  danaBrief: '',

  gradingStatus: 'idle' as const,
  gradingResult: null as GradingResult | null,
  gradingError: null as string | null,
}

export const useGameStore = create<GtmGameState>()(
  persist(
    (set) => ({
      ...initialState,

      navigateTo: (nodeId) =>
        set((state) => ({
          currentNodeId: nodeId,
          visitedNodes: [...state.visitedNodes, nodeId],
        })),

      goBack: () =>
        set((state) => {
          if (state.visitedNodes.length <= 1) return state
          const newVisited = state.visitedNodes.slice(0, -1)
          return {
            currentNodeId: newVisited[newVisited.length - 1],
            visitedNodes: newVisited,
          }
        }),

      setCurrentScenario: (s) => set({ currentScenario: s }),

      markScenarioSubmitted: (s) =>
        set((state) => ({
          scenariosSubmitted: state.scenariosSubmitted.includes(s)
            ? state.scenariosSubmitted
            : [...state.scenariosSubmitted, s],
        })),

      setPlayerName: (name) => set({ playerName: name }),

      setPrioritizationCriteria: (text) => set({ prioritizationCriteria: text }),

      setAccount: (index, field, value) =>
        set((state) => {
          const accounts = [...state.accounts]
          accounts[index] = { ...accounts[index], [field]: value }
          return { accounts }
        }),

      setRootCause: (index, field, value) =>
        set((state) => {
          const rootCauses = [...state.rootCauses]
          rootCauses[index] = { ...rootCauses[index], [field]: value }
          return { rootCauses }
        }),

      addRootCause: () =>
        set((state) => {
          if (state.rootCauses.length >= 5) return state
          return { rootCauses: [...state.rootCauses, emptyRootCause()] }
        }),

      removeRootCause: (index) =>
        set((state) => {
          if (state.rootCauses.length <= 3) return state
          return { rootCauses: state.rootCauses.filter((_, i) => i !== index) }
        }),

      trackDefinitionClick: (term) =>
        set((state) => ({
          definitionClicks: {
            ...state.definitionClicks,
            [term]: (state.definitionClicks[term] || 0) + 1,
          },
        })),

      setS3ResponsesSubmitted: (v) => set({ s3ResponsesSubmitted: v }),

      setTriagePrioritization: (text) => set({ triagePrioritization: text }),
      setColtonRescuePlan: (text) => set({ coltonRescuePlan: text }),
      setFedRampHandling: (text) => set({ fedRampHandling: text }),
      setDanaBrief: (text) => set({ danaBrief: text }),

      setGradingStatus: (status) => set({ gradingStatus: status }),
      setGradingResult: (result) => set({ gradingResult: result, gradingStatus: 'complete' }),
      setGradingError: (error) => set(error != null ? { gradingError: error, gradingStatus: 'error' } : { gradingError: null }),

      resetGame: () => set(initialState),
    }),
    {
      name: 'gtm-simulator-storage',
    }
  )
)
