import SceneEngine from './engine/SceneEngine'
import ProgressBar from './components/layout/ProgressBar'
import { useGameStore } from './store/gameStore'
import { sampleAnswers } from './data/sampleAnswers'

export default function App() {
  const resetGame = useGameStore((s) => s.resetGame)

  const skipToGrading = () => {
    const store = useGameStore.getState()
    store.setPlayerName(sampleAnswers.playerName)
    store.setPrioritizationCriteria(sampleAnswers.prioritizationCriteria)
    sampleAnswers.accounts.forEach((a, i) => {
      store.setAccount(i, 'name', a.name)
      store.setAccount(i, 'rationale', a.rationale)
      store.setAccount(i, 'contact', a.contact)
    })
    sampleAnswers.rootCauses.forEach((rc, i) => {
      if (i >= 3) store.addRootCause()
      store.setRootCause(i, 'title', rc.title)
      store.setRootCause(i, 'explanation', rc.explanation)
      store.setRootCause(i, 'actions', rc.actions)
    })
    store.setTriagePrioritization(sampleAnswers.triagePrioritization)
    store.setColtonRescuePlan(sampleAnswers.coltonRescuePlan)
    store.setFedRampHandling(sampleAnswers.fedRampHandling)
    store.setDanaBrief(sampleAnswers.danaBrief)
    store.markScenarioSubmitted(1)
    store.markScenarioSubmitted(2)
    store.markScenarioSubmitted(3)
    store.setS3ResponsesSubmitted(true)
    store.setCurrentScenario(3)
    store.setGradingError(null)
    store.setGradingStatus('idle')
    store.navigateTo('grading')
  }

  return (
    <>
      <ProgressBar />
      <div style={{ paddingTop: '28px' }}>
        <SceneEngine />
      </div>
      <button
        onClick={skipToGrading}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '5.5rem',
          zIndex: 200,
          backgroundColor: '#FDE68A',
          border: '1px solid #000',
          boxShadow: '2px 2px 0 #000',
          padding: '0.375rem 0.75rem',
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: '#333',
          cursor: 'pointer',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        Skip to Grading (Dev)
      </button>
      <button
        onClick={resetGame}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 200,
          backgroundColor: '#E8DCC8',
          border: '1px solid #000',
          boxShadow: '2px 2px 0 #000',
          padding: '0.375rem 0.75rem',
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: '#333',
          cursor: 'pointer',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        Restart
      </button>
    </>
  )
}
