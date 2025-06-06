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
  Caj_Comercial: number;
  Colo_Independiente: number;
  Caj_Tesoreria: number;
  Vendedor: number;
  No_Definido: number;
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
