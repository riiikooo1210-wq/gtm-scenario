import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { EmailData } from '../../types/game'

interface EmailBlockProps {
  email: EmailData
  delay?: number
  initialExpanded?: boolean
}

export default function EmailBlock({ email, delay = 0, initialExpanded = false }: EmailBlockProps) {
  const [expanded, setExpanded] = useState(initialExpanded)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      style={{
        backgroundColor: '#F2EBD9',
        border: '1px solid #000000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Collapsed: inbox row */}
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.75rem',
            cursor: 'pointer',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8DCC8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {/* Unread dot */}
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#B87D6B',
              flexShrink: 0,
            }}
          />
          {/* Mail icon (outlined SVG) */}
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#555"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 7L2 7" />
          </svg>
          {/* Sender */}
          <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#000', flexShrink: 0 }}>
            {email.from.split('(')[0].trim()}
          </span>
          {/* Subject */}
          <span
            style={{
              fontSize: '0.75rem',
              color: '#555',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              minWidth: 0,
            }}
          >
            {email.subject}
          </span>
          {email.isForwarded && (
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#B87D6B',
                flexShrink: 0,
              }}
            >
              FWD
            </span>
          )}
        </div>
      )}

      {/* Expanded: full email */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0.75rem 1.25rem',
                borderBottom: '1px solid #000',
                backgroundColor: '#E8DCC8',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {email.isForwarded && (
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000' }}>
                  Forwarded Email
                </span>
              )}
              <div style={{ fontSize: '0.75rem', color: '#555' }}>
                <strong>From:</strong> {email.from}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#555' }}>
                <strong>To:</strong> {email.to}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#000' }}>
                {email.subject}
              </div>
            </div>
            <div
              style={{
                padding: '1rem 1.25rem',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: '#000',
                whiteSpace: 'pre-wrap',
                fontStyle: 'italic',
              }}
            >
              {email.content}
            </div>
            {/* Collapse button */}
            <div style={{ padding: '0 1.25rem 0.5rem', textAlign: 'right' }}>
              <button
                onClick={() => setExpanded(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.6875rem',
                  color: '#555',
                  cursor: 'pointer',
                  padding: '0.125rem 0.25rem',
                }}
              >
                Collapse
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
