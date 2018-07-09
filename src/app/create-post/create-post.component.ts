import { PostService } from './../auth/post/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPost:any = {};
  constructor(private _postService: PostService) { }

  ngOnInit() {
  }

  submitPost(){
    this._postService.create(this.createPost);
  }
}
