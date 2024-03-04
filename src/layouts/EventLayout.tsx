import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useEffect } from 'react'

export function EventLayout() {
  const { session } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (session.userId === 0) {
      navigate('/events')
    }
  }, [session, navigate])

  return (
    <main className="flex  w-screen flex-col placeholder:item-center justify-center ">
      <Outlet />
    </main>
  )
}
