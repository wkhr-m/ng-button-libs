import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WMButtonComponentModule } from './../../projects/ng-button-lib/src/component/component.module';
import { WMButtonDirectiveModule } from './../../projects/ng-button-lib/src/directive/directive.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WMButtonComponentModule,
    WMButtonDirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
