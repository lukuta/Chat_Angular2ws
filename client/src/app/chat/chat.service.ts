/**
 * Created by lkuta on 06.02.17.
 */
import { Observable } from 'rxjs/Observable';

export class ChatService {
  private url = 'http://localhost:5000';
  private socket;
  private io = require('socket.io-client');

  sendMessage(message, username){
    this.socket.emit('add-message', message, username);
  }

  sendUsername(username){
    this.socket.emit('add-user', username);
  }

  initSocket(){
    this.socket = this.io(this.url);
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('user', (data) => {
        observer.next(data.text);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
