import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'https://mediremit-backend.onrender.com'

export default function Receipt() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [updating, setUpdating] = useState(true)

  const txnref = searchParams.get('txnref')
  const amount = searchParams.get('amount')
  const respCode = searchParams.get('respCode')
  const respDescription = searchParams.get('respDescription')

  const success = respCode === '00'

  useEffect(() => {
    if (txnref) {
      const status = success ? 'successful' : 'failed'
      axios.patch(`${API}/transactions/${txnref}/status`, { 
        status,
        simulatorSecret: 'mock-interswitch-secret-123'
      })
        .finally(() => setUpdating(false))
    } else {
      setUpdating(false)
    }
  }, [txnref])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2.5rem', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        
        {updating ? (
          <div>
            <div style={{ width: '48px', height: '48px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#00d084', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Processing your payment...</p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
              {success ? '✅' : '❌'}
            </div>
            <h2 style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {success ? 'Payment Successful!' : 'Payment Failed'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              {success ? 'The hospital has been notified and will prepare for your family member.' : 'Something went wrong. Please try again.'}
            </p>

            {txnref && (
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.2rem', marginBottom: '2rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Transaction Ref</span>
                  <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 600 }}>{txnref?.slice(0, 20)}...</span>
                </div>
                {amount && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Amount</span>
                    <span style={{ color: '#00d084', fontSize: '0.85rem', fontWeight: 700 }}>₦{Number(amount / 100).toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Status</span>
                  <span style={{ color: success ? '#00d084' : '#fc8181', fontSize: '0.85rem', fontWeight: 700 }}>
                    {success ? 'Successful' : 'Failed'}
                  </span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => navigate('/transactions')}
                style={{ flex: 1, padding: '0.85rem', background: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}
              >
                View History
              </button>
              <button
                onClick={() => navigate('/hospitals')}
                style={{ flex: 1, padding: '0.85rem', background: '#00d084', color: '#0a0f1e', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, fontFamily: "'Inter', sans-serif" }}
              >
                Pay Another
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}