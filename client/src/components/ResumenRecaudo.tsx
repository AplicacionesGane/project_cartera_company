import { formatPesoColombia } from '../utils/funtions'
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
    <p className={getEstadoClass(estado)}>
      {estadoMap[estado] || 'Pendiente'}
    </p>
  )
}

function ResumenRecaudo ({ datos, name }: { datos: DatesI[], name: string }) {
  return (
    <section className='mt-12'>
      <h1 className='text-center py-2 font-semibold'>Resumen Recaudo {name}</h1>
      <table className="mt-5">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Cantidad Recuado</th>
            <th className='text-center'>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            datos.map((item, index) => (
              <tr key={index}>
                <td className='text-center'>
                  <RenderEstado estado={item.ESTADO} />
                </td>
                <td className='text-center'>{item.Cantidad}</td>
                <td className='text-center'>{formatPesoColombia(item.Total)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}

export { ResumenRecaudo }
