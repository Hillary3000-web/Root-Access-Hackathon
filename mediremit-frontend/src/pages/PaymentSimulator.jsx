import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'https://mediremit-backend.onrender.com'

const styles = {
  overlay: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a1628 0%, #0f1d35 50%, #0a1628 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  gatewayBar: {
    background: '#ffffff',
    width: '100%',
    maxWidth: '480px',
    borderRadius: '16px 16px 0 0',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
  },
  gatewayLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 800,
  },
  logoText: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#1a1a2e',
    letterSpacing: '-0.3px',
  },
  secureTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.75rem',
    color: '#2e7d32',
    fontWeight: 500,
    background: 'rgba(46,125,50,0.08)',
    padding: '0.3rem 0.6rem',
    borderRadius: '20px',
  },
  card: {
    background: '#ffffff',
    width: '100%',
    maxWidth: '480px',
    borderRadius: '0 0 16px 16px',
    padding: '0',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
  merchantStrip: {
    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
    padding: '1.2rem 1.5rem',
    borderBottom: '1px solid #e0e0e0',
  },
  merchantLabel: {
    fontSize: '0.72rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.15rem',
  },
  merchantName: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
  },
  merchantDesc: {
    fontSize: '0.82rem',
    color: '#666',
    margin: '0.15rem 0 0',
  },
  amountStrip: {
    background: '#ffffff',
    padding: '1.5rem',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
  },
  amountLabel: {
    fontSize: '0.75rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.3rem',
  },
  amountValue: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#1a1a2e',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  amountCurrency: {
    fontSize: '0.82rem',
    color: '#888',
    marginTop: '0.2rem',
  },
  formSection: {
    padding: '1.5rem',
  },
  tabRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    background: '#f5f5f5',
    borderRadius: '10px',
    padding: '0.3rem',
  },
  tab: {
    flex: 1,
    padding: '0.6rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.3rem',
  },
  tabActive: {
    background: '#ffffff',
    color: '#1a1a2e',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  tabInactive: {
    background: 'transparent',
    color: '#888',
  },
  inputLabel: {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: '#444',
    marginBottom: '0.4rem',
  },
  input: {
    width: '100%',
    padding: '0.85rem 1rem',
    border: '1.5px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    color: '#1a1a2e',
    background: '#fafafa',
  },
  inputFocus: {
    borderColor: '#1a73e8',
    boxShadow: '0 0 0 3px rgba(26, 115, 232, 0.1)',
    background: '#fff',
  },
  cardRow: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  cardIcons: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  cardBrand: {
    width: '32px',
    height: '20px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.6rem',
    fontWeight: 800,
    color: '#fff',
  },
  payBtn: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
    boxShadow: '0 4px 15px rgba(26, 115, 232, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  payBtnDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  cancelBtn: {
    width: '100%',
    padding: '0.75rem',
    background: 'transparent',
    color: '#888',
    border: 'none',
    borderRadius: '10px',
    fontSize: '0.85rem',
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'color 0.2s ease',
  },
  footer: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    fontSize: '0.75rem',
    color: '#aaa',
  },
  // Processing overlay
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255,255,255,0.96)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0 0 16px 16px',
    zIndex: 10,
  },
  processingSpinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e0e0e0',
    borderTopColor: '#1a73e8',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    marginBottom: '1.2rem',
  },
  processingText: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1a1a2e',
    marginBottom: '0.3rem',
  },
  processingSubtext: {
    fontSize: '0.82rem',
    color: '#888',
  },
  // Steps indicator
  stepsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  stepDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
  },
}

// Inject spinner keyframe
if (typeof document !== 'undefined' && !document.getElementById('sim-spin')) {
  const s = document.createElement('style')
  s.id = 'sim-spin'
  s.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `
  document.head.appendChild(s)
}

function formatCard(value) {
  const v = value.replace(/\D/g, '').slice(0, 16)
  return v.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const v = value.replace(/\D/g, '').slice(0, 4)
  if (v.length > 2) return v.slice(0, 2) + '/' + v.slice(2)
  return v
}

export default function PaymentSimulator() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const paymentInfo = state?.paymentInfo
  const [tab, setTab] = useState('card')
  const [focused, setFocused] = useState('')
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [processing, setProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)

  const processingSteps = [
    'Validating card details...',
    'Contacting bank...',
    'Authorizing payment...',
    'Processing transaction...',
    'Finalizing...',
  ]

  if (!paymentInfo) {
    navigate('/hospitals')
    return null
  }

  const isFormValid = cardForm.number.replace(/\s/g, '').length >= 16 &&
    cardForm.expiry.length >= 5 && cardForm.cvv.length >= 3 && cardForm.name.length > 2

  const handlePay = (e) => {
    e.preventDefault()
    setShowPin(true)
  }

  const handlePinSubmit = () => {
    if (pin.length < 4) return
    setShowPin(false)
    setShowOtp(true)
  }

  const handleOtpSubmit = async () => {
    if (otp.length < 6) return
    setShowOtp(false)
    setProcessing(true)
    setProcessingStep(0)

    // Simulate realistic processing stages
    for (let i = 0; i < processingSteps.length; i++) {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
      setProcessingStep(i + 1)
    }

    // Update transaction status
    try {
      if (paymentInfo.transactionRef) {
        await axios.patch(`${API}/transactions/${paymentInfo.transactionRef}/status`, {
          status: 'successful'
        })
      }
    } catch (err) {
      console.error('Status update failed:', err)
    }

    // Navigate to receipt
    await new Promise(r => setTimeout(r, 500))
    navigate('/payment/callback', {
      replace: true,
    })
    // Also trigger via search params for the Receipt page
    window.location.href = `/payment/callback?txnref=${paymentInfo.transactionRef}&amount=${paymentInfo.amount * 100}&respCode=00&respDescription=Approved`
  }

  return (
    <div style={styles.overlay}>
      {/* Gateway Header */}
      <div style={styles.gatewayBar}>
        <div style={styles.gatewayLogo}>
          <div style={styles.logoIcon}>IS</div>
          <span style={styles.logoText}>Interswitch Pay</span>
        </div>
        <div style={styles.secureTag}>
          🔒 256-bit SSL
        </div>
      </div>

      {/* Main Card */}
      <div style={{ ...styles.card, position: 'relative' }}>
        {/* Merchant Info */}
        <div style={styles.merchantStrip}>
          <div style={styles.merchantLabel}>Paying to</div>
          <p style={styles.merchantName}>{paymentInfo.hospitalName}</p>
          <p style={styles.merchantDesc}>Payment for {paymentInfo.patientName}</p>
        </div>

        {/* Amount */}
        <div style={styles.amountStrip}>
          <div style={styles.amountLabel}>Amount</div>
          <p style={styles.amountValue}>₦{Number(paymentInfo.amount).toLocaleString()}</p>
          <div style={styles.amountCurrency}>Nigerian Naira (NGN)</div>
        </div>

        {/* Payment Form */}
        <div style={styles.formSection}>
          {/* Payment Method Tabs */}
          <div style={styles.tabRow}>
            <button
              onClick={() => setTab('card')}
              style={{ ...styles.tab, ...(tab === 'card' ? styles.tabActive : styles.tabInactive) }}
            >
              💳 Card
            </button>
            <button
              onClick={() => setTab('transfer')}
              style={{ ...styles.tab, ...(tab === 'transfer' ? styles.tabActive : styles.tabInactive) }}
            >
              🏦 Transfer
            </button>
            <button
              onClick={() => setTab('ussd')}
              style={{ ...styles.tab, ...(tab === 'ussd' ? styles.tabActive : styles.tabInactive) }}
            >
              📱 USSD
            </button>
          </div>

          {tab === 'card' && (
            <form onSubmit={handlePay}>
              {/* Card Number */}
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardForm.number}
                    onChange={e => setCardForm({ ...cardForm, number: formatCard(e.target.value) })}
                    onFocus={() => setFocused('number')}
                    onBlur={() => setFocused('')}
                    style={{
                      ...styles.input,
                      ...(focused === 'number' ? styles.inputFocus : {}),
                      paddingRight: '90px',
                    }}
                    maxLength={19}
                    required
                  />
                  <div style={styles.cardIcons}>
                    <div style={{ ...styles.cardBrand, background: '#1a1f71' }}>VISA</div>
                    <div style={{ ...styles.cardBrand, background: '#eb001b', fontSize: '0.5rem' }}>MC</div>
                  </div>
                </div>
              </div>

              {/* Expiry & CVV */}
              <div style={styles.cardRow}>
                <div style={{ flex: 1 }}>
                  <label style={styles.inputLabel}>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardForm.expiry}
                    onChange={e => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                    onFocus={() => setFocused('expiry')}
                    onBlur={() => setFocused('')}
                    style={{
                      ...styles.input,
                      ...(focused === 'expiry' ? styles.inputFocus : {}),
                    }}
                    maxLength={5}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.inputLabel}>CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    value={cardForm.cvv}
                    onChange={e => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    onFocus={() => setFocused('cvv')}
                    onBlur={() => setFocused('')}
                    style={{
                      ...styles.input,
                      ...(focused === 'cvv' ? styles.inputFocus : {}),
                    }}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Cardholder */}
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="JOHN DOE"
                  value={cardForm.name}
                  onChange={e => setCardForm({ ...cardForm, name: e.target.value.toUpperCase() })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  style={{
                    ...styles.input,
                    ...(focused === 'name' ? styles.inputFocus : {}),
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                style={{
                  ...styles.payBtn,
                  ...(!isFormValid ? styles.payBtnDisabled : {}),
                }}
                onMouseEnter={e => {
                  if (isFormValid) {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 115, 232, 0.4)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(26, 115, 232, 0.3)'
                }}
              >
                🔒 Pay ₦{Number(paymentInfo.amount).toLocaleString()}
              </button>
            </form>
          )}

          {tab === 'transfer' && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏦</div>
              <p style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1rem', marginBottom: '0.5rem' }}>
                Bank Transfer
              </p>
              <div style={{ background: '#f5f8ff', borderRadius: '12px', padding: '1.2rem', marginBottom: '1rem', border: '1px solid #e0e8f5' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.3rem' }}>Transfer to</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e' }}>MEDIREMIT/INTERSWITCH</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a73e8', margin: '0.5rem 0', fontFamily: "'JetBrains Mono', monospace" }}>
                  012 345 6789
                </div>
                <div style={{ fontSize: '0.82rem', color: '#666' }}>Providus Bank</div>
                <div style={{ fontSize: '0.72rem', color: '#888', marginTop: '0.5rem' }}>
                  This account expires in <span style={{ color: '#e53e3e', fontWeight: 600 }}>29:45</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#888' }}>
                Transfer exactly <strong>₦{Number(paymentInfo.amount).toLocaleString()}</strong> to the account above
              </p>
            </div>
          )}

          {tab === 'ussd' && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📱</div>
              <p style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1rem', marginBottom: '1rem' }}>
                Dial USSD Code
              </p>
              <div style={{ background: '#f5f8ff', borderRadius: '12px', padding: '1.2rem', marginBottom: '1rem', border: '1px solid #e0e8f5' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a73e8', fontFamily: "'JetBrains Mono', monospace" }}>
                  *737*000*2024#
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#888' }}>
                Dial the code above on your phone to complete payment
              </p>
            </div>
          )}

          <button
            onClick={() => navigate(-1)}
            style={styles.cancelBtn}
            onMouseEnter={e => (e.target.style.color = '#e53e3e')}
            onMouseLeave={e => (e.target.style.color = '#888')}
          >
            Cancel Payment
          </button>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span>🔒</span> Secured by Interswitch · PCI DSS Compliant
        </div>

        {/* PIN Modal */}
        {showPin && (
          <div style={styles.processingOverlay}>
            <div style={{ width: '280px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔐</div>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.3rem' }}>
                Enter Card PIN
              </p>
              <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '1.5rem' }}>
                Please enter your 4-digit card PIN to authorize this transaction
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{
                    width: '48px',
                    height: '52px',
                    border: `2px solid ${pin.length > i ? '#1a73e8' : '#e0e0e0'}`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#1a1a2e',
                    background: pin.length > i ? 'rgba(26, 115, 232, 0.05)' : '#fafafa',
                    transition: 'all 0.2s ease',
                  }}>
                    {pin.length > i ? '•' : ''}
                  </div>
                ))}
              </div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
                autoFocus
              />
              {/* Number pad */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', maxWidth: '220px', margin: '0 auto' }}>
                {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (num === '⌫') setPin(p => p.slice(0, -1))
                      else if (num !== '' && pin.length < 4) setPin(p => p + num)
                    }}
                    style={{
                      width: '100%',
                      height: '44px',
                      border: 'none',
                      borderRadius: '10px',
                      background: num === '' ? 'transparent' : '#f5f5f5',
                      fontSize: num === '⌫' ? '1rem' : '1.1rem',
                      fontWeight: 600,
                      cursor: num === '' ? 'default' : 'pointer',
                      fontFamily: "'Inter', sans-serif",
                      color: '#1a1a2e',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={e => { if (num !== '') e.target.style.background = '#e8e8e8' }}
                    onMouseLeave={e => { if (num !== '') e.target.style.background = '#f5f5f5' }}
                    disabled={num === ''}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <button
                onClick={handlePinSubmit}
                disabled={pin.length < 4}
                style={{
                  ...styles.payBtn,
                  marginTop: '1.2rem',
                  opacity: pin.length < 4 ? 0.5 : 1,
                }}
              >
                Authorize
              </button>
            </div>
          </div>
        )}

        {/* OTP Modal */}
        {showOtp && (
          <div style={styles.processingOverlay}>
            <div style={{ width: '300px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📩</div>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.3rem' }}>
                Enter OTP
              </p>
              <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '1.5rem' }}>
                A 6-digit OTP has been sent to your registered phone number ****1234
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} style={{
                    width: '40px',
                    height: '46px',
                    border: `2px solid ${otp.length > i ? '#1a73e8' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#1a1a2e',
                    background: otp.length > i ? 'rgba(26, 115, 232, 0.05)' : '#fafafa',
                    transition: 'all 0.2s ease',
                  }}>
                    {otp[i] || ''}
                  </div>
                ))}
              </div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                style={{ ...styles.input, textAlign: 'center', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.5rem', marginBottom: '0.5rem' }}
                autoFocus
                placeholder="••••••"
              />
              <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem' }}>
                Didn't receive OTP? <span style={{ color: '#1a73e8', cursor: 'pointer', fontWeight: 600 }}>Resend</span>
              </p>
              <button
                onClick={handleOtpSubmit}
                disabled={otp.length < 6}
                style={{
                  ...styles.payBtn,
                  opacity: otp.length < 6 ? 0.5 : 1,
                }}
              >
                Verify & Pay
              </button>
            </div>
          </div>
        )}

        {/* Processing Overlay */}
        {processing && (
          <div style={styles.processingOverlay}>
            <div style={styles.processingSpinner} />
            <p style={styles.processingText}>
              {processingSteps[Math.min(processingStep, processingSteps.length - 1)]}
            </p>
            <p style={styles.processingSubtext}>Please do not close this page</p>
            <div style={styles.stepsRow}>
              {processingSteps.map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.stepDot,
                    background: i <= processingStep ? '#1a73e8' : '#e0e0e0',
                    transform: i === processingStep ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom text */}
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', marginTop: '1.5rem', textAlign: 'center' }}>
        This is a simulated payment gateway for demonstration purposes
      </p>
    </div>
  )
}
