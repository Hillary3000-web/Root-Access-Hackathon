import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Hospitals from './pages/Hospitals'
import Payment from './pages/Payment'
import Transactions from './pages/Transactions'
import Receipt from './pages/Receipt'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hospitals" element={<Hospitals />} />
      <Route path="/payment/callback" element={<Receipt />} />
      <Route path="/payment/:id" element={<Payment />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  )
}

export default App


