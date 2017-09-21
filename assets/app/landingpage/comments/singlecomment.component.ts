import { Component,Input, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Comment } from "../comment.model";
import { CommentService } from "./comment.service";
import { Image } from "../image.model";
import { GlobalApp } from "../../global";
import { Router } from "@angular/router";


@Component ({
  selector: 'app-comment',
  templateUrl: './singlecomment.component.html',
  styles: [`

  button {

    border: none;
  }

    .colorRed {
      color: red;
        background-color: #ffffff;
      bordor: none;
    }

    .colorBlue{
      color: #0066cc;
      background-color: #ffffff;
      border: none;
    }

   .line {
     width: 100%;
     height: 47px;
     border-bottom: 0.2px ridge #ccccff;
}
.go {
  overflow: hidden;

  text-overflow: ellipsis;
  word-wrap: break-word;
  display: block;

}

#b {
  font-size: 17px;
  margin-left: -1em;
  color : #0066cc;
  display : inline-block;
}

.pro{
  font-size: 10px;
  border: 0 none;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  display : inline-block;
  margin-left : 1em;
  color : #0066cc;
}

.config {
  margin-right: 0.5em;
    margin-top: 1em;
    margin-bottom: -1em;
  display: inline-block;
  text-align: right;
  font-size: 12px;
  width: 100%;
}


`],

  providers: [ GlobalApp ]
})

export class SingleComment implements OnInit {
    @Input() comment: Comment;

    blue = 'blue';
    red = 'red';


    constructor(private commentService: CommentService,
                public globalapp: GlobalApp,
                private router: Router) {

                }

    ngOnInit() {

    }

    onEdit() {
      this.commentService.editComment(this.comment);
    }

    onDelete(){
      this.commentService.deleteComment(this.comment)
        .subscribe(
          result => console.log(result)
        );
    }

    belongsToUser() {
      return localStorage.getItem('userId') == this.comment.userId;
    }

    addCommentLike() {

      this.commentService.updateCommentLikes(this.comment, localStorage.getItem('userId'))
      .subscribe(
        result => {


          this.comment.likedbyuser = result.obj.likedbyuser;
          this.comment.likes = result.obj.likes
          console.log(this.comment.likedbyuser);
        },
        error => console.error(error.error)

      );
    }

    gotoProfile(){
      this.router.navigate(['/icon', 'profile', this.comment.userId]);
      location.reload();

    }
}
