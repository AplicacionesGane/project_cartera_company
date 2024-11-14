import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { FormEvent, useState } from 'react'
import { DataOracle } from '../types/Recaudo'
import { API_URL } from '../utils/contanst'
import axios from 'axios'

function ReportOracle () {
  const [data, setData] = useState<DataOracle[] | null>(null)
  const [documento, setDocumento] = useState<string>('')
  const [fecha, setFecha] = useState<string>('')

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()

    axios.post(`${API_URL}/reportOracle`, { fecha: fecha.slice(0, 10), documento })
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.error('Error en getRecaudo', err)
      })
  }

  return (
    <>
      <Card className='flex justify-around py-2 items-center' decoration="top" decorationColor="blue">

        <p className='flex gap-2 items-center'>
          Cantida Datos:
          <span className="px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800">{data?.length || '0'}</span>
        </p>

        <form onSubmit={handleSubmit} className='flex items-center gap-4'>
          <div className='flex gap-2 items-center'>
            <label htmlFor="fecha">Fecha</label>
            <input className='p-2 rounded-md'
              type="date" id="fecha" required value={fecha} onChange={e => setFecha(e.target.value)} />
          </div>
          <div className='flex gap-2 items-center'>
            <label htmlFor="documento">Documento</label>
            <input className='p-2 rounded-md'
              type="text" id="documento" required value={documento} onChange={e => setDocumento(e.target.value)} />
          </div>
          <button type='submit'
            className='p-2 bg-green-600 rounded-md text-white hover:bg-green-500'>Buscar</button>
        </form>

      </Card>

      <Card decoration='top' decorationColor='blue' className='p-2 mt-0.5'>
        <Table className='xl:max-h-[80vh] 3xl:max-h-[82vh]'>
          <TableHead className='border-b-2 border-blue-600 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
            <TableRow className=''>
              <TableHeaderCell>N°</TableHeaderCell>
              <TableHeaderCell>Fecha</TableHeaderCell>
              <TableHeaderCell>Persona</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>Razón Social</TableHeaderCell>
              <TableHeaderCell>Servicio</TableHeaderCell>
              <TableHeaderCell>Nombre Servicio</TableHeaderCell>
              <TableHeaderCell>Venta Bruta</TableHeaderCell>
              <TableHeaderCell>Venta Sin IVA</TableHeaderCell>
              <TableHeaderCell>IVA</TableHeaderCell>
              <TableHeaderCell>Comisión</TableHeaderCell>
              <TableHeaderCell>Venta Neta</TableHeaderCell>
              <TableHeaderCell>Formularios</TableHeaderCell>
              <TableHeaderCell>Sucursal</TableHeaderCell>
              <TableHeaderCell>Nombre Comercial</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.fecha.slice(0, 10)}</TableCell>
                  <TableCell>{item.persona}</TableCell>
                  <TableCell>{item.nombres}</TableCell>
                  <TableCell>{item.razonsocial}</TableCell>
                  <TableCell>{item.servicio}</TableCell>
                  <TableCell>{item.nombreservicio}</TableCell>
                  <TableCell>{item.ventabruta}</TableCell>
                  <TableCell>{item.vtasiniva}</TableCell>
                  <TableCell>{item.iva}</TableCell>
                  <TableCell>{item.comision}</TableCell>
                  <TableCell>{item.ventaneta}</TableCell>
                  <TableCell>{item.formularios}</TableCell>
                  <TableCell>{item.sucursal}</TableCell>
                  <TableCell>{item.nombre_comercial}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export default ReportOracle
