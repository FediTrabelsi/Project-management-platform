import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router } from '@angular/router';
import { UserService} from '../services/userServices/user.service';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  formprofile: FormGroup;
  educationform: FormGroup;
  skillform : FormGroup;
  intrestform : FormGroup;
  name = JSON.parse(localStorage.getItem('user')).username;
  edit = true;
  cancel = false;
  save = false;
  skill=false;
  skillbuttons=false;
  skillplaceholder="";
  formEditable = true;
  intrest=false;
  intrestbuttons=false;
  intrestplaceholder="";
  user;
  edinitVal="";
  profilepic;
  profileImg=null;
  messageClass;
  message;


  constructor(
    public httpClient : HttpClient,
    public formBuilder: FormBuilder,
    private _router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.createForm();
    this.createEdForm();
  }

  createIntrestForm(){
    this.intrestform= this.formBuilder.group({
      intrestname: ['', Validators.compose([

        Validators.minLength(4),
        Validators.maxLength(40)
      ])]
    });
  }

createSkillForm(){
  this.skillform= this.formBuilder.group({
    skillname: ['', Validators.compose([

      Validators.minLength(8),
      Validators.maxLength(40)
    ])]
  });
}
createEdForm(){
  this.educationform = this.formBuilder.group({
    education: ['', Validators.compose([

      Validators.minLength(8),
      Validators.maxLength(40)
    ])],
    year: ['', Validators.compose([

      Validators.minLength(4),
      Validators.maxLength(4)
    ])],
    inst: ['', Validators.compose([

      Validators.minLength(8),
      Validators.maxLength(40)
    ])],
  });


}

  onFileSelected(event){
    const profileImge= <File> event.target.files[0];
    const fd = new FormData();
    console.log(this.user);

    if(profileImge!=null){
      const userId = JSON.parse(localStorage.getItem('user')).userId

      fd.append('profileImg',profileImge,userId+'.'+event.target.files[0].name.split(".").pop());
      fd.append('userId',userId);
      this.userService.updateProfileImage(fd).subscribe(data=>{
        console.log(data);
        this.profilepic="http://localhost:8080/"+data['newsrc'];
      });
    }

  }
  createForm() {
    const data = {
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId
    };
    this.userService.fechUser(data).subscribe( data =>{
      this.user=data;
      this.formprofile = this.formBuilder.group({
        firstname: [data['firstname'], Validators.compose([

          Validators.minLength(4),
          Validators.maxLength(20)
        ])],
        lastname: [data['lastname'], Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(35)
        ])],
        email: [data['email'], Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(35)
        ])],
        phone : [data['phone'], Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(10)
        ])],
        country : [data['country'], Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(35)
        ])],
        description: [data['description'], Validators.compose([
          Validators.maxLength(50)
        ])]
      });
    });

  }

  ngOnInit() {
    this.edinitVal="";
      this.loadProfileData();
      this.createEdForm();
      this.createSkillForm();
      this.createIntrestForm();
  }

  logout() {
    this.authService.logout();
    this._router.navigate(['login']);

  }

  onEdit() {
    this.edit = false;
    this.save = true;
    this.cancel = true;
    this.formEditable = false;
    console.log(this.user);
  }

  onCancel() {
    this.edit = true;
    this.save = false;
    this.cancel = false;
    this.formEditable = true;
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

  addEducation(){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      year : this.educationform.get('year').value,
      institution : this.educationform.get('education').value,
      place : this.educationform.get('inst').value
    };
    this.userService.addEducation(data).subscribe(data=>{
      if(data['succes']){
        this.ngOnInit();

      }
    })
  }

  updateProfileData(){
    const data = {
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      firstname : this.formprofile.get('firstname').value,
      lastname : this.formprofile.get('lastname').value,
      phone : this.formprofile.get('phone').value,
      country : this.formprofile.get('country').value,
      email : this.formprofile.get('email').value,
      description : this.formprofile.get('description').value
    };
    this.userService.upadateProfile(data).subscribe(data => {
        if(data['succes']){
          this.messageClass='alert alert-success';
          this.message=""+data['message'];
          this.ngOnInit();

        }else{
          this.messageClass='alert alert-danger';
        this.message=""+data['message'];
        }
    })  ;
    this.edit = true;
    this.save = false;
    this.cancel = false;
    this.formEditable = true;
  }

  removeEducation(index){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      edId : this.user.education[index]._id
    };
    this.userService.removeEducation(data).subscribe(data=>{
      if(data['succes']){
        this.ngOnInit();

      }
    })
  }

  addSkill(){
    this.skillplaceholder="Enter the skill and press add"
    this.skill=true;
    this.skillbuttons=true;

  }
  removeSkill(){
    this.skillplaceholder="Enter the skill and press remove"
    this.skill=true;
    this.skillbuttons=true;
  }
  add(){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      skillname : this.skillform.get('skillname').value
    }
    this.userService.addSkill(data).subscribe(data=>{
      console.log(data);
      if(data['succes']){
        this.ngOnInit();
      }
    })
    this.skillbuttons=false;
    this.skill=false;
  }
  remove(){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      skillname : this.skillform.get('skillname').value
    }
    this.userService.removeSkill(data).subscribe(data=>{
      console.log(data);
      if(data['succes']){
        this.ngOnInit();
      }
    })
    this.skillbuttons=false;
    this.skill=false;
  }


  addIntrest(){
    this.intrestplaceholder="Enter the new intrest and press add"
    this.intrest=true;
    this.intrestbuttons=true;

  }
  removeIntrest(){
    this.intrestplaceholder="Enter the new intrest and press remove"
    this.intrest=true;
    this.intrestbuttons=true;
  }
  addint(){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      intrestname : this.intrestform.get('intrestname').value
    }
    this.userService.addIntrest(data).subscribe(data=>{
      console.log(data);
      if(data['succes']){
        this.ngOnInit();
      }
    })
    this.intrestbuttons=false;
    this.intrest=false;
  }
  removeint(){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      intrestname : this.intrestform.get('intrestname').value
    }
    this.userService.removeIntrest(data).subscribe(data=>{
      console.log(data);
      if(data['succes']){
        this.ngOnInit();
      }
    })
    this.intrestbuttons=false;
    this.intrest=false;
  }

  addExperiance(){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      expyear : this.educationform.get('year').value,
      exp: this.educationform.get('education').value,

    };
    this.userService.addExperiance(data).subscribe(data=>{
      if(data['succes']){
        this.ngOnInit();

      }
    })
  };

  removeExperiance(index){
    const data={
      token: localStorage.getItem('token'),
      userId : JSON.parse(localStorage.getItem('user')).userId,
      expId : this.user.experiance[index]._id
    };
    this.userService.removeExperiance(data).subscribe(data=>{
      if(data['succes']){
        this.ngOnInit();

      }
    })
  }



}
