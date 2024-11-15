import { TableRoot, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './TableTremor'
import { formatValue } from '../utils/funtions'
import { DataIU } from '../types/interface'
import { DonutChart } from './DonutChart'

export function TableInfo ({ data }: { data: DataIU[] }) {
  const dataUnifi = data.map((item) => ({
    name: item.Empresa,
    value: item.Caj_Comercial | 0 + item.Colo_Independiente | 0 + item.Caj_Tesoreria | 0 + item.Vendedor | 0 + item.No_Definido | 0
  }))

  const total = dataUnifi.reduce((acc, item) => acc + item.value, 0)

  return (
    <section className='flex w-full justify-around'>

      <div className='flex flex-col items-center gap-2'>
        <DonutChart
          colors={['amber', 'blue']}
          data={dataUnifi}
          category='name'
          value='value'
          variant='pie'
          valueFormatter={(number: number) => `$${Intl.NumberFormat('es-CO').format(number).toString()}`}
        />

        <div className='flex'>
          {dataUnifi.map((item, index) => (
            <section key={index} className='bg-gray-200 m-1 p-2 rounded-md'>
              <article className='flex items-center text-center'>
                <p className={`w-4 h-4 p-2 rounded-full ${item.name === 'Multired' ? 'bg-blue-500' : 'bg-yellow-500'} `}></p>
                <p className='px-2'>Total <span className='font-medium'>{item.name}</span></p>
              </article>
              <p className='text-center'>{formatValue(item.value)}</p>
            </section>
          ))}
        </div>

        <h1 className='text-center text-xl font-bold'>Total: {formatValue(total)}</h1>
      </div>

      <div className='flex items-center'>
        <TableRoot>
          <Table>
            <TableHead className='bg-blue-600'>
              <TableRow>
                <TableHeaderCell className='text-white'>Empresa</TableHeaderCell>
                <TableHeaderCell className='text-white'>Caj Comercial</TableHeaderCell>
                <TableHeaderCell className='text-white'>Col Independiente</TableHeaderCell>
                <TableHeaderCell className='text-white'>Caj Tesorería</TableHeaderCell>
                <TableHeaderCell className='text-white'>Vendedor</TableHeaderCell>
                <TableHeaderCell className='text-white'>No definido</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.Empresa}</TableCell>
                  <TableCell>{formatValue(item.Caj_Comercial)}</TableCell>
                  <TableCell>{formatValue(item.Colo_Independiente)}</TableCell>
                  <TableCell>{formatValue(item.Caj_Tesoreria | 0)}</TableCell>
                  <TableCell>{formatValue(item.Vendedor)}</TableCell>
                  <TableCell>{formatValue(item.No_Definido | 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>

      </div>

    </section>
  )
}
