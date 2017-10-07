import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from './common/common.module';
import { FormModule } from './form/form.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule.forRoot(),
    FormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
