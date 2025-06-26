export function formatCnpj(value: string): string {
  let cleanedValue = value.replace(/\D/g, '').substring(0, 14)

  if (cleanedValue.length > 12) {
    return cleanedValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    )
  } else if (cleanedValue.length > 8) {
    return cleanedValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{0,4})/,
      '$1.$2.$3/$4'
    )
  } else if (cleanedValue.length > 5) {
    return cleanedValue.replace(
      /(\d{2})(\d{3})(\d{0,3})/,
      '$1.$2.$3'
    )
  } else if (cleanedValue.length > 2) {
    return cleanedValue.replace(
      /(\d{2})(\d{0,3})/,
      '$1.$2'
    )
  } else {
    return cleanedValue
  }
}
