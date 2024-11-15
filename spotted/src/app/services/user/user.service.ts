import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/class/user';
import { UserInterface } from '../../models/user/interface/user-interface';
import { UserRegister } from '../../models/user/interface/user-register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = "http://localhost:8080/api/auth";

  http = inject(HttpClient);

  login(email: string, senha: string): Observable<UserInterface> {
    return this.http.post<UserInterface>(
      `${this.API_URL}/login-provisorio`,
      null,
      {
        params: { email, senha },
      }
    );
  }

  register(user: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(`${this.API_URL}/register`, user);
  }

  constructor() {}
}
