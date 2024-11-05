import { useState } from 'react'

export const useSort = <T>() => {
  const [sortConfig, setSortConfig] = useState<{ propiedad: keyof T | ''; ascendente: boolean }>({ propiedad: '', ascendente: true })

  const ordenarArray = (data: T[], propiedad: keyof T, ascendente: boolean = true): T[] => {
    return [...data].sort((a, b) => {
      const valorA = a[propiedad]
      const valorB = b[propiedad]
      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return ascendente ? valorA - valorB : valorB - valorA
      }
      return 0
    })
  }

  return { sortConfig, setSortConfig, ordenarArray }
}
