import { LandingPageComponent } from './../userportal/componants/landing/landing-page/landing-page.component';
import { Routes } from '@angular/router';
import { LoginComponent } from '../userportal/componants/landing/login/login.component';

export const routes: Routes = [
  { path: "notification", loadComponent: () => import('./../userportal/componants/notification/notification.component').then((c => c.NotificationComponent)) },
  {
    path: "", loadComponent: () => import('./../userportal/componants/landing/landing.component').then((c => c.LandingComponent)),
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'signin', component: LoginComponent },
      { path: 'signup', component: LoginComponent },
      { path: 'forgot-password', component: LoginComponent },

    ]
  },
  { path: "test", loadComponent: () => import('./../userportal/componants/test-page/test-page.component').then((c => c.TestPageComponent)) },
  { path: "client", loadComponent: () => import('./../userportal/componants/client/client.component').then((c => c.ClientComponent)) },
  { path: "404", loadComponent: () => import('./../userportal/componants/pagenotfound/pagenotfound.component').then((c => c.PagenotfoundComponent)) },
  { path: '**', redirectTo: '404', pathMatch: 'full' }

];
