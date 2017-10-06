import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ConversionRatesService } from './services/conversion-rates.service';

const components = [
  HeaderComponent
];

const providers = [
  ConversionRatesService
];

@NgModule({
  imports: [
    NgCommonModule
  ],
  providers: providers,
  declarations: components,
  exports: components
})
export class CommonModule { }
