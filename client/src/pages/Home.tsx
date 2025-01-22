import { Input, Card, Label, Badge, Switch } from '../components/ui'
import { BottonExporCartera } from '../components/ExportCartera'
import { SelectNative } from '../components/ui/SelectTremor'
import { TableDatos } from '../components/TableDatos'
import { useCartera } from '../hooks/useCartera'
import { LoadingSvg } from '../components/icons'
import RecaudoDetail from './RecaudoDetail'
import { useState } from 'react'

const Detallado = () => {
  const { dataFiltered, abs, setAbs, empresa, vinculado, setEmpresa, handleClick, handleFilterChange, loading } = useCartera()
  const fecha = new Date().toLocaleDateString()

  const [id, setId] = useState('')
  const [estado, setEstado] = useState('')
  const [show, setShow] = useState(false)

  const handlShowInfo = (id: string, estado: string) => {
    setId(id)
    setEstado(estado)
    setShow(true)
  }

  const handleCloseInfo = () => {
    setId('')
    setEstado('')
    setShow(false)
  }

  return (
    <section className='flex flex-col gap-1 relative'>
      <Card className="flex justify-around">
        <div className='flex items-center gap-1'>
          <p className='text-center'>Fecha:</p>
          <p className='font-semibold'>{fecha}</p>
        </div>

        <div className='flex gap-2 items-center' >
          <Label className='text-sm font-semibold'>Vinculado:</Label>
          <Input value={vinculado} onChange={handleFilterChange} placeholder='1118********' />
        </div>
        <div className='flex items-center'>
          <SelectNative defaultValue='0' className='w-60' value={empresa} onChange={ev => setEmpresa(ev.target.value)}>
            <option value='0'>Multired / Servired</option>
            <option value='101'>Servired</option>
            <option value='102'>Multired</option>
          </SelectNative>
        </div>
        <div className='flex items-center gap-1'>
          <p className='text-center'>ABS {'>'} 100</p>
          <Switch color='red' id='switch' name='switch' checked={abs} onCheckedChange={setAbs} />
        </div>
        <div className='flex items-center gap-2 text-gray-600'>
          <p>N° Datos:</p>
          <Badge variant='warning'>
            {dataFiltered.length}
          </Badge>
        </div>
        <div className='flex items-center'>
          <BottonExporCartera datos={dataFiltered} />
        </div>
      </Card>

      <TableDatos data={dataFiltered} funClick={handleClick} funShowInfo={handlShowInfo} />

      <div>
        {
          show && <RecaudoDetail id={id} estado={estado} funCloseInfo={handleCloseInfo} />
        }
      </div>

      {
        <div className="absolute top-36 right-48 left-48 z-30 flex flex-col items-center justify-center">
          {loading && (
            <div className="w-96 rounded-md flex flex-col shadow-lg items-center justify-center gap-4 py-4 px-6 z-30 bg-yellow-300 animate-pulse">
              <span className="text-lg font-semibold text-gray-800">Solicitando Información ...</span>
              <LoadingSvg />
            </div>
          )}
        </div>
      }
    </section>
  )
}

export default Detallado
