import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PointCreateComponent} from "./points/create/point-create.component";
import {PointDetailComponent} from "./points/edit/point-detail-component";
import {PointComponent} from "./points/points.component";
import {MapComponent} from "./maps/map.component";

const routes: Routes = [
  { path: '', redirectTo: '/points', pathMatch: 'full' },
  { path: 'points/detail/:id', component: PointDetailComponent },
  { path: 'points/create', component: PointCreateComponent },
  { path: 'points',     component: PointComponent },
  { path: 'map',     component: MapComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
