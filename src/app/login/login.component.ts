import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn:any = {};

  constructor(private _auth:AuthService) { }

  ngOnInit() {
  }

  loginUser(){
    this._auth.login(this.loggedIn);
  }

}
