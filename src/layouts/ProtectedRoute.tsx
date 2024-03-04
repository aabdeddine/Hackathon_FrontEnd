import { ReactNode, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const { status } = useAuth()
  useEffect(() => {
    if (status === 'signedOut') {
      navigate('/login')
    }
  }, [status, navigate])
  return children
}
