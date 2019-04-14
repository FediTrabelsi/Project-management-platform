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
}
