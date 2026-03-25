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
  navGreeting: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginRight: '0.5rem',
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
    maxWidth: '1100px',
    margin: '0 auto',
    animation: 'fadeInUp 0.4s ease',
  },
  header: {
    marginBottom: '2rem',
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
  searchWrapper: {
    position: 'relative',
    marginBottom: '1rem',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.4)',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '0.9rem 1rem 0.9rem 2.8rem',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '14px',
    fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    background: '#1a2035',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  filterRow: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.45rem 1rem',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s ease',
  },
  filterBtnActive: {
    background: 'rgba(0,208,132,0.15)',
    border: '1px solid rgba(0,208,132,0.4)',
    color: '#00d084',
    fontWeight: 600,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    padding: '1.5rem',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
    cursor: 'default',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHospitalIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: 'rgba(0, 208, 132, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    marginBottom: '1rem',
  },
  cardName: {
    color: '#ffffff',
    marginBottom: '0.4rem',
    fontSize: '1.05rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  cardLocation: {
    color: 'rgba(255, 255, 255, 0.6)',
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
    background: 'rgba(0, 208, 132, 0.15)',
    color: '#00d084',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.78rem',
    fontWeight: 500,
    border: '1px solid rgba(0, 208, 132, 0.2)',
  },
  payBtn: {
    width: '100%',
    padding: '0.7rem',
    background: '#00d084',
    color: '#0a0f1e',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 208, 132, 0.2)',
    letterSpacing: '0.2px',
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
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '1rem',
  },
}

if (typeof document !== 'undefined' && !document.getElementById('mediremit-spin')) {
  const styleSheet = document.createElement('style')
  styleSheet.id = 'mediremit-spin'
  styleSheet.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`
  document.head.appendChild(styleSheet)
}

const LOCATIONS = ['All', 'Lagos', 'Abuja', 'Ibadan', 'Port Harcourt', 'Kano', 'Enugu', 'Benin City', 'Kaduna', 'Jos', 'Owerri', 'Awka', 'Ile-Ife', 'Irrua']

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([])
  const [search, setSearch] = useState('')
  const [activeLocation, setActiveLocation] = useState('All')
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    fetchHospitals()
  }, [])

  const fetchHospitals = async (q = '', location = '') => {
    try {
      let url = `${API}/hospitals`
      const params = []
      if (q) params.push(`search=${q}`)
      if (location && location !== 'All') params.push(`location=${location}`)
      if (params.length) url += `?${params.join('&')}`

      const res = await axios.get(url)
      setHospitals(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    fetchHospitals(e.target.value, activeLocation)
  }

  const handleLocationFilter = (location) => {
    setActiveLocation(location)
    fetchHospitals(search, location)
  }

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div style={styles.page}>
      <nav style={styles.navbar} className="mr-navbar">
        <div style={styles.navBrand}>
          <div style={styles.navLogoIcon}>M</div>
          <h1 style={styles.navLogo}>MediRemit</h1>
        </div>
        <div style={styles.navRight} className="mr-nav-right">
          <span style={styles.navGreeting} className="mr-greeting">👋 Hi, {user.fullName}</span>
          <button
            onClick={() => navigate('/transactions')}
            style={styles.navBtn}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent' }}
          >
            💳 My Payments
          </button>
          <button
            onClick={() => navigate('/profile')}
            style={styles.navBtn}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent' }}
          >
            👤 Profile
          </button>
          <button
            onClick={logout}
            style={{ ...styles.navBtn, ...styles.navBtnLogout }}
            onMouseEnter={e => { e.target.style.background = 'rgba(229, 62, 62, 0.2)' }}
            onMouseLeave={e => { e.target.style.background = 'rgba(229, 62, 62, 0.1)' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.container} className="mr-container">
        <div style={styles.header}>
          <h2 style={styles.title} className="mr-title">Find a Hospital</h2>
          <p style={styles.desc}>Search and pay Nigerian hospitals directly from anywhere in the world.</p>
        </div>

        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search hospitals by name, location, or specialty..."
            value={search}
            onChange={handleSearch}
            onFocus={e => {
              e.target.style.borderColor = '#00d084'
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 208, 132, 0.15)'
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              e.target.style.boxShadow = 'none'
            }}
            style={styles.searchInput}
          />
        </div>

        {/* Location Filter Pills */}
        <div style={styles.filterRow} className="mr-filter-row">
          {LOCATIONS.map(loc => (
            <button
              key={loc}
              onClick={() => handleLocationFilter(loc)}
              style={{
                ...styles.filterBtn,
                ...(activeLocation === loc ? styles.filterBtnActive : {}),
              }}
              onMouseEnter={e => {
                if (activeLocation !== loc) {
                  e.target.style.color = '#ffffff'
                  e.target.style.borderColor = 'rgba(255,255,255,0.3)'
                }
              }}
              onMouseLeave={e => {
                if (activeLocation !== loc) {
                  e.target.style.color = 'rgba(255,255,255,0.6)'
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)'
                }
              }}
            >
              {loc}
            </button>
          ))}
        </div>

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
          <div style={styles.grid} className="mr-grid">
            {hospitals.map((h, i) => (
              <div
                key={h.id}
                style={{
                  ...styles.card,
                  animation: `fadeInUp 0.4s ease ${i * 0.06}s both`,
                  ...(hoveredCard === h.id
                    ? { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0, 208, 132, 0.08)', borderColor: 'rgba(0, 208, 132, 0.5)' }
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
                    e.target.style.boxShadow = '0 4px 14px rgba(0, 208, 132, 0.3)'
                  }}
                  onMouseLeave={e => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 208, 132, 0.2)'
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