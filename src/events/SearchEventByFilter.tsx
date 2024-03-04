import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface State {
  region: string
  departement: string
  municipality: string
  discipline: string
}

const SearchEventByFilter = () => {
  const navigate = useNavigate()
  const [state, setState] = useState<State>({
    region: '',
    departement: '',
    municipality: '',
    discipline: '',
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
    const { region, departement, municipality, discipline } = state

    const apiUrl = `${import.meta.env.VITE_LOCAL_HOST}/api/user/`

    try {
      const response = await axios.post(
        apiUrl,
        {
          region,
          departement,
          municipality,
          discipline,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 201) {
        setState((prevState) => ({ ...prevState, successMessage: 'Demande de recherche envoyée', errorMessage: '' }))
        navigate('/DispalySearchResult')
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
    <div className=" sm:mx-auto sm:w-full sm:max-w-sm  p-6 font-semibold text-neutral-800  rounded-md border-2 border-black mx-2 bg-neutral-100">
      <h3>Un lieu ou un type en particulier ? </h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 justify-center">
        <div className="  mt-2">
          <label className="block text-sm font-medium leading-6  text-neutral-700">Région</label>
          <input
            type="text"
            name="region"
            value={state.region}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-700shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-700">Département</label>
          <input
            type="text"
            name="departement"
            value={state.departement}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-stone-2000 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-700">Ville</label>
          <input
            type="text"
            name="municipality"
            value={state.municipality}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-700">Catégorie d'événement</label>
          <input
            type="text"
            name="discipline"
            value={state.discipline}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          className="flex w-auto justify-center rounded-md bg-orange-400 text-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Rechercher
        </button>
      </form>
    </div>
  )
}

export default SearchEventByFilter
