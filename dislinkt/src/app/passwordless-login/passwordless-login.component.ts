import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.scss']
})
export class PasswordlessLoginComponent implements OnInit {

  passwordlessSucceeded: boolean = true;

  constructor(private authService: AuthenticationService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.authService.passwordlessLogin(decodeURI(window.location.pathname.split("/")[3])).subscribe(
      (data: any) => {
        this.storageService.storeTokenData(data.jwt,data.refreshToken);
        switch (this.storageService.getRoleFromToken()) {
          case 'ROLE_USER':
            this.router.navigateByUrl('/home')
            break
          default:
            this.router.navigateByUrl('/')
        }
      }, (err: Error) => {
        this.passwordlessSucceeded = false;
      });
  }

}
