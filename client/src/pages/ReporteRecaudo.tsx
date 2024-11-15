import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TableRoot } from '../components/TableTremor'
import { BottonExporReporteRecaudo } from '../components/ExportReporteRecaudo'
import { FormEvent, useMemo, useState } from 'react'
import { Card } from '../components/CardTremor'
import { DataReporte } from '../types/Recaudo'
import { API_URL } from '../utils/contanst'
import { toast } from 'sonner'
import axios from 'axios'

export default function ReportClienteGanadores () {
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [zona, setZona] = useState<string | undefined>(undefined)
  const [filter, setFilter] = useState<string>('')

  const [data, setData] = useState<DataReporte[] | null>(null)

  const handleSubmitInfo = (e: FormEvent) => {
    e.preventDefault()

    if (date1 === '' || date2 === '' || zona === '') {
      toast.error('Por favor llene todos los campos, fecha inicial fecha final y zona')
      return
    }

    axios.post<DataReporte[]>(`${API_URL}/reportRecaudo`, { fecha1: date1.toString().slice(0, 10), fecha2: date2.toString().slice(0, 10), zona })
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }

  const filteredData = useMemo(() => {
    if (!data) return null
    return data.filter(item => item.VINCULADO.includes(filter))
  }, [data, filter])

  return (
    <>
      <Card className='flex justify-around items-center'>

        <div className='flex gap-2 items-center' >
          <label>Fecha Inicial</label>
          <input type='date' value={date1} onChange={(e) => setDate1(e.target.value)}
            className='rounded-md' />
          <label>Fecha Final</label>
          <input type='date' value={date2} onChange={(e) => setDate2(e.target.value)}
            className='rounded-md' />
        </div>

        <form className='flex gap-2 items-center' onSubmit={handleSubmitInfo}>
          <label >Empresa: </label>
          <select name='zona' className='px-4 rounded-md w-40' value={zona} onChange={ev => setZona(ev.target.value)}>
            <option value=''>Seleccione</option>
            <option value='101'>Servired</option>
            <option value='102'>Multired</option>
          </select>

          <button type='submit' className='bg-green-600 py-2 px-4 rounded-md text-white hover:bg-green-500'>
            Buscar
          </button>
        </form>

        <p className='flex gap-2 items-center'>
          N° Datos:
          <span className="px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800">{filteredData?.length || '0'}</span>
        </p>

        <div className='flex gap-2 items-center'>
          <label>Filtrar N° Doc</label>
          <input type="text" placeholder='1118*****' className='rounded-md' value={filter} onChange={ev => setFilter(ev.target.value)} />
        </div>

        <BottonExporReporteRecaudo datos={filteredData ?? []} />

      </Card>

      <Card>
        <TableRoot className='h-[80vh] overflow-y-auto'>
          <Table>
            <TableHead className='sticky top-0 bg-gray-100'>
              <TableRow>
                <TableHeaderCell>N°</TableHeaderCell>
                <TableHeaderCell>Fecha</TableHeaderCell>
                <TableHeaderCell>Vinculado</TableHeaderCell>
                <TableHeaderCell>Nombres</TableHeaderCell>
                <TableHeaderCell>Valor</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Hora conteo</TableHeaderCell>
                <TableHeaderCell>User conteo</TableHeaderCell>
                <TableHeaderCell>Nota conteo</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className=''>
              {
                filteredData?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.FECHA}</TableCell>
                    <TableCell>{item.VINCULADO}</TableCell>
                    <TableCell>{item.Seller?.NOMBRES ?? 'No Registrado'}</TableCell>
                    <TableCell>{item.VALOR}</TableCell>
                    <TableCell className={item.ESTADO === 'r' ? 'text-red-400 font-semibold' : item.ESTADO === 'u' ? 'text-green-400 font-semibold' : 'text-gray-600'}>
                      {item.ESTADO === 'r' ? 'Rechazado' : 'Aceptado'}
                    </TableCell>
                    <TableCell>{item.HORA_CONTEO}</TableCell>
                    <TableCell>{item.USR_CONTEO}</TableCell>
                    <TableCell>{item.NOTA_CONTEO}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableRoot>
      </Card>
    </>
  )
}
