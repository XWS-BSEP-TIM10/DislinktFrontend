import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from '../model/Experience';
import { JobAd } from '../model/JobAd';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-job-ad-card',
  templateUrl: './job-ad-card.component.html',
  styleUrls: ['./job-ad-card.component.scss']
})
export class JobAdCardComponent implements OnInit {

  @Input() jobAd: JobAd = {
    id: '1',
    title: 'Full Stack Intern Needed',
    position: 'Full Stack Intern',
    description: 'Integer tempus ligula et lobortis tincidunt. Ut sit amet velit velit. Ut elementum ex justo, sit amet finibus libero cursus vitae. Curabitur mollis, magna ac finibus hendrerit, magna nisl maximus tellus, eu ornare sem neque sit amet nisl. Cras in metus eget erat luctus aliquet nec mattis lacus. Nullam aliquet ipsum ac augue eleifend, quis faucibus magna iaculis. Curabitur nisi mi, bibendum non massa nec, luctus eleifend elit. Sed non fermentum felis, sit amet accumsan mi. Vestibulum mattis ullamcorper mauris, in efficitur ante interdum a.',
    company: 'JetBrains',
    requirements: ['Java', 'IntelliJ', 'Python', 'Python', 'Python'],
    creationDate: '09/09/2018',
    userId: 'd12602fd-b7af-4da1-b1ca-bad8166d1fb2',
    firstName: 'Aca',
    lastName: 'Aca'
  }
  @Input() userId!: string
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<JobAd>();
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
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

