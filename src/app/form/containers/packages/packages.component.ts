import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CurrencyValueType } from '../../components/currency-value/currency-value-type';
import { PackagesFormModelService } from '../../services/packages-form-model.service';
import { ConversionRatesService } from '../../../common/services/conversion-rates.service';
import { ShipmentService } from '../../services/shipment.service';
import { DialogStreamService } from '../../../common/services/dialog-stream.service';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  protected loading = true;

  protected form: FormGroup;

  protected currencies = ['EUR', 'USD', 'GBP'];

  constructor(
    protected formModel: PackagesFormModelService,
    protected conversion: ConversionRatesService,
    protected shipment: ShipmentService,
    protected dialogStream: DialogStreamService
  ) { }

  ngOnInit() {
    this.form = this.formModel.createModel();
    this.conversion.fetch().subscribe(() => this.loading = false);
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

  reset() {
    this.loading = false;
    this.form = this.formModel.createModel();
  }

  send() {
    const data = Object.assign({}, this.form.value, {
      packages: this.form.value.packages.map(item => {
        return Object.assign({}, item, {
          weight: Number(item.weight),
          value: this.conversion.convertFrom(item.value.currency, item.value.value)
        });
      })
    });

    this.loading = true;

    this.shipment.send(data).subscribe(
      () => {
        this.reset();
        this.dialogStream.send({
          title: 'Thank you',
          body: 'Your shipment is successfully sent. Just sit and relax!'
        });
      },
      (error) => {
        this.dialogStream.send({
          title: 'Oops!',
          body: `We had a problem sending the data: ${error.message}`
        });
        this.loading = false;
      }
    );
  }

  get kilos() {
    const sum = this.reduceArrayWith(control => {
      const value = Number(control.weight);
      // NaN is the only value that is not equal itself in JS
      return value !== value ? 0 : value;
    }) as number;

    return sum.toFixed(3);
  }

  get total() {
    const sum = this.reduceArrayWith(control => {
      const value = Number(control.value.value);
      // NaN is the only value that is not equal itself in JS
      return value !== value ? 0 : this.conversion.convertFrom(control.value.currency, value);
    }) as number;

    return sum.toFixed(2);
  }

  get packages(): FormArray {
    return this.form.get('packages') as FormArray;
  }
} /* istanbul ignore next */
