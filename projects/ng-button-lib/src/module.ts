import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WMButtonComponentModule } from './component/component.module';
import { WMButtonDirectiveModule } from './directive/directive.module';

@NgModule({
  declarations: [],
  imports: [CommonModule,
    WMButtonDirectiveModule,
    WMButtonComponentModule],
  exports: [
    WMButtonDirectiveModule,
    WMButtonComponentModule
  ],
  providers: [],
})
export class WMButtonLib { }
