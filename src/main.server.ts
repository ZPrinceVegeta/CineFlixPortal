import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { LandingComponent } from './userportal/componants/landing/landing.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
