import { Component } from '@angular/core';

import { Router } from "@angular/router";

@Component ({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styles: [`
    .notgetover {
      margin-top: 2em;
    }
    h1 h3 {
      position: absolute;
   top: 200px;
   left: 0;
   width: 100%;
    }
    .go {
      background-image: url('/assets/images/back.jpeg');
      background-repeat: no-repeat;
      background-position: center center;
      background-attachment: fixed;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;


    }
    img {
      /* Set rules to fill background */
      min-height: 100%;
      min-width: 1024px;

      /* Set up proportionate scaling */
      width: 100%;
      height: auto;
      visibility: hidden;
    }

    #bot {
      bottom: 40%;
      margin-bottom: 20em;
    }
    .txt {
      margin-top: 15%;

      float: center;
    }

    `]

})


export class HomePageComponent {
  fullImagePath = '/assets/images/back.jpeg'

  constructor(private router: Router) {}

  navUp() {
    this.router.navigate(['/auth', 'signup'])
  }
}
