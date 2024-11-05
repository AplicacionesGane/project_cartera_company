import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { CarteraI } from '../types/cartera'
import { useNavigate } from 'react-router-dom'

interface PropsCompo {
  data: CarteraI[]
  funClick: (ev: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void
}

export const TableDatos = ({ data, funClick }: PropsCompo) => {
  const navigate = useNavigate()

  const handleClick = (id: string, estado: string) => {
    return () => navigate(`/recaudo/${id}/${estado}`)
  }

  return (
    <Card decoration="top" decorationColor="rose" className='p-2 mt-0.5'>
      <Table className='xl:max-h-[80vh] 3xl:max-h-[82vh]'>
        <TableHead className='border-b-2 border-punch-300 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
          <TableRow className='text-xs'>
            <TableHeaderCell>Empresa</TableHeaderCell>
            <TableHeaderCell>N° Cédula</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Cargo</TableHeaderCell>
            <TableHeaderCell>Zona</TableHeaderCell>
            <TableHeaderCell className='text-center'>Base</TableHeaderCell>
            <TableHeaderCell id={'SaldoAnt'} className='text-center text-xs cursor-pointer hover:text-blue-400' onClick={ev => funClick(ev)}>
                Saldo Ant ...
            </TableHeaderCell >
            <TableHeaderCell className='text-center'>Débito</TableHeaderCell>
            <TableHeaderCell className='text-center'>Crédito</TableHeaderCell>
            <TableHeaderCell className='text-center'>Nuevo Saldo</TableHeaderCell>
            <TableHeaderCell id={'Cartera'} className='text-center text-xs cursor-pointer hover:text-blue-400' onClick={ev => funClick(ev)}>
                Cartera ...
            </TableHeaderCell>
            <TableHeaderCell className='text-center'>Rechazados</TableHeaderCell>
            <TableHeaderCell className='text-center'>Aceptados</TableHeaderCell>
            <TableHeaderCell className='text-center'>Pendiente Conteo</TableHeaderCell>
            <TableHeaderCell className='text-center'>Venta Bnet</TableHeaderCell>
            <TableHeaderCell className='text-center'>Cuadre Web</TableHeaderCell>
            <TableHeaderCell className='text-center'>Anulados</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody className='text-xs'>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.Empresa}</TableCell>
              <TableCell>{item.Vinculado}</TableCell>
              <TableCell className='text-clip text-[0.7rem]'>{item.Nombres || 'No Registrado Bnet'}</TableCell>
              <TableCell>{item.Cargo}</TableCell>
              <TableCell>{item.Zona}</TableCell>
              <TableCell>{formatPesoColombia(item.Base)}</TableCell>
              <TableCell className={`${item.SaldoAnt > 0
                ? 'bg-punch-200 dark:bg-punch-950 font-medium text-gray-800 dark:text-gray-300'
                : 'bg-green-200 dark:bg-green-950 font-medium text-gray-800 dark:text-gray-300'}`}>
                {formatPesoColombia(item.SaldoAnt)}
              </TableCell>
              <TableCell className='text-center'>
                {formatPesoColombia(item.Debito)}
              </TableCell>
              <TableCell className='text-center'>
                {formatPesoColombia(item.Credito)}
              </TableCell>
              <TableCell className='text-center' id='nuevo saldo'>
                {formatPesoColombia(item.NuevoSaldo)}
              </TableCell>
              <TableCell className='text-center font-semibold text-black dark:text-gray-300' id='cartera'>
                {formatPesoColombia(item.Cartera)}
              </TableCell>
              <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
              { item.Rechazados > 0
                ? <span className='text-xs text-red-500 dark:text-red-400 hover:text-blue-600 cursor-pointer'
                  onClick={handleClick(item.Vinculado, 'r')}>{formatPesoColombia(item.Rechazados)}</span>
                : <span className='text-xs'> {formatPesoColombia(item.Rechazados)}</span>
              }
              </TableCell>
              <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                { item.Aceptados > 0
                  ? <span className='text-xs text-green-500 dark:text-red-400 hover:text-blue-600 cursor-pointer'
                  onClick={handleClick(item.Vinculado, 'u')}>{formatPesoColombia(item.Aceptados)}</span>
                  : <span className='text-xs'> {formatPesoColombia(item.Aceptados)}</span>
              }
              </TableCell>
              <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                {formatPesoColombia(item.PendientesCont)}
              </TableCell>
              <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                {formatPesoColombia(item.Vtabnet)}
              </TableCell>
              <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                {formatPesoColombia(item.CuadreWeb)}
              </TableCell>
              <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                {formatPesoColombia(item.Anulados)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
