import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { ConversionRatesService } from './services/conversion-rates.service';
import { DialogStreamService } from './services/dialog-stream.service';

// To mock conversion-rates
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApiMock }  from './api-mock.service';

const components = [
  HeaderComponent,
  LoadingComponent,
  DialogComponent
];

const providers = [
  ConversionRatesService,
  DialogStreamService
];

@NgModule({
  imports: [
    NgCommonModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(ApiMock, { delay: 800 })
  ],
  declarations: components,
  exports: components
})
export class CommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonModule,
      providers: providers
    };
  }
}
