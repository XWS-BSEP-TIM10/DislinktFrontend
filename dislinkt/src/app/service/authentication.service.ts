import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from "../dto/LoginDTO";
import { RegistrationDTO } from "../dto/RegistrationDTO";
import { NewPasswordDTO } from "../dto/NewPasswordDto";
import { ChangePasswordDTO } from "../dto/ChangePasswordDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = "/auth/login"
  private signupUrl = "/auth/signup"
  private changePasswordUrl = "/auth/changePassword"
  private acctivateAccountUrl = "/auth/confirm"
  private sendRecoveryEmailUrl = "/auth/recover"
  private sendPasswordlessLoginEmailUrl = "/auth/passwordless"
  private changePasswordRecoveryUrl = "/auth/recover/changePassword"
  private passwordlessLoginUrl = "/auth/login/passwordless"
  private checkTokenUrl = "/auth/checkToken"
  private refreshTokenUrl = "/auth/refreshToken"

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

  activateAccount(token: String) {
    return this.http.get(`${config.baseUrl}${this.acctivateAccountUrl}/${token}`)
  }

  sendRecoveryEmail(email: String) {
    return this.http.get(`${config.baseUrl}${this.sendRecoveryEmailUrl}?email=${email}`)
  }

  changePasswordRecovery(token: String, newPasswordDTO: NewPasswordDTO) {
    return this.http.put(`${config.baseUrl}${this.changePasswordRecoveryUrl}/${token}`, newPasswordDTO)
  }

  sendPasswordlessLoginEmail(email: String) {
    return this.http.get(`${config.baseUrl}${this.sendPasswordlessLoginEmailUrl}?email=${email}`)
  }

  passwordlessLogin(token: String){
    return this.http.get(`${config.baseUrl}${this.passwordlessLoginUrl}/${token}`)
  }

  checkToken(token: String){
    return this.http.get(`${config.baseUrl}${this.checkTokenUrl}/${token}`)
  }

  generateAPIToken(userId: string) {
    return this.http.post(`${config.baseUrl}/auth/api-token`, {userId: userId})

  }

  refreshToken(refreshToken: any){
    const headers= new HttpHeaders()
  .set('Authorization', `Bearer ${refreshToken}`)
  .set('Anonymous', 'true')
    return this.http.get(`${config.baseUrl}${this.refreshTokenUrl}`, { 'headers': headers })
  }

}
