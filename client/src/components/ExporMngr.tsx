import { utils, ColInfo, writeFile } from 'xlsx'
import { MngrRecaudo } from '../pages/ReportMngr'
import { Button } from './ui'
import { toast } from 'sonner'

const generateExcelData = (datos: MngrRecaudo[]): unknown[] => {
  const titulo = [{ A: 'Reporte Manager' }]
  const headers = [
    {
      A: 'FECHA',
      B: 'INGRESOS',
      C: 'EGRESOS',
      D: 'SALDO DIA',
      E: 'ABONO CARTERA',
      F: 'DIFERENCIA DIA'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.fecha.split('T')[0],
    B: it.ingresos,
    C: it.egresos,
    D: it.ingresos - it.egresos,
    E: it.abonos_cartera,
    F: (it.ingresos - it.egresos) - it.abonos_cartera
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
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Cartera')
  writeFile(libro, 'ReporteCarteraManager.xlsx')
}

export const BottonExporCarteraMngr = ({ datos }: { datos: MngrRecaudo[] }): JSX.Element => {
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
