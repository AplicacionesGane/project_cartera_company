import { formatPesoColombia } from '../utils/funtions'
import { DonutChart } from '../components/DonutChart'
import { DataIU } from '../types/interface'

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
                <p className='px-2'>Total <span className='font-medium'>{item.name}:</span></p>
              </article>
              <p className='text-center'>{formatPesoColombia(item.value)}</p>
            </section>
          ))}
        </div>

        <h1 className='text-center text-xl font-bold'>Total: {formatPesoColombia(total)}</h1>
      </div>

      <div className='w-6/12 flex items-center'>
        <table>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Caj comercial</th>
              <th>Col Independiente</th>
              <th>Caj Tesoreria</th>
              <th>Vendedor</th>
              <th>No Definido</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.Empresa}</td>
                  <td>{formatPesoColombia(item.Caj_Comercial)}</td>
                  <td>{formatPesoColombia(item.Colo_Independiente)}</td>
                  <td>{formatPesoColombia(item.Caj_Tesoreria | 0)}</td>
                  <td>{formatPesoColombia(item.Vendedor)}</td>
                  <td>{formatPesoColombia(item.No_Definido | 0)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    </section>
  )
}
