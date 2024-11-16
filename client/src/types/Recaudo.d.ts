export interface Recaudo {
  FECHA: string;
  RECAUDADOR: string;
  ID_RECAUDO: string;
  CAJADNO: string;
  VINCULADO: string;
  VALOR: number;
  ESTADO: string;
  RESPALDO: string;
  HORASYNC: string;
  HORAMOVI: string;
  USR_CONTEO: string;
  HORA_CONTEO: string;
  NOTA_CONTEO: string;
  VERSION: string;
}

interface Seller {
  NOMBRES: string;
}

export interface DataReporte {
  FECHA: string;
  VINCULADO: string;
  VALOR: number;
  ESTADO: 'r' | 'u';
  NOTA_CONTEO: string;
  USR_CONTEO: string;
  HORA_CONTEO: string;
  EMPRESA: string;
  Seller?: Seller;
}

export interface DataOracle {
  fecha: Date;
  persona: number;
  nombres: string;
  razonsocial: string;
  servicio: number;
  nombreservicio: string;
  ventabruta: number;
  vtasiniva: number;
  iva: number;
  comision: number;
  ventaneta: number;
  formularios: number;
  sucursal: number;
  nombre_comercial: string;
}
