import { PostService } from './auth/post/post.service';
import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { LikeComponent } from './list-post/like/like.component';
import { CommentComponent } from './list-post/comment/comment.component';
import { AuthService } from './auth/auth.service';
import { DatePipeComponent } from './date/date-pipe/date-pipe.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListPostComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreatePostComponent,
    ListPostComponent,
    LikeComponent,
    CommentComponent,
    DatePipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [AuthService,
    CookieService,
    AuthGuard,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
