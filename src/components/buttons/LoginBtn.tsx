import { useNavigate } from 'react-router-dom'

export function LoginBtn() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/signin')}
      className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
    >
      LogIn
    </button>
  )
}
