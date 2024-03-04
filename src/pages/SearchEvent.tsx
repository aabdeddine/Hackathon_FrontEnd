import SearchEventByFilter from '../events/SearchEventByFilter'
import { SearchEventByName } from '../events/SearchEventByName'

const SearchEvent = () => {
  return (
    <div className="flex flex-col justify-around gap-6 mt-10">
      <SearchEventByName />
      <span className="font-extrabold text-center">ou</span>
      <SearchEventByFilter />
    </div>
  )
}

export default SearchEvent
