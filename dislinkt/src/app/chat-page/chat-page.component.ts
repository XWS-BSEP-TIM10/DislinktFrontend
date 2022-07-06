import { Component, OnInit } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
//import {SockJS} from 'sockjs-client'
import * as SockJS from 'sockjs-client';
import { StorageService } from '../service/storage.service';
import { ConnectionService } from '../service/connection.service';
import { MessagingService } from '../service/messaging.service';
import { config } from 'src/shared';
import {AppComponent} from '../app.component'
import {MessageTextService} from '../service/message-text.service'
declare var require: any;
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  
  stompClient: any = null
  currentUserId: string = this.storageService.getIdFromToken()
  mutuals: any = []
  msg: string = ""
  newMessages: any = null
  
  constructor(private storageService: StorageService, private connectionService : ConnectionService, private messagingService: MessagingService, private appComponent:AppComponent, private messageTextService: MessageTextService ) { }
  ngOnInit(): void {
    this.connectionService.getMutuals(this.currentUserId).subscribe((data:any) => {
      this.mutuals = data
      if(this.mutuals.length!=0)this.appComponent.selectedPerson = this.mutuals[0]
    })

    this.messageTextService.currentValue.subscribe(value =>{
      this.newMessages = value
    })
  }

  ngOnDestroy(): void{
    this.appComponent.selectedPerson = null
  }

   sendMessage = () => {
    this.appComponent.sendMessage(this.msg)
  };
  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }

  showChat(person: any){
   this.appComponent.showChat(person)
  }

  getInitialsFromOneWord(FullName: string) {
    return FullName.split(' ')[0].charAt(0) + FullName.split(' ')[1].charAt(0)
  }

}


