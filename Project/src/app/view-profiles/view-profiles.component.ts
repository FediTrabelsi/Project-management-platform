import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService} from './../services/auth.service';
import {Router } from '@angular/router';
import { UserService} from '../services/userServices/user.service';
import { ProjectService } from '../services/projectServices/project.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.css']
})
export class ViewProfilesComponent implements OnInit, OnDestroy {
  user;
  profilepic;
  userProjects=null ;
  constructor(
    private _router: Router,
    private authService: AuthService,
    private userService : UserService,
    private projectService : ProjectService,
  ) { }

  ngOnInit() {
    this.loadProfileData();

  }

  ngOnDestroy(){
    localStorage.removeItem('profileId');
  }
  loadProfileData() {
    const data = {
      token: localStorage.getItem('token'),
      userId : localStorage.getItem('profileId')
    };
    this.userService.fechUser(data).subscribe(data => {
      this.user = data;
      this.profilepic="http://localhost:8080/"+(data['imagesrc']);

    })  ;
  }


}
