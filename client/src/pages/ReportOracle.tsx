import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/contanst'
import { DataOracle } from '../types/Recaudo'

function ReportOracle () {
  const [data, setData] = useState<DataOracle[] | null>(null)
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    axios.get(`${API_URL}/reportOracle`)
      .then(res => {
        setData(res.data)
        console.log('res.data', res.data)
      })
      .catch(err => {
        console.error('Error en getRecaudo', err)
      })
  }, [])

  const filteredData = useMemo(() => {
    if (!data) return null
    return data.filter(item => item.persona && item.persona.toString().includes(filter))
  }, [data, filter])

  return (
    <>
      <Card className='flex justify-around py-2 items-center' decoration="top" decorationColor="blue">

        <p className='flex gap-2 items-center'>
          Cantdocumentoad De Datos:
          <span className="px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800">{filteredData?.length || '0'}</span>
        </p>

        <div className='flex gap-2 items-center'>
          <label>Filtrar N° Doc</label>
          <input type="text" placeholder='1118*****' className='rounded-md' value={filter} onChange={ev => setFilter(ev.target.value)} />
        </div>

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
              filteredData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.fecha}</TableCell>
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
