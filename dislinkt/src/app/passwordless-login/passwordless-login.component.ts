import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.scss']
})
export class PasswordlessLoginComponent implements OnInit {

  passwordlessSucceeded: boolean = true;

  constructor(private authService: AuthenticationService, private storageService: StorageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let token = decodeURI(this.route.snapshot.paramMap.get('token') || "")
    this.authService.passwordlessLogin(token).subscribe(
      (data: any) => {
        this.storageService.storeTokenData(data.jwt,data.refreshToken);
        if (this.storageService.getRoleFromToken() == 'ROLE_USER') {
            this.router.navigateByUrl('/home')
        } else{
            this.router.navigateByUrl('/')
        }
      }, (_err: Error) => {
        this.passwordlessSucceeded = false;
      });
  }

}
