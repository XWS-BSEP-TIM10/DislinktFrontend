import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { JobAd } from '../model/JobAd';
import { JobAdService } from '../service/job-ad.service';

@Component({
  selector: 'app-job-ad-page',
  templateUrl: './job-ad-page.component.html',
  styleUrls: ['./job-ad-page.component.scss']
})
export class JobAdPageComponent implements OnInit {

  constructor(private jobAdService: JobAdService) { }

  jobAds!: JobAd[]

  searchForm = new UntypedFormGroup({
    value: new UntypedFormControl('')
  })

  ngOnInit(): void {
    this.search()
  }

  search() {
    this.jobAdService.getAllJobAds(this.searchForm.get('value')?.value).subscribe((data:any) => {
      this.jobAds = data
    })
  }
}
