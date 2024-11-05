import { Card, Select, SelectItem, Switch, TextInput } from '@tremor/react'
import { BottonExporCartera } from './ExportCartera'
import { Label } from './ui'
import { CarteraI } from '../types/cartera'

const fecha = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
}).format(new Date())

interface PropsCompo {
  data: CarteraI[]
  funEmpresa: (e: string) => void
  funABS: (e: boolean) => void
  funFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
  vin: string
}

export const HeaderCompCartera = ({ data, funEmpresa, funABS, funFilter, vin }: PropsCompo) => {
  return (
    <Card className='flex gap-4 justify-between text-xs py-2 mt-0.5 dark:text-white' decoration="top" decorationColor="rose">
      <div>
        <p className='text-center'>Fecha:</p>
        <p className='font-semibold'>{fecha}</p>
      </div>

      <div className='flex gap-2 items-center' >
        <Label className='text-sm font-semibold'>Vinculado:</Label>
        <TextInput name='viculado' placeholder='1118111222 | 669102432' className='w-52' type='text' value={vin} onChange={funFilter}/>

      </div>
      <Select defaultValue="0" className='w-60' onValueChange={funEmpresa}>
        <SelectItem value="0">Multired / Servired</SelectItem>
        <SelectItem value="101">Servired</SelectItem>
        <SelectItem value="102">Multired</SelectItem>
      </Select>
      <div className='flex flex-col items-center'>
        <p className='text-center'>Filtro ABS {'>'} 100</p>
        <Switch color='red' id="switch" name="switch" onChange={funABS} />
      </div>
      <p className='flex text-center items-center text-gray-600 dark:text-white'>N° Datos Mostrados:<span className='font-semibold pl-1'>{data.length}</span></p>
      <BottonExporCartera datos={data} />
    </Card>
  )
}
