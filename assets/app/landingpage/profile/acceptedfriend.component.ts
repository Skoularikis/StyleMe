import { Component, Input, OnInit } from '@angular/core';
import {DropdownModule} from "ngx-dropdown";
import { Location } from '@angular/common';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Image } from "../image.model";
import { ImageService } from "../image.service";
import { GlobalApp } from "../../global";
import { FriendsService } from '../friend.service';
import { Friend } from "../friend.model";






@Component({
  selector: 'app-accepted-friends',
  template: `
  <div *ngIf="friend?.status =='accepted' && friend?.statusUser =='accepted'" >
        <div class="col-md-4">

            <img *ngIf="profileimg?.content == null"src="/assets/images/profile.png" alt="add profiel image" (click)="goToProfile()"/>

              <img *ngIf="profileimg?.content != null" [attr.src]="profileimg?.content" alt="hasimage" (click)="goToProfile()"/>

              <h4>  {{profileimg?.firstName}} {{profileimg?.lastName}}</h4>

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


    `]

})

export class AcceptedFriendsComponent {
@Input() friend: Friend;
profileimg: Image;
id: any;
loc: Location;

constructor(private imageService: ImageService,
private router: Router,
private location: Location,
private activatedRoute: ActivatedRoute,
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
}
