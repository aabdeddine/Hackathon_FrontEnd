import { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { EventF, getOneEvent } from './Events.api'
import axios from 'axios'




export const DeleteEvent = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  console.log('params id::', id)
  const { data: eventFest } = useQuery<EventF>({
    queryKey: ['getOneEvent', id],
    queryFn: () => {
      if (!id) {
        throw Error('event id not found')
      }
      return getOneEvent(+id)
    },
    enabled: !!id,
  })
  console.log('eventFest', eventFest)


  


  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!eventFest) {
      return
    }
    axios.delete(`${import.meta.env.VITE_LOCAL_HOST}/api/festival/${id}`)
        .then(response => {
            console.log(`Deleted event with ID ${id}}`);
            console.log(response)
            navigate('/')
        })
        .catch(error => {
            console.error(error);
        });
  }

  return (
    <div className="pt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
      <h2 className="font-bold text-xl mb-6">Suppression d'un événement</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="font-bold text-xl mb-6"> Festival {eventFest?.event_name}</h2>
        <div className='mb-4'>
            <h3 className="font-semibold text-lg"> Lieu  de déroulement</h3>
            <p>Ville : {eventFest?.municipality} {eventFest?.postal_code}</p>
            <p>Département : {eventFest?.department}  </p>
            <p>Région :  {eventFest?.region}</p>
            <h3>Adresse complète</h3>
            <p>{eventFest?.road_number} {eventFest?.road_type} {eventFest?.road_name} </p>
        </div>        

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Valider la suppression de l'événement
        </button>
      </form>
    
    </div>
  )
}
