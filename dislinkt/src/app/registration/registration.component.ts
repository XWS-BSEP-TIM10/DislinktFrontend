import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { RegistrationDTO } from '../dto/RegistrationDTO';
import { isContainsLowercase } from '../validators/isContainsLowercase-validator'
import { isContainsNumber } from '../validators/isContainsNumber-validator'
import { isContainsSymbol } from '../validators/isContainsSymbol-validator'
import { isContainsUppercase } from '../validators/isContainsUppercase-validator'
import { isValidLengthPassword } from '../validators/isValidLengthPassword-validator'
import { isWhitespace } from '../validators/isWhitespace-validator'
import { phoneNumberValidator } from '../validators/phoneNumber-validator';

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
  sendRequest = false;
  gender = "";
  
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, phoneNumberValidator]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, isContainsLowercase,
      isContainsNumber, isContainsSymbol, isContainsUppercase,
      isValidLengthPassword, isWhitespace])
  })

  ngOnInit(): void {
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get f() { return this.registerForm.controls; }

  login() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }


  registerUser() {
    this.isSubmitted = true;
    this.passwordError = "";
    this.responseError = "";
    if (this.registerForm.invalid) {
      return
    }
    
    

    /*if(1 ==1){
      this.passwordError = "Password should not contain username!"
      return
    }*/
    
    var male = (document.getElementById("maleRadio") as HTMLInputElement)
    if(male.checked)
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
      biography: ""
    }
    this.authService.signup(registrationDTO).subscribe((response) => {
      this.router.navigateByUrl('/')
   },
   (error) => {
      this.sendRequest = false;
      if(error.status == 409){
        this.responseError = "Username already exists!"
      }
   })
  }

  handleClick() {
    var x = (document.getElementById("password") as HTMLInputElement);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    
    const elem = document.querySelector( '#togglePassword' ) as HTMLElement;
    elem.classList.toggle('bi-eye');
  }

  isValid(value : any) : boolean{
    return (value.invalid && value.touched) || (value.dirty && value.invalid)||
    (value.untouched && this.isSubmitted);
  }



}
