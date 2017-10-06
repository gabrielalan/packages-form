import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { CurrencyValueType } from '../components/currency-value/currency-value-type';
import { required, pattern } from '../components/currency-value/currency-value-validators';
import { FormValidatorAdapterService } from './form-validator-adapter.service';

@Injectable()
export class PackagesFormModelService {

  public valueRegex: RegExp = /^(\d+|\.\d{1,2}|\d+\.\d{1,2})$/;
  public weightRegex: RegExp = /^(\d+|\.\d{1,3}|\d+\.\d{1,3})$/;
  public nameMaxLength: number = 32;
  public kgMax: number = 10;

  constructor(private adapter: FormValidatorAdapterService) {}

  getNameValidators() {
    return [
      this.adapter.messageValidator('Name is required', Validators.required),
      this.adapter.messageValidator(
        (error) => `Name must be less or equal than ${error.maxlength.requiredLength} characters.
                    You got ${error.maxlength.actualLength}!`,
        Validators.maxLength(this.nameMaxLength)
      )
    ];
  }

  getWeightValidators() {
    return [
      this.adapter.messageValidator(
        'Weight must be a number with up to 3 decimal places',
        Validators.pattern(this.weightRegex)
      ),
      this.adapter.messageValidator(
        (error) => `The package can have up to ${error.max.max}kg.
                    This one has ${error.max.actual}kg!`,
        Validators.max(this.kgMax)
      ),
      this.adapter.messageValidator('Weight is required', Validators.required)
    ];
  }

  getValueValidators() {
    return [
      this.adapter.messageValidator('Value must be a number with up to 2 decimal places', pattern(this.valueRegex)),
      this.adapter.messageValidator('Value is required', required)
    ];
  }

  /**
   * Create the metadata for the form model
   */
  getNewPackageGroup() {
    return {
      name: [null, this.getNameValidators()],
      weight: [null, this.getWeightValidators()],
      value: [new CurrencyValueType('EUR', null), this.getValueValidators()]
    };
  }
}
