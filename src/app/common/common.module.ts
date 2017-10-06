import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConversionRatesService } from './services/conversion-rates.service';

// To mock conversion-rates
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApiMock }  from './api-mock.service';

const components = [
  HeaderComponent,
  LoadingComponent
];

const providers = [
  ConversionRatesService
];

@NgModule({
  imports: [
    NgCommonModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(ApiMock, { delay: 800 })
  ],
  providers: providers,
  declarations: components,
  exports: components
})
export class CommonModule { }
