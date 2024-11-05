export interface CarteraItem {
  EMPRESA: string;
  VINCULADO: string;
  SALDO_ANT: number;
  DEBITO: number;
  CREDITO: number;
  NUEVOSALDO: number;
  VTABNET: number;
  VTASIISS: number;
  VTASFLEX: number;
  VTA_S1: number;
  RECHAZADOS: number;
  ACEPTADOS: number;
  DIGITADOS: number;
  PENDIENTES_CONT: number;
}

export interface MappedResult {
  Empresa: string;
  Vinculado: string;
  Nombres: string;
  Cargo: string;
  Base: number;
  SaldoAnt: number;
  Debito: number;
  Credito: number;
  NuevoSaldo: number;
  Cartera: number;
  Rechazados: number;
  Aceptados: number;
  PendientesCont: number;
  Digitados: number;
  Vtabnet: number;
  CuadreWeb: number;
  Anulados: number;
}

export interface ObjectCartera {
  Cartera: number
  Empresa: "Servired" | "Multired"
  Cargo: string;
}

