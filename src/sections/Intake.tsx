import React, { useState } from 'react'
import { Eyebrow } from '../components/Eyebrow'
import { Field } from '../components/Field'
import { Button } from '../components/Button'
import { useLang } from '../i18n/LangContext'

const wrap: React.CSSProperties = { maxWidth: 1120, margin: '0 auto', padding: '0 40px' }

export function Intake() {
  const [sent, setSent] = useState(false)
  const { t } = useLang()
  const typeOptions: string[] = t('intake.typeOptions').split('||')
  return (
    <section id="contact" style={{ paddingBottom: 104 }}>
      <div style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 64, background: 'var(--color-white)', border: '1px solid var(--border-hair)', borderRadius: 'var(--radius-md)', padding: 60 }}>
          <div>
            <Eyebrow>{t('intake.eyebrow')}</Eyebrow>
            <h2 style={{ font: 'var(--type-h2)', letterSpacing: 'var(--tracking-display)', margin: '16px 0 16px' }}>{t('intake.title1')}<br />{t('intake.title2')}</h2>
            <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 'var(--leading-body)', margin: 0 }}>
              {t('intake.sub')}
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
          >
            <Field label={t('intake.name')} placeholder={t('intake.namePlaceholder')} required />
            <Field label={t('intake.company')} placeholder={t('intake.companyPlaceholder')} />
            <Field label={t('intake.contact')} placeholder={t('intake.contactPlaceholder')} required />
            <Field label={t('intake.type')} as="select" options={typeOptions} />
            <Field label={t('intake.description')} as="textarea" rows={4} wide placeholder={t('intake.descPlaceholder')} />
            {sent && (
              <p style={{ gridColumn: '1 / -1', margin: 0, fontSize: 13, color: 'var(--color-steel)' }}>
                {t('intake.success')}
              </p>
            )}
            <Button as="button" type="submit" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 15 }}>
              {sent ? t('intake.submitted') : t('intake.submit')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
