import { utils, ColInfo, writeFile } from 'xlsx'
import { DataRecaudo } from '../types/Recaudo'
import { Button } from './ui'
import { toast } from 'sonner'

const generateExcelData = (datos: DataRecaudo[]): unknown[] => {
  const titulo = [{ A: 'Reporte Recaudos Realizados' }]
  const headers = [
    {
      A: 'Fecha',
      B: 'Municipio',
      C: 'Vendedor',
      D: 'Nombre del vendedor',
      E: 'Hora del recaudo',
      F: 'Valor',
      G: 'Cajero',
      H: 'Nombre del cajero',
      I: 'Descripcion'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.fecha,
    B: it.municipio,
    C: it.vendedor,
    D: it.nombre_vendedor,
    E: it.hora_recaudo,
    F: it.valor,
    G: it.cajero,
    H: it.nombre_cajero,
    I: it.descripcion
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (data: unknown[]): void => {
  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(data, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 30 }, { width: 10 }, { width: 30 }, { width: 10 }, { width: 20 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Recaudo')
  writeFile(libro, 'ReporteRecaudoRealizados.xlsx')
}

export const BottonExporReporteRecaudoRealizados = ({ datos }: { datos: DataRecaudo[] }): JSX.Element => {
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
      Exportar
    </Button>
  )
}
