import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { AuthCallback } from './pages/AuthCallback'
import { Landing } from './pages/Landing'

// replace <div>Landing</div> with:

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
      } />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  )
}

export default App