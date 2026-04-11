import { useState } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '../components/layout/SceneWrapper'
import ActionButton from '../components/ui/ActionButton'
import LaptopFrame from '../components/ui/LaptopFrame'
import MetricsTable from '../components/ui/MetricsTable'
import ReferenceDrawer, { ReferenceButton } from '../components/ui/ReferenceDrawer'
import { renderContentWithGlossary } from '../components/ui/JargonTerm'
import { useGameStore } from '../store/gameStore'
import { gtmStoryline } from '../data/gtm-storyline'
import type { GtmNode } from '../types/game'

interface Props { node: GtmNode }

export default function DiagnosticMemoScene({ node }: Props) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const markScenarioSubmitted = useGameStore((s) => s.markScenarioSubmitted)
  const rootCauses = useGameStore((s) => s.rootCauses)
  const setRootCause = useGameStore((s) => s.setRootCause)
  const addRootCause = useGameStore((s) => s.addRootCause)
  const removeRootCause = useGameStore((s) => s.removeRootCause)
  const isSubmitted = useGameStore((s) => s.scenariosSubmitted.includes(2))
  const playerName = useGameStore((s) => s.playerName)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filledCount = rootCauses.filter(
    (rc) => rc.title.trim() && rc.explanation.trim() && rc.actions.trim()
  ).length

  const canSubmit = filledCount >= 3 && !isSubmitted

  const handleSubmit = () => {
    markScenarioSubmitted(2)
    navigateTo(node.next!)
  }

  // Get S2 briefing data for the reference drawer
  const s2Briefing = gtmStoryline.nodes['s2_briefing']
  const metrics = s2Briefing?.metrics || []
  const quotes = s2Briefing?.quotes || []

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
              Scenario 2 — Your Response
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>{node.title}</h2>
          </div>
          <ReferenceButton onClick={() => setDrawerOpen(true)} label="View Reference" />
        </div>

        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#333' }}>
          {renderContentWithGlossary(node.content)}
        </p>

        {/* Email-style laptop frame */}
        <LaptopFrame variant="email-read" title="New Message — Diagnostic Memo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Email header fields */}
            <div style={{ borderBottom: '1px solid #e0e0e0', padding: '0.5rem 0' }}>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', padding: '0.25rem 0' }}>
                <span style={{ color: '#999', fontWeight: 500, width: '50px' }}>To:</span>
                <span style={{ color: '#000' }}>Dana Moretti, VP of Enterprise Sales</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', padding: '0.25rem 0' }}>
                <span style={{ color: '#999', fontWeight: 500, width: '50px' }}>From:</span>
                <span style={{ color: '#000' }}>{playerName || 'You'} (GTM Manager)</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', padding: '0.25rem 0' }}>
                <span style={{ color: '#999', fontWeight: 500, width: '50px' }}>Re:</span>
                <span style={{ color: '#000' }}>Enterprise Pipeline Diagnostic & 2-Week Action Plan</span>
              </div>
            </div>

            {/* Root Cause + Action Plan blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {rootCauses.map((rc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    ...(i > 0 ? { borderTop: '1px solid #e0e0e0', paddingTop: '1rem' } : {}),
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                        {i + 1}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555' }}>
                        Root Cause & Action
                      </span>
                    </div>
                    {rootCauses.length > 3 && !isSubmitted && (
                      <button
                        onClick={() => removeRootCause(i)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          color: '#c0392b',
                          fontWeight: 600,
                          padding: '0.25rem',
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={labelStyle}>Root Cause Title</label>
                    <input
                      type="text"
                      value={rc.title}
                      onChange={(e) => setRootCause(i, 'title', e.target.value)}
                      placeholder="e.g., Wrong persona targeting inherited from mid-market ICP"
                      disabled={isSubmitted}
                      style={{ ...inputStyle, opacity: isSubmitted ? 0.6 : 1 }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={labelStyle}>Explanation (why is this happening?)</label>
                    <textarea
                      value={rc.explanation}
                      onChange={(e) => setRootCause(i, 'explanation', e.target.value)}
                      placeholder="Connect this to the data or team quotes. Go deeper than surface symptoms..."
                      rows={3}
                      disabled={isSubmitted}
                      style={{ ...inputStyle, resize: 'none', lineHeight: 1.7, opacity: isSubmitted ? 0.6 : 1 }}
                    />
                  </div>

                  <div
                    style={{
                      borderTop: '1px dashed rgba(0,0,0,0.15)',
                      paddingTop: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.375rem',
                    }}
                  >
                    <label style={{ ...labelStyle, color: '#3A6B5E' }}>Action Plan (executable within 2 weeks)</label>
                    <textarea
                      value={rc.actions}
                      onChange={(e) => setRootCause(i, 'actions', e.target.value)}
                      placeholder="Be specific: not 'improve messaging' but 'rewrite cold email sequence to lead with compliance angle targeting CISOs...'"
                      rows={3}
                      disabled={isSubmitted}
                      style={{ ...inputStyle, resize: 'none', lineHeight: 1.7, opacity: isSubmitted ? 0.6 : 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {rootCauses.length < 5 && !isSubmitted && (
              <button
                onClick={addRootCause}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px dashed #ccc',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#555',
                  transition: 'background-color 0.15s',
                  borderRadius: '4px',
                  marginTop: '0.5rem',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                + Add Root Cause ({rootCauses.length}/5)
              </button>
            )}

            <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.5rem' }}>
              {filledCount} of {rootCauses.length} blocks complete (minimum 3 required)
            </div>

            {/* Send button styled like email */}
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  backgroundColor: canSubmit ? '#0b57d0' : '#94b8e8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (canSubmit) e.currentTarget.style.backgroundColor = '#0842a0'
                }}
                onMouseLeave={(e) => {
                  if (canSubmit) e.currentTarget.style.backgroundColor = '#0b57d0'
                }}
              >
                {isSubmitted ? 'Sent' : 'Send'}
              </button>
            </div>
          </div>
        </LaptopFrame>
      </motion.div>

      {/* Reference Drawer */}
      <ReferenceDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Pipeline Data & Comments">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#000' }}>Sprint Metrics</h3>
          <MetricsTable metrics={metrics} />

          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#000', marginTop: '0.5rem' }}>Team Comments</h3>
          {quotes.map((q, i) => (
            <div
              key={i}
              style={{
                borderLeft: '3px solid #B87D6B',
                paddingLeft: '0.75rem',
                fontSize: '0.8125rem',
                lineHeight: 1.6,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                {q.speaker} <span style={{ fontWeight: 400, color: '#555' }}>({q.role})</span>
              </div>
              <div style={{ color: '#333' }}>{q.text}</div>
            </div>
          ))}
        </div>
      </ReferenceDrawer>
    </SceneWrapper>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#555',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#F7F1E3',
  border: '1px solid #ddd',
  padding: '0.5rem 0.75rem',
  fontSize: '0.875rem',
  fontFamily: 'Inter, system-ui, sans-serif',
  outline: 'none',
  borderRadius: '4px',
  color: '#000',
}
