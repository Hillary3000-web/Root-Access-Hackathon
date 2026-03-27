import { useLocation, useNavigate } from 'react-router-dom'

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
    maxWidth: '540px',
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
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    paddingBottom: '1.2rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  statusIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    flexShrink: 0,
  },
  title: {
    color: '#ffffff',
    margin: 0,
    fontSize: '1.4rem',
    fontWeight: 700,
    letterSpacing: '-0.3px',
  },
  statusText: {
    margin: '0.2rem 0 0',
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    color: '#00d084',
    fontWeight: 700,
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '0.8rem',
  },
  detailCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '14px',
    padding: '1rem 1.2rem',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.6rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  rowLast: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.6rem 0',
    borderBottom: 'none',
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.85rem',
  },
  value: {
    color: '#ffffff',
    fontSize: '0.85rem',
    fontWeight: 600,
    textAlign: 'right',
    maxWidth: '60%',
    wordBreak: 'break-word',
  },
  amountBig: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#ffffff',
    textAlign: 'center',
    margin: '0.5rem 0 0.2rem',
    letterSpacing: '-0.5px',
  },
  amountLabel: {
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  refBox: {
    background: 'rgba(0, 208, 132, 0.06)',
    border: '1px solid rgba(0, 208, 132, 0.15)',
    borderRadius: '10px',
    padding: '0.7rem 1rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  refLabel: {
    fontSize: '0.72rem',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.2rem',
  },
  refValue: {
    fontSize: '0.82rem',
    color: '#00d084',
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    wordBreak: 'break-all',
  },
  actionRow: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  btnPrimary: {
    flex: 1,
    padding: '0.85rem',
    background: '#00d084',
    color: '#0a0f1e',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 15px rgba(0, 208, 132, 0.2)',
  },
  btnSecondary: {
    flex: 1,
    padding: '0.85rem',
    background: 'transparent',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s ease',
  },
}

const statusConfig = {
  successful: { color: '#00d084', bg: 'rgba(0, 208, 132, 0.12)', icon: '✅', label: 'Successful' },
  failed: { color: '#fc8181', bg: 'rgba(229, 62, 62, 0.12)', icon: '❌', label: 'Failed' },
  pending: { color: '#f6ad55', bg: 'rgba(214, 158, 46, 0.12)', icon: '⏳', label: 'Pending' },
}

export default function TransactionDetail() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const tx = state?.transaction

  if (!tx) {
    navigate('/transactions')
    return null
  }

  const s = statusConfig[tx.status] || statusConfig.pending

  return (
    <div style={styles.page} className="mr-page-center">
      <div style={styles.card} className="mr-auth-card">
        <button
          onClick={() => navigate('/transactions')}
          style={styles.backBtn}
          onMouseEnter={e => (e.target.style.color = '#00b975')}
          onMouseLeave={e => (e.target.style.color = '#00d084')}
        >
          ← Back to History
        </button>

        {/* Status Header */}
        <div style={styles.header}>
          <div style={{ ...styles.statusIcon, background: s.bg }}>
            {s.icon}
          </div>
          <div>
            <h2 style={styles.title}>Payment {s.label}</h2>
            <p style={{ ...styles.statusText, color: s.color }}>{s.label}</p>
          </div>
        </div>

        {/* Amount */}
        <p style={styles.amountBig}>₦{Number(tx.amount).toLocaleString()}</p>
        <p style={styles.amountLabel}>Nigerian Naira</p>

        {/* Transaction Ref */}
        <div style={styles.refBox}>
          <div style={styles.refLabel}>Transaction Reference</div>
          <div style={styles.refValue}>{tx.transaction_ref}</div>
        </div>

        {/* Hospital Details */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>🏥 Hospital Details</div>
          <div style={styles.detailCard}>
            <div style={styles.row}>
              <span style={styles.label}>Hospital</span>
              <span style={styles.value}>{tx.hospitals?.name || 'N/A'}</span>
            </div>
            <div style={styles.rowLast}>
              <span style={styles.label}>Location</span>
              <span style={styles.value}>{tx.hospitals?.location || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>👤 Patient Details</div>
          <div style={styles.detailCard}>
            <div style={tx.patient_id ? styles.row : styles.rowLast}>
              <span style={styles.label}>Patient Name</span>
              <span style={styles.value}>{tx.patient_name}</span>
            </div>
            {tx.patient_id && (
              <div style={styles.rowLast}>
                <span style={styles.label}>Patient ID</span>
                <span style={styles.value}>{tx.patient_id}</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>💳 Payment Details</div>
          <div style={styles.detailCard}>
            <div style={styles.row}>
              <span style={styles.label}>Date</span>
              <span style={styles.value}>
                {new Date(tx.created_at).toLocaleDateString('en-NG', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>Time</span>
              <span style={styles.value}>
                {new Date(tx.created_at).toLocaleTimeString('en-NG', {
                  hour: '2-digit', minute: '2-digit',
                })}
              </span>
            </div>
            <div style={styles.rowLast}>
              <span style={styles.label}>Description</span>
              <span style={styles.value}>{tx.description || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={styles.actionRow}>
          <button
            onClick={() => navigate('/transactions')}
            style={styles.btnSecondary}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.05)'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            ← Back
          </button>
          <button
            onClick={() => navigate('/hospitals')}
            style={styles.btnPrimary}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = '0 6px 20px rgba(0, 208, 132, 0.3)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 15px rgba(0, 208, 132, 0.2)'
            }}
          >
            New Payment →
          </button>
        </div>
      </div>
    </div>
  )
}
