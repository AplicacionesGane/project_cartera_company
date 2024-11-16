import { useAuth } from '../auth/AuthProvider'
import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'sonner'

const LoginPage = lazy(() => import('../pages/Login'))
const NavBar = lazy(() => import('../components/NavBar'))

const Root = () => {
  const { user, isAuthenticated } = useAuth()

  if (!user.id || !isAuthenticated) {
    return (<Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense>)
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <section className='pt-1'>
          <Outlet />
        </section>
      </Suspense>
      <Toaster position='top-right' duration={3000} />
    </>

  )
}

export default Root
