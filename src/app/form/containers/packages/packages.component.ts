import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';
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
    protected formsBuilder: FormBuilder,
    protected formModel: PackagesFormModelService,
    protected conversion: ConversionRatesService
  ) { }

  ngOnInit() {
    this.form = this.formsBuilder.group({
      packages: this.formsBuilder.array([
        this.formsBuilder.group(this.formModel.getNewPackageGroup())
      ])
    });
  }

  removePackage(index: number): void {
    this.packages.removeAt(index);
  }

  addPackage(): void {
    this.packages.push(this.formsBuilder.group(this.formModel.getNewPackageGroup()));
  }

  get total() {
    const packages = this.form.value.packages;

    return packages.reduce((result, item) => {
      const converted = this.conversion.convertFrom(item.value.currency, item.value.value);

      return result + converted;
    }, 0);
  }

  get packages(): FormArray {
    return this.form.get('packages') as FormArray;
  }
}
