import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/class/user';
import { UserInterface } from '../../models/user/interface/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:8080/api/user';

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

  constructor() {}
}
