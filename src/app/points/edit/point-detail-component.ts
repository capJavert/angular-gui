import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import '../../rxjs-operators';
import { PointService } from '../point.service';
import {Point} from "../point";

@Component({
  moduleId: module.id,
  selector: 'my-point-detail',
  templateUrl: 'point-detail.component.html',
  styleUrls: ['point-detail.component.css']
})
export class PointDetailComponent implements OnInit {
  @Input()
  model: Point;

  constructor(
    private pointService: PointService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.pointService.get(+params['id']))
      .subscribe(point => this.model = point as Point);
  }

  save(): void {
    this.pointService.update(this.model)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
