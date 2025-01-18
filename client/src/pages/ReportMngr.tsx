import { Badge, Button, Card, Input, Label, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from '../components/ui'
import { formatValue } from '../utils/funtions'
import { FormEvent, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'

export interface MngrRecaudo {
  fecha: string;
  cuenta: string;
  empresa: string;
  vinculado: string;
  ingresos: number;
  egresos: number;
  abonos_cartera: number;
  version: number;
}

export default function ReportMngr () {
  const [data, setData] = useState<MngrRecaudo[]>([])
  const [documento, setDocumento] = useState<string>('')
  const [fecha1, setFecha1] = useState<string>('')
  const [fecha2, setFecha2] = useState<string>('')

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()

    axios.post(`${API_URL}/carteraMngr`, { vinculado: documento, fecha1, fecha2 })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  console.log(data)

  return (
    <>
      <Card className='flex justify-around'>
        <p className='flex gap-2 items-center'>
          Cantida Datos:
          <Badge variant='default'>{'0'}</Badge>
        </p>
        <form className='flex items-center gap-4' onSubmit={handleSubmit}>
          <div className='flex gap-2 items-center'>
            <Label htmlFor='fecha'>Fecha Inicial</Label>
            <Input
              type='date'
              id='fecha'
              required
              value={fecha1}
              onChange={e => setFecha1(e.target.value)}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <Label htmlFor='fecha2'>Fecha Final</Label>
            <Input
              type='date'
              id='fecha2'
              required
              value={fecha2}
              onChange={e => setFecha2(e.target.value)}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <Label htmlFor='documento'>Documento</Label>
            <Input
              type='text'
              id='documento'
              required
              onChange={e => setDocumento(e.target.value)}
            />
          </div>
          <Button type='submit'>Buscar</Button>
        </form>
      </Card>
      <Card className='mt-1'>
        <TableRoot className='h-[75vh] overflow-y-auto'>
          <Table>
            <TableHead className='sticky top-0 bg-gray-100 z-30'>
              <TableRow>
                <TableHeaderCell>Fecha</TableHeaderCell>
                <TableHeaderCell>Cuenta</TableHeaderCell>
                <TableHeaderCell>Empresa</TableHeaderCell>
                <TableHeaderCell>Vinculado</TableHeaderCell>
                <TableHeaderCell>Ingresos</TableHeaderCell>
                <TableHeaderCell>Egresos</TableHeaderCell>
                <TableHeaderCell>Abono Cartera</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className='text-justify'>{item.fecha.split('T')[0]}</TableCell>
                    <TableCell className='text-justify'>{item.cuenta}</TableCell>
                    <TableCell>{item.empresa}</TableCell>
                    <TableCell>{item.vinculado}</TableCell>
                    <TableCell className='text-right'>{formatValue(item.ingresos)}</TableCell>
                    <TableCell className='text-right'>{formatValue(item.egresos)}</TableCell>
                    <TableCell className='text-right'>{formatValue(item.abonos_cartera)}</TableCell>
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
