import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionPendingResponseDTO } from '../dto/ConnectionPendingResponseDTO';
import { PendingProfile } from '../model/PendingProfile';
import { Profile } from '../model/Profile';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-pending-profile-card',
  templateUrl: './pending-profile-card.component.html',
  styleUrls: ['./pending-profile-card.component.scss']
})
export class PendingProfileCardComponent implements OnInit {

  @Input() profile!: PendingProfile
  @Input() userId!: string
  @Output() response: EventEmitter<ConnectionPendingResponseDTO> = new EventEmitter();
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

  accept() {
    this.response.emit({
      userId: this.userId,
      approve: true
    })
  }
  deny() {
    this.response.emit({
      userId: this.userId,
      approve: false
    })
  }
}
