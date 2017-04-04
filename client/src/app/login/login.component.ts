import {Component, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  username: string;

  constructor(
    private ref: ElementRef,
    private router: Router,
    private loginService: LoginService){}

  registerUser(){
    if(!this.loginService.loginValidation(this.username)){
      this.ref.nativeElement.querySelector('#error-box').innerHTML = 'WRONG NICKNAME! (3-12 characters)';
    } else {
      this.loginService.username = this.username;
      this.gotoChat();
    }
  }

  private gotoChat() {
    this
      .router
      .navigate(['/chat']);
  }

}
