import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface State {
  email: string
  username: string
  password: string
  passwordConfirmation: string
  errorMessage: string
  successMessage: string
}

const SignUp: React.FC = () => {
  const [state, setState] = useState<State>({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    errorMessage: '',
    successMessage: '',
  })
  const navigate = useNavigate()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, username, password, passwordConfirmation } = state

    if (password !== passwordConfirmation) {
      setState((prevState) => ({ ...prevState, errorMessage: 'Les mots de passe ne correspondent pas...' }))
      return
    }

    const apiUrl = `${import.meta.env.VITE_LOCAL_HOST}/api/user/`

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, passwordConfirmation }),
      })

      if (response.status === 201) {
        setState((prevState) => ({ ...prevState, successMessage: 'Utilisateur créé', errorMessage: '' }))
        navigate('/')
      } else {
        const data = await response.json()
        setState((prevState) => ({ ...prevState, errorMessage: data.error || "Une erreur s'est produite" }))
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: "Une erreur s'est produite lors de la communication avec le serveur",
      }))
      console.error('Error:', error)
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1>Création de compte</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mt-2">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Pseudo:</label>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Confirmation de mot de passe:</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={state.passwordConfirmation}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Valider
        </button>
      </form>
      {state.errorMessage && <div className="error">{state.errorMessage}</div>}
      {state.successMessage && <div className="success">{state.successMessage}</div>}
    </div>
  )
}

export default SignUp
