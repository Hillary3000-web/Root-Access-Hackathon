import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const API = 'https://mediremit-backend.onrender.com'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0f4f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    animation: 'fadeInUp 0.4s ease',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#2b6cb0',
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
    color: '#1a365d',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: 700,
    letterSpacing: '-0.3px',
  },
  hospitalBox: {
    background: 'linear-gradient(135deg, #ebf8ff 0%, #e6f7ff 100%)',
    padding: '1.2rem 1.4rem',
    borderRadius: '14px',
    marginBottom: '2rem',
    border: '1px solid rgba(43, 108, 176, 0.12)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  hospitalIconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #2b6cb0, #1a365d)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    flexShrink: 0,
  },
  hospitalName: {
    margin: 0,
    color: '#1a365d',
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: 1.3,
  },
  hospitalLocation: {
    margin: '0.2rem 0 0',
    color: '#4a5568',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  errorBox: {
    background: 'rgba(229, 62, 62, 0.08)',
    border: '1px solid rgba(229, 62, 62, 0.2)',
    color: '#e53e3e',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    marginBottom: '1.2rem',
    fontSize: '0.88rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    animation: 'slideDown 0.3s ease',
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    color: '#4a5568',
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
    color: '#a0aec0',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.85rem 0.85rem 0.85rem 2.6rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    outline: 'none',
    background: '#f7fafc',
    color: '#2d3748',
  },
  inputFocus: {
    borderColor: '#2b6cb0',
    boxShadow: '0 0 0 3px rgba(43, 108, 176, 0.12)',
    background: '#fff',
  },
  amountPreview: {
    color: '#718096',
    fontSize: '0.82rem',
    marginTop: '-0.8rem',
    marginBottom: '1.4rem',
    paddingLeft: '0.2rem',
  },
  payButton: {
    width: '100%',
    padding: '0.95rem',
    background: 'linear-gradient(135deg, #38a169, #2f855a)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.05rem',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
    boxShadow: '0 4px 15px rgba(56, 161, 105, 0.35)',
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
    color: '#a0aec0',
    fontSize: '0.8rem',
  },
}

export default function Payment() {
  const { state } = useLocation()
  const hospital = state?.hospital
  const navigate = useNavigate()
  const [form, setForm] = useState({ patientName: '', amount: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  const handlePay = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Save transaction
      const transactionRef = `MEDIREMIT-${Date.now()}`
      await axios.post(`${API}/transactions`, {
        hospitalId: hospital.id,
        patientName: form.patientName,
        amount: form.amount,
        transactionRef,
        description: `Payment for ${form.patientName} at ${hospital.name}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Get checkout data
      const res = await axios.post(`${API}/checkout/pay`, {
        amount: form.amount,
        email: user.email,
        hospitalName: hospital.name,
        patientName: form.patientName,
        hospitalId: hospital.id
      })

      // Redirect to Interswitch checkout
      const { checkoutUrl, checkoutData } = res.data
      const params = new URLSearchParams({
        merchantCode: checkoutData.merchantCode,
        payableCode: checkoutData.payableCode,
        amount: checkoutData.amount,
        transactionReference: checkoutData.transactionReference,
        customerId: checkoutData.customerId,
        customerEmail: checkoutData.customerEmail,
        currency: checkoutData.currency,
        redirectUrl: checkoutData.redirectUrl,
      })

      window.location.href = `${checkoutUrl}?${params.toString()}`
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed')
      setLoading(false)
    }
  }

  if (!hospital) {
    navigate('/hospitals')
    return null
  }

  const formattedAmount = form.amount
    ? `₦${Number(form.amount).toLocaleString()}`
    : '₦0'

  return (
    <div style={styles.page} className="responsive-page-center">
      <div style={styles.card} className="responsive-card">
        <button
          onClick={() => navigate('/hospitals')}
          style={styles.backBtn}
          onMouseEnter={e => (e.target.style.color = '#1a365d')}
          onMouseLeave={e => (e.target.style.color = '#2b6cb0')}
        >
          ← Back to hospitals
        </button>

        <h2 style={styles.title}>Make Payment</h2>

        {/* Hospital Info Box */}
        <div style={styles.hospitalBox} className="responsive-hospital-box">
          <div style={styles.hospitalIconBox}>🏥</div>
          <div>
            <p style={styles.hospitalName}>{hospital.name}</p>
            <p style={styles.hospitalLocation}>
              <span style={{ color: '#e53e3e' }}>📍</span> {hospital.location}
            </p>
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
            <p style={styles.amountPreview}>
              You will be charged <strong style={{ color: '#1a365d' }}>{formattedAmount}</strong>
            </p>
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
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(56, 161, 105, 0.45)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(56, 161, 105, 0.35)'
            }}
          >
            {loading ? (
              <>⏳ Processing...</>
            ) : (
              <>🔒 Pay {formattedAmount}</>
            )}
          </button>
        </form>

        <div style={styles.securityNote}>
          <span>🛡️</span> Secured by Interswitch payment gateway
        </div>
      </div>
    </div>
  )
}