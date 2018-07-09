import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostService {

  commentSub = new Subject<any>();
  constructor(private _http: HttpClient, private _router: Router, private _cookie: CookieService) { }

  create(post_details) {
    post_details.postedBy = this._cookie.get('currentUser');
    this._http.post('http://localhost:3200/create', post_details).subscribe((data: any) => {
      if (data.flg) {
        alert(data.msg);
        this._router.navigate(['/list']);
      } else {
        alert("Error in publishing the post");
      }
    });
  }

  addNewComment(new_comment){
    return this._http.post('http://localhost:3200/addComment',new_comment);
  }

  getallposts(){
    return this._http.get('http://localhost:3200/getAllPosts');
  };

  addNewLike(new_like){
    return this._http.post('http://localhost:3200/addLike', new_like);
  }

  disLike(remove_like){
    return this._http.post('http://localhost:3200/disLike', remove_like);
  }
}
