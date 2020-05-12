import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, Subject } from 'rxjs';
import { HrdAuthService } from './hrd-auth.service';
import { environment } from '@environment';
import { JwtHelperService } from '@workspace/node_modules/@auth0/angular-jwt';
import { mergeMap } from '@workspace/node_modules/rxjs/internal/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor, OnDestroy {
  private helper: JwtHelperService;

  private expired: boolean;
  private tokenUpdated: Subject<boolean>;

  constructor(private auth: HrdAuthService, private http: HttpClient) {
    this.helper = new JwtHelperService();
    this.tokenUpdated = new Subject<boolean>();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.url.includes('/i18n/')) {
      req = req.clone({
        url: req.url
      });
    } else if (req.url.startsWith('$$')) {
      req = req.clone({
        url: `${req.url.slice(2)}`
      });
    } else {
      req = this.attachApiUrl(req);
    }

    if (this.auth.user &&
      (this.helper.isTokenExpired(this.auth.getToken(), 60) || this.auth.needNewToken) &&
      !this.expired) {
      this.expired = true;
      this.tokenUpdated = new Subject<boolean>();
      this.http
        .post(`/user/refreshToken`,
          {
            refreshToken: this.auth.getRefreshToken()
          }
        )
        .subscribe((value: any) => {
          this.auth.saveTokens(value);
          this.expired = false;
          this.auth.needNewToken = false;
          this.tokenUpdated.next(true);
          this.tokenUpdated.complete();
        }, error => {
          this.expired = false;
          this.auth.needNewToken = false;
          this.tokenUpdated.next(false);
          this.tokenUpdated.complete();
          this.auth.logOut();
        });
    }

    if (this.expired && !req.url.includes('/user/refreshToken')) {
      return this.tokenUpdated.pipe(mergeMap((a) => {
        if (a) {
          req = this.attachTokenIfExist(req);
          console.log(req);
          return next.handle(req);
        } else {
          return EMPTY;
        }
      }));
    } else {
      req = this.attachTokenIfExist(req);
      return next.handle(req);
    }
  }

  ngOnDestroy(): void {
    this.tokenUpdated.next(true);
    this.tokenUpdated.complete();
    this.tokenUpdated.unsubscribe();
  }

  attachTokenIfExist(req: HttpRequest<any>): HttpRequest<any> {
    if (this.auth.user) {
      return req.clone({
        setHeaders: {
          token: this.auth.getToken()
        }
      });
    }
    return req;
  }

  attachApiUrl(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      url: `${environment.apiBase}${req.url}`
    });
  }
}
