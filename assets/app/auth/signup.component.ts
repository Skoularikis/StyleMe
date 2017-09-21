import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Location } from "@angular/common";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
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



      }
      img {
        /* Set rules to fill background */
        min-height: 20%;
        min-width: 20%;

        /* Set up proportionate scaling */
        width: 20%;
        height: 20%;
        visibility: hidden;
      }

      .thumbnail {
        letter-spacing: 1px;
        background-color:  #e6ffff;
        padding: 2em;
      }





      `],
      providers: [ Location ]
})
export class SignupComponent implements OnInit {
  fullImagePath = '/assets/images/back.jpeg'

    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router, private location: Location) {}

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data => this.router.navigate(['/auth', 'signin']),
                error => console.error(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    linkToProSignUp() {
      this.router.navigate(['/auth', 'signuppro']);

    }
}
