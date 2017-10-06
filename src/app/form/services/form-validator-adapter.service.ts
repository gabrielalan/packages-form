import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable()
export class FormValidatorAdapterService {

  /**
   * Adapt some validator to also include a custom message
   * in case of error
   * @param message (_: any) => string | string
   * @param validator ValidatorFn
   * @returns {(control:AbstractControl)=>(ValidationErrors|null)}
   */
  messageValidator(
    message: any,
    validator: (control: AbstractControl) => ValidationErrors | null
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const result = validator(control);

      if (result) {
        result.message = typeof message === 'string' ? message : message(result);
      }

      return result;
    };
  }
}
