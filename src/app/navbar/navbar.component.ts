import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isloggedIn:any = this._auth.checkLogin();  
  constructor(private _auth:AuthService, private _cookie:CookieService) { }

  ngOnInit() {
    this._auth.sub.subscribe(()=>{
      this.isloggedIn = this._auth.checkLogin();
    });
    console.log("Logged In user: ", this.isloggedIn);
  }

  logout(){
    this._cookie.delete('currentUser');
    this.isloggedIn = this._auth.checkLogin();
    console.log("After Logout:",this.isloggedIn);
  }
}
