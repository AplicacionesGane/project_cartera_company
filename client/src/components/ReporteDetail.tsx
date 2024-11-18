import { DataReporte } from '../types/Recaudo'
import { Button } from './ui/ButtonTremor'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/DialogTremor'
import { Badge } from './ui/BadgeTremor'
import { Callout } from './ui/CalloutTremor'

export function DialogHero ({ open, onClose, data }: { open: boolean; onClose: () => void; data: DataReporte | null }) {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-center">Detalle Recaudo</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6">
            <div className="grid grid-cols-2 gap-2 pb-4 text-xs lg:text-base 2xl:text-xl">
              <p className="font-bold text-gray-800 flex gap-2">
                <span className="font-bold">Fecha:</span>
                <Badge variant='warning'>{data?.FECHA}</Badge>
              </p>
              <p className="font-medium text-gray-800">
                <span className="font-bold">Vinculado:</span> {data?.VINCULADO}
              </p>
              <p className="font-medium text-gray-800">
                <span className="font-bold">Nombres:</span> {data?.Seller?.NOMBRES ?? 'No Registrado'}
              </p>
              <p className="font-medium text-gray-800 flex gap-2">
                <span className="font-bold">Valor:</span>
                <Badge variant='default'>{data?.VALOR}</Badge>
              </p>
              <p className="font-medium text-gray-800 flex gap-2">
                <span className="font-bold">Estado:</span>
                {data?.ESTADO === 'r'
                  ? <Badge variant='error'>Rechazado</Badge>
                  : <Badge variant='success'>Aceptado</Badge>
                }
              </p>
              <p className="font-medium text-gray-800">
                <span className="font-bold">Hora Conteo:</span> {data?.HORA_CONTEO}
              </p>
              <p className="font-medium text-gray-800">
                <span className="font-bold">Usuario Conteo:</span> {data?.USR_CONTEO}
              </p>
            </div>
            <Callout title='Nota Conteo' variant='error'>
              {data?.NOTA_CONTEO || 'No proporcionado'}
            </Callout>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              className="mt-2 w-full sm:mt-0 sm:w-fit"
              variant="secondary"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
