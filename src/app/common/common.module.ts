import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { ConversionRatesService } from './services/conversion-rates.service';
import { DialogStreamService } from './services/dialog-stream.service';

// To mock requests
import { mockBackendProvider } from './mock/mock-backend';
import { MockBackend } from '@angular/http/testing';

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
    HttpModule
  ],
  providers: [
    MockBackend,
    mockBackendProvider
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
