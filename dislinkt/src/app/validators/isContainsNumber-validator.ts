import { AbstractControl } from '@angular/forms'

export function isContainsNumber(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^(?=.*\d)/.test(control.value)
  return valid
    ? null
    : { containsNumber: { valid: false, value: control.value } }
}