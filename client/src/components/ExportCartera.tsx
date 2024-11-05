import { utils, ColInfo, writeFile } from 'xlsx'
import { CarteraI } from '../types/cartera'
import { Button } from './ui'
import { toast } from 'sonner'

const generateExcelData = (datos: CarteraI[]): unknown[] => {
  const titulo = [{ A: 'Reporte Cartera ' }]
  const headers = [
    {
      A: 'EMPRESA',
      B: 'CEDULA',
      C: 'NOMBRES',
      D: 'CARGO',
      E: 'BASE',
      F: 'SALDO ANT',
      G: 'DÉBITO',
      H: 'CRÉDITO',
      I: 'NUEVO SALDO',
      J: 'CARTERA',
      K: 'RECHAZADOS',
      L: 'ACEPTADOS',
      M: 'P CONTEO',
      N: 'DIGITADOS',
      O: 'VENTA BNET',
      P: 'CUADRE WEB',
      Q: 'ANULADOS',
      R: 'ZONA'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.Empresa,
    B: it.Vinculado,
    C: it.Nombres,
    D: it.Cargo,
    E: it.Base.toString(),
    F: it.SaldoAnt.toString(),
    G: it.Debito.toString(),
    H: it.Credito.toString(),
    I: it.NuevoSaldo.toString(),
    J: it.Cartera.toString(),
    K: it.Rechazados.toString(),
    L: it.Aceptados.toString(),
    M: it.PendientesCont.toString(),
    N: it.Digitados.toString(),
    O: it.Vtabnet.toString(),
    P: it.CuadreWeb.toString(),
    Q: it.Anulados.toString(),
    R: it.Zona
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
  writeFile(libro, 'ReporteCartera.xlsx')
}

export const BottonExporCartera = ({ datos }: { datos: CarteraI[] }): JSX.Element => {
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
