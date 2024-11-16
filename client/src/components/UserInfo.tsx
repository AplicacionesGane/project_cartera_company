import { useAuth } from '../auth/AuthProvider'
import { LOGIN_URL } from '../utils/contanst'
import { User } from '../types/user'
import { LogoutIcon } from './icons'
import axios from 'axios'

interface Props {
  user: User
}

function UserInfo ({ user }: Props) {
  const { setUser, setIsAuthenticated } = useAuth()

  const handleLogout = () => {
    const token = document.cookie
    axios.post(`${LOGIN_URL}/logout`, { token })
      .then(res => {
        console.log(res.data)
        setUser({ username: '', email: '', names: '', lastnames: '', company: '', process: '', sub_process: '', id: '', app: '' })
        setIsAuthenticated(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2 className='font-semibold border-b border-gray-700 text-lg'>Usuario</h2>
      <article className=''>
        <p className='font-medium'>User: {user.username}</p>
        <p className='font-medium'><span>{user.names} {user.lastnames}</span></p>
        <p className='font-medium'>{user.email}</p>
      </article>

      <button className='bg-blue-700 text-white rounded-full h-10 w-10 text-xl flex items-center justify-center cursor-pointer hover:bg-blue-500 dark:hover:bg-dark-tremor-brand-faint dark:bg-dark-tremor-brand-faint'
        onClick={handleLogout}>
        <LogoutIcon />
      </button>
    </>
  )
}

export default UserInfo
