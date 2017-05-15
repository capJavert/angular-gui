import { NgModule }       from '@angular/core';
import { PointDetailComponent } from './edit/point-detail-component';
import { PointComponent }     from './points.component';
import { PointService }         from './point.service';

import {PointCreateComponent} from './create/point-create.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule
  ],
  declarations: [
    PointDetailComponent,
    PointCreateComponent,
    PointComponent,
  ],
  providers: [
    PointService
  ],
})

export class PointModule {
}


