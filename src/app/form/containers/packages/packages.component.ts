import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyValueType } from '../../components/currency-value/currency-value-type';

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
      value: new CurrencyValueType('EUR', 0)
    });
  }

}
