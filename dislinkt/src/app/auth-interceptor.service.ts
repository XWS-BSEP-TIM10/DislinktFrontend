import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './service/storage.service';
import { PlatformLocation } from '@angular/common';
import { config } from "src/shared"
import { AuthenticationService } from './service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private storageService: StorageService, private platformLocation: PlatformLocation, private authenticationService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken()
    const expDate = new Date(this.storageService.getExpirationDateFromToken() * 1000)
    if(req.headers.get('anonymous')){
      return next.handle(req)
    }
    if (token) {
      if (expDate < new Date()) {
          this.authenticationService.refreshToken(this.storageService.getRefreshToken()).subscribe(
            (data: any) => {
              if(data.jwt) {
              this.storageService.storeTokenData(data.jwt,data.refreshToken)
              }
              req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              });
            });
      }
      else {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
    }
    return next.handle(req)
  }
}
