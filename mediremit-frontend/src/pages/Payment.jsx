import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'https://mediremit-backend.onrender.com'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0f1e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    padding: '2.5rem',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'fadeInUp 0.4s ease',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#00d084',
    cursor: 'pointer',
    marginBottom: '1.2rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    padding: 0,
    transition: 'color 0.2s ease',
  },
  title: {
    color: '#ffffff',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: 700,
    letterSpacing: '-0.3px',
  },
  hospitalBox: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1.2rem 1.4rem',
    borderRadius: '14px',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  hospitalIconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'rgba(0, 208, 132, 0.15)',
    color: '#00d084',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    flexShrink: 0,
  },
  hospitalName: {
    margin: 0,
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: 1.3,
  },
  hospitalLocation: {
    margin: '0.2rem 0 0',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  errorBox: {
    background: 'rgba(229, 62, 62, 0.1)',
    border: '1px solid rgba(229, 62, 62, 0.2)',
    color: '#fc8181',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    marginBottom: '1.2rem',
    fontSize: '0.88rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: '1.4rem',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.4)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.85rem 0.85rem 0.85rem 2.6rem',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    outline: 'none',
    background: '#1a2035',
    color: '#ffffff',
  },
  inputFocus: {
    borderColor: '#00d084',
    boxShadow: '0 0 0 3px rgba(0, 208, 132, 0.15)',
  },
  fxBox: {
    background: 'rgba(0, 208, 132, 0.08)',
    border: '1px solid rgba(0, 208, 132, 0.2)',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    marginBottom: '1.4rem',
    display: 'flex',
    justifyContent: 'space-around',
    gap: '1rem',
  },
  fxItem: {
    textAlign: 'center',
  },
  fxLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.75rem',
    marginBottom: '0.2rem',
  },
  fxValue: {
    color: '#00d084',
    fontWeight: 700,
    fontSize: '0.95rem',
  },
  amountPreview: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.82rem',
    marginTop: '-0.8rem',
    marginBottom: '1.4rem',
    paddingLeft: '0.2rem',
  },
  select: {
    width: '100%',
    padding: '0.85rem 0.85rem 0.85rem 2.6rem',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    outline: 'none',
    background: '#1a2035',
    color: '#ffffff',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
  },
  textarea: {
    width: '100%',
    padding: '0.85rem 0.85rem 0.85rem 2.6rem',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    outline: 'none',
    background: '#1a2035',
    color: '#ffffff',
    resize: 'vertical',
    minHeight: '70px',
    maxHeight: '120px',
  },
  charCount: {
    textAlign: 'right',
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.75rem',
    marginTop: '0.3rem',
    marginBottom: '0.5rem',
  },
  specialtyTag: {
    background: 'rgba(0, 208, 132, 0.15)',
    color: '#00d084',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: 500,
    border: '1px solid rgba(0, 208, 132, 0.2)',
    display: 'inline-block',
  },
  specialtyRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.3rem',
    marginTop: '0.6rem',
  },
  summaryCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(0, 208, 132, 0.2)',
    borderRadius: '14px',
    padding: '1.2rem 1.4rem',
    marginBottom: '1.4rem',
  },
  summaryTitle: {
    color: '#00d084',
    fontWeight: 700,
    fontSize: '0.85rem',
    marginBottom: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.4rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.85rem',
  },
  summaryValue: {
    color: '#ffffff',
    fontSize: '0.85rem',
    fontWeight: 600,
    textAlign: 'right',
    maxWidth: '60%',
  },
  payButton: {
    width: '100%',
    padding: '0.95rem',
    background: '#00d084',
    color: '#0a0f1e',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.05rem',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
    boxShadow: '0 4px 15px rgba(0, 208, 132, 0.2)',
    letterSpacing: '0.3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  payButtonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  securityNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    marginTop: '1rem',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '0.8rem',
  },
}

export default function Payment() {
  const { state } = useLocation()
  const hospital = state?.hospital
  const navigate = useNavigate()
  const [form, setForm] = useState({ patientName: '', patientId: '', amount: '', treatment: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')
  const [fxRates, setFxRates] = useState({ USD: 1650, GBP: 2100 })
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/NGN')
      .then(res => res.json())
      .then(data => {
        setFxRates({
          USD: (1 / data.rates.USD).toFixed(2),
          GBP: (1 / data.rates.GBP).toFixed(2)
        })
      })
      .catch(() => setFxRates({ USD: 1650, GBP: 2100 }))
  }, [])

  const [showLinkModal, setShowLinkModal] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')
  const [linkLoading, setLinkLoading] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const handlePay = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const transactionRef = `MEDIREMIT-${Date.now()}`
      await axios.post(`${API}/transactions`, {
        hospitalId: hospital.id,
        patientName: form.patientName,
        patientId: form.patientId,
        amount: form.amount,
        transactionRef,
        description: `Payment for ${form.patientName} at ${hospital.name}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Redirect to realistic payment simulator
      navigate('/payment-gateway', {
        state: {
          paymentInfo: {
            amount: form.amount,
            hospitalName: hospital.name,
            patientName: form.patientName,
            hospitalId: hospital.id,
            email: user.email,
            transactionRef,
          }
        }
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed')
      setLoading(false)
    }
  }

  const handleGenerateLink = async () => {
    if (!form.patientName || !form.amount || !form.treatment) {
      setError('Please fill in Patient Name, Treatment Category, and Amount to generate a link.')
      return
    }
    setLinkLoading(true)
    setError('')
    try {
      const res = await axios.post(`${API}/paylink/create`, {
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        hospitalLocation: hospital.location,
        patientName: form.patientName,
        patientId: form.patientId,
        treatment: form.treatment,
        amount: form.amount,
        note: form.note,
        origin: window.location.origin
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setGeneratedLink(res.data.paymentUrl)
      setShowLinkModal(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate link')
    } finally {
      setLinkLoading(false)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  if (!hospital) {
    navigate('/hospitals')
    return null
  }

  const formattedAmount = form.amount
    ? `₦${Number(form.amount).toLocaleString()}`
    : '₦0'

  return (
    <div style={styles.page} className="mr-page-center">
      <div style={styles.card} className="mr-auth-card">
        <button
          onClick={() => navigate('/hospitals')}
          style={styles.backBtn}
          onMouseEnter={e => (e.target.style.color = '#00b975')}
          onMouseLeave={e => (e.target.style.color = '#00d084')}
        >
          ← Back to hospitals
        </button>

        <h2 style={styles.title}>Make Payment</h2>

        <div style={styles.hospitalBox} className="mr-hospital-box">
          <div style={styles.hospitalIconBox}>🏥</div>
          <div>
            <p style={styles.hospitalName}>{hospital.name}</p>
            <p style={styles.hospitalLocation}>
              <span style={{ color: '#e53e3e' }}>📍</span> {hospital.location}
            </p>
            {hospital.specialties && hospital.specialties.length > 0 && (
              <div style={styles.specialtyRow}>
                {hospital.specialties.map(s => (
                  <span key={s} style={styles.specialtyTag}>{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handlePay}>
          <label style={styles.label}>Patient Name</label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>👤</span>
            <input
              type="text"
              placeholder="Enter patient's full name"
              value={form.patientName}
              onFocus={() => setFocused('patientName')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, patientName: e.target.value})}
              style={{
                ...styles.input,
                ...(focused === 'patientName' ? styles.inputFocus : {}),
              }}
              required
            />
          </div>

          <label style={styles.label}>Patient ID / Hospital Number <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>(optional)</span></label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🆔</span>
            <input
              type="text"
              placeholder="e.g. HOS-2024-0012"
              value={form.patientId}
              onFocus={() => setFocused('patientId')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, patientId: e.target.value})}
              style={{
                ...styles.input,
                ...(focused === 'patientId' ? styles.inputFocus : {}),
              }}
            />
          </div>

          <label style={styles.label}>Treatment Category</label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>💊</span>
            <select
              value={form.treatment}
              onFocus={() => setFocused('treatment')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, treatment: e.target.value})}
              style={{
                ...styles.select,
                ...(focused === 'treatment' ? styles.inputFocus : {}),
              }}
              required
            >
              <option value="" disabled>Select treatment type</option>
              <option value="Consultation">Consultation</option>
              <option value="Surgery">Surgery</option>
              <option value="Drugs & Pharmacy">Drugs & Pharmacy</option>
              <option value="Emergency Care">Emergency Care</option>
              <option value="Laboratory & Diagnostics">Laboratory & Diagnostics</option>
              <option value="Physiotherapy">Physiotherapy</option>
              <option value="Dental Care">Dental Care</option>
            </select>
          </div>

          <label style={styles.label}>Note <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>(optional)</span></label>
          <div style={styles.inputWrapper}>
            <span style={{...styles.inputIcon, top: '20px', transform: 'none'}}>📝</span>
            <textarea
              placeholder="Add a note (optional) e.g. for mum's knee surgery"
              value={form.note}
              maxLength={200}
              onFocus={() => setFocused('note')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, note: e.target.value})}
              style={{
                ...styles.textarea,
                ...(focused === 'note' ? styles.inputFocus : {}),
              }}
            />
            <div style={styles.charCount}>{form.note.length}/200</div>
          </div>

          <label style={styles.label}>Amount (NGN)</label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>₦</span>
            <input
              type="number"
              placeholder="Enter amount in Naira"
              value={form.amount}
              onFocus={() => setFocused('amount')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, amount: e.target.value})}
              style={{
                ...styles.input,
                ...(focused === 'amount' ? styles.inputFocus : {}),
              }}
              required
              min="100"
            />
          </div>

          {form.amount && (
            <div style={styles.fxBox} className="mr-fx-box">
              <div style={styles.fxItem}>
                <div style={styles.fxLabel}>USD equivalent</div>
                <div style={styles.fxValue}>${(form.amount / fxRates.USD).toFixed(2)}</div>
              </div>
              <div className="mr-fx-divider" style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={styles.fxItem}>
                <div style={styles.fxLabel}>GBP equivalent</div>
                <div style={styles.fxValue}>£{(form.amount / fxRates.GBP).toFixed(2)}</div>
              </div>
              <div className="mr-fx-divider" style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={styles.fxItem}>
                <div style={styles.fxLabel}>You pay</div>
                <div style={styles.fxValue}>{formattedAmount}</div>
              </div>
            </div>
          )}
          {form.amount && form.patientName && form.treatment && (
            <div style={styles.summaryCard} className="mr-summary-card">
              <div style={styles.summaryTitle}>📋 Payment Summary</div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Hospital</span>
                <span style={styles.summaryValue}>{hospital.name}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Patient</span>
                <span style={styles.summaryValue}>{form.patientName}</span>
              </div>
              {form.patientId && (
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Patient ID</span>
                  <span style={styles.summaryValue}>{form.patientId}</span>
                </div>
              )}
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Treatment</span>
                <span style={styles.summaryValue}>{form.treatment}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Amount (NGN)</span>
                <span style={{...styles.summaryValue, color: '#00d084', fontWeight: 700}}>{formattedAmount}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>USD equivalent</span>
                <span style={styles.summaryValue}>${(form.amount / fxRates.USD).toFixed(2)}</span>
              </div>
              <div style={{...styles.summaryRow, borderBottom: 'none'}}>
                <span style={styles.summaryLabel}>GBP equivalent</span>
                <span style={styles.summaryValue}>£{(form.amount / fxRates.GBP).toFixed(2)}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.payButton,
              ...(loading ? styles.payButtonDisabled : {}),
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 208, 132, 0.25)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 208, 132, 0.2)'
            }}
          >
            {loading ? <>⏳ Processing...</> : <>🔒 Pay {formattedAmount}</>}
          </button>

          {/* Generate Payment Link Button */}
          <button
            type="button"
            onClick={handleGenerateLink}
            disabled={linkLoading}
            style={{
              width: '100%',
              padding: '0.85rem',
              background: 'transparent',
              color: '#00d084',
              border: '1px solid rgba(0, 208, 132, 0.3)',
              borderRadius: '12px',
              fontSize: '0.92rem',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: linkLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.75rem',
              opacity: linkLoading ? 0.7 : 1,
            }}
            onMouseEnter={e => {
              if (!linkLoading) {
                e.currentTarget.style.background = 'rgba(0, 208, 132, 0.08)'
                e.currentTarget.style.borderColor = 'rgba(0, 208, 132, 0.5)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(0, 208, 132, 0.3)'
            }}
          >
            {linkLoading ? '⏳ Generating...' : '🔗 Generate Payment Link for Family'}
          </button>
        </form>

        <div style={styles.securityNote}>
          <span>🛡️</span> Secured by Interswitch payment gateway
        </div>

        {/* Payment Link Modal */}
        {showLinkModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}>
            <div style={{
              background: '#1a2035',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '440px',
              width: '100%',
              border: '1px solid rgba(0, 208, 132, 0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              animation: 'fadeInUp 0.3s ease',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔗</div>
                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                  Payment Link Created!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
                  Share this link with family to pay for {form.patientName}
                </p>
              </div>

              <div style={{
                background: 'rgba(0, 208, 132, 0.06)',
                border: '1px solid rgba(0, 208, 132, 0.15)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1rem',
                wordBreak: 'break-all',
              }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Payment Link
                </div>
                <div style={{ fontSize: '0.85rem', color: '#00d084', fontWeight: 600 }}>
                  {generatedLink}
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '10px',
                padding: '0.8rem 1rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Hospital</span>
                  <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{hospital.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Amount</span>
                  <span style={{ color: '#00d084', fontSize: '0.8rem', fontWeight: 700 }}>{formattedAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Treatment</span>
                  <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{form.treatment}</span>
                </div>
              </div>

              <button
                onClick={copyLink}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  background: linkCopied ? '#00b975' : '#00d084',
                  color: '#0a0f1e',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.5rem',
                }}
              >
                {linkCopied ? '✅ Copied!' : '📋 Copy Link'}
              </button>

              <button
                onClick={() => setShowLinkModal(false)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.5)',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}