import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { ConnectionRequestDTO } from '../dto/ConnectionRequestDTO';
import { CreateBlockDTO } from '../dto/CreateBlockDTO';
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
  createBlock(createBlockDTO: CreateBlockDTO) {
    return this.http.post(`${config.baseUrl}${this.connectionsUrl}/block`, createBlockDTO)
  }
  respondToConnectionRequest(connectionRequestDTO: ConnectionRequestDTO, approve: boolean) {
    let response = approve ? 'approve' : 'refuse'
    return this.http.put(`${config.baseUrl}${this.connectionsUrl}/${response}`, connectionRequestDTO)
  }
  getPendingConnections(userId: string) {
    return this.http.get(`${config.baseUrl}${this.connectionsUrl}/pending/${userId}`)
  }
  getMutuals(initiatorId: string) {
    return this.http.get(`${config.baseUrl}${this.connectionsUrl}/mutuals/${initiatorId}`)
  }
}
