import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Hospitals from './pages/Hospitals'
import Payment from './pages/Payment'
import Transactions from './pages/Transactions'
import TransactionDetail from './pages/TransactionDetail'
import Receipt from './pages/Receipt'
import Profile from './pages/Profile'
import PaymentSimulator from './pages/PaymentSimulator'
import PayLink from './pages/PayLink'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hospitals" element={<ProtectedRoute><Hospitals /></ProtectedRoute>} />
      <Route path="/payment/callback" element={<Receipt />} />
      <Route path="/payment/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path="/payment-gateway" element={<PaymentSimulator />} />
      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/transactions/:id" element={<ProtectedRoute><TransactionDetail /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/pay/:linkId" element={<PayLink />} />
    </Routes>
  )
}

export default App
