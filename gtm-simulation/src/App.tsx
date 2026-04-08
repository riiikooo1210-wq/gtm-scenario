import SceneEngine from './engine/SceneEngine'
import ProgressBar from './components/layout/ProgressBar'
import { useGameStore } from './store/gameStore'

export default function App() {
  const resetGame = useGameStore((s) => s.resetGame)

  return (
    <>
      <ProgressBar />
      <div style={{ paddingTop: '28px' }}>
        <SceneEngine />
      </div>
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
