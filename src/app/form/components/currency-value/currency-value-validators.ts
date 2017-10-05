import { FormControl, AbstractControl, ValidatorFn, Validators } from '@angular/forms';

/**
 * Uses the built-in pattern validator, but
 * passing a different FormControl because we only need
 * to check the value and not the currency
 * @param regex
 * @returns {(control:AbstractControl)=>{[p: string]: any}}
 */
export function pattern(regex: RegExp): ValidatorFn {
  const validator = Validators.pattern(regex);

  return (control: AbstractControl): {[key: string]: any} => {
    const newControl = new FormControl(control.value.value);
    return validator(newControl);
  };
}

/**
 * Must check both currency and value
 * @returns {(control:AbstractControl)=>{[p: string]: any}}
 */
export function required(control: AbstractControl): {[key: string]: any} {
  return !control.value.value || !control.value.currency ? {'required': {value: control.value}} : null;
}
