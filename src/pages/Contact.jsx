import { useState } from 'react'
import { contact } from '../lib/content'
import useDocumentMeta from '../lib/useDocumentMeta'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import { iconByName, ArrowRight, Download } from '../components/Icons'

const emailOf = () =>
  contact.channels.find((c) => c.type === 'email')?.value ?? ''

function Field({ field, value, onChange }) {
  const id = `field-${field.name}`
  const shared = {
    id,
    name: field.name,
    required: field.required,
    value,
    onChange: (e) => onChange(field.name, e.target.value),
  }

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {field.label}
        {field.required && <span> *</span>}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          {...shared}
          rows={field.rows || 6}
          placeholder={field.placeholder}
        />
      ) : field.type === 'select' ? (
        <select {...shared}>
          <option value="">Please choose…</option>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...shared}
          type={field.type || 'text'}
          placeholder={field.placeholder}
          autoComplete={
            field.type === 'email' ? 'email' : field.name === 'name' ? 'name' : 'on'
          }
        />
      )}
    </div>
  )
}

function ContactForm() {
  const { form } = contact
  const [values, setValues] = useState(() =>
    Object.fromEntries(form.fields.map((f) => [f.name, ''])),
  )
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const set = (name, value) => setValues((v) => ({ ...v, [name]: value }))

  const buildMailto = () => {
    const subject = values.subject || 'Portfolio enquiry'
    const body = form.fields
      .filter((f) => f.name !== 'subject')
      .map((f) => `${f.label}: ${values[f.name] || '—'}`)
      .join('\n')
    return `mailto:${emailOf()}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    // No endpoint configured — hand off to the visitor's mail client.
    if (!form.endpoint) {
      window.location.href = buildMailto()
      setStatus({
        tone: 'success',
        message: 'Your email app should now be open with the message ready to send.',
      })
      return
    }

    setSending(true)
    try {
      const response = await fetch(form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus({ tone: 'success', message: form.successMessage })
      setValues(Object.fromEntries(form.fields.map((f) => [f.name, ''])))
    } catch {
      setStatus({ tone: 'error', message: form.errorMessage })
    } finally {
      setSending(false)
    }
  }

  const [first, second, ...rest] = form.fields

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div>
        <h2 className="display-3" style={{ fontSize: '1.5rem' }}>
          {form.heading}
        </h2>
        {form.description && (
          <p className="muted" style={{ marginTop: '0.4rem', fontSize: '0.93rem' }}>
            {form.description}
          </p>
        )}
      </div>

      <div className="form__row">
        {[first, second].filter(Boolean).map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={set}
          />
        ))}
      </div>

      {rest.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={set}
        />
      ))}

      {status && (
        <p className="form__status" data-tone={status.tone} role="status">
          {status.message}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <button type="submit" className="btn btn--primary" disabled={sending}>
          {sending ? 'Sending…' : form.submitLabel}
          {!sending && <ArrowRight width={16} height={16} />}
        </button>
        <span className="form__hint">{contact.responseNote}</span>
      </div>
    </form>
  )
}

export default function Contact() {
  useDocumentMeta('Contact', contact.lead)

  return (
    <>
      <PageHead
        eyebrow={contact.eyebrow}
        title={contact.title}
        lead={contact.lead}
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section">
        <div className="shell contact-grid">
          <Reveal style={{ display: 'grid', gap: '1.5rem' }}>
            {contact.availability?.label && (
              <p className="hero__badge" style={{ position: 'static' }}>
                <span className="pulse" />
                {contact.availability.label}
              </p>
            )}

            <div className="contact-channels">
              {contact.channels.map((channel) => {
                const Icon = iconByName[channel.type] ?? iconByName.mail
                const body = (
                  <>
                    <span className="contact-channel__icon">
                      <Icon width={17} height={17} />
                    </span>
                    <span className="contact-channel__body">
                      <span className="contact-channel__label">
                        {channel.label}
                      </span>
                      <span className="contact-channel__value">
                        {channel.value}
                      </span>
                    </span>
                  </>
                )

                return channel.href ? (
                  <a
                    className="contact-channel"
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="contact-channel" key={channel.label}>
                    {body}
                  </div>
                )
              })}
            </div>

            {contact.cta && (
              <div className="callout" style={{ display: 'grid', gap: '0.85rem' }}>
                <strong>{contact.cta.title}</strong>
                <span className="muted">{contact.cta.body}</span>
                <a
                  href={contact.cta.href}
                  download
                  className="btn btn--ghost btn--small"
                  style={{ justifySelf: 'start' }}
                >
                  <Download width={15} height={15} />
                  {contact.cta.label}
                </a>
              </div>
            )}
          </Reveal>

          {contact.form?.enabled && (
            <Reveal delay={80}>
              <ContactForm />
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
