import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { RegistrationDTO } from '../dto/RegistrationDTO';
import { isContainsLowercase } from '../validators/isContainsLowercase-validator'
import { isContainsNumber } from '../validators/isContainsNumber-validator'
import { isContainsSymbol } from '../validators/isContainsSymbol-validator'
import { isContainsUppercase } from '../validators/isContainsUppercase-validator'
import { isValidLengthPassword } from '../validators/isValidLengthPassword-validator'
import { isWhitespace } from '../validators/isWhitespace-validator'
import { phoneNumberValidator } from '../validators/phoneNumber-validator'
import * as zxcvbn from 'zxcvbn'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  isSubmitted = false;
  responseError = "";
  passwordError = "";
  confirmPasswordError = "";
  sendRequest = false;
  gender = "";
  passwordStrength = "";
  strengthClass = "";
  emailError="";

  registerForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phoneNumber: new UntypedFormControl('', [Validators.required, phoneNumberValidator]),
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', [Validators.required, isContainsLowercase,
      isContainsNumber, isContainsSymbol, isContainsUppercase,
      isValidLengthPassword, isWhitespace]),
    confirmPassword: new UntypedFormControl('', [Validators.required])
  })

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get f() { return this.registerForm.controls; }

  login() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }

  checkPass() {
    let password = this.registerForm.get('password');
    if (!password?.valid) {
      this.passwordStrength = "";
      return
    }

    const result = zxcvbn(password?.value);
    let strength = "";
    switch (result.score) {
      case 0: { this.strengthClass = "alert alert-danger"; strength = "Worst"; break;}
      case 1: { this.strengthClass = "alert alert-danger"; strength = "Bad"; break;}
      case 2: {this.strengthClass = "alert alert-warning"; strength = "Weak"; break;}
      case 3: {this.strengthClass = "alert alert-info"; strength = "Good"; break;}
      default: {this.strengthClass = "alert alert-success"; strength = "Strong"; break;}
        
    }
    this.passwordStrength = "Strength: " + strength + " " + result.feedback.warning + ". " + result.feedback.suggestions;
  }


  registerUser() {
    this.isSubmitted = true;
    this.passwordError = "";
    this.confirmPasswordError = "";
    this.responseError = "";
    this.emailError = "";
    if (this.registerForm.invalid) {
      return
    }

    var password = this.registerForm.get('password')?.value;
    var confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      this.confirmPasswordError = "The password conformation does not match";
      return
    }

    const result = zxcvbn(password);

    if (result.score != 3 && result.score != 4) {
      return
    }

    var male = (document.getElementById("maleRadio") as HTMLInputElement)
    if (male.checked)
      this.gender = "male"
    else
      this.gender = "female"

    this.sendRequest = true;

    let registrationDTO: RegistrationDTO = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      gender: this.gender,
      dateOfBirth: "09/09/1999",
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value,
      biography: ""
    }
    this.authService.signup(registrationDTO).subscribe((_res) => {
      this.router.navigateByUrl('/')
    },
      (error) => {
        this.sendRequest = false;
        if (error.status == 409) {
          if(error.error.toString().includes("Username"))
            this.responseError = error.error.toString()
          else
            this.emailError = error.error.toString()
        } else if (error.status == 400) {
          this.passwordError = error.error.password;
        }
      })
  }

  togglePass(id: string, toggleId: string) {
    var x = (document.getElementById(id) as HTMLInputElement);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    const elem = document.querySelector('#' + toggleId) as HTMLElement;
    elem.classList.toggle('bi-eye');
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }



}
