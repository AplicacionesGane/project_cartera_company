import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/contanst'

function ReportOracle () {

  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('')
  
  useEffect(() => {
    axios.get(`${API_URL}/reportOracle`)
      .then(res => {
        const transformedData = res.data.map((item: any[]) => ({
          fecha: item[0],
          documento: item[1],
          nombres: item[2],
          producto: item[3],
          estado: item[4],
          notaConteo: item[5],
          notaConteo0: item[6],
          notaConteo1: item[7],
          notaConteo2: item[8],
          notaConteo3: item[9],
          notaConteo4: item[10],
          notaConteo5: item[11],
          codigoventa: item[12],
          punto: item[13],
        }));
        setData(transformedData);
      })
      .catch(err => {
        console.error('Error en getRecaudo', err);
      });
  }, []);
  

  const filteredData = useMemo(() => {
    if (!data) return null;
    return data.filter(item => item.documento && item.documento.toString().includes(filter));
  }, [data, filter]);
  

  return (
    <> 
    <Card className='flex justify-around py-2 items-center' decoration="top" decorationColor="blue">

        <p className='flex gap-2 items-center'>
          Cantdocumentoad De Datos:
          <span className="px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800">{filteredData?.length || '0'}</span>
        </p>

        <div className='flex gap-2 items-center'>
          <label>Filtrar N° Doc</label>
          <input type="text" placeholder='1118*****' className='rounded-md' value={filter} onChange={ev => setFilter(ev.target.value)} />
        </div>

      </Card>

      <Card decoration='top' decorationColor='blue' className='p-2 mt-0.5'>
        <Table className='xl:max-h-[80vh] 3xl:max-h-[82vh]'>
          <TableHead className='border-b-2 border-blue-600 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
            <TableRow className=''>
              <TableHeaderCell>N°</TableHeaderCell>
              <TableHeaderCell>Fecha</TableHeaderCell>
              <TableHeaderCell>documento</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>producto</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
              <TableHeaderCell>Nota conteo</TableHeaderCell>
              <TableHeaderCell>Codigo PV</TableHeaderCell>
              <TableHeaderCell>Punto de Venta</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.fecha}</TableCell>
                  <TableCell>{item.documento}</TableCell>
                  <TableCell>{item.nombres}</TableCell>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>{item.estado}</TableCell>
                  <TableCell>{item.notaConteo}</TableCell>
                  <TableCell>{item.notaConteo0}</TableCell>
                  <TableCell>{item.notaConteo1}</TableCell>
                  <TableCell>{item.notaConteo2}</TableCell>
                  <TableCell>{item.notaConteo3}</TableCell>
                  <TableCell>{item.notaConteo4}</TableCell>
                  <TableCell>{item.notaConteo5}</TableCell>
                  <TableCell>{item.codigoventa}</TableCell>
                  <TableCell>{item.punto}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export default ReportOracle
