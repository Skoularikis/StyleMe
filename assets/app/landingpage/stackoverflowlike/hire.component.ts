import { Component, Input, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from "rxjs";
import { ProService} from "../pro.service";
import { User } from "../../auth/user.model";
import { ImageService } from "../image.service";
import { Image } from "../image.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GlobalApp } from "../../global";

@Component({
  selector: 'app-hire',
  template: `
  <div class="notgetover"></div>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-2">
      <div class="thumbnail" id="ad" >

              <img *ngIf="profileimage?.content == null"src="/assets/images/profile.png" alt="add profiel image"/>

            <img *ngIf="profileimage?.content != null" [attr.src]="profileimage?.content" alt="hasimage"/>



    </div>

  </div>
    <div class="col-md-4" id="asd" >
  <h3 [ngStyle]="{'display' : 'inline-block'}">{{proUser?.firstName}} {{proUser?.lastName}}</h3>
  <h5> Job Description: <strong>{{proUser?.jobdesc}}</strong> </h5>


  </div>
  <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <h4> A few words about me</h4>
        <article class="panel panel-default" >
          <div class="panel-body">
            <div class="go">
            <p>{{proUser?.fewWords}}</p>

          </div>



      </div>
      </article>
      <hr>

      <button *ngIf="proUser?._id!==globalapp.localStorageItem()" type="button"  class="btn btn-primary" (click)="shown = true" [ngStyle]="{'margin-bottom': '2em', 'width': '20%', 'font-weight':'bold', 'letter-spacing' : '1px'}"> Hire Now! </button>

      <div *ngIf="shown == true">
      <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="salary">Salary</label>
          <input type="text" id="salary" class="form-control" formControlName="salary">
        </div>
        <div class="form-group">
          <label for="jobdesc">Job Description</label>
          <input type="text" id="jobdesc" class="form-control" formControlName="jobdesc">
        </div>
        <button class="btn btn-primary"
                type="submit"
                (click)="alertedforOtherApp()"
                [disabled]="!myForm.valid">Submit</button>
      </form>
          </div>
  </div>
  </div>

  `,
  styles: [`
    img {
      width: 400px;
      height: 400px;
    }
    .notgetover {
      margin-top: 7em;
    }
    #asd {
      letter-spacing: 1px;
      margin-top: 20em;
    }
    .go {
      overflow: hidden;

      text-overflow: ellipsis;
      word-wrap: break-word;
      display: block;

  }
    `],
    providers: [ GlobalApp ]
})

export class HireComponent implements OnInit  {
    isvisible: boolean = false;
    public id: any;
    proUser: User;
    profileimage: Image;
    shown: boolean = false;
    myForm: FormGroup;
    public jobdesc: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private proService: ProService,
              private imageService: ImageService,
              public globalapp: GlobalApp) {

    this.activatedRoute.params.subscribe(params => {

this.id = params['id']
this.jobdesc = params['jobdesc']
  });
}


  ngOnInit() {
    this.proService.getHireUser(this.id)
        .subscribe(
          (proUser: User) => {
            this.proUser=proUser
            console.log(this.proUser),
            () => console.log('fetched iamge')
          }
        );
        this.imageService.getProfileImage(this.id)
               .subscribe(
                 (profileimage: Image) => {
                   this.profileimage=profileimage
                   console.log(this.profileimage),
                   () => console.log('fetched iamge')
                 }
         );

         this.myForm = new FormGroup({
             salary: new FormControl(null, Validators.required),
             jobdesc: new FormControl(null, Validators.required),
         });

  }

  alertedforOtherApp(){
    alert('Hire Complete!!! See results on another app');
  }




}
