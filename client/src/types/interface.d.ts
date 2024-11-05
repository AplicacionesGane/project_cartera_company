export interface PropsCrating {
  nombres: string
  vinculado: string
  funClose?: () => void
}

interface DatesI {
  ESTADO: string
  Total: number
  Cantidad: number
}

export interface RecaudoI {
  multired: DatesI[]
  servired: DatesI[]
}

export interface DataIU {
  Empresa: string;
  Caj_Comercial: number;
  Colo_Independiente: number;
  Caj_Tesoreria: number;
  Vendedor: number;
  No_Definido: number;
}
