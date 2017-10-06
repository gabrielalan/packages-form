import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonModule as AppCommonModule } from '../common/common.module';

import { CurrencyValueComponent } from './components/currency-value/currency-value.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { PackagesComponent } from './containers/packages/packages.component';

import { PackagesFormModelService } from './services/packages-form-model.service';
import { FormValidatorAdapterService } from './services/form-validator-adapter.service';

const components = [
  FormGroupComponent,
  ControlErrorComponent,
  CurrencyValueComponent,
  PackagesComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule
  ],
  providers: [
    FormValidatorAdapterService,
    PackagesFormModelService
  ],
  declarations: components,
  exports: components
})
export class FormModule { }
