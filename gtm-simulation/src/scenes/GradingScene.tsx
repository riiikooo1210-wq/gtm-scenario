import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '../components/layout/SceneWrapper'
import ActionButton from '../components/ui/ActionButton'
import { CheckIcon } from '../components/ui/Icons'
import { useGameStore } from '../store/gameStore'
import { gradeResponses } from '../services/gemini'
import type { GtmNode } from '../types/game'

interface Props { node: GtmNode }

export default function GradingScene({ node }: Props) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const resetGame = useGameStore((s) => s.resetGame)
  const gradingStatus = useGameStore((s) => s.gradingStatus)
  const gradingError = useGameStore((s) => s.gradingError)
  const setGradingStatus = useGameStore((s) => s.setGradingStatus)
  const setGradingResult = useGameStore((s) => s.setGradingResult)
  const setGradingError = useGameStore((s) => s.setGradingError)

  const prioritizationCriteria = useGameStore((s) => s.prioritizationCriteria)
  const accounts = useGameStore((s) => s.accounts)
  const rootCauses = useGameStore((s) => s.rootCauses)
  const triagePrioritization = useGameStore((s) => s.triagePrioritization)
  const coltonRescuePlan = useGameStore((s) => s.coltonRescuePlan)
  const fedRampHandling = useGameStore((s) => s.fedRampHandling)
  const danaBrief = useGameStore((s) => s.danaBrief)

  const startGrading = async () => {
    setGradingStatus('loading')
    setGradingError(null)
    try {
      const result = await gradeResponses({
        prioritizationCriteria,
        accounts,
        rootCauses,
        triagePrioritization,
        coltonRescuePlan,
        fedRampHandling,
        danaBrief,
      })
      setGradingResult(result)
    } catch (err) {
      setGradingError(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }

  useEffect(() => {
    if (gradingStatus === 'idle') {
      startGrading()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SceneWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', padding: '2rem 0' }}
      >
        {gradingStatus === 'loading' && (
          <>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Evaluating...
              </motion.span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your responses are being evaluated</h2>
            <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.6 }}>
              Our AI assessor is reviewing all 3 scenarios against the grading rubric.
              This usually takes 15–30 seconds.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#B87D6B',
                    borderRadius: '50%',
                  }}
                />
              ))}
            </div>
          </>
        )}

        {gradingStatus === 'error' && (
          <>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#c0392b' }}>Grading Error</h2>
            <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.6 }}>
              {gradingError}
            </p>
            <ActionButton text="Try Again" onClick={startGrading} />
            <div style={{ marginTop: '0.5rem' }}>
              <ActionButton text="Restart" onClick={resetGame} variant="secondary" />
            </div>
          </>
        )}

        {gradingStatus === 'complete' && (
          <>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: '#3A6B5E',
                color: '#F2EBD9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                margin: '0 auto',
              }}
            >
              <CheckIcon size={20} color="#F2EBD9" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Evaluation Complete</h2>
            <p style={{ fontSize: '0.875rem', color: '#555' }}>
              Your assessment results are ready.
            </p>
            <ActionButton text="View Results" onClick={() => navigateTo(node.next!)} />
          </>
        )}
      </motion.div>
    </SceneWrapper>
  )
}
