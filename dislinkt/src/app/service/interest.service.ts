import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { CreateInterestDTO } from '../dto/CreateInterestDTO';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(private http: HttpClient) { }

  private interestUrl = "/interests"

  addInterest(createInterestDTO: CreateInterestDTO) {
    return this.http.post(`${config.baseUrl}${this.interestUrl}`, createInterestDTO)
  }
  deleteInterest(id: number, userId: string) {
    return this.http.delete(`${config.baseUrl}${this.interestUrl}/${id}/user/${userId}`)
  }
}
