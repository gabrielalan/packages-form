import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { PackagesFormModelService } from '../../services/packages-form-model.service';
import { ConversionRatesService } from '../../../common/services/conversion-rates.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  protected form: FormGroup;

  protected currencies = ['EUR', 'USD', 'GBP'];

  constructor(
    protected formModel: PackagesFormModelService,
    protected conversion: ConversionRatesService
  ) { }

  ngOnInit() {
    this.form = this.formModel.createModel();
  }

  removePackage(index: number): void {
    this.packages.removeAt(index);
  }

  addPackage(): void {
    this.packages.push(this.formModel.getNewPackageGroup());
  }

  reduceArrayWith(value: (control) => number) {
    const packages = this.form.value.packages;

    return packages.reduce((result, item) => result + value(item), 0);
  }

  get kilos() {
    return this.reduceArrayWith(control => {
      const value = Number(control.weight);
      // NaN is the only value that is not equal itself in JS
      return value !== value ? 0 : value;
    });
  }

  get total() {
    return this.reduceArrayWith(control => {
      const value = Number(control.value.value);
      // NaN is the only value that is not equal itself in JS
      return value !== value ? 0 : this.conversion.convertFrom(control.value.currency, value);
    });
  }

  get packages(): FormArray {
    return this.form.get('packages') as FormArray;
  }
}
