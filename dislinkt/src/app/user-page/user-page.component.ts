import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CreatePostDTO } from '../dto/CreatePostDTO';
import { Post } from '../model/Post';
import { Profile } from '../model/Profile';
import { PostService } from '../service/post.service';
import { ProfileService } from '../service/profile.service';
import * as moment from 'moment';
import { UpdateProfileDTO } from '../dto/UpdateProfileDTO';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  userId!: string
  overview: boolean = true
  posts!: Post[]
  file!: File
    constructor(private route: ActivatedRoute,
       private postService: PostService,
        private sanitizer: DomSanitizer,
        private profileService: ProfileService) { }
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
    newPasswrodRepeat: new FormControl('', Validators.required),
  })


  profile!: Profile





  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || "";
    this.postService.getPosts(this.userId).subscribe((data:any) => {
      this.posts = data
      this.posts = this.posts.map(post => post = {...post, image: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + post.image)})
    })
    this.profileService.getProfile(this.userId).subscribe((data:any) => {
      this.profile = data
      this.profileForm.get('firstName')?.setValue(this.profile.firstName)
      this.profileForm.get('lastName')?.setValue(this.profile.lastName)
      this.profileForm.get('email')?.setValue(this.profile.email)
      this.profileForm.get('phoneNumber')?.setValue(this.profile.phoneNumber)
      this.profileForm.get('gender')?.setValue(this.profile.gender)
      this.profileForm.get('dateOfBirth')?.setValue(moment(this.profile.dateOfBirth, 'DD/MM/YYYY').format('YYYY-DD-MM'))
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


  updateProfile() {
    if (this.profileForm.invalid)
      return
    let profileDTO : UpdateProfileDTO = {
      uuid: this.userId,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      email: this.profileForm.get('email')?.value,
      phoneNumber: this.profileForm.get('phoneNumber')?.value,
      gender: this.profileForm.get('gender')?.value,
      dateOfBirth: moment(this.profileForm.get('dateOfBirth')?.value, 'YYYY-DD-MM').format('DD/MM/YYYY'),
      username: this.profileForm.get('username')?.value,
      biography: this.profileForm.get('biography')?.value
    }
    this.profileService.putProfile(profileDTO).subscribe((data:any) => {
      this.profile = data
      this.profileForm.get('firstName')?.setValue(this.profile.firstName)
      this.profileForm.get('lastName')?.setValue(this.profile.lastName)
      this.profileForm.get('email')?.setValue(this.profile.email)
      this.profileForm.get('phoneNumber')?.setValue(this.profile.phoneNumber)
      this.profileForm.get('gender')?.setValue(this.profile.gender)
      this.profileForm.get('dateOfBirth')?.setValue(moment(this.profile.dateOfBirth, 'DD/MM/YYYY').format('YYYY-DD-MM'))
      this.profileForm.get('username')?.setValue(this.profile.username)
      this.profileForm.get('biography')?.setValue(this.profile.biography)
    })
  }

  createPost() {
  if (this.postForm.invalid)
    return
  let postDTO : CreatePostDTO = {
    ownerId: this.userId,
    text: this.postForm.get('text')?.value,
  }
    let formData: FormData = new FormData();
    formData.append("post", new Blob([JSON.stringify(postDTO)], {
    type: "application/json"}));
    formData.append("image", this.file);
    this.postService.createPost(formData).subscribe((data:any) => {
      window.location.reload()
  })
  }


  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }

}
