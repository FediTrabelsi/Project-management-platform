import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService} from './../services/auth.service';
import {Router } from '@angular/router';
import { UserService} from '../services/userServices/user.service';
import { ProjectService } from '../services/projectServices/project.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {  ChatService} from '../services/chatServices/chat.service';
@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  room;
  chatname;
  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];
  user;
  profilepic;
  userProjects=null ;
  projectId ;
  generalform: FormGroup;
  fileform : FormGroup;
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
    private chatService : ChatService,
    private _router: Router,
    private authService: AuthService,
    private userService : UserService,
    private projectService : ProjectService,
    public formBuilder: FormBuilder
    ) { this.createGeneralForm();
        this.createFileForm();

        this.chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));
        this.chatService.userLeftRoom()
        .subscribe(data=> this.messageArray.push(data));
        this.chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
    }

    onFileSelected(event){
      const fileToUpload= <File> event.target.files[0];
      const description = this.fileform.get('filedesc').value;
      const fd = new FormData();
      console.log(this.user);

      if(fileToUpload!=null){
        const username = JSON.parse(localStorage.getItem('user')).username;
        const token= localStorage.getItem('token')
        const projectId = this.userProjects.projects[this.projectId]._id;
        fd.append('file',fileToUpload,event.target.files[0].name);
        fd.append('username',username);
        fd.append('token',token);
        fd.append('description',description);
        fd.append('projectId',projectId);
        this.projectService.updateFile(fd).subscribe(data=>{
          console.log(data['message']);

          this.ngOnInit();
        });
      }

    }


    removeFile(id){
      const data={
        token : localStorage.getItem('token'),
        username : JSON.parse(localStorage.getItem('user')).username,
        projectId : this.userProjects.projects[this.projectId]._id,
        fileId : this.userProjects.projects[this.projectId].attachedFiles[id]._id
      };
      this.projectService.removeFile(data).subscribe(data=>{
        console.log(data['message']);
        if(data['succes']){
          this.ngOnInit();
        }
      });
    };

    createFileForm(){
      this.fileform= this.formBuilder.group({
        filedesc: ['', Validators.compose([

          Validators.minLength(8),
          Validators.maxLength(40)
        ])]
      });
    }

    createGeneralForm(){
      const data = {
        token: localStorage.getItem('token'),
        userId : JSON.parse(localStorage.getItem('user')).userId
      };
      this.projectService.fetchMyProjects(data).subscribe(data=>{
        this.room=data['projects'][this.projectId].projectname;
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
    this.createFileForm();
    this.chatname=JSON.parse(localStorage.getItem('user')).username;
  }

  ngOnDestroy(){
    this.leaveChat();
    localStorage.removeItem('projectId');
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
      this.room=data['projects'][this.projectId].projectname;
      console.log(data['message']);
      if(data['succes']){
        console.log(data);
        this.userProjects = data;
        this.joinChat();

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
    const membername =this.generalform.get('membername').value;
    const projname = this.userProjects.projects[this.projectId].projectname;
    const data={
      userId : JSON.parse(localStorage.getItem('user')).userId,
      token: localStorage.getItem('token'),
      type :"project",
      membername : this.generalform.get('membername').value,
      Id : this.userProjects.projects[this.projectId]._id,
      imagesrc : this.user.imagesrc,
      description :"The user  "+this.user.username+" invited you to join the project : "+this.userProjects.projects[this.projectId].projectname
    };
    this.userService.inviteUser(data).subscribe( data => {
      console.log(data['message'])
      this.memberplaceholder = data['message'];
      console.log(data['message']);
      if(data['succes']){
        this.member = false;
        this.memberbutton = false;
        this.chatService.joinRoom({user : this.chatname , room :membername });
        this.chatService.sendNotification({user:this.chatname, room:membername, message:"the user "+this.chatname+" invited you to join the project: "+projname});
        this.chatService.leaveRoom({user : this.chatname , room : membername});

        this.ngOnInit();
      }else{
        this.generalform.reset();
        this.ngOnInit();
      }
    })
  }

  joinChat(){
    this.chatService.joinRoom({user : this.chatname , room : this.room});
  }

  leaveChat(){
    this.chatService.leaveRoom({user : this.chatname , room : this.room});
  }

  sendMessage()
  {
      this.chatService.sendMessage({user:this.chatname, room:this.room, message:this.messageText});
  }

}
