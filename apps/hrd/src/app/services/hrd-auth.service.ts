import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@workspace/apps/api/src/schemas/user.schema';
import { JwtHelperService } from '@workspace/node_modules/@auth0/angular-jwt';
import { Router } from '@workspace/node_modules/@angular/router';
import { Subject } from '@workspace/node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrdAuthService implements OnInit, OnDestroy {
  user: User;
  private helperService: JwtHelperService;
  public needNewToken: boolean;
  subj: Subject<number>;

  get prev() {
    return this.user.privilege;
  }

  set prev(value) {
    this.subj.next(value);
    this.user.privilege = value;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.subj = new Subject<number>();
    this.helperService = new JwtHelperService();
    this.getUserFromStorage();
  }

  getUserFromStorage() {
    this.user = this.helperService.decodeToken(localStorage.getItem('token')) as User;
  }

  saveTokens({ token, refreshToken }) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    this.getUserFromStorage();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  logOut() {
    this.deleteTokens();
    delete this.user;
    this.router.navigate(['/auth/login']);
  }

  deleteTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  ngOnDestroy(): void {
    this.subj.complete();
  }

  checkPrivilege(lvl: number) {
    return this.user.privilege >= lvl;
  }

  isLoggedIn() {
    return this.user;
  }

  ngOnInit(): void {
  }

}
