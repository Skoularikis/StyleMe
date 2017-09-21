import { Component, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Image } from "../image.model";
import { ImageService } from "../image.service";
import { FriendsService } from '../friend.service';
import { Friend } from "../friend.model";
import { GlobalApp } from '../../global';

@Component({
  selector: 'app-user-friends',
  template: `
  <div class="notgetover"></div>
    <div class="thumbnail">
  <div class="container">
    <div class="row">
<h4>Friends </h4>
<button type="button" class="btn btn-default" (click)="setTab(1)">Accepted</button>

<button type="button" class="btn btn-default" *ngIf="id===globalapp.localStorageItem()" (click)="setTab(2)">Requested</button>
<button type="button" class="btn btn-default" *ngIf="id===globalapp.localStorageItem()" (click)="setTab(3)">Your requests</button>

  <hr>
<div [ngSwitch]="tab">
<span *ngSwitchCase="1">
<app-user-friend
[friends]="friends"></app-user-friend>
</span>

<span *ngSwitchCase="2">
     <app-user-friend-req [friend]="friend"
                        (friends)="onAfter($event)"
                       *ngFor="let friend of friends">>Tab content 2</app-user-friend-req>
   </span>
<span *ngSwitchCase="3">
  <app-user-friend-urreq [friend]="friend"

      *ngFor="let friend of friends">>Tab content 2</app-user-friend-urreq>
</span>
   </div>




    </div>
  </div>
  </div>

  `,
  styles: [`
    .notgetover {
      margin-top: 7em;
    }

    `],
    providers: [ GlobalApp ]
})

export class FriendsComponent {
  profileimages: Image[];
  idfriend: string = '';
  friends: Friend[];
  id : any;
  tab: number = 1;


  constructor(
              private activatedRoute: ActivatedRoute,
                private router: Router,
              private imageService : ImageService,
                public globalapp: GlobalApp,
              private friendsService : FriendsService) {



              }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

this.id = params['id']
this.tab = 1;
this.friendsService.getFriends(this.id)
  .subscribe(
    (friends: Friend[]) => {
      console.log(friends);
      this.friends = friends;
      //this.reqfriends = reqfriends;
  //  this.urreqfriends = urreqfriends;
  }

  );

});
    }


    setTab(num: number) {
      this.tab = num;
    }

    onAfter(friends: Friend[]) {
      console.log(friends)
      this.friends = friends;
    }


}
