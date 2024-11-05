import { calculateCartera, ReturCargo, sumarCarteraPorEmpresaYCargo } from '../utils/funtions'
import { getDetalleRecaudoMultired, getDetalleRecaudoServired, getResumenCartera } from '../services/resumen.services'
import { ObjectCartera } from '../types/interface'
import { Request, Response } from 'express'

export const getCarteraResumen = async (req: Request, res: Response) => {
  try {

    const Queryresults = await getResumenCartera()

    const MapCartera = Queryresults.map((item) => ({
      Cartera: calculateCartera(item),
      Empresa: item.EMPRESA === '101' ? 'Servired' : 'Multired',
      Cargo: ReturCargo(item.Seller?.NOMBRECARGO || 'NO DEFINIDO')
    }))

    const FilterMayor0 = MapCartera.filter((item) => item.Cartera > 0) as ObjectCartera[]

    const ReduceCartera = sumarCarteraPorEmpresaYCargo(FilterMayor0)

    const Array = Object.entries(ReduceCartera).map(([Empresa, Cargo]) => ({
      Empresa,
      ...Cargo
    }))

    return res.status(200).json(Array)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getRecaudoResumen = async (req: Request, res: Response) => {
  try {
    const servired = await getDetalleRecaudoServired()
    const multired = await getDetalleRecaudoMultired()
    return res.status(200).json({ multired, servired })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
}