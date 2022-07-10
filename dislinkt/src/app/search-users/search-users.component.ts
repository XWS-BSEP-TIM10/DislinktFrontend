import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Profile } from '../model/Profile';
import { ProfileService } from '../service/profile.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {
  constructor(private profileService: ProfileService, private storageService: StorageService) { }

  profiles!: Profile[]

  searchForm = new UntypedFormGroup({
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl('')
  })

  ngOnInit(): void {
    this.search()
  }

  search() {
    this.profileService.getProfiles(this.searchForm.get('firstName')?.value, this.searchForm.get('firstName')?.value).subscribe((data:any) => {
      if(!this.storageService.getToken()){
        var prof = []
        for(let i = 0; i < data.length; i++){
          if(data[i].profilePublic){
            prof.push(data[i])
          }
        }
        this.profiles = prof
      }else{
        this.profiles = data
      }
    })

  }

}
