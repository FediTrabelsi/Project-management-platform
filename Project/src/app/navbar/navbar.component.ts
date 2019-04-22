import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import {Router } from '@angular/router';
import {  ChatService} from '../services/chatServices/chat.service';
import { PushNotificationsService} from 'ng-push';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notifications =+JSON.parse(localStorage.getItem('notifications')) ;
  constructor(
    private _pushNotifications: PushNotificationsService ,
    private chatService : ChatService,
    private authService : AuthService,
    private _router : Router
  ) {
    this._pushNotifications.requestPermission()
    this.chatService.newNotificationReceived()
    .subscribe(data=>{
      this.notifications++
      localStorage.setItem("notifications",this.notifications.toString())
      this.notify(data);
    });
    this.chatService.newNotifRemoved()
    .subscribe(data=>{
      this.notifications--;
      localStorage.setItem("notifications",this.notifications.toString())
    });
  }

  ngOnInit() {
    this.joinChat();
  }
  logout() {
    this.authService.logout();
    this._router.navigate(['login']);

  }
  joinChat(){
    const username = JSON.parse(localStorage.getItem('user')).username ;
    this.chatService.joinRoom({user : username , room : username});
  }

  notify(data){
    let options = {
      body: data.message,
      icon: "http://localhost:8080/uploads/avatar.jpg"
    }
     this._pushNotifications.create("New notification", options).subscribe(
        res => console.log(res),
        err => console.log(err)
    );
  }

}
