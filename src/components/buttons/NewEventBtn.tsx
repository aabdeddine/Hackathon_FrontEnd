import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '@radix-ui/react-icons'

export function NewEventBtn() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/')} // create event
      className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
    >
      New <PlusIcon />
    </button>
  )
}
