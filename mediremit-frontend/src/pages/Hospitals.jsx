import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'https://mediremit-backend.onrender.com'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0f4f8',
  },
  /* ---- Navbar ---- */
  navbar: {
    background: 'linear-gradient(135deg, #1a365d 0%, #0f2240 100%)',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '68px',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.15)',
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
    background: 'linear-gradient(135deg, #2b6cb0, #63b3ed)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
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
  navGreeting: {
    color: '#90cdf4',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginRight: '0.5rem',
  },
  navBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
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
  },
  navBtnLogout: {
    background: 'rgba(229, 62, 62, 0.9)',
    border: '1px solid rgba(229, 62, 62, 0.5)',
  },
  /* ---- Content ---- */
  container: {
    padding: '2rem',
    maxWidth: '1100px',
    margin: '0 auto',
    animation: 'fadeInUp 0.4s ease',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    color: '#1a365d',
    marginBottom: '0.3rem',
    fontSize: '1.8rem',
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  desc: {
    color: '#718096',
    fontSize: '0.95rem',
    margin: 0,
  },
  /* ---- Search ---- */
  searchWrapper: {
    position: 'relative',
    marginBottom: '2rem',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1.1rem',
    color: '#a0aec0',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '0.9rem 1rem 0.9rem 2.8rem',
    border: '2px solid #e2e8f0',
    borderRadius: '14px',
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    background: 'white',
    color: '#2d3748',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  /* ---- Grid ---- */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
    gap: '1.5rem',
  },
  /* ---- Hospital Card ---- */
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    cursor: 'default',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHospitalIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #ebf8ff, #bee3f8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    marginBottom: '1rem',
  },
  cardName: {
    color: '#1a365d',
    marginBottom: '0.4rem',
    fontSize: '1.05rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  cardLocation: {
    color: '#718096',
    marginBottom: '1rem',
    fontSize: '0.88rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  locationPin: {
    color: '#e53e3e',
    fontSize: '0.95rem',
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
    marginBottom: '1.2rem',
  },
  tag: {
    background: 'linear-gradient(135deg, #ebf8ff, #e6f7ff)',
    color: '#2b6cb0',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.78rem',
    fontWeight: 500,
    border: '1px solid rgba(43, 108, 176, 0.1)',
  },
  payBtn: {
    width: '100%',
    padding: '0.7rem',
    background: 'linear-gradient(135deg, #2b6cb0, #1a365d)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(43, 108, 176, 0.3)',
    letterSpacing: '0.2px',
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
    border: '3px solid #e2e8f0',
    borderTopColor: '#2b6cb0',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    color: '#718096',
    fontSize: '0.95rem',
  },
  /* ---- Empty State ---- */
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  emptyText: {
    color: '#718096',
    fontSize: '1rem',
  },
}

/* Inject spinner keyframe */
if (typeof document !== 'undefined' && !document.getElementById('mediremit-spin')) {
  const styleSheet = document.createElement('style')
  styleSheet.id = 'mediremit-spin'
  styleSheet.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`
  document.head.appendChild(styleSheet)
}

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    fetchHospitals()
  }, [])

  const fetchHospitals = async (q = '') => {
    try {
      const res = await axios.get(`${API}/hospitals${q ? `?search=${q}` : ''}`)
      setHospitals(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    fetchHospitals(e.target.value)
  }

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar} className="responsive-navbar">
        <div style={styles.navBrand}>
          <div style={styles.navLogoIcon}>M</div>
          <h1 style={styles.navLogo}>MediRemit</h1>
        </div>
        <div style={styles.navRight} className="responsive-nav-right">
          <span style={styles.navGreeting} className="responsive-nav-greeting">👋 Hi, {user.fullName}</span>
          <button
            onClick={() => navigate('/transactions')}
            style={styles.navBtn}
            className="responsive-nav-btn"
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.2)'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            💳 My Payments
          </button>
          <button
            onClick={logout}
            style={{ ...styles.navBtn, ...styles.navBtnLogout }}
            className="responsive-nav-btn"
            onMouseEnter={e => {
              e.target.style.background = 'rgba(229, 62, 62, 1)'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(229, 62, 62, 0.9)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.container} className="responsive-container">
        <div style={styles.header}>
          <h2 style={styles.title} className="responsive-title">Find a Hospital</h2>
          <p style={styles.desc}>
            Search and pay Nigerian hospitals directly from anywhere in the world.
          </p>
        </div>

        {/* Search */}
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search hospitals by name, location, or specialty..."
            value={search}
            onChange={handleSearch}
            onFocus={e => {
              e.target.style.borderColor = '#2b6cb0'
              e.target.style.boxShadow = '0 0 0 3px rgba(43, 108, 176, 0.1)'
            }}
            onBlur={e => {
              e.target.style.borderColor = '#e2e8f0'
              e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)'
            }}
            style={styles.searchInput}
            className="responsive-search-input"
          />
        </div>

        {/* Hospital Grid */}
        {loading ? (
          <div style={styles.loadingWrapper}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Loading hospitals...</p>
          </div>
        ) : hospitals.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏥</div>
            <p style={styles.emptyText}>No hospitals found. Try a different search term.</p>
          </div>
        ) : (
          <div style={styles.grid} className="responsive-grid">
            {hospitals.map((h, i) => (
              <div
                key={h.id}
                style={{
                  ...styles.card,
                  animation: `fadeInUp 0.4s ease ${i * 0.06}s both`,
                  ...(hoveredCard === h.id
                    ? { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }
                    : {}),
                }}
                onMouseEnter={() => setHoveredCard(h.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div>
                  <div style={styles.cardHospitalIcon}>🏥</div>
                  <h3 style={styles.cardName}>{h.name}</h3>
                  <p style={styles.cardLocation}>
                    <span style={styles.locationPin}>📍</span> {h.location}
                  </p>
                  <div style={styles.tagContainer}>
                    {h.specialties.map(s => (
                      <span key={s} style={styles.tag}>{s}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/payment/${h.id}`, { state: { hospital: h } })}
                  style={styles.payBtn}
                  onMouseEnter={e => {
                    e.target.style.transform = 'translateY(-1px)'
                    e.target.style.boxShadow = '0 4px 14px rgba(43, 108, 176, 0.45)'
                  }}
                  onMouseLeave={e => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 2px 8px rgba(43, 108, 176, 0.3)'
                  }}
                >
                  Pay Now →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}