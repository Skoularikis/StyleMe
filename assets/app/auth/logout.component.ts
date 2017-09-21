import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { ImageService } from '../landingpage/image.service';
import { Location } from "@angular/common";

@Component ({
    selector: 'app-logout',
    template: `
    <div class="notgetover"></div>
     <div class="col-md-8 col-md-offset-2">
        <h4> Are you sure you want to log out?</h4>

        <button class="btn btn-danger" (click)="onLogout()">Yes</button>
          <button class="btn btn-success" (click)="navLand()">No</button>
     </div>
    `,
    styles: [`
      .notgetover {
        margin-top: 2em;
      }
    `],
    providers: [ ImageService ],

})
export class LogoutComponent {

    constructor(private router: Router,
                private authService: AuthService,
                private imageService: ImageService,
                private location: Location) {}

    onLogout() {

      this.imageService.imagesofFriends = null;
      console.log(this.imageService.imagesofFriends)
      this.authService.logout();
      this.router.navigate(['/auth', 'signin']);

    }

    navLand() {
      this.router.navigate(['/icon','simple', localStorage.getItem('userId')])

    }
}
