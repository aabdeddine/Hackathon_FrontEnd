import { useState, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postEvent } from '../events/Events.api'

export type EventFormData = {
  event_name: string
  region: string
  department: string
  municipality: string
  postal_code: string
  complement: string
  road_type: string
  road_name: string
  road_number: string
  mail: string
  website: string
  discipline: string
  subcategory: string
  geocoordinates_x: number
  geocoordinates_y: number
  date: string
}

export const NewEvent = () => {
  const mutationPostEvent = useMutation({
    mutationFn: postEvent,
    onError(error) {
      console.log("The new event can't be created::", error)
    },
    onSuccess(newEvent) {
      console.log('newEvent in mutation success::', newEvent)
    },
  })

  const [state, setState] = useState<EventFormData>({
    event_name: '',
    region: '',
    department: '',
    municipality: '',
    postal_code: '',
    complement: '',
    road_type: '',
    road_name: '',
    road_number: '',
    mail: '',
    website: '',
    discipline: '',
    subcategory: '',
    geocoordinates_x: 0,
    geocoordinates_y: 0,
    date: '',
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    return mutationPostEvent.mutate({ ...state })
  }

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-sm text-center rounded-md bg-neutral-100 p-6 mt-6">
      <h3 className="font-semibold mb-6">Création d'un nouvel événement</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 justify-center">
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Nom de l'événement</label>
          <input
            type="text"
            name="event_name"
            value={state.event_name}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Région</label>
          <input
            type="text"
            name="region"
            value={state.region}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Département </label>
          <input
            type="text"
            name="department"
            value={state.department}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Ville</label>
          <input
            type="text"
            name="municipality"
            value={state.municipality}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Code postal</label>
          <input
            type="text"
            name="postal_code"
            value={state.postal_code}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Type de voie</label>
          <input
            type="text"
            name="road_type"
            value={state.road_type}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Numéro de voie</label>
          <input
            type="text"
            name="road_number"
            value={state.road_number}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Nom de voie</label>
          <input
            type="text"
            name="road_name"
            value={state.road_name}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Complément d'adresse</label>
          <input
            type="text"
            name="complement"
            value={state.complement}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Email de contact</label>
          <input
            type="email"
            name="mail"
            value={state.mail}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Site Web</label>
          <input
            type="url"
            name="website"
            value={state.website}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Catégorie de festival</label>
          <input
            type="text"
            name="discipline"
            value={state.discipline}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Sous Catégorie</label>
          <input
            type="text"
            name="subcategory"
            value={state.subcategory}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Geo-coordonnées</label>
          <input
            placeholder="coordonnées X"
            type="float "
            name="geocoordinates_x"
            value={state.geocoordinates_x}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            placeholder="coordonnées Y"
            type="float"
            name="geocoordinates_y"
            value={state.geocoordinates_y}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-left text-gray-900">Date du festival</label>
          <input
            type="date"
            name="date"
            value={state.date}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0  p-1 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          className="flex w-auto justify-center rounded-md bg-orange-400 hover:bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Créer l'événement
        </button>
      </form>
      {mutationPostEvent.isError && <div className="error">{`${mutationPostEvent.error}`}</div>}
      {mutationPostEvent.isSuccess && <div className="success">L'événement a bien été créé</div>}
    </div>
  )
}
