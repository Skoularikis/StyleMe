import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  template: `
   
    <router-outlet></router-outlet>
  `
})

export class LandingPageComponent {
  content = 'Landing Page Works';
  fullImagePath: string;
  mypicture = "images.jpeg";


  constructor() {
    this.fullImagePath = "/assets/images/images.jpeg";
  }
}
