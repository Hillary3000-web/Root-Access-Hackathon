import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'https://mediremit-backend.onrender.com'

const statusConfig = {
  successful: {
    color: '#00d084',
    bg: 'rgba(0, 208, 132, 0.1)',
    border: 'rgba(0, 208, 132, 0.2)',
    icon: '✅',
    label: 'Successful',
  },
  failed: {
    color: '#fc8181',
    bg: 'rgba(229, 62, 62, 0.1)',
    border: 'rgba(229, 62, 62, 0.2)',
    icon: '❌',
    label: 'Failed',
  },
  pending: {
    color: '#f6ad55',
    bg: 'rgba(214, 158, 46, 0.1)',
    border: 'rgba(214, 158, 46, 0.2)',
    icon: '⏳',
    label: 'Pending',
  },
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0f1e',
  },
  /* ---- Navbar ---- */
  navbar: {
    background: '#0d1117',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '68px',
    boxShadow: 'none',
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
  navBtn: {
    background: 'transparent',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.5rem 1.1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  /* ---- Container ---- */
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    animation: 'fadeInUp 0.4s ease',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    color: '#ffffff',
    marginBottom: '0.3rem',
    fontSize: '1.8rem',
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  desc: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem',
    margin: 0,
  },
  statsRow: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  statBadge: {
    padding: '0.35rem 0.9rem',
    borderRadius: '20px',
    fontSize: '0.82rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  /* ---- Transaction Card ---- */
  txList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  txCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '14px',
    padding: '1.3rem 1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  txLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
    minWidth: '200px',
  },
  txIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(0, 208, 132, 0.1)',
    color: '#00d084',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  txHospital: {
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 0.15rem',
    fontSize: '0.95rem',
  },
  txPatient: {
    color: 'rgba(255, 255, 255, 0.6)',
    margin: '0 0 0.15rem',
    fontSize: '0.85rem',
  },
  txDate: {
    color: 'rgba(255, 255, 255, 0.4)',
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
    margin: '0 0 0.5rem',
    fontSize: '1.15rem',
    letterSpacing: '-0.3px',
  },
  txBadge: {
    padding: '0.3rem 0.85rem',
    borderRadius: '20px',
    fontSize: '0.78rem',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    textTransform: 'capitalize',
  },
  /* ---- Loading ---- */
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
    border: '3px solid rgba(255, 255, 255, 0.1)',
    borderTopColor: '#00d084',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem',
  },
  /* ---- Empty State ---- */
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  emptyIcon: {
    fontSize: '3.5rem',
    marginBottom: '1rem',
  },
  emptyTitle: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '1.15rem',
    marginBottom: '0.5rem',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem',
    marginBottom: '1.5rem',
  },
  emptyBtn: {
    padding: '0.7rem 1.8rem',
    background: '#00d084',
    color: '#0a0f1e',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 2px 10px rgba(0, 208, 132, 0.2)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
}

/* Inject spinner keyframe */
if (typeof document !== 'undefined' && !document.getElementById('mediremit-spin')) {
  const styleSheet = document.createElement('style')
  styleSheet.id = 'mediremit-spin'
  styleSheet.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`
  document.head.appendChild(styleSheet)
}

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API}/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTransactions(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatus = (status) => statusConfig[status] || statusConfig.pending

  const totalPaid = transactions
    .filter(t => t.status === 'successful')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar} className="responsive-navbar">
        <div style={styles.navBrand}>
          <div style={styles.navLogoIcon}>M</div>
          <h1 style={styles.navLogo}>MediRemit</h1>
        </div>
        <button
          className="responsive-nav-btn"
          onClick={() => navigate('/hospitals')}
          style={styles.navBtn}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(255,255,255,0.05)'
            e.target.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Hospitals
        </button>
      </nav>

      <div style={styles.container} className="responsive-container">
        <div style={styles.headerRow} className="responsive-header-row">
          <div>
            <h2 style={styles.title} className="responsive-title">Payment History</h2>
            <p style={styles.desc}>Track all your hospital payments</p>
          </div>
          {transactions.length > 0 && (
            <div style={styles.statsRow}>
              <div className="responsive-stat-badge" style={{
                ...styles.statBadge,
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
              }}>
                📊 {transactions.length} {transactions.length === 1 ? 'payment' : 'payments'}
              </div>
              {totalPaid > 0 && (
                <div className="responsive-stat-badge" style={{
                  ...styles.statBadge,
                  background: 'rgba(0, 208, 132, 0.1)',
                  color: '#00d084',
                }}>
                  💰 ₦{totalPaid.toLocaleString()} paid
                </div>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div style={styles.loadingWrapper}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Loading payment history...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📋</div>
            <p style={styles.emptyTitle}>No payments yet</p>
            <p style={styles.emptyText}>
              Once you make your first hospital payment, it will appear here.
            </p>
            <button
              onClick={() => navigate('/hospitals')}
              style={styles.emptyBtn}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 4px 14px rgba(0, 208, 132, 0.3)'
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 2px 10px rgba(0, 208, 132, 0.2)'
              }}
            >
              Make a Payment →
            </button>
          </div>
        ) : (
          <div style={styles.txList}>
            {transactions.map((t, i) => {
              const s = getStatus(t.status)
              return (
                <div
                  key={t.id}
                  className="responsive-tx-card"
                  style={{
                    ...styles.txCard,
                    animation: `fadeInUp 0.35s ease ${i * 0.05}s both`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)'
                    e.currentTarget.style.borderColor = 'rgba(0, 208, 132, 0.5)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={styles.txLeft} className="responsive-tx-left">
                    <div style={styles.txIcon}>🏥</div>
                    <div>
                      <p style={styles.txHospital}>{t.hospitals?.name || 'Hospital'}</p>
                      <p style={styles.txPatient}>Patient: {t.patient_name}</p>
                      <p style={styles.txDate}>
                        {new Date(t.created_at).toLocaleDateString('en-NG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div style={styles.txRight} className="responsive-tx-right">
                    <p style={styles.txAmount}>₦{Number(t.amount).toLocaleString()}</p>
                    <span style={{
                      ...styles.txBadge,
                      background: s.bg,
                      color: s.color,
                      border: `1px solid ${s.border}`,
                    }}>
                      {s.icon} {s.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}