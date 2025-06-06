import { TableRoot, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Badge } from './ui'
import { formatValue } from '../utils/funtions'
import { DatesI } from '../types/interface'

const estadoMap: { [key: string]: string } = {
  u: 'Aceptado',
  r: 'Rechazado',
  c: 'Liberado',
  p: 'Pendiente'
}

const getEstadoClass = (estado: string): string => {
  switch (estado) {
    case 'u':
      return 'text-green-600'
    case 'r':
      return 'text-red-600'
    case 'c':
      return 'text-blue-600'
    default:
      return 'text-yellow-600'
  }
}

const RenderEstado = ({ estado }: { estado: string }) => {
  return (
    <p>
      <Badge variant='neutral' className={getEstadoClass(estado)}>
        {estadoMap[estado]}
      </Badge>
    </p>
  )
}

function ResumenRecaudo ({ datos, name }: { datos: DatesI[], name: string }) {
  return (
    <section className='flex flex-col w-full items-center justify-center'>
      <h1 className='text-center py-2 font-semibold'>Resumen Recaudo {name}</h1>
      <TableRoot className='mt-8 bg-slate-50 shadow-lg rounded-lg'>
        <Table>
          <TableHead>
            <TableRow className='bg-blue-600'>
              <TableHeaderCell className='text-white'>Estado</TableHeaderCell>
              <TableHeaderCell className='text-white'>Cant Recaudo</TableHeaderCell>
              <TableHeaderCell className='text-white'>Total</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((item, index) => (
              <TableRow key={index}>
                 <TableCell>
                  <RenderEstado key={index} estado={item.ESTADO} />
                </TableCell>
                <TableCell className='text-center'>{item.Cantidad}</TableCell>
                <TableCell>{formatValue(item.Total | 0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>

    </section>
  )
}

export { ResumenRecaudo }
