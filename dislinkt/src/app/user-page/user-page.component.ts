import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
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
import { isContainsLowercase } from '../validators/isContainsLowercase-validator'
import { isContainsNumber } from '../validators/isContainsNumber-validator'
import { isContainsSymbol } from '../validators/isContainsSymbol-validator'
import { isContainsUppercase } from '../validators/isContainsUppercase-validator'
import { isValidLengthPassword } from '../validators/isValidLengthPassword-validator'
import { isWhitespace } from '../validators/isWhitespace-validator'
import * as zxcvbn from 'zxcvbn'
import { Change2FAStatusDTO } from '../dto/Change2FAStatusDTO';
import { phoneNumberValidator } from '../validators/phoneNumber-validator'
import { CreateBlockDTO } from '../dto/CreateBlockDTO';
import { PendingProfile } from '../model/PendingProfile';
import { ConnectionPendingResponseDTO } from '../dto/ConnectionPendingResponseDTO';
import { ConnectionRequestDTO } from '../dto/ConnectionRequestDTO';


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

  postsAndJobAds: any = []


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
  postForm = new UntypedFormGroup({
    text: new UntypedFormControl('', Validators.required)
  })

  profileForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phoneNumber: new UntypedFormControl('', [Validators.required, phoneNumberValidator]),
    gender: new UntypedFormControl('', Validators.required),
    dateOfBirth: new UntypedFormControl('', Validators.required),
    username: new UntypedFormControl('', Validators.required),
    biography: new UntypedFormControl('', Validators.required),
    profilePublic: new UntypedFormControl(true, Validators.required),
  })

  get fe() { return this.profileForm.controls; }


  passwordForm = new UntypedFormGroup({
    currentPassword: new UntypedFormControl('', Validators.required),
    newPassword: new UntypedFormControl('', [Validators.required, isContainsLowercase,
      isContainsNumber, isContainsSymbol, isContainsUppercase,
      isValidLengthPassword, isWhitespace]),
    newPasswordRepeat: new UntypedFormControl('', Validators.required),
  })

  get f() { return this.passwordForm.controls; }

  newJobAdForm = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    position: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
    company: new UntypedFormControl('', Validators.required),
    requirement: new UntypedFormControl('')
  })

  get fad() { return this.newJobAdForm.controls; }

  apiTokenForm = new UntypedFormGroup({
    token: new UntypedFormControl(''),
  })

  twoFAForm = new UntypedFormGroup({
    twoFAEnabled: new UntypedFormControl(false),
    secret: new UntypedFormControl(''),
  })


  pendingProfiles!: PendingProfile[]
  profile!: Profile
  oldPasswordError = "";
  passwordError = "";
  confirmPasswordError = "";
  passwordStrength = "";
  strengthClass = "";
  isSubmitted = false;
  profiles!: Profile[]

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || "";
    if (this.userId !== this.storageService.getIdFromToken()) {
      this.connectionService.getConnectionStatus(this.storageService.getIdFromToken(), this.userId).subscribe((data: any) => {
        this.connectionStatus = data.connectionStatus
      })
    }
    if (this.isProfileOwner()) {
      this.connectionService.getPendingConnections(this.userId).subscribe((data:any) => {
        this.pendingProfiles = data
      })
    }
    this.jobAdService.getJobAds(this.userId).subscribe((data: any) => {
      this.jobAds = data
      this.postsAndJobAds = this.postsAndJobAds.concat(this.jobAds).sort((a: any, b: any) => moment(b.creationDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime() - moment(a.creationDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime())
    })
    this.postService.getPosts(this.userId).subscribe((data: any) => {
      this.posts = data
      this.posts = this.posts.map(post => (post.image === '') ? post : { ...post, image: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + post.image) })
      this.postsAndJobAds = this.postsAndJobAds.concat(this.posts).sort((a: any, b: any) => moment(b.creationDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime() - moment(a.creationDate, 'DD/MM/YYYY HH:mm:ss').toDate().getTime())
    })

    this.authService.get2FAStatus(this.userId).subscribe((data: any) => {
      this.twoFAForm.get('twoFAEnabled')?.setValue(data.enabled2FA)
    })
    this.profileService.getProfile(this.userId).subscribe((data: any) => {
      this.setUserData(data);
    })
    this.getRecommendations();

  }

  setUserData(data: any) {
    this.profile = data;
    this.profileForm.get('firstName')?.setValue(this.profile.firstName);
    this.profileForm.get('lastName')?.setValue(this.profile.lastName);
    this.profileForm.get('email')?.setValue(this.profile.email);
    this.profileForm.get('phoneNumber')?.setValue(this.profile.phoneNumber);
    this.profileForm.get('gender')?.setValue(this.profile.gender);
    this.profileForm.get('dateOfBirth')?.setValue(moment(this.profile.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD'));
    this.profileForm.get('username')?.setValue(this.profile.username);
    this.profileForm.get('biography')?.setValue(this.profile.biography);
    this.profileForm.get('profilePublic')?.setValue(this.profile.profilePublic);
  }

  fileChange(event: Event) {
    if (!event || !event.target)
      return
    let files = (event.target as HTMLInputElement).files;
    if (!files || files?.length === 0)
      return
    this.file = files[0]
  }

  getRecommendations(){
    this.connectionService.getRecommendations(this.storageService.getIdFromToken()).subscribe((data:any) => {
      this.profiles = data
    })
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
      biography: this.profileForm.get('biography')?.value,
      profilePublic: this.profileForm.get('profilePublic')?.value
    }
    this.profileService.putProfile(profileDTO).subscribe((data: any) => {
      this.profile.biography = data.biography
      this.profile.dateOfBirth = data.dateOfBirth
      this.profile.email = data.email
      this.profile.firstName = data.firstName
      this.profile.gender = data.gender
      this.profile.lastName = data.lastName
      this.profile.phoneNumber = data.phoneNumber
      this.profile.profilePublic = data.profilePublic
      this.profile.username = data.username
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
    this.postService.createPost(formData).subscribe((_data: any) => {
      window.location.reload()
    })
  }

  checkPass() {
    this.isSubmitted = false;
    let password = this.passwordForm.get('newPassword');
    if (!password?.valid) {
      this.passwordStrength = "";
      return
    }

    const result = zxcvbn(password?.value);
    let strength = "";
    switch (result.score) {
      case 0: { this.strengthClass = "alert alert-danger"; strength = "Worst"; break; }
      case 1: { this.strengthClass = "alert alert-danger"; strength = "Bad"; break; }
      case 2: { this.strengthClass = "alert alert-warning"; strength = "Weak"; break; }
      case 3: { this.strengthClass = "alert alert-info"; strength = "Good"; break; }
      default: { this.strengthClass = "alert alert-success"; strength = "Strong"; break; }

    }
    this.passwordStrength = "Strength: " + strength + " " + result.feedback.warning + ". " + result.feedback.suggestions;
  }

  changePassword() {
    let password = this.passwordForm.get('newPassword')?.value
    let repeatedPassword = this.passwordForm.get('newPasswordRepeat')?.value
    if (password != repeatedPassword) {
      this.confirmPasswordError = "The password conformation does not match";
      return
    } else {
      this.confirmPasswordError = ""
    }
    if (this.passwordForm.invalid)
      return

    let changePasswordDTO: ChangePasswordDTO = {
      userId: this.userId,
      oldPassword: this.passwordForm.get('currentPassword')?.value,
      newPassword: this.passwordForm.get('newPassword')?.value,
      repeatedNewPassword: this.passwordForm.get('newPasswordRepeat')?.value
    }
    this.authService.changePassword(changePasswordDTO).subscribe((_data: any) => {
      alert('success')
      this.passwordForm.get('currentPassword')?.setValue('')
      this.passwordForm.get('newPassword')?.setValue('')
      this.passwordForm.get('newPasswordRepeat')?.setValue('')
      this.oldPasswordError = "";
      this.passwordError = "";
      this.confirmPasswordError = "";
      this.passwordStrength = "";
      this.strengthClass = "";
      this.isSubmitted = true;
    }, (_err: Error) => {
      this.oldPasswordError = "Wrong password!"
    })
  }


  toggleEdit() {
    this.editMode = !this.editMode
  }

  deleteInterest(interest: Interest) {
    let id = interest.id
    this.interestService.deleteInterest(id, this.userId).subscribe((_data: any) => {
      this.profile.interests = this.profile.interests.filter(int => int.id !== id)
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
    }, (_reason: any) => {
      // TODO document why this arrow function is empty


    });
  }


  getConnectionStatusText() {
    if (this.connectionStatus == '') {
      return 'Follow'
    } else if (this.connectionStatus == 'CONNECTED') {
      return 'Following'
    }
    else if (this.connectionStatus == 'BLOCKED') {
      return 'Blocked'
    }
    else if (this.connectionStatus == 'PENDING') {
      return 'Pending'
    }
    return ''
  }

  respondToPending(connectionPendingResponseDTO : ConnectionPendingResponseDTO) {
    let response : ConnectionRequestDTO = {
      initiatorId: connectionPendingResponseDTO.userId,
      receiverId: this.storageService.getIdFromToken()

    }
    this.connectionService.respondToConnectionRequest(response, connectionPendingResponseDTO.approve).subscribe((data:any) => {
      this.pendingProfiles = this.pendingProfiles.filter(el => el.userId !== connectionPendingResponseDTO.userId)
    })
  }


  addExperienceModal() {
    const modalRef = this.modalService.open(ExperienceModalComponent, { centered: true });
    modalRef.result.then((result: CreateExperienceDTO) => {
      if (result) {
        let createExperienceDTO = result
        createExperienceDTO.fromDate = moment(result.fromDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        createExperienceDTO.toDate = result.toDate ? moment(result.toDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
        createExperienceDTO.userId = this.userId
        this.experienceService.addExperience(createExperienceDTO).subscribe((data: any) => {

          this.profile.experiences = [... this.profile.experiences, data]
        })
      }
    }, (_reason: any) => {
      // TODO document why this arrow function is empty
    });
  }

  editExperienceModal(experience: Experience) {
    const modalRef = this.modalService.open(ExperienceModalComponent, { centered: true });
    modalRef.componentInstance.experience = experience;
    modalRef.result.then((result: CreateExperienceDTO) => {
      if (result) {
        let createExperienceDTO = result
        createExperienceDTO.fromDate = moment(result.fromDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        createExperienceDTO.toDate = result.toDate ? moment(result.toDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
        createExperienceDTO.userId = this.userId

        this.experienceService.updateExperience(experience.id, createExperienceDTO).subscribe((data: any) => {
          this.profile.experiences = this.profile.experiences.filter(exp => exp.id !== experience.id)
          this.profile.experiences = [... this.profile.experiences, data]
        })
      }
    }, (_reason: any) => {
      // TODO document why this arrow function is empty
    });
  }

  deleteExperience(id: number) {
    this.experienceService.deleteInterest(id).subscribe((_data: any) => {
      this.profile.experiences = this.profile.experiences.filter(exp => exp.id !== id)
    })
  }

  change2FAStatus() {
    if (this.twoFAForm.invalid)
      return
    let change2FAStatusDTO: Change2FAStatusDTO = {
      enable2FA: this.twoFAForm.get('twoFAEnabled')?.value,
      userId: this.userId
    }
    this.authService.change2FAStatus(change2FAStatusDTO).subscribe((data: any) => {
      this.twoFAForm.get('twoFAEnabled')?.setValue(change2FAStatusDTO.enable2FA)
      if (data.secret) {
        this.twoFAForm.get('secret')?.setValue(data.secret)
      } else {
        this.twoFAForm.get('secret')?.setValue('')
      }

    })

  }

  block() {
    let createBlockDTO: CreateBlockDTO = {
      initiatorId: this.storageService.getIdFromToken(),
      receiverId: this.userId
    }
    this.connectionService.createBlock(createBlockDTO).subscribe(_data => {
      this.connectionStatus = "BLOCKED"
    })
  }


  follow() {
    if (this.connectionStatus)
      return
    let createConnectionDTO: CreateConnectionDTO = {
      initiatorId: this.storageService.getIdFromToken(),
      receiverId: this.userId
    }
    this.connectionService.createConnection(createConnectionDTO).subscribe((data:any) => {
      this.connectionStatus = data.connectionStatus
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

    let createJobAdDTO: CreateJobDTO = {
      title: this.newJobAdForm.get('title')?.value,
      position: this.newJobAdForm.get('position')?.value,
      description: this.newJobAdForm.get('description')?.value,
      company: this.newJobAdForm.get('company')?.value,
      requirements: this.requirements
    }
    this.jobAdService.addJobAd(createJobAdDTO).subscribe(_data => {
      this.reloadComponent()
    })
  }

  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }


  generateAPIToken() {
    this.authenticationService.generateAPIToken(this.userId).subscribe((data: any) => {
      this.apiTokenForm.get('token')?.setValue(data.token)
    })
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`./users/${this.userId}`]);
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

}
