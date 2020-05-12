import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@workspace/node_modules/@angular/forms';
import { HttpClient } from '@workspace/node_modules/@angular/common/http';
import { NzMessageService } from '@workspace/node_modules/ng-zorro-antd';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Router } from '@workspace/node_modules/@angular/router';

@Component({
  selector: 'hrd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,
              private message: NzMessageService, private authService: HrdAuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const value: any = this.validateForm.value;
    const password = value.password;
    this.http.post(`/user/login`, {
      ...value, password
    }).subscribe((value1: any) => {
      this.authService.saveTokens(value1);
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      if (error.status === 401) {
        this.message.error('Неверный логин или пароль!');
      } else {
        this.message.error(error.message);
      }
    });
  }
}
