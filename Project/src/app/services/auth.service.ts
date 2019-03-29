import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../../../backend/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken;
  user;
  domain: 'http://localhost:8080';
  constructor(  private http: HttpClient ) {}

  RegisterUser(user){
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function (key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post('http://localhost:8080/authentification/register', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  AuthentificateUser(user){
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function (key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post('http://localhost:8080/authentification/login', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  storeUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user= user;
  }
}
