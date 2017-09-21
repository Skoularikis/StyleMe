import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { SigninComponent } from "./signin.component";
import { SignupComponent } from "./signup.component";
import { LogoutComponent } from "./logout.component";
import { SignUpProComponent } from "./signuppro.component";
import { authRouting } from "./auth.routing";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        LogoutComponent,
        SignUpProComponent,

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        authRouting,
        FormsModule,
        HttpModule,
      
    ]
})
export class AuthModule {

}
