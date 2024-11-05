import { DonutChart, Title } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { DataIU } from '../types/interface'

const dataFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('co-ES').format(number).toString()}`

export function TableInfo ({ data }: { data: DataIU[] }) {
  const dataUnifi = data.map((item) => ({
    name: item.Empresa,
    value: item.Caj_Comercial | 0 + item.Colo_Independiente | 0 + item.Caj_Tesoreria | 0 + item.Vendedor | 0 + item.No_Definido | 0
  }))

  const total = dataUnifi.reduce((acc, item) => acc + item.value, 0)

  return (
    <section className='flex w-full justify-around'>

      <div className='w-3/12'>
        <DonutChart colors={['yellow', 'blue']} data={dataUnifi} className=''
          variant="pie" valueFormatter={dataFormatter} onValueChange={(v) => console.log(v)} />
        <Title className='text-center pt-2 text-xs xl:text-sm 2xl:text-base'>Cartera Pendiente</Title>
        <p className='text-center text-xs xl:text-sm 2xl:text-base'>
          <span>Total Servired + Multired: </span>
          <span className='font-medium'>{formatPesoColombia(total)}</span>
        </p>
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

      <section className='w-3/12 flex items-center justify-center'>
        {dataUnifi.map((item, index) => {
          return (
            <section key={index} className='bg-gray-200 m-1 p-2 rounded-md'>
              <article className='flex items-center text-center'>
                <p className={`w-4 h-4 p-2 rounded-full ${item.name === 'Multired' ? 'bg-blue-500' : 'bg-yellow-500'} `}></p>
                <p className='px-2'>Total <span className='font-medium'>{item.name}:</span></p>
              </article>
              <p className='text-center'>{formatPesoColombia(item.value)}</p>
            </section>
          )
        })}
      </section>

    </section>
  )
}
