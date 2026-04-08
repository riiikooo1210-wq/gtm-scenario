import { useState, useRef, useEffect, createContext, useContext, useCallback } from 'react'
import { glossary } from '../../data/glossary'
import { useGameStore } from '../../store/gameStore'

// --- Jargon deduplication context ---
const JargonSeenContext = createContext<Set<string>>(new Set())

export function JargonProvider({ nodeId, children }: { nodeId: string; children: React.ReactNode }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const seen = useRef(new Set<string>())
  // Reset when nodeId changes
  useEffect(() => {
    seen.current = new Set<string>()
  }, [nodeId])
  return <JargonSeenContext.Provider value={seen.current}>{children}</JargonSeenContext.Provider>
}

interface JargonTermProps {
  term: string
  children?: React.ReactNode
}

export default function JargonTerm({ term, children }: JargonTermProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const trackDefinitionClick = useGameStore((s) => s.trackDefinitionClick)
  const seenTerms = useContext(JargonSeenContext)

  const definition = glossary[term]
  if (!definition) return <>{children || term}</>

  const isFirstOccurrence = !seenTerms.has(term)
  if (isFirstOccurrence) seenTerms.add(term)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isOpen) {
      trackDefinitionClick(term)
    }
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!isOpen) return
    const handleOutside = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [isOpen])

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline' }}>
      {children || term}
      {isFirstOccurrence && (
        <span
          onClick={handleClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '14px',
            height: '14px',
            fontSize: '0.5625rem',
            fontWeight: 700,
            color: '#fff',
            backgroundColor: '#B87D6B',
            borderRadius: '50%',
            cursor: 'pointer',
            marginLeft: '2px',
            verticalAlign: 'super',
            lineHeight: 1,
            userSelect: 'none',
            position: 'relative',
            top: '-2px',
          }}
          title={`What is ${term}?`}
        >
          ?
        </span>
      )}
      {isOpen && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1d1c1d',
            color: '#fff',
            padding: '0.625rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            lineHeight: 1.5,
            width: '260px',
            maxWidth: '80vw',
            zIndex: 100,
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#C99080' }}>
            {term}
          </div>
          {definition}
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #1d1c1d',
            }}
          />
        </div>
      )}
    </span>
  )
}

/**
 * Parses text containing {{term}} markers and returns JSX with JargonTerm components.
 * Usage: renderContentWithGlossary("We have {{SOC 2 Type II}} certification")
 */
export function renderContentWithGlossary(text: string): React.ReactNode {
  const parts = text.split(/(\{\{[^}]+\}\})/)
  return parts.map((part, i) => {
    const match = part.match(/^\{\{(.+)\}\}$/)
    if (match) {
      return <JargonTerm key={i} term={match[1]} />
    }
    return part
  })
}
