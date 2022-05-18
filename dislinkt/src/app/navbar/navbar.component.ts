import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  login(){
    this.router.navigate(['login']);
  }

  registration(){
    this.router.navigate(['registration']);
  }
  ngOnInit(): void {
  }

}
