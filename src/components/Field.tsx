import { useState } from 'react'
import type { CSSProperties } from 'react'

export function Field({ label, as = 'input', options = [], wide = false, style, ...rest }: {
  label: string
  as?: 'input' | 'select' | 'textarea'
  options?: string[]
  wide?: boolean
  style?: CSSProperties
  [key: string]: unknown
}) {
  const [focus, setFocus] = useState(false)
  const control: CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 400,
    color: 'var(--color-slate-ink)',
    padding: '13px 14px',
    border: `1px solid ${focus ? 'var(--color-steel)' : 'var(--border-hair)'}`,
    borderRadius: 2,
    background: 'var(--color-paper-2)',
    boxShadow: focus ? '0 0 0 3px rgba(110, 231, 183, 0.14), 0 0 18px rgba(79, 209, 197, 0.18)' : 'none',
    outline: 'none',
    transition: 'border-color var(--dur), box-shadow var(--dur)',
    width: '100%',
  }
  const shared = { onFocus: () => setFocus(true), onBlur: () => setFocus(false), ...rest }
  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: focus ? 'var(--color-steel-bright)' : 'var(--color-slate-2)',
        transition: 'color var(--dur)',
        gridColumn: wide ? '1 / -1' : undefined,
        ...style,
      }}
    >
      {label}
      {as === 'select' ? (
        <select style={control} {...shared}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea style={{ ...control, resize: 'vertical' }} {...shared} />
      ) : (
        <input style={control} {...shared} />
      )}
    </label>
  )
}
