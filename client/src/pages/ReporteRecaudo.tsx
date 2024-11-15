import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { BottonExporReporteRecaudo } from '../components/ExportReporteRecaudo'
import { FormEvent, useMemo, useState } from 'react'
import { DataReporte } from '../types/Recaudo'
import { API_URL } from '../utils/contanst'
import axios from 'axios'
import AlertDialogSlide from '../components/ui/Dialog'
import { toast } from 'sonner'

export default function ReportClienteGanadores() {
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [zona, setZona] = useState<string | undefined>(undefined)
  const [filter, setFilter] = useState<string>('')
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const [data, setData] = useState<DataReporte[] | null>(null)

  const handleSubmitInfo = (e: FormEvent) => {
    e.preventDefault()

    if (date1 === '' || date2 === '' || zona === '') {
      toast.error("Por favor llene todos los campos, fecha inicial fecha final y zona")
      return
    }

    axios.post<DataReporte[]>(`${API_URL}/reportRecaudo`, { fecha1: date1.toString().slice(0, 10), fecha2: date2.toString().slice(0, 10), zona })
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }

  const filteredData = useMemo(() => {
    if (!data) return null
    return data.filter(item => item.VINCULADO.includes(filter))
  }, [data, filter])

  const handleRowClick = (item: DataReporte) => {
    setDialogContent(
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 shadow-lg rounded-lg bg-white items-center gap-6">
        <p className="font-bold text-gray-700"> Fecha: {item.FECHA}</p>
        <p className="font-bold text-gray-700"> Vinculado: {item.VINCULADO}</p>
        <p className="font-bold text-gray-700"> Nombres: {item.Seller?.NOMBRES ?? 'No Registrado'}</p>
        <p className="font-bold text-gray-700"> Valor: {item.VALOR}</p>
        <p className="font-bold text-gray-700"> Estado: {item.ESTADO === 'r' ? 'Rechazado' : 'Aceptado'}</p>
        <p className="font-bold text-gray-700"> Hora conteo: {item.HORA_CONTEO}</p>
        <p className="font-bold text-gray-700"> User conteo: {item.USR_CONTEO}</p>
        <p className="font-bold text-gray-700"> Nota conteo: {item.NOTA_CONTEO}</p>
      </div>
    );
    setOpenDialog(true);
  };

  return (
    <>
      <Card className='flex justify-around py-2 items-center' decoration="top" decorationColor="blue">

        <div className='flex gap-2 items-center' >
          <label>Fecha Inicial</label>
          <input type='date' value={date1} onChange={(e) => setDate1(e.target.value)}
            className='rounded-md' />
          <label>Fecha Final</label>
          <input type='date' value={date2} onChange={(e) => setDate2(e.target.value)}
            className='rounded-md' />
        </div>

        <form className='flex gap-2 items-center' onSubmit={handleSubmitInfo}>
          <label >Empresa: </label>
          <select name='zona' className='px-4 rounded-md w-40' value={zona} onChange={ev => setZona(ev.target.value)}>
            <option value=''>Seleccione</option>
            <option value='101'>Servired</option>
            <option value='102'>Multired</option>
          </select>

          <button type='submit' className='bg-green-600 py-2 px-4 rounded-md text-white hover:bg-green-500'>
            Solicitar Reporte
          </button>
        </form>

        <p className='flex gap-2 items-center'>
          Cantidad De Datos:
          <span className="px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800">{filteredData?.length || '0'}</span>
        </p>

        <div className='flex gap-2 items-center'>
          <label>Filtrar N° Doc</label>
          <input type="text" placeholder='1118*****' className='rounded-md' value={filter} onChange={ev => setFilter(ev.target.value)} />
        </div>

        <BottonExporReporteRecaudo datos={filteredData ?? []} />

      </Card>

      <Card decoration='top' decorationColor='blue' className='p-2 mt-0.5'>
        <Table className='xl:max-h-[80vh] 3xl:max-h-[82vh]'>
          <TableHead className='border-b-2 border-blue-600 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
            <TableRow className=''>
              <TableHeaderCell>N°</TableHeaderCell>
              <TableHeaderCell>Fecha</TableHeaderCell>
              <TableHeaderCell>Vinculado</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>Valor</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Hora conteo</TableHeaderCell>
              <TableHeaderCell>User conteo</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className=''>
            {
              filteredData?.map((item, index) => (
                <TableRow key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.FECHA}</TableCell>
                  <TableCell>{item.VINCULADO}</TableCell>
                  <TableCell>{item.Seller?.NOMBRES ?? 'No Registrado'}</TableCell>
                  <TableCell>{item.VALOR}</TableCell>
                  <TableCell className={item.ESTADO === 'r' ? 'text-red-400 font-semibold' : item.ESTADO === 'u' ? 'text-green-400 font-semibold' : 'text-gray-600'}>
                    {item.ESTADO === 'r' ? 'Rechazado' : 'Aceptado'}
                  </TableCell>
                  <TableCell>{item.HORA_CONTEO}</TableCell>
                  <TableCell>{item.USR_CONTEO}</TableCell>
                  <TableCell>{item.NOTA_CONTEO}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Card>
      <AlertDialogSlide open={openDialog} onClose={() => setOpenDialog(false)} content={dialogContent} />
    </>
  )


}
