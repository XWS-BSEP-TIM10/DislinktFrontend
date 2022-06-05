import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Profile } from '../model/Profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {
  constructor(private profileService: ProfileService) { }

  profiles!: Profile[]

  searchForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  })

  ngOnInit(): void {
    this.profileService.getProfiles(this.searchForm.get('firstName')?.value, this.searchForm.get('firstName')?.value).subscribe((data:any) => {
      this.profiles = data
    })

  }


  search() {
    this.profileService.getProfiles(this.searchForm.get('firstName')?.value, this.searchForm.get('firstName')?.value).subscribe((data:any) => {
      this.profiles = data
    })

  }

}
