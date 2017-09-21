import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component ({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [`
    .thumbnail {
      letter-spacing: 1px;
      background-color:  #e6ffff;
      padding: 2em;
    }
    .notgetover {
      margin-top: 2em;
    }
    .my-btn {
      font-size: 30px;
    }
    .extra-class{
      background: black;
      color: white;
    }
    `],

})

export class SigninComponent {
  myForm: FormGroup;
  someProperty = true;
  aString: string

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.password);
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);

          this.router.navigate(['/icon', 'simple', localStorage.getItem('userId')]);
        },
        error => console.error(error)
      );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }


}