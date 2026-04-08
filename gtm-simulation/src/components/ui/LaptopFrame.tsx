import type { ReactNode } from 'react'

interface LaptopFrameProps {
  children: ReactNode
  variant?: 'doc' | 'email' | 'email-read' | 'slack'
  title?: string
  scrollable?: boolean
  fill?: boolean
}

const menuItems: Record<string, string[]> = {
  doc: ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools'],
  email: ['File', 'Edit', 'View', 'Format'],
  'email-read': [],
  slack: [],
}

export default function LaptopFrame({ children, variant = 'doc', title, scrollable = false, fill = false }: LaptopFrameProps) {
  const defaultTitles: Record<string, string> = {
    doc: 'Untitled document',
    email: 'New Message',
    'email-read': 'Message',
    slack: 'Slack',
  }

  const displayTitle = title || defaultTitles[variant]
  const menus = menuItems[variant]

  return (
    <div
      style={{
        border: '2px solid #333',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        backgroundColor: '#F2EBD9',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        ...(fill ? { flex: 1, height: '100%', width: '100%' } : {}),
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          backgroundColor: variant === 'slack' ? '#3F0E40' : '#e8e8e8',
          borderBottom: '1px solid #ccc',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840', display: 'inline-block' }} />
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            color: variant === 'slack' ? '#e8d5e0' : '#666',
            fontWeight: 500,
            marginLeft: '0.5rem',
            flex: 1,
            textAlign: 'center',
          }}
        >
          {displayTitle}
        </span>
        {/* Spacer for centering */}
        <div style={{ width: 54 }} />
      </div>

      {/* Menu bar (doc/email only) */}
      {menus.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.125rem',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          {menus.map((item) => (
            <span
              key={item}
              style={{
                fontSize: '0.7rem',
                color: '#555',
                padding: '0.15rem 0.4rem',
                borderRadius: '2px',
                cursor: 'default',
                userSelect: 'none',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Slack sidebar header (slack only) */}
      {variant === 'slack' && (
        <div
          style={{
            backgroundColor: '#f8f8f8',
            borderBottom: '1px solid #e0e0e0',
            padding: '0.5rem 0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1d1c1d' }}>
            {displayTitle}
          </span>
        </div>
      )}

      {/* Content area */}
      <div
        style={{
          padding: variant === 'slack' ? '0' : '1.25rem',
          backgroundColor: '#F7F1E3',
          flex: '1 1 auto',
          minHeight: 0,
          overflowY: 'auto' as const,
        }}
      >
        {children}
      </div>

      {/* Laptop base/bezel */}
      <div
        style={{
          height: '12px',
          backgroundColor: '#d4d4d4',
          borderTop: '1px solid #bbb',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#bbb',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  )
}
