import { Component, OnInit } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
//import {SockJS} from 'sockjs-client'
import * as SockJS from 'sockjs-client';
import { StorageService } from '../service/storage.service';
import { ConnectionService } from '../service/connection.service';
import { MessagingService } from '../service/messaging.service';
import { config } from 'src/shared';
declare var require: any;
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  
  stompClient: any = null
  currentUserId: string = this.storageService.getIdFromToken()
  newMessages: any = []
  mutuals: any = []
  msg: string = ""
  selectedPerson: any = {}
  constructor(private storageService: StorageService, private connectionService : ConnectionService, private messagingService: MessagingService ) { }
  ngOnInit(): void {
    this.connectionService.getMutuals(this.currentUserId).subscribe((data:any) => {
      this.mutuals = data
      if(this.mutuals.length!=0)this.selectedPerson = this.mutuals[0]
    })
    this.connect();
  }

  ngOnDestroy(): void{
    this.selectedPerson = null
  }

   connect = () => {
    //const Stomp = require("stompjs");
    //var SockJS = require("sockjs-client");
    this.stompClient = Stomp.over(new SockJS("https://localhost:8678/ws"));
    //const socket = new SockJS('http://localhost:8678/ws')
    this.stompClient.connect({}, this.onConnected, this.onError);
  };
  
   onConnected = () => {
    console.log("connected");
    console.log(this.currentUserId);
    this.stompClient.subscribe(
      "/user/" + this.currentUserId + "/queue/messages",
      this.onMessageReceived
    );
  };

   onError = (err: any) => {
    console.log(err);
  };

   onMessageReceived = (msg: { body: string; }) => {
    const notification = JSON.parse(msg.body);
    console.log(notification)
    /*const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
      .chatActiveContact;

    if (active.id === notification.senderId) {
      findChatMessage(notification.id).then((message) => {
        const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
          .chatMessages;
        newMessages.push(message);
        setMessages(newMessages);
      });
    } else {
      message.info("Received a new message from " + notification.senderName);
    }
    loadContacts();*/
    if (this.selectedPerson != null && this.selectedPerson.userId === notification.senderId) {
        this.showChat(this.selectedPerson)

      }
     else {
      alert("Received a new message from " + notification.senderName);
    }
  };

   sendMessage = () => {
    if (this.msg.trim() !== "") {
      const message = {
        senderId: this.currentUserId,
        recipientId: this.selectedPerson.userId,
        recipientName: this.selectedPerson.firstName + " "+ this.selectedPerson.lastName,
        content: this.msg,
        timestamp: new Date(),
      };
      console.log(this.stompClient)
      this.stompClient.publish({destination:"/app/chat", body: JSON.stringify(message)}); 
      this.newMessages.push(message);
    
    }
  };
  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }

  showChat(person: any){
    this.messagingService.getMessagesWithUser(this.currentUserId,person.userId).subscribe((data:any) => {
      this.newMessages = data
      this.selectedPerson = person
      console.log(this.newMessages)
    })
  }

  getInitialsFromOneWord(FullName: string) {
    return FullName.split(' ')[0].charAt(0) + FullName.split(' ')[1].charAt(0)
  }

}


