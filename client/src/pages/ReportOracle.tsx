import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TableRoot, Card, Label, Input, Button } from '../components/ui'
import { BottonExporReporteConsolidado } from '../components/ExportConsolidado'
import { LoadingSvg } from '../components/icons'
import { DataOracle } from '../types/Recaudo'
import { FormEvent, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'

function ReportOracle () {
  const [data, setData] = useState<DataOracle[] | null>(null)
  const [documento, setDocumento] = useState<string>('')
  const [fecha, setFecha] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()

    setLoading(true)

    axios.post(`${API_URL}/reportOracle`, { fecha: fecha.slice(0, 10), documento })
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.error('Error en getRecaudo', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card className='flex justify-around'>

        <p className='flex gap-2 items-center'>
          Cantida Datos:
          <span className='px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800'>{data?.length || '0'}</span>
        </p>

        <form onSubmit={handleSubmit} className='flex items-center gap-4'>
          <div className='flex gap-2 items-center'>
            <Label htmlFor='fecha'>Fecha</Label>
            <Input className='p-2 rounded-md'
              type='date' id='fecha' required value={fecha} onChange={e => setFecha(e.target.value)} />
          </div>
          <div className='flex gap-2 items-center'>
            <Label htmlFor='documento'>Documento</Label>
            <Input className='p-2 rounded-md'
              type='text' id='documento' required value={documento} onChange={e => setDocumento(e.target.value)} />
          </div>
          <Button type='submit'>Buscar</Button>
        </form>

        <div className='flex items-center'>
          <BottonExporReporteConsolidado datos={data || []} />
        </div>

      </Card>

      <Card className='mt-1'>
        <TableRoot className='h-[80vh] overflow-y-auto'>
          <Table>
            <TableHead className='sticky top-0 bg-gray-100 z-30'>
              <TableRow>
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
        </TableRoot>
      </Card>

      {
        <div className="absolute top-36 right-48 left-48 z-30 flex flex-col items-center justify-center">
          {loading && (
            <div className="w-96 rounded-md flex flex-col shadow-lg items-center justify-center gap-4 py-4 px-6 z-30 bg-yellow-300 animate-pulse">
              <span className="text-lg font-semibold text-gray-800">Solicitando Información ...</span>
              <LoadingSvg />
            </div>
          )}
          {!loading && data && data.length === 0 && (
            <p className="text-center text-gray-600">No se encontraron datos para el documento y fecha seleccionados.</p>
          )}
        </div>
      }
    </>
  )
}

export default ReportOracle
