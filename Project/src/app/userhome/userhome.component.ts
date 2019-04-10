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
  name = JSON.parse(localStorage.getItem('user')).username;
  edit = true;
  cancel = false;
  save = false;
  formEditable = true;
  user;
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


createEdForm(){
  this.educationform = this.formBuilder.group({
    education: ['', Validators.compose([

      Validators.minLength(8),
      Validators.maxLength(40)
    ])],
    year: ['', Validators.compose([

      Validators.minLength(8),
      Validators.maxLength(20)
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
      this.loadProfileData();
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

}
