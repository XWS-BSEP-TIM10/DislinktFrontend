import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { CreateConnectionDTO } from '../dto/CreateConnectionDTO';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  private connectionsUrl = "/connections"


  getConnectionStatus(initiatorId: string, receiverId: string) {
    return this.http.get(`${config.baseUrl}${this.connectionsUrl}/status/${initiatorId}/${receiverId}`)
  }
  createConnection(createConnectionDTO: CreateConnectionDTO) {
    return this.http.post(`${config.baseUrl}${this.connectionsUrl}`, createConnectionDTO)
  }

  getMutuals(initiatorId: string) {
    return this.http.get(`${config.baseUrl}${this.connectionsUrl}/mutuals/${initiatorId}`)
  }
}
