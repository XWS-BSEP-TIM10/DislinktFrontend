import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './service/storage.service';
import {PlatformLocation } from '@angular/common';
import { config } from "src/shared"

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private storageService: StorageService, private platformLocation: PlatformLocation) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken()
    if (token) {
      req = req.clone({
         setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(req)
  }
}
