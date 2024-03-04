import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

export function RootLayout() {
  return (
    <>
      <header className="relative">
        <NavBar />
      </header>
      <section className="min-h-screen h-full w-screen bg-white">
        <Outlet />
      </section>
    </>
  )
}
