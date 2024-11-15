import { formatValue } from '../utils/funtions'
import { BasesIUpdates } from '../types/Bases'
import { Card } from '../components/CardTremor'
import { Badge } from './ui/Badge'

function UpdatesBasesInfo ({ data }: { data: BasesIUpdates[] }) {
  return (
    <Card className='mt-2'>
      <h1 className='text-center'>Historial Actualización Bases</h1>
      <div className='overflow-y-auto max-h-96 flex flex-col gap-2'>
        {
          data && (
            data.map((update, index) => (
              <div key={index} className='grid grid-cols-3 gap-1 px-4 py-2 border rounded-md'>
                <p><span>Fecha: </span>{new Date(update.FECHA).toLocaleDateString()} <span>{new Date(update.FECHA).toLocaleTimeString()}</span></p>
                <p>Base Nueva: <Badge color='green'>{formatValue(update.BASE_NEW)}</Badge></p>
                <p>Base Anterior: <Badge color='red'>{formatValue(update.BASE_ANT)}</Badge> </p>
                <p><span>Responsable: </span>{update.LOGIN}</p>
                <p>Raspe Nuevo: <Badge color='green'>{formatValue(update.RASPE_NEW)}</Badge></p>
                <p>Raspe Anterior: <Badge color='red'>{formatValue(update.RASPE_ANT)}</Badge></p>
                <p>Observación: {update.OBSERVACION}</p>
              </div>
            ))
          )
        }
      </div>
    </Card>
  )
}

export default UpdatesBasesInfo
