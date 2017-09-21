import { Component, Input, EventEmitter, Output, ElementRef, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ProService} from "../pro.service";
import { User } from "../../auth/user.model";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Location } from "@angular/common";
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinct';




@Component({
  selector: 'app-pro-search',
  template: `
  <input #searchBox id="search-box" ngModel [ngStyle]="{'display' : 'inline-block'}" (keyup.enter)="search(searchBox.value)" (keyup)="search(searchBox.value)" class="form-control" placeholder="Search for professionals by job description"/>
    <div>
    <div *ngFor="let user of users | async"
          (click)="gotoDetail(user)" class="form-control" [ngStyle]="{'width' : '40%'}" >
        <button class="go">{{user.jobdesc}}</button>
    </div>
      </div>



  `,
  styles: [`
    .notgetover {
      margin-top: 1em;
    }
    .go {
      border: none;
      color: #000000;
      background-color: #ffffff;

          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 2px;


    }

    .search-result{
    border-bottom: 1px solid gray;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    width:295px;
    height: 20px;
    padding: 5px;
    background-color: white;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    }

    #search-box{
    width: 300px;
    height: 40px;


    }
    `]

})

export class ProSearchComponent implements OnInit  {

  users: Observable<User[]>;
  private searchTerms = new Subject<string>();
  usr: User;


  constructor(private proService: ProService, private router: Router, private location: Location) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  backClicked() {

    if (this.usr != undefined) {

    this.router.navigate(['/icon', 'career', this.usr._id]);

    }
  }



ngOnInit() {
    this.users = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()
        // ignore if next search term is same as prev
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.proService.search(term)
        // or the observable of empty books if no search term
        : Observable.of<User[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<User[]>([]);
      });
      console.log(this.users)
  }

  gotoDetail(user: User) {
    this.usr = user;
    this.router.navigate(['icon', 'career', this.usr._id, 'jobdesc', this.usr.jobdesc])
  }


}
