import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { meuhttpInterceptor } from './auth/http-interceptor.service';
import { spinnerInterceptor } from './interceptors/spinner.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([meuhttpInterceptor, spinnerInterceptor])), 
    provideClientHydration(),
    provideZoneChangeDetection(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};