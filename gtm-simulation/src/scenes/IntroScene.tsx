import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '../components/layout/SceneWrapper'
import ActionButton from '../components/ui/ActionButton'
import { renderContentWithGlossary } from '../components/ui/JargonTerm'
import { CheckIcon } from '../components/ui/Icons'
import { useGameStore } from '../store/gameStore'
import type { GtmNode } from '../types/game'

interface Props { node: GtmNode }

const steps = [
  {
    label: 'Company Background',
    content: (
      <>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Company Background</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', lineHeight: 1.7 }}>
          <p>
            {renderContentWithGlossary('{{Vantage Shield}} is a {{Series C}} cybersecurity startup ($68M raised) that builds a cloud-native Security Posture Management platform.')}
          </p>
          <p>
            The company has 290 employees, 410 paying customers, and {renderContentWithGlossary('$31M in {{ARR}}')}.
          </p>
          <p>
            The board has mandated a push into enterprise (5,000+ employees) to hit {renderContentWithGlossary('$55M {{ARR}} by end of {{FY}}2026')}. Enterprise deals average $180K–$350K {renderContentWithGlossary('{{ARR}}')} with 6–12 month {renderContentWithGlossary('{{sales cycle}}s')}.
          </p>
        </div>
      </>
    ),
  },
  {
    label: 'Your Role',
    content: (
      <>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Your Role</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', lineHeight: 1.7 }}>
          <p>
            You are a <strong>newly hired {renderContentWithGlossary('{{GTM}} Manager')}</strong>, reporting to Dana Moretti (VP of Enterprise Sales).
          </p>
          <p>
            You're building the enterprise {renderContentWithGlossary('{{GTM}}')} motion from scratch — there is no existing playbook, no enterprise {renderContentWithGlossary('{{SDR}}')} team, and no established enterprise pipeline.
          </p>
          <p>
            Everything you write should be as if you're actually doing the work — not describing what you'd do in theory.
          </p>
        </div>
      </>
    ),
  },
  {
    label: 'How This Works',
    content: (
      <>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>How This Works</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', lineHeight: 1.7 }}>
          <p>
            <strong>3 connected scenarios</strong> simulating your first two weeks on the job.
          </p>
          <p>
            Difficulty increases progressively. Each scenario builds on the last.
          </p>
          <div
            style={{
              backgroundColor: '#E8DCC8',
              border: '1px solid rgba(0,0,0,0.2)',
              padding: '0.75rem 1rem',
              fontSize: '0.8125rem',
              lineHeight: 1.7,
            }}
          >
            <strong>Expected time:</strong> 20–30 minutes total.
          </div>
        </div>
      </>
    ),
  },
]

export default function IntroScene({ node }: Props) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const setCurrentScenario = useGameStore((s) => s.setCurrentScenario)
  const playerName = useGameStore((s) => s.playerName)
  const setPlayerName = useGameStore((s) => s.setPlayerName)
  const [step, setStep] = useState(0)
  const [nameEntered, setNameEntered] = useState(playerName.trim().length > 0)

  const handleNameSubmit = () => {
    if (playerName.trim().length > 0) {
      setNameEntered(true)
    }
  }

  const handleStart = () => {
    setCurrentScenario(1)
    navigateTo(node.next!)
  }

  const isLastStep = step === steps.length - 1

  // Name input screen (shown before the steps)
  if (!nameEntered) {
    return (
      <SceneWrapper illustration={node.illustration} hideIllustration>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000', lineHeight: 1.2 }}>
            GTM Manager Simulation
          </h1>
          <p style={{ fontSize: '0.8125rem', color: '#555', lineHeight: 1.3, fontStyle: 'italic' }}>
            Enterprise Security — Vantage Shield
          </p>

          {node.illustration && (
            <div style={{ width: 'calc(100% + 6rem)', marginLeft: '-3rem', marginRight: '-3rem', overflow: 'hidden', borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
              <img src={node.illustration} alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          )}

          <div
            style={{
              border: '1px solid #000',
              boxShadow: '4px 4px 0 #000',
              backgroundColor: '#F2EBD9',
              padding: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>What should we call you?</h2>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem', color: '#333' }}>
              Enter the name you'd like to go by in this office.
            </p>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleNameSubmit() }}
              placeholder="Your name"
              autoFocus
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem',
                fontSize: '0.9375rem',
                fontFamily: 'Inter, system-ui, sans-serif',
                border: '1px solid #000',
                backgroundColor: '#fff',
                color: '#000',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <ActionButton
            text="Continue"
            onClick={handleNameSubmit}
            variant={playerName.trim().length > 0 ? 'primary' : 'secondary'}
          />
        </motion.div>
      </SceneWrapper>
    )
  }

  return (
    <SceneWrapper illustration={node.illustration} hideIllustration>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000', lineHeight: 1.2 }}>
          GTM Manager Simulation
        </h1>
        <p style={{ fontSize: '0.8125rem', color: '#555', lineHeight: 1.3, fontStyle: 'italic' }}>
          Enterprise Security — Vantage Shield
        </p>

        {/* Intro illustration below title */}
        {node.illustration && (
          <div style={{ width: 'calc(100% + 6rem)', marginLeft: '-3rem', marginRight: '-3rem', overflow: 'hidden', borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
            <img src={node.illustration} alt="" style={{ width: '100%', display: 'block' }} />
          </div>
        )}

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: i <= step ? '#B87D6B' : '#ddd',
                  color: i <= step ? '#fff' : '#999',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  transition: 'all 0.3s',
                }}
              >
                {i < step ? <CheckIcon size={12} color="#fff" /> : i + 1}
              </div>
              <span
                style={{
                  fontSize: '0.6875rem',
                  color: i === step ? '#000' : '#999',
                  fontWeight: i === step ? 600 : 400,
                  display: i === step ? 'inline' : 'none',
                }}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div style={{ width: '20px', height: '1px', backgroundColor: '#ccc', marginLeft: '0.25rem' }} />
              )}
            </div>
          ))}
        </div>

        {/* Card content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{
              border: '1px solid #000',
              boxShadow: '4px 4px 0 #000',
              backgroundColor: '#F2EBD9',
              padding: '1.5rem',
            }}
          >
            {steps[step].content}
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {step > 0 && (
            <ActionButton text="Back" onClick={() => setStep(step - 1)} variant="secondary" />
          )}
          {isLastStep ? (
            <ActionButton text="Begin Assessment" onClick={handleStart} />
          ) : (
            <ActionButton text="Next" onClick={() => setStep(step + 1)} variant="secondary" />
          )}
        </div>
      </motion.div>
    </SceneWrapper>
  )
}
