import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../auth/post/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() post;
  // likes: any = {
  //   likedBy: this._auth.checkLogin()
  // };
  totalLikes: any;
  checkUser: any = this._auth.checkLogin();
  constructor(private _postService: PostService, private _auth: AuthService) { }

  ngOnInit() {
  }

  addLike() {
    // this.likes._id = this.post._id;
    this._postService.addNewLike({
      likedBy: this._auth.checkLogin(), _id: this.post._id
    }).subscribe((data: any) => {
      // console.log(this.post.likes);
      if (data.flg) {
        this.post.likes.push(this._auth.checkLogin());
      }
    });
  }
  dislike() {
    this._postService.disLike({
      likedBy: this._auth.checkLogin(), _id: this.post._id
    }).subscribe((data: any) => {
      if (data.flg) {
        this.post.likes.splice(this.post.likes.indexOf(this.checkUser), 1);
      }
    });
  }
}
