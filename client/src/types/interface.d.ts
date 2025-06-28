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

export interface DataIU {
  Empresa: string;
  CAJERO_COMERCIAL: number;
  COLOCADOR_INDEPENDIENTE: number;
  CAJERO_TESORERIA: number;
  VENDEDOR: number;
  NO_DEFINIDO: number;
}

export interface CarteraDataXHoraI {
  HORA: string
  VLR_CA: number
  VLR_CI: number
  VLR_CT: number
}

export interface CarteraDataEmpresaI {
  empresa: string
  totalRegistros: number
  datos: CarteraDataXHoraI[]
}

export interface RecaudoI {
  multired: DatesI[]
  servired: DatesI[]
  carteraXhoras: CarteraDataEmpresaI[]
}
