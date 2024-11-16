import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow, Card } from './ui'
import { formatValue } from '../utils/funtions'
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
    <Card>
      <TableRoot className='h-[83vh]'>
        <Table>
          <TableHead className='sticky top-0 bg-gray-100'>
            <TableRow>
              <TableHeaderCell>Empresa</TableHeaderCell>
              <TableHeaderCell>N° Cédula</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>Cargo</TableHeaderCell>
              <TableHeaderCell>Zona</TableHeaderCell>
              <TableHeaderCell>Base</TableHeaderCell>
              <TableHeaderCell className='cursor-pointer hover:text-red-500' id={'SaldoAnt'} onClick={ev => funClick(ev)}>
                Saldo Ant ...
              </TableHeaderCell >
              <TableHeaderCell>Débito</TableHeaderCell>
              <TableHeaderCell>Crédito</TableHeaderCell>
              <TableHeaderCell>Nuevo Saldo</TableHeaderCell>
              <TableHeaderCell className='cursor-pointer hover:text-red-500' id={'Cartera'} onClick={ev => funClick(ev)}>
                Cartera ...
              </TableHeaderCell>
              <TableHeaderCell>Rechazados</TableHeaderCell>
              <TableHeaderCell>Aceptados</TableHeaderCell>
              <TableHeaderCell>Pendiente Conteo</TableHeaderCell>
              <TableHeaderCell>Venta Bnet</TableHeaderCell>
              <TableHeaderCell>Cuadre Web</TableHeaderCell>
              <TableHeaderCell>Anulados</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.Empresa}</TableCell>
                <TableCell>{item.Vinculado}</TableCell>
                <TableCell className=''>{item.Nombres || 'No Registrado Bnet'}</TableCell>
                <TableCell>{item.Cargo}</TableCell>
                <TableCell>{item.Zona}</TableCell>
                <TableCell>{formatValue(item.Base)}</TableCell>
                <TableCell className={`${item.SaldoAnt > 0
                  ? 'bg-punch-200 dark:bg-punch-950 text-gray-800 dark:text-gray-300'
                  : 'bg-green-200 dark:bg-green-950 text-gray-800 dark:text-gray-300'}`}>
                  {formatValue(item.SaldoAnt)}
                </TableCell>
                <TableCell>
                  {formatValue(item.Debito)}
                </TableCell>
                <TableCell>
                  {formatValue(item.Credito)}
                </TableCell>
                <TableCell id='nuevo saldo'>
                  {formatValue(item.NuevoSaldo)}
                </TableCell>
                <TableCell id='cartera'>
                  {formatValue(item.Cartera)}
                </TableCell>
                <TableCell >
                  {item.Rechazados > 0
                    ? <span className='text-xs text-red-500 dark:text-red-400 hover:text-blue-600 cursor-pointer'
                      onClick={handleClick(item.Vinculado, 'r')}>{formatValue(item.Rechazados)}</span>
                    : <span className='text-xs'> {formatValue(item.Rechazados)}</span>
                  }
                </TableCell>
                <TableCell >
                  {item.Aceptados > 0
                    ? <span className='text-xs text-green-500 dark:text-red-400 hover:text-blue-600 cursor-pointer'
                      onClick={handleClick(item.Vinculado, 'u')}>{formatValue(item.Aceptados)}</span>
                    : <span className='text-xs'> {formatValue(item.Aceptados)}</span>
                  }
                </TableCell>
                <TableCell >
                  {formatValue(item.PendientesCont)}
                </TableCell>
                <TableCell >
                  {formatValue(item.Vtabnet)}
                </TableCell>
                <TableCell >
                  {formatValue(item.CuadreWeb)}
                </TableCell>
                <TableCell >
                  {formatValue(item.Anulados)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </Card>
  )
}
