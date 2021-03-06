import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-page-component',
  templateUrl: './front-page-component.component.html',
  styleUrls: ['./front-page-component.component.scss']
})
export class FrontPageComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  findPerson(){
    this.router.navigate(['search-users']);
  }

}
