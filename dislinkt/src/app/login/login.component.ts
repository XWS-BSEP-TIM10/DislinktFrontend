import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginDTO } from '../dto/LoginDTO';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }

  loginUser(credentials: NgForm) {
    let loginDTO: LoginDTO = { username: credentials.value.username, password: credentials.value.password };
    this.authService.login(loginDTO).subscribe((data: any) => {
      this.storageService.storeTokenData(data.jwt);
      switch (this.storageService.getRoleFromToken()) {
        case 'ROLE_USER':
          this.router.navigateByUrl('/user-page')
          break
        default:
          this.router.navigateByUrl('/')
      }
    }, (err: Error) => {
      alert("Incorrect credentials!")
    })
  }
}
