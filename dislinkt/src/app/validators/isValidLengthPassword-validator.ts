import { AbstractControl } from '@angular/forms'

export function isValidLengthPassword(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = control.value.length > 9
  return valid
    ? null
    : { validLengthPass: { valid: false, value: control.value } }
}