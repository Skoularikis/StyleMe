import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from './auth/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { GlobalApp } from './global';
import { Location } from '@angular/common';
import { FriendsService } from './landingpage/friend.service';
import { ImageService } from './landingpage/image.service';

@Component({
  selector: 'app-header',
  template: `

  <nav [ngStyle]="{backgroundColor: colored, 'font-size': '17px'}" >
    <div class="container">
      <div class="row">

      <div class="nav navbar-nav navbar-left" >

        <div *ngIf="isLoggedIn()">
            <img [src]="fullImagePath" >
              </div>

      <div class="col-md-8">



      <div class="form-group" id="ad">
          <div *ngIf="isLoggedIn()">
            <app-friend-search> </app-friend-search>
                  </div>
      </div>
            </div>
      </div>


        <div class="nav navbar-nav navbar-right" [ngSwitch]="isLoggedIn()">
        <span *ngSwitchCase="false">
            <ul class="nav nav-pills" id="ad">

            <button type="button" [ngStyle]="{'border' : 'none', 'color' : '#ffffff', 'background' : 'none', 'font-weight' : 'bold','letter-spacing': '1px'}" [routerLink]="['/auth', 'signin']"> Sign In </button>
            <button type="button" [ngStyle]="{'border' : 'none', 'color' : '#ffffff', 'background' : 'none', 'font-weight' : 'bold','letter-spacing': '1px'}" [routerLink]="['/auth', 'signup']"> Sign Up </button>
            </ul>
        </span>
        <span *ngSwitchCase="true">
          <ul class="nav nav-pills" id="ad" >
            <button type="button" [ngStyle]="{'border' : 'none', 'color' : '#ffffff', 'background' : 'none', 'font-weight' : 'bold', 'letter-spacing': '1px'}" [routerLink]="['/icon', 'simple', globalapp.localStorageItem() ]"> Landing Page </button>
            <button type="button" [ngStyle]="{'border' : 'none', 'color' : '#ffffff', 'background' : 'none', 'font-weight' : 'bold', 'letter-spacing': '1px'}" [routerLink]="['/icon', 'career', globalapp.localStorageItem() ]"> Career </button>
            <button type="button" [ngStyle]="{'border' : 'none', 'color' : '#ffffff', 'background' : 'none', 'font-weight' : 'bold', 'letter-spacing': '1px'}" [routerLink]="['/icon', 'profile', globalapp.localStorageItem() ]"> Your Profile </button>
            <button type="button" [ngStyle]="{'border' : 'none', 'color' : '#ffffff', 'background' : 'none', 'font-weight' : 'bold', 'letter-spacing': '1px'}" [routerLink]="['/auth', 'logout']"> Log Out </button>
        <!--  <li  [routerLinkActive]="['active']"> <a [ngStyle]="{'font-weight': 'bold'}" type="button" class="btn btn-success" [routerLink]="['/icon','simple', globalapp.localStorageItem()]">Landing Page</a></li>
            <li  [routerLinkActive]="['active']"> <a [ngStyle]="{'font-weight': 'bold'}" type="button" class="btn btn-success" [routerLink]="['/icon','career', globalapp.localStorageItem()]">Find a job</a></li>
            <li  [routerLinkActive]="['active']"> <a [ngStyle]="{'font-weight': 'bold'}" type="button" class="btn btn-success" [routerLink]="['/icon','profile', globalapp.localStorageItem()]">Your Profile</a></li>

            <li  [routerLinkActive]="['active']"> <a [ngStyle]="{'font-weight': 'bold'}" type="button" class="btn btn-success" [routerLink]="['/auth', 'logout']">Log Out</a></li> -->
            </ul>


        </span>
          </div>
        </div>
      </div>
  </nav>

`,
  styleUrls: ['./header.component.css'],
  providers: [ GlobalApp, FriendsService, ImageService, Location ]
})

export class HeaderComponent implements OnInit, OnDestroy{

  colored =  '#337ab7';
  fullImagePath: string;
  private sub: any;
  id: any;


  constructor(private router: Router,
              private authService: AuthService,
              private globalapp: GlobalApp,
              private location: Location,
              private friendsService: FriendsService,
              private imageService: ImageService,
            private activatedRoute: ActivatedRoute) {
                 this.fullImagePath = '/assets/images/logo.png'
              }

  ngOnDestroy() {
    console.log(this.sub);
    this.sub.unsubscribe();

  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
  console.log(params) //log the entire params object
  console.log(params['id']) //log the value of id
  this.id = params['id']
  console.log(this.id)

        // do whatever you want with id here

      });

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();

  }

  navHome() {
    this.router.navigate(['/homepage']);
  }

  navLand() {
    this.router.navigate(['/icon','simple', this.globalapp.localStorageItem()])

  }

  navPro() {
    this.router.navigate(['/icon','career', this.globalapp.localStorageItem()])

  }

  navProfile() {
    this.router.navigate(['/icon','profile', this.globalapp.localStorageItem()])

  }
  navLogout() {
    this.router.navigate(['/auth', 'logout'])
  }

  navIn() {
    this.router.navigate(['/auth', 'signin'])
  }
  navUp() {
    this.router.navigate(['/auth', 'signup'])
  }

}
