import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken;
  user;
  domain: 'http://localhost:8080';
  constructor(  private http: HttpClient , public router: Router) {}
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.iat);

    return (date);
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = localStorage.getItem('token');
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);

    if(date === undefined) return false;
    return !((date.valueOf()) > new Date().valueOf()/1000 );
  }



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

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user= user;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logged out')
  }
}
