import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  sub = new Subject<any>();
  constructor(private _http: HttpClient, private _router: Router, private _cookie: CookieService) { }

  register(user_details) {
    console.log(user_details);
    this._http.post('http://localhost:3200/reg', user_details).subscribe((data: any) => {
      if (data.flg) {
        console.log(data.msg);
        this._router.navigate(['/login']);
      } else {
        console.log(data.msg);
      }
    });
  }

  login(login_user) {
    console.log(login_user);
    this._http.post('http://localhost:3200/login', login_user).subscribe((data: any) => {
      if (data.flg) {
        console.log(data.msg);
        this._cookie.set('currentUser', login_user.username);
        this.sub.next();
        this._router.navigate(['/home']);
      } else {
        console.log(data.msg);
      }
    });
  }
  checkLogin() {
    return this._cookie.get('currentUser');
  }
}
