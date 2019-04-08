import { Injectable, OnDestroy } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser
} from 'angular-6-social-login';
import { skip } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrdAuthService implements OnDestroy {
  user: SocialUser;
  privilege: number;
  public statusUserChange: BehaviorSubject<any>;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.statusUserChange = new BehaviorSubject(null);
    console.log(auth);
    this.auth.authState.pipe(skip(1)).subscribe(value => {
      this.user = value;
      if (value) {
        localStorage.setItem('logged', 'true');
        this.getPrivilege();
      } else {
        delete localStorage['logged'];
        this.privilege = null;
        this.statusUserChange.next({ status: false });
      }
    });
  }

  logIn() {
    this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut() {
    this.auth.signOut();
  }

  getPrivilege() {
    this.http.get('/user/authorization').subscribe((value: any) => {
      this.privilege = value.privilege;
      this.statusUserChange.next({
        status: true,
        user: this.user,
        privilege: this.privilege
      });
    });
  }

  ngOnDestroy(): void {
    this.statusUserChange.complete();
  }

  checkPrivilege(lvl: number) {
    return this.privilege >= lvl;
  }
}
