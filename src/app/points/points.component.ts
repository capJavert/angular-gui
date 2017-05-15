import { Component, OnInit } from '@angular/core';
import { Point } from './point';
import { PointService } from './point.service';
import '../rxjs-operators';

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
  ) {
    this.getList();
  }

  ngOnInit(): void {

  }

  private getList(): void {
    this.pointService.list().subscribe(
      list => this.list = list,
      error =>  this.errorMessage = <any>error
    );
  }

  remove(id: number): void {
    if(confirm("Are you sure you wish to delete this Point?")) {
      this.pointService.remove(id)
        .then(() => {
          this.getList();
        });
    }
  }

}
