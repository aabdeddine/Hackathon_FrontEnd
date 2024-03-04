import { useQuery } from '@tanstack/react-query'
import { EventListCard } from '../events/EventListCard'
import { getEvents } from '../events/Events.api'

export function EventsList() {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>
  }

  return (
    <>
      <h3 className="m-5 font-bold pl-4">Résultats de la recherche</h3>
      <section className=" flex flex-row flex-wrap w-full justify-center  p-4 m-auto  bg-slate-600 shadow-xl">
        {events?.map((event) => (
          <EventListCard key={event.id} {...event} />
        ))}
      </section>
    </>
  )
}
