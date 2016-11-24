import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import './rxjs-operators';
import { EventService } from './event.service';

@Component({
  moduleId: module.id,
  selector: 'my-event-detail',
  templateUrl: 'hero-detail.component.html',
})
export class EventDetailComponent implements OnInit {
  @Input()
  event: any;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.eventService.getEvent(+params['id']))
      .subscribe(event => this.event = event);
  }

  goBack(): void {
    this.location.back();
  }
}
