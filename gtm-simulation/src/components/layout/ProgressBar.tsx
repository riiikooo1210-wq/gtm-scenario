import { useGameStore } from '../../store/gameStore'
import { CheckIcon } from '../ui/Icons'

const scenarios = [
  { num: 1, label: 'Scenario 1' },
  { num: 2, label: 'Scenario 2' },
  { num: 3, label: 'Scenario 3' },
]

export default function ProgressBar() {
  const currentScenario = useGameStore((s) => s.currentScenario)
  const submitted = useGameStore((s) => s.scenariosSubmitted)

  if (currentScenario === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        height: '28px',
        backgroundColor: '#E8DCC8',
        borderBottom: '1px solid #000',
      }}
    >
      {scenarios.map((s) => {
        const isComplete = submitted.includes(s.num)
        const isCurrent = currentScenario === s.num
        const isFuture = !isComplete && !isCurrent

        let bg = '#E8DCC8'
        let color = '#999'
        if (isComplete) { bg = '#3A6B5E'; color = '#F2EBD9' }
        else if (isCurrent) { bg = '#B87D6B'; color = '#F2EBD9' }

        return (
          <div
            key={s.num}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: bg,
              color,
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              borderRight: s.num < 3 ? '1px solid rgba(0,0,0,0.2)' : undefined,
              opacity: isFuture ? 0.5 : 1,
              transition: 'all 0.3s ease',
            }}
          >
            {isComplete ? <>{s.label} <CheckIcon size={10} color="currentColor" /></> : s.label}
          </div>
        )
      })}
    </div>
  )
}
