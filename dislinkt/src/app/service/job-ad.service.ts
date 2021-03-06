import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { CreateJobDTO } from '../dto/CreateJobAdDTO';

@Injectable({
  providedIn: 'root'
})
export class JobAdService {

  constructor(private http: HttpClient) { }

  private jobAdUrl = "/job-ads"

  addJobAd(jobAdDTO: CreateJobDTO) {
    return this.http.post(`${config.baseUrl}${this.jobAdUrl}`, jobAdDTO)
  }

  getJobAds(userId: string) {
    return this.http.get(`${config.baseUrl}/users/${userId}${this.jobAdUrl}`)
  }

  getAllJobAds(search: string) {
    return this.http.get(`${config.baseUrl}${this.jobAdUrl}`, {params:{search:search}})
  }

  getRecommendationJobAds(userId: string) {
    return this.http.get(`${config.baseUrl}${this.jobAdUrl}/recommendations/${userId}`)
  }

  getEvents() {
    return this.http.get(`${config.baseUrl}/job_recommendation/events`)
  }
}
