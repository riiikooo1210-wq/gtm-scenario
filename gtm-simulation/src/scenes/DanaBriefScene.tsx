import { useState } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '../components/layout/SceneWrapper'
import LaptopFrame from '../components/ui/LaptopFrame'
import SlackCompose from '../components/ui/SlackCompose'
import ReferenceDrawer, { ReferenceButton } from '../components/ui/ReferenceDrawer'
import SlackMessageEnhanced from '../components/ui/SlackMessageEnhanced'
import EmailBlock from '../components/ui/EmailBlock'
import QuoteBlock from '../components/ui/QuoteBlock'
import { countWords } from '../components/ui/LongFormEditor'
import { useGameStore } from '../store/gameStore'
import { gtmStoryline } from '../data/gtm-storyline'
import type { GtmNode } from '../types/game'

interface Props { node: GtmNode }

type DrawerTab = 'responses' | 'briefing'

export default function DanaBriefScene({ node }: Props) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const markScenarioSubmitted = useGameStore((s) => s.markScenarioSubmitted)
  const danaBrief = useGameStore((s) => s.danaBrief)
  const setDanaBrief = useGameStore((s) => s.setDanaBrief)
  const isSubmitted = useGameStore((s) => s.scenariosSubmitted.includes(3))

  // Player's own responses for reference
  const triagePrioritization = useGameStore((s) => s.triagePrioritization)
  const coltonRescuePlan = useGameStore((s) => s.coltonRescuePlan)
  const fedRampHandling = useGameStore((s) => s.fedRampHandling)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('responses')

  const wordCount = countWords(danaBrief)
  const overLimit = wordCount > 150
  const canSend = danaBrief.trim().length > 0 && !overLimit && !isSubmitted

  const handleSend = () => {
    markScenarioSubmitted(3)
    navigateTo(node.next!)
  }

  const s3Briefing = gtmStoryline.nodes['s3_briefing']

  return (
    <SceneWrapper showBack backLabel="Back to your response">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555' }}>
              Scenario 3 — Brief to Dana
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>Send Dana Your Brief</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <ReferenceButton
              onClick={() => { setDrawerTab('responses'); setDrawerOpen(true) }}
              label="My Response"
            />
            <ReferenceButton
              onClick={() => { setDrawerTab('briefing'); setDrawerOpen(true) }}
              label="View Briefing"
            />
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#333' }}>
          Dana is on a flight to London and won't land for 6 hours. Write the Slack message you'd send her — cover both situations, actions taken, and flag decisions needing her input.{' '}
          <strong style={{ color: '#c0392b' }}>Maximum 150 words.</strong>
        </p>

        <LaptopFrame variant="slack" title="Dana Moretti (direct message)">
          <SlackCompose
            channel="Dana Moretti"
            value={danaBrief}
            onChange={setDanaBrief}
            placeholder="Dana — quick update on two situations..."
            maxWords={150}
            disabled={isSubmitted}
            onSend={handleSend}
            sendDisabled={!canSend}
          />
        </LaptopFrame>

        {overLimit && (
          <div style={{ fontSize: '0.8125rem', color: '#c0392b', fontWeight: 600, textAlign: 'center' }}>
            Dana brief exceeds 150 words ({wordCount}/150). Please shorten it to send.
          </div>
        )}
      </motion.div>

      {/* Reference Drawer with tabs */}
      <ReferenceDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerTab === 'responses' ? 'Your Responses' : 'Briefing Info'}
      >
        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
          <TabButton
            label="My Responses"
            active={drawerTab === 'responses'}
            onClick={() => setDrawerTab('responses')}
          />
          <TabButton
            label="Briefing Info"
            active={drawerTab === 'briefing'}
            onClick={() => setDrawerTab('briefing')}
          />
        </div>

        {drawerTab === 'responses' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ResponseBlock title="1. Triage & Prioritization" content={triagePrioritization} />
            <ResponseBlock title="2. Colton Brands Rescue Plan" content={coltonRescuePlan} />
            <ResponseBlock title="3. FedRAMP Launch Handling" content={fedRampHandling} />
          </div>
        ) : (
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
        )}
      </ReferenceDrawer>
    </SceneWrapper>
  )
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.375rem 0.75rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        border: '1px solid #000',
        backgroundColor: active ? '#B87D6B' : 'transparent',
        color: active ? '#F2EBD9' : '#555',
        cursor: 'pointer',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {label}
    </button>
  )
}

function ResponseBlock({ title, content }: { title: string; content: string }) {
  return (
    <div
      style={{
        borderLeft: '3px solid #B87D6B',
        paddingLeft: '0.75rem',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.8125rem', marginBottom: '0.375rem', color: '#000' }}>
        {title}
      </div>
      <div style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: '#333', whiteSpace: 'pre-wrap' }}>
        {content || <span style={{ color: '#999', fontStyle: 'italic' }}>No response yet</span>}
      </div>
    </div>
  )
}
