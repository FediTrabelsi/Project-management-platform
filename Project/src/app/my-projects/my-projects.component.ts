import { Component, OnInit } from '@angular/core';
import { AuthService} from './../services/auth.service';
import {Router } from '@angular/router';
import { UserService} from '../services/userServices/user.service';
import { ProjectService } from '../services/projectServices/project.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  user;
  profilepic;
  userProjects=null ;
  projectform : FormGroup;

  constructor(
    private _router: Router,
    private authService: AuthService,
    private userService : UserService,
    private projectService : ProjectService,
    public formBuilder: FormBuilder,


  ) {
    this.createProjectForm();
  }

  createProjectForm(){
    this.projectform= this.formBuilder.group({
      projectname: ['', Validators.compose([

        Validators.minLength(4),
        Validators.maxLength(20)
      ])],
      description: ['', Validators.compose([

        Validators.minLength(10),
        Validators.maxLength(50)
      ])]
    });
  }


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
    this.createProjectForm();
    this.loadProfileData();
    this.fetchMyProjects();
  }

  logout() {
    this.authService.logout();
    this._router.navigate(['login']);

  }

  createProject(){
;
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      projectname : this.projectform.get('projectname').value,
      description: this.projectform.get('description').value,
      username : JSON.parse(localStorage.getItem('user')).username,
      imagesrc : this.user['imagesrc']

    };
    this.projectService.createProject(data).subscribe(data=>{
      if(data['succes']){
        const dataproj={
          token: localStorage.getItem('token'),
          userId : JSON.parse(localStorage.getItem('user')).userId,
          projectname : this.projectform.get('projectname').value,
          projectId : data['projectId']
        }
        this.userService.addProject(dataproj).subscribe(data =>{
          if(data['succes']){
            console.log(data['message']);
            this.ngOnInit();
          }else{
            console.log(data['message']);
          }
        });

      }else{
        console.log(data['message']);
      }
    })
  };

  removeProject(id){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      projectId : this.userProjects.projects[id]._id
    };
    this.projectService.removeProject(data).subscribe(data =>{
      console.log(data['message']);
      if(data['succes']){
        this.ngOnInit();
      }
    })
  }

  fetchMyProjects(){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
    };
    this.projectService.fetchMyProjects(data).subscribe(data =>{
      console.log(data['message']);
      if(data['succes']){
        console.log(data);
        this.userProjects = data;
      }
    })
  }




}
