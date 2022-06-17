import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JobAd } from '../model/JobAd';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-job-ad-card',
  templateUrl: './job-ad-card.component.html',
  styleUrls: ['./job-ad-card.component.scss']
})
export class JobAdCardComponent implements OnInit {

  @Input() jobAd!: JobAd
  @Input() userId!: string
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<JobAd>();
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty 
  }

  viewProfile(ownerId: string) {
    this.router.navigate([`users/${ownerId}`])
  }

  deleteExperience() {
    this.deleteEvent.emit(this.jobAd.id);
  }

  editExperience() {
    this.editEvent.emit(this.jobAd)
  }

  isProfileOwner() {
    return this.userId === this.storageService.getIdFromToken()
  }

  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }
}

