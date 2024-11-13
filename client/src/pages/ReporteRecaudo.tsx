import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { BottonExporReporteRecaudo } from '../components/ExportReporteRecaudo'
import { DataReporte } from '../types/Recaudo'
import { API_URL } from '../utils/contanst'
import { FormEvent, useState } from 'react'
import axios from 'axios'

export default function ReportClienteGanadores () {
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [zona, setZona] = useState<string | undefined>(undefined)

  const [data, setData] = useState<DataReporte[] | null>(null)

  const handleSubmitInfo = (e: FormEvent) => {
    e.preventDefault()

    if (date1 === '' || date2 === '' || zona === '') {
      alert('Por favor llene todos los campos, fecha inicial fecha final y zona')
      return
    }

    axios.post<DataReporte[]>(`${API_URL}/reportRecaudo`, { fecha1: date1.toString().slice(0, 10), fecha2: date2.toString().slice(0, 10), zona })
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }

  return (
    <>
      <Card className='flex justify-around py-2 items-center' decoration="top" decorationColor="blue">

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
            Solicitar Reporte
          </button>
        </form>

        <p className='flex gap-2 items-center'>
          Cantidad De Datos:
          <span className="px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800">{data?.length || '0'}</span>
        </p>

        <BottonExporReporteRecaudo datos={data ?? []} />

      </Card>

      <Card decoration='top' decorationColor='blue' className='p-2 mt-0.5'>
        <Table className='xl:max-h-[80vh] 3xl:max-h-[82vh]'>
          <TableHead className='border-b-2 border-blue-600 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
            <TableRow className=''>
              <TableHeaderCell>N°</TableHeaderCell>
              <TableHeaderCell>Vinculado</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>Valor</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className=''>
            {
              data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.VINCULADO}</TableCell>
                  <TableCell>{item.Seller?.NOMBRES ?? 'No Registrado'}</TableCell>
                  <TableCell>{item.VALOR}</TableCell>
                  <TableCell className={item.ESTADO === 'r' ? 'text-red-400 font-semibold' : item.ESTADO === 'u' ? 'text-green-400 font-semibold' : 'text-gray-600'}>
                    {item.ESTADO === 'r' ? 'Rechazado' : 'Aceptado'}
                  </TableCell>
                  <TableCell>{item.NOTA_CONTEO}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
