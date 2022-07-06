import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  login(){
    this.router.navigate(['login']);
  }

  logout() {
    this.storageService.clearToken()
    this.router.navigate([''])
  }

  registration(){
    this.router.navigate(['registration']);
  }

  getRole() {
    return this.storageService.getRoleFromToken()
  }

  isLoggedIn() {
    return this.storageService.getRoleFromToken() !== ""
  }


  goToUsersPage() {
    let userId = this.storageService.getIdFromToken()
    this.router.navigate([`users/${userId}`])
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

}