import { Button, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { Input, Label } from '../components/ui'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { RiLockLine } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { BasesI } from '../types/Bases'
import axios from 'axios'
import { API_URL } from '../utils/contanst'

const BasesPage = () => {
  const [data, setData] = useState<BasesI[]>([])
  const [asc, setAsc] = useState<boolean>(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  const [vinculado, setVinculado] = useState<string>('')

  useEffect(() => {
    axios.get(`${API_URL}/getAllBases`)
      .then(response => setData(response.data))
      .catch(error => console.log(error))
  }, [])

  const handleClick = (id: string) => {
    return () => navigate(`/base/${id}`)
  }

  const handleCreateBase = () => {
    return navigate('/asignarNuevaBase')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinculado(e.target.value)
  }

  const filterVinculado = (data: BasesI[]) => {
    if (!vinculado) return data
    return data.filter(item => item.VINCULADO.toLowerCase().includes(vinculado.toLowerCase()))
  }

  const filteredData = filterVinculado(data)

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (asc) {
        return a.BASE - b.BASE
      } else {
        return b.BASE - a.BASE
      }
    })
    setAsc(!asc)
    setData(sortedData)
  }

  return (
    <section className=''>
      <section className='flex justify-around py-2 w-full'>
        <div className='flex items-center gap-2 w-96'>
          <Label>Vinculado: </Label>
          <Input type="text" placeholder="Buscar por cédula" onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md" value={vinculado} />
        </div>
        {
          user.sub_process === 'aux cartera'
            ? <Button color='red' onClick={handleCreateBase}>Asignar Nueva Base</Button>
            : <Button variant="secondary" color='red' size="sm" icon={RiLockLine}></Button>
        }
      </section>
        <Table className='xl:max-h-[82vh] 3xl:max-h-[85vh]'>
          <TableHead>
            <TableRow className='border-b-2 border-punch-300 sticky top-0 bg-punch-200'>
              <TableHeaderCell className='text-center'>#</TableHeaderCell>
              <TableHeaderCell className='text-center'>Nombres</TableHeaderCell>
              <TableHeaderCell className='text-center'>N° Cedula</TableHeaderCell>
              <TableHeaderCell className='text-center cursor-pointer hover:text-blue-400' onClick={handleSort}>Base Asignada</TableHeaderCell>
              <TableHeaderCell className='text-center'>Opciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={item.VINCULADO}>
                <TableCell className='text-center'>{index + 1}</TableCell>
                <TableCell >{item.Seller.NOMBRES}</TableCell>
                <TableCell className='text-center'>
                  {item.VINCULADO}
                </TableCell>
                <TableCell className='text-center'>
                  {formatPesoColombia(item.BASE)}
                </TableCell>
                <TableCell className='text-center'>
                  {
                    user.sub_process === 'aux cartera'
                      ? <Button variant="secondary" color='yellow' size="sm" onClick={handleClick(item.VINCULADO)}>Actualizar</Button>
                      : <Button variant="secondary" color='red' size="sm" icon={RiLockLine}></Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </section>
  )
}

export default BasesPage
