import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface State {
  email: string
  username: string
  password: string
  password2: string
  errorMessage: string
  successMessage: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const [state, setState] = useState<State>({
    email: '',
    username: '',
    password: '',
    password2: '',
    errorMessage: '',
    successMessage: '',
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, username, password, password2 } = state

    if (password !== password2) {
      setState((prevState) => ({ ...prevState, errorMessage: 'Les mots de passe ne correspondent pas...' }))
      return
    }

    const apiUrl = `${import.meta.env.VITE_LOCAL_HOST}/api/register/`

    try {
      const response = await axios.post(
        apiUrl,
        {
          email,
          username,
          password,
          password2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 201) {
        setState((prevState) => ({ ...prevState, successMessage: 'Utilisateur créé', errorMessage: '' }))
        navigate('/signin')
      } else {
        setState((prevState) => ({ ...prevState, errorMessage: response.data.error || "Une erreur s'est produite" }))
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
      <h3 className="font-semibold text-center text-xl mb-6">Création de compte</h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-centerspace-y-6">
        <div className="mt-2">
          <label>Email</label>
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
          <label className="block text-sm font-medium leading-6 text-gray-900">Pseudo</label>
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
          <label className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
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
          <label className="block text-sm font-medium leading-6 text-gray-900">Confirmation du mot de passe</label>
          <input
            type="password"
            name="password2"
            value={state.password2}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          className="flex w-auto justify-center rounded-md bg-orange-400 mt-8 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
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
