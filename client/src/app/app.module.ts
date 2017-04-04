import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ChatComponent} from "./chat/chat.component";
import {AppRoutingModule} from "./app-routing.module";
import {LoginService} from "./login/login.service";
import {LoginComponent} from "./login/login.component";
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
