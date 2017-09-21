import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from "rxjs";
import { User } from "../../auth/user.model";
import { ProService} from "../pro.service";


@Component({
  selector: 'app-users-after-search',
  template: `
    <div class="notgetover"></div>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">


  <article class="panel panel-default" >
    <div class="panel-body">
      <div class="author">
      {{user?.firstName}}   {{user?.lastName}}
      </div>
      <div class="config" [ngStyle]="{'letter-spacing' : '1px'}">
      {{user?.jobdesc}}
      </div>
    </div>
    <footer class="panel-footer">
      <div class="author1">

      </div>
      <div class="config" *ngIf="!belongsToUser()">
      <button type="button" (click)="goHire()" class="btn btn-primary" [ngStyle]="{'width': '80%', 'font-weight':'bold', 'letter-spacing' : '1px', 'text-transform':'uppercase'}"> Hire </button>
      </div>
      <div class="config" *ngIf="belongsToUser()">
      <button type="button"  class="btn btn-primary" (click)="goHire()" [ngStyle]="{'width': '80%', 'font-weight':'bold', 'letter-spacing' : '1px', 'text-transform':'uppercase'}"> you </button>
      </div>
    </footer>
  </article>

    

  `,
  styles: [`
    .notgetover {
      margin-top: 4em;
    }
    .author {
      display: inline-block;

      font-size: 16px;
          color: #0066cc;
          font-weight: bold;
          letter-spacing: 1px;
      width: 80%;
    }
    .author1 {
      display: inline-block;
      ;
      font-size: 14px;

          font-weight: bold;
          letter-spacing: 1px;
      width: 80%;
    }
    .config {
      display: inline-block;
      text-align: right;
      font-size: 14px;

      width: 19%;
    }
 `  ]

})











export class UsersAfterSearchComponent{
  @Input() user: User;


  constructor(private router: Router) {

  }



  belongsToUser() {
    return localStorage.getItem('userId') == this.user._id;
  }

  goHire() {
      this.router.navigate(['/icon', 'career', this.user._id, this.user.jobdesc ]);
  }
}
