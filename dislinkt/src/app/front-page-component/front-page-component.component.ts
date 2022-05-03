import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-front-page-component',
  templateUrl: './front-page-component.component.html',
  styleUrls: ['./front-page-component.component.scss']
})
export class FrontPageComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['login']);
  }

  registration(){
    this.router.navigate(['registration']);
  }

}
