import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Session, SessionContext, getToken } from './auth/AuthContext'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import './css/App.css'
import { RootLayout } from './layouts/RootLayout'
import { EventLayout } from './layouts/EventLayout'
import { EventsList } from './pages/EventsList'
import { EditEvent } from './events/EditEvent'
import DisplayEvent from './pages/DisplayEvent'
import { NewEvent } from './pages/NewEvent'
import SearchEvent from './pages/SearchEvent'
import { ProtectedRoute } from './layouts/ProtectedRoute'
import { DeleteEvent } from './events/DeleteEvent'

const queryClient = new QueryClient()
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path="events" element={<EventLayout />}>
          <Route index element={<SearchEvent />} />
          <Route path="results" element={<EventsList />} />
          <Route path="results/:id" element={<DisplayEvent />} />

          <Route
            path="results/edit/:id"
            element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            }/>
          <Route 
            path="results/delete/:id"
            element={
              <ProtectedRoute>
                <DeleteEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewEvent />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Route>
    </>
  )
)
function App() {
  const token = getToken()
  const [session, setSession] = useState<Session>({ userId: token?.user_id ?? 0, isSuperUser: token?.is_superuser ?? false })

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContext.Provider value={{ ...session, setSession }}>
        <RouterProvider router={router} />
      </SessionContext.Provider>
    </QueryClientProvider>
  )
}

export default App
