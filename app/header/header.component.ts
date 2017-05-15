import { Component, OnInit } from '@angular/core';
import '../rxjs-operators';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'my-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})

export class HeaderComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  gotoDetail(id: number): void {
    this.router.navigate(['/points/detail/', id]);
  }

}
