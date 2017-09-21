import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import {DropdownModule} from "ngx-dropdown";
import { Location } from '@angular/common';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Image } from "../image.model";
import { ImageService } from "../image.service";
import { GlobalApp } from "../../global";
import { FriendsService } from '../friend.service';
import { Friend } from "../friend.model";

@Component({
  selector: 'app-user-friend-req',
  template: `
  <div *ngIf="friend?.friendId===globalapp.localStorageItem()">
  <div *ngIf="friend?.status =='pending' && friend?.statusUser == 'requested'" >
  <div class="col-md-4">

      <img *ngIf="profileimg?.content == null"src="/assets/images/profile.png" alt="add profiel image" (click)="goToProfile()"/>

        <img *ngIf="profileimg?.content != null" [attr.src]="profileimg?.content" alt="hasimage" (click)="goToProfile()"/>

        <h4>  {{profileimg?.firstName}} {{profileimg?.lastName}}</h4>
        <button  type="button" class="btn btn-primary" (click)="onAcceptFriend()">Accept<strong> {{profileimg?.firstName}} {{profileimg?.lastName}}</strong> to friends</button>
        <button  type="button" class="btn btn-primary" (click)="onDelete()"> Reject  <span class="glyphicon glyphicon-remove"></span></button>

</div>
</div>
</div>

  `,
  styles: [`
    .notgetover {
      margin-top: 7em;
    }

    #ad {

    }

    img {
      max-width: 300px;
      height: auto;
    }


    `],
    providers: [ GlobalApp ]

})

export class FriendReqComponent implements OnInit {
  @Input() friend: Friend;
  profileimg: Image;
  id: any;
  loc: Location;
  @Output() friends: EventEmitter<Friend[]> = new EventEmitter<Friend[]>();

  constructor(private imageService: ImageService,
  private router: Router,
  private location: Location,
  private activatedRoute: ActivatedRoute,
  public globalapp: GlobalApp,
  private friendsService: FriendsService)
  {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

this.id = params['id']
if (this.id == this.friend.userId) {
this.imageService.getProfileImage(this.friend.friendId)
     .subscribe(
       (profileimage: Image) => {
         this.profileimg=profileimage
         console.log(this.profileimg)

       }
     );
} else if (this.id == this.friend.friendId) {
   this.imageService.getProfileImage(this.friend.userId)
          .subscribe(
            (profileimage: Image) => {
              this.profileimg=profileimage
              console.log(this.profileimg)

            }
          );
        }

});

  }

  goToProfile() {
    this.router.navigate(['/icon','profile', this.profileimg.userId])

  }

  onDelete() {

    this.friendsService.deleteUserFromFriends(this.friend)
      .subscribe(
        result => {
         console.log(result),

        error => console.log(error)

          this.friendsService.getFriendFromOtherUser(this.friend.userId)
              .subscribe(
                (friendFromOtherUser: Friend) => {
                  this.friend=friendFromOtherUser
                  console.log(this.friend)

                }
            );

          this.friendsService.getFriends(this.id)
            .subscribe(
              (friends: Friend[]) => {
                console.log(friends);
                this.friends.emit(friends);
                //this.reqfriends = reqfriends;
            //  this.urreqfriends = urreqfriends;
            }

            );
        });



}


  onAcceptFriend() {

    this.friendsService.acceptFriend(this.friend)
      .subscribe(
        result => {
         console.log(result),



          this.friendsService.getFriendFromOtherUser(this.friend.userId)
              .subscribe(
                (friendFromOtherUser: Friend) => {
                  this.friend=friendFromOtherUser
                  console.log(this.friend)

                }
            );


      this.friendsService.getFriends(this.id)
        .subscribe(
          (friends: Friend[]) => {
            console.log(friends);
            this.friend=null;
            this.friends.emit(friends);

            //this.reqfriends = reqfriends;
        //  this.urreqfriends = urreqfriends;
        }
      )
      });
  }
}
