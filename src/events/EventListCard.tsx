import { useNavigate } from 'react-router-dom'
import { EventF as EventF } from './Events.api'
import { StarIcon } from '@radix-ui/react-icons'

export const EventListCard = (event: EventF) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`${event.id}`)}
      className="flex h-48 sm:w-4/12 w-full flex-col justify-between items-start rounded-sm bg-neutral-50 m-4 pt-4"
    >
      <span className=" font-bold text-slate-800 uppercase pl-4">{event.event_name}</span>
      <div className="flex flex-row">
        <div className="flex justify-center items-center h-24 w-32 m-4 border-4 border-black">
          <StarIcon className="h-8 w-auto rotate-10" />
        </div>
        <div className="flex flex-col w-full justify-start items-center first-letter:justify-evenly p-4">
          <span className="  text-slate-800">{event.discipline}</span>
          <span className="text-xs font-light italic mb-2">{event.subcategory}</span>
        </div>
      </div>
      <div className="flex h-12 w-full rounded-b-sm justify-evenly items-center text-xs  text-slate-600 bg-neutral-200 ">
        <span className=" font-semibold px-2 text-slate-600">{event.date}</span>
        <span className=" font-semibold text-slate-900">|</span>
        <span className=" font-semibold px-2 text-slate-600">{event.municipality}</span>
      </div>
    </div>
  )
}
