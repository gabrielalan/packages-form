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

  get total() {
    const packages = this.form.value.packages;

    return packages.reduce((result, item) => {
      const value = Number(item.value.value);

      // NaN is the only value that is not equal itself in JS
      const converted = value !== value ? 0 : this.conversion.convertFrom(item.value.currency, value);

      return result + converted;
    }, 0);
  }

  get packages(): FormArray {
    return this.form.get('packages') as FormArray;
  }
}
