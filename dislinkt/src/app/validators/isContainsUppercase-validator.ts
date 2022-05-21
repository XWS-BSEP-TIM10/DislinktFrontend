import { AbstractControl } from '@angular/forms'

export function isContainsUppercase(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^(?=.*[A-Z])/.test(control.value)
  return valid
    ? null
    : { containsUppercase: { valid: false, value: control.value } }
}