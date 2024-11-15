import { utils, ColInfo, writeFile } from 'xlsx'
import { DataOracle } from '../types/Recaudo'
import { Button } from './ui'
import { toast } from 'sonner'

const generateExcelData = (datos: DataOracle[]): unknown[] => {
  const titulo = [{ A: 'Consolidado Venta Vinculado' }]
  const headers = [
    {
      A: 'Fecha',
      B: 'Vinculado',
      C: 'Nombres',
      D: 'Razón Social',
      E: 'Servicio',
      F: 'Nombre Servicio',
      G: 'Vta Bruta',
      H: 'Vta Sin IVA',
      I: 'IVA',
      J: 'Comisión',
      K: 'Vta Neta',
      L: 'Formularios',
      M: 'Sucursal',
      N: 'Nombre Comercial'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.fecha,
    B: it.persona,
    C: it.nombres,
    D: it.razonsocial,
    E: it.servicio,
    F: it.nombreservicio,
    G: it.ventabruta,
    H: it.vtasiniva,
    I: it.iva,
    J: it.comision,
    K: it.ventaneta,
    L: it.formularios,
    M: it.sucursal,
    N: it.nombre_comercial
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
  utils.book_append_sheet(libro, hoja, 'Consolidado')
  writeFile(libro, 'VentaConsolidado.xlsx')
}

export const BottonExporReporteConsolidado = ({ datos }: { datos: DataOracle[] }): JSX.Element => {
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
