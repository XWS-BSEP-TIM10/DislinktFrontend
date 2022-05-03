import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { RegistrationDTO } from '../dto/RegistrationDTO';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['login']);
  }

  registration(){
    this.router.navigate(['registration']);
  }

  
  registerUser(credentials: NgForm) {
    let registrationDTO: RegistrationDTO = { firstName: credentials.value.firstName, lastName: credentials.value.lastName,
                                              email: credentials.value.email, phoneNumber: credentials.value.phoneNumber,gender: "", dateOfBirth: "",
                                              username: credentials.value.username, password: credentials.value.password,biography: ""};
    this.authService.signup(registrationDTO).subscribe((data: any) => {
      this.router.navigateByUrl('/')
    })
  }

}
