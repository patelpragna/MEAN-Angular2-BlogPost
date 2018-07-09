import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../auth/post/post.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() post;
  // allComments:any = [];
  displayComment:Boolean = false;
  newComment:any = {
    commentBy: this._auth.checkLogin(),
    text: ""
  };
  constructor(private _postService:PostService, private _auth : AuthService) { }
  ngOnInit() {
  }
  addComment(){
    this.newComment._id = this.post._id; 
    this._postService.addNewComment(this.newComment).subscribe((data:any)=>{
      this.post = data[0];
    });
  }

  showComment(){
    this.displayComment = !this.displayComment;
  }
}
