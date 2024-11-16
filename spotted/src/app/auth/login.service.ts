import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from './login';
import { Usuario } from './usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  API = environment.SERVIDOR + '/api/auth/login';

  constructor() {}

  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {
      responseType: 'text' as 'json',
    });
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode(): Usuario | null {
    const token = this.getToken();
    if (token) {
      const payload = jwtDecode<JwtPayload & { id?: string; role?: string }>(
        token
      );
      return {
        id: payload.id || '',
        role: payload.role || '',
      } as Usuario;
    }
    return null;
  }

  hasPermission(role: string): boolean {
    const user = this.jwtDecode();
    return user?.role === role;
  }

  getUsuarioLogado(role: string) {
    let user = this.jwtDecode() as Usuario;
  }

  getIdUsuarioLogado(): string | null {
    const user = this.jwtDecode();
    return user?.id || null;
  }
}
