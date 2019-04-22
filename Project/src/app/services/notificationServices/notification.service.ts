import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs-observable';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket = io('http://localhost:3000');
  joinRoom(data)
  {
      this.socket.emit('join',data);
  }


  constructor() { }
}
