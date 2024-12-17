import Loading from '../components/ui/LoadingComponent'
import { useAuth } from '../auth/AuthProvider'
import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'sonner'

const LoginPage = lazy(() => import('../pages/Login'))
const NavBar = lazy(() => import('../components/NavBar'))

const Root = () => {
  const { user, isAuthenticated } = useAuth()

  if (!user.id || !isAuthenticated) {
    return (<Suspense fallback={<Loading />}><LoginPage /></Suspense>)
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <NavBar />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <section className='pt-1'>
          <Outlet />
        </section>
      </Suspense>
      <Toaster position='top-right' duration={3000} richColors />
    </>

  )
}

export default Root
