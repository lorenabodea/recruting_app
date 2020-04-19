import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/auth/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;
    //replce id woth token
    if (currentUser && currentUser.id) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.id}`
            }
        });
    }

    return next.handle(request);
  }
}
