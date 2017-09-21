import { Component, Input, Attribute } from "@angular/core";

import { Image } from "../image.model";
import { ImageService } from "../image.service";
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Friend } from "../friend.model";

@Component({
  selector: 'app-thumbnail',
  templateUrl: "./thumbnail.component.html"

})



export class ThumbNailComponent  {


	@Input() friend: Friend;
  profileimgwithdates : Image[] = [];
  id: any;

    constructor(private imageService : ImageService, private activatedRoute: ActivatedRoute,
                private router: Router,) {

    }

    ngOnInit() {
      this.activatedRoute.params.subscribe(params => {

      this.id = params['id']

if  (this.id == this.friend.userId && this.friend.status!='pending') {
 this.imageService.getProfileImagesWithDate(this.friend.friendId)
   .subscribe(
     (profileimageswithdate: Image[]) => {


       this.profileimgwithdates = profileimageswithdate

     }
   );
 } else if (this.id == this.friend.friendId && this.friend.status!='pending') {
   this.imageService.getProfileImagesWithDate(this.friend.userId)
   .subscribe(
     (profileimageswithdate: Image[]) => {


       this.profileimgwithdates = profileimageswithdate


     }
   );
 }
     });



  }

}
