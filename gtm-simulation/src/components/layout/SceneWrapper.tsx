import { ReactNode } from 'react'
import { useGameStore } from '../../store/gameStore'
import { JargonProvider } from '../ui/JargonTerm'

interface SceneWrapperProps {
  children: ReactNode
  illustration?: string
  showBack?: boolean
  hideIllustration?: boolean
  backLabel?: string
}

export default function SceneWrapper({ children, illustration, showBack = false, hideIllustration = false, backLabel = 'Back to briefing' }: SceneWrapperProps) {
  const visitedNodes = useGameStore((s) => s.visitedNodes)
  const goBack = useGameStore((s) => s.goBack)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const canGoBack = showBack && visitedNodes.length > 1

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#6B9EA6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          width: 'min(calc(100vw - 2rem), 900px)',
          backgroundColor: '#F2EBD9',
          border: '1px solid #000000',
          boxShadow: '8px 8px 0px #000000',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {illustration && !hideIllustration && (
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
              borderBottom: '1px solid #000000',
              backgroundColor: '#E8DCC8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={illustration}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
              }}
            />
          </div>
        )}

        <div
          style={{
            padding: '2.5rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {canGoBack && (
            <div style={{ marginBottom: '-0.25rem' }}>
              <button
                onClick={goBack}
                style={{
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  padding: '0',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'rgba(0,0,0,0.45)',
                  letterSpacing: '0.01em',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.75)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.45)')}
              >
                ← {backLabel}
              </button>
            </div>
          )}
          <JargonProvider nodeId={currentNodeId}>
            {children}
          </JargonProvider>
        </div>
      </div>
    </div>
  )
}
