import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { GeneralService } from '../userportal/services/general.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { GeneralHelper } from '../userportal/helper/generalhelper';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {

  private generalHelper:GeneralHelper = new GeneralHelper();

  constructor(private generalService: GeneralService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Get the auth token from the service
    const token = this.generalHelper.getAuthToken();

    // If the token exists, clone the request and add the authorization header
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    }

    // If no token, pass the original request
    return next.handle(req);
  }
}
