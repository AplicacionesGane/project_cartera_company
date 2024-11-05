import { NavLink } from 'react-router-dom'
import UserInfo from './ui/UserInfo'
import { useAuth } from '../auth/AuthProvider'
import { useEffect, useRef, useState } from 'react'

const Links = [
  { link: '/', name: 'Inicio' },
  { link: '/detallado', name: 'Detallado' },
  { link: '/bases', name: 'Bases' }
]

const LinkComponent = ({ link, name }: { link: string, name: string }) => {
  return (
    <li className='dark:text-white font-medium hover:text-yellow-200 dark:hover:text-yellow-200 text-md xl:text-lg '>
      <NavLink to={link}>{name}</NavLink>
    </li>
  )
}

export function NavBar () {
  const { user } = useAuth()
  const [visible, setVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
        menuRef.current && !menuRef.current.contains(event.target as Node)
      ) {
        setVisible(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <nav className='bg-punch-300 dark:bg-dark-tremor-brand-faint relative'>
      <ul className='flex items-center justify-around py-1'>
        <figure className=''>
          <img src="/gane.webp" alt="logo de gane" className='w-24 py-2 lg:w-22 ' loading='lazy' />
        </figure>

        <div className='flex gap-4'>
          {Links.map((link, index) => <LinkComponent key={index} link={link.link} name={link.name} />)}
        </div>

        <button className='bg-punch-700 rounded-full h-10 w-10 text-xl flex items-center justify-center cursor-pointer
           hover:bg-punch-600 dark:hover:bg-dark-tremor-brand-faint dark:bg-dark-tremor-brand-faint' ref={buttonRef}
          onClick={() => setVisible(!visible)} >
          <article className='font-semibold text-white flex gap-0.5'>
            <p>{user.names.split(' ')[0].slice(0, 1).toUpperCase()}</p>
            <p>{user.lastnames.split(' ')[0].slice(0, 1).toUpperCase()}</p>
          </article>
        </button>
      </ul>

      {visible && (
        <div
          ref={menuRef}
          className='absolute z-20 bg-punch-300 right-2 top-16 px-5 py-2 mt-1 rounded-md flex flex-col items-center gap-1'>
          <UserInfo key={user.id} user={user} />
        </div>
      )}
    </nav>
  )
}
