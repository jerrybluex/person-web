import React, { useState } from 'react'
import { Eyebrow } from '../components/Eyebrow'
import { Field } from '../components/Field'
import { Button } from '../components/Button'

const wrap: React.CSSProperties = { maxWidth: 1120, margin: '0 auto', padding: '0 40px' }

export function Intake() {
  const [sent, setSent] = useState(false)
  return (
    <section id="contact" style={{ paddingBottom: 104 }}>
      <div style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 64, background: 'var(--color-white)', border: '1px solid var(--border-hair)', borderRadius: 'var(--radius-md)', padding: 60 }}>
          <div>
            <Eyebrow>Project Intake</Eyebrow>
            <h2 style={{ font: 'var(--type-h2)', letterSpacing: 'var(--tracking-display)', margin: '16px 0 16px' }}>告诉我们，智能<br />应该出现在哪里</h2>
            <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 'var(--leading-body)', margin: 0 }}>
              留下你的业务问题。首版表单仅做本地校验，正式上线时可接入邮件、飞书、企业微信或 CRM
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
          >
            <Field label="姓名" placeholder="例如：李先生" required />
            <Field label="公司" placeholder="例如：某某智能制造有限公司" />
            <Field label="联系方式" placeholder="手机号或邮箱" required />
            <Field label="需求类型" as="select" options={['综合咨询', '智能硬件', '智能体', '大模型定制']} />
            <Field label="项目描述" as="textarea" rows={4} wide placeholder="简单描述业务目标、现有系统或希望解决的问题" />
            {sent && (
              <p style={{ gridColumn: '1 / -1', margin: 0, fontSize: 13, color: 'var(--color-steel)' }}>
                已收到咨询信息。正式接入后即可发送给团队
              </p>
            )}
            <Button as="button" type="submit" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 15 }}>
              {sent ? '已提交' : '提交咨询'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
