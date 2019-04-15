import { Component, OnInit } from '@angular/core';
import { AuthService} from './../services/auth.service';
import {Router } from '@angular/router';
import { UserService} from '../services/userServices/user.service';
import { ProjectService } from '../services/projectServices/project.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  user;
  profilepic;
  userProjects=null ;
  projectId ;
  generalform: FormGroup;
  generalFormEditable =true ;
  edit = true;
  cancel = false;
  save = false;
  tech=false;
  val="";
  member=false;
  memberbutton=false;
  memberplaceholder="";
  techbuttons=false;
  techplaceholder="";
  generalbutton ="Edit"
  constructor(
    private _router: Router,
    private authService: AuthService,
    private userService : UserService,
    private projectService : ProjectService,
    public formBuilder: FormBuilder
    ) { this.createGeneralForm()}

    createGeneralForm(){
      const data = {
        token: localStorage.getItem('token'),
        userId : JSON.parse(localStorage.getItem('user')).userId
      };
      this.projectService.fetchMyProjects(data).subscribe(data=>{
      this.generalform= this.formBuilder.group({
        projectname: [data['projects'][this.projectId].projectname, Validators.compose([

          Validators.minLength(4),
          Validators.maxLength(40)
        ])],
        description: [data['projects'][this.projectId].description, Validators.compose([

          Validators.minLength(10),
          Validators.maxLength(50)
        ])],
        technologies: ['', Validators.compose([

          Validators.minLength(4),
          Validators.maxLength(15)
        ])],
        membername: ['', Validators.compose([

          Validators.minLength(4),
          Validators.maxLength(20)
        ])]

      });
    });
    }

  ngOnInit() {
    this.projectId= localStorage.getItem('projectId');
    this.createGeneralForm();
    this.loadProfileData();
    this.fetchMyProjects();
  }

  logout() {
    this.authService.logout();
    this._router.navigate(['login']);

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
  onEdit() {
    this.edit = false;
    this.save = true;
    this.cancel = true;
    this.generalFormEditable = false;
    console.log(this.user);
  }

  onCancel() {
    this.edit = true;
    this.save = false;
    this.cancel = false;
    this.generalFormEditable = true;
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

  updateGeneralData(){
    const data= {
      token: localStorage.getItem('token'),
      projectname : this.generalform.get('projectname').value,
      description : this.generalform.get('description').value,
      projectId : this.userProjects.projects[this.projectId]._id
    };
    this.projectService.updateGeneralData(data).subscribe(data=>{
      console.log(data['message']);
      if(data['succes']){
        this.ngOnInit();
      }
    })
    this.edit = true;
    this.save = false;
    this.cancel = false;
    this.generalFormEditable = true;
  }

  addTech(){
    this.techplaceholder="Enter the technologie name and press add or remove "
    this.tech=true;
    this.techbuttons=true;
  }
  removeTech(){
    this.techplaceholder="Enter the technologie name and press add or remove"
    this.tech=true;
    this.techbuttons=true;
  }
  add(){
    const data={
      token: localStorage.getItem('token'),
      projectId : this.userProjects.projects[this.projectId]._id,
      technologie : this.generalform.get('technologies').value
    }
    this.projectService.addTechnologie(data).subscribe(data=>{
      console.log(data['message'])
      if(data['succes']){
        this.techbuttons=false;
        this.tech=false;
        this.ngOnInit()
      }else{
        this.techplaceholder=data['message'];
      }
    });

  }
  remove(){
    const data={
      token: localStorage.getItem('token'),
      projectId : this.userProjects.projects[this.projectId]._id,
      technologie : this.generalform.get('technologies').value
    }
    this.projectService.removeTechnologie(data).subscribe(data=>{
      console.log(data['message'])
      if(data['succes']){
        this.techbuttons=false;
        this.tech=false;
        this.ngOnInit()
      }else{
        this.techplaceholder=data['message'];
      }
    });

  }
  showaddmember(){
    this.memberplaceholder="Type the username of the member you wish to add"
    this.member=true;
    this.memberbutton=true;
  }

  addMember(){


    const data={
      token: localStorage.getItem('token'),
      membername : this.generalform.get('membername').value,
      projectId : this.userProjects.projects[this.projectId]._id,
      projectname : this.userProjects.projects[this.projectId].projectname
    };
    this.projectService.addMember(data).subscribe( data => {
      this.memberplaceholder = data['message'];
      console.log(data['message']);
      if(data['succes']){
        this.member = false;
        this.memberbutton = false;
        this.ngOnInit();
      }else{
        this.generalform.reset();
        this.ngOnInit();
      }
    })
  }


}
