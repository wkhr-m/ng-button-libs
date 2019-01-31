import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './../core/core.module';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule
    CoreModule
  ]
})
export class WMButtonComponentModule { }
