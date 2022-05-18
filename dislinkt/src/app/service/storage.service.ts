import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storeTokenData(token: string): void {
    sessionStorage.setItem("jwt", token);
  }

  getRoleFromToken(): string {
    const jwtToken = window.sessionStorage.getItem('jwt')
    if (jwtToken) {
      const tokenSplit = jwtToken.split('.')
      const decoded = decodeURIComponent(escape(window.atob(tokenSplit[1])))
      const obj = JSON.parse(decoded)
      return obj.role
    }
    return ""
  }

  getIdFromToken(): string {
    const jwtToken = window.sessionStorage.getItem('jwt')
    if (jwtToken) {
      const tokenSplit = jwtToken.split('.')
      const decoded = decodeURIComponent(escape(window.atob(tokenSplit[1])))
      const obj = JSON.parse(decoded)
      return obj.sub
    }
    return ""
  }
  getToken() {
    return sessionStorage.getItem("jwt")
  }
}
