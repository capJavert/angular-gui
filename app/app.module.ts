import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { EventDetailComponent } from './event-detail-component';
import { EventsComponent }     from './events.component';
import { EventService }         from './event.service';
import {HttpModule, JsonpModule} from "@angular/http";
import { RouterModule }   from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'detail/:id',
        component: EventDetailComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },

    ])
  ],
  declarations: [
    AppComponent,
    EventDetailComponent,
    EventsComponent,
    DashboardComponent
  ],
  providers: [
    EventService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}


