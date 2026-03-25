import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'https://mediremit-backend.onrender.com'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0f1e',
  },
  navbar: {
    background: '#0d1117',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '68px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  navLogoIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    background: 'rgba(0, 208, 132, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00d084',
    fontSize: '1rem',
    fontWeight: 800,
  },
  navLogo: {
    color: 'white',
    margin: 0,
    fontSize: '1.35rem',
    fontWeight: 700,
    letterSpacing: '-0.3px',
  },
  navRight: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  navBtn: {
    background: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.5rem 1.1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s ease',
  },
  navBtnLogout: {
    background: 'rgba(229, 62, 62, 0.1)',
    border: '1px solid rgba(229, 62, 62, 0.2)',
    color: '#fc8181',
  },
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  profileCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  avatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(0, 208, 132, 0.15)',
    border: '2px solid rgba(0, 208, 132, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00d084',
    fontSize: '1.8rem',
    fontWeight: 800,
    flexShrink: 0,
  },
  profileName: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: '0 0 0.2rem',
    letterSpacing: '-0.3px',
  },
  profileEmail: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.9rem',
    margin: '0 0 0.3rem',
  },
  profileDate: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: '0.8rem',
    margin: 0,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '1.15rem',
    fontWeight: 700,
    marginBottom: '1rem',
    letterSpacing: '-0.3px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.4rem',
    transition: 'border-color 0.2s ease, transform 0.2s ease',
  },
  statIcon: {
    fontSize: '1.4rem',
    marginBottom: '0.6rem',
  },
  statValue: {
    color: '#ffffff',
    fontSize: '1.6rem',
    fontWeight: 800,
    margin: '0 0 0.2rem',
    letterSpacing: '-0.5px',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.8rem',
    margin: 0,
    fontWeight: 500,
  },
  txCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '14px',
    padding: '1.2rem 1.4rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'border-color 0.2s ease',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '0.75rem',
  },
  txLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
    minWidth: '180px',
  },
  txIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: 'rgba(0, 208, 132, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  txHospital: {
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 0.1rem',
    fontSize: '0.9rem',
  },
  txPatient: {
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
    fontSize: '0.8rem',
  },
  txRight: {
    textAlign: 'right',
    flexShrink: 0,
  },
  txAmount: {
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 0.4rem',
    fontSize: '1.05rem',
  },
  txBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    textTransform: 'capitalize',
  },
  txDate: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: '0.72rem',
    marginTop: '0.3rem',
  },
  preferredCard: {
    background: 'rgba(0, 208, 132, 0.06)',
    border: '1px solid rgba(0, 208, 132, 0.25)',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2.5rem',
  },
  preferredIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: 'rgba(0, 208, 132, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  preferredName: {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '1.05rem',
    margin: '0 0 0.15rem',
  },
  preferredLocation: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.85rem',
    margin: '0 0 0.25rem',
  },
  preferredCount: {
    color: '#00d084',
    fontSize: '0.8rem',
    fontWeight: 600,
    margin: 0,
  },
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    gap: '1rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255,255,255,0.1)',
    borderTopColor: '#00d084',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.95rem',
  },
}

const statusConfig = {
  successful: { color: '#00d084', bg: 'rgba(0,208,132,0.1)', border: 'rgba(0,208,132,0.2)', icon: '✅' },
  failed: { color: '#fc8181', bg: 'rgba(229,62,62,0.1)', border: 'rgba(229,62,62,0.2)', icon: '❌' },
  pending: { color: '#f6ad55', bg: 'rgba(214,158,46,0.1)', border: 'rgba(214,158,46,0.2)', icon: '⏳' },
}

if (typeof document !== 'undefined' && !document.getElementById('mediremit-spin')) {
  const s = document.createElement('style')
  s.id = 'mediremit-spin'
  s.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`
  document.head.appendChild(s)
}

export default function Profile() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    axios.get(`${API}/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTransactions(res.data.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const totalSpent = transactions
    .filter(t => t.status === 'successful')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalPayments = transactions.length
  const successfulPayments = transactions.filter(t => t.status === 'successful').length
  const uniqueHospitals = new Set(transactions.map(t => t.hospital_id)).size

  const recentTx = [...transactions]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3)

  // Preferred hospital — most frequent
  const hospitalCounts = {}
  transactions.forEach(t => {
    const name = t.hospitals?.name || 'Unknown'
    const location = t.hospitals?.location || ''
    const key = name
    if (!hospitalCounts[key]) hospitalCounts[key] = { name, location, count: 0 }
    hospitalCounts[key].count++
  })
  const preferred = Object.values(hospitalCounts).sort((a, b) => b.count - a.count)[0]

  const getStatus = (status) => statusConfig[status] || statusConfig.pending

  const initials = user.fullName ? user.fullName.charAt(0).toUpperCase() : '?'

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <div style={styles.navLogoIcon}>M</div>
          <h1 style={styles.navLogo}>MediRemit</h1>
        </div>
        <div style={styles.navRight}>
          <button
            onClick={() => navigate('/hospitals')}
            style={styles.navBtn}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent' }}
          >
            🏥 Find Hospitals
          </button>
          <button
            onClick={logout}
            style={{ ...styles.navBtn, ...styles.navBtnLogout }}
            onMouseEnter={e => { e.target.style.background = 'rgba(229,62,62,0.2)' }}
            onMouseLeave={e => { e.target.style.background = 'rgba(229,62,62,0.1)' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.container}>
        {/* Profile Header */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>{initials}</div>
          <div>
            <h2 style={styles.profileName}>{user.fullName || 'User'}</h2>
            <p style={styles.profileEmail}>{user.email || '—'}</p>
            <p style={styles.profileDate}>Member since {user.created_at
              ? new Date(user.created_at).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })
              : 'March 2026'
            }</p>
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingWrapper}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Loading your profile data...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <h3 style={styles.sectionTitle}>Overview</h3>
            <div style={styles.statsGrid}>
              <div
                style={styles.statCard}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,208,132,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={styles.statIcon}>💰</div>
                <p style={styles.statValue}>₦{totalSpent.toLocaleString()}</p>
                <p style={styles.statLabel}>Total Spent</p>
              </div>
              <div
                style={styles.statCard}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,208,132,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={styles.statIcon}>📊</div>
                <p style={styles.statValue}>{totalPayments}</p>
                <p style={styles.statLabel}>Total Payments</p>
              </div>
              <div
                style={styles.statCard}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,208,132,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={styles.statIcon}>✅</div>
                <p style={styles.statValue}>{successfulPayments}</p>
                <p style={styles.statLabel}>Successful Payments</p>
              </div>
              <div
                style={styles.statCard}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,208,132,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={styles.statIcon}>🏥</div>
                <p style={styles.statValue}>{uniqueHospitals}</p>
                <p style={styles.statLabel}>Hospitals Paid</p>
              </div>
            </div>

            {/* Recent Transactions */}
            {recentTx.length > 0 && (
              <>
                <h3 style={styles.sectionTitle}>Recent Transactions</h3>
                {recentTx.map((t, i) => {
                  const s = getStatus(t.status)
                  return (
                    <div
                      key={t.id || i}
                      style={styles.txCard}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,208,132,0.5)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                    >
                      <div style={styles.txLeft}>
                        <div style={styles.txIcon}>🏥</div>
                        <div>
                          <p style={styles.txHospital}>{t.hospitals?.name || 'Hospital'}</p>
                          <p style={styles.txPatient}>Patient: {t.patient_name}</p>
                        </div>
                      </div>
                      <div style={styles.txRight}>
                        <p style={styles.txAmount}>₦{Number(t.amount).toLocaleString()}</p>
                        <span style={{
                          ...styles.txBadge,
                          background: s.bg,
                          color: s.color,
                          border: `1px solid ${s.border}`,
                        }}>
                          {s.icon} {t.status}
                        </span>
                        <p style={styles.txDate}>
                          {new Date(t.created_at).toLocaleDateString('en-NG', {
                            year: 'numeric', month: 'short', day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </>
            )}

            {/* Preferred Hospital */}
            {preferred && (
              <>
                <h3 style={{ ...styles.sectionTitle, marginTop: '2.5rem' }}>⭐ Preferred Hospital</h3>
                <div style={styles.preferredCard}>
                  <div style={styles.preferredIcon}>🏥</div>
                  <div>
                    <p style={styles.preferredName}>{preferred.name}</p>
                    {preferred.location && (
                      <p style={styles.preferredLocation}>📍 {preferred.location}</p>
                    )}
                    <p style={styles.preferredCount}>
                      {preferred.count} payment{preferred.count !== 1 ? 's' : ''} made
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
