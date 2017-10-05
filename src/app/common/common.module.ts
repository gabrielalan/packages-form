import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

const components = [
  HeaderComponent
];

@NgModule({
  imports: [
    NgCommonModule
  ],
  declarations: components,
  exports: components
})
export class CommonModule { }
