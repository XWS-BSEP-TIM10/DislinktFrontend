import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../model/Profile';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() profile!: Profile
  @Input() userId!: string
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  viewProfile(ownerId: string) {
    this.router.navigate([`users/${ownerId}`])
  }

  isProfileOwner() {
    return this.userId === this.storageService.getIdFromToken()
  }

  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }

}
