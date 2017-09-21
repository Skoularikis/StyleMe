import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signuppro',
    templateUrl: './signuppro.component.html',
    styles: [`
      .thumbnail {
        letter-spacing: 1px;
        background-color:  #e6ffff;
        padding: 2em;
      }
      .notgetover {
        margin-top: 4em;
      }

      `]
})
export class SignUpProComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.value.jobdesc
        );
        this.authService.signuppro(user)
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
            password: new FormControl(null, Validators.required),
            jobdesc: new FormControl(null, Validators.required)
        });
    }


}
