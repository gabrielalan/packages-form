import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyValueComponent } from './components/currency-value/currency-value.component';
import { PackagesComponent } from './containers/packages/packages.component';

const components = [
  CurrencyValueComponent,
  PackagesComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: components,
  exports: components
})
export class FormModule { }
