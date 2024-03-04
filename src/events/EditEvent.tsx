import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { EventF, getOneEvent, updateEvent } from './Events.api'

export const EditEvent = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  console.log('params id::', id)

  const { data: eventFest } = useQuery<EventF>({
    queryKey: ['getOneEvent', id],
    queryFn: () => {
      if (!id) {
        throw Error('event id not found')
      }
      return getOneEvent(id)
    },
    enabled: !!id,
  })
  console.log('eventFest', eventFest)

  const mutationUpdateEvent = useMutation({
    mutationFn: updateEvent,
    onError(error) {
      console.log("The new event can't be created::", error)
    },
    onSuccess(updatedEvent) {
      navigate(`${updatedEvent.id}`)
    },
  })

  const [state, setState] = useState<EventF | undefined>()
  console.log('state::', state)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (!eventFest) {
      return
    }
    setState((prevState) => ({
      ...(prevState ?? eventFest),
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!eventFest) {
      return
    }
    mutationUpdateEvent.mutate(state ?? eventFest)
  }

  return (
    <div className="pt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
      <h1 className="font-bold text-xl mb-6">Modification d'un événement</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Nom de l'événement:</label>
          <input
            type="text"
            name="event_name"
            value={eventFest?.event_name}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Région:</label>
          <input
            type="text"
            name="region"
            value={eventFest?.region}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Département : </label>
          <input
            type="text"
            name="department"
            value={eventFest?.department}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Ville:</label>
          <input
            type="text"
            name="municipality"
            value={eventFest?.municipality}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Code postal:</label>
          <input
            type="text"
            name="postal_code"
            value={eventFest?.postal_code}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Type de voie:</label>
          <input
            type="text"
            name="road_type"
            value={eventFest?.road_type}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Numéro de voie:</label>
          <input
            type="text"
            name="road_number"
            value={eventFest?.road_number}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Nom de voie:</label>
          <input
            type="text"
            name="road_name"
            value={eventFest?.road_name}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">complement :</label>
          <input
            type="text"
            name="complement"
            value={eventFest?.complement}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Email de contact:</label>
          <input
            type="email"
            name="mail"
            value={eventFest?.mail}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Site Web:</label>
          <input
            type="url"
            name="website"
            value={eventFest?.website}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Catégorie de festival:</label>
          <input
            type="text"
            name="discipline"
            value={eventFest?.discipline}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Sous Catégorie:</label>
          <input
            type="text"
            name="subcategory"
            value={eventFest?.subcategory}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Geo-coordonnées:</label>
          <input
            placeholder="coordonnées X"
            type="float "
            name="geocoordinates_x"
            value={eventFest?.geocoordinates_x}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            placeholder="coordonnées Y"
            type="float"
            name="geocoordinates_y"
            value={eventFest?.geocoordinates_y}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Date du festival:</label>
          <input
            type="date"
            name="date"
            value={eventFest?.date}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Valider la Modification de l'événement
        </button>
      </form>
      {/*  {mutationPostEvent.isError && <div className="error">{`${mutationPostEvent.error}`}</div>}
      {mutationPostEvent.isSuccess && <div className="success">L'événement a bien été créé</div>} */}
    </div>
  )
}
