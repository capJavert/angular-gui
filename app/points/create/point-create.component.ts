import { Component, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';
import '../../rxjs-operators';
import { PointService } from '../point.service';
import {Point} from "../point";

@Component({
  moduleId: module.id,
  selector: 'my-point-create',
  templateUrl: 'point-create.component.html',
  styleUrls: ['point-create.component.css']
})
export class PointCreateComponent implements OnInit {
  private model: Point;

  constructor(
    private pointService: PointService,
    private location: Location
  ) {
    this.model = new Point();
  }

  ngOnInit(): void {

  }

  save(): void {
    this.pointService.create(this.model)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
