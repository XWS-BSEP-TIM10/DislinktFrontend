import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import {NotificationService} from '../service/notification.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  notifications: any = []
  UnreadNotifications: number = 0
  showNotificationsDiv: boolean = false
  constructor(private router: Router, private storageService: StorageService, private notificationService:NotificationService) { }

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

  isLoggedInAdmin() {
    return this.storageService.getRoleFromToken() === "ROLE_ADMIN"
  }


  goToUsersPage() {
    let userId = this.storageService.getIdFromToken()
    this.router.navigate([`users/${userId}`])
  }

  ngOnInit(): void {
    this.notificationService.currentNotificationNumber.subscribe(value =>{
      this.UnreadNotifications = value
    })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getNotifications()
  }

  showNotifications(): void{
    this.showNotificationsDiv = !this.showNotificationsDiv
    if(this.showNotificationsDiv){
      this.getNotifications()
    }
    if(!this.showNotificationsDiv){
      this.notificationService.changeNotificationsStatus(this.storageService.getIdFromToken()).subscribe((data:any) => {
        console.log(data)
       this.getNotifications()
      })
    }
  }

  getNotifications(): void{
    this.notificationService.getNotifications(this.storageService.getIdFromToken()).subscribe((data:any) => {
      this.notifications = data
      this.UnreadNotifications=0
      this.notifications=this.notifications.reverse()
      for (let i = 0; i < this.notifications.length; i++) {
        if(!this.notifications[i].read) this.UnreadNotifications++;
      } 
      this.notificationService.changeValue(this.UnreadNotifications)
      console.log(this.notifications)
    })
  }
  

}