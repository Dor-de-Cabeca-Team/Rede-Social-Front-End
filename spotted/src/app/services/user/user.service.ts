import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user/class/user';
import { UserInterface } from '../../models/user/interface/user-interface';
import { UserRegister } from '../../models/user/interface/user-register';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.SERVIDOR + '/api/auth';
  private API_URL2 = environment.SERVIDOR + '/api/user';

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

  getUserById(userId: string): Observable<User> {
    return this.http
      .get<User>(`${this.API_URL2}/findById`, {
        params: { uuid: userId },
      })
      .pipe(
        map((response) => new User(response)) // Converte a resposta em uma instância do model `User`
      );
  }

  trocarSenha(
    idUser: string,
    senhaAntiga: string,
    senhaNova: string
  ): Observable<string> {
    const body = {
      idUser,
      senhaAntiga,
      senhaNova,
    };
    return this.http.post(`${this.API_URL}/trocar-senha`, body, {
      responseType: 'text',
    });
  }

  solicitarRedefinicaoSenha(email: string): Observable<string> {
    return this.http.post(`${this.API_URL}/forgot-password`, null, {
      params: { email },
      responseType: 'text', // Indica que a resposta será uma string
    });
  }

  // Função para redefinir a senha
  redefinirSenha(token: string, novaSenha: string): Observable<string> {
    const body = { token, novaSenha };
    return this.http.post(`${this.API_URL}/resetar-conta`, body, {
      responseType: 'text', // Esperamos uma resposta em formato texto
    });
  }

  validarConta(idUser: string, hash: string): Observable<string> {
    return this.http.get(`${this.API_URL2}/validar-conta`, {
      params: { idUser, hash },
      responseType: 'text', // Indica que a resposta será texto
    });
  }

  constructor() {}
}
