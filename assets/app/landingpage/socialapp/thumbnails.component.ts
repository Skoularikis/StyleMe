import { Component, OnInit } from "@angular/core";
import { FriendsService } from '../friend.service';
import { Image } from "../image.model";
import { ImageService } from "../image.service";
import { Friend } from "../friend.model";
import {Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/Rx'
import { Http, Headers, Response } from "@angular/http";
import { OrderByPipe } from './orderby.pipe';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-thumbnails',
  template: `
  <div class="notgetover"></div>


  <app-thumbnail

  [friend]="friend"
  *ngFor="let friend of friends"
  ></app-thumbnail>



  `,
  styles: [`
    .notgetover {
      margin-top: 7em;
    }
    `]
})




export class ThumbNailsComponent implements OnInit {
    public images: Image[] = [];
    id: any;
    friends: Friend[];




    token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
            private imageService : ImageService,
            private friendsService : FriendsService,

            ) {
          /*  this.id = activatedRoute.params.map(p => p.id);
            console.log(this.id.destination._value.id)
            console.log(this.id)
            this.go=this.id.destination._value.id */
            this.activatedRoute.params.subscribe(params => {

            this.id = params['id']
            });

              }





    ngOnInit() {

                 this.friendsService.getFriends(this.id)
                       .subscribe(
                         (friends: Friend[]) => {
                         this.friends = friends
                        

                        }

                       );

    }




}
