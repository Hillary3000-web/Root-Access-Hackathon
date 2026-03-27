import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'https://mediremit-backend.onrender.com'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0f1e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
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
  errorState: {
    textAlign: 'center',
    padding: '3rem 2rem',
  },
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 2rem',
    gap: '1rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    borderTopColor: '#00d084',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
}

// Inject spinner keyframe
if (typeof document !== 'undefined' && !document.getElementById('paylink-spin')) {
  const s = document.createElement('style')
  s.id = 'paylink-spin'
  s.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
  document.head.appendChild(s)
}

export default function PayLink() {
  const { linkId } = useParams()
  const navigate = useNavigate()
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [paying, setPaying] = useState(false)
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState('')

  useEffect(() => {
    fetchLink()
  }, [linkId])

  const fetchLink = async () => {
    try {
      const res = await axios.get(`${API}/paylink/${linkId}`)
      setLink(res.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Payment link not found or expired')
    } finally {
      setLoading(false)
    }
  }

  const handlePay = async () => {
    if (!email) return
    setPaying(true)
    try {
      const res = await axios.post(`${API}/paylink/${linkId}/pay`, { email })
      // Redirect to payment simulator
      navigate('/payment-gateway', {
        state: {
          paymentInfo: {
            amount: res.data.amount,
            hospitalName: res.data.hospitalName,
            patientName: res.data.patientName,
            email,
            transactionRef: res.data.transactionRef,
          }
        }
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed')
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.loadingWrapper}>
            <div style={styles.spinner} />
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Loading payment details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !link) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.errorState}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>❌</div>
            <h2 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Link Not Available
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              {error || 'This payment link is not available.'}
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '0.8rem 2rem',
                background: '#00d084',
                color: '#0a0f1e',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Go to MediRemit →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(0, 208, 132, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.6rem',
          }}>
            💚
          </div>
          <h2 style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.3rem', letterSpacing: '-0.3px' }}>
            Pay for {link.patient_name}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
            Someone you care about needs your help
          </p>
        </div>

        {/* Amount */}
        <div style={{
          background: 'rgba(0, 208, 132, 0.08)',
          border: '1px solid rgba(0, 208, 132, 0.2)',
          borderRadius: '14px',
          padding: '1.5rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>
            Amount to Pay
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#00d084', letterSpacing: '-0.5px' }}>
            ₦{Number(link.amount).toLocaleString()}
          </div>
        </div>

        {/* Details */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '14px',
          padding: '1rem 1.2rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Hospital</span>
            <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{link.hospital_name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Location</span>
            <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{link.hospital_location}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Patient</span>
            <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{link.patient_name}</span>
          </div>
          {link.patient_id && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Patient ID</span>
              <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{link.patient_id}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: link.note ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Treatment</span>
            <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{link.treatment}</span>
          </div>
          {link.note && (
            <div style={{ padding: '0.5rem 0' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Note: </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontStyle: 'italic' }}>{link.note}</span>
            </div>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem' }}>
            Your Email
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }}>📧</span>
            <input
              type="email"
              placeholder="Enter your email to proceed"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              style={{
                width: '100%',
                padding: '0.85rem 0.85rem 0.85rem 2.6rem',
                border: `1px solid ${focused === 'email' ? '#00d084' : 'rgba(255,255,255,0.15)'}`,
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontFamily: "'Inter', sans-serif",
                boxSizing: 'border-box',
                outline: 'none',
                background: '#1a2035',
                color: '#ffffff',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                ...(focused === 'email' ? { boxShadow: '0 0 0 3px rgba(0, 208, 132, 0.15)' } : {}),
              }}
              required
            />
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={!email || paying}
          style={{
            width: '100%',
            padding: '0.95rem',
            background: '#00d084',
            color: '#0a0f1e',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.05rem',
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            cursor: !email || paying ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
            boxShadow: '0 4px 15px rgba(0, 208, 132, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            opacity: !email || paying ? 0.7 : 1,
          }}
          onMouseEnter={e => {
            if (email && !paying) {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 208, 132, 0.25)'
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 208, 132, 0.2)'
          }}
        >
          {paying ? '⏳ Preparing payment...' : `🔒 Pay ₦${Number(link.amount).toLocaleString()}`}
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          marginTop: '1rem',
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.8rem',
        }}>
          <span>🛡️</span> Secured by Interswitch · MediRemit
        </div>
      </div>
    </div>
  )
}
