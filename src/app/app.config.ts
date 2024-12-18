import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpInterceptors } from '../core/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration() , provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()), {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptors,
    multi: true
  }, provideAnimationsAsync(), provideAnimationsAsync()]
};
