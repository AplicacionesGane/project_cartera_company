import { useAuth } from '../../auth/AuthProvider'
import { LOGIN_URL } from '../../utils/contanst'
import { User } from '../../types/user'
import { LogoutIcon } from '../icons'
import { Button } from './Button'
import axios from 'axios'

interface Props {
  user: User
}

function UserInfo({ user }: Props) {
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
      <h2 className='text-center font-semibold border-b mb-2 pb-1 text-lg'>Información Usuario</h2>
      <p className='font-medium text-center'>User: {user.username}</p>
      <article className='mb-2 flex flex-col gap-1'>
        <p className='font-medium text-center'><span>{user.names} {user.lastnames}</span></p>
        <p className='font-medium'>{user.email}</p>
      </article>

      <Button onClick={handleLogout}>
        <LogoutIcon />
      </Button>
    </>
  )
}

export default UserInfo
