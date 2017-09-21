import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from "rxjs";
import { User } from "../../auth/user.model";
import { ProService} from "../pro.service";

@Component({
  selector: 'app-after-pro-search',
  template: `

  <div class="notgetover"></div>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
  <h4 [ngStyle]="{'display':'inline-block'}"> Result after searching for:  {{jobdesc}} </h4>
  <button [ngStyle]="{'width': '15%', 'font-weight':'bold', 'letter-spacing' : '1px', 'text-transform':'uppercase','float':'right','display':'inline-block'}" type="button" class="btn btn-primary" [routerLink]="['/icon','career',id]" > Unfilter </button>
  </div>
</div>
      </div>
  <app-users-after-search *ngFor="let user of usersbyJob"
  [user]="user">

</app-users-after-search>

  `,
  styles: [`
    .notgetover {
      margin-top: 4em;
    }

    `]
})

export class AfterSearchComponent implements OnInit {
  id: any;
  jobdesc: any
  usersbyJob: User[] = [];
  poso = 0;

  constructor(private router: Router, private proService: ProService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      this.id = params['id']
      this.jobdesc = params['jobdesc']
      console.log(this.id, this.jobdesc)
      this.proService.getUsersbyJobDesc(this.jobdesc)
      .subscribe(
        (proUsers: User[]) => {
          this.usersbyJob=proUsers
          console.log(this.usersbyJob);
          console.log(proUsers)
        }
      );
            });
  }





}
