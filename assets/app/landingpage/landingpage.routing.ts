import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile/profile.component";
import { ProfessionalComponent } from "./stackoverflowlike/professional.component";
import { SimpleUserTabComponent } from "./socialapp/simpleusertab.component";
import { UserImagesComponent } from "./profile/userimages.component";
import { FriendsComponent } from "./profile/friends.component";
import { AfterSearchComponent } from "./stackoverflowlike/aftersearch.component";
import { HireComponent } from "./stackoverflowlike/hire.component";
import { CommentImageComponent } from "./comments/commentimage.component";



const LANDING_ROUTES: Routes = [
    { path: '', redirectTo: 'simple/:id', pathMatch: 'full' },
    { path: 'simple/:id', component: SimpleUserTabComponent },
    { path: 'career/:id', component: ProfessionalComponent },
    { path: 'profile/:id', component: ProfileComponent},
    { path: 'profile/:id/comments', component: CommentImageComponent},
    { path: 'career/:id/jobdesc/:jobdesc', component: AfterSearchComponent},
  //  { path: 'profile/:id/comments', component: CommentImageComponent},
    { path: 'career/:id/:jobdesc', component: HireComponent}

];

export const landing_routing = RouterModule.forChild(LANDING_ROUTES);
