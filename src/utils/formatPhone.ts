export function formatPhone(value: string): string {
  let cleanedValue = value.replace(/\D/g, '').substring(0, 11)

  if (cleanedValue.length > 10) {
    // (XX) XXXXX-XXXX
    return cleanedValue.replace(
      /^(\d{2})(\d{5})(\d{4}).*/, 
      '($1) $2-$3'
    )
  } else if (cleanedValue.length > 6) {
    // (XX) XXXX-XXXX
    return cleanedValue.replace(
      /^(\d{2})(\d{4})(\d{0,4}).*/, 
      '($1) $2-$3'
    )
  } else if (cleanedValue.length > 2) {
    // (XX) XXX
    return cleanedValue.replace(
      /^(\d{2})(\d{0,5}).*/, 
      '($1) $2'
    )
  } else if (cleanedValue.length > 0) {
    // começa a digitar DDD
    return cleanedValue.replace(
      /^(\d*)/, 
      '($1'
    )
  } else {
    return cleanedValue
  }
}
