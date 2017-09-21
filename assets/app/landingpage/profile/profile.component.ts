import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../auth/user.model';
import { Image } from "../image.model";
import { ImageService } from "../image.service";
import { Observable } from "rxjs";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { GlobalApp } from '../../global';
import { FriendsService } from '../friend.service';
import 'rxjs/add/operator/map';
import { Friend } from "../friend.model";
import { Location } from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ GlobalApp ]
})

export class ProfileComponent implements OnInit, OnDestroy {
  profileimages: Image[] = [];
//  public id = new Observable<string>();
  public profileimg: Image;
  public friendFromOtherUser: Friend = null;
  public friend: Friend = null;
  private valid: boolean = true;
  public id: any;
  tab: number = 1;
  private sub: any;
  user: User;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
            private imageService : ImageService,
            public globalapp: GlobalApp,
            private friendsService : FriendsService,
            private location: Location
            ) {
          /*  this.id = activatedRoute.params.map(p => p.id);
            console.log(this.id.destination._value.id)
            console.log(this.id)
            this.go=this.id.destination._value.id */

              }

  ngOnInit() {

  this.sub = this.activatedRoute.params.subscribe(params => {

this.id = params['id']
this.tab = 1;
this.imageService.getProfileImage(this.id)
       .subscribe(
         (profileimage: Image) => {
           this.profileimg=profileimage
           console.log(this.profileimg),
           () => console.log('fetched iamge')
         }
 );
 this.friendsService.getUser(this.id)
      .subscribe(
        (user: User) => {
          this.user = user;
          console.log(this.user)
        }

      );
 this.friendsService.getFriend(this.id)
     .subscribe(
       (friend: Friend) => {
         this.friend=friend
         console.log(friend)
   /*      if (friend==null && this.friendFromOtherUser==null) {
           this.valid = true;
         } else if (this.friend!=null) {
           this.valid = true;
         }
         */

       }
   );

   this.friendsService.getFriendFromOtherUser(this.id)
       .subscribe(
         (friendFromOtherUser: Friend) => {
           this.friendFromOtherUser=friendFromOtherUser
           console.log(this.friendFromOtherUser)

         }
     );


});

this.imageService.changeProfileImage
    .subscribe(
        (image : Image) => {
          console.log(image)

          this.imageService.getProfileImage(image.userId)
                 .subscribe(
                   (profileimage: Image) => {
                     this.profileimg=profileimage
                     console.log(this.profileimg),
                     () => console.log('fetched iamge')
                   }
           );




        });




    }

  ngOnDestroy() {
    this.sub.unsubscribe();

  }

  isValid() {
    return this.valid;
  }

  onAddFriend() {
    console.log(this.friend)
    this.friendsService.addFriend(this.id)
    .subscribe(
      data => {
      console.log(data),
      error => console.log(error),

        this.friendsService.getFriend(this.id)
            .subscribe(
              (friend: Friend) => {
                this.friend=friend
                console.log(this.friend)
              }
          );

        this.friendsService.getUser(this.id)
             .subscribe(
               (user: User) => {
                 this.user = user;
                 console.log(this.user)
               }

             );
      });


  }

  onDelete() {
    if (this.friend.status!='null') {
    this.friendsService.deleteUserFromFriends(this.friend)
      .subscribe(
        result => {
         console.log(result),
        error => console.log(error),

          this.friendsService.getFriend(this.id)
              .subscribe(
                (friend: Friend) => {
                  this.friend=friend
                  console.log(this.friend)
                }
            );

          this.friendsService.getUser(this.id)
              .subscribe(
                (user: User) => {
                  this.user = user;
                  console.log(this.user)
                }

              );
        });

      } else if (this.friendFromOtherUser.status!='null') {

        this.friendsService.deleteUserFromFriends(this.friendFromOtherUser)
          .subscribe(
            result => {
             console.log(result),
            error => console.log(error),

              this.friendsService.getFriend(this.id)
                  .subscribe(
                    (friendFromOtherUser: Friend) => {
                      this.friendFromOtherUser=friendFromOtherUser
                      console.log(this.friendFromOtherUser)

                    }
                );

              this.friendsService.getUser(this.id)
                  .subscribe(
                    (user: User) => {
                      this.user = user;
                      console.log(this.user)
                    }

                  );
            });

      }



}


  onAcceptFriend() {

    this.friendsService.acceptFriend(this.friendFromOtherUser)
    .subscribe(
        result => {
        console.log(result),

        error => console.log(error),

          this.friendsService.getFriendFromOtherUser(this.id)
              .subscribe(
                (friendFromOtherUser: Friend) => {
                  this.friendFromOtherUser=friendFromOtherUser
                  console.log(this.friendFromOtherUser)
                }
            );
            this.friendsService.getUser(this.id)
                .subscribe(
                  (user: User) => {
                    this.user = user;
                    console.log(this.user)
                  }

                );


      });

  }


/*
  navPhotos() {
        this.router.navigate(['/icon','profile', this.id, 'photos'])
  }

  navFriends() {
    this.router.navigate(['/icon','profile', this.id, 'friends'])
  }
  */
  setTab(num: number) {
    this.tab = num;
  }


}
