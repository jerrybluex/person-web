import React from 'react'

/**
 * Labelled form field. Renders a label over an input / select / textarea, all
 * sharing the sharp 2px, steel-focus treatment. `as` picks the control.
 */
export function Field({ label, as = 'input', options = [], wide = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  const control = {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 400,
    color: 'var(--color-slate-ink)',
    padding: '13px 14px',
    border: `1px solid ${focus ? 'var(--color-steel)' : 'var(--border-hair)'}`,
    borderRadius: 'var(--radius)',
    background: 'var(--color-paper)',
    boxShadow: focus ? '0 0 0 3px rgba(61,90,115,.12)' : 'none',
    outline: 'none',
    transition: 'border-color var(--dur), box-shadow var(--dur)',
    width: '100%',
  }
  const shared = { style: control, onFocus: () => setFocus(true), onBlur: () => setFocus(false), ...rest }
  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--color-slate-2)',
        gridColumn: wide ? '1 / -1' : undefined,
        ...style,
      }}
    >
      {label}
      {as === 'select' ? (
        <select {...shared}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea {...shared} style={{ ...control, resize: 'vertical' }} />
      ) : (
        <input {...shared} />
      )}
    </label>
  )
}
