import { useAuth } from '../auth/AuthProvider'
import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import LoginPage from '../pages/Login'
import { Toaster } from 'sonner'

const Root = () => {
  const { user, isAuthenticated } = useAuth()

  if (!user.id || !isAuthenticated) {
    return <LoginPage />
  }

  return (
    <>
      <NavBar />
        <section className='pt-1'>
          <Outlet />
        </section>
      <Toaster position='top-right' duration={3000} />
    </>
  )
}

export default Root
