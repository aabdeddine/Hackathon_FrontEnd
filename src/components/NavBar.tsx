import { NavLink, useNavigate } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import '../css/DropDownMenu.css'
import { useAuth } from '../auth/AuthContext'
import { LoginBtn } from './buttons/LoginBtn'
import { RocketIcon } from '@radix-ui/react-icons'

const AppLogo = '/hackathon-logo.png'

export function NavBar() {
  const navigate = useNavigate()
  const { status } = useAuth()

  return (
    <nav className="sticky top-0 flex-1 border-b-2 border-black bg-orange-400 pb-2">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="sticky top-0 flex flex-col items-center  justify-start sm:justify-center pb-2 sm:items-stretch sm:flex-1 sm:flex-row">
            <img className="h-10 w-auto scale-125 hidden sm:flex m-2" src={`${AppLogo}`} alt="Your Company" />
            <div onClick={() => navigate('/events')} className="flex flex-col flex-shrink-0 items-start hover:cursor-pointer">
              <span className=" text-3xl font-bold sm:text-5xl font-marker text-black"> Bouge de ton Canap' !</span>
              <h1 className="text-sm font-light italic  text-black pl-1">Evenements et Festivals pour s'activer </h1>
            </div>
            <div className=" flex-1 justify-end items-center hidden sm:flex sm:ml-6 ">
              {status === 'signedIn' && (
                <div className="flex  space-x-4">
                  <NavLink
                    to="/events/new" // create event
                    className="text-black-500 border-black hover:border-b-4 hover:text-black px-3 py-2 text-sm font-semibold"
                  >
                    créer un événement
                  </NavLink>
                  <NavLink
                    to="/events" // search
                    className="text-black-500 border-black hover:border-b-4 hover:text-black px-3 py-2 text-sm font-semibold"
                  >
                    recherche
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {status === 'signedIn' ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button type="button" className="relative flex rounded-full text-xl focus:outline-none " id="user-menu-button">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <RocketIcon className="h-6 w-auto" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                    <DropdownMenu.Item onClick={() => navigate(`/`)} className="DropdownMenuItem">
                      Utilisateur
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => {
                        navigate(`/login`)
                      }}
                      className="DropdownMenuItem"
                    >
                      Logout
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <LoginBtn />
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className=" sm:hidden" id="mobile-menu">
        {status === 'signedIn' && (
          <div className="flex flex-row item-center justify-around px-2 pb-3 pt-2 border-t-2 border-black">
            <NavLink
              to="/events/new"
              className="text-neutral-500 hover:bg-gray-700 hover:text-black block rounded-md px-3  text-base font-medium"
            >
              créer un événement
            </NavLink>
            <NavLink
              to="/events"
              className="text-neutral-500 hover:bg-gray-700 hover:text-black block rounded-md px-3  text-base font-medium"
            >
              recherche
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}
