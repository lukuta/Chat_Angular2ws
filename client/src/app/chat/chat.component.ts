/**
 * Created by lkuta on 06.02.17.
 */
import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {ChatService} from "./chat.service";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {isUndefined} from "util";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy{
  messages = [];
  connectionMsgs: Subscription;
  connectionUsers: Subscription;
  message: string;
  username: string;
  users = [];

  title = 'ChatApp';

  constructor(
    private chatService:ChatService,
    private ref:ElementRef,
    private loginService: LoginService,
    private router: Router
  ) { }

  sendMessage(){
    if(/\S/.test(this.message)){
      this.chatService.sendMessage(this.message, this.username);
      this.message = '';
    }
  }

  putMessage(message){
    if(message.username == this.username){
      return message.text;
    } else {
      return message.username + ': ' + message.text;
    }
  }

  updateScroll(){
    let element = this.ref.nativeElement.querySelector("#chat-box");
    element.scrollTop = element.scrollHeight;
  }

  clearMessages(){
    this.messages = [];
    this.ref.nativeElement.querySelector('#message-form > input').focus();
  }

  ngOnInit() {
    this.initChat();
  }

  private initChat() {
    if(this.setUsername()){
      console.log('Hello ' + this.username);
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
  }

  ngOnDestroy() {
    if(!isUndefined(this.connectionUsers)){
      this.connectionMsgs.unsubscribe();
      this.connectionUsers.unsubscribe();
    }
  }

  private setUsername(): boolean {
    let username = this.loginService.username;
    if (username == null){
      this
        .router
        .navigate(['/login']);
      return false;
    } else {
      this.username = username;
      return true;
    }
  }
}
