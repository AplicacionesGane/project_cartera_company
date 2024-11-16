import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { formatValue } from '../utils/funtions'
import { useEffect, useState } from 'react'
import { API_URL } from '../utils/contanst'
import { Recaudo } from '../types/Recaudo'
import axios from 'axios'

function RecaudoDetail () {
  const { id, estado } = useParams<{ id: string, estado: string }>()

  const [data, setData] = useState<Recaudo>()
  const navigate = useNavigate()

  console.log(estado)

  useEffect(() => {
    if (!id || !estado) return

    axios.get(`${API_URL}/recaudo/${id}/${estado}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.error('Error en getRecaudo', err)
      })
  }, [id, estado])

  return (
    <Card>
      {
        data !== undefined
          ? (
            <>
              <h1 className='text-center py-2 text-3xl'>Detalle Recaudo</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 text-xl">
                <p className="font-bold text-gray-700"> <span className="font-bold">Fecha:</span> {data.FECHA}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Recaudador:</span> {data.RECAUDADOR}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Caja:</span> {data.CAJADNO}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Vinculado:</span> {data.VINCULADO}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Valor:</span> {formatValue(data.VALOR)}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Estado:</span>
                  {
                    data.ESTADO === 'p' ? ' Pendiente' : data.ESTADO === 'u' ? ' Aceptado' : data.ESTADO === 'c' ? ' Liberado' : ' Rechazado'
                  }
                </p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Respaldo:</span> {data.RESPALDO}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Hora Sync:</span> {data.HORASYNC}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Hora Mov:</span> {data.HORAMOVI}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Usuario Conteo:</span> {data.USR_CONTEO}</p>
                <p className="font-medium text-gray-700"> <span className="font-bold">Hora Conteo:</span> {data.HORA_CONTEO}</p>
                <article className="font-medium text-gray-700 col-span-4 p-2 rounded-md bg-red-100">
                  <p className="font-bold">Nota Conteo:</p> {data.NOTA_CONTEO || 'No proporcionado'}
                </article>
              </div>
            </>
            )
          : (
            <h1 className="font-medium text-center text-gray-700">Cargando...</h1>
            )
      }
      <Button color='red' onClick={() => navigate('/detallado')}>
        Volver a Reportes
      </Button>
    </Card>
  )
}

export default RecaudoDetail
