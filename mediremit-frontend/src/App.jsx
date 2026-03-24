import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Hospitals from './pages/Hospitals'
import Payment from './pages/Payment'
import Transactions from './pages/Transactions'

function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/hospitals" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hospitals" element={<Hospitals />} />
      <Route path="/payment/:id" element={<Payment />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  )
}

export default App