import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePostDTO } from '../dto/CreatePostDTO';
import { Post } from '../model/Post';
import { Profile } from '../model/Profile';
import { PostService } from '../service/post.service';
import { ProfileService } from '../service/profile.service';
import * as moment from 'moment';
import { UpdateProfileDTO } from '../dto/UpdateProfileDTO';
import { AuthenticationService } from '../service/authentication.service';
import { ChangePasswordDTO } from '../dto/ChangePasswordDTO';
import { InterestService } from '../service/interest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InterestModalComponent } from '../interest-modal/interest-modal.component';
import { CreateInterestDTO } from '../dto/CreateInterestDTO';
import { ExperienceModalComponent } from '../experience-modal/experience-modal.component';
import { CreateExperienceDTO } from '../dto/CreateExperienceDTO';
import { ExperienceService } from '../service/experience.service';
import { Experience } from '../model/Experience';
import { StorageService } from '../service/storage.service';
import { ConnectionService } from '../service/connection.service';
import { CreateConnectionDTO } from '../dto/CreateConnectionDTO';
import { Interest } from '../model/Interest';
import { JobAdService } from '../service/job-ad.service';
import { CreateJobDTO } from '../dto/CreateJobAdDTO';
import { JobAd } from '../model/JobAd';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  userId!: string
  tab: number = 1
  posts!: Post[]
  editMode: boolean = false
  file!: File
  connectionStatus: string = ""
  jobAds!: JobAd[]

  postsAndJobAds:any = []


  requirements: string[] = []

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private interestService: InterestService,
    private modalService: NgbModal,
    private experienceService: ExperienceService,
    private storageService: StorageService,
    private connectionService: ConnectionService,
    private jobAdService: JobAdService,
    private router: Router,
    private authenticationService: AuthenticationService) { }
  postForm = new FormGroup({
    text: new FormControl('', Validators.required)
  })

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    biography: new FormControl('', Validators.required),
  })


  passwordForm = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    newPasswordRepeat: new FormControl('', Validators.required),
  })

  newJobAdForm = new FormGroup({
    title: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    requirement: new FormControl('')
  })

  apiTokenForm = new FormGroup({
    token: new FormControl(''),
  })


  profile!: Profile






  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || "";
    if (this.userId !== this.storageService.getIdFromToken()) {
      this.connectionService.getConnectionStatus(this.storageService.getIdFromToken(), this.userId).subscribe((data:any) => {
        this.connectionStatus = data.connectionStatus
      })
    }
    this.jobAdService.getJobAds(this.userId).subscribe((data:any) => {
      this.jobAds = data
      this.postsAndJobAds = this.postsAndJobAds.concat(this.jobAds).sort((a:any,b:any) => moment(b.creationDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime() - moment(a.creationDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime() )
    })
    this.postService.getPosts(this.userId).subscribe((data: any) => {
      this.posts = data
      this.posts = this.posts.map(post => (post.image === '') ? post : { ...post, image: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + post.image) })
      this.postsAndJobAds = this.postsAndJobAds.concat(this.posts).sort((a:any,b:any) => moment(b.creationDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime() - moment(a.creationDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime() )

    })
    this.profileService.getProfile(this.userId).subscribe((data: any) => {
      this.profile = data
      this.profileForm.get('firstName')?.setValue(this.profile.firstName)
      this.profileForm.get('lastName')?.setValue(this.profile.lastName)
      this.profileForm.get('email')?.setValue(this.profile.email)
      this.profileForm.get('phoneNumber')?.setValue(this.profile.phoneNumber)
      this.profileForm.get('gender')?.setValue(this.profile.gender)
      this.profileForm.get('dateOfBirth')?.setValue(moment(this.profile.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD'))
      this.profileForm.get('username')?.setValue(this.profile.username)
      this.profileForm.get('biography')?.setValue(this.profile.biography)
    })

  }

  fileChange(event: Event) {
    if (!event || !event.target)
      return
    let files = (event.target as HTMLInputElement).files;
    if (!files || files?.length === 0)
      return
    this.file = files[0]
  }

  isProfileOwner() {
    return this.userId === this.storageService.getIdFromToken()
  }

  updateProfile() {
    if (this.profileForm.invalid)
      return
    let profileDTO: UpdateProfileDTO = {
      uuid: this.userId,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      email: this.profileForm.get('email')?.value,
      phoneNumber: this.profileForm.get('phoneNumber')?.value,
      gender: this.profileForm.get('gender')?.value,
      dateOfBirth: moment(this.profileForm.get('dateOfBirth')?.value, 'YYYY-MM-DD').format('DD/MM/YYYY'),
      username: this.profileForm.get('username')?.value,
      biography: this.profileForm.get('biography')?.value
    }
    this.profileService.putProfile(profileDTO).subscribe((data: any) => {
      this.profile = data
      this.profileForm.get('firstName')?.setValue(this.profile.firstName)
      this.profileForm.get('lastName')?.setValue(this.profile.lastName)
      this.profileForm.get('email')?.setValue(this.profile.email)
      this.profileForm.get('phoneNumber')?.setValue(this.profile.phoneNumber)
      this.profileForm.get('gender')?.setValue(this.profile.gender)
      this.profileForm.get('dateOfBirth')?.setValue(moment(this.profile.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD'))
      this.profileForm.get('username')?.setValue(this.profile.username)
      this.profileForm.get('biography')?.setValue(this.profile.biography)
    })
  }

  createPost() {
    if (this.postForm.invalid)
      return
    let postDTO: CreatePostDTO = {
      ownerId: this.userId,
      text: this.postForm.get('text')?.value,
    }
    let formData: FormData = new FormData();
    formData.append("post", new Blob([JSON.stringify(postDTO)], {
      type: "application/json"
    }));
    formData.append("image", this.file ?? new File([""], "filename"));
    this.postService.createPost(formData).subscribe((data: any) => {
      window.location.reload()
    })
  }

  changePassword() {
    if (this.passwordForm.invalid || this.passwordForm.get('newPassword')?.value !== this.passwordForm.get('newPasswordRepeat')?.value)
      return
    let changePasswordDTO: ChangePasswordDTO = {
      userId: this.userId,
      oldPassword: this.passwordForm.get('currentPassword')?.value,
      newPassword: this.passwordForm.get('newPassword')?.value,
      repeatedNewPassword: this.passwordForm.get('newPasswordRepeat')?.value
    }
    this.authService.changePassword(changePasswordDTO).subscribe((data: any) => {
      alert('success')
      this.passwordForm.get('currentPassword')?.setValue('')
      this.passwordForm.get('newPassword')?.setValue('')
      this.passwordForm.get('newPasswordRepeat')?.setValue('')
    }, (err: Error) => {
      alert('failure')
      this.passwordForm.get('currentPassword')?.setValue('')
      this.passwordForm.get('newPassword')?.setValue('')
      this.passwordForm.get('newPasswordRepeat')?.setValue('')
    })
  }


  toggleEdit() {
    this.editMode = !this.editMode
  }

  deleteInterest(interest: Interest) {
    let id = interest.id
    this.interestService.deleteInterest(id, this.userId).subscribe((data: any) => {
      this.profile.interests = this.profile.interests.filter(interest => interest.id !== id)
    })
  }


  addInterestModal() {
    const modalRef = this.modalService.open(InterestModalComponent, { centered: true });
    modalRef.result.then((result: any) => {
      if (result) {
        let createInterestDTO: CreateInterestDTO = {
          userId: this.userId,
          description: result
        }
        this.interestService.addInterest(createInterestDTO).subscribe((data: any) => {
          if (!this.profile.interests.some(interest => interest.id === data.id))
            this.profile.interests = [... this.profile.interests, data]
        })
      }
    }, (reason: any) => {

    });
  }

  addExperienceModal() {
    const modalRef = this.modalService.open(ExperienceModalComponent, { centered: true });
    modalRef.result.then((result: CreateExperienceDTO) => {
      if (result) {
        let createExperienceDTO = result
        createExperienceDTO.fromDate =  moment(result.fromDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        createExperienceDTO.toDate = result.toDate ?  moment(result.toDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
        createExperienceDTO.userId = this.userId
        this.experienceService.addExperience(createExperienceDTO).subscribe((data: any) => {

          this.profile.experiences = [... this.profile.experiences, data]
        })
      }
    }, (reason: any) => {

    });
  }

  editExperienceModal(experience: Experience) {
    const modalRef = this.modalService.open(ExperienceModalComponent, { centered: true });
    modalRef.componentInstance.experience = experience;
    modalRef.result.then((result: CreateExperienceDTO) => {
      if (result) {
        let createExperienceDTO = result
        createExperienceDTO.fromDate =  moment(result.fromDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        createExperienceDTO.toDate = result.toDate ?  moment(result.toDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
        createExperienceDTO.userId = this.userId

        this.experienceService.updateExperience(experience.id, createExperienceDTO).subscribe((data: any) => {
          this.profile.experiences = this.profile.experiences.filter(exp => exp.id !== experience.id)
          this.profile.experiences = [... this.profile.experiences, data]
        })
      }
    }, (reason: any) => {

    });
  }

  deleteExperience(id: number) {
    this.experienceService.deleteInterest(id).subscribe((data:any) => {
      this.profile.experiences = this.profile.experiences.filter(exp => exp.id !== id)
    })
  }


  follow() {
    if (this.connectionStatus)
      return
    let createConnectionDTO : CreateConnectionDTO = {
      initiatorId: this.storageService.getIdFromToken(),
      receiverId: this.userId
    }
    this.connectionService.createConnection(createConnectionDTO).subscribe(data => {
      this.connectionStatus = "CONNECTED"
    })
  }

  addRequirement() {
    let requirement = this.newJobAdForm.get('requirement')?.value
    if (this.requirements.includes(requirement))
      return
    this.newJobAdForm.get('requirement')?.setValue('')
    this.requirements = [...this.requirements, requirement]
  }

  deleteRequirement(requirement: Interest) {
    this.requirements = this.requirements.filter(req => req !== requirement.description)
  }

  createJobAd() {
    if (this.newJobAdForm.invalid)
      return

    let createJobAdDTO : CreateJobDTO = {
      title: this.newJobAdForm.get('title')?.value,
      position: this.newJobAdForm.get('position')?.value,
      description: this.newJobAdForm.get('description')?.value,
      company: this.newJobAdForm.get('company')?.value,
      requirements: this.requirements
    }
    this.jobAdService.addJobAd(createJobAdDTO).subscribe(data => {
      this.reloadComponent()
    })
  }

  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }


  generateAPIToken() {
    this.authenticationService.generateAPIToken(this.userId).subscribe((data:any) => {
      this.apiTokenForm.get('token')?.setValue(data.token)
    })
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`./users/${this.userId}`]);
}

}
