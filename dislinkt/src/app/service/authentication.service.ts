import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from "../dto/LoginDTO";
import { RegistrationDTO } from "../dto/RegistrationDTO";
import { ChangePasswordDTO } from "../dto/ChangePasswordDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = "/auth/login"
  private signupUrl = "/auth/signup"
  private changePasswordUrl = "/auth/changePassword"

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO) {
    return this.http.post(`${config.baseUrl}${this.loginUrl}`, loginDTO)
  }

  signup(registrationDTO: RegistrationDTO) {
    return this.http.post(`${config.baseUrl}${this.signupUrl}`, registrationDTO)
  }

  changePassword(changePasswordDTO: ChangePasswordDTO) {
    return this.http.put(`${config.baseUrl}${this.changePasswordUrl}`, changePasswordDTO)
  }

}
