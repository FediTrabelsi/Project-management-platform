import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient , public router: Router) { }

  createProject(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/projects/createProject', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }
  removeProject(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/projects/removeProject', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  fetchMyProjects(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/projects/fetchProjects', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  addTechnologie(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/projects/addTechnologie', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  addMember(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/projects/addMember', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  removeTechnologie(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/projects/removeTechnologie', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }

  updateGeneralData(data){
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.post('http://localhost:8080/projects/updateGeneralData', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }
}
