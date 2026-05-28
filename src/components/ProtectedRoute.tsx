import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, isLoading } = useAuth()

  if (isLoading) return <div className="min-h-screen bg-zinc-950" />

  if (!token) return <Navigate to="/login" replace />

  return <>{children}</>
}