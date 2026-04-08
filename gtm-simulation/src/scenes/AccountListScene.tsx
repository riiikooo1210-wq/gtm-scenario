import { useState } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '../components/layout/SceneWrapper'
import ActionButton from '../components/ui/ActionButton'
import AccountField from '../components/ui/AccountField'
import LaptopFrame from '../components/ui/LaptopFrame'
import ReferenceDrawer, { ReferenceButton } from '../components/ui/ReferenceDrawer'
import SlackMessageEnhanced from '../components/ui/SlackMessageEnhanced'
import { renderContentWithGlossary } from '../components/ui/JargonTerm'
import { useGameStore } from '../store/gameStore'
import { gtmStoryline } from '../data/gtm-storyline'
import type { GtmNode } from '../types/game'

interface Props { node: GtmNode }

export default function AccountListScene({ node }: Props) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const markScenarioSubmitted = useGameStore((s) => s.markScenarioSubmitted)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const prioritizationCriteria = useGameStore((s) => s.prioritizationCriteria)
  const setPrioritizationCriteria = useGameStore((s) => s.setPrioritizationCriteria)
  const accounts = useGameStore((s) => s.accounts)
  const setAccount = useGameStore((s) => s.setAccount)
  const isSubmitted = useGameStore((s) => s.scenariosSubmitted.includes(1))

  const allFilled = prioritizationCriteria.trim().length > 0 &&
    accounts.every((a) => a.name.trim() && a.rationale.trim() && a.contact.trim())

  const handleSubmit = () => {
    markScenarioSubmitted(1)
    navigateTo(node.next!)
  }

  return (
    <SceneWrapper showBack>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555' }}>
              Scenario 1 — Your Response
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>{node.title}</h2>
          </div>
          <ReferenceButton onClick={() => setDrawerOpen(true)} label="View Briefing" />
        </div>

        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#333' }}>
          {renderContentWithGlossary(node.content)}
        </p>

        {/* Research instruction */}
        <div
          style={{
            backgroundColor: '#E8DCC8',
            border: '1px solid rgba(0,0,0,0.2)',
            padding: '0.75rem 1rem',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            color: '#333',
          }}
        >
          <strong>Note:</strong> Use real companies — research actual organizations that fit the criteria from Dana's brief. Your picks should be based on real companies you could find information about online.
        </div>

        {/* Laptop frame wrapping the document-style input */}
        <LaptopFrame variant="doc" title="Target Account List — Untitled document">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Prioritization Criteria */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#000' }}>
                Prioritization Criteria
              </label>
              <p style={{ fontSize: '0.75rem', color: '#555', marginBottom: '0.25rem' }}>
                Briefly explain the criteria you used to prioritize your list — why are your top picks ranked above the others?
              </p>
              <textarea
                value={prioritizationCriteria}
                onChange={(e) => setPrioritizationCriteria(e.target.value)}
                placeholder="e.g., I prioritized accounts with the most urgent need and fewest barriers to entry..."
                rows={3}
                disabled={isSubmitted}
                style={{
                  width: '100%',
                  backgroundColor: '#F7F1E3',
                  border: '1px solid #ddd',
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  resize: 'none',
                  outline: 'none',
                  borderRadius: '4px',
                  color: '#000',
                  opacity: isSubmitted ? 0.6 : 1,
                }}
              />
            </div>

            {/* 5 Account Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {accounts.map((account, i) => (
                <AccountField
                  key={i}
                  index={i}
                  account={account}
                  onChange={(field, value) => setAccount(i, field, value)}
                  disabled={isSubmitted}
                />
              ))}
            </div>

            <ActionButton
              text={isSubmitted ? 'Submitted' : 'Submit Account List'}
              onClick={handleSubmit}
              disabled={!allFilled || isSubmitted}
            />
          </div>
        </LaptopFrame>
      </motion.div>

      {/* Reference Drawer with S1 briefing info */}
      <ReferenceDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Dana's Briefing">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {gtmStoryline.nodes['s1_briefing']?.slackMessages?.map((msg, i) => (
            <SlackMessageEnhanced key={i} message={msg} delay={0} initialExpanded />
          ))}
        </div>
      </ReferenceDrawer>
    </SceneWrapper>
  )
}
