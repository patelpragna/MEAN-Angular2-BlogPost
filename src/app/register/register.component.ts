import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: any = {};
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }
  registerNewUser() {
    this._auth.register(this.newUser);
  }

}
