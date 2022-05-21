import { AbstractControl } from '@angular/forms'

export function isContainsNumber(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^(?=.*[0-9])/.test(control.value)
  return valid
    ? null
    : { containsNumber: { valid: false, value: control.value } }
}