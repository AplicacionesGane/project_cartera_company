import { BasesIUpdates } from '../types/Bases'
import { Card } from '@tremor/react'

export const HistUpdBases = ({ data }: { data: BasesIUpdates[] }) => {
  return (
    <section>
      {
        data.map((item, index) => {
          return (
            <Card key={index} className="bg-gray-100 p-2 my-2 rounded-md">
              <article className='flex gap-4'>
                <div>
                  <p>Fecha / Hora Actualización</p>
                  <p>{item.FECHA.split('T')[0]} : {item.FECHA.slice(11).split('.')[0]}</p>
                </div>
                <div>
                  <p>Base Anterior</p>
                  <p>{item.BASE_ANT}</p>
                </div>
                <div>
                  <p>Base Actualizada</p>
                  <p>{item.BASE_NEW}</p>
                </div>
                <div>
                  <p>Raspe Anterior</p>
                  <p>{item.RASPE_ANT}</p>
                </div>
                <div>
                  <p>Respe Actualizada</p>
                  <p>{item.RASPE_NEW}</p>
                </div>
                <div>
                  <p>Usuario Responsable</p>
                  <p>{item.LOGIN}</p>
                </div>
                <div>
                  <p>Observaciones: </p>
                  <p>{item.OBSERVACION}</p>
                </div>
              </article>
            </Card>
          )
        })
      }
    </section>
  )
}
