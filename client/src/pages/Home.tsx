import { Card, Select, SelectItem, Switch, TextInput } from '@tremor/react'
import { BottonExporCartera } from '../components/ExportCartera'
import { TableDatos } from '../components/TableDatos'
import { useCartera } from '../hooks/useCartera'
import { Label } from '../components/ui'
import { useState } from 'react'

const fecha = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
}).format(new Date())

const Detallado = () => {
  const { data, setAbs, setEmpresa, handleClick } = useCartera()

  const [vinculado, setVinculado] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinculado(e.target.value)
  }

  const filterVinculado = data.filter(item => item.Vinculado.toString().includes(vinculado))

  return (
    filterVinculado && (
      <section className=''>
         <Card className='flex gap-4 justify-between text-xs py-2 mt-0.5' decoration="top" decorationColor="rose">
          <div>
            <p className='text-center'>Fecha:</p>
            <p className='font-semibold'>{fecha}</p>
          </div>

          <div className='flex gap-2 items-center' >
            <Label className='text-sm font-semibold'>Vinculado:</Label>
            <TextInput name='viculado' placeholder='1118111222 | 669102432' className='w-52' type='text' value={vinculado} onChange={handleChange} />

          </div>
          <Select defaultValue="0" className='w-60' onValueChange={setEmpresa}>
            <SelectItem value="0">Multired / Servired</SelectItem>
            <SelectItem value="101">Servired</SelectItem>
            <SelectItem value="102">Multired</SelectItem>
          </Select>
          <div className='flex flex-col items-center'>
            <p className='text-center'>Filtro ABS {'>'} 100</p>
            <Switch color='red' id="switch" name="switch" onChange={setAbs} />
          </div>
          <p className='flex text-center items-center text-gray-600'>N° Datos Mostrados:<span className='font-semibold pl-1'>{filterVinculado.length}</span></p>
          <BottonExporCartera datos={filterVinculado} />
        </Card>
        <TableDatos data={filterVinculado} funClick={handleClick} />
      </section>
    )
  )
}

export default Detallado
