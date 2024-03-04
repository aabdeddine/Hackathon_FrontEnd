import { useQuery } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import { getEvents, getEventsByName } from './Events.api'

export const SearchEventByName = () => {
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
  }

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })
  console.log(events)

  return (
    <div className=" sm:mx-auto sm:w-full sm:max-w-sm font-semibold rounded-md p-6 border-2 border-black mx-2 bg-neutral-100">
      <h3>Vous cherchez un événement précis ?</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mt-2">
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={(input: string) =>
              getEventsByName(input).then((v) => v.map((e) => ({ value: e.id, label: e.event_name })))
            }
            onChange={(opt) => opt && navigate(`results/${opt.value}`)}
          />
        </div>
      </form>
    </div>
  )
}
