import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const CrossIcon = ({ color = '#00d084', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const CheckCircle = ({ color = '#00d084', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const PlayIcon = ({ color = '#ffffff', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const ShieldIcon = ({ color = '#a0aec0', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const LockIcon = ({ color = '#a0aec0', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ZapIcon = ({ color = '#a0aec0', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const FeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const HospitalIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const TrackingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
  </svg>
);

const SecureIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const ReceiptIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  :root {
    --bg-dark: #0a0f1e;
    --primary-green: #00d084;
    --primary-green-hover: #00b975;
    --text-white: #ffffff;
    --text-gray-light: #9ca3af;
    --bg-light: #ffffff;
    --bg-light-gray: #f9fafb;
    --text-dark: #111827;
    --text-gray: #4b5563;
    --border-subtle: rgba(255,255,255,0.1);
    --border-light: #e5e7eb;
  }

  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  /* Scroll Animations */
  .fade-in-section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Utilities */
  .yc-gradient-text {
    background: linear-gradient(90deg, #fff 0%, #a1a1aa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Navbar */
  .yc-navbar {
    position: fixed;
    top: 0; width: 100%; z-index: 1000;
    padding: 1.25rem 2rem;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(10, 15, 30, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-subtle);
    transition: all 0.3s ease;
  }
  .yc-logo-wrapper { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
  .yc-logo-text { color: var(--text-white); font-weight: 800; font-size: 1.25rem; letter-spacing: -0.5px; }
  .yc-nav-actions { display: flex; gap: 1rem; align-items: center; }
  
  .yc-btn-ghost {
    background: transparent; color: var(--text-white);
    border: none; padding: 0.5rem 1rem; font-weight: 600; font-size: 0.95rem;
    cursor: pointer; transition: color 0.2s; font-family: 'Inter', sans-serif;
  }
  .yc-btn-ghost:hover { color: var(--primary-green); }
  
  .yc-btn-primary {
    background: var(--primary-green); color: #000;
    border: none; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; font-size: 0.95rem;
    cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 14px rgba(0, 208, 132, 0.2);
  }
  .yc-btn-primary:hover { transform: translateY(-1px); background: var(--primary-green-hover); box-shadow: 0 6px 20px rgba(0, 208, 132, 0.3); }

  /* Hero Section */
  .yc-hero {
    position: relative;
    padding: 10rem 2rem 6rem;
    min-height: 100vh;
    background: var(--bg-dark);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    overflow: hidden; text-align: center;
  }
  .yc-hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: 
      radial-gradient(circle at 15% 50%, rgba(0, 208, 132, 0.08), transparent 25%),
      radial-gradient(circle at 85% 30%, rgba(43, 108, 176, 0.08), transparent 25%);
  }
  .yc-hero-content { position: relative; z-index: 1; max-width: 800px; width: 100%; display: flex; flex-direction: column; align-items: center; }
  
  .yc-pill {
    background: rgba(0, 208, 132, 0.1);
    color: var(--primary-green);
    border: 1px solid rgba(0, 208, 132, 0.2);
    padding: 0.5rem 1rem; border-radius: 999px;
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
    margin-bottom: 2rem; display: inline-flex; align-items: center; gap: 0.5rem;
  }
  
  .yc-hero-title {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 900; color: var(--text-white);
    line-height: 1.05; letter-spacing: -2px; margin: 0 0 1.5rem;
  }
  
  .yc-hero-sub {
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    color: var(--text-gray-light); line-height: 1.6;
    max-width: 600px; margin: 0 0 2.5rem;
  }
  
  .yc-hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-bottom: 4rem; }
  
  .yc-btn-large {
    padding: 1rem 2rem; border-radius: 100px; font-size: 1.05rem;
  }
  .yc-btn-outline {
    background: transparent; color: var(--text-white);
    border: 1px solid var(--border-subtle); padding: 1rem 2rem; border-radius: 100px;
    font-weight: 600; font-size: 1.05rem; cursor: pointer; transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 0.5rem; font-family: 'Inter', sans-serif;
  }
  .yc-btn-outline:hover { background: rgba(255,255,255,0.05); }

  /* Hero Stats (Glassmorphism) */
  .yc-hero-stats {
    display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; width: 100%; max-width: 900px;
  }
  .yc-stat-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-subtle);
    padding: 1.25rem; border-radius: 16px;
    display: flex; align-items: center; gap: 1rem; flex: 1; min-width: 250px;
    text-align: left;
  }
  .yc-stat-icon { background: rgba(0, 208, 132, 0.1); padding: 0.75rem; border-radius: 12px; }
  .yc-stat-title { color: var(--text-white); font-weight: 700; font-size: 1.1rem; margin-bottom: 0.2rem; }
  .yc-stat-sub { color: var(--text-gray-light); font-size: 0.85rem; }

  /* Trust Badges */
  .yc-trust-row {
    background: #060a14; padding: 2rem 2rem;
    display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap;
    border-bottom: 1px solid var(--border-subtle);
  }
  .yc-trust-badge { display: flex; align-items: center; gap: 0.5rem; color: #a0aec0; font-size: 0.9rem; font-weight: 500; }

  /* Section Header */
  .yc-section-header { text-align: center; max-width: 700px; margin: 0 auto 4rem; }
  .yc-section-title { font-size: 2.5rem; font-weight: 800; color: var(--text-dark); letter-spacing: -1px; margin-bottom: 1rem; }

  /* Problem Section (3-column grid) */
  .yc-problem { background: var(--bg-light); padding: 6rem 2rem; }
  .yc-problem-grid {
    max-width: 1000px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  }
  @media (max-width: 768px) { .yc-problem-grid, .yc-timeline { grid-template-columns: 1fr !important; } }
  .yc-problem-card {
    position: relative; padding: 2.5rem 2rem; background: var(--bg-light); border-radius: 16px;
    border: 1px solid var(--border-light); border-top: 4px solid #e53e3e;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    text-align: center;
  }
  .yc-problem-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
  .yc-problem-icon { margin: 0 auto 1.5rem; display: inline-flex; padding: 1rem; background: rgba(229, 62, 62, 0.1); border-radius: 16px; }
  .yc-problem-text h3 { margin: 0 0 1rem; font-size: 1.25rem; color: var(--text-dark); font-weight: 700; line-height: 1.3; }
  .yc-problem-text p { margin: 0; color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; }

  /* How It Works */
  .yc-how-bg { background: var(--bg-light-gray); padding: 6rem 2rem; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); }
  .yc-timeline {
    max-width: 1000px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  }
  .yc-step { position: relative; padding: 2.5rem 2rem; background: var(--bg-light); border-radius: 16px; border: 1px solid var(--border-light); text-align: center; transition: transform 0.2s; }
  .yc-step:hover { transform: translateY(-4px); }
  .yc-step-num {
    width: 48px; height: 48px; background: var(--text-dark); color: #fff;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 1.2rem; margin: 0 auto 1.5rem;
  }
  .yc-step h3 { margin: 0 0 1rem; font-size: 1.25rem; color: var(--text-dark); font-weight: 700; }
  .yc-step p { margin: 0; color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; }

  /* Features - Glassmorphism on light */
  .yc-features { background: var(--bg-light); padding: 6rem 2rem; position: relative; overflow: hidden; }
  .yc-features-blob { position: absolute; top: 50%; left: 50%; width: 600px; height: 600px; background: rgba(0, 208, 132, 0.1); filter: blur(100px); transform: translate(-50%, -50%); border-radius: 50%; z-index: 0; pointer-events: none; }
  .yc-features-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; position: relative; z-index: 1; }
  .yc-feature-card {
    background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5); padding: 2.5rem; border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); transition: transform 0.3s;
  }
  .yc-feature-card:hover { transform: translateY(-4px); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08); }
  .yc-feature-icon { margin-bottom: 1.5rem; display: inline-flex; padding: 1rem; background: rgba(0, 208, 132, 0.1); border-radius: 16px; }
  .yc-feature-card h3 { margin: 0 0 0.75rem; font-size: 1.25rem; color: var(--text-dark); font-weight: 700; }
  .yc-feature-card p { margin: 0; color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; }

  /* CTA Banner */
  .yc-cta-wrapper { width: 100%; display: flex; }
  .yc-cta {
    background: linear-gradient(135deg, #0a0f1e 0%, #111827 100%);
    padding: 8rem 2rem 6rem; text-align: center;
    width: 100%; position: relative; overflow: hidden;
  }
  .yc-cta-inner { position: relative; z-index: 1; }
  .yc-cta h2 { color: #fff; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -1px; margin: 0 0 2rem; }
  
  /* Footer */
  .yc-footer { background: #060a14; padding: 4rem 2rem 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
  .yc-footer-logo { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem; }
  .yc-footer-logo-text { color: #fff; font-weight: 800; font-size: 1.25rem; }
  .yc-footer p { color: var(--text-gray-light); font-size: 0.9rem; margin: 0 0 0.5rem; }

  /* Utilities & Mobile adjustments */
  @media (max-width: 600px) {
    .yc-hero { padding: 8rem 1rem 4rem; }
    .yc-stat-card { min-width: 100%; }
    .yc-cta { border-radius: 0; }
  }
`;

export default function LandingPage() {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    // Inject Styles
    if (!document.getElementById('landing-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'landing-styles';
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }

    // Initialize Intersection Observer for Scroll Animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    observerRef.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animate only once per section
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-section');
    animatedElements.forEach(el => observerRef.current.observe(el));

    return () => {
      const styleSheet = document.getElementById('landing-styles');
      if (styleSheet) {
        document.head.removeChild(styleSheet);
      }
      if (observerRef.current) {
        animatedElements.forEach(el => observerRef.current.unobserve(el));
      }
    };
  }, []);

  return (
    <>
      <nav className="yc-navbar">
        <div className="yc-logo-wrapper" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <CrossIcon size={24} />
          <span className="yc-logo-text">MediRemit</span>
        </div>
        <div className="yc-nav-actions">
          <button className="yc-btn-ghost" onClick={() => navigate('/login')}>Login</button>
          <button className="yc-btn-primary" onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      {/* Hero doesn't need animation since it's above the fold */}
      <section className="yc-hero">
        <div className="yc-hero-bg"></div>
        <div className="yc-hero-content">
          <div className="yc-pill">
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#00d084' }}></span>
            Cross-border healthcare payments
          </div>
          
          <h1 className="yc-hero-title">
            Your mum needs care. <br/>
            <span className="yc-gradient-text">Pay her hospital right now.</span>
          </h1>
          
          <p className="yc-hero-sub">
            Skip the wire transfer. MediRemit sends money directly to Nigerian hospitals — in seconds, not days.
          </p>
          
          <div className="yc-hero-btns">
            <button className="yc-btn-primary yc-btn-large" onClick={() => navigate('/register')}>
              Get Started Free
            </button>
            <button className="yc-btn-outline" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              <PlayIcon /> Watch Demo
            </button>
          </div>

          <div className="yc-hero-stats">
            <div className="yc-stat-card">
              <div className="yc-stat-icon"><CheckCircle size={24} color="#00d084"/></div>
              <div>
                <div className="yc-stat-title">₦0 Hidden Fees</div>
                <div className="yc-stat-sub">Real mid-market exchange rates</div>
              </div>
            </div>
            <div className="yc-stat-card">
              <div className="yc-stat-icon"><CheckCircle size={24} color="#00d084"/></div>
              <div>
                <div className="yc-stat-title">&lt; 30 Seconds</div>
                <div className="yc-stat-sub">Instant direct hospital settlement</div>
              </div>
            </div>
            <div className="yc-stat-card">
              <div className="yc-stat-icon"><CheckCircle size={24} color="#00d084"/></div>
              <div>
                <div className="yc-stat-title">50+ Hospitals</div>
                <div className="yc-stat-sub">Partnered across major cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fade-in-sections below the fold */}
      <section className="yc-trust-row fade-in-section">
        <div className="yc-trust-badge"><ShieldIcon /> Secured by Interswitch</div>
        <div className="yc-trust-badge"><LockIcon /> Bank-grade encryption</div>
        <div className="yc-trust-badge"><ZapIcon /> Instant Confirmation</div>
      </section>

      <section className="yc-problem fade-in-section">
        <div className="yc-section-header">
          <h2 className="yc-section-title">Wire transfers are broken for healthcare.</h2>
        </div>
        
        <div className="yc-problem-grid">
          <div className="yc-problem-card">
            <div className="yc-problem-icon"><ClockIcon /></div>
            <div className="yc-problem-text">
              <h3>Traditional transfers take days</h3>
              <p>When your loved one needs urgent care, you can't afford to wait 3-5 business days for funds to clear.</p>
            </div>
          </div>
          <div className="yc-problem-card">
            <div className="yc-problem-icon"><FeeIcon /></div>
            <div className="yc-problem-text">
              <h3>You lose up to 10% in fees</h3>
              <p>Correspondent banks, hidden FX markups, and withdrawal fees eat away at the money meant for their care.</p>
            </div>
          </div>
          <div className="yc-problem-card">
            <div className="yc-problem-icon"><AlertIcon /></div>
            <div className="yc-problem-text">
              <h3>Zero payment guarantee</h3>
              <p>Sending cash to relatives doesn't guarantee it reaches the hospital. Medical emergencies require certainty.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="yc-how-bg fade-in-section">
        <div className="yc-section-header">
          <h2 className="yc-section-title">How MediRemit Works</h2>
        </div>
        <div className="yc-timeline">
          <div className="yc-step">
            <div className="yc-step-num">1</div>
            <h3>Find the Hospital</h3>
            <p>Search our verified network of partner hospitals in Nigeria by name, location, or specialty.</p>
          </div>
          <div className="yc-step">
            <div className="yc-step-num">2</div>
            <h3>Enter Payment Details</h3>
            <p>Input the patient's ID and the amount needed. Pay using your local currency card or bank account.</p>
          </div>
          <div className="yc-step">
            <div className="yc-step-num">3</div>
            <h3>Hospital Gets Paid Instantly</h3>
            <p>The funds are deposited directly into the hospital's account immediately. Both of you receive instant receipts.</p>
          </div>
        </div>
      </section>

      <section className="yc-features fade-in-section">
        <div className="yc-features-blob"></div>
        <div className="yc-section-header" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="yc-section-title">Purpose-built for diaspora payments</h2>
        </div>
        <div className="yc-features-grid">
          <div className="yc-feature-card">
            <div className="yc-feature-icon"><HospitalIcon /></div>
            <h3>Direct Hospital Payment</h3>
            <p>We bypass middlemen entirely. Our direct integration with hospital billing systems ensures your money goes straight to the source.</p>
          </div>
          <div className="yc-feature-card">
            <div className="yc-feature-icon"><TrackingIcon /></div>
            <h3>Transaction Tracking</h3>
            <p>Track your payment status in real-time from your dashboard. Know the exact moment it's received.</p>
          </div>
          <div className="yc-feature-card">
            <div className="yc-feature-icon"><SecureIcon /></div>
            <h3>Secure Checkout</h3>
            <p>PCI-DSS compliant payment processing. Your card details are never stored on our servers.</p>
          </div>
          <div className="yc-feature-card">
            <div className="yc-feature-icon"><ReceiptIcon /></div>
            <h3>Instant Receipt</h3>
            <p>Generate verifiable PDF receipts instantly so your family member can present proof of payment at the desk.</p>
          </div>
        </div>
      </section>

      <section className="yc-cta-wrapper fade-in-section">
        <div className="yc-cta">
          <div className="yc-cta-inner">
            <h2 className="yc-hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Your family deserves certainty.<br/>Give it to them.</h2>
            <button className="yc-btn-primary yc-btn-large" onClick={() => navigate('/register')} style={{ marginTop: '1rem' }}>
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      <footer className="yc-footer fade-in-section">
        <div className="yc-footer-logo">
          <CrossIcon size={20} />
          <span className="yc-footer-logo-text">MediRemit</span>
        </div>
        <p>Secure cross-border healthcare payments.</p>
        <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '1rem' }}>© 2026 MediRemit. All rights reserved.</p>
      </footer>
    </>
  );
}
