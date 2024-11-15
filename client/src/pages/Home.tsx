import { BottonExporCartera } from '../components/ExportCartera'
import { SelectNative } from '../components/SelectTremor'
import { TableDatos } from '../components/TableDatos'
import { Input } from '../components/ui/InputTremor'
import { Switch } from '../components/SwitchTremor'
import { Label } from '../components/LabelTremor'
import { useCartera } from '../hooks/useCartera'
import { Card } from '../components/CardTremor'
import { Badge } from '../components/BadgeTremor'

const Detallado = () => {
  const { dataFiltered, abs, setAbs, empresa, vinculado, setEmpresa, handleClick, handleFilterChange } = useCartera()
  const fecha = new Date().toLocaleDateString()

  return (
    <section className='flex flex-col gap-1'>
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
      <TableDatos data={dataFiltered} funClick={handleClick} />
    </section>
  )
}

export default Detallado
