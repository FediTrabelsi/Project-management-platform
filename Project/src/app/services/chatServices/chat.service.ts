import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs-observable';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://192.168.43.92:3000');

  joinRoom(data)
  {
      this.socket.emit('join',data);
  }

  newUserJoined()
  {
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('new user joined', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
}

userLeftRoom(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
        this.socket.on('left room', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
}




sendMessage(data)
    {
        this.socket.emit('message',data);
    }

    sendNotification(data)
    {
        this.socket.emit('notify',data);
    }

    removeNotification(data)
    {
        this.socket.emit('removeNotif',data);
    }

    newNotifRemoved(){
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('remove', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    newNotificationReceived(){
      let observable = new Observable<{user:String, message:String}>(observer=>{
          this.socket.on('you recieved a new notification', (data)=>{
              observer.next(data);
          });
          return () => {this.socket.disconnect();}
      });

      return observable;
  }


  constructor() { }
}
