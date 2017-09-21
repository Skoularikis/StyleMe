import { Routes, RouterModule } from "@angular/router";


import { AuthenticationComponent } from "./auth/authentication.component";
import { HomePageComponent } from "./homepage.component";
import { LandingPageComponent } from "./landingpage/landingpage.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth/signup', pathMatch: 'full' },

    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
    { path: 'icon', component: LandingPageComponent, loadChildren: './landingpage/landingpage.module#LandingPageModule' }

];

export const routing = RouterModule.forRoot(APP_ROUTES);
