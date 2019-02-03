import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './../core/core.module';
import { ButtonComponent } from './button/button.component';


const COMPONENT = [
  ButtonComponent
];

@NgModule({
  declarations: COMPONENT,
  exports: COMPONENT,
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class WMButtonComponentModule { }
