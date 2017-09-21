import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AuthService } from "./auth/auth.service";
import { HeaderComponent } from "./header.component";
import { HomePageComponent } from "./homepage.component";
import { LandingPageComponent } from "./landingpage/landingpage.component";
import { GlobalApp } from "./global";
import { FriendSearchComponent } from "./landingpage/socialapp/friend-search.component";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";


@NgModule({
    declarations: [
      AppComponent,
      AuthenticationComponent,
      HeaderComponent,
      HomePageComponent,
      LandingPageComponent,
      FriendSearchComponent,
      ErrorComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing
    ],

    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
