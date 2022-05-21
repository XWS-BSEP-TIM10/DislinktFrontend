import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { CreateExperienceDTO } from '../dto/CreateExperienceDTO';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  private exerienceUrl = "/experiences"

  addExperience(createExperienceDTO: CreateExperienceDTO) {
    return this.http.post(`${config.baseUrl}${this.exerienceUrl}`, createExperienceDTO)
  }
  deleteInterest(id: number) {
    return this.http.delete(`${config.baseUrl}${this.exerienceUrl}/${id}`)
  }
  updateExperience(id: number, createExperienceDTO: CreateExperienceDTO) {
    return this.http.put(`${config.baseUrl}${this.exerienceUrl}/${id}`, createExperienceDTO)
  }

}
