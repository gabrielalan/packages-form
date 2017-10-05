import { Validators } from '@angular/forms';
import { CurrencyValueType } from '../../components/currency-value/currency-value-type';
import { required, pattern } from '../../components/currency-value/currency-value-validators';

const valueRegex = /^(\d+|\.\d{1,2}|\d+\.\d{1,2})$/;
const weightRegex = /^(\d+|\.\d{1,3}|\d+\.\d{1,3})$/;

export class PackagesFormModel {

  /**
   * Create the metadata for the form model
   */
  static getNewPackageGroup() {
    return {
      name: [null, [Validators.required, Validators.maxLength(32)]],
      weight: [null, [Validators.pattern(weightRegex), Validators.required]],
      value: [new CurrencyValueType('EUR', null), [pattern(valueRegex), required]]
    };
  }
}
