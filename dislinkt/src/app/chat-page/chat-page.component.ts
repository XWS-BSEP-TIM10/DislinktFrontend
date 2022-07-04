import { Component, OnInit } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
//import {SockJS} from 'sockjs-client'
import * as SockJS from 'sockjs-client';
import { StorageService } from '../service/storage.service';
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
  constructor(private storageService: StorageService) { }
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
  };

   onError = (err: any) => {
    console.log(err);
  };

   onMessageReceived = (msg: { body: string; }) => {
    const notification = JSON.parse(msg.body);
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
    alert("Poruka")
  };

   sendMessage = (msg: string) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: this.currentUserId,
        recipientId: "2",
        senderName: "Posiljalac",
        recipientName: "Primalac",
        content: msg,
        timestamp: new Date(),
      };
      console.log(this.stompClient)
      this.stompClient.publish({destination:"/app/chat", body: JSON.stringify(message)}); 
      this.newMessages.push(message);
    
    }
  };
  

}


