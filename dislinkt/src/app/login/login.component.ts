import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginDTO } from '../dto/LoginDTO';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  forgottenPassword: boolean = false;
  passwordless: boolean = false;

  constructor(private authService: AuthenticationService, private storageService: StorageService, private router: Router) { }

  emailRecoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get f() { return this.emailRecoveryForm.controls; }

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
          this.router.navigateByUrl('/home')
          break
        default:
          this.router.navigateByUrl('/')
      }
    }, (err: Error) => {
      alert("Incorrect credentials!")
    })
  }

  forgotPassword() {
    this.forgottenPassword = true;
    this.passwordless = false;
  }

  passwordlessLogin() {
    this.passwordless = true;
    this.forgottenPassword = false;
  }

  sendRecoveryMail() {
    this.isSubmitted = true;
    if (this.emailRecoveryForm.invalid) {
      return
    }
    this.forgottenPassword = false;
    var email = encodeURI(this.emailRecoveryForm.get('email')?.value);
    this.authService.sendRecoveryEmail(email).subscribe(
      (data: any) => {
        alert("Recovery link sent to your mail")
      }, (err: Error) => {
        alert("An error occured, please try again...")
      });
  }

  sendPasswordlessEmail() {
    this.isSubmitted = true;
    if (this.emailRecoveryForm.invalid) {
      return
    }
    this.passwordless = false;
    var email = encodeURI(this.emailRecoveryForm.get('email')?.value);
    this.authService.sendPasswordlessLoginEmail(email).subscribe(
      (data: any) => {
        alert("Link for passwordless login sent to your mail")
      }, (err: Error) => {
        alert("An error occured, please try again...")
      });
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }
}
