import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private http: HttpClient) { }

  getMessagesWithUser(currentUserId: string, otherUserId: string){
    return this.http.get(`https://localhost:8678/messages/${otherUserId}/${currentUserId}`)
  }

  getEvents() {
    return this.http.get(`https://localhost:8678/messaging/events`)
  }
}
