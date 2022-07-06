import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from '../dto/LoginDTO';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  forgottenPassword: boolean = false;
  passwordless: boolean = false;
  signInError = "";
  is2FAEnabled = false;
  codeError = ""

  constructor(private authService: AuthenticationService, private storageService: StorageService, private router: Router) { }

  emailRecoveryForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email])
  })

  get f() { return this.emailRecoveryForm.controls; }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  login() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }

  loginUser(credentials: NgForm) {
    this.signInError = ""
    let loginDTO: LoginDTO = { username: credentials.value.username, password: credentials.value.password, code: credentials.value.code };
    this.authService.login(loginDTO).subscribe((data: any) => {
      this.storageService.storeTokenData(data.jwt, data.refreshToken);
      if (this.storageService.getRoleFromToken() == 'ROLE_USER') {
          this.router.navigateByUrl('/home') .then(() => {
            window.location.reload();
          });
      } else {
          this.router.navigateByUrl('/')
      }
    }, (err) => {
      if(err.status == 300) {
        if(this.is2FAEnabled) {
          this.codeError = "Oops! Wrong code! Please try again..."
        } else {
          this.is2FAEnabled = true;
        }
      } else {
        this.signInError = "Oops! The username and password combination is incorrect. Please try again..."
      }
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
      (_data: any) => {
        alert("Recovery link sent to your mail")
      }, (_err: Error) => {
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
      (_data: any) => {
        alert("Link for passwordless login sent to your mail")
      }, (_err: Error) => {
        alert("An error occured, please try again...")
      });
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }
}
