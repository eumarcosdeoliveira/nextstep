// src/utils/checkPasswordComplexity.ts
export interface PasswordCriteria {
  minLength: boolean
  hasLetter: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
}

export function checkPasswordComplexity(pwd: string): {
  isValid: boolean
  criteria: PasswordCriteria
} {
  const minLength      = pwd.length >= 8
  const hasLetter      = /[a-zA-Z]/.test(pwd)
  const hasNumber      = /[0-9]/.test(pwd)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)
  const criteria = { minLength, hasLetter, hasNumber, hasSpecialChar }
  return { isValid: Object.values(criteria).every(Boolean), criteria }
}
