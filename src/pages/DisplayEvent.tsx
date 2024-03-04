import { useQuery } from '@tanstack/react-query'
import { useParams, Link, NavLink } from 'react-router-dom'
import { EventF, getOneEvent } from '../events/Events.api'

export default function DisplayEvent() {
  const { id } = useParams()
  /* 
  const { session } = useAuth()
  console.log('<DisplayEvent/>', session)
 */
  //const navigate = useNavigate()
  const {
    data: eventF,
    isLoading,
    error,
  } = useQuery<EventF>({
    queryKey: ['getOneEvent', id],
    queryFn: () => getOneEvent(id ? id : ''),
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>
  }

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-sm text-center rounded-md bg-neutral-100 p-6 mt-6">
 
      <h2 className="font-bold text-xl mb-6"> Festival {eventF?.event_name}</h2>
      <div className='mb-4'>
        <h3 className="font-semibold text-lg"> Lieu  de déroulement</h3>
        <p>Ville : {eventF?.municipality} {eventF?.postal_code}</p>
        <p>Département : {eventF?.department}  </p>
        <p>Région :  {eventF?.region}</p>
        <h3>Adresse complète</h3>
        <p>{eventF?.road_number} {eventF?.road_type} {eventF?.road_name} </p>
      </div>
      
      <div className='mb-4'>
        <h3 className="font-semibold text-lg">Genre d'événement</h3>
        <p>{eventF?.discipline}</p> 
        <p>{eventF?.subcategory}</p>
      </div>
      
      <div className='mb-4'>
        <h3 className="font-semibold text-lg">Contacts</h3>
        <p>Site Web : <a href={eventF?.website} target="_blank" rel="noopener noreferrer" className=' text-indigo-700'>{eventF?.website}</a></p>
        <p>Adresse Email : {eventF?.mail}</p>
      </div>
      
      
      
      <div className='mb-4 flex'>
        <NavLink to={`/events/results/edit/${eventF?.id}`}>
        <button className="flex w-36 justify-center mr-1 rounded-md bg-orange-400 hover:bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          Modifier 
        </button>
        </NavLink>
        <NavLink to={`/events/results/delete/${eventF?.id}`}>
        <button className="flex w-36 justify-center rounded-md bg-red-700 hover:bg-brown-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
           Supprimer
        </button>
        </NavLink>
        
      </div>
      <Link to="/events/">
      <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-orange-400 hover:bg-ornage-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Nouvelle Recherche d'événement
      </button>
      </Link>
      

    </div>
  )
}
