import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get('/user');
  }

  changeLvl(level: number, _id: any) {
    return this.http.patch('/user/privilege', { level, _id });
  }

  updatePasswordUser(_id, password) {
    return this.http.post('/user/updatePassword', { _id, password: password });
  }

  changeName(newName: string) {
    return this.http.patch('/user/changeName', { newName });
  }

  changePassword(password, newPassword) {
    return this.http.patch('/user/changePassword', { oldPassword: password, password: newPassword });
  }

  newUser(value) {
    return this.http.post('/user/newUser', value);
  }
}
