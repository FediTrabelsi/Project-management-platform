import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  name=JSON.parse(localStorage.getItem('user'))['username'];


  constructor() { }
  ngOnInit() {
  }

}
