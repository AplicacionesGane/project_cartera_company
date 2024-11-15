import { PropsCrating } from '../types/interface'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Button, CloseIcon, Label } from './ui'
import { Input } from './ui/InputTremor'
import { FormEvent, useState } from 'react'
import { API_URL } from '../utils/contanst'
import { Card } from './CardTremor'
import axios from 'axios'
import { toast } from 'sonner'

export function AginarNuevaBaseComponent ({ nombres, vinculado, funClose }: PropsCrating) {
  const [base, setBase] = useState<number>(0)
  const [raspa, setRaspa] = useState<number>(0)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const { user } = useAuth()

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    axios.post(`${API_URL}/asignar-base`, { base, raspa, vinculado, login: user.username })
      .then(res => {
        console.log(res.data)
        if (res.status === 201) {
          setMessage(res.data)
          setTimeout(() => {
            navigate('/bases')
          }, 3000)
        }
      })
      .catch(err => {
        console.log(err)
        setError('Error al asignar nueva base')
      })
      .finally(() => {
        setTimeout(() => {
          setError('')
          setMessage('')
          setBase(0)
          setRaspa(0)
        }, 4000)
      })
  }

  return (
    <section className='absolute z-40 inset-40 2xl:inset-60'>
      <Card className='px-20 py-16'>
        <button onClick={funClose} className='absolute top-0 right-0 p-2 hover:text-red-500'>
          <CloseIcon />
        </button>
        <h3 className='text-center text-xl font-semibold pb-2'>Asignación Nueva Base a Vinculado</h3>
        <form className='grid grid-cols-2 gap-4' onSubmit={ev => handleSubmit(ev)}>
          <div className=' '>
            <Label>Nombres</Label>
            <Input type='text' value={nombres} readOnly />
          </div>
          <div className=' '>
            <Label>N° Cédula</Label>
            <Input type='text' value={vinculado} readOnly />
          </div>
          <div className=' '>
            <Label>Valor Base</Label>
            <Input type='number' value={base} onChange={ev => setBase(parseInt(ev.target.value))} />
          </div>
          <div className=' '>
            <Label>Valor Raspa</Label>
            <Input type='number' value={raspa} onChange={ev => setRaspa(parseInt(ev.target.value))} />
          </div>
          <div/>
          <Button color='red'>Asignar Base</Button>
        </form>
      </Card>

      {error && toast.error(error, { description: 'Error al asignar nueva base', id: ' ', duration: 5000, style: { background: '#ef4444', color: 'white' } })}
      {message && toast.success(message, { description: 'Base asignada correctamente', id: ' ', duration: 5000, style: { background: '#22c55e', color: 'white' } })}

    </section>
  )
}
