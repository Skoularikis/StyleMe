import { Component, Input, OnInit } from '@angular/core';

import { Image } from "../image.model";
import { ImageService } from "../image.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from "rxjs";
import { Location } from "@angular/common";
import { ProService } from "../pro.service";
import { User } from "../../auth/user.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-job-desc',
  template:`
    <div class="notgetover"></div>
      <div class="container">
  <div class="row">
  <button type="button" class="btn btn-default" (click)="shown = '1'">Your current Job Description</button>

  <button type="button" class="btn btn-default"  (click)="shown = '2'">Update your Job Description</button>
  <div class="notget"></div>
  <div *ngIf="shown == '1'">
  <div class="row">
  <article class="panel panel-default" [ngStyle]="{'word-wrap': 'break-word'}">
    <div class="panel-body" >
        <div class="go">
      <p >{{proUser?.fewWords}}</p>
        </div>
      </div>



</article>
</div>
  </div>
  <div *ngIf="shown == '2'">
  <article class="panel panel-default" >
    <div class="panel-body">
      <div class="author">
      <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
          <label for="fewWords">Job Description</label>
          <textarea rows="5" type="text" id="fewWords" class="form-control" formControlName="fewWords"></textarea>
          </div>
        <button class="btn btn-primary"
                type="submit"
                [disabled]="!myForm.valid">Submit</button>
      </form>
    </div>



</div>
</article>

  </div>
  </div>
  </div>
  `,
  styles: [`
    .notgetover {
      margin-top: 7em;
    }
    .notget {
      margin-top: 2em;
    }
    #fewWords{
      height: 60px;

    }
    .go {
      overflow: hidden;

      text-overflow: ellipsis;
      word-wrap: break-word;
      display: block;

    }
    `]
})

export class JobDescComponent implements OnInit {
  proUser: User;
  id: any;
  shown: string = '1';
  myForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
            private proService : ProService) {

                }

      onSubmit() {
          const user = new User(
            this.proUser.email,
            null,
            this.proUser.firstName,
            this.proUser.lastName,
            this.proUser.jobdesc,
            null,
            this.proUser._id,
            this.myForm.value.fewWords
          );
          this.proService.updatefewWords(user)
                        .subscribe(
                  data => console.log(data),
                  error => console.error(error),
                  () => {
                    this.proService.getHireUser(this.id)
                        .subscribe(
                          (proUser: User) => {
                            this.proUser=proUser
                            console.log(this.proUser),
                            () => console.log('fetched iamge')
                          }
                        );
                  }
                        );
            this.myForm.reset();
        }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

this.id = params['id']
this.proService.getHireUser(this.id)
    .subscribe(
      (proUser: User) => {
        this.proUser=proUser
        console.log(this.proUser),
        () => console.log('fetched iamge')
      }
    );
    this.myForm = new FormGroup({
        fewWords: new FormControl(null, Validators.required),
    });
});

  }


}
