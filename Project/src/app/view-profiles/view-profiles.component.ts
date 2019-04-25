import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService} from './../services/auth.service';
import {Router } from '@angular/router';
import { UserService} from '../services/userServices/user.service';
import { ProjectService } from '../services/projectServices/project.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {  ChatService} from '../services/chatServices/chat.service';

@Component({
  selector: 'app-view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.css']
})
export class ViewProfilesComponent implements OnInit, OnDestroy {
  user;
  areFriends;
  profilepic;
  userProjects=null ;
  constructor(
    private chatService : ChatService,
    private _router: Router,
    private authService: AuthService,
    private userService : UserService,
    private projectService : ProjectService,
  ) { }

  ngOnInit() {
    this.loadProfileData();
    this.checkIfFriends();

  }

  ngOnDestroy(){
    localStorage.removeItem('profileId');
    localStorage.removeItem('img');
  }
  loadProfileData() {
    const data = {
      token: localStorage.getItem('token'),
      username : localStorage.getItem('profileId')
    };
    this.userService.fechUserByname(data).subscribe(data => {
      this.user = data;
      this.profilepic="http://localhost:8080/"+(data['imagesrc']);

    })  ;
  }

  checkIfFriends(){
    const data={
      token: localStorage.getItem('token'),
      memberId : localStorage.getItem('profileId'),
      userId : JSON.parse(localStorage.getItem('user')).userId
    }
    this.userService.checkFriend(data).subscribe(data=>{
      if(data['friends']){
        this.areFriends=true;
      }
    })
  }

  inviteFriend(){
    const membername = localStorage.getItem('profileId')
    const name =JSON.parse(localStorage.getItem('user')).username
    const imagesrc = localStorage.getItem('img');
    const data={
      username : JSON.parse(localStorage.getItem('user')).username,
      token: localStorage.getItem('token'),
      type :"friend",
      membername : localStorage.getItem('profileId'),
      Id : JSON.parse(localStorage.getItem('user')).userId,
      memberId: localStorage.getItem('profileId'),
      imagesrc : localStorage.getItem('img'),
      description :"The user  "+name+" sent you a friend invitation"
    };
    this.userService.inviteFriend(data).subscribe( data => {
      console.log(data['message'])

      console.log(data['message']);
      if(data['succes']){
        this.chatService.joinRoom({user : name , room :membername });
        this.chatService.sendNotification({user:name, room:membername, message:"the user "+name+" sent you a friend invitation",img : imagesrc});
        this.chatService.leaveRoom({user : name , room : membername});
       console.log('invitation sent')

        this.ngOnInit();
      }else{

        this.ngOnInit();
      }
    })
  }


}
