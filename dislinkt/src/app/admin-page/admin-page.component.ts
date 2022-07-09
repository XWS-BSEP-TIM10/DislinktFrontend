import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { ProfileService } from '../service/profile.service';
import { ConnectionService } from '../service/connection.service';
import { PostService } from '../service/post.service';
import { JobAdService } from '../service/job-ad.service';
import { MessagingService } from '../service/messaging.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  jobEvents: any = []
  authEvents: any = []
  postEvents: any = []
  profileEvents: any = []
  messagingEvents: any = []
  connectionsEvents: any = []

  constructor(private authService: AuthenticationService,
              private profileService: ProfileService,
              private connectionsService: ConnectionService,
              private postService: PostService,
              private jobAdService: JobAdService,
              private messagingService: MessagingService) { /* TODO document why this constructor is empty */ }

  ngOnInit(): void {
    this.authService.getEvents().subscribe((data: any) => {
      this.authEvents = data
    })
    this.profileService.getEvents().subscribe((data: any) => {
      this.profileEvents = data
    })
    this.connectionsService.getEvents().subscribe((data: any) => {
      this.connectionsEvents = data
    })
    this.postService.getEvents().subscribe((data: any) => {
      this.postEvents = data
    })
    this.jobAdService.getEvents().subscribe((data: any) => {
      this.jobEvents = data
    })
    this.messagingService.getEvents().subscribe((data: any) => {
      this.messagingEvents = data
    })
  }

}
