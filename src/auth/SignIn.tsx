import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export type Token = {
  token_type: string
  exp: number
  iat: number
  jti: string
  is_superuser: boolean
  user_id: number
}

const Login = () => {
  const navigate = useNavigate()
  const { signIn, status, session } = useAuth()
  const [username, setusername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (status === 'signedIn') {
      console.log('status in Login::', status)

      navigate(`/events`)
    }
  }, [session, status, navigate])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signIn({
      username: username,
      password: password,
    })
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Connectez-vous !</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="flex flex-col justify-center space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Identifiant ou Pseudo
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  onChange={(e) => setusername(e.target.value)}
                  className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mot de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex flex-col item-center">
              <button
                type="submit"
                className="flex w-auto justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              >
                Se connecter
              </button>
              <span className="text-center">----</span>
              <NavLink
                to="/signup"
                className="flex w-auto justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black-400 shadow-sm hover:bg-orange-400 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50"
              >
                Créer un compte
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
