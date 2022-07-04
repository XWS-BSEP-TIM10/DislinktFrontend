import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { Stomp } from '@stomp/stompjs';
//import {SockJS} from 'sockjs-client'
import * as SockJS from 'sockjs-client';
import {ChatPageComponent} from '../chat-page/chat-page.component'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  stompClient: any = null
  currentUserId: string = this.storageService.getIdFromToken()
  constructor(private router: Router, private storageService: StorageService, private chatPageComponent:ChatPageComponent) { }

  login(){
    this.router.navigate(['login']);
  }

  logout() {
    this.storageService.clearToken()
    this.router.navigate([''])
  }

  registration(){
    this.router.navigate(['registration']);
  }

  getRole() {
    return this.storageService.getRoleFromToken()
  }

  isLoggedIn() {
    return this.storageService.getRoleFromToken() !== ""
  }


  goToUsersPage() {
    let userId = this.storageService.getIdFromToken()
    this.router.navigate([`users/${userId}`])
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
    if (this.chatPageComponent.selectedPerson != null && this.chatPageComponent.selectedPerson.userId === notification.senderId) {
      this.chatPageComponent.showChat(this.chatPageComponent.selectedPerson)

      }
     else {
      alert("You've received  a new message!");
    }
  };

}
