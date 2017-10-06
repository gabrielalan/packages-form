import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { CurrencyValueType } from '../components/currency-value/currency-value-type';
import { required, pattern } from '../components/currency-value/currency-value-validators';
import { FormValidatorAdapterService } from './form-validator-adapter.service';

@Injectable()
export class PackagesFormModelService {

  public valueRegex: RegExp = /^(\d+|\.\d{1,2}|\d+\.\d{1,2})$/;
  public weightRegex: RegExp = /^(\d+|\.\d{1,3}|\d+\.\d{1,3})$/;
  public nameMaxLength: number = 32;
  public kgMax: number = 10;
  public sumKgMax: number = 25;

  constructor(
    private adapter: FormValidatorAdapterService,
    private formsBuilder: FormBuilder
  ) {}

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
   * Custom validator to check the maximum 25kg for all packages
   */
  packagesValidator(control: FormArray): ValidationErrors | null {
    const data = control.controls.map(group => group.value.weight);
    const sum = data.reduce((result, item) => result + Number(item), 0);

    if (sum !== sum || sum > this.sumKgMax) {
      return {
        max: this.sumKgMax,
        actual: sum,
        message: `All the packages summed KG must be less or equal than ${this.sumKgMax}kg. You got ${sum}kg!`
      };
    }

    return null;
  }

  /**
   * Create a new group with the packages model
   */
  createModel(): FormGroup {
    return this.formsBuilder.group({
      packages: this.formsBuilder.array([
        this.getNewPackageGroup()
      ], this.packagesValidator.bind(this))
    });
  }

  /**
   * Create the metadata for the form model
   */
  getNewPackageGroup(): FormGroup {
    return this.formsBuilder.group({
      name: [null, this.getNameValidators()],
      weight: [null, this.getWeightValidators()],
      value: [new CurrencyValueType('EUR', null), this.getValueValidators()]
    });
  }
}
