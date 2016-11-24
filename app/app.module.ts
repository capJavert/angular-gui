import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { EventDetailComponent } from './event-detail-component';
import {HttpModule, JsonpModule} from "@angular/http";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    EventDetailComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
