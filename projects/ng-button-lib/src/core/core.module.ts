import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RippleDirective } from './ripple.directive';

const COMPONENTS = [
  RippleDirective
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule
  ],
  exports: COMPONENTS
})
export class CoreModule { }
