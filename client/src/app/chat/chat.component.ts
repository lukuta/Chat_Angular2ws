/**
 * Created by lkuta on 06.02.17.
 */
import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {ChatService} from "./chat.service";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy{
  messages = [];
  connectionMsgs;
  connectionUsers;
  message = '';
  username;
  users = [];

  title = 'ChatApp';

  constructor(private chatService:ChatService, private ref:ElementRef) {

  }

  sendMessage(){
    if(/\S/.test(this.message)){
      this.chatService.sendMessage(this.username + ': ' + this.message);
      this.message = '';
    }
  }

  registerUser(){
    console.log('registerUser() fired: hello ' + this.username);
    this.ref.nativeElement.querySelector('#login-box').remove();
    this.ref.nativeElement.querySelector('#message-form > input').focus();
    this.chatService.initSocket();
    this.chatService.sendUsername(this.username);

    this.connectionMsgs = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
      this.updateScroll();
    });
    this.connectionUsers = this.chatService.getUsers().subscribe(user => {
      this.users = user as string[];
    });
  }

  updateScroll(){
    let element = this.ref.nativeElement.querySelector("#chat-box");
    element.scrollTop = element.scrollHeight;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.connectionMsgs.unsubscribe();
    this.connectionUsers.unsubscribe();
  }
}
