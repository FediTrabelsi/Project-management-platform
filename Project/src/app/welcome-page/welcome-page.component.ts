import { Component, OnInit } from '@angular/core';
import { AuthService} from './../services/auth.service';
import {Router } from '@angular/router';
import { UserService} from '../services/userServices/user.service';
import { ProjectService } from '../services/projectServices/project.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {  ChatService} from '../services/chatServices/chat.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  user;
  profilepic;
  constructor(
    private chatService : ChatService,
    private _router: Router,
    private authService: AuthService,
    private userService : UserService,
    private projectService : ProjectService
    ) {
      this.chatService.newNotificationReceived()
      .subscribe(data=>this.ngOnInit());
     }

  ngOnInit() {
    this.loadProfileData();
  }
  joinChat(){
    const username = JSON.parse(localStorage.getItem('user')).username ;
    this.chatService.joinRoom({user : username , room : username});
  }

  loadProfileData() {
    const data = {
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,

    };
    this.userService.fechUser(data).subscribe(data => {
      this.user = data;
      this.profilepic="http://localhost:8080/"+(data['imagesrc']);

    })  ;
  }


  declineProject(id){
    const params= {
          token: localStorage.getItem('token'),
          username : JSON.parse(localStorage.getItem('user')).username,
           notificationId : this.user.invitations[id]._id
        }
        this.projectService.removeFromInvitations(params).subscribe(data =>{
          if(data['succes']){
            console.log(data);
            this.chatService.removeNotification(({user:this.user.username, room:this.user.username, message:"declined invitation"}));
            this.ngOnInit();
          }else{
            console.log(data['message'])
          }
        })
  }

  acceptProject(id){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      username : JSON.parse(localStorage.getItem('user')).username,
      projectId : this.user.invitations[id].invitedTo,
      imgsrc : this.user.imagesrc

    }
    this.projectService.acceptProject(data).subscribe(data =>{
      console.log(data);
      if(data['succes']){
        const params= {
          token: localStorage.getItem('token'),
          username : JSON.parse(localStorage.getItem('user')).username,
           notificationId : this.user.invitations[id]._id
        }
        this.projectService.removeFromInvitations(params).subscribe(data =>{
          if(data['succes']){
            this.chatService.removeNotification(({user:this.user.username, room:this.user.username, message:"accepted invitation"}));
            console.log(data)
            this.ngOnInit();
          }else{
            console.log(data['message'])
          }
        })
      }
    })
  }

  viewProfile(id){
    localStorage.setItem('profileId',this.user.invitations[id].sender);
    this._router.navigate(['viewProfile']);
  }

}
