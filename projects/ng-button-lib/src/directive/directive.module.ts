import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './../core/core.module';
import { ButtonDirective } from './button.directive';

@NgModule({
  declarations: [ButtonDirective],
  imports: [
    CommonModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  exports: [ButtonDirective]
})
export class WMButtonDirectiveModule { }
