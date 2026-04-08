import { motion } from 'framer-motion'
import type { AccountEntry } from '../../types/game'

interface AccountFieldProps {
  index: number
  account: AccountEntry
  onChange: (field: keyof AccountEntry, value: string) => void
  disabled?: boolean
}

export default function AccountField({ index, account, onChange, disabled = false }: AccountFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
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
          }}
        >
          {index + 1}
        </span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555' }}>
          Priority #{index + 1}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <label style={labelStyle}>Company Name</label>
        <input
          type="text"
          value={account.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g., Meridian Health Systems"
          disabled={disabled}
          style={{ ...inputStyle, opacity: disabled ? 0.6 : 1 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <label style={labelStyle}>Rationale (2–3 sentences: why this account fits, angle of entry)</label>
        <textarea
          value={account.rationale}
          onChange={(e) => onChange('rationale', e.target.value)}
          placeholder="Why would they buy from Vantage Shield? What's the trigger or pain point?"
          rows={3}
          disabled={disabled}
          style={{ ...inputStyle, resize: 'none', lineHeight: 1.7, opacity: disabled ? 0.6 : 1 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <label style={labelStyle}>Suggested First Contact (title/role)</label>
        <input
          type="text"
          value={account.contact}
          onChange={(e) => onChange('contact', e.target.value)}
          placeholder="e.g., VP of Cloud Security"
          disabled={disabled}
          style={{ ...inputStyle, opacity: disabled ? 0.6 : 1 }}
        />
      </div>
    </motion.div>
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
