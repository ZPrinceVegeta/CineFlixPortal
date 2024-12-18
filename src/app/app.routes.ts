import { CreateProfileComponent } from './../userportal/componants/profile/create-profile/create-profile.component';
import { LandingPageComponent } from './../userportal/componants/landing/landing-page/landing-page.component';
import { Routes } from '@angular/router';
import { LoginComponent } from '../userportal/componants/landing/login/login.component';

export const routes: Routes = [
    {path : "" , loadComponent : ()=>import('./../userportal/componants/landing/landing.component').then((c=>c.LandingComponent)),
    children : [
      {path : '' , component : LandingPageComponent },
      {path : 'signin' , component : LoginComponent} ,
      {path : 'signup' , component : LoginComponent} ,
      {path : 'forgot-password' , component : LoginComponent}
    ]
  },
  {path : "profile" , loadComponent : ()=>import('./../userportal/componants/profile/profile.component').then((c=>c.ProfileComponent)),
  children : [
    {path : 'create-profile' , component : CreateProfileComponent },
  ]
},
  {path : '**' , loadComponent : ()=>import('./../userportal/componants/pagenotfound/pagenotfound.component').then((c=>c.PagenotfoundComponent))}

];
