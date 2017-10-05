import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { PackagesFormModel } from './packages-form-model';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  protected form: FormGroup;

  protected currencies = ['EUR', 'USD', 'GBP'];

  constructor(protected formsBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formsBuilder.group({
      packages: this.formsBuilder.array([
        this.formsBuilder.group(PackagesFormModel.getNewPackageGroup())
      ])
    });
  }

  addPackage(): void {
    this.packages.push(this.formsBuilder.group(PackagesFormModel.getNewPackageGroup()));
  }

  getNameAt(index: number): AbstractControl {
    return this.getPropertyAt('name', index);
  }

  getWeightAt(index: number): AbstractControl {
    return this.getPropertyAt('weight', index);
  }

  getValueAt(index: number): AbstractControl {
    return this.getPropertyAt('value', index);
  }

  getPropertyAt(property: string, index: number): AbstractControl {
    return this.packages.at(index).get(property);
  }

  get packages(): FormArray {
    return this.form.get('packages') as FormArray;
  }
}
