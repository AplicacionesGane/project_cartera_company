import { utils, ColInfo, writeFile } from 'xlsx'
import { DataReporte } from '../types/Recaudo'
import { Button } from './ui'
import { toast } from 'sonner'

const generateExcelData = (datos: DataReporte[]): unknown[] => {
  const titulo = [{ A: 'Reporte Transportes Recaudos' }]
  const headers = [
    {
      A: 'Fecha',
      B: 'Vinculado',
      C: 'Nombres',
      D: 'Valor',
      E: 'Estado',
      F: 'Hora conteo',
      G: 'Usuario conteo',
      H: 'Empresa',
      I: 'Nota conteo'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.FECHA,
    B: it.VINCULADO,
    C: it.Seller?.NOMBRES ?? 'No Registrado',
    D: it.VALOR,
    E: it.ESTADO === 'r' ? 'Rechazado' : 'Aceptado',
    F: it.HORA_CONTEO,
    G: it.USR_CONTEO,
    H: it.EMPRESA === '101' ? 'Servired' : it.EMPRESA === '102' ? 'Multired' : 'Sin Empresa Asignada',
    I: it.NOTA_CONTEO
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (data: unknown[]): void => {
  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(data, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 10 }, { width: 10 }, { width: 30 }, { width: 10 }, { width: 20 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Recaudo')
  writeFile(libro, 'ReporteRecaudo.xlsx')
}

export const BottonExporReporteRecaudo = ({ datos }: { datos: DataReporte[] }): JSX.Element => {
  const handleDownload = (): void => {
    const dataFinal = generateExcelData(datos)

    const promises = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'sonner' })
      }, 3000)
    })

    toast.promise(promises, {
      loading: 'Generando Archivo ...',
      description: 'Espere un momento',
      style: { background: '#fcd34d' },
      success: () => {
        createExcelFile(dataFinal)
        return 'Archivo Generado Correctamente'
      },
      error: 'Error al Generar Archivo'
    })
  }

  return (
    <Button onClick={handleDownload}>
      Exportar a Excel
    </Button>
  )
}
