import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './../core/core.module';
import { ButtonDirective } from './button.directive';

@NgModule({
  declarations: [ButtonDirective],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [ButtonDirective]
})
export class WMButtonDirectiveModule { }
