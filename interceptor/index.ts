import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from './DefaultInterceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [ 
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }
];
