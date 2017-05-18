import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';
import {PointModule} from './points/point.module';
import {HeaderModule} from "./header/header.module";
import {MapModule} from "./maps/map.module";
import {PointService} from "./services/point.service";
import {PolygonService} from "./services/polygon.service";
import {AuthenticationService} from "./services/authentication.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    PointModule,
    HeaderModule,
    MapModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    PointService,
    PolygonService,
    AuthenticationService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}


