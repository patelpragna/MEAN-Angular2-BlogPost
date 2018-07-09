import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:String = this._cookie.get('currentUser');
  constructor(private _auth:AuthService, private _cookie:CookieService) { }

  ngOnInit() {
  }

}
