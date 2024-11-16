import { DataOracle } from '../types/Recaudo'
import { Card, Label, Badge } from './ui' // Asegúrate de importar los componentes necesarios

export const InfoPersonReport = ({ data, fecha }:{data: DataOracle[], fecha: string}) => {
  const firstResult = data && data.length > 0 ? data[0] : { persona: '', nombres: '', sucursal: '', nombre_comercial: '' }

  return (
    <Card className='mt-1 grid grid-cols-12'>
      <div className='col-span-2'>
        <Label>Fecha: </Label>
        <Badge variant='warning'>{fecha || ''}</Badge>
      </div>
      <div className='col-span-2'>
        <Label>N° Documento: </Label>
        <Badge variant='warning'>{firstResult.persona || ''}</Badge>
      </div>
      <div className='col-span-3'>
        <Label>Nombres: </Label>
        <Badge variant='warning'>{firstResult.nombres || ''}</Badge>
      </div>
      <div className='col-span-1'>
        <Label>Sucursal: </Label>
        <Badge variant='warning'>{firstResult.sucursal || ''}</Badge>
      </div>
      <div className='col-span-3'>
        <Label>Nombre Sucursal: </Label>
        <Badge variant='warning'>{firstResult.nombre_comercial || ''}</Badge>
      </div>
    </Card>
  )
}
