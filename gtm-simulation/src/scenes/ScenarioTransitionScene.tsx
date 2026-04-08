import { motion } from 'framer-motion'
import SceneWrapper from '../components/layout/SceneWrapper'
import ActionButton from '../components/ui/ActionButton'
import { CheckIcon } from '../components/ui/Icons'
import { useGameStore } from '../store/gameStore'
import type { GtmNode } from '../types/game'

interface Props { node: GtmNode }

export default function ScenarioTransitionScene({ node }: Props) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const setCurrentScenario = useGameStore((s) => s.setCurrentScenario)

  const nextScenario = (node.scenario + 1) as 1 | 2 | 3

  const handleContinue = () => {
    setCurrentScenario(nextScenario)
    navigateTo(node.next!)
  }

  return (
    <SceneWrapper illustration={node.illustration}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', padding: '1rem 0' }}
      >
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

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{node.title}</h2>

        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#333', maxWidth: '600px', margin: '0 auto' }}>
          {node.content}
        </p>

        <ActionButton text={`Continue to Scenario ${nextScenario}`} onClick={handleContinue} />
      </motion.div>
    </SceneWrapper>
  )
}
