import { Component, Input, OnInit } from '@angular/core';

import { Image } from "../image.model";
import { ImageService } from "../image.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-images',
  templateUrl: './userimages.component.html',
  styles: [`
    .notgetover {
      margin-top: 7em;
    }

    `]
})

export class UserImagesComponent implements OnInit {
  profileimages: Image[];
  id: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
            private imageService : ImageService) {

                }




  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

this.id = params['id']
this.imageService.getProfileImages(this.id)
  .subscribe(
    (profileimages: Image[]) => {
      console.log(profileimages);
      this.profileimages = profileimages,
      console.log(this.profileimages)
      console.log(this.id)

    }
  );

});

  }

}
