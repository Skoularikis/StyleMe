import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Image } from "../image.model";
import { ImageService } from "../image.service";
import { Location } from '@angular/common';
import { Friend } from "../friend.model";
import { GlobalApp } from "../../global";
import { CommentService } from '../comments/comment.service';

@Component({
  selector: 'app-likecomment',
  template: `
  <div class="config">
  <button type="button" class="btn btn-primary btn-xs" (click)="getImage()">Comment</button>
  <button [ngClass]="{'btn btn-danger btn-lg outline' : profileimg?.likedbyuser.indexOf(globalapp.localStorageItem()) > -1, 'btn btn-link' : profileimg?.likedbyuser.indexOf(globalapp.localStorageItem()) == -1 }" type="button"   (click)="addlike()"> Like <span class="badge"><strong>{{profileimg?.likes}}</strong></span></button>


    </div>

  `,
  styleUrls: ['./likecomment.component.css'],
  providers: [ GlobalApp ]
})



export class LikeComment {
  @Input() profileimg: Image;

  j = 0;

  @Output() editLikes = new EventEmitter<number>();

  constructor(private imageService : ImageService,
              private location: Location,
               public globalapp: GlobalApp,
              private commentService: CommentService)  {}

  ngOnInit() {
    this.imageService.likesEdit
        .subscribe(
            (image : Image) => {
                this.profileimg = image;

                console.log(this.profileimg);
              }
            );
  }

  addlike() {

    this.imageService.updateLikes(this.profileimg, localStorage.getItem('userId'))
    .subscribe(
      result => {

        const length = result.obj.likedbyuser.length;
        this.profileimg.likedbyuser = result.obj.likedbyuser;
        this.profileimg.likes = result.obj.likes
        console.log(this.profileimg.likedbyuser)

      },
      error => console.error(error.error),

    );
  }

  getImage() {
    this.commentService.toggleImage(this.profileimg);

  }
}
