import { AbstractControl } from '@angular/forms'

export function isWhitespace(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^(?=.*\s)/.test(control.value)
  return !valid
    ? null
    : { whiteSpace: { valid: false, value: control.value } }
}