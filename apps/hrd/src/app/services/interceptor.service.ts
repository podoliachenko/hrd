import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HrdAuthService } from './hrd-auth.service';
import { environment } from '@environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private auth: HrdAuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('$$')) {
      req = req.clone({
        url: `${req.url.slice(2)}`
      });
    } else {
      req = req.clone({
        url: `${environment.apiBase}${req.url}`
      });
      if (this.auth.user) {
        req = req.clone({
          setHeaders: {
            id: this.auth.user.id,
            token: this.auth.user.idToken
          }
        });
      }
    }
    return next.handle(req);
  }
}
