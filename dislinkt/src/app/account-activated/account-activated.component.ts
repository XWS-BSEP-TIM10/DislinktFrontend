import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-account-activated',
  templateUrl: './account-activated.component.html',
  styleUrls: ['./account-activated.component.scss']
})
export class AccountActivatedComponent implements OnInit {

  acctivationSucced: any = null;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.activateAccount(decodeURI(window.location.pathname.split("/")[2])).subscribe(
      (data: any) => {
        this.acctivationSucced = true;
      }, (err: Error) => {
        this.acctivationSucced = false;
      });
  }

}
