import { AbstractControl } from '@angular/forms'

export function isContainsLowercase(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^(?=.*[a-z])/.test(control.value)
  return valid
    ? null
    : { containsLowercase: { valid: false, value: control.value } }
}