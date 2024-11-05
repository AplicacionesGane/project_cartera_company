import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react'
import { FormCreate } from '../components/AsignarBase'
import { PropsCrating } from '../types/interface'
import { Input, Label } from '../components/ui'
import { useEffect, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'

interface UserSinBase {
  EMPRESA: '101' | '102'
  CUENTA: string
  VINCULADO: string
  Seller: {
    NOMBRES: string
  }
  Basis: null
}

const AsignarNewBase = () => {
  const [data, setData] = useState<UserSinBase[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PropsCrating | null>(null)
  const [vincualdo, setVinculado] = useState('')

  useEffect(() => {
    axios.get(`${API_URL}/usersSinBase`)
      .then(res => setData(res.data))
      .catch(error => console.error(error))
  }, [])

  const handleAssignClick = (item: UserSinBase) => {
    setSelectedItem({
      nombres: item.Seller.NOMBRES,
      vinculado: item.VINCULADO
    })
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedItem(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinculado(e.target.value)
  }

  const filterVinculado = () => {
    if (!vincualdo) return data
    return data.filter(item => item.VINCULADO.toLowerCase().includes(vincualdo.toLowerCase()))
  }

  return (
    <section className=''>
      <section className='flex items-center justify-around py-2 px-4'>
        <Title className='text-center'>Lista vinculados sin base  </Title>
        <div>
          <Label>Buscar Vinculado: </Label>
          <Input type="text" placeholder="Cédula" value={vincualdo}
            className="p-2 border border-gray-300 rounded-md" onChange={handleChange}/>
        </div>
      </section>
      <Card className='h-[86vh] xl:h-[82vh] overflow-y-auto p-2'>
        <Table className="">
          <TableHead>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>N° Cédula</TableHeaderCell>
              <TableHeaderCell>Empresa</TableHeaderCell>
              <TableHeaderCell>Opciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterVinculado().map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.Seller.NOMBRES}</TableCell>
                <TableCell>{item.VINCULADO}</TableCell>
                <TableCell>{item.EMPRESA === '101' ? 'Servired' : 'Multired'}</TableCell>
                <TableCell>
                  <Button color='red' onClick={() => handleAssignClick(item)}>Asignar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {showForm && selectedItem && (<FormCreate nombres={selectedItem.nombres} vinculado={selectedItem.vinculado} funClose={handleCloseForm} />)}
    </section>
  )
}

export default AsignarNewBase
