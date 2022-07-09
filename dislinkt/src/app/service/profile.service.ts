import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { UpdateProfileDTO } from '../dto/UpdateProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private profileUrl = "/profiles"


  getProfile(id: string) {
    return this.http.get(`${config.baseUrl}${this.profileUrl}/${id}`)
  }

  putProfile(updateProfileDTO: UpdateProfileDTO) {
    return this.http.put(`${config.baseUrl}${this.profileUrl}`, updateProfileDTO)
  }

  getProfiles(firstName:string, lastName:string) {
    return this.http.get(`${config.baseUrl}${this.profileUrl}/find`, {params:{first_name:firstName, last_name:lastName}})
  }

  getEvents() {
    return this.http.get(`${config.baseUrl}${this.profileUrl}/events`)
  }

}
