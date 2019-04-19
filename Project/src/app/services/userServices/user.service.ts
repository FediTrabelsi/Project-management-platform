import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { httpFactory } from '@angular/http/src/http_module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  domain: 'http://localhost:8080';

  constructor( private http: HttpClient , public router: Router) { }



  updateProfileImage(data){

    return this.http.post('http://localhost:8080/user/updateImage', data);
  }

  addEducation(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/addEducation', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  inviteUser(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/inviteUser', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  addProject(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/addProject', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  removeEducation(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/removeEducation', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  fechUser(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/fetch', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  removeSkill(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/removeSkill', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  addSkill(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/addSkill', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  removeIntrest(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/removeIntrest', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  addIntrest(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/addIntrest', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  addExperiance(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/addExperiance', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }


  removeExperiance(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/removeExperiance', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  upadateProfile(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/user/update', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

}
