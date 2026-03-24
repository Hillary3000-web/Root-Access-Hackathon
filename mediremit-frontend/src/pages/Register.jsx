import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const API = 'https://mediremit-backend.onrender.com'

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 50%, #1a365d 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  bgPattern: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%),
                       radial-gradient(circle at 50% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.97)',
    backdropFilter: 'blur(20px)',
    padding: '2.5rem',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    zIndex: 1,
    animation: 'scaleIn 0.5s ease',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #1a365d, #2b6cb0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 700,
    flexShrink: 0,
  },
  logoText: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#1a365d',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: '#718096',
    fontSize: '0.95rem',
    marginBottom: '2rem',
    marginTop: '0.5rem',
    lineHeight: 1.5,
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
    marginBottom: '1.2rem',
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
  button: {
    width: '100%',
    padding: '0.9rem',
    background: 'linear-gradient(135deg, #2b6cb0, #1a365d)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
    boxShadow: '0 4px 15px rgba(43, 108, 176, 0.35)',
    marginTop: '0.5rem',
    letterSpacing: '0.3px',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#718096',
    fontSize: '0.9rem',
  },
  link: {
    color: '#2b6cb0',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'color 0.2s ease',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '1.5rem 0',
    color: '#a0aec0',
    fontSize: '0.8rem',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#e2e8f0',
  },
}

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${API}/auth/register`, form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/hospitals')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page} className="responsive-page-center">
      <div style={styles.bgPattern} />
      <div style={styles.card} className="responsive-card">
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>M</div>
          <span style={styles.logoText}>MediRemit</span>
        </div>
        <p style={styles.subtitle}>
          Create an account to start paying Nigerian hospitals from the diaspora
        </p>

        {error && (
          <div style={styles.errorBox}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Full Name</label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>👤</span>
            <input
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onFocus={() => setFocused('fullName')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, fullName: e.target.value})}
              style={{
                ...styles.input,
                ...(focused === 'fullName' ? styles.inputFocus : {}),
              }}
              required
            />
          </div>

          <label style={styles.label}>Email Address</label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>✉</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, email: e.target.value})}
              style={{
                ...styles.input,
                ...(focused === 'email' ? styles.inputFocus : {}),
              }}
              required
            />
          </div>

          <label style={styles.label}>Password</label>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, password: e.target.value})}
              style={{
                ...styles.input,
                ...(focused === 'password' ? styles.inputFocus : {}),
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 6px 20px rgba(43, 108, 176, 0.45)'
              }
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 15px rgba(43, 108, 176, 0.35)'
            }}
          >
            {loading ? '⏳ Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span>OR</span>
          <div style={styles.dividerLine} />
        </div>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  )
}