import { Component, OnInit } from '@angular/core';
import { AuthService} from './../services/auth.service';
import {Router } from '@angular/router';
import { UserService} from '../services/userServices/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  user;
  profilepic;


  constructor(
    private _router: Router,
    private authService: AuthService,
    private userService : UserService

  ) { }


  loadProfileData() {
    const data = {
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId
    };
    this.userService.fechUser(data).subscribe(data => {
      this.user = data;
      this.profilepic="http://localhost:8080/"+(data['imagesrc']);

    })  ;
  }

  ngOnInit() {
    this.loadProfileData();
  }

  logout() {
    this.authService.logout();
    this._router.navigate(['login']);

  }

}
