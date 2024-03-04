import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { createContext, useContext } from 'react'

export type Token = {
  token_type: string
  exp: number
  iat: number
  jti: string
  is_superuser: boolean
  user_id: number
}

export type Session = {
  userId: number
  isSuperUser: boolean
}

type SessionContextValue = Session & { setSession: (session: Session) => void }
type AuthStatus = 'signedIn' | 'signedOut'

export const SessionContext = createContext<SessionContextValue | undefined>(undefined)

const server = import.meta.env.VITE_LOCAL_HOST
/*  const server = `${window.location.protocol}//${window.location.hostname}:8000` */

function signIn(credentials: { username: string; password: string }) {
  return axios.post(`${server}/api/token/`, credentials).then((response) => {
    return jwt_decode(response.data.access) as Token
  })
}

export function storeToken(token: Token) {
  localStorage.setItem('token', JSON.stringify(token))
}

export function getToken() {
  const data = localStorage.getItem('token')
  if (data) {
    try {
      return JSON.parse(data) as Token
    } catch (error) {
      console.log('Got an error while decoding token from local storage')
    }
  }
  return null
}

export function useAuth() {
  const session = useContext(SessionContext)

  const signInMutation = useMutation({
    mutationKey: ['signIn'],
    mutationFn: signIn,
    onSuccess(data) {
      storeToken(data)
      session?.setSession({
        isSuperUser: data.is_superuser,
        userId: data.user_id,
      })
    },
  })

  if (!session) {
    throw new Error('useAuth cannot be called outside of its provider')
  }

  const status: AuthStatus = session.userId > 0 ? 'signedIn' : 'signedOut'

  return {
    session,
    status,
    signIn: signInMutation.mutate,
  } as const
}
