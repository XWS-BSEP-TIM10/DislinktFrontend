import { AbstractControl } from '@angular/forms'

export function isContainsSymbol(
  control: AbstractControl
): { [key: string]: any } | null {
  const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
  const result = specialChars.split('').some(specialChar => control.value.includes(specialChar));
  return result
    ? null
    : { containsSimbol: { valid: false, value: control.value } }
}