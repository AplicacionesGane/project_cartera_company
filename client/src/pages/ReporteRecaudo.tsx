import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { DataReporte } from '../types/Recaudo'
import { API_URL } from '../utils/contanst'
import { useState } from 'react'
import axios from 'axios'
import { BottonExporReporteRecaudo } from '../components/ExportReporteRecaudo'

export default function ReportClienteGanadores () {
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [zona, setZona] = useState<string | undefined>(undefined)

  const [data, setData] = useState<DataReporte[] | null>(null)

  const handleZonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedZona = e.target.value
    setZona(selectedZona)

    // Realizar la consulta si se selecciona una zona válida
    if (selectedZona.trim() !== '' && date1 && date2) {
      console.log('Zona seleccionada:', selectedZona)
      console.log('Fecha 1:', date1)
      console.log('Fecha 2:', date2)

      axios.post(`${API_URL}/reportRecaudo`, {
        fecha1: date1.toString().slice(0, 10),
        fecha2: date2.toString().slice(0, 10),
        zona: selectedZona
      })
        .then(res => {
          setData(res.data)
        })
        .catch(err => {
          console.error('Error al realizar la consulta:', err.response ? err.response.data : err.message)
        })
    }
  }

  return (
    <>
      <div className='w-full flex gap-4 px-2 pt-1 items-center border-b pb-2'>
        <input type='date' value={date1} onChange={(e) => setDate1(e.target.value)} />

        <input type='date' value={date2} onChange={(e) => setDate2(e.target.value)} />

        <form className='gap-2 flex py-2'>
          <select name='zona' className='px-4 rounded-md w-52' value={zona} onChange={handleZonaChange}>
            <option value=''>Seleccione Empresa</option>
            <option value='101'>Servired</option>
            <option value='102'>Multired</option>
          </select>
        </form>

        <label>
          <label className='text-xs'>Cantidad De Datos: {data?.length}</label>
        </label>

        <BottonExporReporteRecaudo datos={data ?? []} />

      </div>

      <Card decoration='top' decorationColor='blue' className='p-2 mt-0.5'>
        <Table className='xl:max-h-[80vh] 3xl:max-h-[82vh]'>
          <TableHead className='border-b-2 border-blue-600 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
            <TableRow className='text-xs'>
              <TableHeaderCell>N°</TableHeaderCell>
              <TableHeaderCell>Vinculado</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>Valor</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className='text-xs'>
            {
              data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.VINCULADO}</TableCell>
                  <TableCell>{item.Seller?.NOMBRES ?? 'No Registrado'}</TableCell>
                  <TableCell>{item.VALOR}</TableCell>
                  <TableCell>{item.ESTADO === 'r' ? 'Rechazado' : 'Aceptado' }</TableCell>
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
