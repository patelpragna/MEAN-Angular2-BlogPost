import { PostService } from './../auth/post/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  allPost:any = {};
  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.getallposts().subscribe((data:any)=>{
      this.allPost = data.doc;
    });
  }

}
