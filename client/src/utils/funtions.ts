export const formatPesoColombia = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(value).slice(0, -3)
}
