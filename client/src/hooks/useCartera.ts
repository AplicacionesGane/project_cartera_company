import { fetchCartera } from '../services/carteraSevices'
import { useEffect, useState } from 'react'
import { CarteraI } from '../types/cartera'
import { useSort } from './useSort'

export const useCartera = () => {
  const [abs, setAbs] = useState<boolean>(false)
  const [data, setData] = useState<CarteraI[]>([])
  const [empresa, setEmpresa] = useState<string>('0')
  const { sortConfig, setSortConfig, ordenarArray } = useSort<CarteraI>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCartera(empresa, abs)
        setData(data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [empresa, abs])

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    const propiedadActual = e.currentTarget.id as keyof CarteraI
    const esLaMismaPropiedad = sortConfig.propiedad === propiedadActual
    const nuevaDireccion = esLaMismaPropiedad ? !sortConfig.ascendente : true

    setSortConfig({ propiedad: propiedadActual, ascendente: nuevaDireccion })
    setData(prevData => ordenarArray(prevData, propiedadActual, nuevaDireccion))
  }

  return { data, setAbs, setEmpresa, handleClick }
}
