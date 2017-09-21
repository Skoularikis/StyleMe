import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Location } from '@angular/common'

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { User } from '../../auth/user.model';
import { FriendsService } from '../friend.service';
import { ImageService } from '../image.service';



@Component({
  selector: 'app-friend-search',
  templateUrl: 'friend-search.component.html',
  styleUrls: [ 'friend-search.component.css' ],

})

export class FriendSearchComponent implements OnInit {
  users: Observable<User[]>;
  private searchTerms = new Subject<string>();
  user: User;

  id: any;


  constructor(private friendsService: FriendsService,
            private imageService: ImageService,
            private location: Location,
            private router: Router,
          private activatedRoute: ActivatedRoute) {

             }

// Push a search term into the observable stream.
search(term: string): void {
  this.searchTerms.next(term);
}

ngOnInit() {
   this.activatedRoute.params
   .subscribe(params => {
      // get id from params
      this.id = +params['id'];
      console.log(this.id)

      // do whatever you want with id here

    });



  this.users = this.searchTerms
    .debounceTime(300)        // wait for 300ms pause in events
    .distinctUntilChanged()   // ignore if next search term is same as prev
    .switchMap(term => term   // switch to new observable each time
      // return the http search observable
      ? this.friendsService.search(term)
      // or the observable of empty books if no search term
      : Observable.of<User[]>([]))
    .catch(error => {
      // TODO: real error handling
      console.log(error);
      return Observable.of<User[]>([]);
    });
}



  gotoDetail(user: User): void {
  console.log(user)
  console.log(user._id)
  this.user = user;
  this.router.navigate(['/icon', 'profile', user._id]);




  //location.reload();
  }
}
