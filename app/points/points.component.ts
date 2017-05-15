import { Component, OnInit } from '@angular/core';
import { Point } from './point';
import { PointService } from './point.service';
import '../rxjs-operators';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'my-points',
  templateUrl: 'points.component.html',
  styleUrls: ['points.component.css'],
  providers: [PointService]
})

export class PointComponent implements OnInit {
  list: Point[];
  errorMessage: any;

  constructor(
    private pointService: PointService,
    private router: Router
  ) {
    this.pointService.list().subscribe(
      list => this.list = list,
      error =>  this.errorMessage = <any>error
    );
  }

  ngOnInit(): void {

  }

  gotoDetail(id: number): void {
    this.router.navigate(['/points/detail/', id]);
  }

  gotoCreate(): void {
    this.router.navigate(['/points/create']);
  }

  remove(id: number): void {
    this.pointService.remove(id)
      .then(() => this.router.navigate(['/points']));
  }

}
