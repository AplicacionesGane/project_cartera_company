export const formatValue = (number: number) => `$${Intl.NumberFormat('es-CO').format(number).toString()}`
