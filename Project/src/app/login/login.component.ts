import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform : FormGroup;
  messageClass;
  message;
  loginstatus : string;
  processing = false;



  constructor(
    public formBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthService
    ){
      this.createForm();
    }

    createForm() {
      this.loginform = this.formBuilder.group({
        username: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
          this.validateUsername
        ])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35),
          this.validatePassword
        ])]
      });
    }

    validateUsername(controls) {
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      if (regExp.test(controls.value)) {
      } else {
        return {'validateUsername': true }
      }
    }
    validatePassword(controls) {
      const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      if (regExp.test(controls.value)) {
        return null;
      } else {
        return {'validatePassword': true }
      }
    }


  onLoginSubmit(){
    this.processing=true;
    const user={
      username: this.loginform.get('username').value,
      password: this.loginform.get('password').value
    };
    this.authService.AuthentificateUser(user).subscribe(data =>{
      this.loginstatus=""+data['message'];
      if(data['success']){
        this.messageClass='alert alert-success';
        this.message=""+data['message'];
        this.authService.storeUserData(data['token'],data['user']);
        setTimeout(()=>{
          this._router.navigate(['userhome']);

        },2000);
      }
      else{
        this.messageClass='alert alert-danger';
        this.message=""+data['message'];
      }
    });

  }

  ngOnInit() {

    }
  moveToRegister() {
      this._router.navigate(['register']);
    }


}
