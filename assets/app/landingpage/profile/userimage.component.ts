import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import {DropdownModule} from "ngx-dropdown";
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { Image } from "../image.model";
import { ImageService } from "../image.service";
import { GlobalApp } from "../../global";
import { CommentService } from "../comments/comment.service";

@Component({
  selector: 'app-user-image',
  template: `
  <div class="col-sm-3">
    <div class="thumbnail" >
      <img [attr.src]="profileimage.content" id="asd"  alt="Image" >
        <h5><strong> {{profileimage?.desc}} </strong>


        <div class="dropdown" dropdown [dropdownToggle]="false" *ngIf="belongsToUser()">
    <span class="pull-right">
      <span class="glyphicon glyphicon-menu-down" aria-hidden="true" dropdown-open>
      </span>
      </span>
    <ul class="dropdown-menu" id="right" >
        <li><button type="button" class="btn btn-link" (click)="onEdit()">Become profile image</button> </li>
        <li><button type="button" class="btn btn-link" (click)="onDelete()">Delete image</button> </li>

    </ul>
    </div>

        </h5>


        <div class="config">
        <button type="button" class="btn btn-primary btn-sm" (click)="getImage()">Comments</button>

        <button [ngClass]="{'btn btn-danger btn-lg outline' : profileimage?.likedbyuser.indexOf(globalapp.localStorageItem()) > -1, 'btn btn-link' : profileimage?.likedbyuser.indexOf(globalapp.localStorageItem()) == -1 }" type="button"   (click)="addlike()"> Like <span class="badge"><strong>{{profileimage?.likes}}</strong></span></button>

          </div>
    </div>
  </div>

  `,
  styleUrls:['./userimage.component.css'],
  providers: [ GlobalApp ]
})

export class UserImageComponent implements OnInit {
  @Input() profileimage: Image;
  @Input() id : string= '';



//  @Output() editLikes = new EventEmitter<number>();

//  color : string;
  colorme : string = '#0066ff';


  constructor(private imageService : ImageService,
              private router: Router,
              public globalapp: GlobalApp,
            private commentService: CommentService) {

            }

  ngOnInit() {
    this.imageService.likesEdit
        .subscribe(
            (image : Image) => {
                this.profileimage = image;

                console.log(this.profileimage);
              }
            );

  }

  onEdit() {

    this.imageService.updateProfileImage(this.profileimage)
        .subscribe(
          (profileimage: Image) => {
            console.log('Yea'),
            () => {
              console.log('GAMWTO')
            }
          }
        );
  }

  onDelete() {
    this.imageService.deleteImage(this.profileimage)
      .subscribe(
        result => console.log(result),
        error => console.log(error),
        () => console.log('Gamwto')
      );
  }

  addlike() {

    this.imageService.updateLikes(this.profileimage, localStorage.getItem('userId'))
    .subscribe(
      result => {

        this.profileimage.likes = result.obj.likes;
        this.profileimage.likedbyuser = result.obj.likedbyuser;

      },
      error => console.error(error.error)

    );
  }

  belongsToUser() {
    return localStorage.getItem('userId') == this.profileimage.userId;
  }

  getImage() {

    console.log(this.profileimage)
    this.commentService.toggleImage(this.profileimage);

    this.imageService.getImageAfterLike(this.profileimage)
        .subscribe(
          (profileimage: Image) => {

          this.profileimage = profileimage,
          console.log(this.profileimage)


        }
      );


  }

}
