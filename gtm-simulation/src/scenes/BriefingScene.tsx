import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '../components/layout/SceneWrapper'
import { useScrollToTopOnChange } from '../components/hooks/useScrollToTopOnChange'
import ActionButton from '../components/ui/ActionButton'
import SlackMessageEnhanced from '../components/ui/SlackMessageEnhanced'
import EmailBlock from '../components/ui/EmailBlock'
import MetricsTable from '../components/ui/MetricsTable'
import QuoteBlock from '../components/ui/QuoteBlock'
import LaptopFrame from '../components/ui/LaptopFrame'
import { renderContentWithGlossary } from '../components/ui/JargonTerm'
import { ChartIcon } from '../components/ui/Icons'
import { useGameStore } from '../store/gameStore'
import type { ReactNode } from 'react'
import type { GtmNode, QuoteData } from '../types/game'

interface Props { node: GtmNode }

const difficultyLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Easy', color: '#3A6B5E' },
  2: { label: 'Medium', color: '#B87D6B' },
  3: { label: 'Hard', color: '#c0392b' },
}

/** Desktop background with overlaid content — messages appear ON the desktop */
function DesktopOverlay({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 'calc(100% + 6rem)',
        marginLeft: '-3rem',
        marginRight: '-3rem',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
        overflow: 'hidden',
      }}
    >
      {/* Full desktop image as the base layer */}
      <img
        src="/desktop.jpg"
        alt=""
        style={{ width: '100%', display: 'block' }}
      />
      {/* Content overlaid on the image, centered and shifted slightly above center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '3%',
        }}
      >
        <div style={{ width: '75%', height: '80%', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/** Inline illustration block used within briefing content */
function InlineIllustration({ src }: { src: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div
      style={{
        width: 'calc(100% + 6rem)',
        marginLeft: '-3rem',
        marginRight: '-3rem',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
        backgroundColor: '#E8DCC8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {failed ? (
        <span style={{ fontSize: '0.8125rem', color: '#999', fontStyle: 'italic' }}>Image Placeholder</span>
      ) : (
        <img
          src={src}
          alt=""
          decoding="sync"
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

/** Scenario 2 sequential briefing sub-step view */
function S2SequentialBriefing({ node }: { node: GtmNode }) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const topAccount = useGameStore((s) => s.accounts[0]?.name?.trim() || 'your top-priority account')
  const [subStep, setSubStep] = useState(0)
  const [showData, setShowData] = useState(false)
  useScrollToTopOnChange(subStep)

  const quotes = (node.quotes || []).map((q) => ({
    ...q,
    text: q.text.replace('{{TOP_ACCOUNT}}', topAccount),
  }))
  const metrics = node.metrics || []

  // Per-sub-step background images
  const subStepIllustrations = [
    '/pipeline.jpg',  // subStep 0: metrics table
    '/jordan.jpg',    // subStep 1: Jordan's quote
    '/dana.jpg',      // subStep 2: Dana's quote 1
    '/dana_private.jpg',      // subStep 3: Dana's quote 2 (private)
  ]

  // Preload all illustrations on mount so swapping pages is instant
  useEffect(() => {
    subStepIllustrations.forEach((src) => {
      const img = new Image()
      img.src = src
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sub-steps: 0 = data, 1..N = each quote
  const totalSteps = 1 + quotes.length

  return (
    <>
      <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#000' }}>
        {renderContentWithGlossary(node.content)}
      </p>

      {subStep === 0 ? (
        <div
          key="data"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <InlineIllustration src={subStepIllustrations[0]} />
          <LaptopFrame variant="doc" title="Sprint Metrics">
            <div
              style={{
                fontSize: '0.6875rem',
                fontStyle: 'italic',
                color: '#666',
                marginBottom: '0.5rem',
              }}
            >
              If the table isn’t fully visible, scroll to the side.
            </div>
            <MetricsTable metrics={metrics} />
          </LaptopFrame>
        </div>
      ) : (
        <div
          key={`quote-${subStep}`}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <InlineIllustration src={subStepIllustrations[subStep]} />
          <QuoteCardWithAvatar quote={quotes[subStep - 1]} />
        </div>
      )}

      {/* View Data button (visible on quote steps) */}
      {subStep > 0 && (
        <>
          <button
            onClick={() => setShowData(!showData)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              backgroundColor: '#E8DCC8',
              border: '1px solid #000',
              boxShadow: '2px 2px 0 #000',
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#333',
              cursor: 'pointer',
              fontFamily: 'Inter, system-ui, sans-serif',
              alignSelf: 'flex-start',
            }}
          >
            {showData ? 'Hide Data' : <><ChartIcon size={14} /> View Data</>}
          </button>
          {showData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LaptopFrame variant="doc" title="Sprint Metrics">
                <MetricsTable metrics={metrics} />
              </LaptopFrame>
            </motion.div>
          )}
        </>
      )}

<div style={{ display: 'flex', gap: '0.75rem' }}>
        {subStep > 0 && (
          <ActionButton text="Back" onClick={() => setSubStep(subStep - 1)} variant="secondary" />
        )}
        {subStep < totalSteps - 1 ? (
          <ActionButton text="Next" onClick={() => setSubStep(subStep + 1)} variant="secondary" />
        ) : (
          <ActionButton text="Start the Task" onClick={() => navigateTo(node.next!)} />
        )}
      </div>
    </>
  )
}

/** Scenario 3 paginated briefing — split into 2 reversible pages */
function S3PaginatedBriefing({ node, playerName }: { node: GtmNode; playerName: string }) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const [page, setPage] = useState(0)

  const slackMessages = node.slackMessages || []
  const emails = node.emails || []
  const quotes = node.quotes || []

  useScrollToTopOnChange(page)

  // Preload the desktop background so it's cached before the user clicks Next
  useEffect(() => {
    const img = new Image()
    img.src = '/desktop.jpg'
  }, [])

  return (
    <>
      {page === 0 ? (
        <div
          key="page1"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#000' }}>
            {renderContentWithGlossary(node.content)}
          </p>

          {/* Hannah Liu's Slack + Dana's text message on desktop background */}
          {slackMessages.length > 0 && (
            <DesktopOverlay>
              <LaptopFrame variant="slack" title="#product-launches" scrollable fill>
                {slackMessages.map((msg, i) => (
                  <SlackMessageEnhanced key={i} message={{ ...msg, content: msg.content.replace('{{PLAYER_NAME}}', playerName || 'You') }} delay={i * 0.15} />
                ))}
              </LaptopFrame>
            </DesktopOverlay>
          )}
        </div>
      ) : (
        <div
          key="page2"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
            {/* Sandra's forwarded email on desktop background */}
            {emails.length > 0 && (
              <DesktopOverlay>
              <LaptopFrame variant="email-read" title={emails[0].subject} scrollable fill>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '-0.5rem' }}>
                  {/* Email header fields — matches S2 diagnostic memo style */}
                  <div style={{ borderBottom: '1px solid #e0e0e0', padding: '0 0 0.5rem 0' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', padding: '0 0 0.25rem 0' }}>
                      <span style={{ color: '#999', fontWeight: 500, width: '50px' }}>From:</span>
                      <span style={{ color: '#000' }}>{emails[0].from}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', padding: '0.25rem 0' }}>
                      <span style={{ color: '#999', fontWeight: 500, width: '50px' }}>To:</span>
                      <span style={{ color: '#000' }}>{(emails[0].to || '').replace('You', playerName || 'You')}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8125rem', padding: '0.25rem 0' }}>
                      <span style={{ color: '#999', fontWeight: 500, width: '50px' }}>Re:</span>
                      <span style={{ color: '#000' }}>{emails[0].subject}</span>
                    </div>
                  </div>
                  {/* Email body */}
                  <div
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.7,
                      color: '#000',
                      whiteSpace: 'pre-wrap',
                      paddingTop: '1rem',
                    }}
                  >
                    {emails[0].content}
                  </div>
                </div>
              </LaptopFrame>
              </DesktopOverlay>
            )}

          {/* Additional context quote */}
          {quotes.map((quote, i) => (
            <QuoteBlock key={i} quote={quote} delay={i * 0.1} />
          ))}
        </div>
      )}

      {/* Page indicator */}
      <div style={{ fontSize: '0.6875rem', color: '#999', textAlign: 'center' }}>
        {page + 1} of 2
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {page > 0 && (
          <ActionButton text="Back" onClick={() => setPage(0)} variant="secondary" />
        )}
        {page === 0 ? (
          <ActionButton text="Next" onClick={() => setPage(1)} variant="secondary" />
        ) : (
          <ActionButton text="Start the Task" onClick={() => navigateTo(node.next!)} />
        )}
      </div>
    </>
  )
}

/** Avatar + quote card for sequential S2 briefing */
function QuoteCardWithAvatar({ quote }: { quote: QuoteData }) {
  const initials = quote.speaker
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const colors = ['#E07A5F', '#3D405B', '#81B29A', '#F2CC8F', '#6A4C93', '#1982C4']
  let hash = 0
  for (let i = 0; i < quote.speaker.length; i++) hash = quote.speaker.charCodeAt(i) + ((hash << 5) - hash)
  const bgColor = colors[Math.abs(hash) % colors.length]

  return (
    <div
      style={{
        border: '1px solid #000',
        boxShadow: '4px 4px 0 #000',
        backgroundColor: '#F2EBD9',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Person header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Avatar placeholder */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 700 }}>
            {initials}
          </span>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#000' }}>
            {quote.speaker}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#555' }}>
            {quote.role}
          </div>
        </div>
      </div>

      {/* Quote text */}
      <div
        style={{
          fontSize: '0.875rem',
          lineHeight: 1.7,
          color: '#333',
          fontStyle: 'italic',
          borderLeft: '3px solid #B87D6B',
          paddingLeft: '0.75rem',
        }}
      >
        {renderContentWithGlossary(quote.text)}
      </div>
    </div>
  )
}

export default function BriefingScene({ node }: Props) {
  const navigateTo = useGameStore((s) => s.navigateTo)
  const playerName = useGameStore((s) => s.playerName)
  const diff = difficultyLabels[node.scenario] || { label: '', color: '#555' }

  const isS2 = node.id === 's2_briefing'
  const isS3 = node.id === 's3_briefing'

  return (
    <SceneWrapper illustration={node.illustration} hideIllustration>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                backgroundColor: diff.color,
                color: '#F2EBD9',
                padding: '0.2rem 0.5rem',
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {diff.label}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#555' }}>
              Scenario {node.scenario} of 3
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#000', lineHeight: 1.3 }}>
            {node.title}
          </h2>
        </div>

        {isS2 ? (
          <S2SequentialBriefing node={node} />
        ) : isS3 ? (
          <S3PaginatedBriefing node={node} playerName={playerName} />
        ) : (
          <>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#000' }}>
              {renderContentWithGlossary(node.content)}
            </p>

            {/* Slack messages overlaid on desktop background */}
            {node.slackMessages && node.slackMessages.length > 0 && (
              <DesktopOverlay>
                <LaptopFrame variant="slack" title="Slack" scrollable fill>
                  {node.slackMessages.map((msg, i) => (
                    <SlackMessageEnhanced key={i} message={{ ...msg, content: msg.content.replace('{{PLAYER_NAME}}', playerName || 'you') }} delay={i * 0.15} />
                  ))}
                </LaptopFrame>
              </DesktopOverlay>
            )}

            {/* Emails overlaid on desktop background */}
            {node.emails && node.emails.length > 0 && (
              <DesktopOverlay>
                <LaptopFrame variant="email" title={node.emails[0].subject} scrollable fill>
                  {node.emails.map((email, i) => (
                    <EmailBlock key={i} email={email} delay={i * 0.15} />
                  ))}
                </LaptopFrame>
              </DesktopOverlay>
            )}

            {node.metrics && <MetricsTable metrics={node.metrics} />}

            {node.quotes?.map((quote, i) => (
              <QuoteBlock key={i} quote={quote} delay={i * 0.1} />
            ))}

            <ActionButton text="Start the Task" onClick={() => navigateTo(node.next!)} />
          </>
        )}
      </motion.div>
    </SceneWrapper>
  )
}
