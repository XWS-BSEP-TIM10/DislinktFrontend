import { Component, OnInit } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
//import {SockJS} from 'sockjs-client'
import * as SockJS from 'sockjs-client';
import { StorageService } from './service/storage.service';
import { MessagingService } from './service/messaging.service';
import { MessageTextService } from './service/message-text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  stompClient: any = null
  currentUserId: string = this.storageService.getIdFromToken()
  constructor(private storageService: StorageService, private messagingService: MessagingService, private messageTextService: MessageTextService) { }
  title = 'dislinkt';
  selectedPerson: any = {}

  ngOnInit(): void {
    this.connect();
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
    this.stompClient.subscribe(
      "/user/" + this.currentUserId + "/queue/posts",
      this.onMessageReceivedPost
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
      alert("You've received  a new message!");
      console.log(notification)
    }
  };

  onMessageReceivedPost= (msg: { body: string; }) => {
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
      if(notification.id != this.currentUserId)
      alert("One of the people you follow has created a new post.");
  };

  showChat(person: any){
    this.messagingService.getMessagesWithUser(this.currentUserId,person.userId).subscribe((data:any) => {
      this.messageTextService.changeValue(data)
      this.selectedPerson = person
      console.log(this.messageTextService.currentValue)
    })
  }

  sendMessage = (msg : string) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: this.currentUserId,
        recipientId: this.selectedPerson.userId,
        recipientName: this.selectedPerson.firstName + " "+ this.selectedPerson.lastName,
        content: msg,
        timestamp: new Date(),
      };
      console.log(this.stompClient)
      this.stompClient.publish({destination:"/app/chat", body: JSON.stringify(message)}); 
      this.messageTextService.addValue(message);
    
    }
  };
}