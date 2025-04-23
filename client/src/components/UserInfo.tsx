import { useAuth } from '../auth/AuthProvider'
import { LOGIN_URL } from '../utils/contanst'
import { User } from '../types/user'
import { LogoutIcon } from './icons'
import axios from 'axios'

interface Props {
  user: User | null
}

function UserInfo ({ user }: Props) {
  const { setUser, setIsAuthenticated } = useAuth()

  const handleLogout = () => {
    const token = document.cookie
    axios.post(`${LOGIN_URL}/logout`, { token })
      .then(res => {
        console.log(res.data)
        setUser(null)
        setIsAuthenticated(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className='flex  items-center gap-2 border-b pb-2'>
        <p className='text-2xl font-semibold rounded-full bg-blue-200 px-3 py-2 border shadow-md'>{user?.names[0]}{user?.lastnames[0]}</p>
        <p className='font-medium pt-1'><span>{user?.lastnames.split(' ')[0]} {user?.names} </span></p>
      </div>
      <div className='border-b pb-2 pt-1'>
        <p className='font-medium'>{user?.email.toLocaleLowerCase()}</p>
      </div>
      <button className='flex items-center gap-2 pt-1 hover:underline hover:text-blue-500'
        onClick={handleLogout}>
        <LogoutIcon />
        <span className='pt-0.5'>Cerrar sesión</span>
      </button>
    </>
  )
}

export default UserInfo
