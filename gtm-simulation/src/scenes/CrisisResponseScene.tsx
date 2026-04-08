import { useState } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '../components/layout/SceneWrapper'
import ActionButton from '../components/ui/ActionButton'
import LongFormEditor from '../components/ui/LongFormEditor'
import LaptopFrame from '../components/ui/LaptopFrame'
import ReferenceDrawer, { ReferenceButton } from '../components/ui/ReferenceDrawer'
import SlackMessageEnhanced from '../components/ui/SlackMessageEnhanced'
import EmailBlock from '../components/ui/EmailBlock'
import QuoteBlock from '../components/ui/QuoteBlock'
import { renderContentWithGlossary } from '../components/ui/JargonTerm'
import { useGameStore } from '../store/gameStore'
import { gtmStoryline } from '../data/gtm-storyline'
import type { GtmNode } from '../types/game'

interface Props { node: GtmNode }

export default function CrisisResponseScene({ node }: Props) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const setS3ResponsesSubmitted = useGameStore((s) => s.setS3ResponsesSubmitted)

  const triagePrioritization = useGameStore((s) => s.triagePrioritization)
  const setTriagePrioritization = useGameStore((s) => s.setTriagePrioritization)
  const coltonRescuePlan = useGameStore((s) => s.coltonRescuePlan)
  const setColtonRescuePlan = useGameStore((s) => s.setColtonRescuePlan)
  const fedRampHandling = useGameStore((s) => s.fedRampHandling)
  const setFedRampHandling = useGameStore((s) => s.setFedRampHandling)
  const isSubmitted = useGameStore((s) => s.s3ResponsesSubmitted)

  const [drawerOpen, setDrawerOpen] = useState(false)

  const allFilled =
    triagePrioritization.trim().length > 0 &&
    coltonRescuePlan.trim().length > 0 &&
    fedRampHandling.trim().length > 0

  const canSubmit = allFilled && !isSubmitted

  const handleSubmit = () => {
    setS3ResponsesSubmitted(true)
    navigateTo(node.next!)
  }

  const handleNext = () => {
    navigateTo(node.next!)
  }

  // Get S3 briefing data for reference drawer
  const s3Briefing = gtmStoryline.nodes['s3_briefing']

  return (
    <SceneWrapper showBack>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555' }}>
              Scenario 3 — Your Response
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>{node.title}</h2>
          </div>
          <ReferenceButton onClick={() => setDrawerOpen(true)} label="View Briefing" />
        </div>

        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#333' }}>
          {renderContentWithGlossary(node.content)}
        </p>

        {/* Laptop frame wrapping the response document */}
        <LaptopFrame variant="doc" title="Crisis Response Plan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Part 1: Triage */}
            <Section number={1} title="Triage & Prioritization">
              <p style={descStyle}>
                Which crisis gets your attention first and why? What do you delegate or defer on the other?
              </p>
              <LongFormEditor
                value={triagePrioritization}
                onChange={setTriagePrioritization}
                placeholder="Explain your priority order and trade-off logic..."
                minRows={5}
                disabled={isSubmitted}
              />
            </Section>

            {/* Part 2: Colton Rescue */}
            <Section number={2} title="Colton Brands Rescue Plan">
              <p style={descStyle}>
                You have until end of day Friday. What specific actions do you take to change Eric's trajectory?
                Address his three objections: (a) {renderContentWithGlossary('{{vendor viability}}')} risk, (b) no F500 retail reference, (c) no risk mitigation.
                Be concrete — who do you call, what do you say, what do you offer?
              </p>
              <LongFormEditor
                value={coltonRescuePlan}
                onChange={setColtonRescuePlan}
                placeholder="Detail your rescue plan with specific actions, calls, and offers..."
                minRows={8}
                disabled={isSubmitted}
              />
            </Section>

            {/* Part 3: FedRAMP */}
            <Section number={3} title="FedRAMP Launch Handling">
              <p style={descStyle}>
                How do you handle Hannah's request given the Colton crisis? What do you delegate, what do you own,
                and what connections do you draw between the two situations?
              </p>
              <LongFormEditor
                value={fedRampHandling}
                onChange={setFedRampHandling}
                placeholder="Describe your delegation plan, what you own, and how FedRAMP connects to the Colton deal..."
                minRows={6}
                disabled={isSubmitted}
              />
            </Section>

            <ActionButton
              text={isSubmitted ? 'Next' : 'Submit Response & Continue'}
              onClick={isSubmitted ? handleNext : handleSubmit}
              disabled={!isSubmitted && !canSubmit}
            />
          </div>
        </LaptopFrame>
      </motion.div>

      {/* Reference Drawer with briefing info */}
      <ReferenceDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Briefing Info">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {s3Briefing?.emails?.map((email, i) => (
            <EmailBlock key={i} email={email} delay={0} initialExpanded />
          ))}
          {s3Briefing?.quotes?.map((quote, i) => (
            <QuoteBlock key={i} quote={quote} delay={0} />
          ))}
          {s3Briefing?.slackMessages?.map((msg, i) => (
            <SlackMessageEnhanced key={i} message={msg} delay={0} initialExpanded />
          ))}
        </div>
      </ReferenceDrawer>
    </SceneWrapper>
  )
}

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: number * 0.1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        ...(number > 1 ? { borderTop: '1px solid #e0e0e0', paddingTop: '1rem' } : {}),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span
          style={{
            backgroundColor: '#B87D6B',
            color: '#F2EBD9',
            width: '1.75rem',
            height: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.8rem',
            flexShrink: 0,
            borderRadius: '4px',
          }}
        >
          {number}
        </span>
        <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{title}</span>
      </div>
      {children}
    </motion.div>
  )
}

const descStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  lineHeight: 1.6,
  color: '#555',
}
